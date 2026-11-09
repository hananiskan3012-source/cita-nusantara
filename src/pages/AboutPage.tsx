import React from 'react';
import { useCart } from '../context/CartContext';
import { Heart, ShieldCheck, Sparkles, Users, Award, Leaf, ChefHat, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Story Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider">
            Cerita Di Balik Dapur Kami
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#39271F] leading-tight">
            Menghidupkan Kembali Kehangatan Resep Warisan Nusantara
          </h1>
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
            Berawal dari sebuah dapur mungil di sudut Jakarta Selatan pada tahun 2021, <strong>RASA NUSANTARA</strong> didirikan dengan satu misi sederhana: mengembalikan keaslian bumbu rempah tradisional Indonesia yang kaya ke dalam santapan harian masyarakat urban modern.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Kami melihat begitu banyak masakan cepat saji yang kehilangan jiwanya — menggunakan perisa instan dan mengorbankan kualitas demi kepraktisan. Kami memilih jalan berbeda: mengulek sambal segar setiap hari, memilih cabai dan bawang dari petani lokal, serta memasak dengan ketulusan seperti memasak untuk keluarga sendiri di rumah.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => setActiveTab('menu')}
              className="px-6 py-3 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-bold rounded-xl shadow transition-all flex items-center gap-2"
            >
              <span>Lihat Hasil Karya Dapur Kami</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#F2E5D7]">
            <img
              src="/src/assets/images/hero_culinary_feast_1793604100215.jpg"
              alt="Dapur RASA NUSANTARA"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-2xl shadow-lg border border-[#F2E5D7] max-w-xs">
            <p className="font-serif text-sm font-bold text-[#39271F]">
              "Setiap Gigitan, Cerita Kelezatan."
            </p>
            <p className="text-[11px] text-stone-500 mt-1">
              Prinsip utama yang dijaga di setiap piring sajian RASA NUSANTARA.
            </p>
          </div>
        </div>
      </div>

      {/* Visi & Misi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#F2E5D7] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-[#E97832]">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#39271F]">Visi Kami</h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Menjadi brand kuliner UMKM kebanggaan Indonesia yang memadukan keautentikan rasa tradisional nusantara dengan kebersihan berstandar internasional dan kemudahan pemesanan digital modern.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#F2E5D7] shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-[#66734B]">
            <ChefHat className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#39271F]">Misi Kami</h2>
          <ul className="text-sm text-stone-600 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E97832] mt-2 shrink-0" />
              <span>Menjaga orisinalitas resep warisan nusantara tanpa kompromi bahan pengawet.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E97832] mt-2 shrink-0" />
              <span>Mendukung kesejahteraan peternak ayam dan petani cabai lokal Indonesia.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E97832] mt-2 shrink-0" />
              <span>Memberikan pengalaman santap yang higienis, cepat, dan ramah pelanggan.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 4 Pilar Komitmen Kualitas */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider block mb-2">
            Standar Tanpa Kompromi
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39271F]">
            4 Komitmen Utama Dapur Kami
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#F2E5D7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FFF8EF] border border-[#F2E5D7] text-[#E97832] flex items-center justify-center mx-auto">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#39271F]">100% Bahan Segar</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Daging ayam dipotong hari itu juga dan sayuran segar dipasok langsung setiap subuh dari mitra petani lokal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F2E5D7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FFF8EF] border border-[#F2E5D7] text-[#66734B] flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#39271F]">Higienis & Bebas Pengawet</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Dapur tertutup dengan protokol sanitasi ketat. Tidak ada pewarna sintetis atau bahan pengawet kimiawi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F2E5D7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FFF8EF] border border-[#F2E5D7] text-[#E97832] flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#39271F]">Rempah Tradisional Asli</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Mempertahankan racikan bumbu tumbuk asli bukan bumbu pasta instan, menciptakan kedalaman cita rasa autentik.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#F2E5D7] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FFF8EF] border border-[#F2E5D7] text-[#66734B] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#39271F]">Pelayanan Penuh Cinta</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Setiap pesanan dikemas dengan rapi, segel keamanan, dan ketepatan waktu pengiriman oleh staf ramah kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
