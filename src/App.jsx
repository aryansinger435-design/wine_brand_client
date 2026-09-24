import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { WineCatalog } from "./components/WineCatalog";
import { StorySection } from "./components/StorySection";
import { Footer } from "./components/Footer";
import { WineDetailModal } from "./components/WineDetailModal";
import { AuthModal } from "./components/AuthModal";
import { UserProfileModal } from "./components/UserProfileModal";
import { CartDrawer } from "./components/CartDrawer";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export function AppContent() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState("login");
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedWine, setSelectedWine] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenAuth = (mode = "login") => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenSearch = () => {
    scrollToSection("wines");
  };

  return (
    <div className="min-h-screen bg-noir-950 text-cream-100 flex flex-col font-sans selection:bg-gold-500 selection:text-noir-950 w-full max-w-full overflow-x-hidden relative">
      
      {/* Navigation */}
      <Navbar
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setProfileModalOpen(true)}
        onScrollToSection={scrollToSection}
        onOpenSearch={handleOpenSearch}
      />

      {/* Hero Banner */}
      <Hero
        onExploreWines={() => scrollToSection("wines")}
        onLearnMore={() => scrollToSection("craft")}
      />

      {/* Main Wine Catalog (Crucial Feature: INR Pricing, Mfg Date, Exp Date) */}
      <main className="flex-1 w-full max-w-full min-w-0 overflow-x-hidden">
        <WineCatalog
          onQuickView={(wine) => setSelectedWine(wine)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Brand Story & Manufacturing/Aging Longevity Guide */}
        <StorySection />
      </main>

      {/* Footer */}
      <Footer onOpenAuth={handleOpenAuth} onToast={showToast} />

      {/* Modals & Drawers */}
      <WineDetailModal
        wine={selectedWine}
        onClose={() => setSelectedWine(null)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authInitialMode}
        onToast={showToast}
      />

      <UserProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onToast={showToast}
      />

      <CartDrawer
        onOpenAuth={handleOpenAuth}
        onToast={showToast}
      />

      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 animate-bounceIn flex items-center justify-between space-x-3 p-3.5 sm:p-4 rounded-2xl luxury-glass border border-gold-500/40 shadow-2xl sm:max-w-sm">
          {toast.type === "success" && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          {toast.type === "error" && (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          {toast.type === "info" && (
            <Info className="w-5 h-5 text-gold-400 shrink-0" />
          )}
          <span className="text-xs text-cream-100 font-medium">
            {toast.message}
          </span>
          <button
            onClick={() => setToast(null)}
            className="text-cream-300/60 hover:text-cream-100 pl-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
