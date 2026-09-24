import React, { useState } from "react";
import {
  X,
  Star,
  Calendar,
  Clock,
  Wine,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { useCart } from "../context/CartContext";

export const WineDetailModal = ({ wine, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!wine) return null;

  const handleAddToCart = () => {
    addToCart(wine, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-noir-950/85 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl luxury-glass rounded-2xl sm:rounded-3xl border border-gold-500/30 shadow-2xl max-h-[92vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row overflow-x-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-noir-900/90 text-cream-200 hover:text-gold-400 hover:bg-wine-900/60 border border-gold-500/30 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image & Badges */}
        <div className="w-full md:w-5/12 bg-gradient-to-b from-wine-900/50 to-noir-950/90 p-5 sm:p-8 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-gold-500/20 shrink-0">
          <div className="relative h-48 sm:h-64 md:h-96 w-full flex items-center justify-center">
            <img
              src={wine.imageUrl}
              alt={wine.name}
              className="max-h-full max-w-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 sm:mt-4">
            <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-serif font-bold uppercase tracking-wider bg-gold-500/20 text-gold-300 border border-gold-400/40">
              Vintage {wine.vintage}
            </span>
            <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-wine-800/80 text-cream-100 border border-wine-500/40">
              {wine.category}
            </span>
          </div>
        </div>

        {/* Right Column: Information & Tasting Notes */}
        <div className="w-full md:w-7/12 p-4 sm:p-8 md:overflow-y-auto md:max-h-[92vh] flex flex-col justify-between">
          <div>
            {/* Title & Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-serif uppercase tracking-[0.2em] text-gold-400">
                {wine.region}
              </span>
              <div className="flex items-center space-x-1 text-gold-400 text-xs">
                <Star className="w-4 h-4 fill-gold-400" />
                <span className="font-bold text-cream-100">{wine.rating.toFixed(1)}</span>
                <span className="text-cream-300/60">({wine.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-xl sm:text-3xl font-bold text-cream-50 mb-2">
              {wine.name}
            </h2>

            <p className="text-xs sm:text-sm text-gold-300/90 italic mb-4">
              {wine.tagline || wine.grapeVariety}
            </p>

            {/* CRUCIAL REQUIREMENT: Mfg Date & Expiry Date Highlight Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-noir-900/80 border border-gold-500/30 mb-6 shadow-inner">
              <div className="border-b sm:border-b-0 sm:border-r border-gold-500/20 pb-2 sm:pb-0 pr-0 sm:pr-2">
                <div className="flex items-center space-x-1.5 text-cream-300/80 mb-1">
                  <Calendar className="w-4 h-4 text-gold-400 shrink-0" />
                  <span className="text-xs uppercase font-medium tracking-wider">
                    Manufacturing Date:
                  </span>
                </div>
                <p className="font-mono text-sm font-bold text-gold-300">
                  {wine.mfgDate}
                </p>
                <span className="text-[10px] text-cream-300/50 block">Certified Cellar Bottling</span>
              </div>

              <div className="pl-0 sm:pl-2">
                <div className="flex items-center space-x-1.5 text-cream-300/80 mb-1">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs uppercase font-medium tracking-wider">
                    Expiry / Best Before:
                  </span>
                </div>
                <p className="font-mono text-sm font-bold text-cream-100">
                  {wine.expDate}
                </p>
                <span className="text-[10px] text-cream-300/50 block">Cellaring Potential</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-cream-200/80 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              {wine.description}
            </p>

            {/* Tasting Notes Breakdown */}
            {wine.tastingNotes && (
              <div className="space-y-3 mb-6 p-4 rounded-xl bg-wine-950/40 border border-gold-500/15">
                <h4 className="font-serif text-xs uppercase tracking-widest text-gold-400 flex items-center space-x-1.5">
                  <Wine className="w-3.5 h-3.5" />
                  <span>Sommelier Tasting Notes</span>
                </h4>

                {wine.tastingNotes.aroma && (
                  <div className="text-xs">
                    <strong className="text-cream-100 font-medium">Aroma (Nose): </strong>
                    <span className="text-cream-300/80">{wine.tastingNotes.aroma}</span>
                  </div>
                )}

                {wine.tastingNotes.palate && (
                  <div className="text-xs">
                    <strong className="text-cream-100 font-medium">Palate (Taste): </strong>
                    <span className="text-cream-300/80">{wine.tastingNotes.palate}</span>
                  </div>
                )}

                {wine.tastingNotes.finish && (
                  <div className="text-xs">
                    <strong className="text-cream-100 font-medium">Finish: </strong>
                    <span className="text-cream-300/80">{wine.tastingNotes.finish}</span>
                  </div>
                )}

                {wine.tastingNotes.foodPairing && (
                  <div className="text-xs">
                    <strong className="text-cream-100 font-medium">Recommended Pairing: </strong>
                    <span className="text-gold-300/90">{wine.tastingNotes.foodPairing}</span>
                  </div>
                )}
              </div>
            )}

            {/* ABV & Specifications */}
            <div className="flex flex-wrap gap-4 text-xs text-cream-300/70 mb-6 py-2 border-y border-gold-500/15">
              <span>Alcohol: <strong className="text-cream-100">{wine.alcoholPercentage}</strong></span>
              <span>Bottle Volume: <strong className="text-cream-100">{wine.volume}</strong></span>
              <span>Variety: <strong className="text-cream-100">{wine.grapeVariety}</strong></span>
            </div>
          </div>

          {/* Pricing in INR & Add to Cart Controls */}
          <div className="pt-4 border-t border-gold-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-3xl font-bold gold-text-gradient">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-sm text-cream-300/50 line-through">
                    {formattedOriginalPrice}
                  </span>
                )}
              </div>
              <span className="text-[11px] uppercase tracking-wider text-gold-400/80">
                Indian Rupee Pricing &bull; Incl. Taxes
              </span>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              {/* Quantity Counter */}
              <div className="flex items-center border border-gold-500/30 rounded-xl bg-noir-900/80 px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 text-cream-300 hover:text-gold-400"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-serif px-3 text-sm font-bold text-cream-100">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 text-cream-300 hover:text-gold-400"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="btn-gold flex-1 sm:flex-none px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-noir-950" />
                    <span>Added to Cellar</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-noir-950" />
                    <span>Add to Cellar</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
