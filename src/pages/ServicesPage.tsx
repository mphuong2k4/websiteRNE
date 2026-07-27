import { useState } from 'react';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';
import type { Page } from '@/lib/navigation';
import { SERVICES, SERVICE_DETAILS, FAQ_ITEMS } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';
import CTASection from '@/components/CTASection';

interface ServicesPageProps {
  onNavigate: (page: Page) => void;
}

const COLOR_MAP: Record<string, { bg: string; text: string; accent: string; dot: string }> = {
  blue: { bg: 'bg-surface-pale-blue', text: 'text-brand-blue', accent: 'bg-brand-blue', dot: 'bg-brand-blue' },
  yellow: { bg: 'bg-surface-pale-yellow', text: 'text-brand-orange', accent: 'bg-brand-yellow', dot: 'bg-brand-yellow' },
  orange: { bg: 'bg-orange-50', text: 'text-brand-orange', accent: 'bg-brand-orange', dot: 'bg-brand-orange' },
  pink: { bg: 'bg-surface-pale-pink', text: 'text-brand-pink', accent: 'bg-brand-pink', dot: 'bg-brand-pink' },
  green: { bg: 'bg-green-50', text: 'text-brand-green', accent: 'bg-brand-green', dot: 'bg-brand-green' },
};

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className="bg-surface-pale-blue">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <p className="section-label">DỊCH VỤ CỦA RNE</p>
          <h1 className="mt-4 text-3xl md:text-6xl font-extrabold text-brand-black leading-tight max-w-4xl">
            Không chỉ nộp hồ sơ. RNE giúp bạn xây dựng cả một lộ trình.
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
            Mỗi dịch vụ bắt đầu từ mục tiêu, ngân sách, nền tảng hiện tại và kết quả mà khách hàng muốn đạt được. Thái Lan là thị trường chuyên sâu của RNE; các dịch vụ cũng có thể được triển khai tại Anh, Mỹ, Úc, New Zealand và Singapore.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24 space-y-20 md:space-y-28">
          {SERVICES.map((s, idx) => {
            const detail = SERVICE_DETAILS[s.id];
            const c = COLOR_MAP[s.color];
            const reversed = idx % 2 === 1;
            return (
              <div key={s.id} id={`dich-vu-${s.id}`}>
                <div className={`grid lg:grid-cols-12 gap-10 ${reversed ? 'lg:[direction:rtl]' : ''}`}>
                  <div className={`lg:col-span-5 ${reversed ? 'lg:[direction:ltr]' : ''}`}>
                    <div className={`rounded-3xl p-8 ${c.bg} sticky top-24`}>
                      <div className={`w-14 h-14 rounded-2xl ${c.accent} text-white flex items-center justify-center mb-5`}>
                        <ServiceIcon name={s.icon} className="w-7 h-7" />
                      </div>
                      <p className={`text-xs font-semibold uppercase tracking-widest ${c.text}`}>DỊCH VỤ {s.id}</p>
                      <h2 className="mt-2 text-2xl md:text-3xl font-extrabold text-brand-black leading-tight">{s.title}</h2>
                      <p className="mt-4 text-sm text-gray-700 leading-relaxed">{s.short}</p>
                    </div>
                  </div>

                  <div className={`lg:col-span-7 ${reversed ? 'lg:[direction:ltr]' : ''}`}>
                    {detail.forWho && (
                      <div className="mb-8">
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Dành cho ai</h3>
                        <ul className="space-y-2.5">
                          {detail.forWho.map((f, i) => (
                            <li key={i} className="flex gap-3 items-start">
                              <span className={`w-2 h-2 rounded-full ${c.dot} mt-2 shrink-0`} />
                              <span className="text-gray-700">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mb-8">
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">RNE hỗ trợ</h3>
                      <ul className="grid sm:grid-cols-2 gap-2.5">
                        {detail.supports.map((sup, i) => (
                          <li key={i} className="flex gap-2.5 items-start">
                            <Check className={`w-4 h-4 ${c.text} shrink-0 mt-1`} />
                            <span className="text-sm text-gray-700">{sup}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {detail.disclosure && (
                      <div className="mb-8 rounded-2xl bg-surface-gray p-5">
                        <h3 className="text-sm font-semibold text-brand-black mb-3">Thông tin cần làm rõ trước khi quyết định</h3>
                        <ul className="space-y-2">
                          {detail.disclosure.map((d, i) => (
                            <li key={i} className="flex gap-2.5 items-start">
                              <span className={`w-2 h-2 rounded-full ${c.dot} mt-2 shrink-0`} />
                              <span className="text-sm text-gray-700">{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Quy trình</h3>
                      <ol className="space-y-3">
                        {detail.process.map((p, i) => (
                          <li key={i} className="flex gap-4 items-start">
                            <span className={`shrink-0 w-8 h-8 rounded-full ${c.accent} text-white text-sm font-bold flex items-center justify-center`}>
                              {i + 1}
                            </span>
                            <span className="text-gray-700 pt-1">{p}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-gray">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div className="max-w-2xl mb-10">
            <p className="section-label">CÂU HỎI THƯỜNG GẶP</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-black leading-tight">
              Những điều bạn có thể đang thắc mắc.
            </h2>
          </div>
          <div className="max-w-3xl space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-brand-black">{item.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-gray-700 leading-relaxed text-sm">{item.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        onNavigate={onNavigate}
        heading="Sẵn sàng bắt đầu xây dựng lộ trình của bạn?"
        body="Chia sẻ mục tiêu và tình trạng hiện tại để RNE giúp bạn xác định dịch vụ phù hợp nhất."
      />
    </>
  );
}
