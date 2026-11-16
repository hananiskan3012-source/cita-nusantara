import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRESET_AVATARS } from '../data/users';
import { SHIPPING_CITIES } from '../data/shipping';
import {
  X,
  User,
  MapPin,
  Clock,
  Award,
  Sparkles,
  Check,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  Phone,
  Mail,
  Flame,
  ShieldCheck,
} from 'lucide-react';

const formatRupiah = (num: number) => 'Rp ' + num.toLocaleString('id-ID');

export const UserProfileModal: React.FC = () => {
  const {
    currentUser,
    users,
    savedAddresses,
    isProfileModalOpen,
    setIsProfileModalOpen,
    updateCurrentUser,
    switchUser,
    createNewUser,
    addSavedAddress,
    updateSavedAddress,
    deleteSavedAddress,
    setDefaultAddress,
    orders,
    addToCart,
    setIsCartOpen,
    showToast,
  } = useCart();

  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders' | 'loyalty'>('profile');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  // Form states for profile
  const [formName, setFormName] = useState(currentUser.name);
  const [formEmail, setFormEmail] = useState(currentUser.email);
  const [formPhone, setFormPhone] = useState(currentUser.phone);
  const [formBio, setFormBio] = useState(currentUser.bio || '');
  const [formCity, setFormCity] = useState(currentUser.city);
  const [formAddress, setFormAddress] = useState(currentUser.address);
  const [formSpice, setFormSpice] = useState(currentUser.favoriteSpice);

  // New user form state
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserCity, setNewUserCity] = useState('Jakarta');

  // New address form state
  const [newAddrLabel, setNewAddrLabel] = useState('Rumah Baru');
  const [newAddrReceiver, setNewAddrReceiver] = useState(currentUser.name);
  const [newAddrPhone, setNewAddrPhone] = useState(currentUser.phone);
  const [newAddrCity, setNewAddrCity] = useState(currentUser.city);
  const [newAddrFull, setNewAddrFull] = useState('');

  // Sync profile form when user switches
  React.useEffect(() => {
    setFormName(currentUser.name);
    setFormEmail(currentUser.email);
    setFormPhone(currentUser.phone);
    setFormBio(currentUser.bio || '');
    setFormCity(currentUser.city);
    setFormAddress(currentUser.address);
    setFormSpice(currentUser.favoriteSpice);
    setNewAddrReceiver(currentUser.name);
    setNewAddrPhone(currentUser.phone);
    setNewAddrCity(currentUser.city);
  }, [currentUser]);

  if (!isProfileModalOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name: formName,
      email: formEmail,
      phone: formPhone,
      bio: formBio,
      city: formCity,
      address: formAddress,
      favoriteSpice: formSpice,
    });
  };

  const handleSelectAvatar = (url: string) => {
    updateCurrentUser({ avatar: url });
    setIsEditingAvatar(false);
  };

  const handleCustomAvatarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAvatarUrl.trim()) {
      updateCurrentUser({ avatar: customAvatarUrl.trim() });
      setCustomAvatarUrl('');
      setIsEditingAvatar(false);
    }
  };

  const handleCreateNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim()) return;

    createNewUser({
      name: newUserName.trim(),
      email: newUserEmail.trim() || `${newUserName.toLowerCase().replace(/\s+/g, '')}@rasanusantara.id`,
      phone: newUserPhone.trim() || '081234567890',
      avatar: PRESET_AVATARS[0].image,
      city: newUserCity,
      address: `Jl. Utama No. 1, ${newUserCity}`,
      favoriteSpice: 'Pedas Sedang (Level 2)',
      dietaryPreferences: ['Cita Rasa Nusantara', 'Halal Food'],
      bio: 'Pencinta kuliner Indonesia modern & tradisional.',
    });

    setIsAddingUser(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrFull.trim()) return;

    addSavedAddress({
      label: newAddrLabel.trim() || 'Alamat Baru',
      receiverName: newAddrReceiver.trim() || currentUser.name,
      phone: newAddrPhone.trim() || currentUser.phone,
      city: newAddrCity,
      fullAddress: newAddrFull.trim(),
      isDefault: false,
    });

    setIsAddingAddress(false);
    setNewAddrFull('');
  };

  const tierColors = {
    'Platinum Cityzen VIP': 'from-[#001838] via-[#6CABDD] to-[#DE0029] text-white',
    'Gold Epicurean': 'from-amber-600 to-yellow-500 text-white',
    'Silver Foodie': 'from-stone-600 to-stone-400 text-white',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#FFF8EF] rounded-3xl shadow-2xl border border-[#F2E5D7] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Banner with Man City Sky Blue & Red Bull Energy Gradient */}
        <div className="relative bg-gradient-to-r from-[#001838] via-[#6CABDD] to-[#DE0029] p-5 sm:p-6 text-white shrink-0">
          {/* Subtle watermark badge */}
          <div className="absolute right-4 -top-8 w-40 h-40 opacity-15 pointer-events-none rounded-full overflow-hidden">
            <img
              src="/assets/images/brand_logo_mancity_redbull_1794210686507.jpg"
              alt="Crest watermark"
              className="w-full h-full object-cover"
            />
          </div>

          <button
            onClick={() => setIsProfileModalOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative z-10">
            {/* Avatar & Edit Overlay */}
            <div className="relative group shrink-0">
              <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white/80 shadow-lg bg-stone-800">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                className="absolute -bottom-1.5 -right-1.5 bg-[#E97832] hover:bg-[#d66a27] text-white p-1.5 rounded-xl shadow-md text-xs flex items-center gap-1 transition-transform group-hover:scale-110"
                title="Ganti Foto Profil"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Info & Points */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h2 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white truncate">
                  {currentUser.name}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-gradient-to-r shadow-xs ${tierColors[currentUser.tier]}`}>
                  {currentUser.tier}
                </span>
              </div>

              <p className="text-xs text-sky-100/90 mb-2 truncate flex items-center gap-2">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span>{currentUser.city}</span>
              </p>

              {/* Rasa Poin Pill */}
              <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                <Award className="w-4 h-4 text-amber-300" />
                <span className="text-xs font-semibold text-white">
                  Rasa Poin: <strong className="font-mono text-amber-300">{currentUser.points.toLocaleString('id-ID')}</strong> Poin
                </span>
                <span className="text-[10px] text-sky-200">
                  (~{formatRupiah(currentUser.points * 10)})
                </span>
              </div>
            </div>
          </div>

          {/* Quick Account Switcher Ribbon */}
          <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] text-sky-200 uppercase tracking-wider font-bold shrink-0 flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
              Ganti Akun:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => switchUser(u.id)}
                  className={`px-2.5 py-1 rounded-lg font-medium text-[11px] transition-all shrink-0 flex items-center gap-1.5 ${
                    u.id === currentUser.id
                      ? 'bg-white text-[#001838] font-bold shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>{u.name.split(' ')[0]}</span>
                </button>
              ))}

              <button
                onClick={() => setIsAddingUser(!isAddingUser)}
                className="px-2.5 py-1 rounded-lg font-semibold text-[11px] bg-amber-400/90 hover:bg-amber-300 text-stone-900 transition-all shrink-0 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>+ Akun Baru</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content Tabs */}
        <div className="flex items-center border-b border-[#F2E5D7] bg-[#F2E5D7]/40 px-4 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-3.5 font-bold text-xs border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'profile'
                ? 'border-[#E97832] text-[#E97832]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profil & Preferensi</span>
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-3 px-3.5 font-bold text-xs border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'addresses'
                ? 'border-[#E97832] text-[#E97832]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Alamat Tersimpan ({savedAddresses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-3.5 font-bold text-xs border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'orders'
                ? 'border-[#E97832] text-[#E97832]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Riwayat Pesanan ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`py-3 px-3.5 font-bold text-xs border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'loyalty'
                ? 'border-[#E97832] text-[#E97832]'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Rasa Poin & VIP</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Avatar Selector Drawer */}
          {isEditingAvatar && (
            <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-sm space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#39271F] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#6CABDD]" />
                  <span>Pilih Avatar Eksklusif (Cityzen, Red Bull, VIP, Chef)</span>
                </h4>
                <button
                  onClick={() => setIsEditingAvatar(false)}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  Tutup
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av.id}
                    onClick={() => handleSelectAvatar(av.image)}
                    className="group relative flex flex-col items-center p-2 rounded-xl border border-stone-200 hover:border-[#6CABDD] hover:bg-sky-50 transition-all text-center"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden mb-1 ring-1 ring-stone-200 group-hover:ring-[#6CABDD]">
                      <img src={av.image} alt={av.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-semibold text-stone-800 truncate w-full">
                      {av.name}
                    </span>
                    <span className="text-[9px] text-[#E97832] font-bold">
                      {av.tag}
                    </span>
                  </button>
                ))}
              </div>

              {/* Or paste custom URL */}
              <form onSubmit={handleCustomAvatarSubmit} className="pt-2 border-t border-stone-100 flex gap-2">
                <input
                  type="url"
                  placeholder="Atau tempel link URL foto sendiri (https://...)"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#E97832]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#6CABDD] hover:bg-[#5b9ecc] text-white text-xs font-bold rounded-xl"
                >
                  Terapkan
                </button>
              </form>
            </div>
          )}

          {/* Form Create New User Drawer */}
          {isAddingUser && (
            <form onSubmit={handleCreateNewUser} className="bg-white p-4 rounded-2xl border border-amber-300 shadow-sm space-y-3 animate-fade-in">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-[#39271F] flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-[#E97832]" />
                  <span>Buat Akun Pelanggan Baru</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  Batal
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Nama Lengkap:</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Erling Haaland"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#E97832]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Kota Domisili:</label>
                  <select
                    value={newUserCity}
                    onChange={(e) => setNewUserCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#E97832] bg-white"
                  >
                    {SHIPPING_CITIES.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Nomor WhatsApp:</label>
                  <input
                    type="tel"
                    placeholder="081234567890"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#E97832]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-1">Email:</label>
                  <input
                    type="email"
                    placeholder="user@rasanusantara.id"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-hidden focus:border-[#E97832]"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E97832] hover:bg-[#d66a27] text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Simpan Akun Baru
                </button>
              </div>
            </form>
          )}

          {/* TAB 1: PROFIL & PREFERENSI */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#39271F] mb-1">
                    Nama Lengkap Akun
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#F2E5D7] bg-white text-xs font-semibold text-[#39271F] focus:outline-hidden focus:border-[#E97832]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#39271F] mb-1">
                    Kota Domisili (Otomatis untuk Tarif Ongkir)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-[#E97832]" />
                    <select
                      value={formCity}
                      onChange={(e) => setFormCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#F2E5D7] bg-white text-xs font-semibold text-[#39271F] focus:outline-hidden focus:border-[#E97832]"
                    >
                      {SHIPPING_CITIES.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#39271F] mb-1">
                    Nomor WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#F2E5D7] bg-white text-xs font-semibold text-[#39271F] focus:outline-hidden focus:border-[#E97832]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#39271F] mb-1">
                    Email Akun
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#F2E5D7] bg-white text-xs font-semibold text-[#39271F] focus:outline-hidden focus:border-[#E97832]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#39271F] mb-1">
                  Alamat Pengiriman Default
                </label>
                <textarea
                  rows={2}
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah, RT/RW, patokan..."
                  className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white text-xs text-[#39271F] focus:outline-hidden focus:border-[#E97832]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#39271F] mb-1 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-red-500" />
                    <span>Tingkat Kepedasan Favorit</span>
                  </label>
                  <select
                    value={formSpice}
                    onChange={(e) => setFormSpice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white text-xs font-semibold text-[#39271F] focus:outline-hidden focus:border-[#E97832]"
                  >
                    <option value="Tidak Pedas (Level 0)">Tidak Pedas (Level 0)</option>
                    <option value="Pedas Ringan (Level 1)">Pedas Ringan (Level 1)</option>
                    <option value="Pedas Sedang (Level 2)">Pedas Sedang (Level 2)</option>
                    <option value="Pedas Mantap (Level 3)">Pedas Mantap (Level 3 - Extra Rawit)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#39271F] mb-1">
                    Bio Singkat Penikmat Kuliner
                  </label>
                  <input
                    type="text"
                    value={formBio}
                    onChange={(e) => setFormBio(e.target.value)}
                    placeholder="Suka pedas & rempah Minang..."
                    className="w-full px-3 py-2 rounded-xl border border-[#F2E5D7] bg-white text-xs text-[#39271F] focus:outline-hidden focus:border-[#E97832]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#F2E5D7]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] text-stone-500">
                    Tersimpan lokal di browser (Aman & Privat)
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#E97832] hover:bg-[#d66a27] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan Profil</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ALAMAT TERSIMPAN */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-600">
                  Pilih alamat pengiriman untuk memudahkan checkout dan kalkulasi ongkir <strong>Rp 5.000 / KM</strong>.
                </p>
                <button
                  onClick={() => setIsAddingAddress(!isAddingAddress)}
                  className="px-3 py-1.5 bg-[#E97832] hover:bg-[#d66a27] text-white text-xs font-bold rounded-xl flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Alamat</span>
                </button>
              </div>

              {isAddingAddress && (
                <form onSubmit={handleCreateAddress} className="p-4 bg-white rounded-2xl border border-amber-300 shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-[#39271F]">Form Alamat Baru</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-0.5">Label (Contoh: Rumah, Kantor):</label>
                      <input
                        type="text"
                        required
                        value={newAddrLabel}
                        onChange={(e) => setNewAddrLabel(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-0.5">Nama Penerima:</label>
                      <input
                        type="text"
                        required
                        value={newAddrReceiver}
                        onChange={(e) => setNewAddrReceiver(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-stone-600 mb-0.5">Kota:</label>
                      <select
                        value={newAddrCity}
                        onChange={(e) => setNewAddrCity(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 bg-white"
                      >
                        {SHIPPING_CITIES.map((c) => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-stone-600 mb-0.5">Alamat Lengkap:</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="Nama jalan, nomor, RT/RW, gedung, patokan..."
                      value={newAddrFull}
                      onChange={(e) => setNewAddrFull(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-stone-200 text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-500"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 bg-[#E97832] text-white rounded-lg text-xs font-bold"
                    >
                      Simpan Alamat
                    </button>
                  </div>
                </form>
              )}

              <div className="space-y-2.5">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-2xl bg-white border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      addr.isDefault
                        ? 'border-[#E97832] ring-1 ring-[#E97832]/30 bg-[#FFF8EF]/50'
                        : 'border-[#F2E5D7] hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#39271F] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#E97832]" />
                          {addr.label}
                        </span>
                        {addr.isDefault ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E97832] text-white">
                            Alamat Utama
                          </span>
                        ) : (
                          <button
                            onClick={() => setDefaultAddress(addr.id)}
                            className="text-[10px] text-[#E97832] font-semibold hover:underline"
                          >
                            Jadikan Utama
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-stone-700 font-medium">
                        {addr.receiverName} ({addr.phone})
                      </p>
                      <p className="text-xs text-stone-500 leading-relaxed">
                        {addr.fullAddress} • <strong>{addr.city}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => deleteSavedAddress(addr.id)}
                        disabled={addr.isDefault}
                        className={`p-2 rounded-xl text-stone-400 hover:text-red-600 transition-colors ${
                          addr.isDefault ? 'opacity-30 cursor-not-allowed' : 'hover:bg-red-50'
                        }`}
                        title="Hapus Alamat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RIWAYAT PESANAN */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600">
                  Daftar transaksi dan pengiriman kuliner kamu:
                </span>
                <span className="text-xs font-bold text-[#E97832]">
                  {orders.length} Pesanan Tercatat
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-stone-200">
                  <p className="text-xs text-stone-500">Belum ada riwayat pesanan.</p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.orderId}
                    className="p-4 rounded-2xl bg-white border border-[#F2E5D7] space-y-2.5 shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#39271F]">
                          #{ord.orderId}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {ord.timestamp}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800">
                        {ord.status}
                      </span>
                    </div>

                    <div className="text-xs text-stone-700 divide-y divide-stone-100">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="py-1 flex justify-between">
                          <span>
                            {item.quantity}x {item.product.name}
                          </span>
                          <span className="font-mono text-stone-600">
                            {formatRupiah(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                      <div className="text-[11px] text-stone-500">
                        Total: <strong className="font-mono text-sm text-[#E97832]">{formatRupiah(ord.total)}</strong>
                      </div>
                      <button
                        onClick={() => {
                          ord.items.forEach((it) => addToCart(it.product, it.quantity));
                          setIsProfileModalOpen(false);
                          setIsCartOpen(true);
                          showToast('Item pesanan telah dimasukkan kembali ke keranjang!', 'success');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#FFF8EF] border border-[#E97832] text-[#E97832] hover:bg-[#E97832] hover:text-white text-xs font-bold transition-colors"
                      >
                        Pesan Ulang
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: RASA POIN & VIP CLUB */}
          {activeTab === 'loyalty' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#001838] via-[#1C2C5E] to-[#6CABDD] text-white space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-200 tracking-wider">
                      Membership Status
                    </span>
                    <h3 className="text-lg font-serif font-black">{currentUser.tier}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-sky-200 tracking-wider">
                      Saldo Rasa Poin
                    </span>
                    <div className="text-xl font-mono font-black text-amber-300">
                      {currentUser.points.toLocaleString('id-ID')}
                    </div>
                  </div>
                </div>

                {/* Progress bar towards next level */}
                <div className="space-y-1 relative z-10">
                  <div className="flex justify-between text-[10px] text-sky-100">
                    <span>Progress Menuju Status Legendaris</span>
                    <span>{currentUser.points >= 10000 ? 'Maksimal (Elite Tier)' : `${currentUser.points} / 10.000 Poin`}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-[#E97832] rounded-full"
                      style={{ width: `${Math.min(100, (currentUser.points / 10000) * 100)}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-sky-100/80 relative z-10">
                  💡 <strong>Keuntungan Anggota:</strong> Setiap transaksi senilai Rp 1.000 menghasilkan 1 Rasa Poin. Tukarkan poin saat checkout untuk potongan harga langsung!
                </p>
              </div>

              {/* Tier Privileges Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-[#F2E5D7] space-y-1.5">
                  <span className="text-xs font-bold text-stone-700">Silver Foodie</span>
                  <p className="text-[11px] text-stone-500">
                    Kupon diskon ongkir bulanan dan welcome reward 500 Poin.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-amber-300 bg-amber-50/20 space-y-1.5">
                  <span className="text-xs font-bold text-amber-700">Gold Epicurean</span>
                  <p className="text-[11px] text-stone-500">
                    Prioritas antrian dapur resto dan cashback 5% tiap order.
                  </p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#6CABDD] bg-sky-50/30 space-y-1.5">
                  <span className="text-xs font-bold text-[#001838]">Platinum Cityzen VIP</span>
                  <p className="text-[11px] text-stone-500">
                    Akses menu rahasia chef modern, gratis ongkir, dan poin ganda!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
