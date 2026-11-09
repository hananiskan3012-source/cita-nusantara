import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, PromoCode, OrderData, OrderStatus, StoreSettings, Testimonial } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import { PROMO_CODES as DEFAULT_PROMOS } from '../data/promos';
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from '../data/testimonials';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'RASA NUSANTARA',
  tagline: 'Setiap Gigitan, Cerita Kelezatan.',
  announcement: '🎉 Nikmati Gratis Ongkir se-Jakarta min. belanja Rp 75.000 dengan kode HEMATONGKIR!',
  showAnnouncement: true,
  whatsappNumber: '6281234567890',
  email: 'halo@rasanusantara.id',
  address: 'Jl. Danau Toba No. 45, Kebayoran Baru, Jakarta Selatan 12180',
  openingHours: 'Setiap Hari: 10:00 - 21:30 WIB',
  freeShippingThreshold: 75000,
  standardDeliveryFee: 10000,
};

const DEFAULT_INITIAL_ORDERS: OrderData[] = [
  {
    orderId: 'RN-8419',
    customerName: 'Siti Rahmawati',
    phoneNumber: '081288992211',
    address: 'Jl. Senopati Dalam No. 18, Kebayoran Baru, Jakarta Selatan',
    notes: 'Tolong sambal dipisah ya mas',
    deliveryMethod: 'instant',
    paymentMethod: 'qris',
    items: [
      { product: DEFAULT_PRODUCTS[0], quantity: 2, selectedSpice: 'Pedas Sedang' },
      { product: DEFAULT_PRODUCTS[3], quantity: 2 },
    ],
    subtotal: 112000,
    discount: 10000,
    deliveryFee: 0,
    total: 102000,
    voucherCode: 'HEMATONGKIR',
    timestamp: 'Hari ini, 12:45 WIB',
    status: 'diproses',
  },
  {
    orderId: 'RN-8415',
    customerName: 'Bagus Priambodo',
    phoneNumber: '085711223344',
    address: 'Gedung Menara Mandiri Lt. 14, Sudirman, Jakarta Pusat',
    notes: 'Antar ke lobi barat reception',
    deliveryMethod: 'instant',
    paymentMethod: 'transfer',
    items: [
      { product: DEFAULT_PRODUCTS[1], quantity: 3, selectedSpice: 'Pedas Ringan' },
      { product: DEFAULT_PRODUCTS[2], quantity: 1, selectedSpice: 'Pedas Mantap' },
    ],
    subtotal: 140000,
    discount: 14000,
    deliveryFee: 0,
    total: 126000,
    voucherCode: 'NUSANTARA10',
    timestamp: 'Hari ini, 11:30 WIB',
    status: 'diantar',
  },
  {
    orderId: 'RN-8390',
    customerName: 'Amanda Putri',
    phoneNumber: '081900112233',
    address: 'Apartemen Pakubuwono Terrace Tower B-12A, Jakarta Selatan',
    notes: 'Sendok ditambah ya',
    deliveryMethod: 'instant',
    paymentMethod: 'cod',
    items: [
      { product: DEFAULT_PRODUCTS[8], quantity: 1, selectedSpice: 'Pedas Sedang' },
    ],
    subtotal: 68000,
    discount: 0,
    deliveryFee: 10000,
    total: 78000,
    timestamp: 'Hari ini, 10:15 WIB',
    status: 'selesai',
  },
];

interface CartContextType {
  // Storefront & Products State
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleProductAvailability: (id: string) => void;

  // Promos State
  promos: PromoCode[];
  addPromo: (promo: PromoCode) => void;
  updatePromo: (code: string, updates: Partial<PromoCode>) => void;
  deletePromo: (code: string) => void;
  togglePromoActive: (code: string) => void;

