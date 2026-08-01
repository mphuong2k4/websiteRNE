import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
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
  const [openService, setOpenService] = useState<number | null>(SERVICES[0].id);

  return (
    <>
      <section className="bg-surface-pale-blue">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label">DỊCH VỤ CỦA RNE</p>
              <h1 className="page-hero-title mt-4 font-extrabold text-brand-black">
                Một lộ trình. Đúng mục tiêu. Dễ hành động.
              </h1>
              <p className="mt-5 text-base md:text-lg text-gray-700 leading-relaxed max-w-xl">
                RNE kết nối chọn trường, học bổng, trải nghiệm và định hướng nghề nghiệp trong một kế hoạch cá nhân hóa.
              </p>
            </div>
            <img src="/rne-service-planning.jpg" alt="Tư vấn viên cùng sinh viên xây dựng lộ trình học tập" className="aspect-[16/10] w-full rounded-3xl object-cover shadow-xl" width="1536" height="1024" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-14 md:py-20 space-y-5">
          {SERVICES.map((s, idx) => {
            const detail = SERVICE_DETAILS[s.id];
            const c = COLOR_MAP[s.color];
            const reversed = idx % 2 === 1;
            return (
              <div key={s.id} id={`dich-vu-${s.id}`}>
                <div className={`grid lg:grid-cols-12 gap-8 ${openService === s.id && reversed ? 'lg:[direction:rtl]' : ''}`}>
                  <div className={`${openService === s.id ? 'lg:col-span-5' : 'lg:col-span-12'} ${reversed ? 'lg:[direction:ltr]' : ''}`}>
                    <div className={`rounded-3xl ${openService === s.id ? 'p-7 lg:sticky lg:top-24' : 'p-5 md:p-6'} ${c.bg} transition-all`}>
                      <div className={`${openService === s.id ? 'block' : 'md:flex md:items-center md:gap-5'}`}>
                      <div className={`w-14 h-14 rounded-2xl ${c.accent} text-white flex items-center justify-center mb-5`}>
                        <ServiceIcon name={s.icon} className="w-7 h-7" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-xs font-semibold uppercase tracking-widest ${c.text}`}>DỊCH VỤ {s.id}</p>
                        <h2 className="mt-1 text-xl md:text-2xl font-extrabold text-brand-black leading-snug">{s.title}</h2>
                        <p className="mt-2 text-sm text-gray-700 leading-relaxed max-w-3xl">{s.short}</p>
                      </div>
                      <button
                        onClick={() => setOpenService(openService === s.id ? null : s.id)}
                        className={`mt-4 md:mt-0 shrink-0 rounded-full bg-white px-4 py-2 text-sm font-semibold ${c.text} shadow-sm hover:shadow-md`}
                        aria-expanded={openService === s.id}
                      >
                        {openService === s.id ? 'Thu gọn' : 'Xem chi tiết'}
                      </button>
                      </div>
                    </div>
                  </div>

                  {openService === s.id && <div className={`lg:col-span-7 ${reversed ? 'lg:[direction:ltr]' : ''}`}>
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
                  </div>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-gray">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-14 md:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8">
            <div className="mb-8">
              <p className="section-label">CÂU HỎI THƯỜNG GẶP</p>
              <h2 className="title-single-line mt-3 text-3xl font-extrabold text-brand-black">Giải đáp nhanh.</h2>
            </div>
            <div className="space-y-3">
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
          <aside className="lg:col-span-4 lg:sticky lg:top-24 overflow-hidden rounded-3xl bg-brand-black text-white shadow-xl">
            <img src="/rne-service-planning.jpg" alt="Chuyên viên RNE tư vấn lộ trình" className="aspect-[4/3] w-full object-cover" />
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">CẦN CÂU TRẢ LỜI RIÊNG?</p>
              <h3 className="mt-3 text-xl font-bold">Mỗi hồ sơ cần một cách tiếp cận khác nhau.</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">Gửi mục tiêu và tình trạng hiện tại để RNE gợi ý bước tiếp theo.</p>
              <button onClick={() => onNavigate('contact')} className="mt-5 w-full justify-center btn-primary">Đặt lịch tư vấn</button>
            </div>
          </aside>
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
