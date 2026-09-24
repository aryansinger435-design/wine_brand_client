import React from "react";
import { Wine, Calendar, Award, Sparkles, Clock, ShieldCheck } from "lucide-react";

export const StorySection = () => {
  return (
    <div className="space-y-14 sm:space-y-24 py-10 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* 1. Craft & Heritage */}
      <section id="craft" className="relative w-full overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          {/* Visual Showcase */}
          <div className="relative w-full">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-gold-500/30 shadow-luxury group w-full">
              <img
                src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80"
                alt="Cellar Barrels"
                className="w-full h-64 sm:h-80 md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-noir-950 via-noir-950/40 to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-noir-950/85 backdrop-blur-md border border-gold-500/30">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center border border-gold-400/40 shrink-0">
                    <Wine className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-cream-100 truncate">
                      French Oak Barrel Fermentation
                    </h4>
                    <p className="text-[11px] sm:text-xs text-cream-300/70 truncate">
                      Aged 12 to 24 months in medium-toast oak casks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Story */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-serif uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cellar Craftsmanship</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-cream-50 leading-tight">
              Where Ancient Soils Meet Sovereign Winemaking.
            </h2>

            <p className="text-cream-200/80 text-xs sm:text-base leading-relaxed font-light">
              At <strong>Château Dhariwal</strong>, we believe every bottle captures a singular year of weather, rain, and sun. Our grapes are handpicked exclusively at dawn when temperatures are crisp, preserving delicate aromatics and vibrant natural acidity.
            </p>

            <p className="text-cream-300/70 text-xs sm:text-sm leading-relaxed font-light">
              Each lot is vinified separately in micro-fermenters before resting quietly in our subterranean stone vaults. We take pride in complete transparency: transparent <strong>Indian Rupee (₹)</strong> fair cellar pricing, with certified bottling lineage.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="p-3 sm:p-4 rounded-xl bg-wine-950/50 border border-gold-500/20 min-w-0">
                <span className="font-serif text-xl sm:text-2xl font-bold gold-text-gradient block">
                  100%
                </span>
                <p className="text-xs text-cream-200 font-semibold mt-1 truncate">
                  Hand-Harvested Fruit
                </p>
                <p className="text-[10px] sm:text-[11px] text-cream-300/60 mt-0.5 truncate">
                  Picked at optimal ripeness
                </p>
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-wine-950/50 border border-gold-500/20 min-w-0">
                <span className="font-serif text-xl sm:text-2xl font-bold gold-text-gradient block">
                  ₹ INR
                </span>
                <p className="text-xs text-cream-200 font-semibold mt-1 truncate">
                  Transparent Pricing
                </p>
                <p className="text-[10px] sm:text-[11px] text-cream-300/60 mt-0.5 truncate">
                  Direct cellar ₹ rates
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Manufacturing & Ageing Guide (Why Mfg & Exp Dates Matter) */}
      <section id="aging-guide" className="p-4 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl luxury-glass border border-gold-500/30 w-full overflow-hidden">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-serif uppercase tracking-[0.2em] mb-2">
            <Calendar className="w-4 h-4" />
            <span>Bottling &amp; Ageing Science</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 mb-3">
            Why We Certify Manufacturing &amp; Expiry Dates
          </h3>
          <p className="text-xs sm:text-sm text-cream-300/80 leading-relaxed font-light px-1">
            Unlike mass-produced beverages, vintage wine undergoes continuous micro-oxidation. 
            Understanding the exact <strong>Manufacturing Date (Bottling)</strong> and <strong>Expiry Date (Peak Aging Window)</strong> 
            allows collectors to open each bottle at its aromatic summit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-noir-900/80 border border-gold-500/20 flex flex-col justify-between min-w-0">
            <div>
              <div className="w-10 h-10 rounded-xl bg-wine-900/60 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-cream-100 mb-2">
                1. Bottling &amp; Mfg Date
              </h4>
              <p className="text-xs text-cream-300/70 leading-relaxed">
                Marks the precise moment the wine was sealed in glass with natural cork under inert argon gas. Young tannins are firm, fruit is vibrant and primary.
              </p>
            </div>
            <span className="text-[11px] font-mono text-gold-400/80 mt-4 block">
              Years 0 &ndash; 2: Primary Fruit Bloom
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-noir-900/80 border border-gold-500/20 flex flex-col justify-between min-w-0">
            <div>
              <div className="w-10 h-10 rounded-xl bg-wine-900/60 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-cream-100 mb-2">
                2. Peak Evolution Window
              </h4>
              <p className="text-xs text-cream-300/70 leading-relaxed">
                Tannins soften into velvet. Aromas evolve into complex notes of cedarwood, truffle, leather, and dried cherries. This is the optimal window to savor.
              </p>
            </div>
            <span className="text-[11px] font-mono text-gold-400/80 mt-4 block">
              Years 3 &ndash; 10: Golden Maturity
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-noir-900/80 border border-gold-500/20 flex flex-col justify-between min-w-0">
            <div>
              <div className="w-10 h-10 rounded-xl bg-wine-900/60 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-base font-bold text-cream-100 mb-2">
                3. Expiry / Cellar Horizon
              </h4>
              <p className="text-xs text-cream-300/70 leading-relaxed">
                The recommended threshold beyond which acidity and fruit may decline. Our grand reserves are cellared to endure up to 15 years in proper conditions.
              </p>
            </div>
            <span className="text-[11px] font-mono text-gold-400/80 mt-4 block">
              Years 10 &ndash; 15+: Grand Library Reserve
            </span>
          </div>

        </div>
      </section>

    </div>
  );
};
