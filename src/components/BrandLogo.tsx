import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
  badgeStyle?: 'image' | 'vector';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-[#39271F]',
  subtextColor = 'text-[#6CABDD]',
}) => {
  // Dimension maps
  const sizeMap = {
    xs: { dim: 'w-7 h-7', text: 'text-sm', sub: 'text-[9px]', subHide: true },
    sm: { dim: 'w-9 h-9', text: 'text-base', sub: 'text-[10px]', subHide: false },
    md: { dim: 'w-11 h-11', text: 'text-lg', sub: 'text-[10px]', subHide: false },
    lg: { dim: 'w-16 h-16', text: 'text-xl', sub: 'text-xs', subHide: false },
    xl: { dim: 'w-24 h-24', text: 'text-2xl', sub: 'text-sm', subHide: false },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Manchester City Roundel Crest x Red Bull Charging Bulls Emblem */}
      <div className={`relative shrink-0 ${current.dim} rounded-full overflow-hidden shadow-md ring-2 ring-[#6CABDD]/50 group`}>
        {/* High resolution generated crest with Man City sky blue ring, golden sailing ship, and dual charging Red Bulls */}
        <img
          src="/assets/images/brand_logo_mancity_redbull_1794210686507.jpg"
          alt="Rasa Nusantara - Man City x Red Bull Inspired Crest"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            // Fallback to SVG if image loading fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Dynamic glossy border overlay */}
        <div className="absolute inset-0 rounded-full border border-amber-300/40 pointer-events-none" />
      </div>

      {showText && (
        <div className="leading-tight flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-serif font-black tracking-tight ${textColor} ${current.text}`}>
              RASA NUSANTARA
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-[#6CABDD] to-[#DE0029] text-white shadow-xs">
              CITY × BULL
            </span>
          </div>
          {!current.subHide && (
            <span className={`text-[10px] tracking-wider uppercase font-semibold ${subtextColor} flex items-center gap-1`}>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6CABDD]" />
              Authentic Heritage & Modern Taste
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DE0029]" />
            </span>
          )}
        </div>
      )}
    </div>
  );
};
