# 🛍️ TekZone — Better Tech • Better Life

**TekZone** is a complete, production-grade multi-category e-commerce marketplace web application built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**. Designed for high-conversion online retail, it features a complete end-to-end shopping experience—from dynamic product discovery and flash sales to a 6-step checkout flow, real-time order tracking, a Seller Hub, and an Enterprise Admin Console.

---

## ✨ Key Features

### 🏬 1. Storefront & Product Discovery
- **Announcement & Promo Top Bar**: Displays trust badges (*Free Shipping Over $50*, *Easy Returns*, *Secure Payments*) and a click-to-copy `WELCOME` promo code badge (20% off).
- **Sticky Marketplace Header**:
  - Custom geometric **TekZone** (`TZ`) vector logo and brand lockup.
  - Category-scoped search bar with **live instant product autocomplete** (thumbnails, brand, price, and strikethrough MSRP).
  - Live counters for **Wishlist** and **Shopping Cart** (with a slide-over Quick Cart Drawer).
- **Interactive Hero Carousel**: Multi-slide promotional hero with auto-advance, manual controls, studio hardware photography, discount callouts, and trust highlights.
- **Shop by Category**: 8 visual category cards (*Electronics*, *Fashion*, *Home & Living*, *Beauty*, *Gaming*, *Sports*, *Smartphones*, *Appliances*) with one-click catalog filtering.
- **⚡ Live Flash Deals**: Real-time ticking countdown timer (`05 : 32 : 18`) with a horizontally scrollable product carousel.
- **Curated Collections & Promotional Banners**:
  - Wide promotional campaign cards (*Gaming Zone*, *Beauty Essentials*, *Home & Living*).
  - Side-by-side **⭐ Best Sellers** and **🔥 Trending Now** 4-card showcases.
  - **👑 Top Brands** bar (*Apple*, *Samsung*, *Nike*, *Adidas*, *HP*, *Sony*, *JBL*, *Panasonic*, *ASUS*, *Dell*) that filters the catalog by brand.

### 🔍 2. Advanced Shop & Filtering Engine
- **Multi-Faceted Left Sidebar**:
  - Filter by Category, Maximum Price range slider, Brand, Customer Star Rating (`4.5★ & up`, `4.0★ & up`), Minimum Discount (`20%`, `30%`, `40%+`), and In-Stock availability.
- **Collection Tabs & Sorting**:
  - Filter by *All Products*, *⚡ Flash Deals*, *⭐ Best Sellers*, *🔥 Trending*, or *✨ New Arrivals*.
  - Sort by *Featured*, *Newest Arrivals*, *Best Selling*, *Price: Low → High*, *Price: High → Low*, and *Top Rated*.

### 📦 3. Product Details Page (PDP)
- **Interactive Image Gallery**: Multi-angle studio photography with thumbnail switching and click-to-zoom lens inspection.
- **Contiguous Purchase Module**: Color swatches, storage/size/edition selectors, live stock counter, quantity stepper, **Add to Cart**, **Buy Now** (instant jump to checkout), and **Wishlist** toggle.
- **Frequently Bought Together**: Interactive bundle builder with dynamic price calculation and one-click *Add Both to Cart*.
- **Rich Information Tabs**:
  - *Description & Highlights*
  - *Technical Specifications*
  - *Verified Customer Reviews* (with an interactive **Write a Review** form)
  - *Questions & Answers* (with an interactive **Ask a Question** form)
  - *Shipping & Warranty Policies*
- **Related & Recently Viewed Products**: Automatic tracking of recently viewed items across the session.

### 🛒 4. Shopping Cart & 6-Step Checkout
- **Full Shopping Cart & Slide-Over Drawer**:
  - Update item quantities, remove items, or move items to **Saved for Later**.
  - Apply promotional discount codes (`WELCOME` for 20% off, `TEK10` for 10% off) with automatic tax and free-shipping calculation.
- **6-Step Checkout Architecture**:
  1. **Customer Information** (Name, Email, Phone)
  2. **Shipping Address** (Street, Suite, City, State, ZIP, Country)
  3. **Delivery Method** (*Free Standard Express*, *Priority Next-Morning Air Courier*, *Scheduled White-Glove Delivery*)
  4. **Payment Method** (*Credit / Debit Card*, *Digital Wallet [Apple Pay / PayPal / Google Pay]*, or *Cash on Delivery [COD]*)
  5. **Final Order Review** (Itemized summary & address verification)
  6. **Order Confirmation** (Generated Order ID `#TZ-...`, tracking number, and receipt summary)

### 🚚 5. Live Order Tracking & Customer Account Portal
- **6-Stage Visual Order Tracking Timeline**:
  - Tracks packages across: *01. Order Confirmed → 02. Processing → 03. Packed → 04. Shipped → 05. Out for Delivery → 06. Delivered*.
  - Includes an interactive **Advance Shipment Stage** simulator button to test live order state transitions.
