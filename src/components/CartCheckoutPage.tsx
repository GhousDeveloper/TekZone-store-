import React, { useState } from 'react';
import {
  Trash2,
  Bookmark,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Tag,
  X,
  PackageCheck
} from 'lucide-react';
import { Product, OrderItem } from '../data/storeData';
import { PageView } from './Header';

export interface CartEntry {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedStorage?: string;
}

interface CartCheckoutPageProps {
  mode: 'cart' | 'checkout';
  cart: CartEntry[];
  savedForLater: CartEntry[];
  onUpdateQuantity: (productId: string, color: string, delta: number) => void;
  onRemoveFromCart: (productId: string, color: string) => void;
  onSaveForLater: (entry: CartEntry) => void;
  onMoveToCart: (entry: CartEntry) => void;
  onRemoveSaved: (productId: string) => void;
  promoCode: string;
  discountRate: number;
  onApplyPromo: (code: string) => boolean;
  onPlaceOrder: (orderData: {
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
  }) => OrderItem;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: PageView, options?: { orderId?: string }) => void;
}

export const CartCheckoutPage: React.FC<CartCheckoutPageProps> = ({
  mode,
  cart,
  savedForLater,
  onUpdateQuantity,
  onRemoveFromCart,
  onSaveForLater,
  onMoveToCart,
  onRemoveSaved,
  promoCode,
  discountRate,
  onApplyPromo,
  onPlaceOrder,
  onSelectProduct,
  onNavigate
}) => {
  const [couponInput, setCouponInput] = useState(promoCode || '');
  const [couponMessage, setCouponMessage] = useState<{ text: string; ok: boolean } | null>(
    null
  );

  // 6-step checkout state (1..6)
  const [step, setStep] = useState<number>(1);
  const [customerName, setCustomerName] = useState('Alex Morgan');
  const [email, setEmail] = useState('alex.morgan@tekzone.io');
  const [phone, setPhone] = useState('+1 (555) 234-8910');

  const [street, setStreet] = useState('742 Evergreen Innovation Way, Suite 4B');
  const [city, setCity] = useState('San Francisco');
  const [state, setState] = useState('CA');
  const [zip, setZip] = useState('94107');
  const [country, setCountry] = useState('United States');

  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'scheduled'>(
    'standard'
  );
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'digital'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('842');

  const [confirmedOrder, setConfirmedOrder] = useState<OrderItem | null>(null);

  // Calculations
  const originalSubtotal = cart.reduce(
    (sum, item) => sum + item.product.oldPrice * item.quantity,
    0
  );
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const productSavings = Math.max(0, originalSubtotal - subtotal);
  const promoSavings = subtotal * discountRate;
  const deliveryFee =
    subtotal === 0
      ? 0
      : deliveryMethod === 'express'
      ? 14.99
      : subtotal >= 50
      ? 0
      : 7.99;
  const tax = Math.max(0, (subtotal - promoSavings) * 0.06);
  const finalTotal = Math.max(0, subtotal - promoSavings + deliveryFee + tax);

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onApplyPromo(couponInput.trim());
    if (ok) {
      setCouponMessage({
        text: `Promo code "${couponInput.toUpperCase()}" applied!`,
        ok: true
      });
    } else {
      setCouponMessage({
        text: 'Try code WELCOME (20% off) or TEK10 (10% off).',
        ok: false
      });
    }
  };

  const handleFinalizeOrder = () => {
    const paymentLabel =
      paymentMethod === 'card'
        ? `Credit Card (${cardNumber.slice(-4)})`
        : paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : 'Digital Wallet (Apple Pay / PayPal)';

    const created = onPlaceOrder({
      customerName,
      email,
      phone,
      street,
      city,
      state,
      zip,
      country,
      deliveryMethod:
        deliveryMethod === 'express'
          ? 'Priority Next-Morning Courier'
          : deliveryMethod === 'scheduled'
          ? 'Scheduled White-Glove Delivery'
          : 'Free Standard Express (1–2 Days)',
      deliveryFee,
      paymentMethod: paymentLabel
    });
    setConfirmedOrder(created);
    setStep(6);
  };

  // CART VIEW
  if (mode === 'cart') {
    return (
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-7 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Shopping Cart
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {cart.reduce((s, i) => s + i.quantity, 0)} items in your bag · Free shipping unlocked on orders over $50
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#E11D48] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-[#E11D48] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="font-display text-xl font-extrabold text-slate-900">
              Your TekZone Cart is Empty
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Explore our Flash Deals, Best Sellers, and Flagship Tech categories to add items to your cart.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="px-6 py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
            >
              Explore Flash Deals
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white rounded-2xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden">
                {cart.map((entry) => (
                  <div
                    key={`${entry.product.id}-${entry.selectedColor}`}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={entry.product.image}
                        alt={entry.product.title}
                        referrerPolicy="no-referrer"
                        onClick={() => onSelectProduct(entry.product)}
                        className="w-20 h-20 object-contain rounded-xl border border-slate-200 p-2 bg-white cursor-pointer shrink-0"
                      />
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold uppercase text-slate-400">
                          {entry.product.brand}
                        </p>
                        <button
                          type="button"
                          onClick={() => onSelectProduct(entry.product)}
                          className="font-bold text-sm sm:text-base text-slate-900 hover:text-[#E11D48] text-left cursor-pointer"
                        >
                          {entry.product.title}
                        </button>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>Color: <strong className="text-slate-700">{entry.selectedColor}</strong></span>
                          {entry.selectedStorage && (
                            <>
                              <span>·</span>
                              <span>Option: <strong className="text-slate-700">{entry.selectedStorage}</strong></span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            type="button"
                            onClick={() => onSaveForLater(entry)}
                            className="text-xs font-semibold text-slate-500 hover:text-[#0F172A] inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Bookmark className="w-3.5 h-3.5" /> Save for Later
                          </button>
                          <span className="text-slate-300">|</span>
                          <button
                            type="button"
                            onClick={() =>
                              onRemoveFromCart(entry.product.id, entry.selectedColor)
                            }
                            className="text-xs font-semibold text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                      <div className="text-right">
                        <p className="text-base font-extrabold text-[#E11D48] tabular-nums">
                          ${(entry.product.price * entry.quantity).toFixed(2)}
                        </p>
                        {entry.product.oldPrice > entry.product.price && (
                          <p className="text-xs text-slate-400 line-through tabular-nums">
                            ${(entry.product.oldPrice * entry.quantity).toFixed(2)}
                          </p>
                        )}
                      </div>

                      <div className="h-9 rounded-lg border border-slate-300 bg-slate-50 flex items-center overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(entry.product.id, entry.selectedColor, -1)
                          }
                          className="w-8 h-full text-slate-700 hover:bg-slate-200 font-bold text-xs cursor-pointer"
                        >
                          −
                        </button>
                        <span className="w-9 text-center text-xs font-bold text-slate-900 tabular-nums">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(entry.product.id, entry.selectedColor, 1)
                          }
                          className="w-8 h-full text-slate-700 hover:bg-slate-200 font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Saved for Later Section */}
              {savedForLater.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4">
                  <h3 className="font-display text-base font-extrabold text-slate-900">
                    Saved for Later ({savedForLater.length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {savedForLater.map((sv) => (
                      <div
                        key={sv.product.id}
                        className="p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={sv.product.image}
                            alt={sv.product.title}
                            referrerPolicy="no-referrer"
                            className="w-14 h-14 object-contain"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              {sv.product.title}
                            </p>
                            <p className="text-xs font-extrabold text-[#E11D48] tabular-nums">
                              ${sv.product.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => onMoveToCart(sv)}
                            className="px-3 py-1 rounded-md bg-[#0F172A] text-white text-[11px] font-bold cursor-pointer"
                          >
                            Move to Cart
                          </button>
                          <button
                            type="button"
                            onClick={() => onRemoveSaved(sv.product.id)}
                            className="text-[11px] text-slate-400 hover:text-rose-600 cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-6 space-y-5 sticky top-28">
              <h2 className="font-display text-lg font-extrabold text-slate-900">
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <form onSubmit={handleCouponSubmit} className="space-y-2">
                <label className="block text-xs font-bold text-slate-600">
                  Have a Promo Code? (Try <span className="text-[#E11D48]">WELCOME</span>)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter code WELCOME"
                    className="flex-1 h-9 px-3 rounded-lg border border-slate-300 text-xs uppercase font-bold focus:outline-none focus:border-[#E11D48]"
                  />
                  <button
                    type="submit"
                    className="h-9 px-4 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p
                    className={`text-[11px] font-semibold ${
                      couponMessage.ok ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {couponMessage.text}
                  </p>
                )}
              </form>

              <div className="space-y-2.5 text-xs border-t border-slate-100 pt-4">
                <div className="flex justify-between text-slate-600">
                  <span>Retail Subtotal</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    ${originalSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Deal Discount Savings</span>
                  <span className="font-bold tabular-nums">
                    −${productSavings.toFixed(2)}
                  </span>
                </div>
                {promoSavings > 0 && (
                  <div className="flex justify-between text-[#E11D48]">
                    <span className="inline-flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Coupon ({promoCode})
                    </span>
                    <span className="font-bold tabular-nums">
                      −${promoSavings.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Estimate</span>
                  <span className="font-bold text-emerald-600">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Tax (6%)</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <span className="text-sm font-extrabold text-slate-900">
                    Order Total
                  </span>
                  <span className="font-display text-2xl font-extrabold text-[#E11D48] tabular-nums">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('checkout')}
                className="w-full h-12 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-md shadow-[#E11D48]/20 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // MULTI-STEP CHECKOUT VIEW (6 Steps)
  const stepsList = [
    { num: 1, label: 'Customer Info' },
    { num: 2, label: 'Shipping Address' },
    { num: 3, label: 'Delivery' },
    { num: 4, label: 'Payment' },
    { num: 5, label: 'Order Review' },
    { num: 6, label: 'Confirmation' }
  ];

  return (
    <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-7 space-y-7">
      {/* Step Progress Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900">
            Secure Multi-Step Checkout
          </h1>
          {step < 6 && (
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className="text-xs font-bold text-slate-600 hover:text-[#E11D48] cursor-pointer"
            >
              ← Back to Cart
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {stepsList.map((s) => {
            const isActive = step === s.num;
            const isDone = step > s.num;
            return (
              <button
                key={s.num}
                type="button"
                disabled={step === 6 || s.num > step}
                onClick={() => s.num < step && setStep(s.num)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isActive
                    ? 'border-[#E11D48] bg-rose-50/50 text-slate-900'
                    : isDone
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-800 cursor-pointer'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                      isActive
                        ? 'bg-[#E11D48] text-white'
                        : isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isDone ? '✓' : s.num}
                  </span>
                  <span className="truncate">{s.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 6: Order Confirmation */}
      {step === 6 && confirmedOrder ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-8 max-w-2xl mx-auto text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="inline-block text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Order Confirmed
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            Thank You, {confirmedOrder.shippingAddress.fullName}!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Your order <strong className="text-slate-900 font-mono">#{confirmedOrder.id}</strong> has been placed and is now being prepared for dispatch.
          </p>

          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Order Number:</span>
              <span className="font-mono font-bold text-slate-900">#{confirmedOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tracking Number:</span>
              <span className="font-mono font-bold text-[#E11D48]">{confirmedOrder.trackingNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Shipping To:</span>
              <span className="font-semibold text-slate-900">
                {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Payment Method:</span>
              <span className="font-semibold text-slate-900">{confirmedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <span className="font-bold text-slate-900">Total Paid:</span>
              <span className="font-extrabold text-[#E11D48] text-sm tabular-nums">
                ${confirmedOrder.total.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('tracking', { orderId: confirmedOrder.id })}
              className="px-6 py-3 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer"
            >
              <PackageCheck className="w-4 h-4" /> Track Order Status
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-bold cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* Active Step Form */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 p-6">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-extrabold text-slate-900">
                  Step 1: Customer Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (for Order Receipt)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Phone Number (for Delivery SMS)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                </div>
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Shipping Address <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-extrabold text-slate-900">
                  Step 2: Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Street Address & Suite
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Postal / ZIP Code
                    </label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full h-10 px-3.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                </div>
                <div className="pt-3 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Delivery Method <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-extrabold text-slate-900">
                  Step 3: Select Delivery Speed
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      id: 'standard',
                      title: 'Free Standard Express Delivery (1–2 Business Days)',
                      desc: 'Fully insured doorstep delivery with live GPS tracking.',
                      price: subtotal >= 50 ? 'FREE' : '$7.99'
                    },
                    {
                      id: 'express',
                      title: 'Priority Next-Morning Air Courier',
                      desc: 'Guaranteed delivery before 10:30 AM tomorrow.',
                      price: '$14.99'
                    },
                    {
                      id: 'scheduled',
                      title: 'Scheduled White-Glove Room Delivery',
                      desc: 'Choose your preferred 2-hour delivery window.',
                      price: 'FREE'
                    }
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        deliveryMethod === opt.id
                          ? 'border-[#E11D48] bg-rose-50/30 ring-2 ring-[#E11D48]/15'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="delivery"
                          checked={deliveryMethod === opt.id}
                          onChange={() =>
                            setDeliveryMethod(opt.id as typeof deliveryMethod)
                          }
                          className="mt-1 accent-[#E11D48]"
                        />
                        <div>
                          <p className="text-sm font-bold text-slate-900">{opt.title}</p>
                          <p className="text-xs text-slate-500">{opt.desc}</p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-700">
                        {opt.price}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="pt-3 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    Continue to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-extrabold text-slate-900">
                  Step 4: Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#E11D48] bg-rose-50/40 ring-2 ring-[#E11D48]/15'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-[#E11D48] mb-2" />
                    <p className="text-xs font-extrabold text-slate-900">
                      Credit / Debit Card
                    </p>
                    <p className="text-[11px] text-slate-500">Visa, Mastercard, Amex</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('digital')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'digital'
                        ? 'border-[#E11D48] bg-rose-50/40 ring-2 ring-[#E11D48]/15'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-[#E11D48] mb-2" />
                    <p className="text-xs font-extrabold text-slate-900">
                      Digital Payment
                    </p>
                    <p className="text-[11px] text-slate-500">Apple Pay, PayPal, GPay</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#E11D48] bg-rose-50/40 ring-2 ring-[#E11D48]/15'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-[#E11D48] mb-2" />
                    <p className="text-xs font-extrabold text-slate-900">
                      Cash on Delivery
                    </p>
                    <p className="text-[11px] text-slate-500">Pay at your doorstep</p>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-lg border border-slate-300 bg-white text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-lg border border-slate-300 bg-white text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Security Code (CVC)
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full h-10 px-3.5 rounded-lg border border-slate-300 bg-white text-sm font-mono"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                    <p className="font-bold">Cash on Delivery Selected</p>
                    <p>
                      Pay <strong className="tabular-nums">${finalTotal.toFixed(2)}</strong> in cash or contactless tap upon receiving your sealed TekZone package at <strong>{street}, {city}</strong>.
                    </p>
                  </div>
                )}

                {paymentMethod === 'digital' && (
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                    <p className="font-bold text-slate-900">Instant Digital Wallet Express</p>
                    <p>
                      Your Apple Pay / PayPal token is pre-authorized for instant one-click settlement on the next review step.
                    </p>
                  </div>
                )}

                <div className="pt-3 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className="px-6 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                  >
                    Review Order <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="space-y-5">
                <h2 className="font-display text-lg font-extrabold text-slate-900">
                  Step 5: Final Order Review
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="font-bold text-slate-400 uppercase">Shipping To</p>
                    <p className="font-bold text-slate-900">{customerName}</p>
                    <p className="text-slate-600">{street}</p>
                    <p className="text-slate-600">
                      {city}, {state} {zip} · {country}
                    </p>
                    <p className="text-slate-500">{phone}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="font-bold text-slate-400 uppercase">
                      Payment & Delivery
                    </p>
                    <p className="font-bold text-slate-900 capitalize">
                      Payment: {paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Credit / Debit Card' : 'Digital Wallet'}
                    </p>
                    <p className="text-slate-600 capitalize">
                      Delivery: {deliveryMethod} Shipping
                    </p>
                    <p className="text-emerald-600 font-semibold">
                      30-Day Money-Back Guarantee Included
                    </p>
                  </div>
                </div>

                {/* Items in Order */}
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedColor}`}
                      className="p-3.5 flex items-center justify-between gap-3 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-contain"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            {item.product.title}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Qty: {item.quantity} · {item.selectedColor}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleFinalizeOrder}
                    className="px-8 py-3.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-sm font-extrabold inline-flex items-center gap-2 shadow-lg shadow-[#E11D48]/25 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Place Order — ${finalTotal.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4">
            <h3 className="font-display text-base font-extrabold text-slate-900">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>
            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {promoSavings > 0 && (
                <div className="flex justify-between text-[#E11D48]">
                  <span>Promo Discount ({promoCode})</span>
                  <span className="font-bold tabular-nums">
                    −${promoSavings.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-bold text-emerald-600">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax</span>
                <span className="font-bold text-slate-900 tabular-nums">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-slate-200 pt-2.5 flex justify-between items-baseline">
                <span className="text-sm font-extrabold text-slate-900">Total</span>
                <span className="font-display text-xl font-extrabold text-[#E11D48] tabular-nums">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// SLIDE-OVER QUICK CART DRAWER
export const CartDrawer: React.FC<{
  open: boolean;
  onClose: () => void;
  cart: CartEntry[];
  onUpdateQuantity: (productId: string, color: string, delta: number) => void;
  onRemoveFromCart: (productId: string, color: string) => void;
  onNavigate: (page: PageView) => void;
}> = ({ open, onClose, cart, onUpdateQuantity, onRemoveFromCart, onNavigate }) => {
  if (!open) return null;
  const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E11D48]" />
            <h3 className="font-display text-base font-extrabold text-slate-900">
              Your Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <p className="text-sm font-bold text-slate-700">Your cart is empty</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('shop');
                }}
                className="px-4 py-2 rounded-lg bg-[#E11D48] text-white text-xs font-bold cursor-pointer"
              >
                Browse Deals
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}`}
                className="pt-3 first:pt-0 flex items-center justify-between gap-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-contain rounded-lg border border-slate-200 p-1 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {item.product.title}
                  </p>
                  <p className="text-[11px] text-slate-500">{item.selectedColor}</p>
                  <p className="text-xs font-extrabold text-[#E11D48] tabular-nums mt-0.5">
                    ${item.product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <div className="flex items-center border border-slate-200 rounded-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.selectedColor, -1)
                      }
                      className="w-6 h-6 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-xs font-bold tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateQuantity(item.product.id, item.selectedColor, 1)
                      }
                      className="w-6 h-6 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onRemoveFromCart(item.product.id, item.selectedColor)
                    }
                    className="text-[10px] text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Subtotal</span>
              <span className="font-display text-lg font-extrabold text-[#E11D48] tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('cart');
                }}
                className="h-10 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-800 cursor-pointer"
              >
                View Full Cart
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigate('checkout');
                }}
                className="h-10 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-xs font-bold text-white cursor-pointer"
              >
                Checkout Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
