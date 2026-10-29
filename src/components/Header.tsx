import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  User,
  Heart,
  Package,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Truck,
  RotateCcw,
  ShieldCheck,
  Monitor,
  Shirt,
  Home,
  Sparkles,
  Dumbbell,
  ShoppingBasket,
  Gamepad2,
  Car,
  BookOpen,
  Store,
  LayoutDashboard,
  Check
} from 'lucide-react';
import { Product, SIDEBAR_CATEGORIES, CATEGORIES } from '../data/storeData';

export type PageView =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'tracking'
  | 'seller'
  | 'admin';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView, options?: { category?: string; filter?: string; search?: string; productId?: string; accountTab?: string }) => void;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onOpenCartDrawer: () => void;
}

export const CategoryIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'w-4 h-4' }) => {
  switch (name) {
    case 'Monitor':
      return <Monitor className={className} />;
    case 'Shirt':
      return <Shirt className={className} />;
    case 'Home':
      return <Home className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Dumbbell':
      return <Dumbbell className={className} />;
    case 'ShoppingBasket':
      return <ShoppingBasket className={className} />;
    case 'Gamepad2':
      return <Gamepad2 className={className} />;
    case 'Car':
      return <Car className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    default:
      return <Monitor className={className} />;
  }
};

export const TekZoneLogo: React.FC<{ dark?: boolean; onClick?: () => void }> = ({ dark = false, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-2.5 text-left group focus:outline-none shrink-0"
  >
    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center shadow-sm border border-white/10 group-hover:border-[#E11D48]/50 transition-all">
      <svg viewBox="0 0 40 40" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stylized Geometric T */}
        <path
          d="M6 10H24L21.5 15H16.5L12.5 30H7L11 15H6V10Z"
          fill={dark ? '#FFFFFF' : '#FFFFFF'}
        />
        {/* Stylized Geometric Red Z */}
        <path
          d="M19 15H34L32.5 19.5L22.5 25.5H33L31.5 30H15.5L17 25.5L27 19.5H17.5L19 15Z"
          fill="#E11D48"
        />
      </svg>
    </div>
    <div className="flex flex-col">
      <div className="flex items-baseline tracking-tight leading-none">
        <span className={`font-display text-2xl font-extrabold ${dark ? 'text-white' : 'text-[#0F172A]'}`}>
          Tek
        </span>
        <span className="font-display text-2xl font-extrabold text-[#E11D48]">
          Zone
        </span>
      </div>
      <span className={`text-[10px] font-medium tracking-wider mt-0.5 ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
        Better Tech • Better Life
      </span>
    </div>
  </button>
);

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  products,
  onSelectProduct,
  onOpenCartDrawer
}) => {
  const [isSticky, setIsSticky] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const liveSuggestions = searchQuery.trim().length > 0
    ? products
        .filter((p) => {
          const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
          const q = searchQuery.toLowerCase();
          return (
            matchesCat &&
            (p.title.toLowerCase().includes(q) ||
              p.brand.toLowerCase().includes(q) ||
              p.category.toLowerCase().includes(q) ||
              p.subcategory.toLowerCase().includes(q))
          );
        })
        .slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
    onNavigate('shop', {
      category: selectedCategory,
      search: searchQuery
    });
  };

  const handleCopyWelcome = () => {
    navigator.clipboard?.writeText('WELCOME');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-[#0B1120] text-slate-200 text-xs border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-4">
          {/* Left trust items */}
          <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 text-slate-200 font-medium">
              <Truck className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              Free Shipping on Orders Over $50
            </span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-200 font-medium">
              <RotateCcw className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              Easy Returns
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              Secure Payments
            </span>
          </div>

          {/* Right promo & quick role links */}
          <div className="flex items-center gap-3 whitespace-nowrap shrink-0">
            <span className="hidden lg:inline text-slate-300">
              Get 20% Off Your First Order
            </span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-300">Use Code:</span>
              <button
                type="button"
                onClick={handleCopyWelcome}
                title="Click to copy promo code WELCOME"
                className="bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold px-2 py-0.5 rounded text-[11px] tracking-wide transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3 h-3" /> COPIED
                  </>
                ) : (
                  'WELCOME'
                )}
              </button>
            </div>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              className={`hidden sm:inline-flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
                currentPage === 'admin' ? 'text-[#E11D48]' : 'text-slate-300 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3 h-3" />
              Admin Panel
            </button>
          </div>
        </div>
      </div>

      {/* STICKY MAIN HEADER + NAVIGATION */}
      <header
        className={`sticky top-0 z-40 bg-white transition-shadow duration-200 ${
          isSticky ? 'shadow-md border-b border-slate-200/80' : 'border-b border-slate-200'
        }`}
      >
        {/* MAIN HEADER ROW */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 lg:gap-8">
          {/* Mobile Menu Button + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <TekZoneLogo onClick={() => onNavigate('home')} />
          </div>

          {/* CENTER SEARCH BAR */}
          <div ref={searchContainerRef} className="hidden md:block flex-1 max-w-2xl relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-full h-11 rounded-lg border border-slate-300 bg-[#F8FAFC] focus-within:bg-white focus-within:border-[#E11D48] focus-within:ring-2 focus-within:ring-[#E11D48]/15 transition-all overflow-hidden"
            >
              <div className="relative h-full flex items-center border-r border-slate-200 bg-slate-100/70">
                <select
                  aria-label="Search category"
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="h-full pl-3.5 pr-8 bg-transparent text-xs font-semibold text-slate-700 focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.shortName}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 pointer-events-none" />
              </div>

              <input
                type="text"
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search for products, brands and more..."
                className="flex-1 h-full px-4 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="p-1.5 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                aria-label="Search"
                className="h-full px-5 bg-[#E11D48] hover:bg-[#BE123C] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Instant Search Dropdown */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                {liveSuggestions.length > 0 ? (
                  <div>
                    <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Matching Products ({liveSuggestions.length})</span>
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="text-[#E11D48] font-semibold hover:underline"
                      >
                        View all results →
                      </button>
                    </div>
                    <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                      {liveSuggestions.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setSearchFocused(false);
                            onSelectProduct(item);
                          }}
                          className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 text-left transition-colors"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 object-contain rounded-lg bg-white border border-slate-100 p-1 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-slate-400 font-medium">{item.brand}</p>
                            <p className="text-sm font-semibold text-slate-800 truncate">{item.title}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-[#E11D48] tabular-nums">
                              ${item.price.toFixed(2)}
                            </p>
                            <p className="text-xs text-slate-400 line-through tabular-nums">
                              ${item.oldPrice.toFixed(2)}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-slate-500">
                    No exact matches for "<span className="font-semibold text-slate-700">{searchQuery}</span>". Try searching for AirPods, Laptop, iPhone, Watch, or Sneakers.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT ACTION ICONS */}
          <div className="flex items-center gap-3 sm:gap-6 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('account', { accountTab: 'dashboard' })}
              className={`flex flex-col items-center gap-0.5 group cursor-pointer ${
                currentPage === 'account' ? 'text-[#E11D48]' : 'text-slate-700 hover:text-[#E11D48]'
              }`}
            >
              <User className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              <span className="text-[11px] font-medium">Account</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <button
              type="button"
              onClick={() => onNavigate('account', { accountTab: 'wishlist' })}
              className="relative flex flex-col items-center gap-0.5 text-slate-700 hover:text-[#E11D48] group cursor-pointer"
            >
              <div className="relative">
                <Heart className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E11D48] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-medium">Wishlist</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <button
              type="button"
              onClick={() => onNavigate('tracking')}
              className={`hidden sm:flex flex-col items-center gap-0.5 group cursor-pointer ${
                currentPage === 'tracking' ? 'text-[#E11D48]' : 'text-slate-700 hover:text-[#E11D48]'
              }`}
            >
              <Package className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
              <span className="text-[11px] font-medium">Orders</span>
            </button>

            <div className="h-6 w-px bg-slate-200 hidden sm:block" />

            <button
              type="button"
              onClick={onOpenCartDrawer}
              className={`relative flex flex-col items-center gap-0.5 group cursor-pointer ${
                currentPage === 'cart' ? 'text-[#E11D48]' : 'text-slate-700 hover:text-[#E11D48]'
              }`}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#E11D48] text-white text-[10px] font-bold flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              </div>
              <span className="text-[11px] font-medium">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full h-10 rounded-lg border border-slate-300 bg-[#F8FAFC] overflow-hidden"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="flex-1 h-full px-3.5 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="h-full px-4 bg-[#E11D48] text-white flex items-center justify-center"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* MAIN NAVIGATION BAR */}
        <div className="border-t border-slate-100 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-11 flex items-center justify-between gap-6">
            {/* All Categories Mega-Menu Trigger */}
            <div ref={megaMenuRef} className="relative h-full flex items-center">
              <button
                type="button"
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                className="h-8 px-4 rounded-md bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold tracking-wide flex items-center gap-2.5 shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Menu className="w-4 h-4" />
                <span>All Categories</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
                    megaMenuOpen ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* Dropdown Mega Menu */}
              {megaMenuOpen && (
                <div className="absolute left-0 top-full mt-1 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50">
                  {SIDEBAR_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setMegaMenuOpen(false);
                        onNavigate('shop', { category: cat.id });
                      }}
                      className="w-full px-4 py-2.5 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#E11D48] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-3">
                        <CategoryIcon name={cat.icon} className="w-4 h-4 text-slate-400" />
                        {cat.name}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-4 py-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMegaMenuOpen(false);
                        onNavigate('shop', { category: 'all' });
                      }}
                      className="text-xs font-bold text-[#E11D48] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      View All Categories <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Horizontal Navigation Links */}
            <nav className="flex items-center gap-5 lg:gap-7 overflow-x-auto no-scrollbar text-xs font-semibold text-slate-700 h-full">
              <button
                type="button"
                onClick={() => onNavigate('shop', { filter: 'flash' })}
                className="relative inline-flex items-center gap-1 hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1"
              >
                <span>Today's Deals</span>
                <span className="bg-[#E11D48] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full leading-tight -mt-2.5">
                  Hot
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { filter: 'new' })}
                className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                New Arrivals
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { filter: 'bestseller' })}
                className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Best Sellers
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { category: 'electronics' })}
                className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Electronics
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { category: 'fashion' })}
                className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Fashion
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { category: 'home-living' })}
                className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Home & Living
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { category: 'beauty' })}
                className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Beauty
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { category: 'sports' })}
                className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Sports
              </button>

              <button
                type="button"
                onClick={() => onNavigate('shop', { category: 'appliances' })}
                className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Grocery & Home
              </button>

              <button
                type="button"
                onClick={() => onNavigate('seller')}
                className={`inline-flex items-center gap-1.5 font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  currentPage === 'seller' ? 'text-[#E11D48]' : 'text-slate-800 hover:text-[#E11D48]'
                }`}
              >
                <Store className="w-3.5 h-3.5 text-[#E11D48]" />
                Become a Seller
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <TekZoneLogo
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('home');
                }}
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-6 flex-1">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Quick Navigation
                </p>
                <div className="space-y-1">
                  {[
                    { label: 'Home Storefront', page: 'home' as PageView },
                    { label: 'All Products Catalog', page: 'shop' as PageView },
                    { label: 'Track My Order', page: 'tracking' as PageView },
                    { label: 'Customer Account', page: 'account' as PageView },
                    { label: 'Seller Hub & Registration', page: 'seller' as PageView },
                    { label: 'Admin Control Panel', page: 'admin' as PageView }
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate(item.page);
                      }}
                      className="w-full px-3 py-2 rounded-lg text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#E11D48] flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Shop By Category
                </p>
                <div className="space-y-1">
                  {SIDEBAR_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate('shop', { category: cat.id });
                      }}
                      className="w-full px-3 py-2 rounded-lg text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-[#E11D48] flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2.5">
                        <CategoryIcon name={cat.icon} className="w-4 h-4 text-slate-400" />
                        {cat.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
