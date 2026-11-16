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
    sm: { dim: 'w-8 h-8 sm:w-9 sm:h-9', text: 'text-sm sm:text-base', sub: 'text-[10px]', subHide: false },
    md: { dim: 'w-9 h-9 sm:w-11 sm:h-11', text: 'text-sm sm:text-lg', sub: 'text-[10px]', subHide: false },
    lg: { dim: 'w-12 h-12 sm:w-16 sm:h-16', text: 'text-lg sm:text-xl', sub: 'text-xs', subHide: false },
    xl: { dim: 'w-20 h-20 sm:w-24 sm:h-24', text: 'text-xl sm:text-2xl', sub: 'text-sm', subHide: false },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-2 sm:gap-2.5 min-w-0 ${className}`}>
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
        <div className="leading-tight flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`font-serif font-black tracking-tight truncate ${textColor} ${current.text}`}>
              RASA NUSANTARA
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-gradient-to-r from-[#6CABDD] to-[#DE0029] text-white shadow-xs shrink-0">
              CITY × BULL
            </span>
          </div>
          {!current.subHide && (
            <span className={`hidden sm:flex text-[10px] tracking-wider uppercase font-semibold ${subtextColor} items-center gap-1 truncate`}>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#6CABDD] shrink-0" />
              <span className="truncate">Authentic Heritage & Modern Taste</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#DE0029] shrink-0" />
            </span>
          )}
        </div>
      )}
    </div>
  );
};
