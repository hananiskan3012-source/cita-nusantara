/**
 * Sistem Penghitungan Tarif Ongkos Kirim RASA NUSANTARA
 * Ketentuan: 1 km = Rp 5.000,- (Tarif Resmi Ekspedisi Kuliner)
 */

export const RATE_PER_KM = 5000;

export interface CityDistanceInfo {
  id: string;
  name: string;
  province: string;
  island: string;
  isKitchenHub: boolean; // Dapur cabang RASA NUSANTARA
}

// Daftar Kota Layanan RASA NUSANTARA
export const SHIPPING_CITIES: CityDistanceInfo[] = [
  { id: 'jakarta', name: 'Jakarta', province: 'DKI Jakarta', island: 'Jawa', isKitchenHub: true },
  { id: 'bandung', name: 'Bandung', province: 'Jawa Barat', island: 'Jawa', isKitchenHub: true },
  { id: 'semarang', name: 'Semarang', province: 'Jawa Tengah', island: 'Jawa', isKitchenHub: true },
  { id: 'yogyakarta', name: 'Yogyakarta', province: 'D.I. Yogyakarta', island: 'Jawa', isKitchenHub: true },
  { id: 'solo', name: 'Solo / Surakarta', province: 'Jawa Tengah', island: 'Jawa', isKitchenHub: true },
  { id: 'surabaya', name: 'Surabaya', province: 'Jawa Timur', island: 'Jawa', isKitchenHub: true },
  { id: 'bali', name: 'Bali (Denpasar)', province: 'Bali', island: 'Bali & Nusa Tenggara', isKitchenHub: true },
  { id: 'mataram', name: 'Mataram (Lombok)', province: 'Nusa Tenggara Barat', island: 'Bali & Nusa Tenggara', isKitchenHub: false },
  { id: 'padang', name: 'Padang', province: 'Sumatera Barat', island: 'Sumatera', isKitchenHub: true },
  { id: 'medan', name: 'Medan', province: 'Sumatera Utara', island: 'Sumatera', isKitchenHub: true },
  { id: 'palembang', name: 'Palembang', province: 'Sumatera Selatan', island: 'Sumatera', isKitchenHub: true },
  { id: 'pontianak', name: 'Pontianak', province: 'Kalimantan Barat', island: 'Kalimantan', isKitchenHub: true },
  { id: 'singkawang', name: 'Singkawang', province: 'Kalimantan Barat', island: 'Kalimantan', isKitchenHub: true },
  { id: 'palangkaraya', name: 'Palangka Raya', province: 'Kalimantan Tengah', island: 'Kalimantan', isKitchenHub: true },
  { id: 'banjarmasin', name: 'Banjarmasin', province: 'Kalimantan Selatan', island: 'Kalimantan', isKitchenHub: false },
  { id: 'samarinda', name: 'Samarinda', province: 'Kalimantan Timur', island: 'Kalimantan', isKitchenHub: false },
  { id: 'makassar', name: 'Makassar', province: 'Sulawesi Selatan', island: 'Sulawesi', isKitchenHub: true },
  { id: 'manado', name: 'Manado', province: 'Sulawesi Utara', island: 'Sulawesi', isKitchenHub: false },
  { id: 'ambon', name: 'Ambon', province: 'Maluku', island: 'Maluku & Papua', isKitchenHub: false },
  { id: 'jayapura', name: 'Jayapura', province: 'Papua', island: 'Maluku & Papua', isKitchenHub: false },
];

