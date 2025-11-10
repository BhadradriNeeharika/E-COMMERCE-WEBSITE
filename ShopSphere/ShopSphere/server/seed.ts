import { db } from "./db";
import { products } from "@shared/schema";

const productData = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: '129.99',
    image: '/generated_images/Wireless_Bluetooth_Headphones_12c38dbb.png',
    category: 'Electronics',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals who need to focus.',
  },
  {
    name: 'Classic Leather Watch',
    price: '249.99',
    image: '/generated_images/Classic_Leather_Watch_c8676ad3.png',
    category: 'Fashion',
    description: 'Elegant timepiece with genuine leather strap and Swiss movement. A timeless accessory for any occasion.',
  },
  {
    name: 'Canvas Laptop Backpack',
    price: '79.99',
    image: '/generated_images/Canvas_Laptop_Backpack_9dcdd0b7.png',
    category: 'Accessories',
    description: 'Durable backpack with padded laptop compartment and water-resistant fabric. Ideal for daily commutes and travel.',
  },
  {
    name: 'Insulated Water Bottle',
    price: '34.99',
    image: '/generated_images/Insulated_Water_Bottle_6faebca6.png',
    category: 'Lifestyle',
    description: 'Double-wall insulated bottle keeps drinks cold for 24 hours or hot for 12 hours. Stay hydrated throughout the day.',
  },
  {
    name: 'Premium Yoga Mat',
    price: '59.99',
    image: '/generated_images/Premium_Yoga_Mat_ddfddd3e.png',
    category: 'Fitness',
    description: 'Eco-friendly yoga mat with superior grip and cushioning for all practice levels. Non-slip surface for maximum safety.',
  },
  {
    name: 'Ceramic Coffee Mug',
    price: '24.99',
    image: '/generated_images/Ceramic_Coffee_Mug_e57761a7.png',
    category: 'Home',
    description: 'Handcrafted ceramic mug with ergonomic design and beautiful finish. Microwave and dishwasher safe.',
  },
  {
    name: 'Designer Sunglasses',
    price: '189.99',
    image: '/generated_images/Designer_Sunglasses_7afa4a7c.png',
    category: 'Fashion',
    description: 'UV protection sunglasses with polarized lenses and classic design. Protect your eyes in style.',
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: '89.99',
    image: '/generated_images/Portable_Bluetooth_Speaker_4070ef03.png',
    category: 'Electronics',
    description: 'Waterproof speaker with 360-degree sound and 12-hour playtime. Perfect for outdoor adventures and parties.',
  },
];

async function seed() {
  console.log('Seeding database...');
  
  try {
    // Insert products
    await db.insert(products).values(productData);
    console.log('✅ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
  
  process.exit(0);
}

seed();
