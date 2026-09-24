import React, { useState, useEffect } from "react";
import { WineCard } from "./WineCard";
import { DEFAULT_WINES, CATEGORIES } from "../data/winesData";
import {
  Wine,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export const WineCatalog = ({ onQuickView, searchQuery, setSearchQuery }) => {
  const [wines, setWines] = useState(DEFAULT_WINES);
  const [categories, setCategories] = useState(CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWines = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (searchQuery && searchQuery.trim() !== "") {
        params.append("search", searchQuery.trim());
      }
      if (sortBy && sortBy !== "default") {
        params.append("sortBy", sortBy);
      }

      const apiBase = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${apiBase}/api/wines?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Server status ${res.status}`);
      }
      const data = await res.json();

      if (data.success && Array.isArray(data.wines) && data.wines.length > 0) {
        setWines(data.wines);
        if (data.categories) {
          setCategories(data.categories);
        }
        return;
      }
      throw new Error(data.message || "No data received from API");
    } catch (err) {
      // Graceful fallback to built-in cellar collection with local filtering
      console.warn("Backend API unavailable, displaying curated cellar collection:", err.message);

      let list = [...DEFAULT_WINES];

      if (selectedCategory && selectedCategory !== "All") {
        list = list.filter((w) => w.category === selectedCategory);
      }

      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.trim().toLowerCase();
        list = list.filter(
          (w) =>
            w.name?.toLowerCase().includes(q) ||
            w.tagline?.toLowerCase().includes(q) ||
            w.region?.toLowerCase().includes(q) ||
            w.grapeVariety?.toLowerCase().includes(q) ||
            w.description?.toLowerCase().includes(q)
        );
      }

      if (sortBy === "price_asc") {
        list.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price_desc") {
        list.sort((a, b) => b.price - a.price);
      } else if (sortBy === "rating") {
        list.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === "vintage") {
        list.sort((a, b) => b.vintage - a.vintage);
      }

      setWines(list);
      setCategories(CATEGORIES);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWines();
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="wines" className="py-10 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-serif uppercase tracking-[0.2em] mb-2 sm:mb-3">
          <Wine className="w-4 h-4" />
          <span>Curated Heritage Vintages</span>
          <Wine className="w-4 h-4" />
        </div>
        <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold text-cream-50 mb-2 sm:mb-4">
          The Grand Cellar Collection
        </h2>
        <p className="text-cream-300/70 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-2">
          Every bottle certified with Indian Rupee (₹) direct-from-cellar rates, explicit 
          Manufacturing (Mfg) dates, and cellar-tested ageing preservation guidelines.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-10 w-full max-w-full">
        
        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-1.5 sm:gap-3 px-1 scroll-smooth w-full max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-serif uppercase tracking-wider whitespace-nowrap transition-all duration-200 active:scale-95 shrink-0 ${
                selectedCategory === cat
                  ? "bg-gold-500 text-noir-950 font-bold shadow-gold-glow"
                  : "bg-wine-900/40 text-cream-200/80 border border-gold-500/20 hover:border-gold-400/50 hover:text-cream-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Sort Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl bg-noir-900/70 border border-gold-500/20 w-full max-w-full">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80 min-w-0">
            <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search wine name, region, grape..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-wine-950/60 border border-gold-500/20 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>

          {/* Sorter */}
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2 sm:gap-3 min-w-0">
            <span className="text-xs text-cream-300/60 font-medium flex items-center space-x-1 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-gold-400" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-wine-950/80 border border-gold-500/20 text-cream-100 text-xs rounded-xl px-2.5 sm:px-3 py-2 focus:outline-none focus:border-gold-400 font-serif cursor-pointer flex-1 sm:flex-initial min-w-0"
            >
              <option value="default">Featured Reserve</option>
              <option value="price_asc">Price: Low to High (₹)</option>
              <option value="price_desc">Price: High to Low (₹)</option>
              <option value="rating">Sommelier Rating</option>
              <option value="vintage">Vintage Year</option>
            </select>
          </div>

        </div>

      </div>

      {/* Grid of Wines */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div
              key={n}
              className="luxury-glass rounded-2xl h-96 animate-pulse p-4 flex flex-col justify-between"
            >
              <div className="bg-wine-900/40 h-48 rounded-xl" />
              <div className="space-y-2 mt-4">
                <div className="h-4 bg-wine-900/60 rounded w-3/4" />
                <div className="h-3 bg-wine-900/30 rounded w-1/2" />
                <div className="h-10 bg-wine-900/50 rounded-lg mt-3" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-16 luxury-glass rounded-2xl p-8 border border-red-500/30 max-w-lg mx-auto">
          <p className="text-red-400 text-sm mb-4">{error}</p>
          <button
            onClick={fetchWines}
            className="btn-gold px-4 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold inline-flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Loading Cellar</span>
          </button>
        </div>
      ) : wines.length === 0 ? (
        <div className="text-center py-16 luxury-glass rounded-2xl p-8 border border-gold-500/20 max-w-md mx-auto">
          <Wine className="w-10 h-10 text-gold-400 mx-auto mb-3 opacity-60" />
          <h3 className="font-serif text-lg font-bold text-cream-100 mb-1">
            No Vintage Bottles Found
          </h3>
          <p className="text-xs text-cream-300/70 mb-4">
            Try adjusting your search criteria or category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
              setSortBy("default");
            }}
            className="btn-gold px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {wines.map((wine) => (
            <WineCard key={wine._id} wine={wine} onQuickView={onQuickView} />
          ))}
        </div>
      )}

    </section>
  );
};
