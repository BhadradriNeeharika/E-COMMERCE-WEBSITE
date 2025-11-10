import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="h-20 w-20 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4" data-testid="text-empty-cart">
              Your cart is empty
            </h1>
            <p className="text-muted-foreground mb-8">
              Add some products to get started!
            </p>
            <Link href="/">
              <Button size="lg" data-testid="button-continue-shopping">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shipping = totalPrice > 50 ? 0 : 9.99;
  const total = totalPrice + shipping;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8" data-testid="text-page-title">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} data-testid={`card-cart-item-${item.id}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        data-testid={`img-cart-item-${item.id}`}
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-lg" data-testid={`text-item-name-${item.id}`}>
                          {item.name}
                        </h3>
                        <p className="text-xl font-bold mt-1" data-testid={`text-item-price-${item.id}`}>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold" data-testid={`text-quantity-${item.id}`}>
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold" data-testid="text-subtotal">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold" data-testid="text-shipping">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {totalPrice < 50 && shipping > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold" data-testid="text-total">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" size="lg" data-testid="button-checkout">
                  Proceed to Checkout
                </Button>
                <Link href="/" className="w-full">
                  <Button variant="outline" className="w-full" data-testid="button-continue">
                    Continue Shopping
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
