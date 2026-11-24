import React, { useState } from 'react';
import { MochiItem, MOCHI_ITEMS, STORE_INFO } from '@/src/data/mochiData';
import { X, Trash2, Plus, Check, Gift, Copy, FileText, CreditCard } from 'lucide-react';
import { PreOrderCheckoutView } from '@/src/components/PreOrderCheckoutView';

interface MochiBoxPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMochis: MochiItem[];
  onRemoveMochi: (index: number) => void;
  onAddMochi: (item: MochiItem) => void;
  onClearAll: () => void;
  includeGiftBox: boolean;
  onToggleGiftBox: () => void;
  onSelectPreset: (items: MochiItem[]) => void;
}

export const MochiBoxPlannerModal: React.FC<MochiBoxPlannerModalProps> = ({
  isOpen,
  onClose,
  selectedMochis,
  onRemoveMochi,
  onAddMochi,
  onClearAll,
  includeGiftBox,
  onToggleGiftBox,
  onSelectPreset,
}) => {
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [showOrderCard, setShowOrderCard] = useState(false);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setIsCheckoutMode(false);
    onClose();
  };

  const mochiSubtotal = selectedMochis.reduce((sum, item) => sum + item.price, 0);
  const packagingFee = includeGiftBox ? STORE_INFO.giftBoxPrice : 0;
  const totalPrice = mochiSubtotal + packagingFee;

  // Preset Configurations
  const handleApplyPreset = (type: 'bestseller' | 'allfruit' | 'luxury') => {
    let presetItems: MochiItem[] = [];
    if (type === 'bestseller') {
      // 2x Dark Strawberry + 1x Praline Almond + 1x Matcha Strawberry
      const darkStraw = MOCHI_ITEMS.find(m => m.id === 'fruit-dark-strawberry')!;
      const praline = MOCHI_ITEMS.find(m => m.id === 'praline-dark-almond')!;
      const matchaStraw = MOCHI_ITEMS.find(m => m.id === 'fruit-matcha-strawberry')!;
      presetItems = [darkStraw, darkStraw, praline, matchaStraw];
    } else if (type === 'allfruit') {
      const darkStraw = MOCHI_ITEMS.find(m => m.id === 'fruit-dark-strawberry')!;
      const matchaStraw = MOCHI_ITEMS.find(m => m.id === 'fruit-matcha-strawberry')!;
      const marron = MOCHI_ITEMS.find(m => m.id === 'fruit-matcha-marron')!;
      const banana = MOCHI_ITEMS.find(m => m.id === 'fruit-dark-banana')!;
      presetItems = [darkStraw, matchaStraw, marron, banana];
    } else if (type === 'luxury') {
      const darkStraw = MOCHI_ITEMS.find(m => m.id === 'fruit-dark-strawberry')!;
      const gelatoStraw = MOCHI_ITEMS.find(m => m.id === 'gelato-dark-strawberry')!;
      const praline = MOCHI_ITEMS.find(m => m.id === 'praline-dark-almond')!;
      const matchaPraline = MOCHI_ITEMS.find(m => m.id === 'praline-matcha-almond')!;
      presetItems = [darkStraw, gelatoStraw, praline, matchaPraline];
    }
    onSelectPreset(presetItems);
  };

  const handleCopyOrderText = () => {
    const lines = [
      `[고디바 롯데월드몰점 모찌 주문표]`,
      ...selectedMochis.map((m, i) => `${i + 1}. ${m.name} (${m.price.toLocaleString()}원)`),
      includeGiftBox ? `• 포장: +프리미엄 4구 골드 리본 기프트 박스 & 쇼핑백 (+2,500원)` : `• 포장: 기본 개별 포장`,
      `• 총 예상 결제 금액: ${totalPrice.toLocaleString()}원`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#D4AF37]/50 max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-[#24140C] text-[#FDFBF7] p-4 sm:p-5 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#24140C] flex items-center justify-center font-bold">
              🎁
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#FDFBF7]">
                나만의 고디바 모찌 4구 박스 플래너
              </h3>
              <p className="text-[11px] text-[#D4AF37]">
                현장 주문 시 카운터에 바로 제시할 수 있는 사전 주문표입니다
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCheckoutMode ? (
          <PreOrderCheckoutView
            title="나만의 모찌 박스"
            items={selectedMochis.map((m) => ({
              name: m.name,
              quantity: 1,
              unitPrice: m.price,
            }))}
            packagingFee={packagingFee}
            totalPrice={totalPrice}
            onBack={() => setIsCheckoutMode(false)}
            onPaymentCompleteDone={() => {
              onClearAll();
              handleCloseModal();
            }}
          />
        ) : (
        <>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-stone-800 flex-1">
          
          {/* Quick Preset Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                인기 추천 조합 원클릭 담기:
              </span>
              {selectedMochis.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  전체 비우기
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleApplyPreset('bestseller')}
                className="bg-stone-100 hover:bg-[#D4AF37]/20 border border-stone-200 hover:border-[#D4AF37] p-2.5 rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="text-[11px] font-bold text-rose-700">👑 베스트 믹스</div>
                <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">다크딸기2+프랄린+말차</div>
              </button>
              <button
                onClick={() => handleApplyPreset('allfruit')}
                className="bg-stone-100 hover:bg-[#D4AF37]/20 border border-stone-200 hover:border-[#D4AF37] p-2.5 rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="text-[11px] font-bold text-emerald-700">🍓 생과일 4종</div>
                <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">딸기+말차+바나나+귤</div>
              </button>
              <button
                onClick={() => handleApplyPreset('luxury')}
                className="bg-stone-100 hover:bg-[#D4AF37]/20 border border-stone-200 hover:border-[#D4AF37] p-2.5 rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="text-[11px] font-bold text-amber-800">✨ 시그니처 4선</div>
                <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">딸기+젤라또+프랄린+말차</div>
              </button>
            </div>
          </div>

          {/* 4-Slots Box Visualizer */}
          <div className="bg-[#24140C] text-white p-4 rounded-2xl border border-[#D4AF37]/40 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#D4AF37]">
                박스 수납 상태 ({selectedMochis.length} / 4구)
              </span>
              <span className="text-stone-400 text-[11px]">
                {selectedMochis.length === 4 ? '🎉 4구 완성!' : `${4 - selectedMochis.length}개 더 선택 가능`}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[0, 1, 2, 3].map((idx) => {
                const item = selectedMochis[idx];
                return (
                  <div
                    key={idx}
                    className={`min-h-[96px] rounded-xl border p-2 flex flex-col justify-between relative transition-all ${
                      item
                        ? 'bg-[#180d07] border-[#D4AF37] shadow-md'
                        : 'bg-stone-900/60 border-dashed border-stone-700 text-stone-500'
                    }`}
                  >
                    {item ? (
                      <>
                        <button
                          onClick={() => onRemoveMochi(idx)}
                          className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-rose-700 cursor-pointer shadow"
                          title="삭제"
                        >
                          ✕
                        </button>
                        <div className="flex items-center gap-1.5">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-7 h-7 rounded-full object-cover border border-[#D4AF37]/50 shrink-0"
                          />
                          <span className="text-[10px] text-[#D4AF37] font-mono">0{idx + 1}구</span>
                        </div>
                        <div className="mt-1">
                          <p className="text-xs font-bold text-white line-clamp-1">{item.name}</p>
                          <p className="text-[11px] text-amber-200/90 font-semibold">{item.price.toLocaleString()}원</p>
                        </div>
                      </>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center p-2">
                        <span className="text-xs font-mono text-stone-500">0{idx + 1}구 빈자리</span>
                        <span className="text-[10px] text-stone-600 mt-1">하단에서 추가</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Add Mochi List */}
          <div>
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
              모찌 맛 추가하기 ({selectedMochis.length < 4 ? '클릭 시 바로 슬롯에 추가됩니다' : '최대 4개 선택 완료'}):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {MOCHI_ITEMS.filter(item => item.isMochiBoxEligible !== false).map((item) => (
                <button
                  key={item.id}
                  disabled={selectedMochis.length >= 4}
                  onClick={() => onAddMochi(item)}
                  className={`p-2 rounded-xl border flex items-center justify-between text-left transition-all ${
                    selectedMochis.length >= 4
                      ? 'opacity-50 cursor-not-allowed bg-stone-50 border-stone-200'
                      : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-[#D4AF37] cursor-pointer shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-stone-900 line-clamp-1">{item.name}</p>
                      <p className="text-[10px] text-stone-500">{item.price.toLocaleString()}원</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Gift Box Option Toggle */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#24140C] text-[#D4AF37] flex items-center justify-center shrink-0">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h5 className="font-bold text-amber-950 text-sm">프리미엄 4구 골드 리본 기프트 박스 + 쇼핑백</h5>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    +2,500원
                  </span>
                </div>
                <p className="text-xs text-amber-900/80 mt-0.5">
                  선물용 전용 하드 케이스와 새틴 골드 리본 매듭, 고디바 쇼핑백 풀세트 제공
                </p>
              </div>
            </div>

            <button
              onClick={onToggleGiftBox}
              className={`w-6 h-6 rounded-md border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                includeGiftBox
                  ? 'bg-[#24140C] border-[#24140C] text-[#D4AF37]'
                  : 'bg-white border-stone-400'
              }`}
            >
              {includeGiftBox && <Check className="w-4 h-4 stroke-[3]" />}
            </button>
          </div>

          {/* Price Calculation Summary */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-stone-600">
              <span>모찌 {selectedMochis.length}개 소계:</span>
              <span className="font-semibold text-stone-800">{mochiSubtotal.toLocaleString()}원</span>
            </div>
            {includeGiftBox && (
              <div className="flex items-center justify-between text-stone-600">
                <span>프리미엄 선물 박스 포장:</span>
                <span className="font-semibold text-amber-800">+{STORE_INFO.giftBoxPrice.toLocaleString()}원</span>
              </div>
            )}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-base font-bold text-[#24140C]">
              <span>최종 예상 금액:</span>
              <span className="text-xl text-[#8B6E14]">{totalPrice.toLocaleString()}원</span>
            </div>
          </div>

          {/* Cashier Mobile Order Card toggle */}
          {showOrderCard && (
            <div className="p-4 bg-stone-900 text-stone-100 rounded-2xl border-2 border-[#D4AF37] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-stone-700 pb-2">
                <span className="text-[#D4AF37] font-bold">고디바 잠실 롯데월드몰점 카운터 제시용</span>
                <span className="text-[10px] text-stone-400">1인 구매 한정</span>
              </div>
              <div className="space-y-1.5">
                {selectedMochis.map((m, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{i + 1}. {m.name}</span>
                    <span className="text-stone-400">{m.price.toLocaleString()}원</span>
                  </div>
                ))}
                {includeGiftBox && (
                  <div className="flex justify-between text-amber-300">
                    <span>+ 골드 리본 기프트 박스 &amp; 쇼핑백</span>
                    <span>2,500원</span>
                  </div>
                )}
              </div>
              <div className="pt-2 border-t border-stone-700 flex justify-between font-bold text-sm text-[#F3E5AB]">
                <span>합계</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => setShowOrderCard(!showOrderCard)}
            className="w-full sm:w-auto flex-1 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>{showOrderCard ? '카운터 제시표 닫기' : '카운터 제시용 주문표 보기'}</span>
          </button>

          <button
            onClick={handleCopyOrderText}
            className="w-full sm:w-auto flex-1 bg-stone-800 hover:bg-stone-900 text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedOrder ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-300" />
                <span>주문 내역 복사하기</span>
              </>
            )}
          </button>

          <button
            disabled={selectedMochis.length === 0}
            onClick={() => setIsCheckoutMode(true)}
            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B89326] disabled:opacity-50 text-[#24140C] font-extrabold text-xs sm:text-sm py-3 px-5 rounded-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md tabular-nums"
          >
            <CreditCard className="w-4 h-4 text-[#24140C]" />
            <span>{selectedMochis.length > 0 ? `${totalPrice.toLocaleString()}원 미리 결제하기` : '미리 결제하기'}</span>
          </button>
        </div>
        </>
        )}

      </div>
    </div>
  );
};
