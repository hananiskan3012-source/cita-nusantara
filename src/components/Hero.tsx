import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, Star, Sparkles, ShieldCheck, Flame } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setActiveTab } = useCart();

  return (
    <section className="relative overflow-hidden bg-[#FFF8EF] pt-6 pb-14 lg:py-16">
      {/* Subtle background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E97832]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#66734B]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            {/* Fresh Daily Trust Kicker */}
            <div className="inline-flex items-center gap-2 self-start bg-[#F2E5D7] text-[#39271F] px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#E97832]" />
              <span>Fresh Every Day · Resep Autentik Warisan</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#39271F] leading-[1.12] tracking-tight">
              Cita Rasa Nusantara,{' '}
              <span className="text-[#E97832] italic font-normal">Selalu Bikin Rindu.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#39271F]/80 max-w-xl leading-relaxed">
              Nikmati kelezatan makanan pilihan dengan bahan berkualitas dan cita rasa autentik yang dibuat penuh cinta. Siap disantap hangat di mana pun Anda berada.
            </p>

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('menu')}
                className="px-6 py-3.5 bg-[#E97832] hover:bg-[#D66723] text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className="px-6 py-3.5 bg-white hover:bg-stone-50 text-[#39271F] border border-[#F2E5D7] text-sm font-semibold rounded-xl shadow-sm transition-all whitespace-nowrap"
              >
                Jelajahi Menu Kami
              </button>
            </div>

            {/* Adjacency Trust Indicators */}
            <div className="pt-4 flex items-center gap-6 text-xs text-stone-600 border-t border-[#F2E5D7]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#66734B]" />
                <span className="font-medium text-[#39271F]">100% Halal & Higienis</span>
              </div>
              <span className="text-stone-300">·</span>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#E97832]" />
                <span className="font-medium text-[#39271F]">Dimasak Fresh Sesuai Pesanan</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Feast Showcase */}
          <div className="lg:col-span-6 relative flex items-center">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#F2E5D7]">
              <img
                src="/src/assets/images/hero_culinary_feast_1793604100215.jpg"
                alt="Feast Makanan Tradisional Nusantara RASA NUSANTARA"
                className="w-full h-[400px] sm:h-[480px] lg:h-[520px] object-cover"
                loading="eager"
              />

              {/* Floating review card */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-[#F2E5D7]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex text-[#E97832]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#E97832]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#39271F]">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-stone-700 font-medium leading-snug">
                  "Sambal matah & ayam gepreknya paling nendang di Jakarta. Makanan tiba selalu hangat!"
                </p>
                <span className="text-[10px] text-stone-400 block mt-1">
                  18.500+ Pelanggan Puas se-Jabodetabek
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip in a full-width row below the hero split */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-[#F2E5D7] shadow-sm">
          <div className="p-2 border-r last:border-r-0 border-[#F2E5D7]">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#39271F] tabular-nums">
              4.9<span className="text-base text-[#E97832]">★</span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Rating Kepuasan Rasa</p>
          </div>

          <div className="p-2 border-r last:border-r-0 border-[#F2E5D7]">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#39271F] tabular-nums">
              18.500<span className="text-[#E97832]">+</span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Porsi Terjual Bulanan</p>
          </div>

          <div className="p-2 border-r last:border-r-0 border-[#F2E5D7]">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#39271F] tabular-nums">
              100<span className="text-[#66734B]">%</span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Bahan Segar Petani Lokal</p>
          </div>

          <div className="p-2">
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#39271F] tabular-nums">
              30<span className="text-[#E97832] font-sans text-sm font-semibold ml-1">Mnt</span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Rata-rata Pengantaran Hangat</p>
          </div>
        </div>
      </div>
    </section>
  );
};
