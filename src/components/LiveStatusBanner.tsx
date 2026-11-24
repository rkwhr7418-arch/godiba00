import React, { useState } from 'react';
import { Clock, Users, AlertTriangle, RefreshCw, CheckCircle2, ChevronRight, ShieldCheck } from 'lucide-react';

export const LiveStatusBanner: React.FC = () => {
  const [waitingTeams, setWaitingTeams] = useState(14);
  const [estWaitMinutes, setEstWaitMinutes] = useState(25);
  const [lastUpdated, setLastUpdated] = useState('방금 전');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate minor fluctuation
      const randomTeams = Math.floor(Math.random() * 8) + 10;
      setWaitingTeams(randomTeams);
      setEstWaitMinutes(Math.round(randomTeams * 1.8));
      const now = new Date();
      setLastUpdated(`${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} 기준`);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <section id="live-status" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 -mt-8 relative z-20">
      <div className="bg-[#24140C] border border-[#D4AF37]/40 rounded-2xl p-5 sm:p-7 shadow-2xl text-stone-100">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Header & Status Indicator */}
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                실시간 매장 대기 현황 (LIVE)
              </span>
              <span className="text-xs text-stone-400">· 잠실 롯데월드몰점 B1F</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#FDFBF7]">
              오늘의 고디바 모찌 실시간 웨이팅 보드
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 mt-1">
              매장 키오스크와 실시간 동기화되는 예상 대기 시간과 수량 정보입니다.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            {/* Metric 1 */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>현재 대기</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#F3E5AB]">{waitingTeams}</span>
                <span className="text-xs text-stone-400">팀 대기 중</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-stone-900/80 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>예상 대기</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#FDFBF7]">약 {estWaitMinutes}</span>
                <span className="text-xs text-stone-400">분</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="col-span-2 sm:col-span-1 bg-stone-900/80 border border-stone-800 rounded-xl p-3.5 flex flex-col justify-center">
              <div className="flex items-center gap-1.5 text-xs text-stone-400">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>조기 품절 주의</span>
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-sm font-semibold text-rose-300">다크딸기 모찌</span>
                <span className="text-[10px] bg-rose-950/80 text-rose-300 border border-rose-800 px-1.5 py-0.5 rounded">
                  임박
                </span>
              </div>
            </div>
          </div>

          {/* Action & Refresh */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full lg:w-auto gap-2 border-t lg:border-t-0 border-stone-800 pt-3 lg:pt-0">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#D4AF37] transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-stone-800"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#D4AF37]' : ''}`} />
              <span>{lastUpdated} 갱신</span>
            </button>
            <a
              href="#waiting-guide"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-[#F3E5AB] transition-colors"
            >
              웨이팅 등록 꿀팁 보기
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Real-time category stock chip bar */}
        <div className="mt-5 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2 text-stone-300">
            <span className="text-stone-400 font-medium">카테고리별 실시간 수량:</span>
            <span className="inline-flex items-center gap-1 bg-stone-900 border border-rose-800/60 px-2 py-1 rounded text-rose-200">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              생과일 모찌 (다크딸기 극소량 잔여)
            </span>
            <span className="inline-flex items-center gap-1 bg-stone-900 border border-emerald-800/60 px-2 py-1 rounded text-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              프랄린 모찌 (수량 여유)
            </span>
            <span className="inline-flex items-center gap-1 bg-stone-900 border border-amber-800/60 px-2 py-1 rounded text-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              젤라또 모찌 (수량 안정)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#D4AF37]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>1인 최대 4개(1세트) 구매 규정 준수</span>
          </div>
        </div>
      </div>
    </section>
  );
};
