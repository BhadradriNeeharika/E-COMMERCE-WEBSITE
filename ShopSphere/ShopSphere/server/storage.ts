import { products, cart, type Product, type InsertProduct, type Cart, type InsertCart, type CartWithProduct } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  getCartItems(): Promise<Cart[]>;
  getCartItemsWithProducts(): Promise<CartWithProduct[]>;
  getCartItem(id: string): Promise<Cart | undefined>;
  addToCart(item: InsertCart): Promise<Cart>;
  removeFromCart(id: string): Promise<boolean>;
  updateCartQuantity(id: string, quantity: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async getCartItems(): Promise<Cart[]> {
    return await db.select().from(cart);
  }

  async getCartItemsWithProducts(): Promise<CartWithProduct[]> {
    const result = await db
      .select()
      .from(cart)
      .leftJoin(products, eq(cart.productId, products.id));
    
    return result
      .filter(row => row.products !== null)
      .map(row => ({
        ...row.cart,
        product: row.products!,
      }));
  }

  async getCartItem(id: string): Promise<Cart | undefined> {
    const [cartItem] = await db.select().from(cart).where(eq(cart.id, id));
    return cartItem || undefined;
  }

  async addToCart(insertCart: InsertCart): Promise<Cart> {
    const [cartItem] = await db
      .insert(cart)
      .values(insertCart)
      .returning();
    return cartItem;
  }

  async removeFromCart(id: string): Promise<boolean> {
    const result = await db.delete(cart).where(eq(cart.id, id)).returning();
    return result.length > 0;
  }

  async updateCartQuantity(id: string, quantity: number): Promise<boolean> {
    const result = await db.update(cart).set({ quantity }).where(eq(cart.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
