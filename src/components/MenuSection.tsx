import React, { useState, useRef, useEffect } from 'react';
import { MOCHI_ITEMS, MochiCategory, MochiItem } from '@/src/data/mochiData';
import { GeneralCartItem, WaffleBaseOption } from '@/src/components/AllMenuCartModal';
import { Plus, Check, Info, Sparkles, AlertCircle, Utensils, Megaphone, Menu, X, ChevronDown, ShoppingCart } from 'lucide-react';

interface MenuSectionProps {
  onAddToPlanner: (item: MochiItem) => void;
  selectedMochis: MochiItem[];
  onAddToGeneralCart: (item: MochiItem, waffleOption?: WaffleBaseOption) => void;
  generalCartItems: GeneralCartItem[];
}

interface CategorySectionMeta {
  id: MochiCategory;
  title: string;
  subtitle: string;
  priceLabel: string;
  notice?: string;
}

const CATEGORY_SECTIONS: CategorySectionMeta[] = [
  {
    id: 'fruit',
    title: '생과일·보늬밤 모찌',
    subtitle: '고디바의 시그니처 초콜릿 가나슈와 상큼한 생과일로 속을 가득 채운 쫀득한 생과일 모찌',
    priceLabel: '각 8,500원',
  },
  {
    id: 'praline',
    title: '프랄린 모찌',
    subtitle: '고디바의 시그니처 초콜릿 가나슈와 고소한 아몬드 프랄린으로 속을 가득 채운 쫀득한 프랄린 모찌',
    priceLabel: '각 7,500원',
  },
  {
    id: 'gelato',
    title: '젤라또 모찌',
    subtitle: '진한 초콜릿 젤라또와 상큼한 생과일로 속을 가득 채운 쫀득한 젤라또 모찌',
    priceLabel: '각 9,000원',
  },
  {
    id: 'classic-gelato',
    title: '클래식 젤라또',
    subtitle: '고디바의 시그니처 와플콘과의 조화',
    priceLabel: '각 8,500원',
  },
  {
    id: 'fresh-waffle-fruit',
    title: 'FRESH WAFFLE GELATO&FRUIT',
    subtitle: '갓 구운 와플콘에 진한 초콜릿 젤라또와 상큼한 생과일을 가득 올린 풍성한 프레시 와플컵',
    priceLabel: '각 11,000원',
    notice: '와플/초코, 플레인 선택 가능',
  },
  {
    id: 'fresh-waffle-gelato',
    title: 'FRESH WAFFLE GELATO 프레시 와플 젤라또',
    subtitle: '갓 구운 와플콘에 담아 더욱 특별하게',
    priceLabel: '각 9,800원',
  },
];

interface FilterMenuOption {
  id: 'all' | MochiCategory;
  emoji: string;
  label: string;
  priceText: string;
}

