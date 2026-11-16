import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SHIPPING_CITIES, calculateShipping, RATE_PER_KM, getDistanceBetweenCities } from '../data/shipping';
import {
  X,
  Truck,
  MapPin,
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  Clock,
  Sparkles
} from 'lucide-react';

export const ShippingCalculatorModal: React.FC = () => {
  const {
    isShippingCalcOpen,
    setIsShippingCalcOpen,
    deliveryMode,
    setDeliveryMode,
    deliveryOriginCity,
    setDeliveryOriginCity,
    deliveryDestinationCity,
    setDeliveryDestinationCity,
    deliveryDistanceKm,
    setDeliveryDistanceKm,
    showToast,
  } = useCart();

  const [activeMode, setActiveMode] = useState<'dalam-kota' | 'antar-kota'>(deliveryMode);
  const [localOrigin, setLocalOrigin] = useState<string>(deliveryOriginCity);
  const [localDestination, setLocalDestination] = useState<string>(deliveryDestinationCity);
  const [localDistance, setLocalDistance] = useState<number>(deliveryDistanceKm);

  if (!isShippingCalcOpen) return null;

  const formatRupiah = (num: number) => {
    return 'Rp ' + (num || 0).toLocaleString('id-ID');
  };

  // Compute preview calculation
  const preview = calculateShipping(
    activeMode,
    localOrigin,
    localDestination,
    activeMode === 'dalam-kota' ? localDistance : undefined
  );

  const handleApplyToCart = () => {
    setDeliveryMode(activeMode);
    setDeliveryOriginCity(localOrigin);
    setDeliveryDestinationCity(activeMode === 'dalam-kota' ? localOrigin : localDestination);
    setDeliveryDistanceKm(preview.distanceKm);
    setIsShippingCalcOpen(false);
    showToast(
      `Tarif ongkir diterapkan: ${formatRupiah(preview.deliveryFee)} (${preview.distanceKm} km x Rp 5.000/km)`,
      'success'
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FFF8EF] rounded-3xl shadow-2xl border border-[#F2E5D7] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 bg-white border-b border-[#F2E5D7] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-[#FFF8EF] text-[#E97832] flex items-center justify-center border border-[#F2E5D7] shrink-0">
              <Calculator className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#39271F] leading-snug truncate">
                Kalkulator Ongkos Kirim Resmi
              </h3>
              <p className="text-[11px] text-stone-500">
                Tarif Transparan: <strong className="text-[#E97832] font-mono">1 KM = Rp 5.000,-</strong>
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsShippingCalcOpen(false)}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 bg-[#F2E5D7]/50 p-1.5 rounded-2xl border border-[#F2E5D7]">
            <button
              type="button"
              onClick={() => setActiveMode('dalam-kota')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeMode === 'dalam-kota'
                  ? 'bg-white text-[#E97832] shadow-sm'
                  : 'text-stone-600 hover:text-[#39271F]'
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Dalam Kota (Instant)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('antar-kota')}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeMode === 'antar-kota'
                  ? 'bg-white text-[#E97832] shadow-sm'
                  : 'text-stone-600 hover:text-[#39271F]'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Antar Kota (Express)</span>
            </button>
          </div>

          {/* Form Fields according to Mode */}
          {activeMode === 'dalam-kota' ? (
            <div className="bg-white p-5 rounded-2xl border border-[#F2E5D7] space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E97832]" />
                  <span>Kota Cabang Dapur RASA NUSANTARA:</span>
                </label>
                <select
                  value={localOrigin}
                  onChange={(e) => setLocalOrigin(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] font-medium text-[#39271F] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30"
                >
                  {SHIPPING_CITIES.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.province})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-stone-700">
                    Perkiraan Jarak Pengantaran dari Dapur:
                  </label>
                  <span className="font-mono font-bold text-sm text-[#E97832] bg-[#FFF8EF] px-2.5 py-0.5 rounded-lg border border-[#F2E5D7]">
                    {localDistance} KM
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={localDistance}
                  onChange={(e) => setLocalDistance(Number(e.target.value))}
                  className="w-full accent-[#E97832] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-mono">
                  <span>1 KM (Rp 5.000)</span>
                  <span>10 KM (Rp 50.000)</span>
                  <span>20 KM (Rp 100.000)</span>
                  <span>30 KM (Rp 150.000)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-5 rounded-2xl border border-[#F2E5D7] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E97832]" />
                    <span>Kota Asal (Dapur Pengirim):</span>
                  </label>
                  <select
                    value={localOrigin}
                    onChange={(e) => setLocalOrigin(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] font-medium text-[#39271F] focus:outline-none"
                  >
                    {SHIPPING_CITIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.province})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#66734B]" />
                    <span>Kota Tujuan (Pemesan):</span>
                  </label>
                  <select
                    value={localDestination}
                    onChange={(e) => setLocalDestination(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] font-medium text-[#39271F] focus:outline-none"
                  >
                    {SHIPPING_CITIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.province})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-3 bg-[#FFF8EF] rounded-xl border border-[#F2E5D7] flex items-center justify-between text-xs">
                <span className="text-stone-600">Jarak Riil Jalur Darat/Kargo:</span>
                <span className="font-mono font-bold text-[#E97832] text-sm">
                  {preview.distanceKm} KM
                </span>
              </div>
            </div>
          )}

          {/* Real-time Calculation Result Box */}
          <div className="bg-gradient-to-br from-[#39271F] to-[#4c352a] text-[#FFF8EF] p-4 sm:p-5 rounded-2xl shadow-lg border border-stone-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="min-w-0">
                <span className="text-[10px] text-[#FFF8EF]/60 uppercase tracking-widest block font-bold">
                  {preview.serviceName}
                </span>
                <h4 className="font-serif text-base sm:text-lg font-bold text-white mt-0.5 break-words">
                  Rute: {preview.originCity} {activeMode === 'antar-kota' ? `→ ${preview.destinationCity}` : '(Area Sekitar)'}
                </h4>
              </div>
              <div className="sm:text-right shrink-0">
                <span className="text-[10px] text-[#FFF8EF]/70 block font-mono">
                  {preview.distanceKm} km x Rp 5.000
                </span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#E97832]">
                  {formatRupiah(preview.deliveryFee)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E97832] shrink-0" />
                <div>
                  <span className="text-[10px] text-white/60 block">Estimasi Waktu:</span>
                  <span className="font-semibold text-white">{preview.estimatedTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-white/60 block">Garansi Kualitas:</span>
                  <span className="font-semibold text-white">Tas Termal Higienis</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#FFF8EF]/80 italic pt-1 border-t border-white/10">
              💡 {preview.notes}
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-white border-t border-[#F2E5D7] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setIsShippingCalcOpen(false)}
            className="px-4 py-2.5 border border-[#F2E5D7] hover:bg-stone-50 text-stone-600 text-xs font-semibold rounded-xl"
          >
            Tutup
          </button>

          <button
            type="button"
            onClick={handleApplyToCart}
            className="flex-1 py-2.5 px-4 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-bold rounded-xl shadow transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Terapkan Tarif ({formatRupiah(preview.deliveryFee)}) ke Pesanan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
