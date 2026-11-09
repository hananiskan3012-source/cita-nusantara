import React from 'react';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Tag, Copy, Check, Clock, Sparkles, Percent, Gift } from 'lucide-react';

export const PromoPage: React.FC = () => {
  const { applyVoucher, setIsCartOpen, showToast, promos, products } = useCart();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyAndApply = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyVoucher(code);
    setIsCartOpen(true);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const bundlingProducts = products.filter((p) => p.category === 'paket-hemat');

  // Filter only active promos
  const activePromos = promos.filter((p) => p.isActive !== false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider">
          Penawaran Istimewa
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#39271F]">
          Promo & Paket Bundling Hemat
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Nikmati santap lezat masakan Nusantara favorit bersama teman atau keluarga dengan harga lebih terjangkau.
        </p>
      </div>

      {/* Featured Promo Cards / Vouchers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activePromos.map((promo) => (
          <div
            key={promo.code}
            className="bg-white rounded-2xl border-2 border-[#F2E5D7] hover:border-[#E97832] p-6 shadow-sm flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-xl bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-[#E97832]">
                  <Percent className="w-5 h-5" />
                </span>
                <span className="text-[11px] font-semibold text-[#66734B] bg-[#66734B]/10 px-2.5 py-1 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {promo.validUntil}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-[#39271F] mb-1">
                Kupon {promo.code}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mb-4">
                {promo.description}
              </p>
              <div className="text-[11px] text-stone-500 mb-6">
                Min. Belanja: <strong className="font-mono text-[#39271F]">Rp {promo.minSpend.toLocaleString('id-ID')}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2E5D7] flex items-center justify-between gap-3">
              <span className="font-mono font-bold text-xs bg-[#FFF8EF] border border-[#F2E5D7] px-3 py-1.5 rounded-lg text-[#39271F] tracking-wider">
                {promo.code}
              </span>
              <button
                onClick={() => handleCopyAndApply(promo.code)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
              >
                {copiedCode === promo.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Diterapkan!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Pakai Kupon</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Paket Bundling Section */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center gap-3">
          <Gift className="w-6 h-6 text-[#E97832]" />
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#39271F]">
              Paket Bundling Super Kenyang
            </h2>
            <p className="text-xs text-stone-600">
              Kombinasi lengkap makanan utama + camilan + minuman segar dengan diskon bundling langsung.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {bundlingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Syarat & Ketentuan Promo */}
      <div className="bg-[#F2E5D7]/50 rounded-2xl p-6 border border-[#F2E5D7] text-xs text-stone-600 space-y-2">
        <h4 className="font-bold text-[#39271F] uppercase tracking-wider text-[11px]">
          Ketentuan Umum Penggunaan Kupon & Promo:
        </h4>
        <ul className="list-disc list-inside space-y-1 pl-1 leading-relaxed">
          <li>Setiap kupon promo berlaku untuk pemesanan online melalui website resmi atau WhatsApp RASA NUSANTARA.</li>
          <li>Kupon tidak dapat digabungkan dengan program voucher ganda lainnya dalam 1 transaksi yang sama.</li>
          <li>Bebas ongkir otomatis terpotong saat nilai belanja keranjang mencapai Rp 75.000 atau lebih.</li>
          <li>Promo berlaku selama persediaan porsi harian masih tersedia di dapur resto.</li>
        </ul>
      </div>
    </div>
  );
};
