import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import {
  Camera,
  X,
  Upload,
  Sparkles,
  Check,
  RotateCcw,
  Link as LinkIcon,
  MessageSquareHeart,
  ChevronDown,
} from 'lucide-react';

const STORAGE_KEY_PHOTO = 'rasa_nusantara_welcome_photo_v1';
const STORAGE_KEY_TEXT = 'rasa_nusantara_welcome_text_v1';

const DEFAULT_WELCOME_PHOTO = '/assets/images/brand_logo_mancity_redbull_1794210686507.jpg';
const DEFAULT_WELCOME_TEXT = 'Selamat datang! Yuk cicipi kelezatan khas Nusantara & Modern hari ini.';

const PRESET_WELCOME_PHOTOS = [
  {
    label: 'City × Bull',
    src: '/assets/images/brand_logo_mancity_redbull_1794210686507.jpg',
  },
  {
    label: 'Feast Nusantara',
    src: '/assets/images/hero_culinary_feast_1793604100215.jpg',
  },
  {
    label: 'Truffle Wagyu',
    src: '/assets/images/food_wagyu_truffle_friedrice_1794210657151.jpg',
  },
  {
    label: 'Rendang Burger',
    src: '/assets/images/food_rendang_burger_1794210657625.jpg',
  },
  {
    label: 'Lionel Messi',
    src: '/assets/images/messi_testimonial_1794209594448.jpg',
  },
  {
    label: 'Max Verstappen',
    src: '/assets/images/verstappen_testimonial_1794209594502.jpg',
  },
];

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return 'Selamat Pagi';
  if (hour >= 11 && hour < 15) return 'Selamat Siang';
  if (hour >= 15 && hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
}

