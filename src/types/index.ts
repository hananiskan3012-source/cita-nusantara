export type CategoryType = 'semua' | 'makanan-sehat' | 'makanan-utama' | 'makanan-modern' | 'camilan' | 'minuman' | 'paket-hemat';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio?: string;
  city: string;
  address: string;
  tier: 'Silver Foodie' | 'Gold Epicurean' | 'Platinum Cityzen VIP';
  points: number; // Rasa Poin
  dietaryPreferences: string[];
  favoriteSpice: string;
  joinedDate: string;
}

export interface SavedAddress {
  id: string;
  label: string; // "Rumah", "Kantor", "Apartemen", dll
  receiverName: string;
  phone: string;
  city: string;
  fullAddress: string;
  isDefault: boolean;
}

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
  originCity?: string;
  culturalStory?: string;
}

export interface CityRegion {
  id: string;
  name: string;
  province: string;
  island?: 'Sumatera' | 'Jawa' | 'Kalimantan' | 'Sulawesi' | 'Bali & Nusa Tenggara' | 'Maluku & Papua';
  tagline: string;
  description: string;
  iconDish: string;
  signatureDishId: string;
  accentColor?: string;
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
  photo?: string;
  comment: string;
  rating: number;
  favoriteMenu: string;
  verifiedBadge?: string;
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
  originCity?: string;
  destinationCity?: string;
  distanceKm?: number;
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
  ratePerKm: number; // 5000 Rp/km
}

