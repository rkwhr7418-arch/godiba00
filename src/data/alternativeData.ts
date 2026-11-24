import godivaBakeryImg from '@/src/assets/images/godiva_bakery_dessert_1793681177575.jpg';
import howMochiImg from '@/src/assets/images/how_mochi_assorted_1794284380114.jpg';
import venchiGelatoConeImg from '@/src/assets/images/venchi_gelato_cone_1793682483410.jpg';
import knottedDonutsImg from '@/src/assets/images/knotted_cream_donuts_1793682592358.jpg';

export interface AlternativePlace {
  id: string;
  name: string;
  category: 'godiva-bakery' | 'fruit-mochi' | 'gelato' | 'cafe-view';
  categoryLabel: string;
  location: string;
  distance: string;
  image: string;
  badge: string;
  badgeColor: string;
  whyRecommend: string;
  recommendedMenus: {
    name: string;
    price: string;
    desc: string;
  }[];
  satisfactionMatch: string;
  directions: string;
  mapSearchQuery: string;
  websiteUrl: string;
  websiteLabel: string;
}

export const ALTERNATIVE_PLACES: AlternativePlace[] = [
  {
    id: 'godiva-bakery',
    name: '고디바 베이커리 (롯데백화점 잠실점 B1F)',
    category: 'godiva-bakery',
    categoryLabel: '고디바 공식 빵집 (세계 2호점)',
    location: '서울 송파구 올림픽로 240 롯데백화점 잠실점 지하 1층 식품관',
    distance: '롯데월드몰 B1F 연결통로 도보 3분',
    image: godivaBakeryImg,
    badge: '대체 만족도 1위 ⭐',
    badgeColor: 'bg-amber-900 text-amber-100 border-amber-700',
    whyRecommend: '모찌는 품절되어도, 동일한 최고급 벨기에 고디바 초콜릿 가나슈 크림을 가득 채운 시그니처 소라빵과 뺑 오 쇼콜라, 진한 소프트 아이스크림을 바로 즐기실 수 있습니다.',
    recommendedMenus: [
      { name: '시그니처 초콜릿 소라빵(코로네)', price: '4,900원', desc: '바삭한 빵 속에 터져 나오는 진한 고디바 생초콜릿 크림' },
      { name: '더블 초콜릿 소프트 아이스크림', price: '6,800원', desc: '벨기에 다크 초콜릿의 깊고 부드러운 극강의 달콤함' },
      { name: '카카오 뺑 오 쇼콜라', price: '5,500원', desc: '결이 살아있는 버터 크루아상 속에 박힌 리얼 다크 바' },
    ],
    satisfactionMatch: '"고디바 찐한 초콜릿의 맛을 그대로 느끼고 싶을 때 강력 추천"',
    directions: '롯데월드몰 지하 1층 왕관 분수대에서 지하철 2호선 개찰구 방향 연결통로 직진 → 롯데백화점 지하 식품관 입구 바로 앞',
    mapSearchQuery: '잠실 롯데백화점 고디바 베이커리',
    websiteUrl: 'https://godivabakery.kr',
    websiteLabel: '고디바 베이커리 공식 사이트',
  },
  {
    id: 'songridan-fruit-mochi',
    name: '하우모찌 (HOW MOCHI)',
    category: 'fruit-mochi',
    categoryLabel: '생초코 & 아이스모찌 전문점',
    location: '서울 송파구 오금로18길 12 지하1층',
    distance: '롯데월드몰에서 석촌호수 건너 도보 8분 (송파나루역 인근)',
    image: howMochiImg,
    badge: '생초코 & 아이스모찌 ⭐',
    badgeColor: 'bg-rose-900 text-rose-100 border-rose-700',
    whyRecommend: '고디바 초콜릿 모찌나 젤라또 모찌를 놓치셨다면 완벽한 대안! 꾸덕하고 진한 생초코모찌와 시원하고 쫀득한 3가지 맛(딸기/초코/말차) 아이스모찌를 만나보실 수 있습니다.',
    recommendedMenus: [
      { name: '생초코모찌', price: '4,100원', desc: '꾸덕하고 짙은 생초콜릿 가나슈와 부드럽고 쫀득한 찹쌀피의 극상 조화' },
      { name: '아이스모찌 딸기', price: '6,500원', desc: '상큼달콤한 딸기 아이스크림과 쫄깃한 찹쌀떡의 시원한 하모니' },
      { name: '아이스모찌 초코', price: '6,500원', desc: '진한 초콜릿 아이스를 찹쌀피 속에 꽉 채운 프리미엄 아이스 모찌' },
      { name: '아이스모찌 말차', price: '6,500원', desc: '쌉싸름하고 깊은 말차 아이스크림이 부드럽게 녹아드는 시원한 맛' },
    ],
    satisfactionMatch: '"진한 생초코와 시원한 아이스모찌의 쫄깃함을 즐기고 싶을 때"',
    directions: '잠실 롯데월드몰에서 석촌호수 동호를 지나 송리단길 방면 도보 이동 → 서울 송파구 오금로18길 12 지하1층',
    mapSearchQuery: '서울 송파구 오금로18길 12 지하1층',
    websiteUrl: 'https://www.instagram.com/howmochi.cafe',
    websiteLabel: '하우모찌 공식 인스타그램',
  },
  {
    id: 'venchi-lotte',
    name: '벤슨 (Benson) 롯데월드몰점 B1F',
    category: 'gelato',
    categoryLabel: '프리미엄 수제 아이스크림',
    location: '서울 송파구 올림픽로 300 롯데월드몰 지하 1층',
    distance: '고디바 본매장에서 도보 1분 (같은 층)',
    image: venchiGelatoConeImg,
    badge: '아이스크림 끝판왕 🍦',
    badgeColor: 'bg-stone-900 text-amber-200 border-amber-600',
    whyRecommend: '젤라또 모찌가 품절되었을 때 완벽한 대안! 싱글 컵/콘(5,300원), 더블(6,300원), 파인트 및 선물용 기프트팩까지 20종 플레이버를 다채로운 사이즈로 만나보실 수 있습니다.',
    recommendedMenus: [
      { name: '싱글 컵 / 콘 (SINGLE · 1가지 맛)', price: '5,300원', desc: '트리플초코, 다크브라우니 등 20가지 플레이버 중 1가지 선택' },
      { name: '더블 (DOUBLE · 2가지 맛)', price: '6,300원', desc: '두 가지 최애 플레이버를 함께 맛볼 수 있는 더블 컵' },
      { name: '파인트 스플릿 (PINT SPLIT · 3가지 맛)', price: '15,300원', desc: '3가지 맛을 나누어 담아 깔끔하게 즐기는 테이크아웃 팩' },
      { name: '쿼드 스플릿 (QUAD SPLIT · 4가지 맛)', price: '19,300원', desc: '4가지 시그니처 맛을 넉넉하게 담은 패밀리 사이즈' },
      { name: '기프트팩 (GIFT PACK · 4EA / 6EA)', price: '23,200원~', desc: '선물용 패키지 (싱글컵 4개입 23,200원 / 6개입 33,800원)' },
    ],
    satisfactionMatch: '"시원하고 꾸덕한 프리미엄 수제 아이스크림이 당길 때 (싱글 5,300원 / 더블 6,300원)"',
    directions: '고디바 롯데월드몰 매장에서 에스컬레이터 옆 복도로 50m만 이동하면 바로 위치',
    mapSearchQuery: '롯데월드몰 벤슨',
    websiteUrl: 'https://bensonicecream.com',
    websiteLabel: '벤슨 공식 홈페이지',
  },
  {
    id: 'knotted-world',
    name: '노티드 월드 (Knotted World) 5~6F',
    category: 'cafe-view',
    categoryLabel: '석촌호수 파노라마 뷰 카페',
    location: '서울 송파구 롯데월드몰 5층~6층 복층 매장',
    distance: '몰 내부 중앙 엘리베이터 타고 5층으로 이동 (1분)',
    image: knottedDonutsImg,
    badge: '뷰 & 감성 힐링 🪟',
    badgeColor: 'bg-sky-950 text-sky-200 border-sky-800',
    whyRecommend: '긴 웨이팅에 지쳐 편안하게 앉아서 달콤한 디저트와 커피를 즐기고 싶으신 분들께 추천! 석촌호수가 시원하게 내려다보이는 복층 통창 뷰와 달콤한 초코 크림 도넛이 기다립니다.',
    recommendedMenus: [
      { name: '클래식 초코 푸딩 도넛', price: '3,900원', desc: '부드러운 브리오슈 도넛 속에 꽉 찬 진한 초콜릿 푸딩 크림' },
      { name: '쇼콜라 크림 케이크', price: '18,000원', desc: '선물용으로도 좋은 귀여운 스마일 초콜릿 미니 케이크' },
      { name: '아메리카노 & 도넛 세트', price: '8,500원', desc: '달콤한 디저트와 산뜻한 원두 커피의 환상 조합' },
    ],
    satisfactionMatch: '"넓은 통창에서 석촌호수를 보며 편하게 디저트를 먹고 싶을 때"',
    directions: '롯데월드몰 1층/B1F 중앙 엘리베이터를 타고 5층으로 직행',
    mapSearchQuery: '롯데월드몰 노티드월드',
    websiteUrl: 'https://knottedstore.com',
    websiteLabel: '노티드 공식 홈페이지',
  },
];
