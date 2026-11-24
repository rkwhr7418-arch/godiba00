import React from 'react';
import { giftBoxImg, MochiItem } from '@/src/data/mochiData';
import { Gift, Check, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

interface GiftPackageSectionProps {
  onOpenPlanner: () => void;
  selectedMochis: MochiItem[];
  includeGiftBox: boolean;
  onToggleGiftBox: () => void;
}

export const GiftPackageSection: React.FC<GiftPackageSectionProps> = ({
  onOpenPlanner,
  selectedMochis,
  includeGiftBox,
  onToggleGiftBox,
}) => {
  return (
    <section id="gift-package" className="py-16 sm:py-24 bg-[#1f1009] text-[#FDFBF7] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Luxury Gift Box Image */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl bg-black group">
                <img
                  src={giftBoxImg}
                  alt="고디바 4구 모찌 기프트 박스 패키지 실사"
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#180d07] via-transparent to-transparent opacity-80"></div>
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-[#24140C]/90 backdrop-blur-md border border-[#D4AF37]/60 text-[#F3E5AB] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>4개입 전용 시그니처 패키지</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#D4AF37] font-semibold">PREMIUM GIFT OPTION</p>
                      <h4 className="font-serif-luxury text-xl font-bold">골드 리본 하드 케이스 + 쇼핑백</h4>
                    </div>
                    <span className="text-xl font-bold text-[#F3E5AB]">+2,500원</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Gift Packaging Details & 4-Slot Preview */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gift Packaging Experience</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#FDFBF7]">
                소중한 분을 위한 <br />
                <span className="text-[#D4AF37]">프리미엄 4구 선물 패키지</span>
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                정교한 골드 로고 엠보싱 하드 박스와 장인의 손길로 묶은 골드 새틴 리본,
                그리고 고급스러운 고디바 쇼핑백을 함께 제공해 드립니다.
              </p>
            </div>

            {/* Packaging Highlights */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-[#2a170d] border border-[#D4AF37]/20 p-3.5 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-sm">4개입 맞춤형 개별 보관 몰드</h5>
                  <p className="text-xs text-stone-300 mt-0.5">이동 중 떡 모양이 흐트러지지 않도록 단단하게 지지해 줍니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#2a170d] border border-[#D4AF37]/20 p-3.5 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-sm">고디바 시그니처 쇼핑백 동봉</h5>
                  <p className="text-xs text-stone-300 mt-0.5">선물 전달 시 별도 포장 없이 바로 품격 있는 전달이 가능합니다.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-[#2a170d] border border-[#D4AF37]/20 p-3.5 rounded-xl">
                <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-semibold text-white text-sm">신선도 유지를 위한 미니 보냉 아이스팩</h5>
                  <p className="text-xs text-stone-300 mt-0.5">여름철 및 대중교통 이동 시에도 초콜릿 텍스처를 유지해 줍니다.</p>
                </div>
              </div>
            </div>

            {/* 4 Slots Preview in Box */}
            <div className="bg-[#180d07] border border-[#D4AF37]/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-stone-400">내 4구 박스 슬롯 현황:</span>
                <span className="text-[#D4AF37] font-semibold">{selectedMochis.length} / 4개 채워짐</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((slotIdx) => {
                  const item = selectedMochis[slotIdx];
                  return (
                    <div
                      key={slotIdx}
                      className={`aspect-square rounded-lg border flex flex-col items-center justify-center p-1 text-center transition-all ${
                        item
                          ? 'border-[#D4AF37] bg-stone-900 shadow-sm'
                          : 'border-dashed border-stone-700 bg-stone-900/40 text-stone-600'
                      }`}
                    >
                      {item ? (
                        <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]/50 mb-1"
                          />
                          <p className="text-[10px] font-semibold text-white line-clamp-1 px-1">
                            {item.name.replace(' 모찌', '')}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[11px] font-mono text-stone-500">
                          {slotIdx + 1}구 빈자리
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onOpenPlanner}
                className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B89326] text-[#24140C] font-bold text-sm py-3.5 px-6 rounded-full hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D4AF37]/20"
              >
                <ShoppingBag className="w-4 h-4 text-[#24140C]" />
                <span>선물 박스 구성 &amp; 가격 계산하기</span>
                <ArrowRight className="w-4 h-4 text-[#24140C]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
