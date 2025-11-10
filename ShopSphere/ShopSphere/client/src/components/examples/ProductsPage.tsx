import ProductsPage from '../../pages/ProductsPage';
import { CartProvider } from '@/contexts/CartContext';

export default function ProductsPageExample() {
  return (
    <CartProvider>
      <ProductsPage />
    </CartProvider>
  );
}
