import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { OrderData } from '../types';
import { SHIPPING_CITIES } from '../data/shipping';
import { X, CheckCircle, Truck, CreditCard, QrCode, Banknote, ShieldCheck, ArrowLeft } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discount,
    deliveryFee,
    total,
    appliedVoucher,
    clearCart,
    setActiveOrder,
    addOrder,
    showToast,
    deliveryMode,
    setDeliveryMode,
    deliveryOriginCity,
    setDeliveryOriginCity,
    deliveryDestinationCity,
    setDeliveryDestinationCity,
    deliveryDistanceKm,
    setDeliveryDistanceKm,
    shippingCalculation,
    setIsShippingCalcOpen,
    currentUser,
    savedAddresses,
    setIsProfileModalOpen,
  } = useCart();

  const [customerName, setCustomerName] = useState(currentUser.name || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phone || '');
  const [address, setAddress] = useState(currentUser.address || '');
  const [notes, setNotes] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'instant' | 'sameday' | 'pickup'>('instant');
  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'transfer' | 'cod'>('qris');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync whenever currentUser switches
  React.useEffect(() => {
    if (currentUser) {
      setCustomerName(currentUser.name);
      setPhoneNumber(currentUser.phone);
      const defaultAddr = savedAddresses.find((a) => a.isDefault);
      setAddress(defaultAddr ? defaultAddr.fullAddress : currentUser.address);
    }
  }, [currentUser, savedAddresses]);

  if (!isCheckoutOpen) return null;

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      showToast('Harap masukkan nama lengkap Anda.', 'warning');
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 8) {
      showToast('Harap masukkan nomor WhatsApp yang valid.', 'warning');
      return;
    }
    if (deliveryMethod !== 'pickup' && !address.trim()) {
      showToast('Harap masukkan alamat pengiriman lengkap.', 'warning');
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `RN-${randomSuffix}`;

    const newOrder: OrderData = {
      orderId,
      customerName,
      phoneNumber,
      address: deliveryMethod === 'pickup' ? 'Ambil di Outlet RASA NUSANTARA (Kebayoran Baru)' : address,
      notes,
      deliveryMethod,
      paymentMethod,
      items: [...cart],
      subtotal,
      discount,
      deliveryFee: deliveryMethod === 'pickup' ? 0 : deliveryFee,
      total: deliveryMethod === 'pickup' ? Math.max(0, subtotal - discount) : total,
      voucherCode: appliedVoucher?.code,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB, Hari ini',
      status: 'menunggu',
      originCity: deliveryOriginCity,
      destinationCity: deliveryDestinationCity,
      distanceKm: deliveryMethod === 'pickup' ? 0 : shippingCalculation.distanceKm,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      addOrder(newOrder);
      clearCart();
      setIsCheckoutOpen(false);
      setActiveOrder(newOrder);
      showToast(`Pesanan #${orderId} berhasil dibuat!`, 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FFF8EF] rounded-3xl shadow-2xl border border-[#F2E5D7] overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#F2E5D7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="text-stone-500 hover:text-[#39271F] p-1 rounded-lg mr-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-serif text-xl font-bold text-[#39271F]">Form Pemesanan & Checkout</h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-500 hover:text-[#39271F] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleConfirmOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Data Pelanggan */}
          <div className="bg-white p-4 rounded-2xl border border-[#F2E5D7] space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-[#39271F] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#E97832] text-white flex items-center justify-center text-xs">1</span>
                Informasi Pemesan
              </h3>

              <button
                type="button"
                onClick={() => setIsProfileModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FFF8EF] hover:bg-sky-50 border border-[#6CABDD]/40 text-[11px] font-bold text-[#001838] transition-colors"
              >
                <img src={currentUser.avatar} alt={currentUser.name} className="w-4 h-4 rounded-full object-cover" />
                <span>{currentUser.name.split(' ')[0]}</span>
                <span className="text-[#E97832] underline ml-0.5">Ganti Akun</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Anggara"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                />
              </div>
            </div>

            {deliveryMethod !== 'pickup' && (
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="block text-xs font-semibold text-stone-700">
                    Alamat Pengiriman & Patokan *
                  </label>
                  {savedAddresses.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] text-stone-500">Pilih Cepat:</span>
                      {savedAddresses.map((sa) => (
                        <button
                          key={sa.id}
                          type="button"
                          onClick={() => {
                            setAddress(sa.fullAddress);
                            setCustomerName(sa.receiverName);
                            setPhoneNumber(sa.phone);
                            setDeliveryDestinationCity(sa.city);
                          }}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold border transition-colors ${
                            address === sa.fullAddress
                              ? 'bg-[#E97832] text-white border-[#E97832]'
                              : 'bg-[#FFF8EF] text-[#39271F] border-[#F2E5D7] hover:border-[#E97832]'
                          }`}
                        >
                          {sa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <textarea
                  required
                  rows={2}
                  placeholder="Contoh: Jl. Kemang Raya No. 12, RT 03/05 (Pagar hitam samping minimarket), Jakarta Selatan"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Catatan Tambahan untuk Driver / Dapur (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Tolong titip di security lobi atau sendok ditambah"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
              />
            </div>
          </div>

          {/* Metode Pengiriman */}
          <div className="bg-white p-4 rounded-2xl border border-[#F2E5D7] space-y-3">
            <h3 className="text-sm font-bold text-[#39271F] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E97832] text-white flex items-center justify-center text-xs">2</span>
              Metode Pengiriman
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setDeliveryMethod('instant')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  deliveryMethod === 'instant'
                    ? 'border-[#E97832] bg-[#E97832]/5 ring-1 ring-[#E97832]'
                    : 'border-[#F2E5D7] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#39271F]">Kurir Instan</span>
                  <Truck className="w-4 h-4 text-[#E97832]" />
                </div>
                <p className="text-[11px] text-stone-500">Estimasi 30-45 mnt (Makanan hangat)</p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('sameday')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  deliveryMethod === 'sameday'
                    ? 'border-[#E97832] bg-[#E97832]/5 ring-1 ring-[#E97832]'
                    : 'border-[#F2E5D7] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#39271F]">Same Day</span>
                  <Truck className="w-4 h-4 text-[#66734B]" />
                </div>
                <p className="text-[11px] text-stone-500">Estimasi 2-3 jam pengiriman</p>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  deliveryMethod === 'pickup'
                    ? 'border-[#E97832] bg-[#E97832]/5 ring-1 ring-[#E97832]'
                    : 'border-[#F2E5D7] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#39271F]">Ambil Sendiri</span>
                  <CheckCircle className="w-4 h-4 text-[#39271F]" />
                </div>
                <p className="text-[11px] text-stone-500">Pick-up langsung di resto (Gratis)</p>
              </button>
            </div>

            {deliveryMethod !== 'pickup' && (
              <div className="pt-3 border-t border-[#F2E5D7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#39271F] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#E97832]" />
                    <span>Jarak & Rute Pengiriman (1 KM = Rp 5.000)</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsShippingCalcOpen(true)}
                    className="text-[11px] font-semibold text-[#E97832] hover:underline"
                  >
                    Buka Kalkulator Lengkap →
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-[#FFF8EF] p-1 rounded-xl border border-[#F2E5D7]">
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('dalam-kota')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      deliveryMode === 'dalam-kota'
                        ? 'bg-white text-[#E97832] shadow-xs'
                        : 'text-stone-600'
                    }`}
                  >
                    Dalam Kota
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryMode('antar-kota')}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                      deliveryMode === 'antar-kota'
                        ? 'bg-white text-[#E97832] shadow-xs'
                        : 'text-stone-600'
                    }`}
                  >
                    Antar Kota
                  </button>
                </div>

                {deliveryMode === 'dalam-kota' ? (
                  <div className="space-y-2 p-3 bg-[#FFF8EF]/60 rounded-xl border border-[#F2E5D7]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-600 font-medium">Jarak dari Dapur Terdekat:</span>
                      <span className="font-mono font-bold text-[#E97832]">
                        {deliveryDistanceKm} KM ({formatRupiah(deliveryDistanceKm * 5000)})
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={deliveryDistanceKm}
                      onChange={(e) => setDeliveryDistanceKm(Number(e.target.value))}
                      className="w-full accent-[#E97832] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>1 km (Rp 5.000)</span>
                      <span>15 km (Rp 75.000)</span>
                      <span>30 km (Rp 150.000)</span>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 p-3 bg-[#FFF8EF]/60 rounded-xl border border-[#F2E5D7] text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-600 mb-1">Kota Asal:</label>
                      <select
                        value={deliveryOriginCity}
                        onChange={(e) => setDeliveryOriginCity(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#F2E5D7] bg-white text-[#39271F]"
                      >
                        {SHIPPING_CITIES.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-stone-600 mb-1">Kota Tujuan:</label>
                      <select
                        value={deliveryDestinationCity}
                        onChange={(e) => setDeliveryDestinationCity(e.target.value)}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-[#F2E5D7] bg-white text-[#39271F]"
                      >
                        {SHIPPING_CITIES.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2 pt-1 flex justify-between items-center text-[11px] text-stone-600">
                      <span>Jarak Antar-Kota: <strong className="font-mono text-[#E97832]">{shippingCalculation.distanceKm} KM</strong></span>
                      <span className="font-mono font-bold text-[#E97832]">{formatRupiah(shippingCalculation.deliveryFee)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Metode Pembayaran */}
          <div className="bg-white p-4 rounded-2xl border border-[#F2E5D7] space-y-3">
            <h3 className="text-sm font-bold text-[#39271F] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#E97832] text-white flex items-center justify-center text-xs">3</span>
              Pilihan Metode Pembayaran
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'qris'
                    ? 'border-[#E97832] bg-[#E97832]/5 ring-1 ring-[#E97832]'
                    : 'border-[#F2E5D7] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#39271F]">QRIS Digital</span>
                  <QrCode className="w-4 h-4 text-[#E97832]" />
                </div>
                <p className="text-[10px] text-stone-500">BCA, GoPay, OVO, ShopeePay, Mandiri</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('transfer')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'transfer'
                    ? 'border-[#E97832] bg-[#E97832]/5 ring-1 ring-[#E97832]'
                    : 'border-[#F2E5D7] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#39271F]">Transfer Bank</span>
                  <CreditCard className="w-4 h-4 text-[#39271F]" />
                </div>
                <p className="text-[10px] text-stone-500">BCA / Mandiri Virtual Account</p>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#E97832] bg-[#E97832]/5 ring-1 ring-[#E97832]'
                    : 'border-[#F2E5D7] hover:border-stone-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#39271F]">Bayar di Tempat (COD)</span>
                  <Banknote className="w-4 h-4 text-[#66734B]" />
                </div>
                <p className="text-[10px] text-stone-500">Bayar tunai ke kurir saat makanan tiba</p>
              </button>
            </div>
          </div>

          {/* Ringkasan Biaya */}
          <div className="bg-[#F2E5D7]/50 p-4 rounded-2xl border border-[#F2E5D7] space-y-2 text-xs">
            <h4 className="font-bold text-[#39271F] uppercase tracking-wider text-[11px] mb-2">
              Ringkasan Pembayaran
            </h4>
            <div className="flex justify-between text-stone-600">
              <span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} menu)</span>
              <span className="font-mono">{formatRupiah(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#66734B] font-semibold">
                <span>Diskon Kupon ({appliedVoucher?.code})</span>
                <span className="font-mono">- {formatRupiah(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-stone-600">
              <span>Ongkos Kirim</span>
              <span className="font-mono">
                {deliveryMethod === 'pickup' || deliveryFee === 0 ? 'Rp 0 (Gratis)' : formatRupiah(deliveryFee)}
              </span>
            </div>
            <div className="pt-2 border-t border-[#F2E5D7] flex justify-between text-base font-bold text-[#39271F]">
              <span>Total Tagihan</span>
              <span className="text-[#E97832] font-mono">
                {formatRupiah(deliveryMethod === 'pickup' ? Math.max(0, subtotal - discount) : total)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-[#66734B] shrink-0" />
            <span>Pesanan higienis, kemasan disegel rapat, dan garansi makanan tiba hangat.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 bg-[#E97832] hover:bg-[#D66723] disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2 text-sm"
          >
            {isSubmitting ? (
              <span>Memproses Pesanan Anda...</span>
            ) : (
              <span>Konfirmasi & Buat Pesanan</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
