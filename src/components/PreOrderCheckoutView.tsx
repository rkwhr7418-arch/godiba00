import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  Loader2,
  MapPin,
  ShieldCheck,
  Smartphone,
  Copy,
  Check,
  Store,
} from 'lucide-react';

export interface CheckoutLineItem {
  name: string;
  optionText?: string;
  quantity: number;
  unitPrice: number;
}

type PaymentMethodId = 'kakaopay' | 'naverpay' | 'tosspay' | 'card';

interface PaymentMethodMeta {
  id: PaymentMethodId;
  name: string;
  sub: string;
  badgeBg: string;
  badgeText: string;
}

const PAYMENT_METHODS: PaymentMethodMeta[] = [
  {
    id: 'kakaopay',
    name: '카카오페이',
    sub: '간편 원터치 결제',
    badgeBg: 'bg-[#FEE500]',
    badgeText: 'text-[#191919]',
  },
  {
    id: 'naverpay',
    name: '네이버페이',
    sub: '포인트 적립 혜택',
    badgeBg: 'bg-[#03C75A]',
    badgeText: 'text-white',
  },
  {
    id: 'tosspay',
    name: '토스페이',
    sub: '빠른 계좌/카드 결제',
    badgeBg: 'bg-[#0064FF]',
    badgeText: 'text-white',
  },
  {
    id: 'card',
    name: '신용 · 체크카드',
    sub: '일반 카드 결제',
    badgeBg: 'bg-stone-800',
    badgeText: 'text-[#F3E5AB]',
  },
];

const PICKUP_SLOTS = [
  '즉시 픽업 (약 15~20분 후)',
  '오늘 14:00 ~ 14:30',
  '오늘 16:00 ~ 16:30',
  '오늘 18:00 ~ 18:30',
];

interface PreOrderCheckoutViewProps {
  title: string;
  items: CheckoutLineItem[];
  packagingFee?: number;
  totalPrice: number;
  onBack: () => void;
  onPaymentCompleteDone: () => void;
}

