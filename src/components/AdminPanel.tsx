import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product, PromoCode, OrderStatus, CategoryType, Testimonial } from '../types';
import {
  LayoutDashboard,
  UtensilsCrossed,
  PackageOpen,
  Tag,
  MessageSquareQuote,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Lock,
  LogOut,
  Save,
  RotateCcw,
  ExternalLink,
  Search,
  MessageCircle,
  Eye,
  Check,
  Flame,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleProductAvailability,
    promos,
    addPromo,
    deletePromo,
    togglePromoActive,
    orders,
    updateOrderStatus,
    deleteOrder,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    storeSettings,
    updateStoreSettings,
    resetToDefaultData,
    showToast,
  } = useCart();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders' | 'promos' | 'testimonials' | 'settings'>('overview');
  const [pinInput, setPinInput] = useState('');

  // Product edit/create modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState<{
    name: string;
    category: CategoryType;
    price: number;
    originalPrice: string;
    badge: '' | 'Bestseller' | 'Favorit' | 'Baru' | 'Hemat';
    description: string;
    story: string;
    ingredientsText: string;
    portion: string;
    spiceLevel: 0 | 1 | 2 | 3;
    image: string;
    prepTime: string;
  }>({
    name: '',
    category: 'makanan-utama',
    price: 35000,
    originalPrice: '',
    badge: '',
    description: '',
    story: '',
    ingredientsText: '',
    portion: '1 Porsi Lengkap',
    spiceLevel: 1,
    image: '/src/assets/images/food_ayam_sambal_matah_1793604100905.jpg',
    prepTime: '10-15 Menit',
  });

  // Promo form state
  const [promoForm, setPromoForm] = useState<{
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minSpend: number;
    description: string;
    validUntil: string;
  }>({
    code: '',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 50000,
    description: '',
    validUntil: 'Berlaku s/d Akhir Pekan',
  });

  // Testimonial form state
  const [testiForm, setTestiForm] = useState<{
    name: string;
    role: string;
    comment: string;
    rating: number;
    favoriteMenu: string;
  }>({
    name: '',
    role: '',
    comment: '',
    rating: 5,
    favoriteMenu: '',
  });

  // Store settings local state
  const [localSettings, setLocalSettings] = useState(storeSettings);

  // Filters
  const [productSearch, setProductSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');

  if (!isAdminOpen) return null;

  const formatRupiah = (num: number) => {
    return 'Rp ' + (num || 0).toLocaleString('id-ID');
  };

  // Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-md bg-[#FFF8EF] rounded-3xl shadow-2xl border border-[#F2E5D7] p-8 text-center">
          <div className="w-14 h-14 bg-[#39271F] text-[#E97832] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#39271F]">
            Panel Pengelola Toko
          </h2>
          <p className="text-xs text-stone-600 mt-1 mb-6">
            RASA NUSANTARA Management Dashboard. Masukkan PIN keamanan untuk mengakses data menu, pesanan, dan konfigurasi.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginAdmin(pinInput);
            }}
            className="space-y-4"
          >
            <div>
              <input
                type="password"
                placeholder="Masukkan PIN Admin (Default: admin123)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                autoFocus
                className="w-full text-center text-sm tracking-widest px-4 py-3 rounded-xl border border-[#F2E5D7] bg-white font-mono focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98"
            >
              Masuk ke Panel Pengelola
            </button>

            <button
              type="button"
              onClick={() => loginAdmin('admin123')}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium rounded-xl transition-colors"
            >
              Masuk Cepat Demo (PIN: admin123)
            </button>
          </form>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="mt-6 text-xs text-stone-400 hover:text-stone-600"
          >
            ← Kembali ke Tampilan Pengunjung
          </button>
        </div>
      </div>
    );
  }

  // Handle open Product Form
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'makanan-utama',
      price: 35000,
      originalPrice: '',
      badge: '',
      description: '',
      story: '',
      ingredientsText: 'Ayam segar pilihan, Bawang merah, Cabai rawit, Bumbu rempah',
      portion: '1 Porsi Lengkap',
      spiceLevel: 1,
      image: '/src/assets/images/food_ayam_sambal_matah_1793604100905.jpg',
      prepTime: '10-15 Menit',
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice ? prod.originalPrice.toString() : '',
      badge: prod.badge || '',
      description: prod.description,
      story: prod.story || '',
      ingredientsText: prod.ingredients.join(', '),
      portion: prod.portion,
      spiceLevel: prod.spiceLevel,
      image: prod.image,
      prepTime: prod.prepTime,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name.trim()) {
      showToast('Nama menu wajib diisi.', 'warning');
      return;
    }

    const ingredients = productForm.ingredientsText
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);

    const productPayload = {
      name: productForm.name.trim(),
      category: productForm.category,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      badge: productForm.badge || undefined,
      description: productForm.description.trim(),
      story: productForm.story.trim(),
      ingredients: ingredients.length > 0 ? ingredients : ['Bahan alami pilihan'],
      portion: productForm.portion,
      spiceLevel: productForm.spiceLevel,
      image: productForm.image,
      prepTime: productForm.prepTime,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 0,
      isAvailable: editingProduct?.isAvailable !== false,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  // Handle Add Promo
  const handleSavePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoForm.code.trim()) {
      showToast('Kode kupon wajib diisi.', 'warning');
      return;
    }
    addPromo({
      code: promoForm.code.trim().toUpperCase(),
      discountType: promoForm.discountType,
      discountValue: Number(promoForm.discountValue),
      minSpend: Number(promoForm.minSpend),
      description: promoForm.description || `Diskon spesial kode ${promoForm.code}`,
      validUntil: promoForm.validUntil,
      isActive: true,
    });
    setPromoForm({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minSpend: 50000,
      description: '',
      validUntil: 'Berlaku s/d Akhir Pekan',
    });
  };

  // Handle Add Testimonial
  const handleSaveTesti = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testiForm.name || !testiForm.comment) {
      showToast('Nama dan isi ulasan wajib diisi.', 'warning');
      return;
    }
    const initials = testiForm.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    addTestimonial({
      name: testiForm.name,
      role: testiForm.role || 'Pelanggan RASA NUSANTARA',
      comment: testiForm.comment,
      rating: testiForm.rating,
      avatar: initials || 'RN',
      favoriteMenu: testiForm.favoriteMenu || 'Nasi Ayam Sambal Matah',
    });

    setTestiForm({
      name: '',
      role: '',
      comment: '',
      rating: 5,
      favoriteMenu: '',
    });
  };

  // Calculations for Overview Tab
  const totalRevenue = orders
    .filter((o) => o.status !== 'dibatalkan')
    .reduce((acc, o) => acc + o.total, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'menunggu').length;
  const cookingOrdersCount = orders.filter((o) => o.status === 'diproses').length;
  const deliveringOrdersCount = orders.filter((o) => o.status === 'diantar').length;
  const completedOrdersCount = orders.filter((o) => o.status === 'selesai').length;

  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'all') return true;
    return o.status === orderStatusFilter;
  });

  const filteredAdminProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    return (
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FFF8EF] overflow-hidden animate-fadeIn">
      {/* Top Admin Bar */}
      <header className="h-16 bg-[#39271F] text-[#FFF8EF] px-4 sm:px-6 flex items-center justify-between border-b border-stone-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E97832] text-white flex items-center justify-center font-bold text-xs">
            RN
          </div>
          <div>
            <h1 className="font-serif text-base sm:text-lg font-bold leading-none text-[#FFF8EF]">
              Panel Admin RASA NUSANTARA
            </h1>
            <p className="text-[10px] text-[#FFF8EF]/60 mt-0.5">
              Manajemen Menu, Pesanan, Promo, dan Konten Toko
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#FFF8EF] text-xs font-semibold transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#E97832]" />
            <span className="hidden sm:inline">Lihat Toko (Tampilan Pengunjung)</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="p-1.5 text-red-300 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
            title="Keluar Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-r border-[#F2E5D7] flex flex-row md:flex-col justify-between shrink-0 overflow-x-auto md:overflow-y-auto p-3 md:p-4 gap-1">
          <div className="flex md:flex-col gap-1 w-full">
            <button
              onClick={() => setActiveAdminTab('overview')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                activeAdminTab === 'overview'
                  ? 'bg-[#E97832] text-white shadow-sm'
                  : 'text-[#39271F] hover:bg-[#FFF8EF]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              <span>Ringkasan Bisnis</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('products')}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                activeAdminTab === 'products'
                  ? 'bg-[#E97832] text-white shadow-sm'
                  : 'text-[#39271F] hover:bg-[#FFF8EF]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4 shrink-0" />
                <span>Katalog Menu</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${activeAdminTab === 'products' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'}`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveAdminTab('orders')}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                activeAdminTab === 'orders'
                  ? 'bg-[#E97832] text-white shadow-sm'
                  : 'text-[#39271F] hover:bg-[#FFF8EF]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PackageOpen className="w-4 h-4 shrink-0" />
                <span>Pesanan Masuk</span>
              </div>
              {pendingOrdersCount > 0 ? (
                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.2 rounded-full tabular-nums font-bold animate-pulse">
                  {pendingOrdersCount} Baru
                </span>
              ) : (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${activeAdminTab === 'orders' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'}`}>
                  {orders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveAdminTab('promos')}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                activeAdminTab === 'promos'
                  ? 'bg-[#E97832] text-white shadow-sm'
                  : 'text-[#39271F] hover:bg-[#FFF8EF]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 shrink-0" />
                <span>Kupon & Diskon</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${activeAdminTab === 'promos' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'}`}>
                {promos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveAdminTab('testimonials')}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                activeAdminTab === 'testimonials'
                  ? 'bg-[#E97832] text-white shadow-sm'
                  : 'text-[#39271F] hover:bg-[#FFF8EF]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquareQuote className="w-4 h-4 shrink-0" />
                <span>Ulasan Pelanggan</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${activeAdminTab === 'testimonials' ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'}`}>
                {testimonials.length}
              </span>
            </button>

            <button
              onClick={() => setActiveAdminTab('settings')}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap text-left ${
                activeAdminTab === 'settings'
                  ? 'bg-[#E97832] text-white shadow-sm'
                  : 'text-[#39271F] hover:bg-[#FFF8EF]'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Pengaturan Toko</span>
            </button>
          </div>

          {/* Quick Factory Reset */}
          <div className="hidden md:block pt-4 border-t border-stone-200">
            <button
              onClick={() => {
                if (window.confirm('Kembalikan semua data ke setelan demo awal?')) {
                  resetToDefaultData();
                }
              }}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-stone-200 text-stone-500 hover:text-stone-700 hover:bg-stone-50 text-[11px] font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Demo</span>
            </button>
          </div>
        </aside>

        {/* Tab Content Canvas */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* 1. OVERVIEW TAB */}
          {activeAdminTab === 'overview' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#39271F]">
                  Ringkasan Kinerja RASA NUSANTARA
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Statistik penjualan, status pesanan real-time, dan aktivitas operasional dapur.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#F2E5D7] shadow-sm">
                  <span className="text-xs text-stone-500 font-medium block mb-1">
                    Total Omset Masuk
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#39271F] font-mono tabular-nums">
                    {formatRupiah(totalRevenue)}
                  </div>
                  <span className="text-[10px] text-[#66734B] font-semibold mt-1 block">
                    ✓ Dari {orders.length} transaksi pemesanan
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#F2E5D7] shadow-sm">
                  <span className="text-xs text-stone-500 font-medium block mb-1">
                    Pesanan Menunggu
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#E97832] font-mono tabular-nums">
                    {pendingOrdersCount}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    Perlu konfirmasi segera
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#F2E5D7] shadow-sm">
                  <span className="text-xs text-stone-500 font-medium block mb-1">
                    Sedang Dimasak / Diantar
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#39271F] font-mono tabular-nums">
                    {cookingOrdersCount + deliveringOrdersCount}
                  </div>
                  <span className="text-[10px] text-[#E97832] font-semibold mt-1 block">
                    {cookingOrdersCount} di dapur, {deliveringOrdersCount} di jalan
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#F2E5D7] shadow-sm">
                  <span className="text-xs text-stone-500 font-medium block mb-1">
                    Total Menu Aktif
                  </span>
                  <div className="font-serif text-2xl font-bold text-[#39271F] font-mono tabular-nums">
                    {products.filter((p) => p.isAvailable !== false).length}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 block">
                    dari {products.length} menu di katalog
                  </span>
                </div>
              </div>

              {/* Recent Orders Spotlight */}
              <div className="bg-white rounded-2xl border border-[#F2E5D7] p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-bold text-[#39271F]">
                    Pesanan Masuk Terbaru
                  </h3>
                  <button
                    onClick={() => setActiveAdminTab('orders')}
                    className="text-xs font-semibold text-[#E97832] hover:underline"
                  >
                    Kelola Semua Pesanan →
                  </button>
                </div>

                {orders.length === 0 ? (
                  <p className="text-xs text-stone-500 py-4 text-center">Belum ada pesanan masuk.</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((ord) => (
                      <div
                        key={ord.orderId}
                        className="p-3.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-[#E97832]">
                              #{ord.orderId}
                            </span>
                            <span className="text-xs font-bold text-[#39271F]">
                              {ord.customerName}
                            </span>
                            <span className="text-[10px] text-stone-400 font-mono">
                              ({ord.timestamp})
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 mt-1">
                            {ord.items.map((it) => `${it.product.name} (${it.quantity}x)`).join(', ')}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold font-mono text-[#39271F]">
                            {formatRupiah(ord.total)}
                          </span>

                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.orderId, e.target.value as OrderStatus)}
                            className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                              ord.status === 'menunggu'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : ord.status === 'diproses'
                                ? 'bg-blue-50 text-blue-800 border-blue-300'
                                : ord.status === 'diantar'
                                ? 'bg-purple-50 text-purple-800 border-purple-300'
                                : ord.status === 'selesai'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-red-50 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="menunggu">🟡 Menunggu</option>
                            <option value="diproses">🔵 Diproses</option>
                            <option value="diantar">🟣 Diantar</option>
                            <option value="selesai">🟢 Selesai</option>
                            <option value="dibatalkan">🔴 Dibatalkan</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. PRODUCTS TAB */}
          {activeAdminTab === 'products' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#39271F]">
                    Kelola Katalog Menu
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Tambah menu baru, perbarui harga, resep bahan, atau atur status stok habis.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddProduct}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-bold rounded-xl shadow transition-all active:scale-95 shrink-0 self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Menu Baru</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari nama menu atau kategori..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none focus:ring-2 focus:ring-[#E97832]/30"
                />
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-[#F2E5D7] shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FFF8EF] border-b border-[#F2E5D7] text-stone-600 font-semibold uppercase text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Menu</th>
                        <th className="py-3 px-4">Kategori</th>
                        <th className="py-3 px-4">Harga Satuan</th>
                        <th className="py-3 px-4">Status Stok</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2E5D7]">
                      {filteredAdminProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={prod.image}
                                alt={prod.name}
                                className="w-12 h-12 rounded-lg object-cover bg-stone-100 shrink-0"
                              />
                              <div>
                                <h4 className="font-bold text-[#39271F] line-clamp-1">{prod.name}</h4>
                                <p className="text-[10px] text-stone-400 font-mono">
                                  Rating: {prod.rating}★ ({prod.reviewCount} ulasan)
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="capitalize text-stone-600 font-medium">
                              {prod.category.replace('-', ' ')}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-mono font-bold text-[#39271F]">
                              {formatRupiah(prod.price)}
                            </div>
                            {prod.originalPrice && (
                              <div className="font-mono text-[10px] text-stone-400 line-through">
                                {formatRupiah(prod.originalPrice)}
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4">
                            <button
                              onClick={() => toggleProductAvailability(prod.id)}
                              className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors ${
                                prod.isAvailable !== false
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-red-50 text-red-800 border-red-300'
                              }`}
                            >
                              {prod.isAvailable !== false ? '● Tersedia' : '○ Habis'}
                            </button>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditProduct(prod)}
                                className="p-1.5 text-stone-600 hover:text-[#E97832] rounded-lg hover:bg-stone-100"
                                title="Edit Menu"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Hapus menu "${prod.name}" dari katalog?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1.5 text-stone-400 hover:text-red-500 rounded-lg hover:bg-stone-100"
                                title="Hapus Menu"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. ORDERS TAB */}
          {activeAdminTab === 'orders' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#39271F]">
                  Daftar Pesanan Masuk
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Pantau tiket order pelanggan, ubah tahapan masak dan pengiriman, serta hubungi WhatsApp pemesan.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[
                  { id: 'all', label: `Semua (${orders.length})` },
                  { id: 'menunggu', label: `🟡 Menunggu (${pendingOrdersCount})` },
                  { id: 'diproses', label: `🔵 Diproses (${cookingOrdersCount})` },
                  { id: 'diantar', label: `🟣 Diantar (${deliveringOrdersCount})` },
                  { id: 'selesai', label: `🟢 Selesai (${completedOrdersCount})` },
                  { id: 'dibatalkan', label: '🔴 Dibatalkan' },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderStatusFilter(st.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      orderStatusFilter === st.id
                        ? 'bg-[#39271F] text-white shadow-sm'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-[#F2E5D7]'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#F2E5D7] p-8 text-center text-xs text-stone-500">
                    Tidak ada pesanan pada status ini.
                  </div>
                ) : (
                  filteredOrders.map((ord) => (
                    <div
                      key={ord.orderId}
                      className="bg-white rounded-2xl border border-[#F2E5D7] p-5 shadow-sm space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F2E5D7] gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-sm text-[#E97832] bg-[#FFF8EF] border border-[#F2E5D7] px-2.5 py-1 rounded-lg">
                            #{ord.orderId}
                          </span>
                          <span className="text-xs text-stone-500">{ord.timestamp}</span>
                        </div>

                        {/* Status Select */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-stone-500">Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => updateOrderStatus(ord.orderId, e.target.value as OrderStatus)}
                            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-stone-200 bg-[#FFF8EF] text-[#39271F] focus:outline-none"
                          >
                            <option value="menunggu">🟡 Menunggu Konfirmasi</option>
                            <option value="diproses">🔵 Sedang Dimasak</option>
                            <option value="diantar">🟣 Sedang Diantar Kurir</option>
                            <option value="selesai">🟢 Pesanan Selesai</option>
                            <option value="dibatalkan">🔴 Dibatalkan</option>
                          </select>
                        </div>
                      </div>

                      {/* Customer & Address Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <strong className="block text-[#39271F]">Pemesan:</strong>
                          <p className="font-semibold">{ord.customerName}</p>
                          <p className="text-stone-500 font-mono flex items-center gap-2">
                            <span>{ord.phoneNumber}</span>
                            <a
                              href={`https://wa.me/${ord.phoneNumber.replace(/[^0-9]/g, '')}?text=Halo%20kak%20${encodeURIComponent(ord.customerName)},%20kami%20dari%20RASA%20NUSANTARA%20ingin%20mengonfirmasi%20pesanan%20%23${ord.orderId}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#66734B] hover:underline flex items-center gap-0.5 font-bold"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Hubungi WA</span>
                            </a>
                          </p>
                          <p className="text-stone-600 mt-1">
                            <span className="text-stone-400">Pengiriman:</span> {ord.deliveryMethod.toUpperCase()} ·{' '}
                            <span className="text-stone-400">Bayar:</span> {ord.paymentMethod.toUpperCase()}
                          </p>
                        </div>

                        <div className="space-y-1">
                          <strong className="block text-[#39271F]">Alamat Pengantaran:</strong>
                          <p className="text-stone-700 leading-snug">{ord.address}</p>
                          {ord.notes && (
                            <p className="text-stone-500 italic mt-1">
                              Catatan Dapur: "{ord.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Items table & Total */}
                      <div className="bg-[#FFF8EF] rounded-xl p-3 border border-[#F2E5D7] space-y-1.5 text-xs">
                        <div className="font-semibold text-stone-600 pb-1 border-b border-[#F2E5D7] flex justify-between">
                          <span>Rincian Menu</span>
                          <span>Subtotal</span>
                        </div>
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between items-center text-stone-700">
                            <div>
                              <span>{it.product.name}</span>
                              <span className="text-stone-400 font-mono ml-2">x{it.quantity}</span>
                              {it.selectedSpice && (
                                <span className="text-[10px] text-[#E97832] ml-2">({it.selectedSpice})</span>
                              )}
                            </div>
                            <span className="font-mono">{formatRupiah(it.product.price * it.quantity)}</span>
                          </div>
                        ))}

                        <div className="pt-2 border-t border-[#F2E5D7] flex justify-between items-center text-sm font-bold text-[#39271F]">
                          <div>
                            <span>Total Tagihan: </span>
                            <span className="text-[#E97832] font-mono">{formatRupiah(ord.total)}</span>
                            {ord.voucherCode && (
                              <span className="text-[10px] font-normal text-[#66734B] ml-2">
                                (Kupon: {ord.voucherCode})
                              </span>
                            )}
                          </div>

                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus pesanan #${ord.orderId}?`)) {
                                deleteOrder(ord.orderId);
                              }
                            }}
                            className="text-xs text-red-500 hover:underline font-normal"
                          >
                            Hapus Pesanan
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* 4. PROMOS TAB */}
          {activeAdminTab === 'promos' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#39271F]">
                  Kelola Kupon & Diskon
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Buat kode promo baru untuk menarik lebih banyak pembeli atau nonaktifkan kupon sementara.
                </p>
              </div>

              {/* Form Tambah Kupon */}
              <div className="bg-white rounded-2xl border border-[#F2E5D7] p-5 shadow-sm space-y-4">
                <h3 className="font-serif text-base font-bold text-[#39271F] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#E97832]" />
                  <span>Buat Kupon Diskon Baru</span>
                </h3>

                <form onSubmit={handleSavePromo} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Kode Kupon *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: GAJIAN20"
                      value={promoForm.code}
                      onChange={(e) => setPromoForm({ ...promoForm, code: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] uppercase font-mono bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Tipe Diskon</label>
                    <select
                      value={promoForm.discountType}
                      onChange={(e) => setPromoForm({ ...promoForm, discountType: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    >
                      <option value="percentage">Persentase (%)</option>
                      <option value="fixed">Nominal Tetap (Rp)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nilai Diskon *</label>
                    <input
                      type="number"
                      required
                      placeholder="Contoh: 15 (untuk 15%) atau 10000"
                      value={promoForm.discountValue}
                      onChange={(e) => setPromoForm({ ...promoForm, discountValue: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] font-mono bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Min. Belanja (Rp)</label>
                    <input
                      type="number"
                      value={promoForm.minSpend}
                      onChange={(e) => setPromoForm({ ...promoForm, minSpend: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] font-mono bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Masa Berlaku Label</label>
                    <input
                      type="text"
                      placeholder="Contoh: Berlaku s/d Akhir Bulan"
                      value={promoForm.validUntil}
                      onChange={(e) => setPromoForm({ ...promoForm, validUntil: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#E97832] hover:bg-[#D66723] text-white font-bold rounded-xl shadow transition-all active:scale-95"
                    >
                      Simpan & Aktifkan Kupon
                    </button>
                  </div>
                </form>
              </div>

              {/* Daftar Kupon Aktif */}
              <div className="bg-white rounded-2xl border border-[#F2E5D7] shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FFF8EF] border-b border-[#F2E5D7] text-stone-600 font-semibold uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Kode Kupon</th>
                      <th className="py-3 px-4">Potongan</th>
                      <th className="py-3 px-4">Min. Belanja</th>
                      <th className="py-3 px-4">Masa Berlaku</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2E5D7]">
                    {promos.map((p) => (
                      <tr key={p.code} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-mono font-bold text-[#E97832]">{p.code}</td>
                        <td className="py-3 px-4 font-semibold">
                          {p.discountType === 'percentage' ? `${p.discountValue}%` : formatRupiah(p.discountValue)}
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-600">{formatRupiah(p.minSpend)}</td>
                        <td className="py-3 px-4 text-stone-500">{p.validUntil}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => togglePromoActive(p.code)}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                              p.isActive !== false
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : 'bg-stone-100 text-stone-500 border-stone-200'
                            }`}
                          >
                            {p.isActive !== false ? 'Aktif' : 'Nonaktif'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Hapus kupon "${p.code}"?`)) {
                                deletePromo(p.code);
                              }
                            }}
                            className="p-1 text-stone-400 hover:text-red-500"
                            title="Hapus Kupon"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. TESTIMONIALS TAB */}
          {activeAdminTab === 'testimonials' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#39271F]">
                  Kelola Ulasan Pelanggan
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Tambahkan atau sesuaikan testimoni yang tampil di halaman beranda toko.
                </p>
              </div>

              {/* Form Tambah Testimoni */}
              <div className="bg-white rounded-2xl border border-[#F2E5D7] p-5 shadow-sm space-y-4">
                <h3 className="font-serif text-base font-bold text-[#39271F] flex items-center gap-2">
                  <Plus className="w-4 h-4 text-[#E97832]" />
                  <span>Tambah Ulasan Baru</span>
                </h3>

                <form onSubmit={handleSaveTesti} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nama Pelanggan *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Anggara"
                      value={testiForm.name}
                      onChange={(e) => setTestiForm({ ...testiForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Peran / Wilayah</label>
                    <input
                      type="text"
                      placeholder="Contoh: Karyawan Swasta, Jakarta"
                      value={testiForm.role}
                      onChange={(e) => setTestiForm({ ...testiForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Menu Favorit</label>
                    <input
                      type="text"
                      placeholder="Contoh: Nasi Ayam Sambal Matah"
                      value={testiForm.favoriteMenu}
                      onChange={(e) => setTestiForm({ ...testiForm, favoriteMenu: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block font-semibold text-stone-700 mb-1">Isi Ulasan / Testimoni *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Komentar pelanggan..."
                      value={testiForm.comment}
                      onChange={(e) => setTestiForm({ ...testiForm, comment: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-3 flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#E97832] hover:bg-[#D66723] text-white font-bold rounded-xl shadow transition-all"
                    >
                      Tambahkan Ulasan
                    </button>
                  </div>
                </form>
              </div>

              {/* Daftar Testimoni */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="bg-white p-4 rounded-2xl border border-[#F2E5D7] shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-[#39271F]">{t.name}</span>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus ulasan dari ${t.name}?`)) {
                              deleteTestimonial(t.id);
                            }
                          }}
                          className="text-stone-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-stone-600 italic">"{t.comment}"</p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-[#F2E5D7] text-[10px] text-[#66734B] font-semibold">
                      Menu: {t.favoriteMenu}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. SETTINGS TAB */}
          {activeAdminTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#39271F]">
                  Pengaturan Profil Toko & Website
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Sesuaikan teks pengumuman atas, informasi kontak WhatsApp, jam operasional, dan ambang batas gratis ongkir.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#F2E5D7] p-6 shadow-sm space-y-5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nama Brand / Toko</label>
                    <input
                      type="text"
                      value={localSettings.storeName}
                      onChange={(e) => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Tagline Brand</label>
                    <input
                      type="text"
                      value={localSettings.tagline}
                      onChange={(e) => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Teks Pengumuman Banner Atas (Header Announcement)
                  </label>
                  <input
                    type="text"
                    value={localSettings.announcement}
                    onChange={(e) => setLocalSettings({ ...localSettings, announcement: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                  />
                  <label className="mt-2 flex items-center gap-2 cursor-pointer text-stone-600">
                    <input
                      type="checkbox"
                      checked={localSettings.showAnnouncement}
                      onChange={(e) => setLocalSettings({ ...localSettings, showAnnouncement: e.target.checked })}
                      className="rounded text-[#E97832] focus:ring-[#E97832]"
                    />
                    <span>Tampilkan banner pengumuman ini di bagian paling atas situs</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nomor WhatsApp CS (Tanpa simbol +)</label>
                    <input
                      type="text"
                      value={localSettings.whatsappNumber}
                      onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] font-mono bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Email Layanan</label>
                    <input
                      type="email"
                      value={localSettings.email}
                      onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Alamat Fisik Resto & Dapur</label>
                  <input
                    type="text"
                    value={localSettings.address}
                    onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Jam Operasional</label>
                    <input
                      type="text"
                      value={localSettings.openingHours}
                      onChange={(e) => setLocalSettings({ ...localSettings, openingHours: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Ambang Gratis Ongkir (Rp)</label>
                    <input
                      type="number"
                      value={localSettings.freeShippingThreshold}
                      onChange={(e) => setLocalSettings({ ...localSettings, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] font-mono bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Biaya Kirim Standar (Rp)</label>
                    <input
                      type="number"
                      value={localSettings.standardDeliveryFee}
                      onChange={(e) => setLocalSettings({ ...localSettings, standardDeliveryFee: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] font-mono bg-[#FFF8EF] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#F2E5D7] flex justify-end">
                  <button
                    onClick={() => updateStoreSettings(localSettings)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#E97832] hover:bg-[#D66723] text-white font-bold rounded-xl shadow transition-all active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Semua Pengaturan</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#FFF8EF] rounded-3xl shadow-2xl border border-[#F2E5D7] overflow-hidden my-8 p-6 max-h-[92vh] flex flex-col">
            <h3 className="font-serif text-xl font-bold text-[#39271F] mb-4">
              {editingProduct ? 'Edit Menu Makanan' : 'Tambah Menu Baru ke Katalog'}
            </h3>

            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto space-y-4 text-xs pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Nama Menu *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bebek Goreng Sambal Ijo"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Kategori *</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as CategoryType })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none"
                  >
                    <option value="makanan-utama">Makanan Utama</option>
                    <option value="camilan">Camilan</option>
                    <option value="minuman">Minuman</option>
                    <option value="paket-hemat">Paket Hemat</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harga Jual (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] font-mono bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Harga Coret (Opsional)</label>
                  <input
                    type="number"
                    placeholder="Contoh: 40000"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] font-mono bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Label Badge</label>
                  <select
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none"
                  >
                    <option value="">Tanpa Badge</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Favorit">Favorit</option>
                    <option value="Baru">Baru</option>
                    <option value="Hemat">Hemat</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Pilihan Foto Menu Makanan & Minuman</label>
                <div className="grid grid-cols-4 gap-2 mb-2">
                  {[
                    { label: 'Sambal Matah', path: '/src/assets/images/food_ayam_sambal_matah_1793604100905.jpg' },
                    { label: 'Nasi Goreng', path: '/src/assets/images/food_nasi_goreng_spesial_1793604102106.jpg' },
                    { label: 'Geprek Mozarella', path: '/src/assets/images/food_ayam_geprek_mozarella_1793604103164.jpg' },
                    { label: 'Kopi Aren', path: '/src/assets/images/food_kopi_susu_aren_1793604103107.jpg' },
                    { label: 'Rice Bowl Teriyaki', path: '/src/assets/images/food_ricebowl_teriyaki_1793606006818.jpg' },
                    { label: 'Dimsum Siomay', path: '/src/assets/images/food_dimsum_siomay_1793606004592.jpg' },
                    { label: 'Pisang Cokelat', path: '/src/assets/images/food_pisang_cokelat_keju_1793606005851.jpg' },
                    { label: 'Es Teh Lemon', path: '/src/assets/images/food_es_teh_lemon_sereh_1793606006171.jpg' },
                  ].map((preset) => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, image: preset.path })}
                      className={`relative rounded-lg overflow-hidden border-2 p-0.5 transition-all ${
                        productForm.image === preset.path ? 'border-[#E97832] ring-2 ring-[#E97832]/30' : 'border-transparent hover:border-stone-300'
                      }`}
                    >
                      <img src={preset.path} alt={preset.label} className="w-full h-12 object-cover rounded" />
                      <span className="block text-[9px] text-center mt-0.5 truncate text-[#39271F] font-medium">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Deskripsi Singkat *</label>
                <textarea
                  required
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Deskripsi kelezatan yang menggugah selera..."
                  className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Cerita Resep / Keunikan Dapur</label>
                <textarea
                  rows={2}
                  value={productForm.story}
                  onChange={(e) => setProductForm({ ...productForm, story: e.target.value })}
                  placeholder="Filosofi bumbu rahasia atau keunikan..."
                  className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Bahan-Bahan (Pisahkan koma)</label>
                  <input
                    type="text"
                    value={productForm.ingredientsText}
                    onChange={(e) => setProductForm({ ...productForm, ingredientsText: e.target.value })}
                    placeholder="Ayam, Sambal, Kemangi, Timun"
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Informasi Porsi</label>
                  <input
                    type="text"
                    value={productForm.portion}
                    onChange={(e) => setProductForm({ ...productForm, portion: e.target.value })}
                    placeholder="1 Porsi (Nasi + Ayam + Lalapan)"
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F2E5D7] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E97832] hover:bg-[#D66723] text-white font-bold rounded-xl shadow"
                >
                  {editingProduct ? 'Perbarui Menu' : 'Simpan Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
