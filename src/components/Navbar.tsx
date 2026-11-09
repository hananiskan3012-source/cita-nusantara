import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Heart, Menu, X, PhoneCall } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    totalItems,
    wishlist,
    setIsCartOpen,
    setIsAdminOpen,
  } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Beranda' },
    { id: 'menu', label: 'Menu' },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left font-serif text-2xl font-bold tracking-tight text-[#39271F] hover:text-[#E97832] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E97832]" />
            <span>RASA NUSANTARA</span>
          </button>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#39271F]/80">
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

          {/* Zone 3: 1 primary action group */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Admin Panel Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              aria-label="Panel Admin"
              title="Panel Admin Toko"
              className="p-2 text-[#39271F]/70 hover:text-[#E97832] transition-colors rounded-lg hover:bg-[#F2E5D7]/50"
            >
              <span className="text-[11px] font-bold border border-[#39271F]/30 px-1.5 py-0.5 rounded uppercase tracking-wider">
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
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#E97832] hover:bg-[#D66723] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              Pesan Sekarang
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="md:hidden p-2 text-[#39271F] hover:text-[#E97832] transition-colors rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#F2E5D7] bg-[#FFF8EF] px-5 py-4 space-y-2 shadow-lg animate-fadeIn">
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
