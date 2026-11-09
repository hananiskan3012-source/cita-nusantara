import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { X, Star, Heart, Clock, Utensils, Flame, Plus, Minus, ShoppingBag, MessageSquareShare } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setIsCartOpen,
    products,
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [spiceLevel, setSpiceLevel] = useState<string>('Pedas Sedang');
  const [notes, setNotes] = useState('');

  if (!selectedProduct) return null;

  const wishlisted = isWishlisted(selectedProduct.id);

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, spiceLevel, notes);
    setSelectedProduct(null);
    setQuantity(1);
    setNotes('');
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo RASA NUSANTARA, saya ingin memesan langsung:\n\n*${selectedProduct.name}*\nJumlah: ${quantity} porsi\nTingkat Pedas: ${spiceLevel}\nCatatan: ${notes || '-'}\nTotal: ${formatRupiah(selectedProduct.price * quantity)}\n\nMohon bantuannya untuk info pengiriman ya!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
  };

  // Recommendations: exclude current product
  const recommendations = products.filter((p) => p.id !== selectedProduct.id && p.isAvailable !== false).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FFF8EF] rounded-3xl shadow-2xl border border-[#F2E5D7] overflow-hidden my-8 max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#39271F] shadow-md transition-transform active:scale-90"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Product Image & Badges */}
        <div className="md:w-1/2 relative bg-[#F2E5D7]/40 min-h-[300px] md:min-h-full">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {selectedProduct.badge && (
              <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[#E97832] text-white shadow-sm uppercase tracking-wider">
                {selectedProduct.badge}
              </span>
            )}
          </div>
          <button
            onClick={() => toggleWishlist(selectedProduct.id)}
            className="absolute bottom-4 left-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#39271F] shadow-sm transition-transform active:scale-90"
            title="Simpan ke Favorit"
          >
            <Heart
              className={`w-5 h-5 ${
                wishlisted ? 'fill-[#E97832] text-[#E97832]' : 'text-stone-600'
              }`}
            />
          </button>
        </div>

        {/* Right Side: Product Details & Purchase Form */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-[92vh]">
          <div>
            {/* Header info */}
            <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
              <span className="uppercase tracking-wider font-semibold text-[#E97832]">
                {selectedProduct.category.replace('-', ' ')}
              </span>
              <span>·</span>
              <div className="flex items-center gap-1 font-semibold text-[#39271F]">
                <Star className="w-4 h-4 fill-[#E97832] text-[#E97832]" />
                <span>{selectedProduct.rating}</span>
                <span className="text-stone-400 font-normal">({selectedProduct.reviewCount} ulasan)</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1 text-stone-600">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedProduct.prepTime}</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#39271F] mb-2 leading-tight">
              {selectedProduct.name}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-[#39271F] font-mono tabular-nums">
                {formatRupiah(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-stone-400 line-through font-mono tabular-nums">
                  {formatRupiah(selectedProduct.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-stone-700 leading-relaxed mb-4">
              {selectedProduct.description}
            </p>

            {/* Story / Secret */}
            <div className="p-3.5 bg-[#F2E5D7]/50 rounded-xl border border-[#F2E5D7] mb-5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#39271F] mb-1">
                <Utensils className="w-3.5 h-3.5 text-[#E97832]" />
                <span>Cerita Dapur & Resep</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed italic">
                "{selectedProduct.story}"
              </p>
            </div>

            {/* Ingredients */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-[#39271F] uppercase tracking-wider mb-2">
                Bahan Pilihan & Komposisi
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProduct.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-white border border-[#F2E5D7] text-[#39271F] px-2.5 py-1 rounded-md"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Spice Level Option (if applicable) */}
            {selectedProduct.category === 'makanan-utama' && (
              <div className="mb-5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#39271F] mb-2">
                  <Flame className="w-4 h-4 text-[#E97832]" />
                  <span>Pilihan Tingkat Pedas:</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['Tidak Pedas', 'Pedas Sedang', 'Pedas Mantap'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpiceLevel(lvl)}
                      className={`py-2 px-2 text-xs font-medium rounded-lg border transition-all text-center ${
                        spiceLevel === lvl
                          ? 'bg-[#E97832] text-white border-[#E97832] shadow-sm'
                          : 'bg-white text-[#39271F] border-[#F2E5D7] hover:border-stone-400'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Notes Input */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-[#39271F] uppercase tracking-wider mb-1.5">
                Catatan Pesanan (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Sambal dipisah, tanpa timun, sendok 2 pasang"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-white focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#F2E5D7] space-y-3">
            <div className="flex items-center justify-between gap-4">
              {/* Quantity stepper */}
              <div className="flex items-center border border-[#F2E5D7] bg-white rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 text-stone-600 hover:text-[#39271F] rounded-lg transition-colors"
                  aria-label="Kurang satu"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-sm font-bold font-mono tabular-nums text-[#39271F]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1.5 text-stone-600 hover:text-[#39271F] rounded-lg transition-colors"
                  aria-label="Tambah satu"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Total Preview */}
              <div className="text-right">
                <span className="text-[11px] text-stone-500 block">Subtotal</span>
                <span className="text-lg font-bold text-[#39271F] font-mono tabular-nums">
                  {formatRupiah(selectedProduct.price * quantity)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#E97832] hover:bg-[#D66723] text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Tambah Keranjang</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#66734B] hover:bg-[#586440] text-white text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98"
              >
                <MessageSquareShare className="w-4 h-4" />
                <span>Pesan via WhatsApp</span>
              </button>
            </div>

            {/* Recommendations preview */}
            <div className="pt-3 border-t border-[#F2E5D7]">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-2">
                Menu Pendamping Cocok Lainnya:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {recommendations.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => {
                      setSelectedProduct(rec);
                      setQuantity(1);
                    }}
                    className="shrink-0 flex items-center gap-2 p-1.5 pr-3 rounded-lg border border-[#F2E5D7] bg-white hover:border-[#E97832] transition-colors text-left"
                  >
                    <img
                      src={rec.image}
                      alt={rec.name}
                      className="w-8 h-8 rounded-md object-cover"
                    />
                    <div>
                      <p className="text-[11px] font-medium text-[#39271F] line-clamp-1">{rec.name}</p>
                      <p className="text-[10px] text-stone-500 font-mono">{formatRupiah(rec.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
