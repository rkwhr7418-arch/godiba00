import React, { useState } from 'react';
import { MochiItem, MOCHI_ITEMS } from '@/src/data/mochiData';
import { X, Trash2, Plus, Minus, ShoppingCart, Copy, Check, FileText, CreditCard } from 'lucide-react';
import { PreOrderCheckoutView } from '@/src/components/PreOrderCheckoutView';

export type WaffleBaseOption = '초코 와플' | '플레인 와플';

export interface GeneralCartItem {
  item: MochiItem;
  quantity: number;
  waffleOption?: WaffleBaseOption;
}

interface AllMenuCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: GeneralCartItem[];
  onAddItem: (item: MochiItem, waffleOption?: WaffleBaseOption) => void;
  onUpdateQty: (index: number, delta: number) => void;
  onUpdateWaffleOption: (index: number, option: WaffleBaseOption) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const AllMenuCartModal: React.FC<AllMenuCartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onAddItem,
  onUpdateQty,
  onUpdateWaffleOption,
  onRemoveItem,
  onClearCart,
}) => {
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [showOrderCard, setShowOrderCard] = useState(false);
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [quickAddFilter, setQuickAddFilter] = useState<'all' | 'mochi' | 'gelato-waffle'>('all');

  if (!isOpen) return null;

  const handleCloseModal = () => {
    setIsCheckoutMode(false);
    onClose();
  };

  const totalQty = cartItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const totalPrice = cartItems.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);

  const quickAddItems = MOCHI_ITEMS.filter((m) => {
    if (quickAddFilter === 'mochi') return m.isMochiBoxEligible !== false;
    if (quickAddFilter === 'gelato-waffle') return m.isMochiBoxEligible === false;
    return true;
  });

  const handleCopyOrderText = () => {
    if (cartItems.length === 0) return;
    const lines = [
      `[고디바 롯데월드몰점 전체 메뉴 주문표]`,
      ...cartItems.map((entry, i) => {
        const opt = entry.waffleOption ? ` [${entry.waffleOption}]` : '';
        return `${i + 1}. ${entry.item.name}${opt} × ${entry.quantity}개 (${(entry.item.price * entry.quantity).toLocaleString()}원)`;
      }),
      `• 총 수량: ${totalQty}개`,
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
            <div className="w-9 h-9 rounded-full bg-[#D4AF37] text-[#24140C] flex items-center justify-center shrink-0">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#FDFBF7]">
                전체 메뉴 구매 장바구니
              </h3>
              <p className="text-[11px] text-[#D4AF37]">
                모찌 · 클래식 젤라또 · 프레시 와플 모든 메뉴를 수량 제한 없이 담아보세요
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
            title="전체 메뉴 주문"
            items={cartItems.map((entry) => ({
              name: entry.item.name,
              optionText: entry.waffleOption,
              quantity: entry.quantity,
              unitPrice: entry.item.price,
            }))}
            totalPrice={totalPrice}
            onBack={() => setIsCheckoutMode(false)}
            onPaymentCompleteDone={() => {
              onClearCart();
              handleCloseModal();
            }}
          />
        ) : (
        <>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-stone-800 flex-1">

          {/* Cart Items List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                담긴 메뉴 ({totalQty}개)
              </span>
              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  전체 비우기
                </button>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-6 text-center space-y-2">
                <p className="text-sm font-semibold text-stone-700">
                  아직 담은 메뉴가 없습니다.
                </p>
                <p className="text-xs text-stone-500">
                  아래에서 원하시는 모찌·젤라또·와플 메뉴를 선택해 추가해보세요.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {cartItems.map((entry, idx) => (
                  <div
                    key={`${entry.item.id}-${entry.waffleOption || 'default'}-${idx}`}
                    className="bg-white border border-stone-200 rounded-2xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={entry.item.image}
                        alt={entry.item.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-semibold text-[#8B6E14] block">
                          {entry.item.categoryLabel}
                        </span>
                        <h4 className="text-sm font-bold text-[#24140C] truncate">
                          {entry.item.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs font-semibold text-stone-600 tabular-nums">
                            개당 {entry.item.price.toLocaleString()}원
                          </span>
                          {entry.item.category === 'fresh-waffle-fruit' && (
                            <div className="inline-flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                              {(['초코 와플', '플레인 와플'] as WaffleBaseOption[]).map((opt) => (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() => onUpdateWaffleOption(idx, opt)}
                                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors cursor-pointer ${
                                    (entry.waffleOption || '초코 와플') === opt
                                      ? 'bg-[#24140C] text-[#F3E5AB]'
                                      : 'text-stone-600 hover:text-stone-900'
                                  }`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-100">
                      <div className="flex items-center gap-1.5 bg-stone-100 rounded-xl p-1 border border-stone-200">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(idx, -1)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 flex items-center justify-center text-stone-700 cursor-pointer shadow-2xs"
                          aria-label="수량 감소"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#24140C] tabular-nums">
                          {entry.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(idx, 1)}
                          className="w-7 h-7 rounded-lg bg-white hover:bg-stone-200 flex items-center justify-center text-stone-700 cursor-pointer shadow-2xs"
                          aria-label="수량 증가"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[74px] tabular-nums">
                        <span className="text-sm font-extrabold text-[#24140C]">
                          {(entry.item.price * entry.quantity).toLocaleString()}원
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(idx)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        aria-label="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Add Any Menu Item */}
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
                전체 메뉴에서 바로 추가하기 ({MOCHI_ITEMS.length}종)
              </span>
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 self-start">
                <button
                  type="button"
                  onClick={() => setQuickAddFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    quickAddFilter === 'all' ? 'bg-[#24140C] text-[#F3E5AB]' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  전체
                </button>
                <button
                  type="button"
                  onClick={() => setQuickAddFilter('mochi')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    quickAddFilter === 'mochi' ? 'bg-[#24140C] text-[#F3E5AB]' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  모찌 (15)
                </button>
                <button
                  type="button"
                  onClick={() => setQuickAddFilter('gelato-waffle')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                    quickAddFilter === 'gelato-waffle' ? 'bg-[#24140C] text-[#F3E5AB]' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  젤라또·와플 (8)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
              {quickAddItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onAddItem(
                      item,
                      item.category === 'fresh-waffle-fruit' ? '초코 와플' : undefined
                    )
                  }
                  className="p-2 rounded-xl border bg-white hover:bg-stone-50 border-stone-200 hover:border-[#D4AF37] flex items-center justify-between text-left transition-all cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">{item.name}</p>
                      <p className="text-[10px] text-stone-500 tabular-nums">
                        {item.price.toLocaleString()}원 · {item.categoryLabel}
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/40 flex items-center justify-center text-[#8B6E14] shrink-0 ml-2">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-white rounded-2xl p-4 border border-stone-200 space-y-2 text-xs sm:text-sm">
            <div className="flex items-center justify-between text-stone-600">
              <span>총 선택 수량:</span>
              <span className="font-semibold text-stone-800 tabular-nums">{totalQty}개</span>
            </div>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-base font-bold text-[#24140C]">
              <span>최종 예상 결제 금액:</span>
              <span className="text-xl text-[#8B6E14] tabular-nums">{totalPrice.toLocaleString()}원</span>
            </div>
          </div>

          {/* Cashier Mobile Order Card */}
          {showOrderCard && cartItems.length > 0 && (
            <div className="p-4 bg-stone-900 text-stone-100 rounded-2xl border-2 border-[#D4AF37] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-stone-700 pb-2">
                <span className="text-[#D4AF37] font-bold">고디바 잠실 롯데월드몰점 카운터 제시용</span>
                <span className="text-[10px] text-stone-400">전체 메뉴 주문표</span>
              </div>
              <div className="space-y-1.5">
                {cartItems.map((entry, i) => (
                  <div key={i} className="flex justify-between gap-2">
                    <span>
                      {i + 1}. {entry.item.name}
                      {entry.waffleOption ? ` (${entry.waffleOption})` : ''} × {entry.quantity}
                    </span>
                    <span className="text-stone-400 shrink-0 tabular-nums">
                      {(entry.item.price * entry.quantity).toLocaleString()}원
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-stone-700 flex justify-between font-bold text-sm text-[#F3E5AB] tabular-nums">
                <span>합계 ({totalQty}개)</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => setShowOrderCard(!showOrderCard)}
            className="w-full sm:w-auto flex-1 bg-white border border-stone-300 hover:bg-stone-50 disabled:opacity-50 text-stone-800 text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            <span>{showOrderCard ? '카운터 제시표 닫기' : '카운터 제시용 주문표 보기'}</span>
          </button>

          <button
            type="button"
            disabled={cartItems.length === 0}
            onClick={handleCopyOrderText}
            className="w-full sm:w-auto flex-1 bg-stone-800 hover:bg-stone-900 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
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
            type="button"
            disabled={cartItems.length === 0}
            onClick={() => setIsCheckoutMode(true)}
            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B89326] disabled:opacity-50 text-[#24140C] font-extrabold text-xs sm:text-sm py-3 px-5 rounded-xl hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md tabular-nums"
          >
            <CreditCard className="w-4 h-4 text-[#24140C]" />
            <span>{cartItems.length > 0 ? `${totalPrice.toLocaleString()}원 미리 결제하기` : '미리 결제하기'}</span>
          </button>
        </div>
        </>
        )}

      </div>
    </div>
  );
};
