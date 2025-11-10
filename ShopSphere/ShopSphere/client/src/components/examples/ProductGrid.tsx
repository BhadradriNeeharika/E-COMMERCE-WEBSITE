import ProductGrid from '../ProductGrid';
import { CartProvider } from '@/contexts/CartContext';
import headphonesImg from '@assets/generated_images/Wireless_Bluetooth_Headphones_12c38dbb.png';
import watchImg from '@assets/generated_images/Classic_Leather_Watch_c8676ad3.png';
import backpackImg from '@assets/generated_images/Canvas_Laptop_Backpack_9dcdd0b7.png';

export default function ProductGridExample() {
  const products = [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 129.99,
      image: headphonesImg,
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Classic Leather Watch',
      price: 249.99,
      image: watchImg,
      category: 'Fashion',
    },
    {
      id: '3',
      name: 'Canvas Laptop Backpack',
      price: 79.99,
      image: backpackImg,
      category: 'Accessories',
    },
  ];

  return (
    <CartProvider>
      <ProductGrid products={products} />
    </CartProvider>
  );
}
