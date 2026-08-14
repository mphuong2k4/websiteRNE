export type Page =
  | 'home'
  | 'services'
  | 'schools'
  | 'insights'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'refund'
  | 'disclaimer'
  | 'admin';

export const NAV_ITEMS: { label: string; page: Page }[] = [
  { label: 'Trang chủ', page: 'home' },
  { label: 'Dịch vụ', page: 'services' },
  { label: 'Trường tại Thái Lan', page: 'schools' },
  { label: 'Insights', page: 'insights' },
  { label: 'Về RNE', page: 'about' },
  { label: 'Liên hệ', page: 'contact' },
];

export const urlFor = (page: Page): string => {
  const map: Record<Page, string> = {
    home: '/',
    services: '/dich-vu',
    schools: '/truong-thai-lan',
    insights: '/insights',
    about: '/ve-rne',
    contact: '/lien-he',
    privacy: '/chinh-sach-bao-mat',
    terms: '/dieu-khoan-dich-vu',
    refund: '/chinh-sach-hoan-phi',
    disclaimer: '/tuyen-bo-mien-tru-trach-nhiem',
    admin: '/admin',
  };
  return map[page];
};

export const pageFromPath = (path: string): Page => {
  const clean = path.replace(/^\/+|\/+$/g, '');
  const pages: Page[] = ['home', 'services', 'schools', 'insights', 'about', 'contact', 'privacy', 'terms', 'refund', 'disclaimer', 'admin'];
  for (const page of pages) {
    if (urlFor(page).replace(/^\/+|\/+$/g, '') === clean) return page;
  }
  return 'home';
};
