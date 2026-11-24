import React from 'react';
import { STORE_INFO } from '@/src/data/mochiData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#180d07] text-stone-400 border-t border-[#D4AF37]/20 pt-16 pb-24 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-stone-800 pb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-brand text-2xl font-bold tracking-[0.25em] text-[#D4AF37]">
                GODIVA
              </span>
              <span className="text-[11px] tracking-widest text-stone-500 uppercase">
                Chocolatier · Brussels 1926
              </span>
            </div>
            <p className="font-serif-luxury text-stone-400 text-xs mt-1">
              고디바 모찌(CHOCOLATE MOCHI) 공식 구매 안내 가이드
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-400 hover:text-[#D4AF37] border border-stone-800 px-3 py-1.5 rounded-full hover:bg-stone-900 transition-colors cursor-pointer"
          >
            <span>맨 위로 이동</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h5 className="font-bold text-white mb-2">판매 매장 정보</h5>
            <p className="text-stone-400 leading-relaxed">
              {STORE_INFO.name}<br />
              {STORE_INFO.address}<br />
              전화문의: {STORE_INFO.phone}
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">운영 및 구매 수량 안내</h5>
            <p className="text-stone-400 leading-relaxed">
              운영 시간: {STORE_INFO.operatingHours}<br />
              구매 수량: {STORE_INFO.purchaseLimit}<br />
              포장 옵션: 4개입 전용 골드 기프트 박스 (+2,500원)
            </p>
          </div>

          <div>
            <h5 className="font-bold text-white mb-2">유의사항</h5>
            <p className="text-stone-400 leading-relaxed">
              본 웹사이트는 고디바 잠실 롯데월드몰점 초콜릿 찹쌀떡(모찌) 컬렉션의 실제 메뉴, 가격, 실시간 대기 현황 및 구매 팁을 제공하기 위해 제작되었습니다.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <p>© 2026 GODIVA CHOCOLATIER. ALL RIGHTS RESERVED. GODIVA MOCHI COLLECTION.</p>
          <p className="text-amber-200/50">Designed with Godiva Luxury Palette (Deep Brown &amp; Gold)</p>
        </div>

      </div>
    </footer>
  );
};
