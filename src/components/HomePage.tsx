import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Zap,
  Star,
  Flame,
  Award,
  DollarSign,
  ShieldCheck,
  Truck,
  ArrowRight,
  Clock,
  Check,
  Mail
} from 'lucide-react';
import {
  Product,
  CATEGORIES,
  SIDEBAR_CATEGORIES,
  TOP_BRANDS
} from '../data/storeData';
import { CategoryIcon, PageView } from './Header';
import { ProductCard } from './ProductCard';

interface HomePageProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (
    page: PageView,
    options?: { category?: string; filter?: string; brand?: string; search?: string }
  ) => void;
}

const HERO_SLIDES = [
  {
    id: 'slide-1',
    kicker: 'LIMITED TIME OFFER',
    titleLine1: 'Latest Tech',
    titleLine2: 'for a Smarter You',
    subtitle:
      'Discover the latest gadgets, electronics and accessories from top brands at unbeatable prices.',
    discountText: '50% OFF',
    rightHeadline1: 'Next Level',
    rightHeadline2: 'Performance',
    image: '/assets/products/hero-devices.png',
    category: 'electronics',
    bgGradient: 'from-[#090D16] via-[#131B2E] to-[#3B0A18]'
  },
  {
    id: 'slide-2',
    kicker: 'NEXT-GEN GAMING',
    titleLine1: 'Pro Consoles',
    titleLine2: '& Ultra Laptops',
    subtitle:
      'Experience 4K 120Hz gaming, Hall-Effect wireless controllers, and M3 laptops built for creators.',
    discountText: '45% OFF',
    rightHeadline1: 'Play Without',
    rightHeadline2: 'Limits',
    image: '/assets/products/banner-gaming-art.png',
    category: 'gaming',
    bgGradient: 'from-[#0B0F19] via-[#1E1B4B] to-[#3B0764]'
  },
  {
    id: 'slide-3',
    kicker: 'SMART LIVING EVENT',
    titleLine1: 'Upgrade Home',
    titleLine2: '& Daily Style',
    subtitle:
      'From inverter kitchen appliances and cordless vacuums to iconic streetwear and luxury fragrances.',
    discountText: '60% OFF',
    rightHeadline1: 'Modern Home',
    rightHeadline2: 'Essentials',
    image: '/assets/products/hero-devices.png',
    category: 'home-living',
    bgGradient: 'from-[#090D16] via-[#0F172A] to-[#4C0519]'
  }
];

