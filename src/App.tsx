/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_QUESTIONS,
  INITIAL_ORDERS,
  Product,
  ReviewItem,
  QuestionItem,
  OrderItem
} from './data/storeData';
import { Header, PageView } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import {
  CartCheckoutPage,
  CartDrawer,
  CartEntry
} from './components/CartCheckoutPage';
import { AccountTrackingPage } from './components/AccountTrackingPage';
import { SellerAdminPage } from './components/SellerAdminPage';

const ORDER_STATUS_LIST: OrderItem['status'][] = [
  'Order Confirmed',
  'Processing',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [accountTab, setAccountTab] = useState<string>('dashboard');
  const [trackingOrderId, setTrackingOrderId] = useState<string>('TZ-94821');

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('tekzone_products_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([
    INITIAL_PRODUCTS[0],
    INITIAL_PRODUCTS[6],
    INITIAL_PRODUCTS[9],
    INITIAL_PRODUCTS[2]
  ]);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tekzone_wishlist_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['airpods-pro-2', 'iphone-15-pro', 'ps5-slim-console'];
  });

  const [cart, setCart] = useState<CartEntry[]>(() => {
    try {
      const saved = localStorage.getItem('tekzone_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
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
      },
      {
        product: INITIAL_PRODUCTS[3],
        quantity: 1,
        selectedColor: 'Triple White',
        selectedStorage: 'US 10'
      }
    ];
  });

  const [savedForLater, setSavedForLater] = useState<CartEntry[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);

  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [questions, setQuestions] = useState<QuestionItem[]>(INITIAL_QUESTIONS);
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    try {
      const saved = localStorage.getItem('tekzone_orders_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('tekzone_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tekzone_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('tekzone_orders_v1', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('tekzone_products_v1', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  const handleNavigate = (
    page: PageView,
    options?: {
      category?: string;
      filter?: string;
      brand?: string;
      search?: string;
      productId?: string;
      accountTab?: string;
      orderId?: string;
    }
  ) => {
    if (options?.category !== undefined) {
      setSelectedCategory(options.category);
    }
    if (options?.filter !== undefined) {
      setActiveFilter(options.filter);
    } else if (page === 'shop' && options?.category) {
      setActiveFilter('all');
    }
    if (options?.brand !== undefined) {
      setSelectedBrand(options.brand);
    } else if (page === 'shop' && options?.category) {
      setSelectedBrand('');
    }
    if (options?.search !== undefined) {
      setSearchQuery(options.search);
    }
    if (options?.accountTab) {
      setAccountTab(options.accountTab);
    }
    if (options?.orderId) {
      setTrackingOrderId(options.orderId);
    }
    if (options?.productId) {
      const found = products.find((p) => p.id === options.productId);
      if (found) setSelectedProduct(found);
    }

    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setRecentlyViewed((prev) => [
      product,
      ...prev.filter((item) => item.id !== product.id)
    ]);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    storage?: string
  ) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard';
    const chosenStorage = storage || product.storageOptions?.[0];

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id && item.selectedColor === chosenColor
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          selectedColor: chosenColor,
          selectedStorage: chosenStorage
        }
      ];
    });
  };

  const handleBuyNow = (
    product: Product,
    quantity: number,
    color: string,
    storage?: string
  ) => {
    handleAddToCart(product, quantity, color, storage);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (productId: string, color: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor === color) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (productId: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && item.selectedColor === color)
      )
    );
  };

  const handleSaveForLater = (entry: CartEntry) => {
    handleRemoveFromCart(entry.product.id, entry.selectedColor);
    setSavedForLater((prev) => [
      entry,
      ...prev.filter((i) => i.product.id !== entry.product.id)
    ]);
  };

  const handleMoveToCart = (entry: CartEntry) => {
    setSavedForLater((prev) =>
      prev.filter((i) => i.product.id !== entry.product.id)
    );
    handleAddToCart(
      entry.product,
      entry.quantity,
      entry.selectedColor,
      entry.selectedStorage
    );
  };

  const handleApplyPromo = (code: string): boolean => {
    const clean = code.toUpperCase();
    if (clean === 'WELCOME') {
      setPromoCode('WELCOME');
      setDiscountRate(0.2);
      return true;
    }
    if (clean === 'TEK10') {
      setPromoCode('TEK10');
      setDiscountRate(0.1);
      return true;
    }
    return false;
  };

  const handlePlaceOrder = (orderData: {
    customerName: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    deliveryMethod: string;
    deliveryFee: number;
    paymentMethod: string;
  }): OrderItem => {
    const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const discount = subtotal * discountRate;
    const tax = Math.max(0, (subtotal - discount) * 0.06);
    const total = Math.max(0, subtotal - discount + orderData.deliveryFee + tax);

    const newOrder: OrderItem = {
      id: `TZ-${Math.floor(10000 + Math.random() * 89999)}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      status: 'Order Confirmed',
      statusStep: 0,
      total,
      subtotal,
      discount,
      shipping: orderData.deliveryFee,
      tax,
      paymentMethod: orderData.paymentMethod,
      shippingAddress: {
        fullName: orderData.customerName,
        phone: orderData.phone,
        street: orderData.street,
        city: orderData.city,
        state: orderData.state,
        zip: orderData.zip,
        country: orderData.country
      },
      trackingNumber: `1Z999AA10${Math.floor(100000000 + Math.random() * 899999999)}`,
      estimatedDelivery: 'Estimated in 1–2 Business Days',
      items: [...cart]
    };

    setOrders((prev) => [newOrder, ...prev]);
    setTrackingOrderId(newOrder.id);
    setCart([]);
    setPromoCode('');
    setDiscountRate(0);
    return newOrder;
  };

  const handleAdvanceOrderStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId && o.statusStep < 5) {
          const nextStep = o.statusStep + 1;
          return {
            ...o,
            statusStep: nextStep,
            status: ORDER_STATUS_LIST[nextStep],
            estimatedDelivery:
              nextStep === 5 ? 'Delivered Just Now' : o.estimatedDelivery
          };
        }
        return o;
      })
    );
  };

  const handleAddReview = (
    rev: Omit<ReviewItem, 'id' | 'date' | 'helpfulCount'>
  ) => {
    const created: ReviewItem = {
      ...rev,
      id: `rev-${Date.now()}`,
      date: 'October 22, 2026',
      helpfulCount: 1
    };
    setReviews((prev) => [created, ...prev]);
  };

  const handleAddQuestion = (
    q: Omit<QuestionItem, 'id' | 'date' | 'answer' | 'answeredBy'>
  ) => {
    const created: QuestionItem = {
      ...q,
      id: `qa-${Date.now()}`,
      date: 'October 22, 2026',
      answer:
        'Thank you for your question! Our TekZone Flagship technical team confirms this model ships brand-new in sealed retail packaging with full manufacturer warranty.',
      answeredBy: 'TekZone Specialist'
    };
    setQuestions((prev) => [created, ...prev]);
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleUpdateStock = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stockCount: newStock, inStock: newStock > 0 }
          : p
      )
    );
  };

  const totalCartItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] text-[#0F172A]">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={totalCartItems}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        products={products}
        onSelectProduct={handleSelectProduct}
        onOpenCartDrawer={() => setCartDrawerOpen(true)}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            products={products}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'product' && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            recentlyViewed={recentlyViewed}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
            reviews={reviews}
            onAddReview={handleAddReview}
            questions={questions}
            onAddQuestion={handleAddQuestion}
          />
        )}

        {(currentPage === 'cart' || currentPage === 'checkout') && (
          <CartCheckoutPage
            mode={currentPage}
            cart={cart}
            savedForLater={savedForLater}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onSaveForLater={handleSaveForLater}
            onMoveToCart={handleMoveToCart}
            onRemoveSaved={(id) =>
              setSavedForLater((prev) => prev.filter((i) => i.product.id !== id))
            }
            promoCode={promoCode}
            discountRate={discountRate}
            onApplyPromo={handleApplyPromo}
            onPlaceOrder={handlePlaceOrder}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {(currentPage === 'account' || currentPage === 'tracking') && (
          <AccountTrackingPage
            mode={currentPage}
            initialTab={accountTab}
            initialOrderId={trackingOrderId}
            orders={orders}
            onAdvanceOrderStatus={handleAdvanceOrderStatus}
            wishlistIds={wishlist}
            products={products}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            reviews={reviews}
            onNavigate={handleNavigate}
          />
        )}

        {(currentPage === 'seller' || currentPage === 'admin') && (
          <SellerAdminPage
            mode={currentPage}
            products={products}
            orders={orders}
            reviews={reviews}
            onAddProduct={handleAddProduct}
            onUpdateStock={handleUpdateStock}
            onAdvanceOrderStatus={handleAdvanceOrderStatus}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <CartDrawer
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
