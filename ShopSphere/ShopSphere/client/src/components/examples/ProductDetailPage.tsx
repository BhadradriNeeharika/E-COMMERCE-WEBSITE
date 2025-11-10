import ProductDetailPage from '../../pages/ProductDetailPage';
import { CartProvider } from '@/contexts/CartContext';
import { Router, Route } from 'wouter';

export default function ProductDetailPageExample() {
  return (
    <CartProvider>
      <Router base="/product">
        <Route path="/:id" component={ProductDetailPage} />
      </Router>
    </CartProvider>
  );
}