export const HomePage: React.FC<HomePageProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  onNavigate
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(5 * 3600 + 32 * 60 + 18); // 05 : 32 : 18
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);
  const flashScrollRef = useRef<HTMLDivElement>(null);

  // Flash deal countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 5 * 3600 + 32 * 60 + 18));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance hero carousel every 7s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  const flashDeals = products.filter((p) => p.isFlashDeal);
  const bestSellers = products
    .filter((p) =>
      ['airpods-pro-2', 'iphone-15-pro', 'nike-court-shoes', 'urban-tech-backpack'].includes(p.id)
    )
    .slice(0, 4);
  const trendingNow = products
    .filter((p) =>
      ['macbook-air-m3', 'jbl-party-speaker', 'dyson-cordless-vacuum', 'smart-watch-series-9'].includes(
        p.id
      )
    )
    .slice(0, 4);

  const scrollFlashDeals = (dir: 'left' | 'right') => {
    if (!flashScrollRef.current) return;
    const offset = dir === 'left' ? -440 : 440;
    flashScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const currentSlide = HERO_SLIDES[activeSlide];

  const handleBannerNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterJoined(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterJoined(false), 4000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-5 space-y-9">
      {/* 1. HERO & SIDEBAR SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Category Menu Sidebar (Desktop) */}
        <div className="hidden lg:flex lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-3 flex-col justify-between shadow-2xs">
          <div className="divide-y divide-slate-100">
            {SIDEBAR_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onNavigate('shop', { category: cat.id })}
                className="w-full py-2.5 px-3 flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-[#E11D48] hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group"
              >
                <span className="flex items-center gap-3">
                  <CategoryIcon
                    name={cat.icon}
                    className="w-4 h-4 text-slate-500 group-hover:text-[#E11D48] transition-colors"
                  />
                  <span>{cat.name}</span>
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>

          <div className="pt-2 mt-1 border-t border-slate-100 px-3">
            <button
              type="button"
              onClick={() => onNavigate('shop', { category: 'all' })}
              className="text-xs font-bold text-[#1E3A8A] hover:text-[#E11D48] transition-colors flex items-center gap-1 cursor-pointer py-1"
            >
              View All Categories
            </button>
          </div>
        </div>

        {/* Main Hero Banner */}
        <div className="lg:col-span-9 relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#090D16] via-[#131B2E] to-[#3B0A18] text-white shadow-md flex flex-col justify-between min-h-[360px] sm:min-h-[390px]">
          {/* Subtle decorative studio light glow */}
          <div className="absolute -right-12 -top-16 w-96 h-96 rounded-full bg-[#E11D48]/25 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

          {/* Left/Right Carousel Arrows */}
          <button
            type="button"
            onClick={() =>
              setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-slate-900 shadow-md flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Hero Main Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 px-8 sm:px-12 pt-8 pb-4 items-center flex-1">
            {/* Left Copy */}
            <div className="md:col-span-6 space-y-4">
              <span className="inline-block bg-[#E11D48] text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                {currentSlide.kicker}
              </span>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-extrabold leading-[1.08] tracking-tight">
                <span className="block text-white">{currentSlide.titleLine1}</span>
                <span className="block text-[#E11D48] mt-1">{currentSlide.titleLine2}</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-md leading-relaxed">
                {currentSlide.subtitle}
              </p>

              {/* CTA & Offer Row */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('shop', { category: currentSlide.category })}
                  className="h-11 px-6 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-[#E11D48]/30 transition-all cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="h-11 px-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-left flex flex-col justify-center transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-slate-300 leading-none">Up to</span>
                  <span className="text-sm sm:text-base font-extrabold text-[#E11D48] leading-tight">
                    {currentSlide.discountText}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('shop', { filter: 'new' })}
                  className="text-xs font-semibold text-slate-300 hover:text-white underline underline-offset-4 ml-1 cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            </div>

            {/* Right Product Composition */}
            <div className="md:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-[440px]">
                <img
                  src={currentSlide.image}
                  alt="Flagship Smartphone, Pro Laptop, Wireless Headphones, Smartwatch and Earbuds"
                  referrerPolicy="no-referrer"
                  className="w-full h-[210px] sm:h-[250px] object-contain rounded-xl drop-shadow-2xl"
                />

                {/* Top-right floating performance callout matching reference */}
                <div className="hidden sm:flex flex-col items-end absolute -top-2 right-0 text-right bg-slate-950/60 backdrop-blur-xs px-3 py-2 rounded-xl border border-white/10">
                  <span className="text-sm font-extrabold text-white leading-tight">
                    {currentSlide.rightHeadline1}
                  </span>
                  <span className="text-sm font-extrabold text-white leading-tight">
                    {currentSlide.rightHeadline2}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('shop', { category: currentSlide.category })}
                    className="mt-1.5 text-[11px] font-bold text-slate-200 hover:text-[#E11D48] inline-flex items-center gap-1 cursor-pointer"
                  >
                    Shop Now <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Features Strip & Carousel Dots inside Hero */}
          <div className="relative z-10 px-8 sm:px-12 py-3 bg-black/30 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px] font-medium text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                Best Prices
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                Top Brands
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Secure Payment
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-sky-400" />
                Fast Delivery
              </span>
            </div>

            {/* Carousel Indicators */}
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeSlide ? 'w-5 bg-[#E11D48]' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900">
            Shop by Category
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('shop', { category: 'all' })}
            className="text-xs font-bold text-[#E11D48] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onNavigate('shop', { category: cat.id })}
              className="group bg-white rounded-xl border border-slate-200/90 p-2.5 text-center hover:border-[#E11D48]/50 hover:shadow-md transition-all cursor-pointer flex flex-col items-center"
            >
              <div
                className={`w-full h-24 rounded-lg bg-gradient-to-b ${cat.bgTint} overflow-hidden flex items-center justify-center p-1.5 mb-2.5`}
              >
                <img
                  src={cat.image}
                  alt={cat.shortName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors">
                {cat.shortName}
              </h3>
              <p className="text-[11px] font-bold text-[#E11D48] mt-0.5">
                {cat.discountText}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* 3. FLASH DEALS */}
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 inline-flex items-center gap-1.5">
              <Zap className="w-5 h-5 text-[#E11D48] fill-[#E11D48]" />
              <span>Flash Deals</span>
            </h2>

            <div className="inline-flex items-center gap-1.5 bg-[#E11D48] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs tabular-nums">
              <Clock className="w-3.5 h-3.5" />
              <span>
                Ends in {hours} : {mins} : {secs}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 mr-2">
              <button
                type="button"
                onClick={() => scrollFlashDeals('left')}
                aria-label="Scroll flash deals left"
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollFlashDeals('right')}
                aria-label="Scroll flash deals right"
                className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('shop', { filter: 'flash' })}
              className="text-xs font-bold text-[#E11D48] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              View All Deals <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel / 6-col Desktop Layout */}
        <div
          ref={flashScrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-1 snap-x"
        >
          {flashDeals.map((product) => (
            <div
              key={product.id}
              className="min-w-[205px] sm:min-w-[215px] lg:min-w-[calc((100%-80px)/6)] max-w-[235px] flex-1 snap-start"
            >
              <ProductCard
                product={product}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. THREE WIDE PROMOTIONAL BANNERS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Gaming Zone */}
        <div
          onClick={() => onNavigate('shop', { category: 'gaming' })}
          className="group relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#1E1B4B] to-[#3B0764] text-white p-5 flex items-center justify-between min-h-[150px] cursor-pointer shadow-xs hover:shadow-md transition-all"
        >
          <div className="space-y-1.5 z-10 max-w-[55%]">
            <h3 className="font-display text-lg font-extrabold leading-tight">
              Gaming Zone
            </h3>
            <p className="font-display text-xl font-extrabold text-white">
              Up to 40% OFF
            </p>
            <p className="text-xs text-slate-300">Play More. Win More.</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-white pt-1 group-hover:translate-x-1 transition-transform">
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <img
            src="/assets/products/banner-gaming-art.png"
            alt="Gaming Zone Console and Controller"
            referrerPolicy="no-referrer"
            className="w-40 h-28 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Beauty Essentials */}
        <div
          onClick={() => onNavigate('shop', { category: 'beauty' })}
          className="group relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#FCE7F3] via-[#FBCFE8] to-[#F9A8D4] text-slate-900 p-5 flex items-center justify-between min-h-[150px] cursor-pointer shadow-xs hover:shadow-md transition-all"
        >
          <div className="space-y-1.5 z-10 max-w-[55%]">
            <h3 className="font-display text-lg font-extrabold leading-tight text-slate-900">
              Beauty Essentials
            </h3>
            <p className="font-display text-xl font-extrabold text-slate-900">
              Up to 50% OFF
            </p>
            <p className="text-xs text-slate-700">Look Good. Feel Good.</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 pt-1 group-hover:translate-x-1 transition-transform">
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <img
            src="/assets/products/banner-beauty-art.png"
            alt="Beauty Essentials Luxury Skincare"
            referrerPolicy="no-referrer"
            className="w-40 h-28 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Home & Living */}
        <div
          onClick={() => onNavigate('shop', { category: 'home-living' })}
          className="group relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#E2E8F0] via-[#F1F5F9] to-[#E5E0D8] text-slate-900 p-5 flex items-center justify-between min-h-[150px] cursor-pointer shadow-xs hover:shadow-md transition-all"
        >
          <div className="space-y-1.5 z-10 max-w-[55%]">
            <h3 className="font-display text-lg font-extrabold leading-tight text-slate-900">
              Home & Living
            </h3>
            <p className="font-display text-xl font-extrabold text-slate-900">
              Up to 45% OFF
            </p>
            <p className="text-xs text-slate-600">Upgrade Your Space</p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 pt-1 group-hover:translate-x-1 transition-transform">
              Shop Now <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <img
            src="/assets/products/banner-home-art.png"
            alt="Home and Living Sofa"
            referrerPolicy="no-referrer"
            className="w-44 h-28 object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* 5. BEST SELLERS & TRENDING NOW SIDE-BY-SIDE */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Best Sellers Box */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base sm:text-lg font-extrabold text-slate-900 inline-flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Best Sellers</span>
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('shop', { filter: 'bestseller' })}
              className="text-xs font-bold text-[#2563EB] hover:text-[#E11D48] inline-flex items-center gap-1 cursor-pointer"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {bestSellers.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                compact
                isWishlisted={wishlist.includes(prod.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>

        {/* Trending Now Box */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base sm:text-lg font-extrabold text-slate-900 inline-flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#E11D48] fill-[#E11D48]" />
              <span>Trending Now</span>
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('shop', { filter: 'trending' })}
              className="text-xs font-bold text-[#2563EB] hover:text-[#E11D48] inline-flex items-center gap-1 cursor-pointer"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {trendingNow.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                compact
                isWishlisted={wishlist.includes(prod.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. TOP BRANDS */}
      <section>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="font-display text-base sm:text-lg font-extrabold text-slate-900 inline-flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Top Brands</span>
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-[#2563EB] hover:text-[#E11D48] inline-flex items-center gap-1 cursor-pointer"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
          {TOP_BRANDS.map((brand) => (
            <button
              key={brand.id}
              type="button"
              onClick={() => onNavigate('shop', { brand: brand.name })}
              className="h-14 bg-white rounded-xl border border-slate-200/90 hover:border-[#E11D48] hover:shadow-sm flex items-center justify-center px-3 transition-all cursor-pointer group"
            >
              <span
                className="font-display text-sm font-black tracking-tight text-slate-800 group-hover:text-[#E11D48] transition-colors"
                style={{ color: brand.accentColor }}
              >
                {brand.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 7. CATEGORY PROMOTION CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Smartphones */}
        <div
          onClick={() => onNavigate('shop', { category: 'smartphones' })}
          className="group rounded-2xl bg-gradient-to-r from-[#FDF2F8] to-[#FCE7F3] border border-pink-100 p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div className="space-y-1.5">
            <h3 className="font-display text-base font-extrabold text-slate-900">
              Smartphones
            </h3>
            <p className="text-sm font-extrabold text-slate-800">
              Up to 40% OFF
            </p>
            <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-slate-800 shadow-2xs group-hover:bg-[#E11D48] group-hover:text-white transition-colors">
              Shop Now <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <img
            src="/assets/products/promo-smartphones.png"
            alt="Smartphones Promotion"
            referrerPolicy="no-referrer"
            className="w-28 h-24 object-contain rounded-lg group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Laptops */}
        <div
          onClick={() => onNavigate('shop', { category: 'electronics' })}
          className="group rounded-2xl bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] border border-blue-100 p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div className="space-y-1.5">
            <h3 className="font-display text-base font-extrabold text-slate-900">
              Laptops
            </h3>
            <p className="text-sm font-extrabold text-slate-800">
              Up to 45% OFF
            </p>
            <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-slate-800 shadow-2xs group-hover:bg-[#E11D48] group-hover:text-white transition-colors">
              Shop Now <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <img
            src="/assets/products/promo-laptops.png"
            alt="Laptops Promotion"
            referrerPolicy="no-referrer"
            className="w-32 h-24 object-contain rounded-lg group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Home Appliances */}
        <div
          onClick={() => onNavigate('shop', { category: 'appliances' })}
          className="group rounded-2xl bg-gradient-to-r from-[#ECFDF5] to-[#D1FAE5] border border-emerald-100 p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div className="space-y-1.5">
            <h3 className="font-display text-base font-extrabold text-slate-900">
              Home Appliances
            </h3>
            <p className="text-sm font-extrabold text-slate-800">
              Up to 50% OFF
            </p>
            <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-slate-800 shadow-2xs group-hover:bg-[#E11D48] group-hover:text-white transition-colors">
              Shop Now <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <img
            src="/assets/products/promo-appliances.png"
            alt="Home Appliances Promotion"
            referrerPolicy="no-referrer"
            className="w-32 h-24 object-contain rounded-lg group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Sports & Outdoors */}
        <div
          onClick={() => onNavigate('shop', { category: 'sports' })}
          className="group rounded-2xl bg-gradient-to-r from-[#EEF2FF] to-[#E0E7FF] border border-indigo-100 p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-all"
        >
          <div className="space-y-1.5">
            <h3 className="font-display text-base font-extrabold text-slate-900">
              Sports & Outdoors
            </h3>
            <p className="text-sm font-extrabold text-slate-800">
              Up to 55% OFF
            </p>
            <span className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-[11px] font-bold text-slate-800 shadow-2xs group-hover:bg-[#E11D48] group-hover:text-white transition-colors">
              Shop Now <ArrowRight className="w-3 h-3" />
            </span>
          </div>
          <img
            src="/assets/products/promo-sports.png"
            alt="Sports and Outdoors Promotion"
            referrerPolicy="no-referrer"
            className="w-32 h-24 object-contain rounded-lg group-hover:scale-105 transition-transform"
          />
        </div>
      </section>

      {/* 8. DEDICATED NEWSLETTER TECH CALLOUT BANNER */}
      <section className="rounded-2xl bg-gradient-to-r from-[#0B1120] via-[#1E293B] to-[#3B0A18] text-white p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E11D48]">
            <Mail className="w-3.5 h-3.5" /> TekZone Insider Club
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
            Get the Latest Tech & Deals
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Join our newsletter and never miss an update on flash sales, flagship launches, and members-only coupon drops.
          </p>
          <form onSubmit={handleBannerNewsletter} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-md">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 h-11 px-4 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#E11D48]"
            />
            <button
              type="submit"
              className="h-11 px-6 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
            >
              {newsletterJoined ? (
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> Subscribed!
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>

        <div className="w-full lg:w-72 flex justify-center">
          <img
            src="/assets/products/hero-devices.png"
            alt="Latest Tech Gadgets"
            referrerPolicy="no-referrer"
            className="h-36 object-contain rounded-xl"
          />
        </div>
      </section>
    </div>
  );
};
