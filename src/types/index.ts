export type CategoryType = 'semua' | 'makanan-utama' | 'camilan' | 'minuman' | 'paket-hemat';

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: 'Bestseller' | 'Favorit' | 'Baru' | 'Hemat';
  description: string;
  story: string;
  ingredients: string[];
  portion: string;
  spiceLevel: 0 | 1 | 2 | 3; // 0: tidak pedas, 1: pedas ringan, 2: sedang, 3: pedas mantap
  image: string;
  gallery?: string[];
  prepTime: string;
  isAvailable?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSpice?: string;
  notes?: string;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend: number;
  description: string;
  validUntil: string;
  isActive?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  favoriteMenu: string;
}

export type OrderStatus = 'menunggu' | 'diproses' | 'diantar' | 'selesai' | 'dibatalkan';

export interface OrderData {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  notes?: string;
  deliveryMethod: 'instant' | 'sameday' | 'pickup';
  paymentMethod: 'qris' | 'transfer' | 'cod';
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  voucherCode?: string;
  timestamp: string;
  status: OrderStatus;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  announcement: string;
  showAnnouncement: boolean;
  whatsappNumber: string;
  email: string;
  address: string;
  openingHours: string;
  freeShippingThreshold: number;
  standardDeliveryFee: number;
}

