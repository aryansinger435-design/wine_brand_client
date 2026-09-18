import React from "react";
import { Wine, ShieldCheck, Calendar, Sparkles, ChevronDown } from "lucide-react";

export const Hero = ({ onExploreWines, onLearnMore }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-wine-gradient"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-wine-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-gold-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Decorative luxury vintage watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
        <span className="font-serif text-[18vw] font-extrabold text-gold-400 tracking-tighter">
          DHARIWAL
        </span>
      </div>

      <div className="relative max-w-5xl mx-auto text-center z-10">
        
        {/* Crown & Tagline */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-wine-900/80 border border-gold-500/40 text-gold-300 text-xs font-serif uppercase tracking-[0.25em] mb-8 shadow-gold-glow animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>The Sovereign Vintage Heritage</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
        </div>

        {/* Grand Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-cream-50 leading-[1.15] sm:leading-[1.1] mb-5 sm:mb-6">
          Bottled Grandeur,{" "}
          <span className="gold-text-gradient block mt-1">
            Enduring Heritage.
          </span>
        </h1>

        {/* Narrative Description */}
        <p className="text-cream-200/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
          Handcrafted from single-vineyard low yield harvests, aged in toasted French oak barrels, 
          and priced transparently in <strong className="text-gold-300 font-medium">Indian Rupees (₹)</strong> with 
          verifiable <strong className="text-gold-300 font-medium">Manufacturing & Cellaring Expiry Dates</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-12 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto">
          <button
            onClick={onExploreWines}
            className="w-full sm:w-auto btn-gold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-serif text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center space-x-3 group active:scale-95"
          >
            <Wine className="w-4 h-4 text-noir-950 transition-transform group-hover:rotate-12" />
            <span>Explore Cellar Collection</span>
          </button>
          <button
            onClick={onLearnMore}
            className="w-full sm:w-auto btn-wine-outline px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-serif text-xs sm:text-sm tracking-widest uppercase transition-all active:scale-95"
          >
            Cellar Story & Craft
          </button>
        </div>

        {/* Trust & Heritage Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 pt-6 border-t border-gold-500/20 max-w-4xl mx-auto text-left">
          
          <div className="flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 rounded-xl bg-wine-950/40 border border-gold-500/10">
            <div className="p-1.5 sm:p-2 rounded-lg bg-wine-900/60 border border-gold-500/20 text-gold-400 shrink-0">
              <span className="font-serif font-bold text-xs sm:text-sm">₹</span>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-cream-100 uppercase tracking-wider truncate">
                INR Pricing
              </p>
              <p className="text-[10px] sm:text-[11px] text-cream-300/70 truncate">
                Direct cellar ₹ rates
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 rounded-xl bg-wine-950/40 border border-gold-500/10">
            <div className="p-1.5 sm:p-2 rounded-lg bg-wine-900/60 border border-gold-500/20 text-gold-400 shrink-0">
              <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-cream-100 uppercase tracking-wider truncate">
                Mfg & Exp Dates
              </p>
              <p className="text-[10px] sm:text-[11px] text-cream-300/70 truncate">
                Precise longevity
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 rounded-xl bg-wine-950/40 border border-gold-500/10">
            <div className="p-1.5 sm:p-2 rounded-lg bg-wine-900/60 border border-gold-500/20 text-gold-400 shrink-0">
              <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-cream-100 uppercase tracking-wider truncate">
                Email OTP Auth
              </p>
              <p className="text-[10px] sm:text-[11px] text-cream-300/70 truncate">
                Direct to inbox
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-2 sm:space-x-3 p-2.5 sm:p-3 rounded-xl bg-wine-950/40 border border-gold-500/10">
            <div className="p-1.5 sm:p-2 rounded-lg bg-wine-900/60 border border-gold-500/20 text-gold-400 shrink-0">
              <Wine className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-cream-100 uppercase tracking-wider truncate">
                Oak Barrel Aged
              </p>
              <p className="text-[10px] sm:text-[11px] text-cream-300/70 truncate">
                12-24 months reserve
              </p>
            </div>
          </div>

        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onExploreWines}
            aria-label="Scroll down"
            className="animate-bounce text-gold-400/60 hover:text-gold-300 p-2 transition-colors"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  );
};