  // Orders State
  orders: OrderData[];
  addOrder: (order: OrderData) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Testimonials State
  testimonials: Testimonial[];
  addTestimonial: (t: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;

  // Store Settings
  storeSettings: StoreSettings;
  updateStoreSettings: (settings: Partial<StoreSettings>) => void;

  // Cart & Shopping
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSpice?: string, notes?: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  totalItems: number;
  appliedVoucher: PromoCode | null;
  applyVoucher: (code: string) => { success: boolean; message: string };
  removeVoucher: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  // Modals & UI Controls
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  activeOrder: OrderData | null;
  setActiveOrder: (order: OrderData | null) => void;
  activeTab: 'home' | 'menu' | 'promo' | 'tentang' | 'kontak';
  setActiveTab: (tab: 'home' | 'menu' | 'promo' | 'tentang' | 'kontak') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Admin Panel Control
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  resetToDefaultData: () => void;

  // Toast Notifications
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'rasa_nusantara_cart_v2',
  WISHLIST: 'rasa_nusantara_wishlist_v2',
  PRODUCTS: 'rasa_nusantara_products_v3',
  PROMOS: 'rasa_nusantara_promos_v2',
  ORDERS: 'rasa_nusantara_orders_v2',
  TESTIMONIALS: 'rasa_nusantara_testimonials_v2',
  SETTINGS: 'rasa_nusantara_settings_v2',
  ADMIN_AUTH: 'rasa_nusantara_admin_auth_v2',
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // Promos
  const [promos, setPromos] = useState<PromoCode[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROMOS);
      return saved ? JSON.parse(saved) : DEFAULT_PROMOS;
    } catch {
      return DEFAULT_PROMOS;
    }
  });

  // Orders
  const [orders, setOrders] = useState<OrderData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : DEFAULT_INITIAL_ORDERS;
    } catch {
      return DEFAULT_INITIAL_ORDERS;
    }
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : DEFAULT_TESTIMONIALS;
    } catch {
      return DEFAULT_TESTIMONIALS;
    }
  });

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Cart & Wishlist
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<PromoCode | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<OrderData | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'promo' | 'tentang' | 'kontak'>('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist items
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      localStorage.setItem(STORAGE_KEYS.PROMOS, JSON.stringify(promos));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(storeSettings));
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, isAdminLoggedIn ? 'true' : 'false');
    } catch {
      // ignore storage errors
    }
  }, [cart, wishlist, products, promos, orders, testimonials, storeSettings, isAdminLoggedIn]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Product Operations
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `menu-${Date.now().toString().slice(-6)}`;
    const product: Product = {
      ...newProd,
      id,
      isAvailable: true,
      reviewCount: 0,
    };
    setProducts((prev) => [product, ...prev]);
    showToast(`Menu "${product.name}" berhasil ditambahkan ke katalog!`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Perubahan menu berhasil disimpan!', 'success');
  };

  const deleteProduct = (id: string) => {
    const p = products.find((x) => x.id === id);
    setProducts((prev) => prev.filter((x) => x.id !== id));
    // also remove from cart if present
    setCart((prev) => prev.filter((c) => c.product.id !== id));
    showToast(`Menu "${p?.name || id}" berhasil dihapus.`, 'info');
  };

  const toggleProductAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = p.isAvailable === false ? true : false;
          showToast(
            `Status "${p.name}": ${nextState ? 'Tersedia' : 'Habis / Nonaktif'}`,
            nextState ? 'success' : 'warning'
          );
          return { ...p, isAvailable: nextState };
        }
        return p;
      })
    );
  };

  // Promo Operations
  const addPromo = (newPromo: PromoCode) => {
    const cleanCode = newPromo.code.trim().toUpperCase();
    if (promos.some((p) => p.code === cleanCode)) {
      showToast(`Kode kupon "${cleanCode}" sudah digunakan.`, 'warning');
      return;
    }
    const promoItem: PromoCode = { ...newPromo, code: cleanCode, isActive: true };
    setPromos((prev) => [promoItem, ...prev]);
    showToast(`Kupon diskon "${cleanCode}" berhasil diaktifkan!`, 'success');
  };

  const updatePromo = (code: string, updates: Partial<PromoCode>) => {
    setPromos((prev) =>
      prev.map((p) => (p.code === code ? { ...p, ...updates } : p))
    );
    showToast(`Kupon ${code} berhasil diperbarui.`, 'success');
  };

  const deletePromo = (code: string) => {
    setPromos((prev) => prev.filter((p) => p.code !== code));
    if (appliedVoucher?.code === code) {
      setAppliedVoucher(null);
    }
    showToast(`Kupon ${code} berhasil dihapus.`, 'info');
  };

  const togglePromoActive = (code: string) => {
    setPromos((prev) =>
      prev.map((p) => {
        if (p.code === code) {
          const next = p.isActive === false ? true : false;
          showToast(`Kupon ${code} ${next ? 'Diaktifkan' : 'Dinonaktifkan'}.`, 'info');
          return { ...p, isActive: next };
        }
        return p;
      })
    );
  };

  // Order Operations
  const addOrder = (order: OrderData) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
    showToast(`Status pesanan #${orderId} diubah menjadi "${status.toUpperCase()}".`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    showToast(`Pesanan #${orderId} telah dihapus dari riwayat.`, 'info');
  };

  // Testimonials Operations
  const addTestimonial = (t: Omit<Testimonial, 'id'>) => {
    const item: Testimonial = {
      ...t,
      id: `testi-${Date.now().toString().slice(-6)}`,
    };
    setTestimonials((prev) => [item, ...prev]);
    showToast('Ulasan pelanggan berhasil ditambahkan!', 'success');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    showToast('Ulasan telah dihapus.', 'info');
  };

  // Store Settings
  const updateStoreSettings = (newSettings: Partial<StoreSettings>) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Pengaturan website & profil resto berhasil disimpan!', 'success');
  };

  // Admin Authentication (PIN: admin123)
  const loginAdmin = (pin: string) => {
    if (pin.trim() === 'admin123' || pin.trim() === '123456') {
      setIsAdminLoggedIn(true);
      showToast('Berhasil masuk ke Panel Admin RASA NUSANTARA!', 'success');
      return true;
    }
    showToast('PIN / Password admin salah. Coba: admin123', 'warning');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    showToast('Anda telah keluar dari mode admin.', 'info');
  };

  const resetToDefaultData = () => {
    setProducts(DEFAULT_PRODUCTS);
    setPromos(DEFAULT_PROMOS);
    setOrders(DEFAULT_INITIAL_ORDERS);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setStoreSettings(DEFAULT_SETTINGS);
    showToast('Semua data website telah dikembalikan ke pengaturan awal pabrik!', 'info');
  };

  // Shopping Cart & Order Calculations
  const addToCart = (product: Product, quantity = 1, selectedSpice?: string, notes?: string) => {
    if (product.isAvailable === false) {
      showToast(`Maaf, menu ${product.name} saat ini sedang habis.`, 'warning');
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSpice === selectedSpice
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          notes: notes || next[existingIndex].notes,
        };
        return next;
      }

      return [...prev, { product, quantity, selectedSpice, notes }];
    });

    showToast(`${product.name} (${quantity}x) dimasukkan ke keranjang!`, 'success');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    const removedItem = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    if (removedItem) {
      showToast(`${removedItem.product.name} dihapus dari keranjang`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const isFavorited = prev.includes(productId);
      if (isFavorited) {
        showToast('Dihapus dari menu favorit', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Ditambahkan ke menu favorit ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Delivery fee logic based on storeSettings
  const deliveryFee =
    cart.length === 0
      ? 0
      : subtotal >= storeSettings.freeShippingThreshold
      ? 0
      : storeSettings.standardDeliveryFee;

  // Calculate discount
  let discount = 0;
  if (appliedVoucher && subtotal >= appliedVoucher.minSpend) {
    if (appliedVoucher.discountType === 'percentage') {
      discount = Math.round((subtotal * appliedVoucher.discountValue) / 100);
    } else {
      discount = appliedVoucher.discountValue;
    }
  }

  const total = Math.max(0, subtotal - discount + deliveryFee);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyVoucher = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = promos.find((p) => p.code === cleanCode);

    if (!found || found.isActive === false) {
      showToast(`Kode voucher "${code}" tidak ditemukan atau sudah nonaktif.`, 'warning');
      return { success: false, message: 'Kode voucher tidak valid.' };
    }

    if (subtotal < found.minSpend) {
      const remaining = found.minSpend - subtotal;
      const msg = `Minimal belanja Rp ${found.minSpend.toLocaleString('id-ID')} untuk menggunakan voucher ini. Tambah Rp ${remaining.toLocaleString('id-ID')} lagi!`;
      showToast(msg, 'warning');
      return { success: false, message: msg };
    }

    setAppliedVoucher(found);
    showToast(`Voucher ${found.code} berhasil diterapkan! Diskon aktif.`, 'success');
    return { success: true, message: 'Voucher berhasil diterapkan!' };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    showToast('Voucher dibatalkan', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        // Products
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductAvailability,

        // Promos
        promos,
        addPromo,
        updatePromo,
        deletePromo,
        togglePromoActive,

        // Orders
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,

        // Testimonials
        testimonials,
        addTestimonial,
        deleteTestimonial,

        // Store Settings
        storeSettings,
        updateStoreSettings,

        // Cart
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discount,
        deliveryFee,
        total,
        totalItems,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        wishlist,
        toggleWishlist,
        isWishlisted,

        // UI & Modals
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProduct,
        setSelectedProduct,
        activeOrder,
        setActiveOrder,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,

        // Admin Controls
        isAdminOpen,
        setIsAdminOpen,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        resetToDefaultData,

        // Toasts
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
