export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  oldPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: number;
  reviewCountLabel: string;
  image: string;
  gallery?: string[];
  badge?: string;
  inStock: boolean;
  stockCount: number;
  sku: string;
  shortDescription: string;
  description: string;
  colors: { name: string; hex: string }[];
  storageOptions?: string[];
  specs: { label: string; value: string }[];
  isFlashDeal?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  warranty: string;
  deliveryEstimate: string;
  sellerName: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  shortName: string;
  discountText: string;
  image: string;
  bgTint: string;
  iconName: string;
  itemCount: number;
  subcategories: string[];
}

export interface BrandItem {
  id: string;
  name: string;
  tagline: string;
  productCount: number;
  accentColor: string;
}

export interface ReviewItem {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface QuestionItem {
  id: string;
  productId: string;
  question: string;
  askedBy: string;
  date: string;
  answer: string;
  answeredBy: string;
}

export interface OrderItem {
  id: string;
  date: string;
  status: 'Order Confirmed' | 'Processing' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  statusStep: number; // 0 to 5
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  paymentMethod: string;
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  trackingNumber: string;
  estimatedDelivery: string;
  items: {
    product: Product;
    quantity: number;
    selectedColor: string;
    selectedStorage?: string;
  }[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    shortName: 'Electronics',
    discountText: 'Up to 50% OFF',
    image: '/assets/products/cat-electronics.png',
    bgTint: 'from-[#EAF2FF] to-[#F5F9FF]',
    iconName: 'Monitor',
    itemCount: 428,
    subcategories: ['Laptops & Ultrabooks', 'Audio & Headphones', 'Cameras', 'Computer Accessories', 'Monitors']
  },
  {
    id: 'fashion',
    name: 'Fashion',
    shortName: 'Fashion',
    discountText: 'Up to 60% OFF',
    image: '/assets/products/cat-fashion.png',
    bgTint: 'from-[#F9F1E7] to-[#FCF8F3]',
    iconName: 'Shirt',
    itemCount: 612,
    subcategories: ['Outerwear & Jackets', 'Sneakers & Footwear', 'Backpacks & Bags', 'Watches & Accessories']
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    shortName: 'Home & Living',
    discountText: 'Up to 50% OFF',
    image: '/assets/products/cat-home.png',
    bgTint: 'from-[#F2EFE9] to-[#F9F8F6]',
    iconName: 'Home',
    itemCount: 315,
    subcategories: ['Living Room Furniture', 'Smart Lighting', 'Home Decor', 'Floor Care & Vacuums']
  },
  {
    id: 'beauty',
    name: 'Beauty & Personal Care',
    shortName: 'Beauty',
    discountText: 'Up to 55% OFF',
    image: '/assets/products/cat-beauty.png',
    bgTint: 'from-[#FCEEF2] to-[#FFF7F9]',
    iconName: 'Sparkles',
    itemCount: 284,
    subcategories: ['Luxury Perfumes', 'Skincare Serums', 'Hair Styling Tech', 'Grooming Kits']
  },
  {
    id: 'gaming',
    name: 'Gaming',
    shortName: 'Gaming',
    discountText: 'Up to 45% OFF',
    image: '/assets/products/cat-gaming.png',
    bgTint: 'from-[#EBF3FA] to-[#F5F9FD]',
    iconName: 'Gamepad2',
    itemCount: 195,
    subcategories: ['PlayStation & Consoles', 'Pro Controllers', 'Gaming Headsets', 'Mechanical Keyboards']
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    shortName: 'Sports',
    discountText: 'Up to 50% OFF',
    image: '/assets/products/cat-sports.png',
    bgTint: 'from-[#EEF1F6] to-[#F7F9FC]',
    iconName: 'Dumbbell',
    itemCount: 240,
    subcategories: ['Athletic Footwear', 'Basketball & Court', 'Fitness Trackers', 'Gym Equipment']
  },
  {
    id: 'smartphones',
    name: 'Smartphones',
    shortName: 'Smartphones',
    discountText: 'Up to 40% OFF',
    image: '/assets/products/cat-smartphones.png',
    bgTint: 'from-[#E8F4FE] to-[#F4FAFF]',
    iconName: 'Smartphone',
    itemCount: 168,
    subcategories: ['Flagship 5G Phones', 'Foldables', 'MagSafe Accessories', 'Fast Chargers']
  },
  {
    id: 'appliances',
    name: 'Appliances',
    shortName: 'Appliances',
    discountText: 'Up to 35% OFF',
    image: '/assets/products/cat-appliances.png',
    bgTint: 'from-[#EDF5F1] to-[#F6FAF8]',
    iconName: 'Refrigerator',
    itemCount: 142,
    subcategories: ['Air Fryers & Kitchen', 'Smart Refrigerators', 'Washers & Dryers', 'Espresso Machines']
  }
];

export const SIDEBAR_CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'Monitor', count: 428 },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', count: 612 },
  { id: 'home-living', name: 'Home & Living', icon: 'Home', count: 315 },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: 'Sparkles', count: 284 },
  { id: 'sports', name: 'Sports & Outdoors', icon: 'Dumbbell', count: 240 },
  { id: 'groceries', name: 'Groceries & Daily Needs', icon: 'ShoppingBasket', count: 180 },
  { id: 'gaming', name: 'Toys & Games', icon: 'Gamepad2', count: 195 },
  { id: 'automotive', name: 'Automotive', icon: 'Car', count: 94 },
  { id: 'books', name: 'Books & Stationery', icon: 'BookOpen', count: 210 }
];

