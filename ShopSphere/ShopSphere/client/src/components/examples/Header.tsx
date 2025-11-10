import Header from '../Header';
import { CartProvider } from '@/contexts/CartContext';

export default function HeaderExample() {
  return (
    <CartProvider>
      <Header />
    </CartProvider>
  );
}
