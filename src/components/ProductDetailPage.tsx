import React, { useState, useEffect } from 'react';
import {
  Star,
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ZoomIn,
  ChevronRight,
  ThumbsUp,
  MessageSquare,
  Package,
  Store,
  Plus
} from 'lucide-react';
import {
  Product,
  ReviewItem,
  QuestionItem
} from '../data/storeData';
import { PageView } from './Header';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  recentlyViewed: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (
    product: Product,
    quantity?: number,
    color?: string,
    storage?: string
  ) => void;
  onBuyNow: (
    product: Product,
    quantity: number,
    color: string,
    storage?: string
  ) => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: PageView, options?: { category?: string; brand?: string }) => void;
  reviews: ReviewItem[];
  onAddReview: (review: Omit<ReviewItem, 'id' | 'date' | 'helpfulCount'>) => void;
  questions: QuestionItem[];
  onAddQuestion: (q: Omit<QuestionItem, 'id' | 'date' | 'answer' | 'answeredBy'>) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  recentlyViewed,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onNavigate,
  reviews,
  onAddReview,
  questions,
  onAddQuestion
}) => {
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [selectedImage, setSelectedImage] = useState<string>(gallery[0]);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Standard'
  );
  const [selectedStorage, setSelectedStorage] = useState<string>(
    product.storageOptions?.[0] || 'Standard Edition'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<
    'description' | 'specs' | 'reviews' | 'qa' | 'shipping' | 'warranty'
  >('description');

  // Review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Question form state
  const [questionAuthor, setQuestionAuthor] = useState('');
  const [questionText, setQuestionText] = useState('');

  // Frequently bought together selection
  const companionProduct =
    allProducts.find((p) => p.id !== product.id && p.category === product.category) ||
    allProducts.find((p) => p.id !== product.id) ||
    product;
  const [includeCompanion, setIncludeCompanion] = useState(true);
  const [bundleAdded, setBundleAdded] = useState(false);

  useEffect(() => {
    const imgs = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
    setSelectedImage(imgs[0]);
    setSelectedColor(product.colors[0]?.name || 'Standard');
    setSelectedStorage(product.storageOptions?.[0] || 'Standard Edition');
    setQuantity(1);
    setIsZoomed(false);
  }, [product]);

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const productQuestions = questions.filter((q) => q.productId === product.id);
  const isWishlisted = wishlist.includes(product.id);

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddMainToCart = () => {
    onAddToCart(product, quantity, selectedColor, selectedStorage);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1800);
  };

  const handleAddBundle = () => {
    onAddToCart(product, 1, selectedColor, selectedStorage);
    if (includeCompanion && companionProduct.id !== product.id) {
      onAddToCart(companionProduct, 1);
    }
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 1800);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;
    onAddReview({
      productId: product.id,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      title: reviewTitle.trim() || 'Great purchase on TekZone!',
      comment: reviewComment.trim(),
      verified: true
    });
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionAuthor.trim() || !questionText.trim()) return;
    onAddQuestion({
      productId: product.id,
      askedBy: questionAuthor.trim(),
      question: questionText.trim()
    });
    setQuestionAuthor('');
    setQuestionText('');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="hover:text-[#E11D48] font-medium cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          type="button"
          onClick={() => onNavigate('shop', { category: product.category })}
          className="hover:text-[#E11D48] font-medium capitalize cursor-pointer"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-900 truncate max-w-xs">
          {product.title}
        </span>
      </div>

      {/* MAIN CONTIGUOUS PURCHASE MODULE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xs">
        {/* Left: Image Gallery + Zoom */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onMouseMove={handleMouseMove}
            onClick={() => setIsZoomed((prev) => !prev)}
            className="relative h-80 sm:h-96 rounded-2xl border border-slate-200/80 bg-white flex items-center justify-center p-6 overflow-hidden cursor-zoom-in group"
          >
            {product.discountPercent > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-[#E11D48] text-white text-xs font-extrabold px-3 py-1 rounded-full">
                -{product.discountPercent}% OFF
              </span>
            )}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed((prev) => !prev);
              }}
              className="absolute bottom-3 right-3 z-10 bg-slate-900/80 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1.5"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              {isZoomed ? 'Reset Zoom' : 'Click to Zoom'}
            </button>

            <img
              src={selectedImage}
              alt={product.title}
              referrerPolicy="no-referrer"
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: 'scale(1.85)'
                    }
                  : undefined
              }
              className="max-h-full max-w-full object-contain transition-transform duration-200"
            />
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1">
            {gallery.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedImage(imgUrl);
                  setIsZoomed(false);
                }}
                className={`w-20 h-20 rounded-xl border p-2 flex items-center justify-center bg-white transition-all cursor-pointer shrink-0 ${
                  selectedImage === imgUrl
                    ? 'border-[#E11D48] ring-2 ring-[#E11D48]/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`${product.title} angle ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Product Purchase Details */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            {/* Brand, SKU & Stock */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => onNavigate('shop', { brand: product.brand })}
                className="text-xs font-extrabold uppercase tracking-wider text-[#E11D48] hover:underline cursor-pointer"
              >
                {product.brand} Official Store
              </button>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>SKU: <strong className="text-slate-700 font-mono">{product.sku}</strong></span>
                <span>·</span>
                <span className="text-emerald-600 font-bold inline-flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.stockCount} available)
                </span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating & Seller */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-200 text-slate-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-900 tabular-nums">
                  {product.rating.toFixed(1)}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  className="text-slate-500 hover:text-[#E11D48] underline cursor-pointer"
                >
                  ({product.reviewCountLabel})
                </button>
              </div>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 inline-flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-slate-400" />
                Sold by <strong className="text-slate-900">{product.sellerName}</strong>
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-baseline gap-3">
              <span className="font-display text-3xl font-extrabold text-[#E11D48] tabular-nums">
                ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {product.oldPrice > product.price && (
                <>
                  <span className="text-base text-slate-400 line-through tabular-nums">
                    ${product.oldPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md tabular-nums">
                    Save ${(product.oldPrice - product.price).toFixed(2)} ({product.discountPercent}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Color Variants */}
            {product.colors.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">
                  Color: <span className="text-slate-900">{selectedColor}</span>
                </p>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#E11D48] bg-rose-50/40 text-slate-900 ring-2 ring-[#E11D48]/15'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage / Size / Edition Options */}
            {product.storageOptions && product.storageOptions.length > 0 && (
              <div>
                <p className="text-xs font-bold text-slate-700 mb-2">
                  Option / Edition: <span className="text-slate-900">{selectedStorage}</span>
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.storageOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSelectedStorage(opt)}
                      className={`px-3.5 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                        selectedStorage === opt
                          ? 'border-[#0F172A] bg-[#0F172A] text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {/* Quantity Stepper */}
              <div className="h-11 rounded-xl border border-slate-300 bg-white flex items-center overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-full text-slate-700 hover:bg-slate-100 font-bold text-sm cursor-pointer"
                >
                  −
                </button>
                <span className="w-11 text-center text-sm font-bold text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                  className="w-10 h-full text-slate-700 hover:bg-slate-100 font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                type="button"
                onClick={handleAddMainToCart}
                className={`flex-1 min-w-[160px] h-11 px-6 rounded-xl font-bold text-xs sm:text-sm text-white inline-flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                  addedToast
                    ? 'bg-emerald-600'
                    : 'bg-[#E11D48] hover:bg-[#BE123C]'
                }`}
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              {/* Buy Now */}
              <button
                type="button"
                onClick={() =>
                  onBuyNow(product, quantity, selectedColor, selectedStorage)
                }
                className="flex-1 min-w-[140px] h-11 px-6 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                Buy Now
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className={`h-11 px-4 rounded-xl border font-bold text-xs inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'border-[#E11D48] bg-rose-50 text-[#E11D48]'
                    : 'border-slate-300 text-slate-700 hover:border-[#E11D48] hover:text-[#E11D48]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#E11D48]' : ''}`} />
                <span className="hidden sm:inline">
                  {isWishlisted ? 'Saved' : 'Wishlist'}
                </span>
              </button>
            </div>
          </div>

          {/* Delivery, Return Policy & Warranty Trust Strip */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50">
              <Truck className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Fast Delivery</p>
                <p className="text-[11px] text-slate-500">{product.deliveryEstimate}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50">
              <RotateCcw className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">30-Day Easy Returns</p>
                <p className="text-[11px] text-slate-500">Free return label & full refund</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50">
              <ShieldCheck className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Official Warranty</p>
                <p className="text-[11px] text-slate-500">{product.warranty}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FREQUENTLY BOUGHT TOGETHER */}
      {companionProduct && companionProduct.id !== product.id && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6">
          <h2 className="font-display text-base sm:text-lg font-extrabold text-slate-900 mb-4">
            Frequently Bought Together
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Main item */}
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-slate-100"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 max-w-[180px] truncate">
                    {product.title}
                  </p>
                  <p className="text-xs font-extrabold text-[#E11D48] tabular-nums">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <Plus className="w-5 h-5 text-slate-400" />

              {/* Companion item */}
              <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCompanion}
                  onChange={(e) => setIncludeCompanion(e.target.checked)}
                  className="w-4 h-4 accent-[#E11D48]"
                />
                <img
                  src={companionProduct.image}
                  alt={companionProduct.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-slate-100"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 max-w-[180px] truncate">
                    {companionProduct.title}
                  </p>
                  <p className="text-xs font-extrabold text-[#E11D48] tabular-nums">
                    ${companionProduct.price.toFixed(2)}
                  </p>
                </div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-end gap-2 shrink-0">
              <div className="text-right">
                <span className="text-xs text-slate-500">Bundle Price: </span>
                <span className="text-lg font-extrabold text-[#E11D48] tabular-nums">
                  $
                  {(
                    product.price + (includeCompanion ? companionProduct.price : 0)
                  ).toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddBundle}
                className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                {bundleAdded ? '✓ Bundle Added to Cart' : 'Add Both to Cart'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED TABS: Description, Specifications, Reviews, Q&A, Shipping, Warranty */}
      <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden">
        <div className="border-b border-slate-200 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto no-scrollbar bg-slate-50/60">
          {[
            { id: 'description', label: 'Description' },
            { id: 'specs', label: 'Specifications' },
            { id: 'reviews', label: `Reviews (${productReviews.length + 2})` },
            { id: 'qa', label: `Questions & Answers (${productQuestions.length + 1})` },
            { id: 'shipping', label: 'Shipping' },
            { id: 'warranty', label: 'Warranty' }
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as typeof activeTab)}
              className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === t.id
                  ? 'border-[#E11D48] text-[#E11D48] bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'description' && (
            <div className="max-w-3xl space-y-4 text-sm text-slate-700 leading-relaxed">
              <h3 className="font-display text-lg font-extrabold text-slate-900">
                Product Overview — {product.title}
              </h3>
              <p>{product.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                {product.specs.map((sp) => (
                  <div
                    key={sp.label}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <p className="text-[11px] font-bold uppercase text-slate-400">
                      {sp.label}
                    </p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">
                      {sp.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <h3 className="font-display text-lg font-extrabold text-slate-900 mb-4">
                Technical Specifications
              </h3>
              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 px-4 py-3 bg-slate-50 text-xs">
                  <span className="font-bold text-slate-600">Brand</span>
                  <span className="col-span-2 font-semibold text-slate-900">
                    {product.brand}
                  </span>
                </div>
                <div className="grid grid-cols-3 px-4 py-3 bg-white text-xs">
                  <span className="font-bold text-slate-600">Model SKU</span>
                  <span className="col-span-2 font-mono text-slate-900">
                    {product.sku}
                  </span>
                </div>
                {product.specs.map((spec, idx) => (
                  <div
                    key={spec.label}
                    className={`grid grid-cols-3 px-4 py-3 text-xs ${
                      idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                    }`}
                  >
                    <span className="font-bold text-slate-600">{spec.label}</span>
                    <span className="col-span-2 font-semibold text-slate-900">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-display text-lg font-extrabold text-slate-900">
                  Verified Customer Reviews
                </h3>
                {[
                  ...productReviews,
                  {
                    id: 'default-rev-1',
                    productId: product.id,
                    author: 'Jordan Miller',
                    rating: 5,
                    date: 'October 15, 2026',
                    title: 'Exceeds expectations — genuine quality & fast shipping',
                    comment: `Purchased the ${product.title} during the TekZone Flash Deal event. Packaging was pristine and performance is top-tier.`,
                    verified: true,
                    helpfulCount: 27
                  },
                  {
                    id: 'default-rev-2',
                    productId: product.id,
                    author: 'Claire Bennett',
                    rating: 5,
                    date: 'October 5, 2026',
                    title: 'Best price online and 100% authentic',
                    comment:
                      'Compared prices across three marketplaces and TekZone beat them all while including next-day delivery.',
                    verified: true,
                    helpfulCount: 14
                  }
                ].map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-slate-200 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">
                          {rev.author}
                        </span>
                        {rev.verified && (
                          <span className="text-[11px] font-semibold text-emerald-700">
                            · Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= rev.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {rev.comment}
                    </p>
                    <div className="pt-1 flex items-center gap-2 text-[11px] text-slate-400">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{rev.helpfulCount} people found this helpful</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write a Review Form */}
              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 h-fit">
                <h4 className="font-display text-base font-extrabold text-slate-900 mb-3">
                  Write a Customer Review
                </h4>
                <form onSubmit={handleSubmitReview} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Rating
                    </label>
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs font-semibold focus:outline-none focus:border-[#E11D48]"
                    >
                      <option value={5}>★★★★★ (5/5 Excellent)</option>
                      <option value={4}>★★★★☆ (4/5 Very Good)</option>
                      <option value={3}>★★★☆☆ (3/5 Average)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Review Headline
                    </label>
                    <input
                      type="text"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Summarize your experience"
                      className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Review Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="What did you like most about this product?"
                      className="w-full p-3 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:border-[#E11D48]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="font-display text-lg font-extrabold text-slate-900">
                  Customer Questions & Answers
                </h3>
                {[
                  ...productQuestions,
                  {
                    id: 'default-qa',
                    productId: product.id,
                    question: `Is the ${product.title} covered by an official manufacturer warranty when purchased on TekZone?`,
                    askedBy: 'David S.',
                    date: 'October 10, 2026',
                    answer: `Yes! Every ${product.brand} item sold on TekZone is brand-new in factory-sealed retail packaging and backed by ${product.warranty}.`,
                    answeredBy: product.sellerName
                  }
                ].map((qa) => (
                  <div
                    key={qa.id}
                    className="p-4 rounded-xl border border-slate-200 space-y-2"
                  >
                    <p className="text-xs font-bold text-slate-900 flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-[#E11D48] shrink-0 mt-0.5" />
                      <span>Q: {qa.question}</span>
                    </p>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      <strong className="text-slate-900">A:</strong> {qa.answer}
                    </p>
                    <p className="text-[11px] text-slate-400 pl-6">
                      Answered by {qa.answeredBy} · {qa.date}
                    </p>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 h-fit">
                <h4 className="font-display text-base font-extrabold text-slate-900 mb-3">
                  Ask a Question
                </h4>
                <form onSubmit={handleSubmitQuestion} className="space-y-3">
                  <input
                    type="text"
                    required
                    value={questionAuthor}
                    onChange={(e) => setQuestionAuthor(e.target.value)}
                    placeholder="Your Name"
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:border-[#E11D48]"
                  />
                  <textarea
                    rows={3}
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Ask about compatibility, dimensions, or warranty..."
                    className="w-full p-3 rounded-lg border border-slate-300 bg-white text-xs focus:outline-none focus:border-[#E11D48]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Post Question
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-2xl space-y-3 text-xs sm:text-sm text-slate-600">
              <h3 className="font-display text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#E11D48]" />
                Shipping & Delivery Information
              </h3>
              <p>
                • <strong>Free Express Shipping</strong> on all orders over $50 across the continental United States.
              </p>
              <p>
                • Orders placed before 4:00 PM local time dispatch the same business day with real-time GPS tracking.
              </p>
              <p>
                • Estimated Delivery for this item: <strong className="text-slate-900">{product.deliveryEstimate}</strong>.
              </p>
            </div>
          )}

          {activeTab === 'warranty' && (
            <div className="max-w-2xl space-y-3 text-xs sm:text-sm text-slate-600">
              <h3 className="font-display text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#E11D48]" />
                Warranty & Protection Policy
              </h3>
              <p>
                • Coverage: <strong className="text-slate-900">{product.warranty}</strong>
              </p>
              <p>
                • Includes 30-Day Hassle-Free Returns and instant replacement for any manufacturing defects.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
            Related Products You May Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                isWishlisted={wishlist.includes(rel.id)}
                onToggleWishlist={onToggleWishlist}
                onAddToCart={onAddToCart}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}

      {/* RECENTLY VIEWED */}
      {recentlyViewed.length > 1 && (
        <section>
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
            Recently Viewed Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentlyViewed
              .filter((r) => r.id !== product.id)
              .slice(0, 6)
              .map((rv) => (
                <ProductCard
                  key={rv.id}
                  product={rv}
                  compact
                  isWishlisted={wishlist.includes(rv.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                />
              ))}
          </div>
        </section>
      )}
    </div>
  );
};
