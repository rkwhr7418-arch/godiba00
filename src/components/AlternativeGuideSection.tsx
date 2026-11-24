import React, { useState } from 'react';
import { ALTERNATIVE_PLACES, AlternativePlace } from '@/src/data/alternativeData';
import { Compass, Sparkles, MapPin, ExternalLink, CheckCircle2, Footprints, Globe } from 'lucide-react';

export const AlternativeGuideSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showBensonPriceModal, setShowBensonPriceModal] = useState<boolean>(false);

  const filteredPlaces = selectedCategory === 'all'
    ? ALTERNATIVE_PLACES
    : ALTERNATIVE_PLACES.filter(p => p.category === selectedCategory);

  return (
    <section id="alternative-guide" className="py-16 sm:py-24 bg-[#FAF7F2] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-semibold tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Plan B: Nearby Dessert Alternatives</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24140C] leading-tight">
            모찌를 사지 못했을 땐?
            <br />
            이런 곳도 좋아요!
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            고디바 모찌가 조기 품절되었거나 웨이팅이 길어 아쉬우셨나요? <br className="hidden sm:inline" />
            도보 1분~7분 거리의 잠실 롯데월드몰 &amp; 백화점, 송리단길에서 아쉬움을 100% 달래줄 엄선된 대체 디저트 코스를 추천해 드립니다.
          </p>
        </div>

        {/* Quick Preference Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#24140C] text-[#F3E5AB] shadow-md shadow-[#24140C]/20'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            전체 대체 명소 (4곳)
          </button>

          <button
            onClick={() => setSelectedCategory('godiva-bakery')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'godiva-bakery'
                ? 'bg-[#24140C] text-[#F3E5AB] shadow-md shadow-[#24140C]/20 ring-2 ring-[#D4AF37]'
                : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            <span>🍫 고디바 초콜릿 맛 그대로</span>
            <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-1.5 py-0.2 rounded-full">추천 1위</span>
          </button>

          <button
            onClick={() => setSelectedCategory('fruit-mochi')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'fruit-mochi'
                ? 'bg-[#24140C] text-[#F3E5AB] shadow-md shadow-[#24140C]/20 ring-2 ring-[#D4AF37]'
                : 'bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <span>🍫 생초코 &amp; 아이스모찌</span>
          </button>

          <button
            onClick={() => setSelectedCategory('gelato')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'gelato'
                ? 'bg-[#24140C] text-[#F3E5AB] shadow-md shadow-[#24140C]/20 ring-2 ring-[#D4AF37]'
                : 'bg-stone-100 text-stone-800 border border-stone-300 hover:bg-stone-200'
            }`}
          >
            <span>🍦 꾸덕한 이탈리안 젤라또</span>
          </button>

          <button
            onClick={() => setSelectedCategory('cafe-view')}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedCategory === 'cafe-view'
                ? 'bg-[#24140C] text-[#F3E5AB] shadow-md shadow-[#24140C]/20 ring-2 ring-[#D4AF37]'
                : 'bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100'
            }`}
          >
            <span>☕ 석촌호수 뷰 &amp; 여유 좌석</span>
          </button>
        </div>

        {/* Alternative Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges - Clickable to official website */}
                <a
                  href={place.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${place.websiteLabel} 열기`}
                  className="group relative block aspect-[16/9] overflow-hidden bg-stone-900 cursor-pointer"
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent group-hover:from-black/85 transition-colors"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm ${place.badgeColor}`}>
                        {place.badge}
                      </span>
                      <span className="bg-black/75 backdrop-blur-md text-white border border-white/20 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Footprints className="w-3.5 h-3.5 text-[#D4AF37]" />
                        {place.distance}
                      </span>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 bg-white/90 text-[#24140C] px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm group-hover:bg-[#D4AF37] group-hover:text-[#24140C] transition-colors shrink-0">
                      <Globe className="w-3 h-3" />
                      <span>사이트 이동</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>

                  {/* Bottom Title on Image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs text-[#D4AF37] font-semibold">{place.categoryLabel}</p>
                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold group-hover:text-[#F3E5AB] transition-colors flex items-center gap-1.5">
                        <span>{place.name}</span>
                        <ExternalLink className="w-4 h-4 text-[#D4AF37] opacity-80 group-hover:opacity-100 shrink-0" />
                      </h3>
                    </div>
                  </div>
                </a>

                {/* Body Details */}
                <div className="p-6 space-y-4">
                  {/* Why recommend note */}
                  <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                      <span>추천 이유:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {place.whyRecommend}
                    </p>
                    <p className="text-xs font-semibold text-[#8B6E14] pt-1">
                      {place.satisfactionMatch}
                    </p>
                  </div>

                  {/* Recommended Menu List */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
                      <span>놓치면 아쉬운 추천 대표 메뉴:</span>
                    </h4>
                    <div className="space-y-2">
                      {place.recommendedMenus.map((menu, mIdx) => (
                        <div
                          key={mIdx}
                          className="bg-stone-50 hover:bg-stone-100 p-2.5 rounded-xl border border-stone-200/70 flex items-center justify-between text-xs sm:text-sm transition-colors"
                        >
                          <div>
                            <span className="font-bold text-stone-900">{menu.name}</span>
                            <p className="text-[11px] text-stone-500 line-clamp-1">{menu.desc}</p>
                          </div>
                          <span className="font-bold text-[#24140C] shrink-0 ml-2">{menu.price}</span>
                        </div>
                      ))}
                    </div>
                    {place.id === 'venchi-lotte' && (
                      <div className="pt-2 space-y-3">
                        {/* Official Price Board Box */}
                        <div className="bg-[#FAF7EC] border-2 border-stone-800 rounded-2xl p-3.5 sm:p-4 text-stone-900 shadow-xs">
                          <div className="flex items-center justify-between border-b border-stone-800 pb-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="bg-black text-white text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded">
                                ICE CREAM
                              </span>
                              <span className="text-xs font-bold text-stone-900">공식 가격표</span>
                            </div>
                            <button
                              onClick={() => setShowBensonPriceModal(true)}
                              className="text-[11px] font-bold text-[#8B6E14] hover:text-[#24140C] underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>가격표 원본 보기</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>

                          {/* 3 Price Boxes Grid matching the image */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-center">
                            {/* Box 1: Single & Double */}
                            <div className="border border-stone-800 rounded-xl p-2.5 bg-white flex flex-col justify-between">
                              <div className="text-[11px] font-extrabold text-stone-800 border-b border-stone-200 pb-1">
                                싱글 컵 / 콘 &amp; 더블
                              </div>
                              <div className="py-1.5 space-y-2">
                                <div>
                                  <span className="font-extrabold text-base text-stone-900">5,300원</span>
                                  <p className="text-[10px] text-stone-500 font-medium">싱글 컵/콘 · 한 가지 맛</p>
                                </div>
                                <div className="pt-1 border-t border-dashed border-stone-200">
                                  <span className="font-extrabold text-base text-stone-900">6,300원</span>
                                  <p className="text-[10px] text-stone-500 font-medium">더블 · 두 가지 맛</p>
                                </div>
                              </div>
                            </div>

                            {/* Box 2: Pint & Split */}
                            <div className="border border-stone-800 rounded-xl p-2.5 bg-white flex flex-col justify-between">
                              <div className="text-[11px] font-extrabold text-stone-800 border-b border-stone-200 pb-1">
                                파인트 &amp; 스플릿
                              </div>
                              <div className="py-1.5 space-y-2">
                                <div>
                                  <span className="font-extrabold text-base text-stone-900">15,300원</span>
                                  <p className="text-[10px] text-stone-500 font-medium">파인트 컵 (1가지) / 스플릿 (3가지)</p>
                                </div>
                                <div className="pt-1 border-t border-dashed border-stone-200">
                                  <span className="font-extrabold text-base text-stone-900">19,300원</span>
                                  <p className="text-[10px] text-stone-500 font-medium">쿼드 스플릿 · 네 가지 맛</p>
                                </div>
                              </div>
                            </div>

                            {/* Box 3: Gift Pack */}
                            <div className="border border-stone-800 rounded-xl p-2.5 bg-white flex flex-col justify-between">
                              <div className="text-[11px] font-extrabold text-stone-800 border-b border-stone-200 pb-1">
                                기프트팩 (GIFT PACK)
                              </div>
                              <div className="py-1.5 space-y-2">
                                <div>
                                  <span className="font-extrabold text-base text-stone-900">23,200원</span>
                                  <p className="text-[10px] text-stone-500 font-medium">싱글컵 4EA 선물세트</p>
                                </div>
                                <div className="pt-1 border-t border-dashed border-stone-200">
                                  <span className="font-extrabold text-base text-stone-900">33,800원</span>
                                  <p className="text-[10px] text-stone-500 font-medium">싱글컵 6EA 선물세트</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 20 Flavors tag list */}
                        <div>
                          <span className="text-[11px] font-semibold text-stone-500 block mb-1">
                            📋 벤슨(Benson) 20종 플레이버 라인업:
                          </span>
                          <div className="flex flex-wrap gap-1 text-[10px] text-stone-600">
                            {['트리플 초콜릿&아몬드', '다크초콜릿 브라우니', '초콜릿무스', '피넛버터&초콜릿', '체리초콜릿 플레이크', '민트초콜릿&쿠키', '저지밀크', '버터프렌치토스트', '피스타치오', '티라미수', '말차&레드빈', '라즈베리루즈소르베', '블랙베리 치즈케이크', '스트로베리', '퓨어 메이플 바닐라', '쿠키&크림'].map((flavor, fIdx) => (
                              <span key={fIdx} className="bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded">
                                {flavor}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Directions */}
                  <div className="text-xs text-stone-600 bg-stone-100/70 p-3 rounded-xl flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-stone-900">가는 방법: </span>
                      <span>{place.directions}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 border-t border-stone-100 bg-stone-50/50 flex flex-wrap gap-2.5">
                <a
                  href={place.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto sm:flex-1 min-w-[140px] bg-[#24140C] text-[#F3E5AB] font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:bg-[#3a2012] transition-all shadow-xs"
                >
                  <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{place.websiteLabel}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={`https://map.naver.com/p/search/${encodeURIComponent(place.mapSearchQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[110px] bg-[#03C75A] text-white font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:brightness-105 transition-all shadow-xs"
                >
                  <span>네이버 지도</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={`https://map.kakao.com/?q=${encodeURIComponent(place.mapSearchQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[100px] bg-[#FEE500] text-[#191919] font-semibold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 hover:brightness-105 transition-all shadow-xs"
                >
                  <span>카카오맵</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Quick Decision Guide Table */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-sm">
          <h3 className="font-serif-luxury text-xl font-bold text-[#24140C] mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>고디바 모찌 품절 시 한눈에 보는 상황별 대체 가이드</span>
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mb-6">
            현재 나의 기분이나 동행인의 선호에 따라 바로 선택해 보세요.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-600">
                  <th className="py-3 px-3 font-semibold">내가 원했던 디저트</th>
                  <th className="py-3 px-3 font-semibold">추천 대체 스팟</th>
                  <th className="py-3 px-3 font-semibold">추천 메뉴</th>
                  <th className="py-3 px-3 font-semibold">이동 거리</th>
                  <th className="py-3 px-3 font-semibold">대기 난이도</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-700">
                <tr className="hover:bg-amber-50/50">
                  <td className="py-3 px-3 font-medium text-stone-900">고디바 진한 초콜릿 가나슈</td>
                  <td className="py-3 px-3 font-semibold text-amber-900">
                    <a
                      href="https://godivabakery.kr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <span>고디바 베이커리 (백화점 B1F)</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-3">초콜릿 소라빵 &amp; 소프트콘</td>
                  <td className="py-3 px-3">도보 3분 (지하연결)</td>
                  <td className="py-3 px-3"><span className="text-emerald-700 font-bold">낮음 (회전 빠름)</span></td>
                </tr>
                <tr className="hover:bg-rose-50/50">
                  <td className="py-3 px-3 font-medium text-stone-900">생초코 &amp; 시원한 아이스모찌</td>
                  <td className="py-3 px-3 font-semibold text-rose-900">
                    <a
                      href="https://www.instagram.com/howmochi.cafe"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <span>하우모찌 (오금로18길 12 B1)</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-3">생초코모찌 &amp; 아이스모찌 3종</td>
                  <td className="py-3 px-3">도보 8분 (송파나루역 인근)</td>
                  <td className="py-3 px-3"><span className="text-emerald-700 font-bold">보통</span></td>
                </tr>
                <tr className="hover:bg-amber-50/50">
                  <td className="py-3 px-3 font-medium text-stone-900">시원하고 쫀득한 아이스크림</td>
                  <td className="py-3 px-3 font-semibold text-[#8B6E14]">
                    <a
                      href="https://bensonicecream.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <span>벤슨 (월드몰 B1F)</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-3">트리플초코 &amp; 브라우니 (5,300원)</td>
                  <td className="py-3 px-3">도보 1분 (같은 층)</td>
                  <td className="py-3 px-3"><span className="text-emerald-700 font-bold">낮음</span></td>
                </tr>
                <tr className="hover:bg-sky-50/50">
                  <td className="py-3 px-3 font-medium text-stone-900">달콤한 휴식과 카페 좌석</td>
                  <td className="py-3 px-3 font-semibold text-sky-900">
                    <a
                      href="https://knottedstore.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <span>노티드 월드 (월드몰 5~6F)</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </td>
                  <td className="py-3 px-3">초코 푸딩 도넛 &amp; 커피</td>
                  <td className="py-3 px-3">엘리베이터 1분</td>
                  <td className="py-3 px-3"><span className="text-amber-700 font-bold">주말 대기 있음</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Benson Official Price Board Modal */}
        {showBensonPriceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fade-in">
            <div className="bg-[#FAF7EC] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border-2 border-stone-800 flex flex-col max-h-[90vh]">
              <div className="bg-[#24140C] text-[#F3E5AB] p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-[#D4AF37] text-[#24140C] font-black text-xs px-2 py-0.5 rounded">
                    BENSON
                  </span>
                  <span className="font-bold text-sm sm:text-base">벤슨 아이스크림 공식 가격표 (ICE CREAM)</span>
                </div>
                <button
                  onClick={() => setShowBensonPriceModal(false)}
                  className="text-stone-300 hover:text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-800 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex items-center justify-center bg-stone-100">
                <img
                  src="/assets/aistudio/_____19534901.jfif"
                  alt="벤슨 아이스크림 공식 가격표 원본"
                  className="w-full h-auto rounded-xl shadow-lg border-2 border-stone-800"
                />
              </div>

              <div className="p-3.5 bg-white border-t border-stone-300 text-xs text-stone-700 flex flex-col sm:flex-row items-center justify-between gap-2">
                <span className="font-medium text-stone-600">
                  • 싱글 컵/콘 (5,300원) · 더블 (6,300원) · 파인트 (15,300원) · 쿼드 (19,300원) · 기프트팩 (23,200원~)
                </span>
                <button
                  onClick={() => setShowBensonPriceModal(false)}
                  className="bg-stone-900 text-white font-semibold text-xs px-4 py-1.5 rounded-lg hover:bg-stone-800 cursor-pointer"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
