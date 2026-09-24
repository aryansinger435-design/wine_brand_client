import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const CartDrawer = ({ onOpenAuth, onToast }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalCount,
    totalPriceINR,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(totalPriceINR);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      onOpenAuth("register");
      if (onToast) onToast("Please register or sign in to complete cellar reservation.", "info");
      return;
    }

    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCartOpen(false);
      if (onToast) onToast("Cellar reservation confirmed! Sommelier will connect with you.", "success");
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-noir-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-full max-w-md bg-gradient-to-b from-wine-950 via-noir-900 to-noir-950 border-l border-gold-500/30 shadow-2xl p-4 sm:p-6 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-gold-500/20">
            <div className="flex items-center space-x-2.5">
              <ShoppingBag className="w-5 h-5 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-cream-50">
                Cellar Selection ({totalCount})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-cream-300 hover:text-gold-400 hover:bg-wine-900/50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Checkout Success Screen */}
          {checkoutSuccess ? (
            <div className="my-auto text-center py-12 px-4 luxury-glass rounded-2xl border border-gold-500/40 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-400">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-xl font-bold text-cream-50 mb-2">
                Vintage Reserved Successfully!
              </h4>
              <p className="text-xs text-cream-300/80 mb-4 leading-relaxed">
                Your order of <strong className="text-gold-300">{formattedTotal}</strong> has been allocated from our temperature-controlled vault.
              </p>
              <span className="text-[11px] text-gold-400/90 italic block">
                Direct dispatch from Château Dhariwal
              </span>
            </div>
          ) : cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="my-auto text-center py-12">
              <div className="w-16 h-16 rounded-full bg-wine-900/40 border border-gold-500/20 flex items-center justify-center mx-auto mb-4 text-gold-400/50">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-semibold text-cream-100 mb-1">
                Your Cellar Basket is Empty
              </h4>
              <p className="text-xs text-cream-300/60 mb-6">
                Explore our fine reserve wines and add your vintage bottles.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-gold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold"
              >
                Browse Wines
              </button>
            </div>
          ) : (
            /* Items List */
            <div className="flex-1 overflow-y-auto py-4 space-y-4 my-2">
              {cartItems.map(({ wine, quantity }) => (
                <div
                  key={wine._id}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-wine-900/30 border border-gold-500/20"
                >
                  <img
                    src={wine.imageUrl}
                    alt={wine.name}
                    className="w-14 h-16 object-cover rounded-lg bg-noir-950"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-serif text-xs font-bold text-cream-100 truncate">
                      {wine.name}
                    </h5>
                    <p className="text-[11px] text-cream-300/60 truncate">
                      Mfg: {wine.mfgDate}
                    </p>
                    <div className="font-serif text-xs font-bold text-gold-300 mt-1">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(wine.price)}
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-1.5 bg-noir-950/80 px-2 py-1 rounded-lg border border-gold-500/20">
                    <button
                      onClick={() => updateQuantity(wine._id, -1)}
                      className="text-cream-300 hover:text-gold-400"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-cream-100 px-1 font-mono">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(wine._id, 1)}
                      className="text-cream-300 hover:text-gold-400"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(wine._id)}
                    className="p-1 text-cream-300/50 hover:text-red-400"
                    title="Remove bottle"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer & Checkout */}
          {cartItems.length > 0 && !checkoutSuccess && (
            <div className="pt-4 border-t border-gold-500/20 space-y-3">
              <div className="flex items-center justify-between text-xs text-cream-300/80">
                <span>Direct Cellar Vault Dispatch:</span>
                <span className="text-emerald-400 font-medium">Complimentary (Free)</span>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t border-gold-500/10">
                <span className="font-serif text-cream-100 font-semibold uppercase tracking-wider">
                  Total Reserve Price (INR):
                </span>
                <span className="font-serif text-2xl font-bold gold-text-gradient">
                  {formattedTotal}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full btn-gold py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2"
              >
                <span>{isAuthenticated ? "Confirm Cellar Reservation" : "Sign In & Reserve Bottles"}</span>
                <ArrowRight className="w-4 h-4 text-noir-950" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-cream-300/50">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                <span>Certified Indian Rupee Rates &bull; 100% Guaranteed</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
