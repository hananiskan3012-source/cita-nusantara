/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { PromoPage } from './pages/PromoPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ToastContainer } from './components/Toast';
import { AdminPanel } from './components/AdminPanel';
import { Sparkles, X, MessageCircle, ShieldCheck } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab, storeSettings, setIsAdminOpen } = useCart();
  const [dismissAnnouncement, setDismissAnnouncement] = useState(false);

  const shouldShowAnnouncement = storeSettings.showAnnouncement && !dismissAnnouncement;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8EF] text-[#39271F] font-sans selection:bg-[#E97832] selection:text-white">
      {/* Dynamic Top Promotional Banner */}
      {shouldShowAnnouncement && (
        <div className="bg-[#39271F] text-[#FFF8EF] text-[11px] sm:text-xs py-2 px-4 flex items-center justify-between border-b border-[#39271F]/40 relative z-50">
          <div className="flex-1 text-center font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E97832]" />
            <span>{storeSettings.announcement}</span>
          </div>
          <button
            onClick={() => setDismissAnnouncement(true)}
            aria-label="Tutup pengumuman"
            className="text-[#FFF8EF]/60 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Page View */}
      <main className="flex-1">
        {activeTab === 'home' && <HomePage />}
        {activeTab === 'menu' && <MenuPage />}
        {activeTab === 'promo' && <PromoPage />}
        {activeTab === 'tentang' && <AboutPage />}
        {activeTab === 'kontak' && <ContactPage />}
      </main>

      {/* Global Modals, Drawers & Admin Panel */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmationModal />
      <ToastContainer />
      <AdminPanel />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5">
        <a
          href={`https://wa.me/${storeSettings.whatsappNumber}?text=Halo%20RASA%20NUSANTARA,%20saya%20ingin%20bertanya%20seputar%20menu`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat WhatsApp RASA NUSANTARA"
          className="bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 group"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-1">
            Chat Resto
          </span>
        </a>

        {/* Quick Admin Access Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="bg-[#39271F] hover:bg-[#2a1b14] text-[#FFF8EF] border border-[#F2E5D7] px-3.5 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-1.5 text-xs font-semibold"
          title="Buka Panel Admin & Manajemen Toko"
        >
          <ShieldCheck className="w-4 h-4 text-[#E97832]" />
          <span className="hidden md:inline">Panel Pengelola</span>
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
