import { PromoCode } from '../types';

export const PROMO_CODES: PromoCode[] = [
  {
    code: 'NUSANTARA10',
    discountType: 'percentage',
    discountValue: 10,
    minSpend: 40000,
    description: 'Diskon 10% untuk semua menu tanpa batas maksimal diskon!',
    validUntil: 'Berlaku s/d Akhir Bulan Ini',
  },
  {
    code: 'HEMATONGKIR',
    discountType: 'fixed',
    discountValue: 10000,
    minSpend: 50000,
    description: 'Potongan ongkos kirim Rp 10.000 untuk pengiriman area Jakarta & sekitarnya.',
    validUntil: 'Setiap Hari',
  },
  {
    code: 'PELANGGANBARU',
    discountType: 'percentage',
    discountValue: 15,
    minSpend: 45000,
    description: 'Spesial pesanan pertama kamu! Nikmati diskon ekstra 15%.',
    validUntil: 'Khusus Pesanan Pertama',
  },
];

export const PROMO_BANNERS = [
  {
    id: 'bundle-kenyang',
    title: 'Paket Kenyang Berdua Hemat 20%',
    badge: 'Penawaran Terbatas',
    description: 'Pilihan hemat makan siang berdua. Nasi Ayam Sambal Matah + Nasi Goreng Spesial + 2 Es Teh Lemon cuma Rp 68.000.',
    originalPrice: 85000,
    discountedPrice: 68000,
    code: 'NUSANTARA10',
    image: '/src/assets/images/hero_culinary_feast_1793604100215.jpg',
  },
  {
    id: 'free-delivery',
    title: 'Gratis Ongkir Minimal Belanja Rp 75.000',
    badge: 'Kupon Pengiriman',
    description: 'Pesan makan siang kantor atau santap malam di rumah tanpa pusing ongkos kirim. Pengiriman kilat terjaga hangat.',
    code: 'HEMATONGKIR',
    image: '/src/assets/images/food_ayam_sambal_matah_1793604100905.jpg',
  },
];
