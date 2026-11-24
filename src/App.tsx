/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MOCHI_ITEMS, MochiItem } from '@/src/data/mochiData';
import { Header } from '@/src/components/Header';
import { HeroSection } from '@/src/components/HeroSection';
import { LiveStatusBanner } from '@/src/components/LiveStatusBanner';
import { MenuSection } from '@/src/components/MenuSection';
import { GiftPackageSection } from '@/src/components/GiftPackageSection';
import { WaitingAndBuyingGuide } from '@/src/components/WaitingAndBuyingGuide';
import { AlternativeGuideSection } from '@/src/components/AlternativeGuideSection';
import { StoreLocationSection } from '@/src/components/StoreLocationSection';
import { FAQSection } from '@/src/components/FAQSection';
import { Footer } from '@/src/components/Footer';
import { StickyBottomBar } from '@/src/components/StickyBottomBar';
import { MochiBoxPlannerModal } from '@/src/components/MochiBoxPlannerModal';
import { AllMenuCartModal, GeneralCartItem, WaffleBaseOption } from '@/src/components/AllMenuCartModal';

export default function App() {
  // Default with 2 popular items
  const [selectedMochis, setSelectedMochis] = useState<MochiItem[]>([
    MOCHI_ITEMS[0], // 다크 초콜릿 딸기 모찌
    MOCHI_ITEMS[4], // 다크 초콜릿 아몬드 프랄린 모찌
  ]);
  const [includeGiftBox, setIncludeGiftBox] = useState<boolean>(true);
  const [isPlannerOpen, setIsPlannerOpen] = useState<boolean>(false);
  const [generalCart, setGeneralCart] = useState<GeneralCartItem[]>([]);
  const [isGeneralCartOpen, setIsGeneralCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const generalCartCount = generalCart.reduce((sum, entry) => sum + entry.quantity, 0);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddMochi = (item: MochiItem) => {
    if (selectedMochis.length >= 4) {
      showToast('모찌 박스는 최대 4개까지 담을 수 있습니다 (1박스 완성)');
      setIsPlannerOpen(true);
      return;
    }
    setSelectedMochis(prev => [...prev, item]);
    showToast(`'${item.name}'이(가) 모찌 박스에 담겼습니다 (${selectedMochis.length + 1}/4)`);
  };

  const handleRemoveMochi = (index: number) => {
    setSelectedMochis(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearAll = () => {
    setSelectedMochis([]);
    showToast('모찌 박스가 비워졌습니다.');
  };

  const handleToggleGiftBox = () => {
    setIncludeGiftBox(prev => !prev);
  };

  const handleSelectPreset = (items: MochiItem[]) => {
    setSelectedMochis(items);
    showToast('추천 4구 조합이 적용되었습니다!');
  };

  const handleAddToGeneralCart = (item: MochiItem, waffleOption?: WaffleBaseOption) => {
    setGeneralCart(prev => {
      const existingIndex = prev.findIndex(
        entry => entry.item.id === item.id && entry.waffleOption === waffleOption
      );
      if (existingIndex > -1) {
        return prev.map((entry, idx) =>
          idx === existingIndex ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1, waffleOption }];
    });
    const optionText = waffleOption ? ` (${waffleOption})` : '';
    showToast(`'${item.name}${optionText}'이(가) 전체 메뉴 장바구니에 담겼습니다`);
  };

  const handleUpdateGeneralQty = (index: number, delta: number) => {
    setGeneralCart(prev =>
      prev
        .map((entry, idx) =>
          idx === index ? { ...entry, quantity: entry.quantity + delta } : entry
        )
        .filter(entry => entry.quantity > 0)
    );
  };

  const handleUpdateWaffleOption = (index: number, option: WaffleBaseOption) => {
    setGeneralCart(prev =>
      prev.map((entry, idx) => (idx === index ? { ...entry, waffleOption: option } : entry))
    );
  };

  const handleRemoveGeneralItem = (index: number) => {
    setGeneralCart(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearGeneralCart = () => {
    setGeneralCart([]);
    showToast('전체 메뉴 장바구니가 비워졌습니다.');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#24140C] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#24140C]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#24140C] text-[#F3E5AB] border border-[#D4AF37] px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-2xl animate-bounce">
          ✨ {toastMessage}
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        onOpenPlanner={() => setIsPlannerOpen(true)}
        cartCount={selectedMochis.length}
        onOpenGeneralCart={() => setIsGeneralCartOpen(true)}
        generalCartCount={generalCartCount}
      />

      {/* Hero Banner Section */}
      <main className="flex-1">
        <HeroSection onOpenPlanner={() => setIsPlannerOpen(true)} />

        {/* Real-Time Live Status Banner */}
        <LiveStatusBanner />

        {/* Menu & Pricing Lineup */}
        <MenuSection
          onAddToPlanner={handleAddMochi}
          selectedMochis={selectedMochis}
          onAddToGeneralCart={handleAddToGeneralCart}
          generalCartItems={generalCart}
        />

        {/* Gift Package Section */}
        <GiftPackageSection
          onOpenPlanner={() => setIsPlannerOpen(true)}
          selectedMochis={selectedMochis}
          includeGiftBox={includeGiftBox}
          onToggleGiftBox={handleToggleGiftBox}
        />

        {/* Waiting & Purchasing Guide */}
        <WaitingAndBuyingGuide />

        {/* Sold-out Alternative Dessert Guide (Plan B) */}
        <AlternativeGuideSection />

        {/* Store Location & Direction Section */}
        <StoreLocationSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom Quick Action Bar */}
      <StickyBottomBar
        onOpenPlanner={() => setIsPlannerOpen(true)}
        cartCount={selectedMochis.length}
        onOpenGeneralCart={() => setIsGeneralCartOpen(true)}
        generalCartCount={generalCartCount}
      />

      {/* 4-Piece Mochi Box Planner & Checkout Modal */}
      <MochiBoxPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        selectedMochis={selectedMochis}
        onRemoveMochi={handleRemoveMochi}
        onAddMochi={handleAddMochi}
        onClearAll={handleClearAll}
        includeGiftBox={includeGiftBox}
        onToggleGiftBox={handleToggleGiftBox}
        onSelectPreset={handleSelectPreset}
      />

      {/* All-Menu General Purchase Cart Modal */}
      <AllMenuCartModal
        isOpen={isGeneralCartOpen}
        onClose={() => setIsGeneralCartOpen(false)}
        cartItems={generalCart}
        onAddItem={handleAddToGeneralCart}
        onUpdateQty={handleUpdateGeneralQty}
        onUpdateWaffleOption={handleUpdateWaffleOption}
        onRemoveItem={handleRemoveGeneralItem}
        onClearCart={handleClearGeneralCart}
      />

    </div>
  );
}
