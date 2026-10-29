import React, { useState } from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Star,
  Bell,
  LifeBuoy,
  Settings,
  CheckCircle2,
  Truck,
  Box,
  Clock,
  ShieldCheck,
  Plus,
  ArrowRight,
  Search
} from 'lucide-react';
import { Product, OrderItem, ReviewItem } from '../data/storeData';
import { ProductCard } from './ProductCard';
import { PageView } from './Header';

interface AccountTrackingPageProps {
  mode: 'account' | 'tracking';
  initialTab?: string;
  initialOrderId?: string;
  orders: OrderItem[];
  onAdvanceOrderStatus: (orderId: string) => void;
  wishlistIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  reviews: ReviewItem[];
  onNavigate: (page: PageView, options?: { orderId?: string; accountTab?: string }) => void;
}

const TIMELINE_STEPS = [
  { label: 'Order Confirmed', desc: 'Payment verified & order logged', icon: CheckCircle2 },
  { label: 'Processing', desc: 'Warehouse quality inspection', icon: Clock },
  { label: 'Packed', desc: 'Protective packaging & label printed', icon: Box },
  { label: 'Shipped', desc: 'Dispatched with TekZone Express Air', icon: Truck },
  { label: 'Out for Delivery', desc: 'Local courier en route to your address', icon: MapPin },
  { label: 'Delivered', desc: 'Signed & delivered at doorstep', icon: Package }
];