export const TOP_BRANDS: BrandItem[] = [
  { id: 'apple', name: 'Apple', tagline: 'Authorized Flagship Partner', productCount: 48, accentColor: '#0F172A' },
  { id: 'samsung', name: 'SAMSUNG', tagline: 'Galaxy Ecosystem & Displays', productCount: 64, accentColor: '#1D4ED8' },
  { id: 'nike', name: 'NIKE', tagline: 'Performance Athletic Gear', productCount: 52, accentColor: '#111827' },
  { id: 'adidas', name: 'adidas', tagline: 'Sportswear & Originals', productCount: 39, accentColor: '#0F172A' },
  { id: 'hp', name: 'HP', tagline: 'ProBook & Pavilion Computing', productCount: 31, accentColor: '#0284C7' },
  { id: 'sony', name: 'SONY', tagline: 'Alpha Audio & PlayStation', productCount: 44, accentColor: '#111827' },
  { id: 'jbl', name: 'JBL', tagline: 'Pro Sound Wireless Audio', productCount: 29, accentColor: '#EA580C' },
  { id: 'panasonic', name: 'Panasonic', tagline: 'Smart Home & Living Tech', productCount: 26, accentColor: '#1E40AF' },
  { id: 'asus', name: 'ASUS', tagline: 'ROG & ZenBook Series', productCount: 35, accentColor: '#1E3A8A' },
  { id: 'dell', name: 'DELL', tagline: 'XPS & UltraSharp Monitors', productCount: 33, accentColor: '#0369A1' }
];