// Resize uploaded photo smoothly to fit cleanly inside localStorage
function resizeImageToDataUrl(file: File, maxSize = 420): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export const WelcomeGreetingWidget: React.FC = () => {
  const { currentUser, setActiveTab, showToast } = useCart();

  const [welcomePhoto, setWelcomePhoto] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PHOTO);
      if (!saved) return DEFAULT_WELCOME_PHOTO;
      if (saved.startsWith('/src/assets/images/')) {
        const normalized = saved.replace('/src/assets/images/', '/assets/images/');
        localStorage.setItem(STORAGE_KEY_PHOTO, normalized);
        return normalized;
      }
      return saved;
    } catch {
      return DEFAULT_WELCOME_PHOTO;
    }
  });

  const [welcomeText, setWelcomeText] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_TEXT) || DEFAULT_WELCOME_TEXT;
    } catch {
      return DEFAULT_WELCOME_TEXT;
    }
  });

  // Always opens with a welcoming greeting card when website first opens
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>('');
  const [textDraft, setTextDraft] = useState<string>(welcomeText);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Smooth pop-in shortly after opening the website
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const persistPhoto = (nextPhoto: string) => {
    setWelcomePhoto(nextPhoto);
    try {
      localStorage.setItem(STORAGE_KEY_PHOTO, nextPhoto);
    } catch {
      showToast('Foto terlalu besar untuk disimpan permanen, aktif di sesi ini.', 'warning');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('Pilih file gambar (JPG, PNG, WebP).', 'warning');
      return;
    }
    try {
      const dataUrl = await resizeImageToDataUrl(file);
      persistPhoto(dataUrl);
      showToast('Foto pembuka salam berhasil diganti!', 'success');
      setIsEditing(false);
    } catch {
      showToast('Gagal membaca file foto.', 'warning');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    persistPhoto(urlInput.trim());
    setUrlInput('');
    setIsEditing(false);
    showToast('Foto pembuka dari URL berhasil diterapkan!', 'success');
  };

  const handleSaveText = () => {
    const cleaned = textDraft.trim() || DEFAULT_WELCOME_TEXT;
    setWelcomeText(cleaned);
    try {
      localStorage.setItem(STORAGE_KEY_TEXT, cleaned);
    } catch {
      // ignore
    }
    setIsEditing(false);
    showToast('Ucapan salam pembuka diperbarui!', 'success');
  };

  const handleReset = () => {
    persistPhoto(DEFAULT_WELCOME_PHOTO);
    setWelcomeText(DEFAULT_WELCOME_TEXT);
    setTextDraft(DEFAULT_WELCOME_TEXT);
    try {
      localStorage.removeItem(STORAGE_KEY_PHOTO);
      localStorage.removeItem(STORAGE_KEY_TEXT);
    } catch {
      // ignore
    }
    setIsEditing(false);
    showToast('Foto & salam pembuka dikembalikan ke awal.', 'info');
  };

  if (!isVisible) return null;

  // Minimized floating thumbnail pill at bottom-right
  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-40 animate-fadeIn">
        <button
          onClick={() => setIsMinimized(false)}
          title="Buka Salam Pembuka & Ganti Foto"
          className="group flex items-center gap-2.5 bg-white hover:bg-[#FFF8EF] p-1.5 pr-3.5 rounded-full shadow-xl border-2 border-[#6CABDD]/60 hover:border-[#E97832] transition-all hover:scale-105"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#E97832]/40 shrink-0 bg-stone-100">
            <img
              src={welcomePhoto}
              alt="Foto Pembuka Salam"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <div className="text-[11px] font-bold text-[#39271F] leading-tight flex items-center gap-1">
              <span>{getTimeGreeting()}!</span>
              <Sparkles className="w-3 h-3 text-[#E97832]" />
            </div>
            <div className="text-[9px] text-stone-500 font-medium">Klik buka salam / ganti foto</div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[calc(100vw-2.5rem)] max-w-[330px] animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#F2E5D7] overflow-hidden">
        {/* Top Accent Stripe (Man City Sky Blue x Red Bull Crimson x Rasa Nusantara Orange) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#6CABDD] via-[#E97832] to-[#DE0029]" />

        {/* Card Content */}
        <div className="p-3.5">
          {/* Header Row with Minimize & Close */}
          <div className="flex items-center justify-between mb-2.5">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FFF8EF] border border-[#F2E5D7] text-[10px] font-bold text-[#E97832]">
              <MessageSquareHeart className="w-3 h-3" />
              <span>Salam Pembuka</span>
            </span>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setTextDraft(welcomeText);
                  setIsEditing(!isEditing);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1 ${
                  isEditing
                    ? 'bg-[#39271F] text-white'
                    : 'bg-[#FFF8EF] hover:bg-[#F2E5D7] text-[#39271F]'
                }`}
                title="Ganti foto pembuka atau ubah salam"
              >
                <Camera className="w-3 h-3 text-[#E97832]" />
                <span>{isEditing ? 'Tutup Edit' : 'Ganti Foto'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                aria-label="Perkecil salam pembuka"
                title="Perkecil"
                className="p-1 rounded-lg text-stone-400 hover:text-[#39271F] hover:bg-stone-100 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                aria-label="Tutup salam pembuka"
                title="Tutup"
                className="p-1 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Greeting Row: Small Opening Photo + Salam */}
          <div className="flex items-center gap-3">
            {/* Small Opening Photo with quick camera click */}
            <div className="relative shrink-0 group">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Klik untuk upload foto pembuka sendiri"
                className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-[#6CABDD]/60 shadow-md bg-[#FFF8EF] block focus:outline-none"
              >
                <img
                  src={welcomePhoto}
                  alt="Foto Pembuka Salam RASA NUSANTARA"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Upload foto sendiri"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#E97832] hover:bg-[#D66723] text-white flex items-center justify-center shadow-md border-2 border-white transition-transform hover:scale-110"
              >
                <Camera className="w-3 h-3" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Greeting Text */}
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm font-bold text-[#39271F] leading-snug truncate">
                {getTimeGreeting()}, {currentUser.name.split(' ')[0]}!
              </h4>
              <p className="text-[11px] text-stone-600 leading-relaxed mt-0.5 line-clamp-2">
                {welcomeText}
              </p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('menu');
                    setIsMinimized(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-[10px] font-bold text-white bg-[#E97832] hover:bg-[#D66723] px-2.5 py-1 rounded-lg shadow-xs transition-colors"
                >
                  Lihat Menu →
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-[10px] font-semibold text-[#6CABDD] hover:text-[#001838] underline"
                >
                  Ubah Foto
                </button>
              </div>
            </div>
          </div>

          {/* Inline Customizer Drawer (Change Photo & Greeting) */}
          {isEditing && (
            <div className="mt-3 pt-3 border-t border-[#F2E5D7] space-y-3 animate-fadeIn">
              {/* 1. Upload From Device */}
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 px-3 rounded-xl border border-dashed border-[#E97832] bg-[#FFF8EF] hover:bg-[#F2E5D7]/60 text-[#39271F] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Upload className="w-3.5 h-3.5 text-[#E97832]" />
                  <span>Upload Foto Sendiri dari Galeri / File</span>
                </button>
              </div>

              {/* 2. Quick Presets */}
              <div>
                <div className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5">
                  Atau Pilih Foto Cepat:
                </div>
                <div className="grid grid-cols-6 gap-1.5">
                  {PRESET_WELCOME_PHOTOS.map((item) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => {
                        persistPhoto(item.src);
                        showToast(`Foto "${item.label}" dipasang!`, 'success');
                      }}
                      title={item.label}
                      className={`rounded-lg overflow-hidden border-2 aspect-square transition-all ${
                        welcomePhoto === item.src
                          ? 'border-[#E97832] ring-2 ring-[#E97832]/30 scale-105'
                          : 'border-stone-200 hover:border-[#6CABDD]'
                      }`}
                    >
                      <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Custom Image URL */}
              <form onSubmit={handleApplyUrl} className="flex gap-1.5">
                <div className="relative flex-1">
                  <LinkIcon className="w-3 h-3 absolute left-2.5 top-2.5 text-stone-400" />
                  <input
                    type="url"
                    placeholder="Atau link URL foto (https://...)"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="w-full pl-7 pr-2 py-1.5 text-[11px] rounded-lg border border-stone-200 focus:outline-none focus:border-[#E97832]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-2.5 py-1.5 bg-[#6CABDD] hover:bg-[#5899cc] text-white text-[10px] font-bold rounded-lg shrink-0"
                >
                  Pakai
                </button>
              </form>

              {/* 4. Optional Greeting Message Edit */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                  Teks Salam Pembuka:
                </label>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={textDraft}
                    onChange={(e) => setTextDraft(e.target.value)}
                    maxLength={100}
                    className="flex-1 px-2.5 py-1.5 text-[11px] rounded-lg border border-stone-200 focus:outline-none focus:border-[#E97832]"
                  />
                  <button
                    type="button"
                    onClick={handleSaveText}
                    className="px-2.5 py-1.5 bg-[#E97832] hover:bg-[#D66723] text-white text-[10px] font-bold rounded-lg flex items-center gap-1 shrink-0"
                  >
                    <Check className="w-3 h-3" />
                    <span>Simpan</span>
                  </button>
                </div>
              </div>

              {/* Reset Button */}
              <div className="flex justify-between items-center pt-1">
                <span className="text-[9px] text-stone-400">Tersimpan otomatis di perangkat Anda</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] font-semibold text-stone-500 hover:text-[#E97832] flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
