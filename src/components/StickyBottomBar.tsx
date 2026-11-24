import React from 'react';
import { MapPin, ShoppingBag, ShoppingCart } from 'lucide-react';

interface StickyBottomBarProps {
  onOpenPlanner: () => void;
  cartCount: number;
  onOpenGeneralCart: () => void;
  generalCartCount: number;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  onOpenPlanner,
  cartCount,
  onOpenGeneralCart,
  generalCartCount,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#24140C]/95 backdrop-blur-md border-t border-[#D4AF37]/40 py-2.5 px-3 sm:px-4 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-3">

        {/* Left: Live Stock & Waiting Status button */}
        <a
          href="#live-status"
          className="hidden sm:flex items-center gap-2 text-stone-300 hover:text-white transition-colors text-xs py-2 px-3 rounded-xl bg-stone-900/80 border border-stone-700/80 shrink-0 whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>오늘의 잔여 수량 &amp; 대기 현황</span>
        </a>

        {/* Center: Map Directions */}
        <a
          href="#store-location"
          className="hidden lg:flex items-center gap-1.5 text-stone-300 hover:text-[#D4AF37] transition-colors text-xs py-2 px-3 rounded-xl hover:bg-stone-800 whitespace-nowrap"
        >
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>매장 찾아가기 (잠실 월드몰 B1F)</span>
        </a>

        {/* Right CTAs: General Cart + 4-Piece Mochi Box */}
        <div className="flex flex-1 sm:flex-initial items-center gap-2">
          <button
            onClick={onOpenGeneralCart}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-[#180d07] border border-[#D4AF37]/60 text-[#F3E5AB] font-bold text-xs sm:text-sm py-2.5 px-3.5 sm:px-4 rounded-full hover:bg-[#3a2012] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingCart className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>전체 메뉴 담기</span>
            {generalCartCount > 0 && (
              <span className="bg-[#D4AF37] text-[#24140C] text-xs font-black min-w-5 h-5 px-1 rounded-full flex items-center justify-center tabular-nums">
                {generalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenPlanner}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B89326] text-[#24140C] font-bold text-xs sm:text-sm py-2.5 px-3.5 sm:px-4 rounded-full shadow-lg shadow-[#D4AF37]/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <ShoppingBag className="w-4 h-4 text-[#24140C] shrink-0" />
            <span>4구 모찌 박스</span>
            {cartCount > 0 && (
              <span className="bg-[#24140C] text-[#D4AF37] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