const FILTER_MENU_OPTIONS: FilterMenuOption[] = [
  { id: 'all', emoji: '✨', label: '전체 메뉴 보기', priceText: `총 ${MOCHI_ITEMS.length}종` },
  { id: 'fruit', emoji: '🍓', label: '생과일·보늬밤 모찌', priceText: '각 8,500원' },
  { id: 'praline', emoji: '🏷️', label: '프랄린 모찌', priceText: '각 7,500원' },
  { id: 'gelato', emoji: '🍦', label: '젤라또 모찌', priceText: '각 9,000원' },
  { id: 'classic-gelato', emoji: '🍨', label: '클래식 젤라또', priceText: '각 8,500원' },
  { id: 'fresh-waffle-fruit', emoji: '🧇', label: 'FRESH WAFFLE GELATO&FRUIT', priceText: '각 11,000원' },
  { id: 'fresh-waffle-gelato', emoji: '🍦', label: 'FRESH WAFFLE GELATO 프레시 와플 젤라또', priceText: '각 9,800원' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToPlanner,
  selectedMochis,
  onAddToGeneralCart,
  generalCartItems,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | MochiCategory>('all');
  const [isMenuBarOpen, setIsMenuBarOpen] = useState<boolean>(false);
  const [detailModalItem, setDetailModalItem] = useState<MochiItem | null>(null);
  const [waffleChoices, setWaffleChoices] = useState<Record<string, WaffleBaseOption>>({});
  const menuBarRef = useRef<HTMLDivElement>(null);

  const getWaffleChoice = (itemId: string): WaffleBaseOption => {
    return waffleChoices[itemId] || '초코 와플';
  };

  const setWaffleChoice = (itemId: string, option: WaffleBaseOption) => {
    setWaffleChoices(prev => ({ ...prev, [itemId]: option }));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setIsMenuBarOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuBarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentOption = FILTER_MENU_OPTIONS.find(opt => opt.id === activeTab) || FILTER_MENU_OPTIONS[0];

  const getOptionCount = (id: 'all' | MochiCategory) => {
    return id === 'all' ? MOCHI_ITEMS.length : MOCHI_ITEMS.filter(item => item.category === id).length;
  };

  const visibleSections = activeTab === 'all'
    ? CATEGORY_SECTIONS
    : CATEGORY_SECTIONS.filter(sec => sec.id === activeTab);

  const getSelectionCount = (itemId: string) => {
    return selectedMochis.filter(m => m.id === itemId).length;
  };

  const getGeneralCartCount = (itemId: string) => {
    return generalCartItems
      .filter(entry => entry.item.id === itemId)
      .reduce((sum, entry) => sum + entry.quantity, 0);
  };

  return (
    <section id="menu-section" className="py-16 sm:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#8B6E14] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Godiva Mochi &amp; Gelato Lineup</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#24140C]">
            고디바 모찌 &amp; 젤라또 와플 메뉴
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            벨기에 마스터 쇼콜라티에의 15종 수제 모찌와 8종 시그니처 젤라또 · 프레시 와플 라인업입니다.<br className="hidden sm:inline" />
            각 메뉴별 <strong>사진, 상세 설명, 주요 재료, 가격 정보</strong>를 확인해보세요.
          </p>
        </div>

        {/* Hamburger Category Menu Bar */}
        <div ref={menuBarRef} className="relative max-w-2xl mx-auto mt-10 z-30">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMenuBarOpen(prev => !prev)}
              aria-expanded={isMenuBarOpen}
              aria-label="전체 메뉴 카테고리 열기"
              className={`w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5 rounded-2xl border transition-all duration-200 cursor-pointer shadow-md ${
                isMenuBarOpen
                  ? 'bg-[#24140C] text-[#F3E5AB] border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                  : 'bg-[#24140C] text-[#FDFBF7] border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#2E1A10]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center shrink-0 text-[#D4AF37]">
                  {isMenuBarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </span>
                <div className="text-left min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-[#D4AF37] uppercase block">
                    전체 메뉴 카테고리
                  </span>
                  <div className="flex items-center gap-2 text-sm sm:text-base font-bold truncate">
                    <span>{currentOption.emoji}</span>
                    <span className="truncate">{currentOption.label}</span>
                    <span className="text-xs font-semibold text-[#F3E5AB]/90 shrink-0 tabular-nums">
                      ({getOptionCount(currentOption.id)}종)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline text-xs font-medium text-[#F3E5AB]/80 bg-white/10 px-2.5 py-1 rounded-lg">
                  {isMenuBarOpen ? '접기' : '카테고리 펼치기'}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#D4AF37] transition-transform duration-200 ${
                    isMenuBarOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {activeTab !== 'all' && (
              <button
                type="button"
                onClick={() => {
                  setActiveTab('all');
                  setIsMenuBarOpen(false);
                }}
                className="px-3.5 py-3.5 rounded-2xl border border-stone-300 bg-white hover:bg-stone-100 text-xs sm:text-sm font-semibold text-stone-700 whitespace-nowrap shrink-0 shadow-sm transition-colors cursor-pointer"
              >
                전체 보기
              </button>
            )}
          </div>

          {/* Cascading Dropdown Drawer ("촤라락" menu list) */}
          {isMenuBarOpen && (
            <div className="mt-2.5 bg-white rounded-2xl border border-[#D4AF37]/50 shadow-2xl overflow-hidden p-2 space-y-1">
              {FILTER_MENU_OPTIONS.map((option, idx) => {
                const isSelected = activeTab === option.id;
                const count = getOptionCount(option.id);
                const delayClass = `menu-cascade-delay-${Math.min(idx, 6)}`;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(option.id);
                      setIsMenuBarOpen(false);
                    }}
                    className={`menu-cascade-item ${delayClass} w-full flex items-center justify-between gap-3 px-3.5 sm:px-4 py-3 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#24140C] text-[#F3E5AB] shadow-sm'
                        : 'hover:bg-[#FAF7F2] text-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-base sm:text-lg shrink-0">{option.emoji}</span>
                      <span className="text-xs sm:text-sm font-bold truncate">
                        {option.label}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 tabular-nums ${
                          isSelected
                            ? 'bg-[#D4AF37]/20 text-[#F3E5AB]'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {count}종
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs font-bold tabular-nums ${
                          isSelected ? 'text-[#D4AF37]' : 'text-[#8B6E14]'
                        }`}
                      >
                        {option.priceText}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-[#D4AF37]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* All-Menu Tip Banner */}
        {activeTab === 'all' && (
          <div className="max-w-4xl mx-auto mt-6 bg-white border border-[#D4AF37]/30 rounded-xl p-3.5 text-center text-xs sm:text-sm text-stone-700 shadow-xs">
            <p>✨ <strong>고디바 모찌 팁:</strong> 마음에 드는 모찌 4개를 담으시면 <strong>+2,500원에 골드 리본 기프트 박스 &amp; 쇼핑백</strong> 포장이 적용됩니다. 하단에서 클래식 젤라또 &amp; 프레시 와플 메뉴도 함께 확인하세요.</p>
          </div>
        )}

        {/* Category Sections */}
        <div className="mt-10 space-y-14">
          {visibleSections.map((section) => {
            const sectionItems = MOCHI_ITEMS.filter(item => item.category === section.id);
            return (
              <div key={section.id} className="space-y-6">
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#D4AF37]/30 pb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#24140C]">
                        {section.title}
                      </h3>
                      <span className="text-xs sm:text-sm font-bold text-[#8B6E14] bg-[#D4AF37]/15 border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full tabular-nums">
                        {section.priceLabel}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                      {section.subtitle}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-stone-400 shrink-0 tabular-nums">
                    {sectionItems.length}종 메뉴
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {sectionItems.map((item) => {
                    const countInCart = getSelectionCount(item.id);
                    const countInGeneralCart = getGeneralCartCount(item.id);
                    const isMochiEligible = item.isMochiBoxEligible !== false;
                    const isWaffleFruit = item.category === 'fresh-waffle-fruit';
                    const selectedWaffle = getWaffleChoice(item.id);

                    return (
                      <div
                        key={item.id}
                        className={`group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between ${
                          item.isNew ? 'border-[#D4AF37]/80 ring-1 ring-[#D4AF37]/25' : 'border-stone-200/90'
                        }`}
                      >
                        {/* 1. Photo with Badges */}
                        <div
                          className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-900 cursor-pointer"
                          onClick={() => setDetailModalItem(item)}
                        >
                          <img
                            src={item.image}
                            alt={`${item.name} 사진`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                            {item.tag && (
                              <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-sm ${item.tagColor}`}>
                                {item.tag}
                              </span>
                            )}
                            {item.stockStatus === '품절임박' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow-sm flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                수량 임박
                              </span>
                            )}
                          </div>

                          {/* Category Pill */}
                          <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-[#F3E5AB] border border-[#D4AF37]/40 px-2.5 py-0.5 rounded-full text-[11px] font-semibold max-w-[55%] truncate">
                            {item.categoryLabel}
                          </div>

                          {/* Bottom Image Sub-info */}
                          <div className="absolute bottom-2.5 left-3 text-white text-[11px] flex items-center gap-1.5 drop-shadow">
                            <span className="bg-[#24140C]/80 px-2 py-0.5 rounded font-mono text-[#D4AF37]">
                              {item.cocoaContent || item.freshness}
                            </span>
                          </div>

                          {/* Peek Hint */}
                          <div className="absolute bottom-2.5 right-3 bg-white/90 text-stone-800 text-[11px] font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow">
                            <Info className="w-3 h-3 text-[#D4AF37]" />
                            상세보기
                          </div>
                        </div>

                        {/* 2. Card Content */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            {/* Name & Price */}
                            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
                              <div>
                                {item.isNew && (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full mb-1">
                                    신메뉴
                                  </span>
                                )}
                                <h4 className="font-serif-luxury text-xl font-bold text-[#24140C] group-hover:text-[#8B6E14] transition-colors leading-snug">
                                  {item.name}
                                </h4>
                                <p className="text-[11px] text-stone-400 font-sans tracking-wide mt-0.5">
                                  {item.nameEn}
                                </p>
                              </div>
                              <div className="text-right shrink-0 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200 tabular-nums">
                                <span className="font-extrabold text-xl text-[#24140C]">
                                  {item.price.toLocaleString()}
                                </span>
                                <span className="text-xs text-stone-600 font-medium ml-0.5">원</span>
                              </div>
                            </div>

                            {/* Short Description */}
                            <div>
                              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                                {item.description}
                              </p>
                            </div>

                            {/* Key Ingredients */}
                            <div className="bg-[#FAF7F2] border border-[#EAE3D2] rounded-xl p-3 space-y-1.5">
                              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8B6E14]">
                                <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
                                <span>주요 재료</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {item.ingredients.map((ing, idx) => (
                                  <span
                                    key={idx}
                                    className="bg-white border border-stone-200 text-stone-700 text-[11px] px-2 py-0.5 rounded-md font-medium"
                                  >
                                    {ing}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Waffle Base Option Selector for FRESH WAFFLE GELATO&FRUIT */}
                            {isWaffleFruit && (
                              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
                                <span className="text-[11px] font-bold text-amber-950 shrink-0">
                                  와플 선택:
                                </span>
                                <div className="flex items-center gap-1.5">
                                  {(['초코 와플', '플레인 와플'] as WaffleBaseOption[]).map((opt) => (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() => setWaffleChoice(item.id, opt)}
                                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                        selectedWaffle === opt
                                          ? 'bg-[#24140C] text-[#F3E5AB] shadow-2xs'
                                          : 'bg-white text-stone-700 border border-stone-200 hover:border-amber-400'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Tasting Note */}
                            <div className="flex items-start gap-1.5 text-xs text-stone-500">
                              <span className="text-[#D4AF37] font-semibold shrink-0">풍미:</span>
                              <span className="line-clamp-1 text-stone-600">{item.tasteNote}</span>
                            </div>
                          </div>

                          {/* 3. Bottom Actions */}
                          <div className="pt-3 border-t border-stone-100 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <button
                                onClick={() => setDetailModalItem(item)}
                                className="text-xs text-stone-500 hover:text-[#24140C] underline underline-offset-2 py-1 px-0.5 rounded transition-colors cursor-pointer"
                              >
                                {isMochiEligible ? '보관 & 섭취 가이드' : '상세 & 옵션 안내'}
                              </button>
                              {countInGeneralCart > 0 && (
                                <span className="text-[11px] font-semibold text-emerald-700 tabular-nums">
                                  전체 장바구니 {countInGeneralCart}개 담김
                                </span>
                              )}
                            </div>

                            {isMochiEligible ? (
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => onAddToPlanner(item)}
                                  className={`flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                                    countInCart > 0
                                      ? 'bg-[#24140C] text-[#D4AF37] shadow-sm ring-1 ring-[#D4AF37]'
                                      : 'bg-[#D4AF37] hover:bg-[#B89326] text-[#24140C] shadow-sm hover:shadow'
                                  }`}
                                >
                                  {countInCart > 0 ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                                      <span>박스 ({countInCart})</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>모찌 박스 담기</span>
                                    </>
                                  )}
                                </button>

                                <button
                                  onClick={() => onAddToGeneralCart(item)}
                                  className="flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2.5 rounded-full bg-[#24140C] hover:bg-[#3a2012] text-[#F3E5AB] border border-[#D4AF37]/40 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                                >
                                  <ShoppingCart className="w-3.5 h-3.5 text-[#D4AF37]" />
                                  <span>{countInGeneralCart > 0 ? `전체 (${countInGeneralCart})` : '전체 메뉴 담기'}</span>
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() =>
                                  onAddToGeneralCart(
                                    item,
                                    isWaffleFruit ? selectedWaffle : undefined
                                  )
                                }
                                className="w-full flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full bg-[#24140C] hover:bg-[#3a2012] text-[#F3E5AB] border border-[#D4AF37]/40 shadow-sm transition-all cursor-pointer"
                              >
                                <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
                                <span>
                                  {countInGeneralCart > 0
                                    ? `전체 메뉴 담기 (${countInGeneralCart}개 담김)`
                                    : '전체 메뉴 담기'}
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Category Notice Box (for FRESH WAFFLE GELATO&FRUIT: 와플/초코, 플레인 선택 가능) */}
                {section.notice && (
                  <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#24140C] text-[#D4AF37] flex items-center justify-center shrink-0">
                        <Megaphone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#8B6E14] uppercase tracking-wider block">
                          공지사항
                        </span>
                        <p className="text-sm sm:text-base font-bold text-[#24140C]">
                          {section.notice}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-amber-900/80 font-medium bg-white/80 border border-amber-200 px-3 py-1.5 rounded-xl shrink-0">
                      주문 시 취향에 맞는 와플컵 베이스를 선택해 주세요
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detailed Modal View */}
        {detailModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#D4AF37]/50 max-h-[90vh] flex flex-col">

              <div className="relative aspect-video bg-stone-900">
                <img
                  src={detailModalItem.image}
                  alt={detailModalItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setDetailModalItem(null)}
                  className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors cursor-pointer shadow"
                >
                  ✕
                </button>
                <div className="absolute bottom-3 left-4 bg-[#24140C]/90 text-[#F3E5AB] border border-[#D4AF37]/40 px-3 py-1 rounded-full text-xs font-semibold">
                  {detailModalItem.categoryLabel}
                </div>
              </div>

              <div className="p-6 overflow-y-auto space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    {detailModalItem.isNew && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold tracking-wider uppercase text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full mb-1.5">
                        NEW 신메뉴
                      </span>
                    )}
                    <h3 className="font-serif-luxury text-2xl font-bold text-[#24140C]">
                      {detailModalItem.name}
                    </h3>
                    <p className="text-xs text-stone-400 mt-0.5">{detailModalItem.nameEn}</p>
                  </div>
                  <div className="text-right tabular-nums">
                    <span className="text-2xl font-extrabold text-[#24140C]">
                      {detailModalItem.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-stone-500 font-medium">원</span>
                  </div>
                </div>

                {/* Description */}
                <div className="text-sm text-stone-700 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                  <span className="font-semibold text-stone-900 block mb-1">메뉴 설명:</span>
                  {detailModalItem.description}
                </div>

                {/* Waffle Option Notice & Selector inside Modal for FRESH WAFFLE GELATO&FRUIT */}
                {detailModalItem.category === 'fresh-waffle-fruit' && (
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 space-y-2 text-xs text-amber-950">
                    <div className="flex items-center gap-2 font-semibold">
                      <Megaphone className="w-4 h-4 text-[#8B6E14] shrink-0" />
                      <span>공지사항: 와플 / 초코, 플레인 선택 가능</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {(['초코 와플', '플레인 와플'] as WaffleBaseOption[]).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setWaffleChoice(detailModalItem.id, opt)}
                          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            getWaffleChoice(detailModalItem.id) === opt
                              ? 'bg-[#24140C] text-[#F3E5AB]'
                              : 'bg-white text-stone-700 border border-stone-200'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Ingredients */}
                <div className="space-y-1.5">
                  <span className="font-semibold text-xs text-[#8B6E14] uppercase tracking-wider block">
                    주요 재료:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {detailModalItem.ingredients.map((ing, idx) => (
                      <span key={idx} className="bg-amber-50 text-amber-950 border border-amber-200 text-xs px-2.5 py-1 rounded-lg font-medium">
                        ✓ {ing}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tasting & Storage */}
                <div className="space-y-2 text-xs sm:text-sm pt-2 border-t border-stone-200">
                  <div className="flex items-start gap-2">
                    <span className="text-stone-500 font-semibold w-20 shrink-0">테이스팅 노트:</span>
                    <span className="text-stone-800">{detailModalItem.tasteNote}</span>
                  </div>
                  {detailModalItem.cocoaContent && (
                    <div className="flex items-center gap-2">
                      <span className="text-stone-500 font-semibold w-20 shrink-0">초콜릿 성분:</span>
                      <span className="text-stone-800">{detailModalItem.cocoaContent}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-stone-500 font-semibold w-20 shrink-0">신선도 관리:</span>
                    <span className="text-stone-800">{detailModalItem.freshness}</span>
                  </div>
                  <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl mt-2">
                    <div className="font-semibold text-amber-950 mb-0.5 flex items-center gap-1.5 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                      권장 섭취 및 보관 방법
                    </div>
                    <p className="text-xs text-amber-900 leading-relaxed">
                      {detailModalItem.storageGuide}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-2.5">
                  {detailModalItem.isMochiBoxEligible !== false && (
                    <button
                      onClick={() => {
                        onAddToPlanner(detailModalItem);
                        setDetailModalItem(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B89326] text-[#24140C] font-bold text-sm py-3 px-4 rounded-full hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>모찌 박스에 담기</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onAddToGeneralCart(
                        detailModalItem,
                        detailModalItem.category === 'fresh-waffle-fruit'
                          ? getWaffleChoice(detailModalItem.id)
                          : undefined
                      );
                      setDetailModalItem(null);
                    }}
                    className="flex-1 bg-[#24140C] hover:bg-[#3a2012] text-[#F3E5AB] font-bold text-sm py-3 px-4 rounded-full transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#D4AF37]" />
                    <span>전체 메뉴 담기</span>
                  </button>
                  <button
                    onClick={() => setDetailModalItem(null)}
                    className="px-5 py-3 border border-stone-300 text-stone-600 hover:bg-stone-100 rounded-full text-sm font-semibold transition-colors cursor-pointer"
                  >
                    닫기
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
