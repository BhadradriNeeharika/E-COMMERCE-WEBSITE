import CartPage from '../../pages/CartPage';
import { CartProvider } from '@/contexts/CartContext';

export default function CartPageExample() {
  return (
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
}
