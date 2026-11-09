import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { Search, SlidersHorizontal, Heart, RotateCcw, Utensils } from 'lucide-react';
import { CategoryType } from '../types';

export const MenuPage: React.FC = () => {
  const { wishlist, searchQuery, setSearchQuery, products } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('semua');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(200000);

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'semua' && item.category !== selectedCategory) {
        return false;
      }

      // Wishlist filter
      if (showOnlyFavorites && !wishlist.includes(item.id)) {
        return false;
      }

      // Max price filter
      if (item.price > maxPrice) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popular
      return b.reviewCount - a.reviewCount;
    });
  }, [selectedCategory, showOnlyFavorites, maxPrice, searchQuery, sortBy, wishlist]);

  const handleResetFilters = () => {
    setSelectedCategory('semua');
    setSortBy('popular');
    setShowOnlyFavorites(false);
    setMaxPrice(200000);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider">
          Katalog Lengkap
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#39271F]">
          Jelajahi Menu RASA NUSANTARA
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Temukan aneka masakan autentik, camilan tradisional renyah, dan minuman segar yang diolah dari bahan segar pilihan setiap hari.
        </p>
      </div>

      {/* Search and Filter Controls Toolbar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#F2E5D7] shadow-sm space-y-4">
        {/* Top search & sorting row */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari makanan (misal: Sambal Matah, Kopi, Ayam Geprek, Nasi Goreng)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-stone-500 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs px-3 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] text-[#39271F] font-medium focus:outline-none focus:ring-2 focus:ring-[#E97832]/30"
            >
              <option value="popular">Urutkan: Terpopuler</option>
              <option value="rating">Urutkan: Rating Tertinggi</option>
              <option value="price-asc">Harga: Terendah ke Tertinggi</option>
              <option value="price-desc">Harga: Tertinggi ke Terendah</option>
            </select>

            {/* Favorite Filter Toggle */}
            <button
              onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all whitespace-nowrap ${
                showOnlyFavorites
                  ? 'bg-[#E97832] text-white border-[#E97832]'
                  : 'bg-[#FFF8EF] text-[#39271F] border-[#F2E5D7] hover:border-stone-400'
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  showOnlyFavorites ? 'fill-white' : 'text-[#E97832]'
                }`}
              />
              <span>Favorit ({wishlist.length})</span>
            </button>
          </div>
        </div>

        {/* Category Segmented Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-[#F2E5D7]">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryType)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#39271F] text-white shadow-sm'
                  : 'bg-[#FFF8EF] text-[#39271F] hover:bg-[#F2E5D7] border border-[#F2E5D7]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result Stats & Active Filters */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <p>
          Menampilkan <span className="font-bold text-[#39271F] font-mono">{filteredProducts.length}</span> dari {products.length} menu pilihan
        </p>

        {(selectedCategory !== 'semua' || searchQuery || showOnlyFavorites) && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1 text-[#E97832] hover:underline font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Semua Filter</span>
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#F2E5D7] p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 bg-[#FFF8EF] text-[#E97832] rounded-full flex items-center justify-center mx-auto">
            <Utensils className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#39271F]">
            Tidak Ada Menu yang Sesuai
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Kata kunci atau filter yang Anda gunakan tidak cocok dengan menu kami saat ini. Coba ubah pencarian atau reset filter.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-semibold rounded-xl shadow transition-colors"
          >
            Tampilkan Semua Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
