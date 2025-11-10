import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image });
  };

  return (
    <Link href={`/product/${id}`} data-testid={`card-product-${id}`}>
      <Card className="group overflow-hidden hover-elevate transition-all h-full flex flex-col">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              data-testid={`img-product-${id}`}
            />
          </div>
          <CardContent className="flex-1 p-4">
            <Badge variant="secondary" className="mb-2 text-xs" data-testid={`text-category-${id}`}>
              {category}
            </Badge>
            <h3 className="font-semibold text-lg line-clamp-2" data-testid={`text-name-${id}`}>
              {name}
            </h3>
            <p className="mt-2 text-2xl font-bold" data-testid={`text-price-${id}`}>
              ${price.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              data-testid={`button-add-to-cart-${id}`}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
    </Link>
  );
}
