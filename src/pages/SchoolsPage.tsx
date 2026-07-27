import { useState } from 'react';
import { ArrowRight, BadgeCheck, MapPin } from 'lucide-react';
import type { Page } from '@/lib/navigation';
import { SCHOOLS, SCHOOL_FILTERS, type SchoolFilter } from '@/data/schools';
import SchoolLogo from '@/components/SchoolLogo';
import CTASection from '@/components/CTASection';

interface SchoolsPageProps {
  onNavigate: (page: Page) => void;
}

const TYPE_COLORS: Record<string, string> = {
  'Trường công': 'bg-surface-pale-blue text-brand-blue',
  'Trường tư': 'bg-surface-pale-yellow text-brand-orange',
  'Trường quốc tế': 'bg-surface-pale-pink text-brand-pink',
  'Học viện chuyên ngành': 'bg-green-50 text-brand-green',
};

export default function SchoolsPage({ onNavigate }: SchoolsPageProps) {
  const [filter, setFilter] = useState<SchoolFilter>('Tất cả');

  const filtered = SCHOOLS.filter((s) => {
    if (filter === 'Tất cả') return true;
    if (filter === 'Bangkok' || filter === 'Ngoài Bangkok') return s.city === filter;
    return s.type === filter;
  });

  return (
    <>
      <section className="bg-surface-pale-blue">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <p className="section-label">TRƯỜNG ĐẠI HỌC THÁI LAN</p>
          <h1 className="mt-4 text-3xl md:text-6xl font-extrabold text-brand-black leading-tight max-w-4xl">
            Khám phá các trường đại học và học viện nổi bật tại Thái Lan.
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
            RNE hỗ trợ khách hàng tìm hiểu và chuẩn bị hồ sơ vào nhiều nhóm trường khác nhau, từ đại học công lập, tư thục, chương trình quốc tế đến các học viện chuyên sâu về công nghệ, kinh doanh và hospitality.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-12 md:py-16">
          <div className="flex flex-wrap gap-2 mb-10" role="tablist">
            {SCHOOL_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                role="tab"
                aria-selected={filter === f}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === f
                    ? 'bg-brand-blue text-white shadow-md'
                    : 'bg-surface-gray text-gray-700 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((school) => (
              <article key={school.name} className="rounded-2xl border border-gray-100 p-6 hover-lift flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <SchoolLogo name={school.name} abbr={school.abbr} className="h-16 w-16" />
                  {school.partner && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-green bg-green-50 px-2.5 py-1 rounded-full">
                      <BadgeCheck className="w-3.5 h-3.5" /> Đối tác chính thức
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-brand-black leading-snug">{school.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{school.abbr}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${TYPE_COLORS[school.type]}`}>{school.type}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full bg-surface-gray text-gray-700">
                    <MapPin className="w-3 h-3" /> {school.city}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Thế mạnh</p>
                  <div className="flex flex-wrap gap-1.5">
                    {school.strengths.map((str) => (
                      <span key={str} className="text-xs bg-surface-gray text-gray-700 px-2 py-1 rounded-md">{str}</span>
                    ))}
                  </div>
                </div>
                {school.ranking && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Thứ hạng</p>
                    <p className="text-sm font-semibold text-brand-blue">{school.ranking.highlight}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Nguồn: {school.ranking.source} • {school.ranking.year}</p>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-surface-gray p-5">
            <p className="text-sm text-gray-700 leading-relaxed">
              RNE có thể hỗ trợ khách hàng tìm hiểu và chuẩn bị hồ sơ vào các trường được giới thiệu trên website. Việc xuất hiện trong danh sách không đồng nghĩa tất cả các trường đều là đối tác tuyển sinh chính thức của RNE.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        onNavigate={onNavigate}
        heading="Chưa biết trường nào phù hợp?"
        body="Hãy để RNE giúp bạn xây dựng shortlist dựa trên ngành học, ngân sách và mục tiêu tương lai."
        primaryLabel="Đăng ký tư vấn"
      />
    </>
  );
}
