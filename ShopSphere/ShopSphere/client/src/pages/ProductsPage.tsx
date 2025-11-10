import ProductGrid from '@/components/ProductGrid';
import { useQuery } from '@tanstack/react-query';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  const productsWithNumericPrice = products?.map(p => ({
    ...p,
    price: parseFloat(p.price),
  })) || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2" data-testid="text-page-title">
            All Products
          </h1>
          <p className="text-muted-foreground" data-testid="text-products-count">
            Showing {productsWithNumericPrice.length} products
          </p>
        </div>
        <ProductGrid products={productsWithNumericPrice} />
      </div>
    </div>
  );
}