export const AccountTrackingPage: React.FC<AccountTrackingPageProps> = ({
  mode,
  initialTab = 'dashboard',
  initialOrderId,
  orders,
  onAdvanceOrderStatus,
  wishlistIds,
  products,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  reviews,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    initialOrderId || orders[0]?.id || 'TZ-94821'
  );
  const [lookupInput, setLookupInput] = useState('');

  // Account state
  const [profileName, setProfileName] = useState('Alex Morgan');
  const [profileEmail, setProfileEmail] = useState('alex.morgan@tekzone.io');
  const [profilePhone, setProfilePhone] = useState('+1 (555) 234-8910');
  const [savedBanner, setSavedBanner] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Primary Residence (Default)',
      name: 'Alex Morgan',
      street: '742 Evergreen Innovation Way, Suite 4B',
      city: 'San Francisco, CA 94107',
      phone: '+1 (555) 234-8910'
    },
    {
      id: 'addr-2',
      label: 'Work Studio',
      name: 'Alex Morgan',
      street: '500 Howard Street, Floor 12',
      city: 'San Francisco, CA 94105',
      phone: '+1 (555) 890-1122'
    }
  ]);
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');

  const [tickets, setTickets] = useState([
    {
      id: 'TCK-4091',
      subject: 'Invoice VAT copy request for Order #TZ-88310',
      status: 'Resolved',
      date: 'Oct 10, 2026',
      reply: 'PDF tax invoice has been emailed and attached to your order history.'
    }
  ]);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'Order #TZ-94821 is Out for Delivery!',
      body: 'Your courier is 4 stops away. Estimated arrival before 6:00 PM today.',
      time: '25 mins ago',
      unread: true
    },
    {
      id: 'n2',
      title: 'Flash Deal Alert: AirPods Pro (2nd Gen) at $199',
      body: 'An item on your wishlist dropped by 32% for the next 5 hours.',
      time: '3 hours ago',
      unread: true
    },
    {
      id: 'n3',
      title: '20% Welcome Coupon Active',
      body: 'Use code WELCOME at checkout for 20% off your order.',
      time: '2 days ago',
      unread: false
    }
  ]);

  const currentOrder =
    orders.find((o) => o.id.toLowerCase() === selectedOrderId.toLowerCase()) ||
    orders[0];

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  // ORDER TRACKING VIEW
  if (mode === 'tracking') {
    return (
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 py-7 space-y-7">
        {/* Header & Order Selector */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#E11D48]">
              Real-Time Logistics
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
              Order Tracking Timeline
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Select one of your active orders or enter an Order ID below to inspect live package milestones.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (lookupInput.trim()) {
                setSelectedOrderId(lookupInput.trim().replace(/^#/, ''));
              }
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={lookupInput}
              onChange={(e) => setLookupInput(e.target.value)}
              placeholder="Order ID (e.g. TZ-94821)"
              className="h-10 px-3.5 rounded-xl border border-slate-300 text-xs font-mono focus:outline-none focus:border-[#E11D48]"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-[#0F172A] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" /> Track
            </button>
          </form>
        </div>

        {/* Order Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {orders.map((ord) => (
            <button
              key={ord.id}
              type="button"
              onClick={() => setSelectedOrderId(ord.id)}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer shrink-0 ${
                currentOrder?.id === ord.id
                  ? 'border-[#E11D48] bg-[#E11D48] text-white shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              Order #{ord.id} · {ord.status} (${ord.total.toFixed(2)})
            </button>
          ))}
        </div>

        {currentOrder && (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 space-y-8">
            {/* Top Status Summary */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-lg font-extrabold text-slate-900">
                    Order #{currentOrder.id}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-rose-50 text-[#E11D48] text-xs font-extrabold">
                    {currentOrder.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Placed on {currentOrder.date} · Carrier Tracking:{' '}
                  <strong className="font-mono text-slate-800">
                    {currentOrder.trackingNumber}
                  </strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[11px] text-slate-400 font-bold uppercase">
                    Estimated Arrival
                  </p>
                  <p className="text-sm font-extrabold text-emerald-600">
                    {currentOrder.estimatedDelivery}
                  </p>
                </div>

                {currentOrder.statusStep < 5 && (
                  <button
                    type="button"
                    onClick={() => onAdvanceOrderStatus(currentOrder.id)}
                    className="px-4 py-2 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Advance Shipment Stage →
                  </button>
                )}
              </div>
            </div>

            {/* 6-STAGE VISUAL TIMELINE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {TIMELINE_STEPS.map((st, idx) => {
                const Icon = st.icon;
                const completed = idx <= currentOrder.statusStep;
                const isCurrent = idx === currentOrder.statusStep;

                return (
                  <div
                    key={st.label}
                    className={`relative p-4 rounded-2xl border transition-all ${
                      isCurrent
                        ? 'border-[#E11D48] bg-rose-50/40 ring-2 ring-[#E11D48]/15'
                        : completed
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : 'border-slate-200 bg-slate-50/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isCurrent
                            ? 'bg-[#E11D48] text-white'
                            : completed
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        0{idx + 1}
                      </span>
                    </div>
                    <h3 className="text-xs font-extrabold text-slate-900">
                      {st.label}
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      {st.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Package Items & Destination */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              <div className="lg:col-span-8 space-y-3">
                <h3 className="font-display text-sm font-extrabold text-slate-900">
                  Items in This Shipment ({currentOrder.items.length})
                </h3>
                <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {currentOrder.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-3.5 flex items-center justify-between gap-4 bg-white"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 object-contain rounded-lg border border-slate-100 p-1"
                        />
                        <div>
                          <button
                            type="button"
                            onClick={() => onSelectProduct(item.product)}
                            className="text-xs font-bold text-slate-900 hover:text-[#E11D48] cursor-pointer"
                          >
                            {item.product.title}
                          </button>
                          <p className="text-[11px] text-slate-500">
                            Qty: {item.quantity} · Color: {item.selectedColor}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <p className="font-bold uppercase text-slate-400">
                  Delivery Destination
                </p>
                <p className="font-bold text-slate-900">
                  {currentOrder.shippingAddress.fullName}
                </p>
                <p className="text-slate-600">
                  {currentOrder.shippingAddress.street}
                </p>
                <p className="text-slate-600">
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state}{' '}
                  {currentOrder.shippingAddress.zip}
                </p>
                <p className="text-slate-500">{currentOrder.shippingAddress.phone}</p>
                <div className="border-t border-slate-200 pt-2 mt-2 flex justify-between font-bold text-slate-900">
                  <span>Order Total</span>
                  <span className="text-[#E11D48] tabular-nums">
                    ${currentOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // CUSTOMER ACCOUNT VIEW
  const accountNav = [
    { id: 'dashboard', label: 'Dashboard', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'wishlist', label: `Wishlist (${wishlistedProducts.length})`, icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payments', label: 'Payment Methods', icon: CreditCard },
    { id: 'reviews', label: 'My Reviews', icon: Star },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'support', label: 'Support Tickets', icon: LifeBuoy },
    { id: 'settings', label: 'Account Settings', icon: Settings }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-7">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Account Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-4 space-y-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#E11D48] flex items-center justify-center font-display font-extrabold text-base">
              AM
            </div>
            <div className="min-w-0">
              <p className="text-sm font-extrabold truncate">{profileName}</p>
              <p className="text-[11px] text-slate-300 truncate">{profileEmail}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {accountNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-[#E11D48] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Account Content Area */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200/90 p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-display text-2xl font-extrabold text-slate-900">
                  Welcome back, {profileName}
                </h1>
                <p className="text-xs text-slate-500">
                  Manage your orders, wishlist, saved addresses, and TekZone Plus member perks.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Total Orders</p>
                  <p className="font-display text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
                    {orders.length}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">Saved Wishlist</p>
                  <p className="font-display text-2xl font-extrabold text-[#E11D48] mt-1 tabular-nums">
                    {wishlistedProducts.length} Items
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500 font-semibold">TekZone Rewards</p>
                  <p className="font-display text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums">
                    2,450 Pts ($24.50)
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-display text-base font-extrabold text-slate-900">
                    Recent Orders
                  </h2>
                  <button
                    type="button"
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-[#E11D48] hover:underline cursor-pointer"
                  >
                    View All Orders →
                  </button>
                </div>
                <div className="space-y-3">
                  {orders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-xs font-extrabold text-slate-900 font-mono">
                          Order #{ord.id}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {ord.date} · {ord.items.length} items ·{' '}
                          <strong className="text-[#E11D48]">${ord.total.toFixed(2)}</strong>
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                          {ord.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => onNavigate('tracking', { orderId: ord.id })}
                          className="px-3.5 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-bold cursor-pointer"
                        >
                          Track Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                My Orders ({orders.length})
              </h2>
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="rounded-xl border border-slate-200 overflow-hidden"
                >
                  <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-4">
                      <span>
                        Order: <strong className="font-mono">#{ord.id}</strong>
                      </span>
                      <span>Date: {ord.date}</span>
                      <span>
                        Total:{' '}
                        <strong className="text-[#E11D48] tabular-nums">
                          ${ord.total.toFixed(2)}
                        </strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('tracking', { orderId: ord.id })}
                      className="px-3 py-1 rounded-lg bg-[#E11D48] text-white font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      Live Tracking <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="p-4 divide-y divide-slate-100">
                    {ord.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={it.product.image}
                            alt={it.product.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-contain"
                          />
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              {it.product.title}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Qty: {it.quantity} · {it.selectedColor}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAddToCart(it.product, 1)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 hover:border-[#E11D48] text-xs font-bold text-slate-700 cursor-pointer"
                        >
                          Buy Again
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                My Wishlist ({wishlistedProducts.length})
              </h2>
              {wishlistedProducts.length === 0 ? (
                <div className="p-8 text-center border border-slate-200 rounded-xl space-y-2">
                  <p className="text-sm font-bold text-slate-700">
                    No items saved in your wishlist yet.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('shop')}
                    className="px-4 py-2 rounded-lg bg-[#E11D48] text-white text-xs font-bold cursor-pointer"
                  >
                    Explore Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {wishlistedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={true}
                      onToggleWishlist={onToggleWishlist}
                      onAddToCart={onAddToCart}
                      onSelectProduct={onSelectProduct}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Saved Shipping Addresses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 rounded-xl border border-slate-200 space-y-1 text-xs"
                  >
                    <p className="font-extrabold text-[#E11D48]">{a.label}</p>
                    <p className="font-bold text-slate-900">{a.name}</p>
                    <p className="text-slate-600">{a.street}</p>
                    <p className="text-slate-600">{a.city}</p>
                    <p className="text-slate-500">{a.phone}</p>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newStreet.trim() || !newCity.trim()) return;
                  setAddresses((prev) => [
                    ...prev,
                    {
                      id: `addr-${Date.now()}`,
                      label: 'Additional Address',
                      name: profileName,
                      street: newStreet.trim(),
                      city: newCity.trim(),
                      phone: profilePhone
                    }
                  ]);
                  setNewStreet('');
                  setNewCity('');
                }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <h3 className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#E11D48]" /> Add New Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newStreet}
                    onChange={(e) => setNewStreet(e.target.value)}
                    placeholder="Street Address"
                    className="h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="City, State & ZIP"
                    className="h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-bold cursor-pointer"
                >
                  Save Address
                </button>
              </form>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Saved Payment Methods
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-extrabold tracking-wider">VISA SIGNATURE</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="font-mono text-base tracking-widest">•••• •••• •••• 4242</p>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span>{profileName}</span>
                    <span>EXP 08/29</span>
                  </div>
                </div>
                <div className="p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">Apple Pay & PayPal Express</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Connected to {profileEmail} for one-click checkout.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">✓ Verified & Active</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                My Submitted Reviews ({reviews.length})
              </h2>
              <div className="space-y-3">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl border border-slate-200 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-slate-900">{r.title}</span>
                      <span className="text-slate-400">{r.date}</span>
                    </div>
                    <p className="text-xs text-slate-600">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl font-extrabold text-slate-900">
                  Notifications
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
                  }
                  className="text-xs font-bold text-[#E11D48] hover:underline cursor-pointer"
                >
                  Mark All as Read
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-xl border ${
                      n.unread
                        ? 'border-[#E11D48]/40 bg-rose-50/30'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-extrabold text-slate-900">{n.title}</p>
                      <span className="text-[11px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{n.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-5">
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                24/7 Customer Support & Tickets
              </h2>
              <div className="space-y-3">
                {tickets.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="font-mono font-bold text-slate-900">
                        #{t.id} — {t.subject}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                        {t.status}
                      </span>
                    </div>
                    <p className="text-slate-600">{t.reply}</p>
                  </div>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!ticketSubject.trim() || !ticketMessage.trim()) return;
                  setTickets((prev) => [
                    {
                      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
                      subject: ticketSubject.trim(),
                      status: 'Open — Priority Response',
                      date: 'Just now',
                      reply: `Your message ("${ticketMessage.trim()}") has been assigned to a TekZone Concierge Specialist.`
                    },
                    ...prev
                  ]);
                  setTicketSubject('');
                  setTicketMessage('');
                }}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3"
              >
                <h3 className="text-xs font-extrabold text-slate-900">
                  Open a New Support Ticket
                </h3>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="Subject (e.g. Order inquiry, warranty claim)"
                  className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs"
                />
                <textarea
                  rows={3}
                  required
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  placeholder="How can our support team help you today?"
                  className="w-full p-3 rounded-lg border border-slate-300 bg-white text-xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#E11D48] text-white text-xs font-bold cursor-pointer"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          )}

          {activeTab === 'settings' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSavedBanner(true);
                setTimeout(() => setSavedBanner(false), 2500);
              }}
              className="space-y-4 max-w-lg"
            >
              <h2 className="font-display text-xl font-extrabold text-slate-900">
                Account Settings
              </h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 text-xs"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#E11D48] text-white text-xs font-bold cursor-pointer"
              >
                {savedBanner ? '✓ Profile Updated' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