- **9-Tab Customer Account Dashboard**:
  - *Dashboard Overview*, *My Orders* (with *Buy Again* & *Live Tracking*), *Wishlist*, *Saved Addresses*, *Payment Methods*, *My Reviews*, *Notifications*, *24/7 Support Tickets*, and *Account Settings*.

### 🏪 6. Seller Hub & Private Admin Panel
- **Seller Experience (`Become a Seller` + `Seller Dashboard`)**:
  - Seller onboarding and registration flow.
  - **11-Tab Seller Dashboard**: *Overview*, *Products*, *Add Product* (live form that publishes new products directly into the store catalog), *Orders*, *Inventory* (live stock adjuster), *Customers*, *Reviews*, *Coupons*, *Analytics*, *Payments*, and *Store Settings*.
- **Private Admin Console**:
  - **6 Executive KPI Cards**: *Total Sales*, *Orders*, *Customers*, *Products*, *Sellers*, and *Revenue*.
  - **14 Management Modules**: *Dashboard*, *Products*, *Orders*, *Customers*, *Sellers*, *Categories*, *Brands*, *Reviews*, *Coupons*, *Banners*, *Payments*, *Returns*, *Reports*, and *Settings*.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** (`react`, `react-dom`) | Component-driven UI architecture, hooks (`useState`, `useEffect`, `useMemo`, `useRef`), and state management |
| **Language** | **TypeScript 5/7** | End-to-end static typing for products, cart entries, orders, reviews, and navigation states |
| **Styling** | **Tailwind CSS v4** (`@tailwindcss/vite`) | Utility-first responsive layout, custom design tokens, gradients, and micro-interactions |
| **Build Tool & Bundler** | **Vite 8** | Lightning-fast dev server and optimized production asset bundling |
| **Icons** | **Lucide React** (`lucide-react`) | Clean, consistent e-commerce and dashboard iconography |
| **Typography** | **Google Fonts** | `Outfit` (Display headings), `Plus Jakarta Sans` (Body prose & UI), and `JetBrains Mono` (Tabular prices, SKUs, and tracking IDs) |
| **Persistence** | **Browser `localStorage` API** | Client-side persistence for shopping cart, wishlist, custom seller products, and placed orders |

---

## 📂 Project Structure

```text
├── public/
│   └── assets/
│       └── products/                # High-resolution studio product & promotional banner photography
├── src/
│   ├── components/
│   │   ├── Header.tsx               # Top bar, sticky search header, category mega-menu & mobile drawer
│   │   ├── HomePage.tsx             # Hero carousel, categories, Flash Deals, banners, Best Sellers & Trending
│   │   ├── ProductCard.tsx          # Reusable product card (standard & compact variants)
│   │   ├── ShopPage.tsx             # Full catalog view with multi-filter sidebar & sorting bar
│   │   ├── ProductDetailPage.tsx    # Zoomable gallery, variants, bundle builder, reviews & Q&A tabs
│   │   ├── CartCheckoutPage.tsx     # Shopping cart, Save for Later, CartDrawer & 6-step checkout flow
│   │   ├── AccountTrackingPage.tsx  # 6-stage Order Tracking timeline & 9-tab Customer Account portal
│   │   ├── SellerAdminPage.tsx      # Seller registration, 11-tab Seller Hub & 14-module Admin Console
│   │   └── Footer.tsx               # Service features strip, multi-column footer, newsletter & payment badges
│   ├── data/
│   │   └── storeData.ts             # TypeScript interfaces, initial product catalog, categories, brands & orders
│   ├── App.tsx                      # Root state container, localStorage sync & view router
│   ├── index.css                    # Tailwind CSS v4 imports, custom font variables & utility classes
│   └── main.tsx                     # Application entry point
├── index.html                       # SEO meta tags, OpenGraph metadata & Google Fonts links
├── package.json                     # Project dependencies and build scripts
├── tsconfig.json                    # TypeScript configuration
└── vite.config.ts                   # Vite bundler configuration
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tekzone-ecommerce.git
   cd tekzone-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build for production**
   ```bash
   npm run build
   ```

---

## 💡 Interactive Demo Tips

- **Promo Codes**: Use code **`WELCOME`** (20% OFF) or **`TEK10`** (10% OFF) in the Shopping Cart or click the red `WELCOME` badge in the top bar to copy it.
- **Live Order Tracking**: Visit **Orders** in the header (or place a new order via Checkout) and click **"Advance Shipment Stage →"** to watch the 6-stage delivery timeline update in real time.
- **Publish a New Product**: Click **Become a Seller** in the navigation bar → open **Add Product** → fill out the form and submit to see your new product immediately appear in the live TekZone store catalog.
- **Admin Console**: Click **Admin Panel** in the top-right announcement bar to inspect store-wide KPIs, inventory levels, and order fulfillment.

---

## 📄 License

This project is licensed under the **Apache-2.0 License**.
© 2026 **TekZone** (`Better Tech • Better Life`). All rights reserved.
#   T e k Z o n e - s t o r e -  
 