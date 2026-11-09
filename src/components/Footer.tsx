import React from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, Mail, Clock, Instagram, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, storeSettings, setIsAdminOpen } = useCart();

  const handleNav = (tab: 'home' | 'menu' | 'promo' | 'tentang' | 'kontak') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#39271F] text-[#FFF8EF] border-t border-[#39271F]/40 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#FFF8EF]/15">
          {/* Col 1: Brand & Filosofi */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#E97832]" />
              <span className="font-serif text-2xl font-bold tracking-tight text-[#FFF8EF]">
                {storeSettings.storeName}
              </span>
            </div>
            <p className="text-xs text-[#FFF8EF]/80 italic">
              "{storeSettings.tagline}"
            </p>
            <p className="text-xs text-[#FFF8EF]/70 leading-relaxed">
              UMKM kuliner khas Nusantara yang berkomitmen menyajikan hidangan autentik dengan bahan pilihan segar dari petani lokal, bumbu rempah asli, dan standar kebersihan tertinggi.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="text-[11px] font-semibold bg-[#66734B]/30 border border-[#66734B]/50 px-2.5 py-1 rounded text-[#FFF8EF] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#66734B]" />
                100% Halal & Higienis
              </span>
            </div>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#FFF8EF] tracking-wide">
              Navigasi Menu
            </h4>
            <ul className="space-y-2 text-xs text-[#FFF8EF]/75">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#E97832] transition-colors"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('menu')}
                  className="hover:text-[#E97832] transition-colors"
                >
                  Katalog Makanan & Minuman
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('promo')}
                  className="hover:text-[#E97832] transition-colors"
                >
                  Paket Hemat & Promo Bundling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tentang')}
                  className="hover:text-[#E97832] transition-colors"
                >
                  Cerita & Filosofi Kami
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('kontak')}
                  className="hover:text-[#E97832] transition-colors"
                >
                  Lokasi Resto & Kontak
                </button>
              </li>
              <li className="pt-1">
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="text-[#E97832] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>⚙️ Panel Pengelola Toko (Admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Jam Operasional & Layanan */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#FFF8EF] tracking-wide">
              Jam Operasional
            </h4>
            <div className="space-y-2.5 text-xs text-[#FFF8EF]/75">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#E97832] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#FFF8EF]">Layanan Dapur</p>
                  <p>{storeSettings.openingHours}</p>
                  <p className="text-[11px] text-[#FFF8EF]/50">Pemesanan online melayani setiap hari</p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-xs text-[#FFF8EF] font-medium mb-1">Area Pengiriman Utama:</p>
                <p className="text-[11px] text-[#FFF8EF]/65 leading-relaxed">
                  Jakarta Selatan, Jakarta Pusat, Jakarta Barat, Tangerang Selatan (Grab / GoSend / ShopeeFood)
                </p>
              </div>
            </div>
          </div>

          {/* Col 4: Kontak & Alamat */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-[#FFF8EF] tracking-wide">
              Hubungi Kami
            </h4>
            <ul className="space-y-2.5 text-xs text-[#FFF8EF]/75">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E97832] shrink-0 mt-0.5" />
                <span>{storeSettings.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#66734B] shrink-0" />
                <a
                  href={`https://wa.me/${storeSettings.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#E97832] transition-colors"
                >
                  +{storeSettings.whatsappNumber} (WhatsApp CS)
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E97832] shrink-0" />
                <span>{storeSettings.email}</span>
              </li>
              <li className="flex items-center gap-2 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full bg-white/10 hover:bg-[#E97832] text-[#FFF8EF] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <span className="text-xs text-[#FFF8EF]/70">@rasanusantara.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FFF8EF]/60 gap-4">
          <p>© 2026 RASA NUSANTARA. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-1 text-[#FFF8EF]/70">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-[#E97832] fill-[#E97832]" />
            <span>untuk pecinta kuliner nusantara sejati.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
