import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, Tag, ShoppingBag, ArrowRight, Check } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    deliveryFee,
    total,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    setIsCheckoutOpen,
    setActiveTab,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyVoucher(couponInput);
    if (res.success) {
      setCouponInput('');
    }
  };

  const freeShippingThreshold = 75000;
  const freeShippingLeft = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-[#FFF8EF] h-full shadow-2xl flex flex-col z-10 border-l border-[#F2E5D7]">
        {/* Header */}
        <div className="p-5 border-b border-[#F2E5D7] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#E97832]" />
            <h2 className="font-serif text-xl font-bold text-[#39271F]">Keranjang Belanja</h2>
            <span className="text-xs bg-[#F2E5D7] text-[#39271F] font-bold px-2 py-0.5 rounded-full tabular-nums">
              {cart.reduce((a, b) => a + b.quantity, 0)} item
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-stone-500 hover:text-[#39271F] rounded-lg transition-colors"
            aria-label="Tutup keranjang"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F2E5D7]/50 px-5 py-3 border-b border-[#F2E5D7]">
          {freeShippingLeft > 0 ? (
            <div>
              <p className="text-xs text-[#39271F] mb-1.5">
                Beli lagi <span className="font-bold text-[#E97832] font-mono">{formatRupiah(freeShippingLeft)}</span> untuk dapat <span className="font-semibold">Gratis Ongkir!</span>
              </p>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#E97832] h-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[#66734B] font-semibold">
              <Check className="w-4 h-4" />
              <span>Selamat! Kamu mendapatkan Gratis Ongkir se-Jakarta!</span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 bg-[#F2E5D7] text-[#E97832] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#39271F] mb-1">
                Keranjang Masih Kosong
              </h3>
              <p className="text-xs text-stone-600 mb-6 max-w-xs mx-auto">
                Perut lapar? Yuk jelajahi menu makanan khas nusantara kami yang lezat dan dibuat fresh!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveTab('menu');
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#E97832] text-white text-xs font-semibold rounded-xl hover:bg-[#D66723] transition-colors"
              >
                <span>Lihat Semua Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSpice}`}
                className="bg-white p-3.5 rounded-xl border border-[#F2E5D7] flex gap-3.5 shadow-sm"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-18 h-18 rounded-lg object-cover bg-stone-100 shrink-0"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h4 className="text-sm font-bold text-[#39271F] line-clamp-1">
                        {item.product.name}
                      </h4>
                      {item.selectedSpice && (
                        <p className="text-[11px] text-[#E97832] font-medium">
                          {item.selectedSpice}
                        </p>
                      )}
                      {item.notes && (
                        <p className="text-[10px] text-stone-500 italic line-clamp-1">
                          "{item.notes}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-stone-400 hover:text-red-500 p-1 transition-colors"
                      aria-label="Hapus item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-bold text-[#39271F] font-mono tabular-nums">
                      {formatRupiah(item.product.price * item.quantity)}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-[#F2E5D7] bg-[#FFF8EF] rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-stone-600 hover:text-[#39271F]"
                        aria-label="Kurang satu"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold font-mono text-[#39271F]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-stone-600 hover:text-[#39271F]"
                        aria-label="Tambah satu"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher and Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#F2E5D7] space-y-4">
            {/* Promo Code Form */}
            {appliedVoucher ? (
              <div className="flex items-center justify-between bg-[#66734B]/10 border border-[#66734B]/30 p-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#66734B]" />
                  <div>
                    <span className="text-xs font-bold text-[#66734B] tracking-wider">
                      {appliedVoucher.code}
                    </span>
                    <span className="text-[11px] text-stone-600 block">
                      Hemat {appliedVoucher.discountType === 'percentage' ? `${appliedVoucher.discountValue}%` : formatRupiah(appliedVoucher.discountValue)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={removeVoucher}
                  className="text-xs text-red-500 font-semibold hover:underline"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Kode promo (cth: NUSANTARA10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] uppercase font-mono placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#39271F] hover:bg-[#2b1d17] text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                >
                  Terapkan
                </button>
              </form>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-[#F2E5D7]">
              <div className="flex justify-between">
                <span>Subtotal Menu</span>
                <span className="font-mono tabular-nums text-[#39271F] font-semibold">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-[#66734B]">
                  <span>Potongan Diskon</span>
                  <span className="font-mono tabular-nums font-semibold">
                    - {formatRupiah(discount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Ongkos Kirim Estimasi</span>
                <span className="font-mono tabular-nums text-[#39271F] font-semibold">
                  {deliveryFee === 0 ? (
                    <span className="text-[#66734B] uppercase text-[11px] font-bold">Gratis</span>
                  ) : (
                    formatRupiah(deliveryFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#39271F] pt-2 border-t border-[#F2E5D7]">
                <span>Total Pembayaran</span>
                <span className="font-mono tabular-nums text-[#E97832]">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#E97832] hover:bg-[#D66723] text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
