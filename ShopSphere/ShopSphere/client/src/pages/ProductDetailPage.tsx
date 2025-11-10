import { useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Redirect if no ID is provided
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid product</h1>
        <Button onClick={() => setLocation('/')}>Back to Products</Button>
      </div>
    );
  }

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ['/api/products', id],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground text-lg">Loading product...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button onClick={() => setLocation('/')}>Back to Products</Button>
      </div>
    );
  }

  const price = parseFloat(product.price);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price,
        image: product.image,
      });
    }
    setLocation('/cart');
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="img-product-detail"
            />
          </div>

          <div className="flex flex-col">
            <Badge variant="secondary" className="w-fit mb-4" data-testid="text-category">
              {product.category}
            </Badge>
            
            <h1 className="text-4xl font-bold mb-4" data-testid="text-product-name">
              {product.name}
            </h1>

            <p className="text-5xl font-bold mb-6" data-testid="text-product-price">
              ${price.toFixed(2)}
            </p>

            <p className="text-muted-foreground text-lg mb-8" data-testid="text-product-description">
              {product.description}
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full text-lg"
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
            >
              Add to Cart
            </Button>

            <div className="mt-8 pt-8 border-t">
              <h2 className="font-semibold text-xl mb-4">Product Details</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Free shipping on orders over $50</li>
                <li>• 30-day return policy</li>
                <li>• 1-year warranty included</li>
                <li>• Secure checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
