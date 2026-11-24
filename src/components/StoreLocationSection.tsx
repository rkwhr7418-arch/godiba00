import React, { useState } from 'react';
import { STORE_INFO } from '@/src/data/mochiData';
import { MapPin, Navigation, Copy, Check, Train, Car, Phone, Clock, ExternalLink } from 'lucide-react';

export const StoreLocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(STORE_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="store-location" className="py-16 sm:py-24 bg-[#f8f5ef] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#8B6E14] text-xs font-semibold tracking-widest uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Location & Directions</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24140C]">
            구매 장소 &amp; 찾아오시는 길
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            잠실역에서 지하 연결 통로로 도보 3분! 롯데월드몰 지하 1층에서 바로 만나보실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
          
          {/* Store Info Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Main Location Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">OFFICIAL BOUTIQUE</span>
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#24140C] mt-0.5">
                    {STORE_INFO.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyAddress}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-50 active:scale-95 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">주소 복사됨!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>주소 복사</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location details list */}
              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#24140C]">주소: </span>
                    <span>{STORE_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#24140C]">운영 시간: </span>
                    <span>{STORE_INFO.operatingHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#24140C]">매장 연락처: </span>
                    <a href={`tel:${STORE_INFO.phone}`} className="text-[#8B6E14] font-semibold underline underline-offset-2">
                      {STORE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Train className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#24140C]">지하철 이용 시: </span>
                    <span>{STORE_INFO.subway}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Car className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#24140C]">주차 안내: </span>
                    <span>{STORE_INFO.parking}</span>
                  </div>
                </div>
              </div>

              {/* External Map Buttons */}
              <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-2.5">
                <a
                  href="https://map.naver.com/p/search/%EC%9E%A0%EC%8B%A4%20%EB%A1%AF%EB%8D%B0%EC%9B%94%EB%93%9C%EB%AA%B0%20%EA%B3%A0%EB%94%94%EB%B0%94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] bg-[#03C75A] text-white font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:brightness-105 transition-all shadow-sm"
                >
                  <span>네이버 지도</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://map.kakao.com/?q=%EB%A1%AF%EB%8D%B0%EC%9B%94%EB%93%9C%EB%AA%B0%20%EA%B3%A0%EB%94%94%EB%B0%94"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[120px] bg-[#FEE500] text-[#191919] font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:brightness-105 transition-all shadow-sm"
                >
                  <span>카카오맵</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Sub Warning box */}
            <div className="bg-[#24140C] text-[#FDFBF7] p-4 sm:p-5 rounded-2xl border border-[#D4AF37]/30 flex items-start gap-3">
              <Navigation className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <p className="font-bold text-[#F3E5AB]">지하 통로 빠른 지름길</p>
                <p className="text-stone-300 mt-1 leading-relaxed">
                  잠실역(2호선/8호선) 개찰구를 나와 <strong>롯데월드몰 방면</strong> 지하 연결 통로로 진입하시면 B1F 왕관 분수대 광장이 나옵니다. 광장에서 자라(ZARA) 매장 방면으로 30m 직진하시면 바로 고디바 매장이 보입니다.
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Visual Floor Map Diagram (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-[#24140C] text-sm">롯데월드몰 B1F 이동 경로 약도</h4>
              <span className="text-[11px] bg-amber-100 text-[#8B6E14] px-2 py-0.5 rounded font-medium">
                지하 1층 내부
              </span>
            </div>

            {/* Illustrated Subway-to-Store Diagram */}
            <div className="bg-stone-900 rounded-xl p-5 text-white relative overflow-hidden border border-stone-800">
              <div className="space-y-4 text-xs">
                
                {/* Station */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    2/8
                  </div>
                  <div>
                    <div className="font-semibold text-emerald-400">잠실역 지하 광장</div>
                    <div className="text-[10px] text-stone-400">10번 / 11번 출구 연결 통로</div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="ml-3 pl-3 border-l-2 border-dashed border-[#D4AF37]/50 py-1 text-[11px] text-amber-200/70">
                  ↓ 지하 연결 게이트 통과 (도보 1분)
                </div>

                {/* World Mall Entrance & Crown Fountain */}
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                    👑
                  </div>
                  <div>
                    <div className="font-semibold text-amber-300">롯데월드몰 B1F 왕관 광장</div>
                    <div className="text-[10px] text-stone-400">분수대 &amp; H&amp;M / ZARA 입구</div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="ml-3 pl-3 border-l-2 border-dashed border-[#D4AF37]/50 py-1 text-[11px] text-amber-200/70">
                  ↓ 본매장 스트리트 방면 30m 이동
                </div>

                {/* Godiva Store Target */}
                <div className="flex items-center gap-3 bg-[#24140C] p-3 rounded-xl border-2 border-[#D4AF37]">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#24140C] font-black flex items-center justify-center shrink-0 text-sm">
                    ★
                  </div>
                  <div>
                    <div className="font-bold text-[#F3E5AB] text-sm">고디바 롯데월드몰점 (도착)</div>
                    <div className="text-[10px] text-stone-300">매장 앞 키오스크에서 모찌 웨이팅 번호표 수령</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600">
              <span className="font-semibold text-[#24140C]">💡 실내 날씨 무관:</span> 잠실역에서 롯데월드몰 지하 1층까지 전 구간이 실내 지하 통로로 연결되어 있어 우천 시에도 우산 없이 편안하게 방문하실 수 있습니다.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
