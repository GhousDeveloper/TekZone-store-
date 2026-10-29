import React, { useState } from 'react';
import { Heart, Star, Check, ShoppingCart } from 'lucide-react';
import { Product } from '../data/storeData';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  compact = false,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1100);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onSelectProduct(product)}
      className={`group bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between cursor-pointer ${
        compact ? 'p-3' : 'p-3.5'
      }`}
    >
      <div>
        {/* Top Row: Badge & Wishlist Heart */}
        <div className="flex items-center justify-between min-h-[24px] mb-1">
          {!compact && product.discountPercent > 0 ? (
            <span className="bg-[#E11D48] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full tabular-nums">
              -{product.discountPercent}%
            </span>
          ) : (
            <span />
          )}

          <button
            type="button"
            onClick={handleWishlist}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isWishlisted
                ? 'text-[#E11D48] bg-rose-50'
                : 'text-slate-400 hover:text-[#E11D48] hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#E11D48]' : ''}`} />
          </button>
        </div>

        {/* Product Studio Image */}
        <div
          className={`relative w-full flex items-center justify-center overflow-hidden bg-white rounded-lg ${
            compact ? 'h-28 my-1' : 'h-36 my-2'
          }`}
        >
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Brand & Title */}
        <div className="mt-2">
          {!compact && (
            <p className="text-[11px] text-slate-500 font-medium leading-tight mb-0.5">
              {product.brand}
            </p>
          )}
          <h3
            className={`font-bold text-slate-900 group-hover:text-[#E11D48] transition-colors truncate ${
              compact ? 'text-xs' : 'text-[13px]'
            }`}
            title={product.title}
          >
            {product.title}
          </h3>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex items-center text-amber-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3 h-3 ${
                  star <= Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-200 text-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-600 tabular-nums">
            {product.rating.toFixed(1)}
          </span>
          {!compact && (
            <span className="text-[10px] text-slate-400 truncate">
              ({product.reviewCountLabel})
            </span>
          )}
        </div>
      </div>

      {/* Price & CTA */}
      <div className="mt-2.5 pt-1">
        <div className="flex items-baseline gap-2 mb-2.5">
          <span
            className={`font-extrabold text-[#E11D48] tabular-nums ${
              compact ? 'text-sm' : 'text-base'
            }`}
          >
            ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          {product.oldPrice > product.price && (
            <span className="text-[11px] text-slate-400 line-through tabular-nums">
              ${product.oldPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`w-full py-2 px-3 rounded-md text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
            justAdded
              ? 'bg-emerald-600'
              : 'bg-[#E11D48] hover:bg-[#BE123C] active:scale-[0.99]'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Added
            </>
          ) : (
            <>
              {!compact && <ShoppingCart className="w-3.5 h-3.5" />}
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};
