import React from 'react';
import { heroMochiImg } from '@/src/data/mochiData';
import { MapPin, Sparkles, ShoppingBag, ArrowDown, ShieldAlert } from 'lucide-react';

interface HeroSectionProps {
  onOpenPlanner: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenPlanner }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#180d07] via-[#24140C] to-[#2c170d] text-[#FDFBF7] pt-8 pb-20 sm:pb-28">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Copywriting & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Live Location Tag */}
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-[#F3E5AB]">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="font-semibold">잠실 롯데월드몰 B1F 단독 팝업 부티크</span>
            </div>

            {/* Main Catchphrase */}
            <div className="space-y-2">
              <p className="font-serif-luxury text-lg sm:text-xl md:text-2xl text-[#D4AF37] tracking-wider italic font-light">
                &ldquo;기다림의 가치가 있는 단 하나의 디저트&rdquo;
              </p>
              <h1 className="font-brand text-4xl sm:text-5xl md:text-6xl font-bold tracking-[0.08em] text-[#FDFBF7] uppercase leading-tight">
                GODIVA <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFF2A3] to-[#D4AF37] bg-clip-text text-transparent">
                  MOCHI COLLECTION
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              100년 전통 벨기에 프리미엄 초콜릿 가나슈와 매일 아침 빚어낸 쫄깃한 찹쌀떡,
              그리고 당일 새벽 공수한 신선한 생과일이 빚어내는 황홀한 미식의 순간을 경험해 보세요.
            </p>

            {/* Key Value Points Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="bg-[#1a0e08]/80 border border-[#D4AF37]/20 p-2.5 rounded-xl">
                <p className="text-[11px] text-[#D4AF37]">시그니처 과일</p>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">국내산 생딸기 통사용</p>
              </div>
              <div className="bg-[#1a0e08]/80 border border-[#D4AF37]/20 p-2.5 rounded-xl">
                <p className="text-[11px] text-[#D4AF37]">가나슈 베이스</p>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">벨기에 72% 다크초콜릿</p>
              </div>
              <div className="col-span-2 sm:col-span-1 bg-[#1a0e08]/80 border border-[#D4AF37]/20 p-2.5 rounded-xl">
                <p className="text-[11px] text-[#D4AF37]">선물 패키징</p>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">4구 골드리본 박스</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenPlanner}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B89326] text-[#24140C] font-bold text-sm sm:text-base px-7 py-3.5 rounded-full shadow-xl shadow-[#D4AF37]/25 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-5 h-5 text-[#24140C]" />
                <span>나만의 4구 박스 플래너 열기</span>
              </button>

              <a
                href="#menu-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-stone-900/80 border border-[#D4AF37]/40 text-[#FDFBF7] font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full hover:bg-stone-800 transition-colors"
              >
                <span>실제 메뉴 & 가격 보기</span>
                <ArrowDown className="w-4 h-4 text-[#D4AF37]" />
              </a>
            </div>

            {/* Warning Note */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs text-amber-200/80">
              <ShieldAlert className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>백화점 내 고디바 베이커리가 아닌, <strong>월드몰 지하 1층 본매장</strong> 방문 필수</span>
            </div>

          </div>

          {/* Right Column: Hero Real Mochi Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#D4AF37]/40 via-amber-600/30 to-[#D4AF37]/40 rounded-3xl blur-md opacity-70"></div>
              
              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-2xl bg-black">
                <img
                  src={heroMochiImg}
                  alt="고디바 다크 초콜릿 딸기 모찌 단면 실사"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual Overlay Tag */}
                <div className="absolute top-4 left-4 bg-[#24140C]/90 backdrop-blur-md border border-[#D4AF37]/50 rounded-lg px-3 py-1.5 text-xs text-[#F3E5AB] shadow-lg">
                  <span className="font-semibold">실제 제품 단면</span> · 가나슈 & 생딸기
                </div>

                {/* Bottom Card Caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#180d07] via-[#180d07]/80 to-transparent p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-[#D4AF37] font-medium tracking-wider uppercase">Signature Highlight</p>
                      <h4 className="font-serif-luxury text-lg sm:text-xl font-bold">다크 초콜릿 생딸기 모찌</h4>
                    </div>
                    <span className="text-base sm:text-lg font-bold text-[#F3E5AB]">8,500원</span>
                  </div>
                  <p className="text-xs text-stone-300 mt-1 line-clamp-1">
                    신선한 과즙과 72% 가나슈가 터져 나오는 극상의 밸런스
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
