import React from "react";
import { useAuth } from "../context/AuthContext";
import {
  X,
  User as UserIcon,
  ShieldCheck,
  Mail,
  Award,
  LogOut,
  Calendar,
  Sparkles,
} from "lucide-react";

export const UserProfileModal = ({ isOpen, onClose, onToast }) => {
  const { user, logout } = useAuth();

  if (!isOpen || !user) return null;

  const handleLogout = () => {
    logout();
    onClose();
    if (onToast) onToast("Signed out successfully.", "info");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-noir-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md luxury-glass rounded-2xl sm:rounded-3xl border border-gold-500/30 shadow-2xl p-5 sm:p-8 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-noir-900/60 text-cream-200 hover:text-gold-400 hover:bg-wine-900/60 border border-gold-500/20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Avatar */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full border-2 border-gold-400 bg-gradient-to-tr from-wine-900 to-wine-700 flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
            <span className="font-serif text-3xl font-bold text-gold-300">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-cream-50">
            {user.name}
          </h3>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-medium mt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
            <span>Verified Connoisseur Member</span>
          </div>
        </div>

        {/* Details Card */}
        <div className="space-y-3 p-4 rounded-2xl bg-noir-900/80 border border-gold-500/20 mb-6">
          <div className="flex items-center justify-between text-xs py-1 border-b border-gold-500/10">
            <span className="text-cream-300/70 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gold-400" />
              <span>Email:</span>
            </span>
            <span className="font-mono text-cream-100 font-medium">
              {user.email}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1 border-b border-gold-500/10">
            <span className="text-cream-300/70 flex items-center space-x-2">
              <Award className="w-4 h-4 text-gold-400" />
              <span>Cellar Tier:</span>
            </span>
            <span className="font-serif text-gold-300 font-semibold uppercase tracking-wider">
              Imperial Club (Tier I)
            </span>
          </div>

          <div className="flex items-center justify-between text-xs py-1">
            <span className="text-cream-300/70 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>INR Cellar Privileges:</span>
            </span>
            <span className="text-emerald-400 font-medium">
              Active &amp; Certified
            </span>
          </div>
        </div>

        {/* Member Privileges Notice */}
        <div className="p-3 rounded-xl bg-wine-950/60 border border-wine-500/20 text-xs text-cream-200/80 mb-6 leading-relaxed">
          <p className="font-serif text-gold-400 uppercase tracking-wider text-[11px] mb-1 font-semibold">
            Member Benefits
          </p>
          You have access to limited library releases, priority temperature-controlled delivery across India, and vintage barrel reserve tastings.
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl border border-red-500/30 bg-red-950/30 hover:bg-red-950/60 text-red-300 hover:text-red-200 text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out of Account</span>
        </button>

      </div>
    </div>
  );
};
