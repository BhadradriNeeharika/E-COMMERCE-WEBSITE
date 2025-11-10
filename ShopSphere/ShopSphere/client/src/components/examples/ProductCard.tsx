import ProductCard from '../ProductCard';
import { CartProvider } from '@/contexts/CartContext';
import headphonesImg from '@assets/generated_images/Wireless_Bluetooth_Headphones_12c38dbb.png';

export default function ProductCardExample() {
  return (
    <CartProvider>
      <div className="max-w-sm">
        <ProductCard
          id="1"
          name="Wireless Bluetooth Headphones"
          price={129.99}
          image={headphonesImg}
          category="Electronics"
        />
      </div>
    </CartProvider>
  );
}
