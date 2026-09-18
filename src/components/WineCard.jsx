import React from "react";
import { Calendar, Clock, Star, Eye, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

export const WineCard = ({ wine, onQuickView }) => {
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(wine.price);

  const formattedOriginalPrice = wine.originalPrice
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(wine.originalPrice)
    : null;

  return (
    <div className="luxury-glass-card rounded-2xl overflow-hidden flex flex-col group relative">
      
      {/* Top Image & Badges */}
      <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gradient-to-b from-wine-900/60 to-noir-950/90 flex items-center justify-center p-3 sm:p-4">
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-radial-gradient from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Wine Bottle Image */}
        <img
          src={wine.imageUrl}
          alt={wine.name}
          className="h-full w-full object-cover object-center rounded-lg transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Vintage & Category Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-serif font-bold uppercase tracking-wider bg-noir-950/80 text-gold-400 border border-gold-500/40 backdrop-blur-md">
            Vintage {wine.vintage}
          </span>
          {wine.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide bg-wine-800/90 text-cream-100 border border-wine-500/40 backdrop-blur-md flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 text-gold-400" />
              <span>{wine.badge}</span>
            </span>
          )}
        </div>

        {/* Quick View Button on Image - accessible on mobile & hover */}
        <button
          onClick={() => onQuickView(wine)}
          className="absolute bottom-3 right-3 p-2.5 rounded-full bg-noir-950/85 text-cream-100 border border-gold-500/40 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold-500 hover:text-noir-950 shadow-lg active:scale-95"
          title="Quick Taste & Details"
          aria-label="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Wine Details Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Region */}
          <div className="flex items-center justify-between text-xs text-gold-400/90 font-medium tracking-wider uppercase mb-1.5">
            <span>{wine.category}</span>
            <div className="flex items-center space-x-1 text-gold-400">
              <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
              <span className="text-cream-100 font-bold">{wine.rating.toFixed(1)}</span>
              <span className="text-cream-300/60">({wine.reviewsCount})</span>
            </div>
          </div>

          {/* Wine Name */}
          <h3
            onClick={() => onQuickView(wine)}
            className="font-serif text-lg font-bold text-cream-50 group-hover:text-gold-300 transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {wine.name}
          </h3>

          {/* Tagline / Grape Variety */}
          <p className="text-xs text-cream-300/70 italic line-clamp-1 mb-4">
            {wine.grapeVariety} &bull; {wine.region}
          </p>

          {/* CRUCIAL REQUIREMENT: Mfg Date & Expiry Date Badges */}
          <div className="space-y-1.5 p-2.5 rounded-xl bg-noir-950/60 border border-gold-500/20 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center space-x-1.5 text-cream-300/80">
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span className="text-[11px] font-medium uppercase tracking-wide">Mfg Date:</span>
              </span>
              <span className="font-mono text-[11px] font-semibold text-gold-300">
                {wine.mfgDate}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-xs pt-1 border-t border-gold-500/10">
              <span className="flex items-center space-x-1.5 text-cream-300/80">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-medium uppercase tracking-wide">Exp Date:</span>
              </span>
              <span className="font-mono text-[11px] font-semibold text-cream-200">
                {wine.expDate}
              </span>
            </div>
          </div>

          {/* ABV & Volume stats */}
          <div className="flex items-center justify-between text-[11px] text-cream-300/60 pb-3 border-b border-gold-500/15 mb-3">
            <span>Volume: <strong className="text-cream-200">{wine.volume}</strong></span>
            <span>Alcohol: <strong className="text-cream-200">{wine.alcoholPercentage}</strong></span>
          </div>
        </div>

        {/* Price in INR & Add to Cart Action */}
        <div className="flex items-center justify-between mt-1">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="font-serif text-xl sm:text-2xl font-bold text-cream-50 gold-text-gradient">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="text-xs text-cream-300/50 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider text-gold-400/80 block">
              Direct Cellar Price (INR)
            </span>
          </div>

          <button
            onClick={() => addToCart(wine, 1)}
            className="btn-gold px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center space-x-1.5 active:scale-95"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-noir-950" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
