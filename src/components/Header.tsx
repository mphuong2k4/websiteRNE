import { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { NAV_ITEMS, type Page } from '@/lib/navigation';
import BrandLogo from '@/components/BrandLogo';
import { CONSULTATION_URL } from '@/data/socialLinks';

interface HeaderProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ current, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (page: Page) => {
    onNavigate(page);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_2px_12px_rgba(8,8,8,0.06)]' : 'border-b border-gray-100'
      }`}
    >
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <button
            onClick={() => go('home')}
            className="flex items-center gap-2 shrink-0"
            aria-label="Right Now Education – Trang chủ"
          >
            <BrandLogo className="h-7 md:h-8" />
          </button>

          <nav className="hidden xl:flex items-center gap-1" aria-label="Điều hướng chính">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                onClick={() => go(item.page)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  current === item.page
                    ? 'text-brand-blue bg-surface-pale-blue'
                    : 'text-gray-700 hover:text-brand-blue hover:bg-surface-pale-blue'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden xl:block">
            <a href={CONSULTATION_URL} target="_blank" rel="noreferrer" className="btn-primary text-sm">
              Đăng ký tư vấn
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <button
            className="xl:hidden p-2 -mr-2 text-brand-black"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Đóng menu' : 'Mở menu'}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-gray-100 bg-white">
          <nav className="mx-auto max-w-content px-5 py-4 flex flex-col gap-1" aria-label="Điều hướng chính (mobile)">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                onClick={() => go(item.page)}
                className={`px-4 py-3 rounded-xl text-left text-base font-medium transition-colors ${
                  current === item.page
                    ? 'text-brand-blue bg-surface-pale-blue'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a href={CONSULTATION_URL} target="_blank" rel="noreferrer" className="btn-primary mt-3 justify-center">
              Đăng ký tư vấn
              <ArrowRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
