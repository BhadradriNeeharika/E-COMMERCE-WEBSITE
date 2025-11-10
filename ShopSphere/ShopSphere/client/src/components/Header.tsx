import { ShoppingCart, Search } from 'lucide-react';
import { Link } from 'wouter';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold tracking-tight hover-elevate rounded-md px-3 py-2" data-testid="link-home">
            ShopHub
          </Link>

          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full pl-10"
                data-testid="input-search"
              />
            </div>
          </div>

          <Link href="/cart" data-testid="link-cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-semibold text-destructive-foreground"
                  data-testid="text-cart-count"
                >
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>

        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-10"
              data-testid="input-search-mobile"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
