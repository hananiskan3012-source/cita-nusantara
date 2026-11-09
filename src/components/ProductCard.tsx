import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Heart, Plus, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setSelectedProduct } = useCart();
  const wishlisted = isWishlisted(product.id);

  const formatRupiah = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'makanan-utama':
        return 'Makanan Utama';
      case 'camilan':
        return 'Camilan';
      case 'minuman':
        return 'Minuman';
      case 'paket-hemat':
        return 'Paket Hemat';
      default:
        return 'Kuliner';
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-[#F2E5D7] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Media container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2E5D7]/50">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges & Actions */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {product.isAvailable === false ? (
            <span className="pointer-events-auto text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wide uppercase bg-stone-800 text-stone-200 shadow-sm">
              Stok Habis
            </span>
          ) : product.badge ? (
            <span
              className={`pointer-events-auto text-[11px] font-semibold px-2.5 py-1 rounded-md tracking-wide uppercase ${
                product.badge === 'Bestseller'
                  ? 'bg-[#E97832] text-white shadow-sm'
                  : product.badge === 'Favorit'
                  ? 'bg-[#66734B] text-white'
                  : 'bg-[#39271F] text-white'
              }`}
            >
              {product.badge}
            </span>
          ) : (
            <div />
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={wishlisted ? 'Hapus dari favorit' : 'Tambah ke favorit'}
            className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-[#39271F] shadow-sm backdrop-blur-sm transition-transform active:scale-90"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                wishlisted ? 'fill-[#E97832] text-[#E97832]' : 'text-stone-600 hover:text-[#E97832]'
              }`}
            />
          </button>
        </div>

        {/* Quick View overlay button */}
        <button
          onClick={() => setSelectedProduct(product)}
          className="absolute inset-x-4 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 py-2 px-3 bg-white/95 text-[#39271F] text-xs font-semibold rounded-lg shadow-sm flex items-center justify-center gap-1.5 hover:bg-white active:scale-98"
        >
          <Eye className="w-3.5 h-3.5 text-[#E97832]" />
          Lihat Detail & Resep
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#39271F]/70 mb-1.5">
            <span className="font-medium tracking-wide uppercase text-[11px]">
              {getCategoryLabel(product.category)}
            </span>
            <div className="flex items-center gap-1 text-[#39271F] font-semibold tabular-nums">
              <Star className="w-3.5 h-3.5 fill-[#E97832] text-[#E97832]" />
              <span>{product.rating}</span>
              <span className="text-stone-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProduct(product)}
            className="font-serif text-lg font-bold text-[#39271F] hover:text-[#E97832] transition-colors cursor-pointer line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Pricing and Add CTA */}
        <div className="pt-3 border-t border-[#F2E5D7] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#39271F] font-mono tabular-nums">
                {formatRupiah(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-mono tabular-nums">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-stone-500 block">
              {product.portion.split('(')[0]}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={product.isAvailable === false}
            aria-label={`Tambah ${product.name} ke keranjang`}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
              product.isAvailable === false
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-[#E97832] hover:bg-[#D66723] text-white hover:shadow active:scale-95'
            }`}
          >
            {product.isAvailable === false ? (
              <span>Habis</span>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Tambah</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
