import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, Menu, X, PhoneCall, Truck, User } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    totalItems,
    wishlist,
    setIsCartOpen,
    setIsAdminOpen,
    setIsShippingCalcOpen,
    currentUser,
    setIsProfileModalOpen,
  } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'menu', label: 'Menu Nusantara & Modern' },
    { id: 'promo', label: 'Promo' },
    { id: 'tentang', label: 'Tentang' },
    { id: 'kontak', label: 'Kontak' },
  ] as const;

  const handleNavClick = (tabId: typeof navLinks[number]['id']) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFF8EF]/95 backdrop-blur-md border-b border-[#F2E5D7] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Man City x Red Bull Inspired Hybrid Brand Emblem & Wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left transition-transform hover:scale-[1.02] shrink-0"
            title="RASA NUSANTARA - City & Bull Spirit"
          >
            <BrandLogo size="md" />
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#39271F]/80">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  activeTab === link.id
                    ? 'text-[#E97832] font-semibold'
                    : 'hover:text-[#39271F]'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E97832] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions Group */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* User Profile Button */}
            <button
              onClick={() => setIsProfileModalOpen(true)}
              title={`Akun: ${currentUser.name} (${currentUser.tier}) - Klik untuk ganti akun / edit profil`}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[#6CABDD]/40 bg-white hover:border-[#E97832] hover:bg-sky-50/50 shadow-xs transition-all group"
            >
              <div className="relative w-7 h-7 rounded-lg overflow-hidden ring-1 ring-[#6CABDD] shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-xs font-bold text-[#39271F] group-hover:text-[#E97832] truncate max-w-[90px]">
                  {currentUser.name.split(' ')[0]}
                </span>
                <span className="text-[9px] font-semibold text-[#6CABDD]">
                  {currentUser.points.toLocaleString('id-ID')} Poin
                </span>
              </div>
            </button>

            {/* Shipping Calculator Button */}
            <button
              onClick={() => setIsShippingCalcOpen(true)}
              title="Kalkulator Ongkos Kirim (1 KM = Rp 5.000)"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#F2E5D7] bg-[#FFF8EF] hover:bg-[#F2E5D7] text-[#39271F] text-xs font-semibold transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-[#E97832]" />
              <span className="hidden md:inline">Ongkir 5rb/km</span>
            </button>

            {/* Admin Panel Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              aria-label="Panel Admin"
              title="Panel Admin Toko"
              className="p-2 text-[#39271F]/70 hover:text-[#E97832] transition-colors rounded-lg hover:bg-[#F2E5D7]/50"
            >
              <span className="text-[10px] font-bold border border-[#39271F]/30 px-1.5 py-0.5 rounded uppercase tracking-wider">
                Admin
              </span>
            </button>

            {/* Wishlist button */}
            <button
              onClick={() => handleNavClick('menu')}
              aria-label="Menu Favorit"
              title="Menu Favorit"
              className="relative p-2 text-[#39271F]/80 hover:text-[#E97832] transition-colors rounded-lg hover:bg-[#F2E5D7]/50"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#E97832] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Keranjang Belanja"
              className="relative p-2 text-[#39271F] hover:text-[#E97832] transition-colors rounded-lg hover:bg-[#F2E5D7]/50 flex items-center gap-1.5"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="bg-[#E97832] text-white text-xs font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => handleNavClick('menu')}
              className="hidden xl:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#E97832] hover:bg-[#D66723] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              Pesan Sekarang
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden p-2 text-[#39271F] hover:text-[#E97832] transition-colors rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#F2E5D7] bg-[#FFF8EF] px-5 py-4 space-y-2 shadow-lg animate-fadeIn">
            {/* Active User Quick Card */}
            <button
              onClick={() => {
                setIsProfileModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#001838] via-[#1C2C5E] to-[#6CABDD] text-white mb-2 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-9 h-9 rounded-lg object-cover ring-2 ring-white/70"
                />
                <div className="text-left">
                  <div className="text-xs font-bold leading-tight">{currentUser.name}</div>
                  <div className="text-[10px] text-sky-200">{currentUser.tier} • {currentUser.points.toLocaleString('id-ID')} Poin</div>
                </div>
              </div>
              <span className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-lg">
                Ganti Profil →
              </span>
            </button>

            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#F2E5D7] text-[#E97832] font-semibold'
                    : 'text-[#39271F] hover:bg-[#F2E5D7]/40'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#F2E5D7] flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsShippingCalcOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-center text-xs font-bold text-[#39271F] bg-white border border-[#F2E5D7] rounded-lg"
              >
                <Truck className="w-4 h-4 text-[#E97832]" />
                Hitung Ongkir (1 KM = Rp 5.000)
              </button>
              <button
                onClick={() => {
                  handleNavClick('menu');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#E97832] hover:bg-[#D66723] rounded-lg shadow-sm"
              >
                Pesan Sekarang
              </button>
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-bold text-[#FFF8EF] bg-[#39271F] rounded-lg shadow-sm"
              >
                Buka Panel Admin Toko
              </button>
              <a
                href="https://wa.me/6281234567890?text=Halo%20Rasa%20Nusantara,%20saya%20ingin%20bertanya%20menu"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 px-4 text-center text-xs font-medium text-[#39271F] bg-[#F2E5D7] rounded-lg"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#66734B]" />
                WhatsApp Hotline
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
