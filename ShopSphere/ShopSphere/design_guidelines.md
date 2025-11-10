# E-Commerce Website Design Guidelines

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from modern e-commerce leaders (Shopify, Etsy, modern DTC brands) that prioritize product visibility, trust-building, and conversion-focused design. The aesthetic balances clean minimalism with engaging product presentation.

**Core Principles**:
- Product-first visual hierarchy - imagery takes precedence
- Generous whitespace for breathing room and focus
- Trust signals throughout the experience
- Friction-free cart interactions

---

## Typography System

**Font Selection**: Inter or DM Sans via Google Fonts for clean, modern readability

**Hierarchy**:
- **Product Titles**: text-xl to text-2xl, font-semibold
- **Prices**: text-2xl to text-3xl, font-bold (prominent, trust-building)
- **Body/Descriptions**: text-base, font-normal, text-gray-700
- **Labels/Meta**: text-sm, font-medium, text-gray-500
- **CTAs**: text-base, font-semibold

---

## Layout System

**Tailwind Spacing Primitives**: Use units of **2, 4, 6, 8, 12, 16, 20** for consistent rhythm
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-20
- Card gaps: gap-6 to gap-8

**Container Strategy**:
- Max-width: max-w-7xl for content areas
- Product grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

---

## Page-Specific Layouts

### Product Listing Page
**Header**: Clean navigation bar with logo (left), search bar (center), cart icon with item count badge (right) - sticky positioning

**Product Grid**:
- 4-column grid on desktop (xl:grid-cols-4), 2-column on tablet, single on mobile
- Product cards with 1:1 aspect ratio images
- Hover state: subtle shadow lift (shadow-lg transition)
- Quick "Add to Cart" button appears on hover (desktop only)

**Card Structure**:
```
- Product image (full-width, rounded-lg)
- Product name (mt-4)
- Price (mt-2, prominent)
- Category tag (text-xs, subtle badge)
- Rating stars (if applicable)
```

### Product Detail Page
**Two-Column Layout** (lg:grid-cols-2):
- Left: Large product image gallery (main image + thumbnail strip below)
- Right: Product info column with clear vertical rhythm

**Info Column Structure**:
1. Product name (text-3xl)
2. Price (text-4xl, mt-4)
3. Short description (mt-6)
4. Quantity selector (mt-8, flex with - / + buttons)
5. Add to Cart CTA (mt-6, w-full, large button)
6. Full description (mt-12, prose formatting)

### Shopping Cart Page
**Clean Table/Card Hybrid**:
- Cart items as cards on mobile, table rows on desktop
- Each item shows: thumbnail image, name, price, quantity controls, remove button
- Right sidebar (lg:col-span-1) with order summary card (subtotal, shipping, total)
- Prominent "Proceed to Checkout" button in summary

---

## Component Library

### Buttons
**Primary CTA**: bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition
**Secondary**: border-2 border-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-50
**Icon Buttons**: Circular, p-2, hover:bg-gray-100

### Product Cards
- Clean white background with subtle border (border border-gray-200)
- Rounded corners (rounded-lg)
- Hover elevation (hover:shadow-xl transition-shadow)
- 16:9 or 1:1 product image aspect ratio

### Cart Badge
- Absolute positioned on cart icon
- bg-red-500 text-white rounded-full (w-5 h-5 or w-6 h-6)
- Display item count

### Input Fields
- Quantity selectors: Border with - and + buttons flanking number display
- Search bar: Rounded, with search icon, placeholder "Search products..."

---

## Images

**Hero Section**: NOT INCLUDED - Product listing goes straight to grid for immediate browsing

**Product Images**:
- High-quality, consistent aspect ratios across all products
- Clean white or light gray backgrounds for product focus
- Minimum 800x800px for detail page main images
- Thumbnail strip: 100x100px clickable previews

**Placeholders**: Use https://placehold.co/800x800/e2e8f0/cbd5e1?text=Product for development

---

## Icons
**Library**: Heroicons (outline style) via CDN
- Shopping cart, search, user profile, plus/minus for quantity
- Trash icon for remove from cart

---

## Accessibility
- All interactive elements have min 44px touch targets
- Cart badge has aria-label with item count
- Product images have descriptive alt text
- Form inputs have associated labels
- Focus states clearly visible (ring-2 ring-offset-2)

---

## Key UX Patterns
- Instant visual feedback when adding to cart (cart badge animates)
- Persistent cart icon visibility in header
- Empty cart state with friendly message and "Continue Shopping" link
- Product cards maintain consistent heights within rows
- Mobile: Bottom sticky "Add to Cart" bar on product detail page