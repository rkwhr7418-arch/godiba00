import React from 'react';
import { WAITING_STEPS } from '@/src/data/mochiData';
import { Clock, ShieldAlert, CheckCircle2, Flame, MapPin, Sparkles, AlertTriangle } from 'lucide-react';

export const WaitingAndBuyingGuide: React.FC = () => {
  return (
    <section id="waiting-guide" className="py-16 sm:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#8B6E14] text-xs font-semibold tracking-widest uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>Smart Purchase & Waiting Secrets</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24140C]">
            웨이팅 시크릿 &amp; 구매 가이드
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            헛걸음 없이 가장 빠르고 편하게 고디바 모찌를 만나는 4단계 팁과 주의사항입니다.
          </p>
        </div>

        {/* ⚠️ CRITICAL NOTICE BOX: World Mall vs Department Store */}
        <div className="max-w-4xl mx-auto mt-10 bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-5 sm:p-7 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div className="space-y-3 flex-1">
              <div>
                <h4 className="font-bold text-amber-950 text-base sm:text-lg flex items-center gap-2">
                  <span>방문 전 필수 확인: 롯데백화점 고디바 베이커리와 혼동 주의!</span>
                </h4>
                <p className="text-xs sm:text-sm text-amber-900/90 mt-1 leading-relaxed">
                  잠실에는 고디바 매장이 2곳 있습니다. <strong>수제 초콜릿 찹쌀떡(모찌)</strong>은 오직 <strong>롯데월드몰 지하 1층 고디바 본매장</strong>에서만 단독 판매합니다.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 text-emerald-950">
                  <div className="font-bold text-emerald-800 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>[구매 장소] 롯데월드몰 지하 1층 고디바</span>
                  </div>
                  <p className="text-stone-700">
                    왕관 분수대 인근 본매장 (초콜릿 모찌 9종 전 라인업 판매)
                  </p>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-rose-950">
                  <div className="font-bold text-rose-800 flex items-center gap-1 mb-1">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>[주의] 롯데백화점 잠실점 고디바 베이커리</span>
                  </div>
                  <p className="text-stone-700">
                    백화점 식품관 매장 (크루아상·소라빵 등 베이커리 위주, 모찌 미판매)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Step Visual Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {WAITING_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-[#D4AF37] transition-all flex flex-col justify-between space-y-4 relative group"
            >
              {/* Step indicator */}
              <div className="flex items-center justify-between">
                <span className="font-brand text-3xl font-bold text-[#D4AF37] group-hover:text-[#B89326] transition-colors">
                  {step.step}
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#24140C] text-[#F3E5AB]">
                  {step.badge}
                </span>
              </div>

              {/* Title & Timing */}
              <div>
                <h4 className="font-serif-luxury text-lg font-bold text-[#24140C]">
                  {step.title}
                </h4>
                <p className="text-xs text-[#8B6E14] font-semibold mt-1">
                  권장 시간: {step.time}
                </p>
                <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Step connector indicator for desktop */}
              <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>체크포인트 0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Open-run Secrets & Tips Card */}
        <div className="mt-12 bg-gradient-to-r from-[#24140C] via-[#2d180e] to-[#24140C] text-stone-100 rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/40 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-rose-400 animate-pulse" />
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#FDFBF7]">
              실제 방문객들이 전하는 특급 웨이팅 팁 (FAQ)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-stone-300">
            <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800 space-y-2">
              <span className="text-xs font-bold text-[#D4AF37]">TIP 01</span>
              <h5 className="font-bold text-white text-sm">오픈런 시간대 (10:20 ~ 11:00)</h5>
              <p className="text-xs text-stone-400 leading-relaxed">
                롯데월드몰 오픈 시간인 10:30에 맞춰 가시면 대기 5~10팀 내외로 가장 여유롭게 원하시는 전 품목을 구매하실 수 있습니다.
              </p>
            </div>

            <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800 space-y-2">
              <span className="text-xs font-bold text-[#D4AF37]">TIP 02</span>
              <h5 className="font-bold text-white text-sm">번호표 수령 후 몰 내 자유 쇼핑</h5>
              <p className="text-xs text-stone-400 leading-relaxed">
                키오스크에 번호를 등록하면 카카오 알림톡으로 실시간 순번이 전송됩니다. 5팀 전 알림이 올 때까지 롯데월드몰 지하 1층 상점을 편안하게 구경하세요.
              </p>
            </div>

            <div className="bg-stone-900/70 p-4 rounded-xl border border-stone-800 space-y-2">
              <span className="text-xs font-bold text-[#D4AF37]">TIP 03</span>
              <h5 className="font-bold text-white text-sm">1인 수량 제한 철저 준수</h5>
              <p className="text-xs text-stone-400 leading-relaxed">
                수제 특성상 1인 최대 4개(또는 8개) 구매 수량 제한이 있습니다. 친구나 가족과 함께 오시면 인원수만큼 넉넉하게 박스를 구매하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
