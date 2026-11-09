import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, QrCode, CreditCard, Banknote, MessageCircle, ArrowRight, Printer } from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { activeOrder, setActiveOrder, setActiveTab } = useCart();

  if (!activeOrder) return null;

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleSendToWhatsApp = () => {
    const itemList = activeOrder.items
      .map((it) => `• ${it.product.name} x${it.quantity} (${it.selectedSpice || 'Standar'})`)
      .join('\n');

    const msg = encodeURIComponent(
      `*PESANAN BARU - RASA NUSANTARA*\n` +
      `No. Pesanan: *#${activeOrder.orderId}*\n` +
      `Nama: ${activeOrder.customerName}\n` +
      `No. WA: ${activeOrder.phoneNumber}\n` +
      `Alamat: ${activeOrder.address}\n` +
      `Pengiriman: ${activeOrder.deliveryMethod.toUpperCase()}\n` +
      `Pembayaran: ${activeOrder.paymentMethod.toUpperCase()}\n\n` +
      `*Rincian Menu:*\n${itemList}\n\n` +
      `Subtotal: ${formatRupiah(activeOrder.subtotal)}\n` +
      (activeOrder.discount > 0 ? `Diskon: -${formatRupiah(activeOrder.discount)}\n` : '') +
      `Ongkir: ${formatRupiah(activeOrder.deliveryFee)}\n` +
      `*TOTAL: ${formatRupiah(activeOrder.total)}*\n\n` +
      `Catatan: ${activeOrder.notes || '-'}\n\n` +
      `Halo admin RASA NUSANTARA, mohon segera diproses ya! Terima kasih banyak.`
    );

    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FFF8EF] rounded-3xl shadow-2xl border border-[#F2E5D7] overflow-hidden my-8 p-6 sm:p-8">
        {/* Top Success Badge */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#66734B]/15 text-[#66734B] rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#E97832] block mb-1">
            Pesanan Berhasil Diterima!
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#39271F]">
            Terima Kasih, {activeOrder.customerName}!
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Pesanan Anda sedang disiapkan dengan higienis oleh tim dapur kami.
          </p>
        </div>

        {/* Order Identifier & Delivery Info */}
        <div className="bg-white p-4 rounded-2xl border border-[#F2E5D7] space-y-3 mb-5">
          <div className="flex justify-between items-center text-xs border-b border-[#F2E5D7] pb-2.5">
            <span className="text-stone-500">Nomor Pesanan</span>
            <span className="font-mono font-bold text-[#E97832] text-sm">
              #{activeOrder.orderId}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs border-b border-[#F2E5D7] pb-2.5">
            <span className="text-stone-500">Waktu Pemesanan</span>
            <span className="text-[#39271F] font-medium">{activeOrder.timestamp}</span>
          </div>

          <div className="flex justify-between items-center text-xs border-b border-[#F2E5D7] pb-2.5">
            <span className="text-stone-500">Estimasi Pengantaran</span>
            <span className="text-[#39271F] font-semibold">30 - 45 Menit (Tiba Hangat)</span>
          </div>

          <div className="text-xs">
            <span className="text-stone-500 block mb-1">Alamat Tujuan:</span>
            <p className="font-medium text-[#39271F] leading-snug">{activeOrder.address}</p>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="p-4 rounded-2xl bg-[#F2E5D7]/50 border border-[#F2E5D7] mb-6 space-y-3">
          <h3 className="text-xs font-bold text-[#39271F] uppercase tracking-wider flex items-center gap-1.5">
            {activeOrder.paymentMethod === 'qris' && <QrCode className="w-4 h-4 text-[#E97832]" />}
            {activeOrder.paymentMethod === 'transfer' && <CreditCard className="w-4 h-4 text-[#39271F]" />}
            {activeOrder.paymentMethod === 'cod' && <Banknote className="w-4 h-4 text-[#66734B]" />}
            <span>Instruksi Pembayaran ({activeOrder.paymentMethod.toUpperCase()})</span>
          </h3>

          {activeOrder.paymentMethod === 'qris' && (
            <div className="text-center py-2 space-y-2">
              <div className="inline-block p-3 bg-white rounded-xl shadow-inner border border-stone-200">
                {/* Visual QR Code Mockup */}
                <div className="w-32 h-32 bg-stone-900 mx-auto rounded-lg p-2 flex flex-col justify-between items-center text-white">
                  <div className="flex justify-between w-full">
                    <div className="w-7 h-7 bg-white p-1 rounded"><div className="w-full h-full bg-stone-900" /></div>
                    <div className="w-7 h-7 bg-white p-1 rounded"><div className="w-full h-full bg-stone-900" /></div>
                  </div>
                  <div className="text-[10px] font-mono tracking-widest font-bold">QRIS NUSANTARA</div>
                  <div className="flex justify-between w-full">
                    <div className="w-7 h-7 bg-white p-1 rounded"><div className="w-full h-full bg-stone-900" /></div>
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-stone-600">
                Scan kode QRIS di atas dengan aplikasi BCA, Mandiri, GoPay, OVO, atau ShopeePay.
              </p>
            </div>
          )}

          {activeOrder.paymentMethod === 'transfer' && (
            <div className="text-xs space-y-2 bg-white p-3 rounded-xl border border-stone-200">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Bank Transfer</span>
                <span className="font-bold text-[#39271F]">BCA (Bank Central Asia)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">No. Rekening</span>
                <span className="font-mono font-bold text-[#E97832] text-sm tracking-wider">
                  8720-1928-37
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Atas Nama</span>
                <span className="font-medium text-[#39271F]">RASA NUSANTARA CULINARY</span>
              </div>
            </div>
          )}

          {activeOrder.paymentMethod === 'cod' && (
            <p className="text-xs text-stone-700 bg-white p-3 rounded-xl border border-stone-200">
              Silakan siapkan uang pas sebesar <strong className="text-[#E97832] font-mono">{formatRupiah(activeOrder.total)}</strong> untuk dibayarkan kepada kurir saat pesanan Anda tiba di lokasi.
            </p>
          )}

          <div className="pt-2 border-t border-[#F2E5D7] flex justify-between text-sm font-bold text-[#39271F]">
            <span>Total yang Harus Dibayar</span>
            <span className="text-[#E97832] font-mono">{formatRupiah(activeOrder.total)}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleSendToWhatsApp}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#66734B] hover:bg-[#586440] text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-98"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Kirim Bukti & Pantau di WhatsApp</span>
          </button>

          <button
            onClick={() => {
              setActiveOrder(null);
              setActiveTab('menu');
            }}
            className="w-full py-3 px-4 bg-white hover:bg-stone-50 text-[#39271F] border border-[#F2E5D7] text-xs font-semibold rounded-xl transition-colors"
          >
            Kembali ke Katalog Menu
          </button>
        </div>
      </div>
    </div>
  );
};
