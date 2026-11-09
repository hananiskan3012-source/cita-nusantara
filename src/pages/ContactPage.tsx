import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, storeSettings } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Pertanyaan Menu / Pesanan');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast('Harap lengkapi semua kolom bertanda bintang.', 'warning');
      return;
    }

    setSubmitted(true);
    showToast('Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda.', 'success');

    // Reset form after short delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const faqs = [
    {
      q: 'Apakah RASA NUSANTARA menerima pesanan nasi kotak / catering kantor?',
      a: 'Tentu saja! Kami melayani pesanan catering dalam jumlah besar untuk rapat kantor, syukuran, arisan, hingga acara pernikahan. Mohon lakukan pemesanan minimal H-1 via WhatsApp kami.',
    },
    {
      q: 'Berapa lama estimasi pengantaran makanan sampai di tempat?',
      a: 'Rata-rata waktu pengantaran berkisar antara 30 hingga 45 menit tergantung jarak lokasi tujuan Anda dari outlet kami di Kebayoran Baru.',
    },
    {
      q: 'Bagaimana cara mendapatkan Gratis Ongkir?',
      a: `Cukup belanja dengan nilai subtotal minimal Rp ${storeSettings.freeShippingThreshold.toLocaleString('id-ID')}, maka potongan ongkos kirim akan otomatis teraplikasikan di keranjang belanja Anda.`,
    },
    {
      q: 'Apakah makanan menggunakan bahan pengawet atau MSG buatan berlebih?',
      a: 'Tidak. Seluruh masakan kami mengandalkan kedalaman rasa dari bawang, kemiri, serai, jahe, dan rempah alami nusantara tanpa pengawet sintetik.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#E97832] uppercase tracking-wider">
          Hubungi Kami
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#39271F]">
          Kami Selalu Siap Mendengar Anda
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Punya pertanyaan seputar menu, kerjasama katering, atau ingin memberikan masukan rasa? Silakan hubungi kami kapan saja.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Info & Map Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#F2E5D7] shadow-sm space-y-5">
            <h3 className="font-serif text-lg font-bold text-[#39271F]">
              Informasi Outlet & Customer Care
            </h3>

            <div className="space-y-4 text-xs text-stone-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-[#E97832] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#39271F] font-semibold mb-0.5">Alamat Resto & Dapur:</strong>
                  <span>{storeSettings.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-[#66734B] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#39271F] font-semibold mb-0.5">Hotline WhatsApp:</strong>
                  <a
                    href={`https://wa.me/${storeSettings.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E97832] hover:underline font-mono"
                  >
                    +{storeSettings.whatsappNumber} (Respon Cepat)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-[#39271F] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#39271F] font-semibold mb-0.5">Email Layanan:</strong>
                  <span>{storeSettings.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF8EF] border border-[#F2E5D7] flex items-center justify-center text-[#E97832] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[#39271F] font-semibold mb-0.5">Jam Buka Resto & Dapur:</strong>
                  <span>{storeSettings.openingHours}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${storeSettings.whatsappNumber}?text=Halo%20RASA%20NUSANTARA,%20saya%20ingin%20tanya%20informasi`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#66734B] hover:bg-[#586440] text-white text-xs font-bold rounded-xl shadow transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Langsung ke WhatsApp Admin</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Card */}
          <div className="bg-white p-4 rounded-3xl border border-[#F2E5D7] shadow-sm overflow-hidden">
            <div className="aspect-[16/9] w-full bg-[#F2E5D7] rounded-2xl relative overflow-hidden flex items-center justify-center border border-[#F2E5D7]">
              {/* Map Graphic Mockup */}
              <div className="text-center p-6 space-y-2">
                <div className="w-12 h-12 bg-[#E97832] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#39271F]">
                  Outlet RASA NUSANTARA
                </h4>
                <p className="text-[11px] text-stone-600 max-w-xs">
                  Kebayoran Baru, Jakarta Selatan (Dekat Gandaria & Senopati)
                </p>
                <a
                  href="https://maps.google.com/?q=Kebayoran+Baru+Jakarta"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-2 text-[11px] text-[#E97832] font-bold hover:underline"
                >
                  Buka di Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#F2E5D7] shadow-sm">
            <h3 className="font-serif text-xl font-bold text-[#39271F] mb-1">
              Kirim Pesan / Permintaan Kerjasama
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Isi formulir di bawah ini dan tim customer service kami akan membalas via WhatsApp atau Email dalam 1x24 jam.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-[#FFF8EF] rounded-2xl border border-[#F2E5D7] p-6">
                <CheckCircle2 className="w-12 h-12 text-[#66734B] mx-auto" />
                <h4 className="font-serif text-lg font-bold text-[#39271F]">
                  Pesan Terkirim dengan Sukses!
                </h4>
                <p className="text-xs text-stone-600 max-w-md mx-auto">
                  Terima kasih sudah menghubungi RASA NUSANTARA. Kami sangat menghargai pesan Anda dan akan merespon secepatnya.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama Anda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Contoh: 08123456789"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Alamat Email (Opsional)
                    </label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Keperluan / Topik
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] text-[#39271F] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                    >
                      <option value="Pertanyaan Menu / Pesanan">Pertanyaan Menu / Pesanan</option>
                      <option value="Pesanan Katering / Nasi Kotak">Pesanan Katering / Nasi Kotak</option>
                      <option value="Kerjasama Bisnis / Reseller">Kerjasama Bisnis / Reseller</option>
                      <option value="Masukan & Kritik Rasa">Masukan & Kritik Rasa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Isi Pesan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tuliskan pesan, rincian katering acara, atau pertanyaan Anda di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F2E5D7] bg-[#FFF8EF] focus:outline-none focus:ring-2 focus:ring-[#E97832]/30 focus:border-[#E97832]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 bg-[#E97832] hover:bg-[#D66723] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Formulir Pesan</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center gap-2 text-stone-700">
          <HelpCircle className="w-5 h-5 text-[#E97832]" />
          <h2 className="font-serif text-2xl font-bold text-[#39271F]">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-[#F2E5D7] space-y-2 shadow-sm"
            >
              <h3 className="font-serif text-sm font-bold text-[#39271F]">
                {faq.q}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
