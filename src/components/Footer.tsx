import { Mail, ArrowRight, Facebook, Instagram, Users } from 'lucide-react';
import { NAV_ITEMS, type Page } from '@/lib/navigation';
import BrandLogo from '@/components/BrandLogo';
import { SOCIAL_LINKS } from '@/data/socialLinks';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const LEGAL: { label: string; page: Page }[] = [
  { label: 'Chính sách bảo mật', page: 'privacy' },
  { label: 'Điều khoản dịch vụ', page: 'terms' },
  { label: 'Chính sách hoàn phí', page: 'refund' },
  { label: 'Tuyên bố miễn trừ trách nhiệm', page: 'disclaimer' },
];

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto max-w-content px-5 sm:px-8 py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <BrandLogo inverse className="h-12 mb-5" />
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Right Now Education là đơn vị tư vấn giáo dục chuyên sâu về Thái Lan, kết nối lựa chọn học tập với học bổng và trải nghiệm nghề nghiệp.
            </p>
            <a href="mailto:admin@rightnow-education.info" className="inline-flex items-center gap-2 mt-5 text-sm text-brand-yellow hover:underline">
              <Mail className="w-4 h-4" /> admin@rightnow-education.info
            </a>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook Right Now Education" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-blue"><Facebook className="h-4 w-4" /></a>
              <a href={SOCIAL_LINKS.facebookGroup} target="_blank" rel="noreferrer" aria-label="Facebook Group Right Now Education" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-blue"><Users className="h-4 w-4" /></a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram Right Now Education" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-brand-blue"><Instagram className="h-4 w-4" /></a>
              <a href={SOCIAL_LINKS.threads} target="_blank" rel="noreferrer" aria-label="Threads Right Now Education" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold hover:bg-brand-blue">@</a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.page}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-sm text-gray-200 hover:text-brand-yellow transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Liên hệ tư vấn</h3>
            <a href="mailto:admin@rightnow-education.info" className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-brand-yellow transition-colors mb-7">
              <Mail className="w-4 h-4" /> Gửi email cho RNE
            </a>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Pháp lý</h3>
            <ul className="space-y-2.5">
              {LEGAL.map((l) => (
                <li key={l.page}>
                  <button
                    onClick={() => onNavigate(l.page)}
                    className="text-sm text-gray-200 hover:text-brand-yellow transition-colors text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
            Thông tin về học phí, học bổng, thứ hạng và điều kiện tuyển sinh có thể thay đổi theo từng kỳ. RNE sẽ kiểm tra lại thông tin chính thức trước khi khách hàng đưa ra quyết định hoặc nộp hồ sơ.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} Right Now Education. Đã đăng ký bản quyền.</p>
            <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 text-sm text-brand-yellow hover:underline">
              Bắt đầu tư vấn <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