export const INITIAL_PRODUCTS: Product[] = [
  // 6 Reference Flash Deals
  {
    id: 'airpods-pro-2',
    title: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    category: 'electronics',
    subcategory: 'Audio & Headphones',
    price: 199.00,
    oldPrice: 299.00,
    discountPercent: 32,
    rating: 4.8,
    reviewsCount: 12400,
    reviewCountLabel: '12.4k reviews',
    image: '/assets/products/prod-airpods-pro.png',
    gallery: [
      '/assets/products/prod-airpods-pro.png',
      '/assets/products/prod-earbuds-pro.png',
      '/assets/products/prod-headphones-studio.png'
    ],
    badge: '-32%',
    inStock: true,
    stockCount: 42,
    sku: 'TZ-APL-APP2',
    shortDescription: 'Active Noise Cancellation, Adaptive Audio, and MagSafe Charging Case (USB-C) with Precision Finding.',
    description: 'Rebuilt from the sound up, AirPods Pro (2nd generation) with MagSafe Charging Case (USB-C) deliver up to 2x more Active Noise Cancellation than the previous generation, with Transparency mode that lets you comfortably hear the world around you, and Conversation Awareness that automatically lowers media volume when you speak.',
    colors: [
      { name: 'Pure White', hex: '#F8FAFC' },
      { name: 'Space Titanium', hex: '#475569' }
    ],
    storageOptions: ['USB-C MagSafe Case', 'USB-C + AppleCare+ Bundle'],
    specs: [
      { label: 'Audio Chip', value: 'Apple H2 Headphone Chip' },
      { label: 'Noise Control', value: 'Pro-level Active Noise Cancellation & Adaptive Transparency' },
      { label: 'Battery Life', value: 'Up to 6 hrs listening (30 hrs with MagSafe Case)' },
      { label: 'Water Resistance', value: 'IP54 Dust, Sweat, and Water Resistant' },
      { label: 'Connectivity', value: 'Bluetooth 5.3 Ultra-Low Latency' }
    ],
    isFlashDeal: true,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    warranty: '1-Year Apple Limited Warranty + TekZone Protection',
    deliveryEstimate: 'Free Express Delivery by Tomorrow',
    sellerName: 'TekZone Official Flagship'
  },
  {
    id: 'galaxy-watch-6',
    title: 'Galaxy Watch 6',
    brand: 'Samsung',
    category: 'electronics',
    subcategory: 'Watches & Accessories',
    price: 149.00,
    oldPrice: 209.00,
    discountPercent: 28,
    rating: 4.6,
    reviewsCount: 8700,
    reviewCountLabel: '8.7k reviews',
    image: '/assets/products/prod-galaxy-watch.png',
    gallery: [
      '/assets/products/prod-galaxy-watch.png',
      '/assets/products/prod-smart-watch.png'
    ],
    badge: '-28%',
    inStock: true,
    stockCount: 29,
    sku: 'TZ-SAM-GW6',
    shortDescription: 'Super AMOLED Sapphire Crystal Display, Advanced Sleep Coaching, BIA Body Sensor & Heart Rate Monitor.',
    description: 'Keep your everyday wellness goals on track with Galaxy Watch 6. Featuring a 20% larger Super AMOLED always-on display, ultra-durable Sapphire Crystal glass, personalized Heart Rate Zones, and comprehensive BioActive sensor insights.',
    colors: [
      { name: 'Graphite Black', hex: '#1E293B' },
      { name: 'Silver Titanium', hex: '#CBD5E1' },
      { name: 'Gold Mist', hex: '#E2C799' }
    ],
    storageOptions: ['40mm Bluetooth', '44mm Bluetooth', '44mm LTE Cellular'],
    specs: [
      { label: 'Display', value: '1.5" Super AMOLED Sapphire Crystal (480 x 480)' },
      { label: 'Processor', value: 'Exynos W930 Dual-Core 1.4GHz' },
      { label: 'Sensors', value: 'Samsung BioActive (Optical Heart Rate + ECG + BIA)' },
      { label: 'Durability', value: '5ATM + IP68 / MIL-STD-810H' },
      { label: 'Battery', value: '425mAh with WPC Fast Wireless Charging' }
    ],
    isFlashDeal: true,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    warranty: '2-Year Manufacturer Warranty',
    deliveryEstimate: 'Free Delivery in 1–2 Business Days',
    sellerName: 'Samsung Experience Partner'
  },
  {
    id: 'hp-pavilion-15',
    title: 'Pavilion 15.6" Laptop',
    brand: 'HP',
    category: 'electronics',
    subcategory: 'Laptops & Ultrabooks',
    price: 699.00,
    oldPrice: 899.00,
    discountPercent: 22,
    rating: 4.7,
    reviewsCount: 5300,
    reviewCountLabel: '5.3k reviews',
    image: '/assets/products/prod-pavilion-laptop.png',
    gallery: [
      '/assets/products/prod-pavilion-laptop.png',
      '/assets/products/prod-macbook-air.png',
      '/assets/products/cat-electronics.png'
    ],
    badge: '-22%',
    inStock: true,
    stockCount: 18,
    sku: 'TZ-HP-PAV15',
    shortDescription: '15.6" FHD IPS Micro-Edge Display, Intel Core i7 13th Gen, 16GB DDR4 RAM, 1TB PCIe NVMe SSD.',
    description: 'Engineered for high-output multitasking and immersive entertainment, the HP Pavilion 15.6" Laptop combines a 13th Gen Intel Core i7 processor, Audio by B&O dual speakers, HP Fast Charge (50% in 45 minutes), and a precision aluminum palmrest.',
    colors: [
      { name: 'Natural Silver', hex: '#CBD5E1' },
      { name: 'Horizon Blue', hex: '#38BDF8' },
      { name: 'Shadow Grey', hex: '#334155' }
    ],
    storageOptions: ['16GB RAM / 512GB SSD', '16GB RAM / 1TB SSD', '32GB RAM / 1TB SSD'],
    specs: [
      { label: 'Processor', value: 'Intel Core i7-1355U (up to 5.0 GHz, 10 cores)' },
      { label: 'Display', value: '15.6" diagonal FHD (1920 x 1080) IPS anti-glare' },
      { label: 'Memory & Storage', value: '16GB DDR4-3200 MHz + 1TB PCIe Gen4 NVMe M.2 SSD' },
      { label: 'Audio', value: 'Audio by B&O with Dual Speakers & HP Audio Boost' },
      { label: 'Ports', value: '1x USB-C (Power Delivery, DisplayPort 1.4), 2x USB-A, HDMI 2.1' }
    ],
    isFlashDeal: true,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    warranty: '2-Year HP Care Pack Included',
    deliveryEstimate: 'Free Express Shipping by Tomorrow',
    sellerName: 'TekZone Computing Hub'
  },
  {
    id: 'nike-air-force-1',
    title: 'Air Force 1 Sneakers',
    brand: 'Nike',
    category: 'fashion',
    subcategory: 'Sneakers & Footwear',
    price: 89.99,
    oldPrice: 129.99,
    discountPercent: 31,
    rating: 4.8,
    reviewsCount: 9800,
    reviewCountLabel: '9.8k reviews',
    image: '/assets/products/prod-white-sneakers.png',
    gallery: [
      '/assets/products/prod-white-sneakers.png',
      '/assets/products/prod-grey-sneakers.png',
      '/assets/products/cat-sports.png'
    ],
    badge: '-31%',
    inStock: true,
    stockCount: 64,
    sku: 'TZ-NKE-AF1W',
    shortDescription: 'Iconic stitched leather overlays, Nike Air cushioning, low-cut padded collar & pivot-circle rubber outsole.',
    description: 'The radiance lives on in the Nike Air Force 1, the basketball original that puts a fresh spin on what you know best: durably stitched leather overlays, clean triple-white finishes, and full-length Nike Air cushioning for all-day comfort.',
    colors: [
      { name: 'Triple White', hex: '#FFFFFF' },
      { name: 'Wolf Grey / White', hex: '#94A3B8' },
      { name: 'Obsidian Black', hex: '#0F172A' }
    ],
    storageOptions: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    specs: [
      { label: 'Upper Material', value: 'Full-Grain Stitched Leather with Perforated Toe Box' },
      { label: 'Midsole', value: 'Encapsulated Nike Air Cushioning Unit' },
      { label: 'Outsole', value: 'Non-Marking Rubber with Heritage Pivot Circles' },
      { label: 'Fit', value: 'True to Size — Low-Top Padded Collar' }
    ],
    isFlashDeal: true,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    warranty: '30-Day Authenticity & Comfort Guarantee',
    deliveryEstimate: 'Free Standard Shipping',
    sellerName: 'TekZone Footwear Vault'
  },
  {
    id: 'bright-crystal-perfume',
    title: 'Bright Crystal Perfume 90ml',
    brand: 'Versace',
    category: 'beauty',
    subcategory: 'Luxury Perfumes',
    price: 59.99,
    oldPrice: 99.99,
    discountPercent: 40,
    rating: 4.6,
    reviewsCount: 6100,
    reviewCountLabel: '6.1k reviews',
    image: '/assets/products/prod-crystal-perfume.png',
    gallery: [
      '/assets/products/prod-crystal-perfume.png',
      '/assets/products/prod-beauty-serum.png'
    ],
    badge: '-40%',
    inStock: true,
    stockCount: 37,
    sku: 'TZ-VRS-BC90',
    shortDescription: 'Luminous floral fragrance with Yuzu, Pomegranate, Peony, Magnolia, Lotus Flower, and Vegetal Amber.',
    description: 'Sheer sensuality, crystal transparency, and luminous brightness. A fresh, vibrant floral fragrance featuring chilled yuzu and pomegranate mingled with soothing peony, magnolia, and lotus flower notes, warmed with musk and amber.',
    colors: [
      { name: 'Crystal Rose', hex: '#F472B6' }
    ],
    storageOptions: ['50ml Eau de Toilette', '90ml Eau de Toilette', '90ml Gift Set'],
    specs: [
      { label: 'Top Notes', value: 'Yuzu, Iced Accord, Pomegranate' },
      { label: 'Heart Notes', value: 'Peony, Magnolia, Lotus Flower' },
      { label: 'Base Notes', value: 'Acajou Wood, Vegetal Amber, Musk' },
      { label: 'Volume', value: '90 ml / 3.0 fl. oz. Natural Spray' }
    ],
    isFlashDeal: true,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: false,
    warranty: '100% Certified Authentic Luxury Fragrance',
    deliveryEstimate: 'Free Shipping on Orders Over $50',
    sellerName: 'TekZone Beauty Atelier'
  },
  {
    id: 'philips-air-fryer',
    title: 'Air Fryer 4.1L',
    brand: 'Philips',
    category: 'appliances',
    subcategory: 'Air Fryers & Kitchen',
    price: 74.99,
    oldPrice: 99.99,
    discountPercent: 25,
    rating: 4.4,
    reviewsCount: 4300,
    reviewCountLabel: '4.3k reviews',
    image: '/assets/products/prod-air-fryer.png',
    gallery: [
      '/assets/products/prod-air-fryer.png',
      '/assets/products/prod-appliance-set.png'
    ],
    badge: '-25%',
    inStock: true,
    stockCount: 51,
    sku: 'TZ-PHL-AF41',
    shortDescription: 'Rapid Air Technology for 90% less oil, 13-in-1 digital touch presets, QuickClean dishwasher-safe basket.',
    description: 'Enjoy crispy on the outside and tender on the inside meals with up to 90% less fat thanks to patented Rapid Air starfish bottom technology. Includes 7 one-touch digital presets for fries, chicken, fish, baking, and dehydrating.',
    colors: [
      { name: 'Obsidian Black', hex: '#0F172A' },
      { name: 'Brushed Stainless', hex: '#94A3B8' }
    ],
    storageOptions: ['4.1L Essential XL', '6.2L Family XXL'],
    specs: [
      { label: 'Capacity', value: '4.1 Liters (4.3 Quarts) / 0.8 kg Fries' },
      { label: 'Power Output', value: '1400W Rapid Air Convection Heating' },
      { label: 'Control Interface', value: 'Digital Touch Screen with 7 Presets' },
      { label: 'Cleaning', value: 'Non-Stick QuickClean Dishwasher-Safe Basket' }
    ],
    isFlashDeal: true,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: false,
    warranty: '2-Year Worldwide Philips Warranty',
    deliveryEstimate: 'Free Standard Delivery',
    sellerName: 'TekZone Home & Kitchen'
  },
  // Reference Best Sellers & Trending Now products
  {
    id: 'iphone-15-pro',
    title: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'smartphones',
    subcategory: 'Flagship 5G Phones',
    price: 999.00,
    oldPrice: 1199.00,
    discountPercent: 17,
    rating: 4.7,
    reviewsCount: 9400,
    reviewCountLabel: '9.4k reviews',
    image: '/assets/products/prod-iphone-15-pro.png',
    gallery: [
      '/assets/products/prod-iphone-15-pro.png',
      '/assets/products/cat-smartphones.png'
    ],
    badge: '-17%',
    inStock: true,
    stockCount: 23,
    sku: 'TZ-APL-IP15P',
    shortDescription: 'Forged in Grade 5 Titanium, A17 Pro chip, customizable Action button, and 48MP Pro camera system.',
    description: 'iPhone 15 Pro is the first iPhone to feature an aerospace-grade titanium design, using the same alloy that spacecraft use for missions to Mars. Powered by the A17 Pro chip with hardware-accelerated ray tracing and USB 3 speeds up to 10Gb/s.',
    colors: [
      { name: 'Natural Titanium', hex: '#A8A29E' },
      { name: 'Blue Titanium', hex: '#1E293B' },
      { name: 'Black Titanium', hex: '#18181B' }
    ],
    storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    specs: [
      { label: 'Chipset', value: 'Apple A17 Pro (3nm Architecture, 6-Core GPU)' },
      { label: 'Display', value: '6.1" Super Retina XDR OLED with ProMotion 120Hz' },
      { label: 'Camera System', value: '48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto' },
      { label: 'Body Material', value: 'Grade 5 Brushed Titanium with Ceramic Shield' }
    ],
    isFlashDeal: false,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    warranty: '1-Year Apple Official Warranty',
    deliveryEstimate: 'Free Next-Day Insured Delivery',
    sellerName: 'TekZone Official Flagship'
  },
  {
    id: 'nike-court-shoes',
    title: 'Nike Shoes',
    brand: 'Nike',
    category: 'sports',
    subcategory: 'Athletic Footwear',
    price: 89.99,
    oldPrice: 149.00,
    discountPercent: 40,
    rating: 4.6,
    reviewsCount: 6800,
    reviewCountLabel: '6.8k reviews',
    image: '/assets/products/prod-grey-sneakers.png',
    gallery: [
      '/assets/products/prod-grey-sneakers.png',
      '/assets/products/prod-white-sneakers.png',
      '/assets/products/prod-sports-pack.png'
    ],
    badge: '-40%',
    inStock: true,
    stockCount: 48,
    sku: 'TZ-NKE-CRT89',
    shortDescription: 'Breathable Wolf Grey leather & mesh upper, responsive foam midsole, high-traction court outsole.',
    description: 'Engineered for both street versatility and athletic performance, these Nike Low-Top Court Sneakers combine durable suede and tumbled leather panels with responsive underfoot cushioning.',
    colors: [
      { name: 'Wolf Grey', hex: '#94A3B8' },
      { name: 'Pure Platinum', hex: '#F1F5F9' }
    ],
    storageOptions: ['US 8.5', 'US 9', 'US 10', 'US 11'],
    specs: [
      { label: 'Upper', value: 'Premium Tumbled Leather & Suede Overlays' },
      { label: 'Cushioning', value: 'Dual-Density Phylon Foam Midsole' },
      { label: 'Traction', value: 'Concentric Rubber Court Outsole' }
    ],
    isFlashDeal: false,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    warranty: '30-Day Easy Return Guarantee',
    deliveryEstimate: 'Free Shipping on Orders Over $50',
    sellerName: 'TekZone Footwear Vault'
  },
  {
    id: 'urban-tech-backpack',
    title: 'Backpack',
    brand: 'ASUS',
    category: 'fashion',
    subcategory: 'Backpacks & Bags',
    price: 49.99,
    oldPrice: 89.99,
    discountPercent: 44,
    rating: 4.5,
    reviewsCount: 3900,
    reviewCountLabel: '3.9k reviews',
    image: '/assets/products/prod-tech-backpack.png',
    gallery: [
      '/assets/products/prod-tech-backpack.png',
      '/assets/products/prod-urban-jacket.png'
    ],
    badge: '-44%',
    inStock: true,
    stockCount: 75,
    sku: 'TZ-BAG-URB17',
    shortDescription: 'Water-repellent 1680D ballistic nylon, padded 17" laptop compartment, external USB-C pass-through port.',
    description: 'Designed for modern commuters and creators, this 28L Urban Tech Backpack features suspended shock-proof protection for up to a 17-inch laptop, RFID-blocking organizer pockets, and ergonomic airflow back padding.',
    colors: [
      { name: 'Stealth Black', hex: '#0F172A' },
      { name: 'Slate Charcoal', hex: '#334155' }
    ],
    storageOptions: ['24L Commuter (15.6")', '28L Pro Travel (17")'],
    specs: [
      { label: 'Material', value: 'Water-Repellent 1680D Ballistic Nylon' },
      { label: 'Laptop Sleeve', value: 'Fleece-Lined Suspended Compartment up to 17"' },
      { label: 'Capacity', value: '28 Liters with Luggage Trolley Strap' }
    ],
    isFlashDeal: false,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    warranty: 'Lifetime Stitching & Zipper Warranty',
    deliveryEstimate: 'Free Standard Delivery',
    sellerName: 'TekZone Gear Studio'
  },
  {
    id: 'macbook-air-m3',
    title: 'MacBook Air',
    brand: 'Apple',
    category: 'electronics',
    subcategory: 'Laptops & Ultrabooks',
    price: 1099.00,
    oldPrice: 1299.00,
    discountPercent: 15,
    rating: 4.7,
    reviewsCount: 7900,
    reviewCountLabel: '7.9k reviews',
    image: '/assets/products/prod-macbook-air.png',
    gallery: [
      '/assets/products/prod-macbook-air.png',
      '/assets/products/prod-pavilion-laptop.png'
    ],
    badge: '-15%',
    inStock: true,
    stockCount: 19,
    sku: 'TZ-APL-MBA15',
    shortDescription: 'Apple M3 8-Core CPU / 10-Core GPU, 13.6" Liquid Retina Display, 18-Hour Battery, MagSafe 3.',
    description: 'Supercharged by the M3 chip, the ultra-thin MacBook Air breezes through work and play with up to 18 hours of battery life, a brilliant 500-nit Liquid Retina display, 1080p FaceTime HD camera, and a four-speaker sound system with Spatial Audio.',
    colors: [
      { name: 'Midnight', hex: '#1E293B' },
      { name: 'Starlight', hex: '#E5DEC9' },
      { name: 'Space Gray', hex: '#475569' }
    ],
    storageOptions: ['16GB Unified / 256GB SSD', '16GB Unified / 512GB SSD', '24GB Unified / 1TB SSD'],
    specs: [
      { label: 'Chip', value: 'Apple M3 Chip with 16-Core Neural Engine' },
      { label: 'Display', value: '13.6" Liquid Retina (2560 x 1664) True Tone' },
      { label: 'Battery Life', value: 'Up to 18 Hours Apple TV App Movie Playback' },
      { label: 'Weight', value: '2.7 pounds (1.24 kg) Fanless Silent Design' }
    ],
    isFlashDeal: false,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    warranty: '1-Year Apple Official Warranty',
    deliveryEstimate: 'Free Next-Day Insured Delivery',
    sellerName: 'TekZone Official Flagship'
  },
  {
    id: 'jbl-party-speaker',
    title: 'JBL Speaker',
    brand: 'JBL',
    category: 'electronics',
    subcategory: 'Audio & Headphones',
    price: 129.99,
    oldPrice: 199.00,
    discountPercent: 35,
    rating: 4.6,
    reviewsCount: 5200,
    reviewCountLabel: '5.2k reviews',
    image: '/assets/products/prod-jbl-speaker.png',
    gallery: [
      '/assets/products/prod-jbl-speaker.png',
      '/assets/products/prod-headphones-studio.png'
    ],
    badge: '-35%',
    inStock: true,
    stockCount: 33,
    sku: 'TZ-JBL-SPK300',
    shortDescription: 'JBL Original Pro Sound, Deep Bass Boost, Dynamic LED Lightshow, IPX4 Splashproof, 15-Hr Playtime.',
    description: 'Bring studio-grade punch and room-filling acoustics anywhere with the JBL Wireless Cube Speaker. Features dual passive bass radiators, customizable ambient light ring, and Auracast multi-speaker wireless pairing.',
    colors: [
      { name: 'Matte Black', hex: '#18181B' }
    ],
    storageOptions: ['Single Speaker', 'Stereo Pair (2x Speakers)'],
    specs: [
      { label: 'Output Power', value: '100W RMS JBL Original Pro Sound' },
      { label: 'Frequency Response', value: '45Hz – 20kHz Deep Bass' },
      { label: 'Battery', value: 'Up to 15 Hours Playtime with Fast USB-C Charge' },
      { label: 'Protection', value: 'IPX4 Splashproof Acoustic Enclosure' }
    ],
    isFlashDeal: false,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    warranty: '1-Year JBL Official Audio Warranty',
    deliveryEstimate: 'Free Express Shipping',
    sellerName: 'TekZone Audio Lab'
  },
  {
    id: 'dyson-cordless-vacuum',
    title: 'Dyson Vacuum',
    brand: 'Panasonic',
    category: 'home-living',
    subcategory: 'Floor Care & Vacuums',
    price: 399.00,
    oldPrice: 549.00,
    discountPercent: 27,
    rating: 4.8,
    reviewsCount: 6400,
    reviewCountLabel: '6.4k reviews',
    image: '/assets/products/prod-dyson-vacuum.png',
    gallery: [
      '/assets/products/prod-dyson-vacuum.png',
      '/assets/products/prod-modern-sofa.png'
    ],
    badge: '-27%',
    inStock: true,
    stockCount: 15,
    sku: 'TZ-DYS-V12',
    shortDescription: 'Hyperdymium 125,000rpm digital motor, laser dust illumination, piezo acoustic sensor & HEPA filtration.',
    description: 'Engineered for deep whole-home cleaning, this cordless stick vacuum illuminates microscopic dust on hard floors, automatically adapts suction power across carpets, and captures 99.99% of particles down to 0.3 microns.',
    colors: [
      { name: 'Iron / Purple Nickel', hex: '#6D28D9' },
      { name: 'Titanium Silver', hex: '#64748B' }
    ],
    storageOptions: ['Standard 5-Tool Kit', 'Complete Absolute 8-Tool Kit'],
    specs: [
      { label: 'Suction Power', value: '150 AW Root Cyclone Technology' },
      { label: 'Run Time', value: 'Up to 60 Minutes Fade-Free Power' },
      { label: 'Filtration', value: 'Whole-Machine Sealed HEPA Filtration' },
      { label: 'Weight', value: '5.2 lbs Ultra-Lightweight Balanced Wand' }
    ],
    isFlashDeal: true,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    warranty: '2-Year Parts & Labor Warranty',
    deliveryEstimate: 'Free Next-Day Delivery',
    sellerName: 'TekZone Home & Kitchen'
  },
  {
    id: 'smart-watch-series-9',
    title: 'Smart Watch',
    brand: 'Apple',
    category: 'electronics',
    subcategory: 'Watches & Accessories',
    price: 199.00,
    oldPrice: 279.00,
    discountPercent: 29,
    rating: 4.5,
    reviewsCount: 5100,
    reviewCountLabel: '5.1k reviews',
    image: '/assets/products/prod-smart-watch.png',
    gallery: [
      '/assets/products/prod-smart-watch.png',
      '/assets/products/prod-galaxy-watch.png'
    ],
    badge: '-29%',
    inStock: true,
    stockCount: 38,
    sku: 'TZ-APL-SW9',
    shortDescription: 'Always-On Retina LTPO OLED display, S9 SiP dual-core processor, Blood Oxygen & ECG apps, 50m water resistant.',
    description: 'Track every workout, monitor heart health, and stay connected right from your wrist. Features a 2000-nit peak brightness display, Double Tap gesture control, Crash Detection, and fast magnetic charging.',
    colors: [
      { name: 'Midnight Aluminum', hex: '#0F172A' },
      { name: 'Starlight Aluminum', hex: '#E2E8F0' }
    ],
    storageOptions: ['41mm GPS', '45mm GPS', '45mm GPS + Cellular'],
    specs: [
      { label: 'Display', value: 'Always-On Retina LTPO OLED (2000 nits peak)' },
      { label: 'Health Sensors', value: 'Blood Oxygen, Electrical Heart Sensor (ECG), Optical HR' },
      { label: 'Water Resistance', value: 'WR50 Swimproof up to 50 meters' }
    ],
    isFlashDeal: false,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    warranty: '1-Year Official Warranty',
    deliveryEstimate: 'Free Express Shipping',
    sellerName: 'TekZone Official Flagship'
  },
  // Additional rich products for Gaming, Headphones, Fashion, Home, Appliances
  {
    id: 'sony-wh-1000xm5',
    title: 'Studio Pro ANC Wireless Headphones',
    brand: 'SONY',
    category: 'electronics',
    subcategory: 'Audio & Headphones',
    price: 279.00,
    oldPrice: 399.00,
    discountPercent: 30,
    rating: 4.9,
    reviewsCount: 11200,
    reviewCountLabel: '11.2k reviews',
    image: '/assets/products/prod-headphones-studio.png',
    gallery: [
      '/assets/products/prod-headphones-studio.png',
      '/assets/products/prod-airpods-pro.png'
    ],
    badge: '-30%',
    inStock: true,
    stockCount: 27,
    sku: 'TZ-SNY-XM5',
    shortDescription: '8-microphone Auto NC Optimizer, 30mm carbon fiber drivers, LDAC Hi-Res Audio, and 30-hour battery.',
    description: 'Experience industry-leading noise cancellation powered by two dedicated processors controlling 8 microphones. Ultra-soft fit leather earcups and 30mm precision carbon fiber dome drivers deliver breathtaking studio clarity.',
    colors: [
      { name: 'Obsidian Black', hex: '#0F172A' },
      { name: 'Platinum Silver', hex: '#E2E8F0' }
    ],
    storageOptions: ['Standard Edition', 'Studio Travel Bundle'],
    specs: [
      { label: 'Driver Unit', value: '30mm Precision Carbon Fiber Composite Dome' },
      { label: 'Codec Support', value: 'LDAC, AAC, SBC Hi-Res Audio Wireless' },
      { label: 'Battery Life', value: '30 Hours (3 min USB-PD charge = 3 hours playback)' }
    ],
    isFlashDeal: true,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: true,
    warranty: '2-Year Sony Pro Audio Warranty',
    deliveryEstimate: 'Free Next-Day Delivery',
    sellerName: 'TekZone Audio Lab'
  },
  {
    id: 'ps5-slim-console',
    title: 'PlayStation 5 Console + Wireless Controller',
    brand: 'SONY',
    category: 'gaming',
    subcategory: 'PlayStation & Consoles',
    price: 449.00,
    oldPrice: 549.00,
    discountPercent: 18,
    rating: 4.9,
    reviewsCount: 15800,
    reviewCountLabel: '15.8k reviews',
    image: '/assets/products/prod-ps5-console.png',
    gallery: [
      '/assets/products/prod-ps5-console.png',
      '/assets/products/prod-controller-pro.png'
    ],
    badge: '-18%',
    inStock: true,
    stockCount: 14,
    sku: 'TZ-SNY-PS5S',
    shortDescription: '1TB Custom Ultra-High-Speed SSD, 4K 120Hz Ray Tracing, Tempest 3D AudioTech & DualSense Haptic Controller.',
    description: 'Experience lightning-fast loading with an ultra-high-speed 1TB SSD, deeper immersion with support for haptic feedback, adaptive triggers, and 3D Audio, and an all-new generation of incredible PlayStation games.',
    colors: [
      { name: 'Glacier White / Black', hex: '#F8FAFC' }
    ],
    storageOptions: ['1TB Disc Edition', '1TB Digital Edition', '1TB + 2nd DualSense Bundle'],
    specs: [
      { label: 'GPU', value: '10.3 TFLOPS Custom RDNA 2 with Hardware Ray Tracing' },
      { label: 'Storage', value: '1TB Custom PCIe Gen4 NVMe SSD (5.5GB/s)' },
      { label: 'Video Output', value: '4K @ 120Hz, 8K Support, VRR (HDMI 2.1)' }
    ],
    isFlashDeal: true,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: false,
    warranty: '1-Year Sony PlayStation Official Warranty',
    deliveryEstimate: 'Free Insured Express Delivery',
    sellerName: 'TekZone Gaming Arena'
  },
  {
    id: 'wireless-pro-controller',
    title: 'Elite Wireless Pro Gaming Controller',
    brand: 'ASUS',
    category: 'gaming',
    subcategory: 'Pro Controllers',
    price: 64.99,
    oldPrice: 99.99,
    discountPercent: 35,
    rating: 4.7,
    reviewsCount: 3400,
    reviewCountLabel: '3.4k reviews',
    image: '/assets/products/prod-controller-pro.png',
    gallery: [
      '/assets/products/prod-controller-pro.png',
      '/assets/products/prod-ps5-console.png'
    ],
    badge: '-35%',
    inStock: true,
    stockCount: 52,
    sku: 'TZ-GAM-CTRL',
    shortDescription: 'Hall-Effect drift-free thumbsticks, hair-trigger locks, 4 remappable back paddles & tri-mode wireless.',
    description: 'Dominate competitive titles with zero-deadzone Hall-Effect magnetic joysticks, tactile micro-switch face buttons, adjustable dual rumble motors, and 1000Hz polling rate over 2.4GHz wireless or USB-C.',
    colors: [
      { name: 'Carbon Black', hex: '#18181B' }
    ],
    storageOptions: ['Standard Edition', 'Pro Charging Dock Bundle'],
    specs: [
      { label: 'Thumbsticks', value: 'Anti-Drift Hall Effect Magnetic Sensors' },
      { label: 'Connectivity', value: '2.4GHz Dongle, Bluetooth 5.2, Wired USB-C' },
      { label: 'Battery Life', value: 'Up to 40 Hours Continuous Gameplay' }
    ],
    isFlashDeal: true,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    warranty: '2-Year Replacement Warranty',
    deliveryEstimate: 'Free Standard Shipping',
    sellerName: 'TekZone Gaming Arena'
  },
  {
    id: 'nordic-modular-sofa',
    title: 'Nordic Modular 3-Seater Lounge Sofa',
    brand: 'Panasonic',
    category: 'home-living',
    subcategory: 'Living Room Furniture',
    price: 549.00,
    oldPrice: 899.00,
    discountPercent: 39,
    rating: 4.8,
    reviewsCount: 1920,
    reviewCountLabel: '1.9k reviews',
    image: '/assets/products/prod-modern-sofa.png',
    gallery: [
      '/assets/products/prod-modern-sofa.png',
      '/assets/products/banner-home-art.png'
    ],
    badge: '-39%',
    inStock: true,
    stockCount: 9,
    sku: 'TZ-HOM-SOFA3',
    shortDescription: 'Kiln-dried solid ash wood frame, stain-resistant performance bouclé weave, high-resilience feather cushions.',
    description: 'Elevate your living room with architectural Scandinavian proportions. Crafted with a kiln-dried hardwood frame, pocket-sprung deep seat cushions, and liquid-repellent performance upholstery.',
    colors: [
      { name: 'Oatmeal Linen', hex: '#D6D3D1' },
      { name: 'Warm Pebble Grey', hex: '#78716C' }
    ],
    storageOptions: ['3-Seater Sofa (86")', '3-Seater + Ottoman Set'],
    specs: [
      { label: 'Dimensions', value: '86" W x 36" D x 32" H' },
      { label: 'Frame', value: 'FSC-Certified Kiln-Dried Solid Ash & Hardwood' },
      { label: 'Upholstery', value: 'Oeko-Tex Stain-Resistant Performance Linen Weave' }
    ],
    isFlashDeal: false,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    warranty: '5-Year Structural Frame Warranty',
    deliveryEstimate: 'Free White-Glove Room Delivery',
    sellerName: 'TekZone Home Studio'
  },
  {
    id: 'alpine-field-jacket',
    title: 'All-Weather Utility Field Jacket',
    brand: 'adidas',
    category: 'fashion',
    subcategory: 'Outerwear & Jackets',
    price: 79.99,
    oldPrice: 159.00,
    discountPercent: 50,
    rating: 4.7,
    reviewsCount: 2840,
    reviewCountLabel: '2.8k reviews',
    image: '/assets/products/prod-urban-jacket.png',
    gallery: [
      '/assets/products/prod-urban-jacket.png',
      '/assets/products/prod-tech-backpack.png'
    ],
    badge: '-50%',
    inStock: true,
    stockCount: 44,
    sku: 'TZ-FSH-JKT01',
    shortDescription: 'Water-resistant breathable cotton-nylon shell, brushed thermal lining, storm-flap collar & 6 utility pockets.',
    description: 'Built for transitional weather and urban exploration, this structured utility jacket blends a windproof DWR-treated shell with a soft quilted interior lining and concealed storm zip.',
    colors: [
      { name: 'Desert Khaki', hex: '#C2A886' },
      { name: 'Obsidian Navy', hex: '#1E293B' }
    ],
    storageOptions: ['Small', 'Medium', 'Large', 'X-Large'],
    specs: [
      { label: 'Shell Fabric', value: '68% Organic Cotton / 32% Recycled Nylon with DWR' },
      { label: 'Lining', value: 'Breathable Thermal Micro-Grid Fleece' },
      { label: 'Closure', value: 'Two-Way YKK Metal Zipper + Snap Storm Placket' }
    ],
    isFlashDeal: false,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    warranty: '30-Day Free Size Exchange',
    deliveryEstimate: 'Free Standard Shipping',
    sellerName: 'TekZone Apparel Co.'
  },
  {
    id: 'smart-laundry-fridge-suite',
    title: 'Inverter Smart Refrigerator & Washer Combo',
    brand: 'Samsung',
    category: 'appliances',
    subcategory: 'Smart Refrigerators',
    price: 1199.00,
    oldPrice: 1799.00,
    discountPercent: 33,
    rating: 4.8,
    reviewsCount: 1640,
    reviewCountLabel: '1.6k reviews',
    image: '/assets/products/prod-appliance-set.png',
    gallery: [
      '/assets/products/prod-appliance-set.png',
      '/assets/products/promo-appliances.png'
    ],
    badge: '-33%',
    inStock: true,
    stockCount: 7,
    sku: 'TZ-APL-COMBO',
    shortDescription: 'Digital Inverter compressor, Twin Cooling Plus, AI EcoBubble front-load washer & SmartThings Wi-Fi control.',
    description: 'Upgrade your home utility with our flagship Digital Inverter appliance bundle. Enjoy whisper-quiet energy efficiency, precise multi-zone cooling, and AI-powered fabric care controlled directly from your smartphone.',
    colors: [
      { name: 'Black Stainless & White', hex: '#334155' }
    ],
    storageOptions: ['Appliance Combo Suite', 'Refrigerator Only', 'Front-Load Washer Only'],
    specs: [
      { label: 'Energy Rating', value: 'ENERGY STAR Most Efficient 2026 Certified' },
      { label: 'Compressor', value: '20-Year Warranty Digital Inverter Motor' },
      { label: 'Smart Connectivity', value: 'Built-In Wi-Fi with Real-Time Energy Monitoring' }
    ],
    isFlashDeal: false,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    warranty: '10-Year Motor & Compressor Warranty',
    deliveryEstimate: 'Free Scheduled In-Home Installation',
    sellerName: 'Samsung Experience Partner'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    productId: 'airpods-pro-2',
    author: 'Marcus Vance',
    rating: 5,
    date: 'October 14, 2026',
    title: 'Unbelievable noise cancellation and USB-C convenience',
    comment: 'Switched from the 1st gen and the difference in Active Noise Cancellation and Adaptive Audio is night and day. Flights and coffee shops are completely silent, and the bass response is much richer.',
    verified: true,
    helpfulCount: 84
  },
  {
    id: 'rev-2',
    productId: 'airpods-pro-2',
    author: 'Elena Rostova',
    rating: 5,
    date: 'October 9, 2026',
    title: 'Fastest shipping from TekZone — 100% genuine Apple product',
    comment: 'Arrived the very next morning in factory-sealed packaging. Serial number verified immediately with AppleCare. Conversation awareness works like magic during office calls.',
    verified: true,
    helpfulCount: 52
  },
  {
    id: 'rev-3',
    productId: 'galaxy-watch-6',
    author: 'Devon Brooks',
    rating: 5,
    date: 'October 11, 2026',
    title: 'Sapphire crystal screen is super bright outdoors',
    comment: 'The thinner bezels make the display look huge without feeling bulky on the wrist. Sleep tracking and heart-rate zone coaching have genuinely improved my morning runs.',
    verified: true,
    helpfulCount: 39
  },
  {
    id: 'rev-4',
    productId: 'hp-pavilion-15',
    author: 'Sophia Chen',
    rating: 5,
    date: 'October 6, 2026',
    title: 'Handles 40+ browser tabs and Figma effortlessly',
    comment: 'At $699 with 16GB RAM and 1TB NVMe SSD, this Pavilion 15 is unbeatable value. Boots in 4 seconds and the B&O speakers sound surprisingly full.',
    verified: true,
    helpfulCount: 61
  }
];

