import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  Star,
  X,
  RotateCcw,
  ChevronRight,
  Search
} from 'lucide-react';
import { Product, CATEGORIES } from '../data/storeData';
import { ProductCard } from './ProductCard';
import { PageView } from './Header';

interface ShopPageProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNavigate: (page: PageView) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  selectedCategory,
  onCategoryChange,
  activeFilter,
  onFilterChange,
  selectedBrand,
  onBrandChange,
  searchQuery,
  onSearchChange,
  onNavigate
}) => {
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [minRating, setMinRating] = useState<number>(0);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  const allBrands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedBrand && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
        if (activeFilter === 'flash' && !p.isFlashDeal) return false;
        if (activeFilter === 'bestseller' && !p.isBestSeller) return false;
        if (activeFilter === 'trending' && !p.isTrending) return false;
        if (activeFilter === 'new' && !p.isNewArrival) return false;
        if (p.price > maxPrice) return false;
        if (p.rating < minRating) return false;
        if (p.discountPercent < minDiscount) return false;
        if (inStockOnly && !p.inStock) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.subcategory.toLowerCase().includes(q) ||
            p.shortDescription.toLowerCase().includes(q);
          if (!match) return false;
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
          case 'bestselling':
            return b.reviewsCount - a.reviewsCount;
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'rating':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [
    products,
    selectedCategory,
    selectedBrand,
    activeFilter,
    maxPrice,
    minRating,
    minDiscount,
    inStockOnly,
    searchQuery,
    sortBy
  ]);

  const handleResetFilters = () => {
    onCategoryChange('all');
    onFilterChange('all');
    onBrandChange('');
    onSearchChange('');
    setMaxPrice(1500);
    setMinRating(0);
    setMinDiscount(0);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const FilterPanelContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="font-display text-sm font-extrabold text-slate-900 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#E11D48]" />
          <span>Filters</span>
        </h3>
        <button
          type="button"
          onClick={handleResetFilters}
          className="text-xs font-bold text-[#E11D48] hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Categories
        </h4>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#E11D48] text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
            <span className="text-[11px] opacity-80">{products.length}</span>
          </button>
          {CATEGORIES.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#E11D48] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{cat.shortName}</span>
                <span className="text-[11px] opacity-80">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Filter */}
      <div className="border-t border-slate-100 pt-5">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Max Price
          </h4>
          <span className="text-xs font-extrabold text-[#E11D48] tabular-nums">
            Up to ${maxPrice}
          </span>
        </div>
        <input
          type="range"
          min={50}
          max={1500}
          step={25}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#E11D48] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
          <span>$50</span>
          <span>$750</span>
          <span>$1,500</span>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Brand
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="radio"
              name="brand-filter"
              checked={selectedBrand === ''}
              onChange={() => onBrandChange('')}
              className="accent-[#E11D48]"
            />
            <span>All Brands</span>
          </label>
          {allBrands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer"
            >
              <input
                type="radio"
                name="brand-filter"
                checked={selectedBrand.toLowerCase() === brand.toLowerCase()}
                onChange={() => onBrandChange(brand)}
                className="accent-[#E11D48]"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Customer Rating
        </h4>
        <div className="space-y-2">
          {[4.5, 4.0, 0].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setMinRating(r)}
              className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                minRating === r
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {r > 0 ? (
                <span className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{r.toFixed(1)} & Above</span>
                </span>
              ) : (
                <span>All Ratings</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Discount Filter */}
      <div className="border-t border-slate-100 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Discount
        </h4>
        <div className="space-y-1.5">
          {[
            { label: 'Any Discount', val: 0 },
            { label: '20% Off or more', val: 20 },
            { label: '30% Off or more', val: 30 },
            { label: '40% Off or more', val: 40 }
          ].map((d) => (
            <label
              key={d.val}
              className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer"
            >
              <input
                type="radio"
                name="discount-filter"
                checked={minDiscount === d.val}
                onChange={() => setMinDiscount(d.val)}
                className="accent-[#E11D48]"
              />
              <span>{d.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="border-t border-slate-100 pt-5">
        <label className="flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 accent-[#E11D48] rounded cursor-pointer"
          />
        </label>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="hover:text-[#E11D48] font-medium cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-slate-900">Shop Marketplace</span>
        {selectedCategory !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#E11D48] capitalize">{selectedCategory}</span>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-2xl border border-slate-200/90 p-5 sticky top-28">
          <FilterPanelContent />
        </aside>

        {/* Main Product Listing Area */}
        <div className="lg:col-span-9 space-y-4">
          {/* Top Controls & Collection Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 inline-flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#E11D48]" /> Filters
              </button>

              {[
                { id: 'all', label: 'All Products' },
                { id: 'flash', label: '⚡ Flash Deals' },
                { id: 'bestseller', label: '⭐ Best Sellers' },
                { id: 'trending', label: '🔥 Trending' },
                { id: 'new', label: '✨ New Arrivals' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onFilterChange(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
              <span className="text-xs text-slate-500 font-medium tabular-nums">
                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> items
              </span>

              <select
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-9 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#E11D48] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Newest Arrivals</option>
                <option value="bestselling">Best Selling</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Active Search / Brand Indicator */}
          {(searchQuery || selectedBrand) && (
            <div className="flex items-center gap-2 flex-wrap">
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                  Search: "{searchQuery}"
                  <button type="button" onClick={() => onSearchChange('')} className="text-slate-400 hover:text-slate-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
              {selectedBrand && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700">
                  Brand: {selectedBrand}
                  <button type="button" onClick={() => onBrandChange('')} className="text-slate-400 hover:text-slate-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-extrabold text-slate-900">
                No matching products found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try broadening your price range, clearing brand filters, or resetting your search query.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-lg bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/60"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-white h-full p-5 overflow-y-auto z-10 ml-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-base font-extrabold text-slate-900">
                Filter Products
              </h3>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterPanelContent />
          </div>
        </div>
      )}
    </div>
  );
};