// Matriks Jarak Riil Antar-Kota (dalam Kilometer / KM)
const INTERCITY_DISTANCES: Record<string, Record<string, number>> = {
  jakarta: {
    bandung: 150,
    semarang: 440,
    yogyakarta: 560,
    solo: 540,
    surabaya: 780,
    bali: 1180,
    mataram: 1320,
    padang: 1250,
    medan: 1880,
    palembang: 530,
    pontianak: 750,
    singkawang: 890,
    palangkaraya: 920,
    banjarmasin: 960,
    samarinda: 1350,
    makassar: 1420,
    manado: 2180,
    ambon: 2420,
    jayapura: 3750,
  },
  bandung: {
    jakarta: 150,
    semarang: 360,
    yogyakarta: 400,
    solo: 430,
    surabaya: 700,
    bali: 1100,
    padang: 1350,
    palembang: 630,
    surakarta: 430,
  },
  surabaya: {
    jakarta: 780,
    bandung: 700,
    semarang: 350,
    yogyakarta: 320,
    solo: 260,
    bali: 420,
    mataram: 560,
    banjarmasin: 480,
    makassar: 820,
    palangkaraya: 620,
    pontianak: 790,
  },
  yogyakarta: {
    jakarta: 560,
    bandung: 400,
    semarang: 120,
    solo: 65,
    surabaya: 320,
    bali: 720,
    palembang: 1020,
  },
  padang: {
    jakarta: 1250,
    medan: 760,
    palembang: 880,
    pekanbaru: 310,
    bandung: 1350,
  },
  pontianak: {
    singkawang: 145,
    palangkaraya: 480,
    banjarmasin: 620,
    jakarta: 750,
    surabaya: 790,
  },
  singkawang: {
    pontianak: 145,
    palangkaraya: 610,
    jakarta: 890,
  },
  palangkaraya: {
    banjarmasin: 190,
    pontianak: 480,
    samarinda: 450,
    jakarta: 920,
    surabaya: 620,
  },
};

/**
 * Mencari jarak antara dua kota (dalam KM)
 */
export function getDistanceBetweenCities(cityA: string, cityB: string): number {
  const normA = cityA.toLowerCase().replace(/[^a-z]/g, '');
  const normB = cityB.toLowerCase().replace(/[^a-z]/g, '');

  if (normA === normB) return 5; // Jarak rata-rata dalam kota

  // Cek langsung pada matriks A -> B
  if (INTERCITY_DISTANCES[normA] && INTERCITY_DISTANCES[normA][normB]) {
    return INTERCITY_DISTANCES[normA][normB];
  }

  // Cek pada matriks kebalikannya B -> A
  if (INTERCITY_DISTANCES[normB] && INTERCITY_DISTANCES[normB][normA]) {
    return INTERCITY_DISTANCES[normB][normA];
  }

  // Estimasi jarak umum antar pulau atau antar provinsi
  return 350;
}

export interface ShippingCalculationResult {
  mode: 'dalam-kota' | 'antar-kota';
  originCity: string;
  destinationCity: string;
  distanceKm: number;
  ratePerKm: number;
  deliveryFee: number;
  estimatedTime: string;
  serviceName: string;
  notes: string;
}

/**
 * Kalkulasi Ongkir Resmi RASA NUSANTARA
 * Rumus: Jarak (KM) x Rp 5.000
 */
export function calculateShipping(
  mode: 'dalam-kota' | 'antar-kota',
  originCity: string,
  destinationCity: string,
  customDistanceKm?: number
): ShippingCalculationResult {
  let distanceKm = 3;

  if (mode === 'dalam-kota') {
    distanceKm = customDistanceKm && customDistanceKm > 0 ? customDistanceKm : 3;
    const deliveryFee = distanceKm * RATE_PER_KM;

    let estimatedTime = '15 - 25 Menit';
    if (distanceKm > 15) {
      estimatedTime = '45 - 60 Menit';
    } else if (distanceKm > 5) {
      estimatedTime = '25 - 40 Menit';
    }

    return {
      mode: 'dalam-kota',
      originCity,
      destinationCity: originCity,
      distanceKm,
      ratePerKm: RATE_PER_KM,
      deliveryFee,
      estimatedTime,
      serviceName: 'Kurir Instan Makanan Panas',
      notes: `Pengiriman langsung dari dapur cabang ${originCity} dengan tas termal higienis.`,
    };
  } else {
    // Antar-kota
    distanceKm = customDistanceKm && customDistanceKm > 0
      ? customDistanceKm
      : getDistanceBetweenCities(originCity, destinationCity);

    const deliveryFee = distanceKm * RATE_PER_KM;

    let estimatedTime = '1 Hari (Next Day Cold Express)';
    if (distanceKm > 1000) {
      estimatedTime = '2 - 3 Hari (Frozen Air Cargo)';
    }

    return {
      mode: 'antar-kota',
      originCity,
      destinationCity,
      distanceKm,
      ratePerKm: RATE_PER_KM,
      deliveryFee,
      estimatedTime,
      serviceName: 'Thermal Frozen Express Antar-Kota',
      notes: `Kemasan vacuum kedap udara & dry ice khusus makanan siap saji dari ${originCity} ke ${destinationCity}.`,
    };
  }
}
