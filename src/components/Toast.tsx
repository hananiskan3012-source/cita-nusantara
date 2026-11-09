import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#FFF8EF] border-[#66734B]/30 text-[#39271F]'
              : toast.type === 'warning'
              ? 'bg-[#FFF8EF] border-[#E97832]/30 text-[#39271F]'
              : 'bg-[#FFF8EF] border-[#F2E5D7] text-[#39271F]'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#66734B]" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-[#E97832]" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#39271F]" />}
          </div>
          <div className="flex-1 text-sm font-medium leading-snug">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-stone-700 p-0.5 rounded transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
