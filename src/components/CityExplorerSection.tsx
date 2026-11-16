import React, { useState, useMemo } from 'react';
import { CITIES } from '../data/cities';
import { useCart } from '../context/CartContext';
import { ProductCard } from './ProductCard';
import { MapPin, Compass, ArrowRight, Sparkles, BookOpen, Truck, Calculator } from 'lucide-react';

export const CityExplorerSection: React.FC = () => {
  const { products, setActiveTab, setSelectedCityFilter, setIsShippingCalcOpen } = useCart();
  const [selectedCityId, setSelectedCityId] = useState<string>('padang');
  const [selectedIsland, setSelectedIsland] = useState<string>('all');

  const islands = [
    { id: 'all', label: 'Semua Pulau' },
    { id: 'Sumatera', label: 'Sumatera' },
    { id: 'Jawa', label: 'Jawa' },
    { id: 'Kalimantan', label: 'Kalimantan' },
    { id: 'Sulawesi', label: 'Sulawesi' },
    { id: 'Bali & Nusa Tenggara', label: 'Bali & NTB' },
    { id: 'Maluku & Papua', label: 'Maluku & Papua' },
  ];

  // Filter cities by island
  const filteredCities = useMemo(() => {
    if (selectedIsland === 'all') return CITIES;
    return CITIES.filter((c) => c.island === selectedIsland);
  }, [selectedIsland]);

  const activeCity = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];

  // Filter products originating from this city
  const cityProducts = products.filter(
    (p) =>
      p.originCity?.toLowerCase().replace(/\s+/g, '') ===
      activeCity.name.toLowerCase().replace(/\s+/g, '')
  );

  const handleExploreFullCatalogForCity = (cityName: string) => {
    setSelectedCityFilter(cityName);
    setActiveTab('menu');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E97832] uppercase tracking-wider mb-1">
            <Compass className="w-4 h-4 text-[#E97832]" />
            <span>Peta Rasa Nusantara (20 Kota & Daerah Khas)</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#39271F] leading-tight">
            Makanan Tradisional Khas Seluruh Kota Indonesia
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
            Jelajahi kelezatan kuliner autentik dari Sabang sampai Merauke: Rendang Minang, Soto Betawi, Gudeg Jogja, Rawon Surabaya, Choi Pan Pontianak, Bakmi Singkawang, Patin Bakar Bambu Dayak, Coto Makassar, hingga Ikan Bungkus Papua.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setIsShippingCalcOpen(true)}
            className="text-xs font-semibold px-3 py-2 bg-white text-[#39271F] border border-[#F2E5D7] hover:border-[#E97832] rounded-xl flex items-center gap-1.5 shadow-xs"
          >
            <Truck className="w-3.5 h-3.5 text-[#E97832]" />
            <span>Cek Ongkir (1 KM = Rp 5rb)</span>
          </button>

          <button
            onClick={() => {
              setSelectedCityFilter('all');
              setActiveTab('menu');
            }}
            className="text-xs font-semibold text-[#E97832] hover:text-[#D66723] flex items-center gap-1.5 group px-2 py-2"
          >
            <span>Katalog Seluruh Daerah</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Island Filter Tabs */}
      <div className="w-full min-w-0 max-w-full flex items-center gap-1.5 overflow-x-auto scrollbar-none touch-pan-x pb-1.5 border-b border-[#F2E5D7]/80">
        <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mr-1 shrink-0">
          Wilayah:
        </span>
        {islands.map((island) => (
          <button
            key={island.id}
            onClick={() => setSelectedIsland(island.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
              selectedIsland === island.id
                ? 'bg-[#39271F] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:text-[#39271F] border border-[#F2E5D7]'
            }`}
          >
            {island.label}
          </button>
        ))}
      </div>

      {/* Interactive City Selector Grid (20 Cities) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-2">
        {filteredCities.map((city) => {
          const isSelected = city.id === selectedCityId;
          const dishCount = products.filter(
            (p) =>
              p.originCity?.toLowerCase().replace(/\s+/g, '') ===
              city.name.toLowerCase().replace(/\s+/g, '')
          ).length;

          return (
            <button
              key={city.id}
              onClick={() => setSelectedCityId(city.id)}
              className={`p-2.5 rounded-2xl border text-left transition-all duration-300 relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#E97832] shadow-md ring-2 ring-[#E97832]/20 translate-y-[-2px]'
                  : 'bg-white/70 hover:bg-white border-[#F2E5D7] hover:border-stone-400'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[9px] font-semibold text-stone-400 uppercase tracking-wider block truncate">
                    {city.island?.split(' ')[0] || city.province.split(' ')[0]}
                  </span>
                  <MapPin
                    className={`w-3 h-3 shrink-0 ${
                      isSelected ? 'text-[#E97832]' : 'text-stone-300'
                    }`}
                  />
                </div>
                <h3 className="font-serif text-xs font-bold text-[#39271F] truncate" title={city.name}>
                  {city.name}
                </h3>
              </div>

              <div className="mt-1.5 pt-1.5 border-t border-[#F2E5D7]/60">
                <p className="text-[9px] text-stone-500 line-clamp-1 leading-tight">
                  {city.iconDish.split(' ')[0]} {city.iconDish.split(' ')[1] || ''}
                </p>
                <span className="text-[8px] font-mono font-bold text-[#E97832] block mt-0.5">
                  {dishCount} Menu
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected City Spotlight Banner & Dishes */}
      <div className="bg-[#FFF8EF] rounded-3xl border border-[#F2E5D7] p-4 sm:p-8 shadow-sm space-y-6 sm:space-y-8">
        {/* City Info Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#F2E5D7] flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-sm">
          <div className="space-y-2 max-w-2xl min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E97832] shrink-0" />
              <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider">
                Kuliner Asli Kota {activeCity.name} · {activeCity.province} ({activeCity.island})
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#39271F]">
              "{activeCity.tagline}"
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {activeCity.description}
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => handleExploreFullCatalogForCity(activeCity.name)}
              className="px-4 py-2.5 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Lihat Semua Menu {activeCity.name}</span>
            </button>
          </div>
        </div>

        {/* Dishes from this City */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#39271F] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E97832] shrink-0" />
              <span>Daftar Hidangan Tradisional Khas {activeCity.name}</span>
            </h4>
            <span className="text-xs text-stone-500 font-mono shrink-0">
              {cityProducts.length} Pilihan Masakan
            </span>
          </div>

          {cityProducts.length === 0 ? (
            <p className="text-xs text-stone-500 py-6 text-center">
              Belum ada menu terdaftar untuk kota ini.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {cityProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
