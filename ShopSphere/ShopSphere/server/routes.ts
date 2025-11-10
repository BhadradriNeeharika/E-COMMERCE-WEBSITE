import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    try {
      const cartItems = await storage.getCartItemsWithProducts();
      res.json(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Failed to fetch cart items' });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      // Validate request body with Zod
      const validation = insertCartSchema.safeParse(req.body);
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ error: validationError.message });
      }
      
      const { productId, quantity } = validation.data;
      
      // Verify product exists
      const product = await storage.getProduct(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      
      const cartItem = await storage.addToCart({ productId, quantity });
      
      res.status(201).json(cartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const deleted = await storage.removeFromCart(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      res.status(204).send();
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ error: 'Failed to remove item from cart' });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      // Validate quantity with Zod (allow 0 for deletion, otherwise positive integer)
      const quantitySchema = z.object({
        quantity: z.number().int().min(0, "Quantity must be a non-negative integer"),
      });
      
      const validation = quantitySchema.safeParse(req.body);
      if (!validation.success) {
        const validationError = fromZodError(validation.error);
        return res.status(400).json({ error: validationError.message });
      }
      
      const { quantity } = validation.data;
      
      if (quantity === 0) {
        const deleted = await storage.removeFromCart(req.params.id);
        if (!deleted) {
          return res.status(404).json({ error: 'Cart item not found' });
        }
        return res.status(204).send();
      }
      
      const updated = await storage.updateCartQuantity(req.params.id, quantity);
      if (!updated) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      res.status(500).json({ error: 'Failed to update cart quantity' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