export const INITIAL_QUESTIONS: QuestionItem[] = [
  {
    id: 'qa-1',
    productId: 'airpods-pro-2',
    question: 'Does this model include the latest USB-C MagSafe Charging Case and braided USB-C cable?',
    askedBy: 'Liam K.',
    date: 'October 12, 2026',
    answer: 'Yes! All units shipped by TekZone are the latest factory-sealed USB-C MagSafe Charging Case edition with IP54 dust resistance, lanyard loop, and braided USB-C cable included in the box.',
    answeredBy: 'TekZone Official Flagship'
  },
  {
    id: 'qa-2',
    productId: 'airpods-pro-2',
    question: 'Can I pair these with a Windows laptop or Android phone as well as iPhone?',
    askedBy: 'Hannah T.',
    date: 'October 8, 2026',
    answer: 'Absolutely. They work seamlessly over standard Bluetooth 5.3 with any Windows PC, Mac, Android smartphone, or smart TV, while still retaining physical stem press controls for ANC and Transparency mode.',
    answeredBy: 'TekZone Audio Specialist'
  }
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'TZ-94821',
    date: 'October 19, 2026',
    status: 'Out for Delivery',
    statusStep: 4,
    total: 348.00,
    subtotal: 348.00,
    discount: 160.00,
    shipping: 0,
    tax: 0,
    paymentMethod: 'Visa Ending in 4242',
    shippingAddress: {
      fullName: 'Alex Morgan',
      phone: '+1 (555) 234-8910',
      street: '742 Evergreen Innovation Way, Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States'
    },
    trackingNumber: '1Z999AA10123456784',
    estimatedDelivery: 'Today by 6:00 PM',
    items: [
      {
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Pure White',
        selectedStorage: 'USB-C MagSafe Case'
      },
      {
        product: INITIAL_PRODUCTS[1],
        quantity: 1,
        selectedColor: 'Graphite Black',
        selectedStorage: '44mm Bluetooth'
      }
    ]
  },
  {
    id: 'TZ-88310',
    date: 'October 4, 2026',
    status: 'Delivered',
    statusStep: 5,
    total: 164.98,
    subtotal: 164.98,
    discount: 65.00,
    shipping: 0,
    tax: 0,
    paymentMethod: 'Apple Pay',
    shippingAddress: {
      fullName: 'Alex Morgan',
      phone: '+1 (555) 234-8910',
      street: '742 Evergreen Innovation Way, Suite 4B',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      country: 'United States'
    },
    trackingNumber: '1Z999AA10198811209',
    estimatedDelivery: 'Delivered on Oct 6, 2026',
    items: [
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1,
        selectedColor: 'Triple White',
        selectedStorage: 'US 10'
      },
      {
        product: INITIAL_PRODUCTS[5],
        quantity: 1,
        selectedColor: 'Obsidian Black',
        selectedStorage: '4.1L Essential XL'
      }
    ]
  }
];
