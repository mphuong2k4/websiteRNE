import { useState } from 'react';
import { ArrowRight, Clock, Calendar, User } from 'lucide-react';
import type { Page } from '@/lib/navigation';
import { ARTICLES, CATEGORIES, type Category, type Article } from '@/data/articles';
import CTASection from '@/components/CTASection';

interface InsightsPageProps {
  onNavigate: (page: Page) => void;
}

export default function InsightsPage({ onNavigate }: InsightsPageProps) {
  const [category, setCategory] = useState<Category>('Tất cả');
  const [selected, setSelected] = useState<Article | null>(null);

  const filtered = ARTICLES.filter((a) => category === 'Tất cả' || a.category === category);
  const related = selected ? ARTICLES.filter((a) => a.slug !== selected.slug).slice(0, 3) : [];

  if (selected) {
    return (
      <article className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-12 md:py-16">
          <button onClick={() => setSelected(null)} className="text-sm text-brand-blue hover:underline mb-6 inline-flex items-center gap-1">
            ← Quay lại Insights
          </button>
          <span className="text-xs font-semibold text-brand-blue uppercase tracking-wide">{selected.category}</span>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-brand-black leading-tight max-w-3xl">{selected.title}</h1>
          <div className="mt-6 flex flex-wrap gap-5 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {selected.author}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Xuất bản: {new Date(selected.publishedAt).toLocaleDateString('vi-VN')}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Cập nhật: {new Date(selected.updatedAt).toLocaleDateString('vi-VN')}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {selected.readingTime}</span>
          </div>
          <div className="mt-8 aspect-[16/8] rounded-3xl overflow-hidden">
            <img src={selected.image} alt={selected.title} className="w-full h-full object-cover" />
          </div>
          <div className="mt-10 max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">{selected.excerpt}</p>
            <div className="mt-6 prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{selected.body}</p>
            </div>
            <div className="mt-8 rounded-2xl bg-surface-gray p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Nguồn tham khảo</p>
              <ul className="space-y-1.5">
                {selected.sources.map((s, i) => (
                  <li key={i} className="text-sm text-gray-700">• {s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14">
            <h2 className="text-xl font-bold text-brand-black mb-5">Bài viết liên quan</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((a) => (
                <button key={a.slug} onClick={() => { setSelected(a); window.scrollTo(0, 0); }} className="text-left bg-white rounded-2xl overflow-hidden border border-gray-100 hover-lift">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-semibold text-brand-blue uppercase">{a.category}</span>
                    <h3 className="mt-1.5 font-semibold text-brand-black leading-snug line-clamp-2">{a.title}</h3>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 rounded-3xl bg-brand-blue p-8 text-center text-white">
            <h3 className="text-2xl font-bold">Cần tư vấn cụ thể hơn?</h3>
            <p className="mt-2 text-white/90">Đăng ký tư vấn để RNE đồng hành cùng bạn xây dựng lộ trình phù hợp.</p>
            <button onClick={() => onNavigate('contact')} className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-yellow text-brand-black font-semibold hover:bg-yellow-300 transition">
              Đăng ký tư vấn <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
      <section className="bg-surface-pale-yellow">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <p className="section-label">INSIGHTS</p>
          <h1 className="mt-4 text-3xl md:text-6xl font-extrabold text-brand-black leading-tight max-w-3xl">
            Hiểu kỹ trước khi lựa chọn.
          </h1>
          <p className="mt-6 text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl">
            Phân tích về trường, ngành, học bổng, internship và cuộc sống tại Thái Lan — được biên tập bởi đội ngũ RNE dựa trên nguồn kiểm chứng.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-12 md:py-16">
          <div className="flex flex-wrap gap-2 mb-10" role="tablist">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                role="tab"
                aria-selected={category === c}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  category === c ? 'bg-brand-blue text-white shadow-md' : 'bg-surface-gray text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a) => (
              <article key={a.slug} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover-lift flex flex-col">
                <button onClick={() => { setSelected(a); window.scrollTo(0, 0); }} className="text-left flex flex-col flex-1">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="text-xs font-semibold text-brand-blue uppercase tracking-wide">{a.category}</span>
                    <h2 className="mt-2 font-bold text-brand-black leading-snug line-clamp-2">{a.title}</h2>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">{a.excerpt}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs text-gray-500">
                      <span>{new Date(a.publishedAt).toLocaleDateString('vi-VN')}</span>
                      <span>{a.readingTime}</span>
                    </div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        onNavigate={onNavigate}
        heading="Muốn thảo luận sâu hơn về lựa chọn của bạn?"
        body="Đăng ký tư vấn để RNE giúp bạn kết nối thông tin với quyết định phù hợp."
      />
    </>
  );
}