export const PreOrderCheckoutView: React.FC<PreOrderCheckoutViewProps> = ({
  title,
  items,
  packagingFee = 0,
  totalPrice,
  onBack,
  onPaymentCompleteDone,
}) => {
  const [step, setStep] = useState<'form' | 'processing' | 'receipt'>('form');
  const [customerName, setCustomerName] = useState<string>('김고디');
  const [customerPhone, setCustomerPhone] = useState<string>('010-1234-5678');
  const [pickupSlot, setPickupSlot] = useState<string>(PICKUP_SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodId>('kakaopay');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [pickupTicketNo, setPickupTicketNo] = useState<number>(18);
  const [paidAt, setPaidAt] = useState<string>('');
  const [copiedReceipt, setCopiedReceipt] = useState<boolean>(false);

  const selectedMethodMeta =
    PAYMENT_METHODS.find((m) => m.id === paymentMethod) || PAYMENT_METHODS[0];

  const handlePaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError('주문자 성함을 입력해 주세요.');
      return;
    }
    if (!customerPhone.trim()) {
      setValidationError('픽업 알림을 받을 연락처를 입력해 주세요.');
      return;
    }
    if (!agreedTerms) {
      setValidationError('주문 내용 확인 및 결제 진행에 동의해 주세요.');
      return;
    }
    setValidationError(null);
    setStep('processing');

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const randomTicket = Math.floor(11 + Math.random() * 48);
    const now = new Date();
    const formattedTime = now.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    setTimeout(() => {
      setOrderNumber(`GDV-${randomCode}`);
      setPickupTicketNo(randomTicket);
      setPaidAt(formattedTime);
      setStep('receipt');
    }, 950);
  };

  const handleCopyReceipt = () => {
    const lines = [
      `[고디바 롯데월드몰점 모바일 사전 결제 영수증]`,
      `• 주문번호: ${orderNumber} (픽업 대기 ${pickupTicketNo}번)`,
      `• 주문자: ${customerName} (${customerPhone})`,
      `• 픽업 희망 시간: ${pickupSlot}`,
      `• 결제 수단: ${selectedMethodMeta.name} (${paidAt} 승인)`,
      `--- 주문 상품 ---`,
      ...items.map(
        (it, i) =>
          `${i + 1}. ${it.name}${it.optionText ? ` [${it.optionText}]` : ''} × ${it.quantity}개 (${(it.unitPrice * it.quantity).toLocaleString()}원)`
      ),
      ...(packagingFee > 0
        ? [`• 프리미엄 4구 골드 리본 기프트 박스 & 쇼핑백 (+${packagingFee.toLocaleString()}원)`]
        : []),
      `• 총 결제 완료 금액: ${totalPrice.toLocaleString()}원`,
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  if (step === 'processing') {
    return (
      <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-4 min-h-[360px]">
        <div className="w-16 h-16 rounded-full bg-[#24140C] text-[#D4AF37] flex items-center justify-center shadow-lg">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        <div className="space-y-1.5">
          <h4 className="font-serif-luxury text-xl font-bold text-[#24140C]">
            {selectedMethodMeta.name} 결제 승인 진행 중...
          </h4>
          <p className="text-xs sm:text-sm text-stone-600">
            잠실 롯데월드몰점 픽업 주문을 안전하게 접수하고 있습니다.
          </p>
        </div>
        <div className="bg-stone-100 border border-stone-200 rounded-xl px-4 py-2 text-xs font-bold text-[#8B6E14] tabular-nums">
          결제 예정 금액: {totalPrice.toLocaleString()}원
        </div>
      </div>
    );
  }

  if (step === 'receipt') {
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-stone-800 flex-1">
          {/* Payment Success Hero */}
          <div className="bg-[#24140C] text-[#FDFBF7] rounded-2xl p-5 border border-[#D4AF37]/60 text-center space-y-3 shadow-lg">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>결제 완료 · 매장 픽업 접수</span>
            </div>

            <div>
              <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                모바일 픽업 대기번호
              </p>
              <p className="font-serif-luxury text-4xl sm:text-5xl font-extrabold text-[#F3E5AB] mt-1 tabular-nums">
                No. {pickupTicketNo}
              </p>
              <p className="text-xs text-stone-300 mt-1 tabular-nums">
                주문번호 {orderNumber} · {paidAt} 결제 승인
              </p>
            </div>

            {/* Clean SVG Barcode */}
            <div className="bg-white rounded-xl p-3 max-w-xs mx-auto flex flex-col items-center gap-1">
              <svg
                viewBox="0 0 220 40"
                className="w-full h-9 text-[#24140C]"
                aria-label="픽업 주문 바코드"
              >
                <rect x="4" y="2" width="3" height="36" fill="currentColor" />
                <rect x="10" y="2" width="2" height="36" fill="currentColor" />
                <rect x="16" y="2" width="5" height="36" fill="currentColor" />
                <rect x="24" y="2" width="2" height="36" fill="currentColor" />
                <rect x="30" y="2" width="4" height="36" fill="currentColor" />
                <rect x="38" y="2" width="2" height="36" fill="currentColor" />
                <rect x="44" y="2" width="6" height="36" fill="currentColor" />
                <rect x="54" y="2" width="2" height="36" fill="currentColor" />
                <rect x="60" y="2" width="3" height="36" fill="currentColor" />
                <rect x="67" y="2" width="5" height="36" fill="currentColor" />
                <rect x="76" y="2" width="2" height="36" fill="currentColor" />
                <rect x="82" y="2" width="4" height="36" fill="currentColor" />
                <rect x="90" y="2" width="2" height="36" fill="currentColor" />
                <rect x="96" y="2" width="6" height="36" fill="currentColor" />
                <rect x="106" y="2" width="2" height="36" fill="currentColor" />
                <rect x="112" y="2" width="4" height="36" fill="currentColor" />
                <rect x="120" y="2" width="2" height="36" fill="currentColor" />
                <rect x="126" y="2" width="5" height="36" fill="currentColor" />
                <rect x="135" y="2" width="2" height="36" fill="currentColor" />
                <rect x="141" y="2" width="3" height="36" fill="currentColor" />
                <rect x="148" y="2" width="6" height="36" fill="currentColor" />
                <rect x="158" y="2" width="2" height="36" fill="currentColor" />
                <rect x="164" y="2" width="4" height="36" fill="currentColor" />
                <rect x="172" y="2" width="2" height="36" fill="currentColor" />
                <rect x="178" y="2" width="5" height="36" fill="currentColor" />
                <rect x="187" y="2" width="2" height="36" fill="currentColor" />
                <rect x="193" y="2" width="4" height="36" fill="currentColor" />
                <rect x="201" y="2" width="2" height="36" fill="currentColor" />
                <rect x="207" y="2" width="5" height="36" fill="currentColor" />
                <rect x="215" y="2" width="2" height="36" fill="currentColor" />
              </svg>
              <span className="font-mono text-[10px] tracking-[0.25em] text-stone-700 font-bold">
                {orderNumber}-PICKUP-{pickupTicketNo}
              </span>
            </div>
          </div>

          {/* Pickup & Payment Details */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
                픽업 매장
              </span>
              <span className="font-bold text-[#24140C]">고디바 롯데월드몰점 (B1F)</span>
            </div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                픽업 예정 시간
              </span>
              <span className="font-semibold text-stone-900">{pickupSlot}</span>
            </div>
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <span className="text-stone-500">주문자 정보</span>
              <span className="font-semibold text-stone-900">
                {customerName} · {customerPhone}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-stone-500">결제 수단</span>
              <span className="font-bold text-[#8B6E14]">{selectedMethodMeta.name} (일시불)</span>
            </div>
          </div>

          {/* Itemized Receipt */}
          <div className="bg-[#FAF7F2] rounded-2xl border border-[#EAE3D2] p-4 space-y-2 text-xs sm:text-sm">
            <span className="text-xs font-bold text-[#8B6E14] uppercase tracking-wider block">
              {title} 결제 내역
            </span>
            <div className="space-y-1.5 border-b border-stone-200 pb-2.5">
              {items.map((it, idx) => (
                <div key={idx} className="flex justify-between gap-2 text-stone-700">
                  <span>
                    {it.name}
                    {it.optionText ? ` (${it.optionText})` : ''} × {it.quantity}
                  </span>
                  <span className="font-semibold text-stone-900 shrink-0 tabular-nums">
                    {(it.unitPrice * it.quantity).toLocaleString()}원
                  </span>
                </div>
              ))}
              {packagingFee > 0 && (
                <div className="flex justify-between gap-2 text-amber-900">
                  <span>프리미엄 4구 골드 리본 기프트 박스 &amp; 쇼핑백</span>
                  <span className="font-semibold shrink-0 tabular-nums">
                    +{packagingFee.toLocaleString()}원
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between font-extrabold text-base text-[#24140C] pt-1">
              <span>최종 결제 금액</span>
              <span className="text-xl text-[#8B6E14] tabular-nums">
                {totalPrice.toLocaleString()}원
              </span>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 text-center leading-relaxed bg-stone-100 rounded-xl p-3">
            * 본 화면은 사전 결제 및 모바일 픽업 영수증 안내 화면입니다. 실제 매장 카운터 방문 시 주문 내역을 함께 제시해 주세요.
          </p>
        </div>

        {/* Receipt Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyReceipt}
            className="w-full sm:w-auto flex-1 bg-stone-800 hover:bg-stone-900 text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedReceipt ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">영수증 복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-300" />
                <span>모바일 영수증 복사</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onPaymentCompleteDone}
            className="w-full sm:w-auto flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B89326] text-[#24140C] font-bold text-xs sm:text-sm py-3 px-6 rounded-xl hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            확인 완료
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePaySubmit} className="flex-1 flex flex-col overflow-hidden">
      <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-stone-800 flex-1">
        {/* Back button + Title */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 hover:text-[#24140C] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>장바구니로 돌아가기</span>
          </button>
          <span className="text-xs font-bold text-[#8B6E14] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
            모바일 사전 결제
          </span>
        </div>

        {/* Store Info Banner */}
        <div className="bg-[#FAF7F2] border border-[#EAE3D2] rounded-2xl p-3.5 flex items-start gap-3 text-xs">
          <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-[#24140C]">픽업 매장: 고디바 롯데월드몰점 (B1F)</p>
            <p className="text-stone-600 mt-0.5">
              서울특별시 송파구 올림픽로 300 롯데월드몰 지하 1층 왕관 분수대 인근
            </p>
          </div>
        </div>

        {/* Pickup Person & Time */}
        <div className="space-y-3 bg-white border border-stone-200 rounded-2xl p-4">
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>픽업 예약자 정보</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                주문자 성함
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="홍길동"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:border-[#D4AF37] bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                연락처 (픽업 알림용)
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="010-0000-0000"
                className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:outline-none focus:border-[#D4AF37] bg-white tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1.5">
              매장 픽업 희망 시간
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PICKUP_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setPickupSlot(slot)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border text-left transition-all cursor-pointer ${
                    pickupSlot === slot
                      ? 'bg-[#24140C] text-[#F3E5AB] border-[#D4AF37]'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3 bg-white border border-stone-200 rounded-2xl p-4">
          <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>결제 수단 선택</span>
          </h4>

          <div className="grid grid-cols-2 gap-2.5">
            {PAYMENT_METHODS.map((method) => {
              const isSelected = paymentMethod === method.id;
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'border-[#D4AF37] bg-amber-50/70 ring-2 ring-[#D4AF37]/30'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg ${method.badgeBg} ${method.badgeText} font-extrabold text-[11px] flex items-center justify-center shrink-0`}
                  >
                    {method.name.slice(0, 2)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-[#24140C] truncate">
                      {method.name}
                    </p>
                    <p className="text-[10px] text-stone-500 truncate">{method.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Amount Summary */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between text-stone-600">
            <span>주문 상품 ({items.reduce((s, it) => s + it.quantity, 0)}개)</span>
            <span className="font-semibold text-stone-800 tabular-nums">
              {(totalPrice - packagingFee).toLocaleString()}원
            </span>
          </div>
          {packagingFee > 0 && (
            <div className="flex justify-between text-stone-600">
              <span>골드 리본 기프트 박스 포장</span>
              <span className="font-semibold text-amber-800 tabular-nums">
                +{packagingFee.toLocaleString()}원
              </span>
            </div>
          )}
          <div className="pt-2 border-t border-stone-100 flex justify-between items-center font-bold text-base text-[#24140C]">
            <span>총 결제 금액</span>
            <span className="text-xl text-[#8B6E14] tabular-nums">
              {totalPrice.toLocaleString()}원
            </span>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer select-none px-1">
          <input
            type="checkbox"
            checked={agreedTerms}
            onChange={(e) => setAgreedTerms(e.target.checked)}
            className="mt-0.5 accent-[#24140C] w-4 h-4 rounded cursor-pointer"
          />
          <span>
            주문 상품(수량·와플 옵션) 및 픽업 매장을 확인하였으며,{' '}
            <strong>{selectedMethodMeta.name}</strong> 사전 결제를 진행합니다.
          </span>
        </label>

        {validationError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl">
            {validationError}
          </div>
        )}
      </div>

      {/* Footer Submit Button */}
      <div className="p-4 sm:p-5 bg-stone-100 border-t border-stone-200 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-3 border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 rounded-xl text-xs sm:text-sm font-semibold cursor-pointer"
        >
          이전
        </button>
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B89326] text-[#24140C] font-extrabold text-sm sm:text-base py-3 px-6 rounded-xl shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer tabular-nums"
        >
          <ShieldCheck className="w-5 h-5 text-[#24140C]" />
          <span>{totalPrice.toLocaleString()}원 미리 결제하기</span>
        </button>
      </div>
    </form>
  );
};
