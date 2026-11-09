import React from 'react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/products';
import { PROMO_BANNERS } from '../data/promos';
import { useCart } from '../context/CartContext';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, UtensilsCrossed, Clock, Star, Quote } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveTab, applyVoucher, setIsCartOpen, products, testimonials } = useCart();

  // Bestsellers / Featured items (only available ones first, or first 4)
  const featuredProducts = products.filter((p) => p.isAvailable !== false).slice(0, 4);

  const pillars = [
    {
      icon: Sparkles,
      title: 'Bahan Berkualitas Pilihan',
      desc: '100% bumbu rempah asli dan daging ayam segar langsung dari peternak lokal terpercaya tanpa campuran bahan pengawet sintetik.',
    },
    {
      icon: UtensilsCrossed,
      title: 'Dibuat Fresh Setiap Hari',
      desc: 'Setiap pesanan baru dimasak saat tiket order masuk. Nikmati kelezatan makanan hangat dengan kerenyahan maksimal.',
    },
    {
      icon: HeartHandshake,
      title: 'Harga Ramah di Kantong',
      desc: 'Cita rasa premium sekelas restoran bintang lima dengan harga UMKM bersahabat yang pas untuk makan siang harian Anda.',
    },
    {
      icon: ShieldCheck,
      title: 'Kebersihan & Higienitas Terjamin',
      desc: 'Dapur berstandar sanitasi tinggi, masker dan sarung tangan food-grade, serta wadah ramah lingkungan bersegel higienis.',
    },
    {
      icon: Clock,
      title: 'Pelayanan Cepat & Tanggap',
      desc: 'Pengolahan efisien 10-15 menit dan armada kurir instan yang siap mengantar hidangan tetap hangat sampai ke meja makan Anda.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Kategori Kuliner Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider block mb-1">
              Eksplorasi Rasa
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39271F]">
              Kategori Menu Favorit
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('menu')}
            className="text-xs font-semibold text-[#E97832] hover:text-[#D66723] flex items-center gap-1.5 self-start sm:self-auto group"
          >
            <span>Buka Semua Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab('menu')}
              className="p-4 rounded-2xl bg-white border border-[#F2E5D7] hover:border-[#E97832] text-left transition-all hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <span className="w-8 h-8 rounded-xl bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-xs font-bold text-[#E97832] mb-3 group-hover:bg-[#E97832] group-hover:text-white transition-colors">
                  0{CATEGORIES.indexOf(cat) + 1}
                </span>
                <h3 className="font-serif text-sm font-bold text-[#39271F] group-hover:text-[#E97832] transition-colors">
                  {cat.label}
                </h3>
              </div>
              <span className="text-[11px] text-stone-500 mt-2 block tabular-nums">
                {cat.count} Menu
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. Section Produk Unggulan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider block mb-1">
              Menu Terlaris & Paling Dicari
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39271F]">
              Cita Rasa Juara Nusantara
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('menu')}
            className="text-xs font-semibold text-[#E97832] hover:text-[#D66723] flex items-center gap-1.5 self-start sm:self-auto group"
          >
            <span>Lihat Daftar Lengkap</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Section Keunggulan Brand RASA NUSANTARA */}
      <section className="bg-[#F2E5D7]/50 py-16 border-y border-[#F2E5D7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider block mb-2">
              Kenapa Memilih Kami?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39271F] leading-tight">
              Kelezatan Autentik dengan Standar Kualitas Tinggi
            </h2>
            <p className="text-sm text-stone-600 mt-3">
              Kami percaya makanan yang enak lahir dari kejujuran bahan, kebersihan dapur, dan ketulusan dalam mengolah bumbu tradisional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-[#F2E5D7] shadow-sm flex flex-col justify-between hover:-translate-y-1 transition-all"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-[#E97832] mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#39271F] mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Section Promo Menarik */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#39271F] to-[#4c352a] text-[#FFF8EF] p-8 sm:p-12 overflow-hidden shadow-xl border border-stone-800">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
            <img
              src="/src/assets/images/hero_culinary_feast_1793604100215.jpg"
              alt="Background Promo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-xs font-bold text-[#E97832] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full inline-block">
              Promo Spesial Hari Ini
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Rasa Lezat, <span className="text-[#E97832]">Harga Bersahabat!</span>
            </h2>

            <p className="text-sm text-[#FFF8EF]/80 leading-relaxed">
              Dapatkan potongan harga hingga 20% untuk paket bundling dan kupon diskon langsung dengan kode voucher <strong className="text-white font-mono bg-[#E97832] px-2 py-0.5 rounded text-xs">NUSANTARA10</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={() => {
                  applyVoucher('NUSANTARA10');
                  setIsCartOpen(true);
                }}
                className="px-5 py-3 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95"
              >
                Gunakan Kupon NUSANTARA10
              </button>

              <button
                onClick={() => setActiveTab('promo')}
                className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all"
              >
                Lihat Semua Promo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section Testimoni Pelanggan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider block mb-2">
            Kata Mereka yang Sudah Menikmati
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39271F]">
            Ulasan Hangat Pelanggan Setia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="bg-white p-6 rounded-2xl border border-[#F2E5D7] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#E97832] mb-3">
                  {[...Array(testi.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#E97832]" />
                  ))}
                </div>
                <p className="text-xs text-stone-700 leading-relaxed italic mb-4">
                  "{testi.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2E5D7] flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E97832] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {testi.avatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#39271F]">{testi.name}</h4>
                  <p className="text-[10px] text-stone-500">{testi.role}</p>
                  <p className="text-[10px] text-[#66734B] font-medium mt-0.5">
                    Menu Favorit: {testi.favoriteMenu}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Section CTA Penutup */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-[#FFF8EF] rounded-3xl border-2 border-[#E97832]/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-sm">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold text-[#E97832] uppercase tracking-widest block">
              Lapar Sekarang?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39271F] leading-tight">
              Sudah Siap Menikmati Kelezatannya?
            </h2>
            <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              Pesan hidangan favoritmu sekarang. Pesanan langsung disiapkan segar dari dapur dan diantar hangat sampai ke depan pintu rumahmu.
            </p>
            <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
              <button
                onClick={() => setActiveTab('menu')}
                className="px-8 py-4 bg-[#E97832] hover:bg-[#D66723] text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <span>Pesan Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://wa.me/6281234567890?text=Halo%20RASA%20NUSANTARA,%20saya%20ingin%20pesan"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 bg-white hover:bg-stone-50 text-[#39271F] border border-[#F2E5D7] text-sm font-semibold rounded-xl shadow-sm transition-colors"
              >
                Pesan Cepat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
