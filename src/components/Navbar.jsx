import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  Wine,
  ShoppingBag,
  User as UserIcon,
  LogOut,
  Sparkles,
  Menu,
  X,
  Search,
} from "lucide-react";

export const Navbar = ({ onOpenAuth, onOpenProfile, onScrollToSection, onOpenSearch }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full max-w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-noir-950/95 backdrop-blur-md border-b border-gold-500/20 py-2.5 sm:py-3 shadow-luxury"
          : "bg-gradient-to-b from-noir-950/95 via-noir-950/70 to-transparent py-3 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          
          {/* Brand Logo */}
          <div
            onClick={() => onScrollToSection("hero")}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group min-w-0 shrink"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gold-400/40 bg-wine-900/60 flex items-center justify-center shadow-gold-glow group-hover:border-gold-400 transition-colors shrink-0">
              <Wine className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400 transition-transform group-hover:scale-110" />
            </div>
            <div className="min-w-0">
              <span className="font-serif tracking-[0.12em] sm:tracking-[0.22em] text-xs sm:text-base md:text-xl font-bold uppercase gold-text-gradient block leading-none truncate">
                Dhariwal Wine
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.3em] uppercase text-gold-400/80 font-medium block mt-0.5 sm:mt-1 truncate">
                Grand Reserve Cellars
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs lg:text-sm font-medium tracking-wider uppercase text-cream-200/90 shrink-0">
            <button
              onClick={() => onScrollToSection("wines")}
              className="hover:text-gold-400 transition-colors duration-200"
            >
              The Wines
            </button>
            <button
              onClick={() => onScrollToSection("craft")}
              className="hover:text-gold-400 transition-colors duration-200"
            >
              Our Craft
            </button>
            <button
              onClick={() => onScrollToSection("story")}
              className="hover:text-gold-400 transition-colors duration-200"
            >
              Cellar Story
            </button>
            <button
              onClick={() => onScrollToSection("aging-guide")}
              className="hover:text-gold-400 transition-colors duration-200"
            >
              Mfg & Ageing
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search wines"
              className="p-2 sm:p-2.5 rounded-full text-cream-200/80 hover:text-gold-400 hover:bg-wine-900/50 transition-colors"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cellar Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="View Cart"
              className="relative p-2 sm:p-2.5 rounded-full text-cream-200/90 hover:text-gold-400 hover:bg-wine-900/50 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-gold-500 text-noir-950 text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {totalCount}
                </span>
              )}
            </button>

            {/* User Auth Section */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center space-x-1.5 sm:space-x-2 p-1 sm:pl-3 sm:pr-2 sm:py-1.5 rounded-full bg-wine-900/40 border border-gold-500/30 hover:border-gold-400/80 transition-all text-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center text-xs font-bold border border-gold-400/40">
                    {user?.name?.charAt(0).toUpperCase() || "C"}
                  </span>
                  <span className="hidden sm:inline text-cream-100 text-xs font-medium max-w-[100px] truncate">
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdown && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg luxury-glass border border-gold-500/30 py-2 shadow-2xl z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gold-500/15">
                      <p className="text-xs text-gold-400 font-semibold truncate">
                        {user?.name}
                      </p>
                      <p className="text-[11px] text-cream-300/60 truncate">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        onOpenProfile();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-cream-200 hover:bg-wine-800/40 flex items-center space-x-2"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-gold-400" />
                      <span>Connoisseur Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdown(false);
                        logout();
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-red-400 hover:bg-red-950/40 flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth("login")}
                  className="text-xs tracking-wider uppercase px-2.5 sm:px-3 py-1.5 text-cream-200 hover:text-gold-400 font-medium transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth("register")}
                  className="btn-gold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider hidden lg:flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Join Cellar</span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-1.5 sm:p-2 text-cream-200 hover:text-gold-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-5 pt-3 border-t border-gold-500/20 space-y-2.5 animate-fadeIn bg-noir-950/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-2xl border border-gold-500/20">
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-gold-500/15">
              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 py-2 px-3 rounded-xl bg-wine-900/40 border border-gold-500/20 text-xs text-cream-200"
              >
                <Search className="w-3.5 h-3.5 text-gold-400" />
                <span>Search</span>
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 py-2 px-3 rounded-xl bg-wine-900/40 border border-gold-500/20 text-xs text-cream-200"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-gold-400" />
                <span>Cart ({totalCount})</span>
              </button>
            </div>

            <button
              onClick={() => {
                onScrollToSection("wines");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-1 text-xs sm:text-sm tracking-wider uppercase text-cream-200 hover:text-gold-400 transition-colors"
            >
              The Wines
            </button>
            <button
              onClick={() => {
                onScrollToSection("craft");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-1 text-xs sm:text-sm tracking-wider uppercase text-cream-200 hover:text-gold-400 transition-colors"
            >
              Our Craft
            </button>
            <button
              onClick={() => {
                onScrollToSection("story");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-1 text-xs sm:text-sm tracking-wider uppercase text-cream-200 hover:text-gold-400 transition-colors"
            >
              Cellar Story
            </button>
            <button
              onClick={() => {
                onScrollToSection("aging-guide");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 px-1 text-xs sm:text-sm tracking-wider uppercase text-cream-200 hover:text-gold-400 transition-colors"
            >
              Mfg & Ageing
            </button>

            {isAuthenticated ? (
              <div className="pt-2 border-t border-gold-500/15 space-y-2">
                <button
                  onClick={() => {
                    onOpenProfile();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 py-2.5 px-3 rounded-xl bg-wine-900/50 border border-gold-500/30 text-xs text-gold-300 font-medium"
                >
                  <UserIcon className="w-4 h-4 text-gold-400" />
                  <span>Profile ({user?.name})</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-2 py-2 px-3 rounded-xl bg-red-950/30 border border-red-500/20 text-xs text-red-300 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="pt-2 border-t border-gold-500/15 flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenAuth("login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 rounded-xl border border-gold-500/30 text-xs text-cream-100 uppercase tracking-wider font-semibold"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    onOpenAuth("register");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-gold py-2.5 text-xs uppercase tracking-wider rounded-xl font-bold shadow-gold-glow"
                >
                  Join Exclusive Cellar
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
