import React, { useState } from "react";
import { Wine, Mail, ShieldCheck, Heart, Sparkles } from "lucide-react";

export const Footer = ({ onOpenAuth, onToast }) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    if (onToast) onToast("Thank you! You will receive our limited vintage releases.", "success");
    setTimeout(() => {
      setNewsletterEmail("");
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-noir-950 border-t border-gold-500/20 pt-10 sm:pt-16 pb-8 sm:pb-12 px-3 sm:px-6 lg:px-8 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 sm:pb-12 border-b border-gold-500/15">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full border border-gold-400/40 bg-wine-900/60 flex items-center justify-center shrink-0">
                <Wine className="w-5 h-5 text-gold-400" />
              </div>
              <span className="font-serif tracking-[0.15em] sm:tracking-[0.2em] text-base sm:text-lg font-bold gold-text-gradient uppercase">
                Château Dhariwal
              </span>
            </div>
            <p className="text-xs text-cream-300/70 leading-relaxed font-light">
              Fine estate reserve wines crafted with single-terroir passion. Transparently priced in Indian Rupees (₹) with certified bottling lineages.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-gold-400 font-mono">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Certified Connoisseur Vault</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-semibold">
              The Cellar
            </h4>
            <ul className="space-y-2 text-xs text-cream-300/80">
              <li><a href="#wines" className="hover:text-gold-300">Reserve Red Wines</a></li>
              <li><a href="#wines" className="hover:text-gold-300">Oak-Aged Chardonnay</a></li>
              <li><a href="#wines" className="hover:text-gold-300">Champagne &amp; Sparkling</a></li>
              <li><a href="#wines" className="hover:text-gold-300">Provence Style Rosé</a></li>
              <li><a href="#aging-guide" className="hover:text-gold-300">Mfg &amp; Expiry Guide</a></li>
            </ul>
          </div>

          {/* Col 3: Legal & Compliance */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Indian Compliance &amp; Terms
            </h4>
            <div className="space-y-2 text-[11px] text-cream-300/70 leading-relaxed">
              <p>All prices listed in Indian Rupees (₹ INR) inclusive of statutory excise taxes.</p>
              <p className="p-2.5 rounded-lg bg-wine-950/60 border border-gold-500/20 text-cream-200">
                🔞 <strong>Legal Age Notice:</strong> Alcoholic beverages are restricted to individuals of legal drinking age in their respective state (18+, 21+, or 25+). Drink responsibly.
              </p>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-widest text-gold-400 font-semibold">
              Private Cellar Bulletin
            </h4>
            <p className="text-xs text-cream-300/70 font-light">
              Receive notifications when newly bottled vintage barrels are released from our estate vaults.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="w-4 h-4 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-noir-900 border border-gold-500/25 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
                />
              </div>
              <button
                type="submit"
                className="w-full btn-gold py-2 rounded-xl text-xs uppercase tracking-widest font-semibold"
              >
                {subscribed ? "Subscribed to Cellar" : "Subscribe (INR Members)"}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream-300/50 gap-3 sm:gap-4 text-center sm:text-left">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} Château Dhariwal Luxury Wines Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-4 text-[11px] text-center">
            <span>100% Indian Rupee Currency Pricing</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Certified Bottling Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
