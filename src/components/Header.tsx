import React from 'react';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  onOpenPlanner: () => void;
  cartCount: number;
  onOpenGeneralCart: () => void;
  generalCartCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPlanner,
  cartCount,
  onOpenGeneralCart,
  generalCartCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#24140C]/98 backdrop-blur-md border-b border-[#D4AF37]/30 text-[#FDFBF7] transition-all duration-300">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#180d07] via-[#3a2012] to-[#180d07] py-1.5 px-4 text-center border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-xs md:text-sm font-medium text-[#F3E5AB] whitespace-nowrap overflow-x-auto no-scrollbar">
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0"></span>
          <span className="font-semibold text-white shrink-0">[잠실 롯데월드몰 지하 1층 단독 판매]</span>
          <span className="hidden sm:inline text-[#D4AF37]/70 shrink-0">|</span>
          <span className="hidden sm:inline text-amber-200/90 shrink-0">1인 구매 수량 최대 4개(1박스) 제한 운영 중</span>
        </div>
      </div>

      {/* Main Navigation Bar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex flex-col items-start group shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-brand text-xl sm:text-2xl lg:text-3xl font-bold tracking-[0.25em] text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors whitespace-nowrap">
              GODIVA
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-widest text-amber-200/60 uppercase border border-[#D4AF37]/40 px-1.5 py-0.2 rounded whitespace-nowrap">
              Boutique
            </span>
          </div>
          <span className="font-serif-luxury text-[10px] sm:text-xs tracking-[0.2em] text-stone-300 font-light whitespace-nowrap">
            MOCHI COLLECTION · 잠실점
          </span>
        </a>

        {/* Desktop Nav Links (xl+ full inline single line) */}
        <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-xs 2xl:text-sm font-medium text-stone-200 whitespace-nowrap flex-nowrap">
          <a
            href="#live-status"
            className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap py-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            <span>실시간 현황</span>
          </a>
          <a
            href="#menu-section"
            className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
          >
            메뉴&amp;가격표
          </a>
          <a
            href="#gift-package"
            className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
          >
            선물 패키지
          </a>
          <a
            href="#waiting-guide"
            className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
          >
            웨이팅 시크릿
          </a>
          <a
            href="#alternative-guide"
            className="hover:text-[#D4AF37] transition-colors text-amber-200/90 flex items-center gap-1 shrink-0 whitespace-nowrap py-1"
          >
            <span>품절 시 대체 플랜</span>
            <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold">Plan B</span>
          </a>
          <a
            href="#store-location"
            className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
          >
            매장 위치&amp;길찾기
          </a>
          <a
            href="#faq"
            className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
          >
            FAQ
          </a>
        </nav>

        {/* Action Buttons: General Cart + Mochi Box */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenGeneralCart}
            className="relative flex items-center gap-1.5 bg-[#180d07] border border-[#D4AF37]/60 text-[#F3E5AB] font-semibold text-xs sm:text-sm px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full hover:bg-[#3a2012] hover:border-[#D4AF37] active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">전체 메뉴 담기</span>
            <span className="md:hidden whitespace-nowrap">전체 담기</span>
            {generalCartCount > 0 && (
              <span className="bg-[#D4AF37] text-[#24140C] text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center ml-0.5 shrink-0 tabular-nums">
                {generalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenPlanner}
            className="relative flex items-center gap-1.5 bg-gradient-to-r from-[#D4AF37] to-[#B89326] text-[#24140C] font-semibold text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-lg shadow-[#D4AF37]/20 hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#24140C] shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">나만의 모찌 박스 담기</span>
            <span className="md:hidden whitespace-nowrap">박스 담기</span>
            {cartCount > 0 && (
              <span className="bg-[#24140C] text-[#D4AF37] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-0.5 shrink-0 tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sub Menu Bar for screens under xl (tablets & mobile): GUARANTEED Single Horizontal Line with VISIBLE bottom scrollbar */}
      <div className="xl:hidden bg-[#180d07] border-t border-[#D4AF37]/30 px-3 sm:px-4 pt-2 pb-1.5 shadow-inner">
        <div className="overflow-x-auto nav-scrollbar pb-2 touch-pan-x cursor-grab active:cursor-grabbing">
          <nav className="flex items-center justify-start sm:justify-center gap-3.5 sm:gap-5 text-xs sm:text-[13px] font-medium text-stone-200 whitespace-nowrap flex-nowrap min-w-max px-2">
            <a
              href="#live-status"
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 shrink-0 whitespace-nowrap py-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              <span>실시간 현황</span>
            </a>
            <span className="text-stone-700 select-none">·</span>
            <a
              href="#menu-section"
              className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
            >
              메뉴&amp;가격표
            </a>
            <span className="text-stone-700 select-none">·</span>
            <a
              href="#gift-package"
              className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
            >
              선물 패키지
            </a>
            <span className="text-stone-700 select-none">·</span>
            <a
              href="#waiting-guide"
              className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
            >
              웨이팅 시크릿
            </a>
            <span className="text-stone-700 select-none">·</span>
            <a
              href="#alternative-guide"
              className="hover:text-[#D4AF37] transition-colors text-amber-200/90 flex items-center gap-1 shrink-0 whitespace-nowrap py-1"
            >
              <span>품절 시 대체 플랜</span>
              <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold">Plan B</span>
            </a>
            <span className="text-stone-700 select-none">·</span>
            <a
              href="#store-location"
              className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
            >
              매장 위치&amp;길찾기
            </a>
            <span className="text-stone-700 select-none">·</span>
            <a
              href="#faq"
              className="hover:text-[#D4AF37] transition-colors shrink-0 whitespace-nowrap py-1"
            >
              FAQ
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
