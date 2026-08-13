import { ArrowRight, Compass, Sparkles, Check, ShieldCheck, BadgeCheck, CalendarCheck } from 'lucide-react';
import type { Page } from '@/lib/navigation';
import { DISPLAY_SERVICES } from '@/data/services';
import { DISPLAY_SCHOOLS } from '@/data/schools';
import { ARTICLES } from '@/data/articles';
import ServiceIcon from '@/components/ServiceIcon';
import SchoolLogo from '@/components/SchoolLogo';
import CTASection from '@/components/CTASection';
import { CONSULTATION_URL } from '@/data/socialLinks';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const VALUE_STATEMENTS = [
  { text: 'Chuyên sâu về giáo dục Thái Lan', color: 'bg-brand-blue' },
  { text: 'Lộ trình cá nhân hóa theo mục tiêu và ngân sách', color: 'bg-brand-yellow' },
  { text: 'Kết hợp học tập với học bổng và trải nghiệm nghề nghiệp', color: 'bg-brand-orange' },
];

const AUDIENCES = [
  'Học sinh đang tìm trường và ngành phù hợp',
  'Sinh viên muốn chuyển tiếp hoặc học lên cao',
  'Người đi làm muốn học thạc sĩ hoặc chuyển hướng nghề nghiệp',
  'Người muốn săn học bổng để giảm chi phí du học',
  'Sinh viên muốn có trải nghiệm làm việc quốc tế',
  'Người muốn tham gia dự án tình nguyện',
  'Học sinh, sinh viên cần mentor đồng hành dài hạn',
];

const PROCESS_STEPS = [
  'Tìm hiểu mục tiêu',
  'Đánh giá hồ sơ và ngân sách',
  'Xây dựng lộ trình phù hợp',
  'Triển khai và đồng hành',
  'Theo dõi kết quả và bước tiếp theo',
];

const COMMITMENTS = [
  'Minh bạch về học phí, học bổng và các khoản chi phí liên quan',
  'Giải thích rõ điều kiện đầu vào của từng chương trình',
  'Đánh giá trung thực khả năng cạnh tranh',
  'Chỉ đề xuất lựa chọn phù hợp với mục tiêu và ngân sách',
  'Không sử dụng thông tin học bổng hoặc nghề nghiệp thiếu căn cứ',
  'Cập nhật nguồn và thời điểm kiểm chứng của thông tin quan trọng',
];

const MODERN_PRIORITIES = [
  { title: 'ROI & khả năng chi trả', body: 'So sánh tổng chi phí, học bổng và giá trị dài hạn thay vì chỉ nhìn học phí.' },
  { title: 'Năng lực nghề nghiệp', body: 'Gắn lựa chọn ngành học với kỹ năng, internship và bối cảnh tuyển dụng thực tế.' },
  { title: 'AI & hồ sơ số', body: 'Dùng công nghệ có trách nhiệm để nghiên cứu, lập kế hoạch và hoàn thiện hồ sơ — không thay thế tiếng nói cá nhân.' },
  { title: 'An toàn & thích nghi', body: 'Chuẩn bị về văn hóa, nhà ở, sức khỏe, dữ liệu cá nhân và cuộc sống sau nhập học.' },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-surface-pale-blue', text: 'text-brand-blue', border: 'border-brand-blue' },
  yellow: { bg: 'bg-surface-pale-yellow', text: 'text-brand-orange', border: 'border-brand-yellow' },
  orange: { bg: 'bg-orange-50', text: 'text-brand-orange', border: 'border-brand-orange' },
  pink: { bg: 'bg-surface-pale-pink', text: 'text-brand-pink', border: 'border-brand-pink' },
  green: { bg: 'bg-green-50', text: 'text-brand-green', border: 'border-brand-green' },
};

const TESTIMONIAL_SLOTS = [
  'Học viên trúng tuyển chương trình cử nhân',
  'Học viên nhận học bổng bậc sau đại học',
  'Học viên hoàn tất hồ sơ nhập học tại Thái Lan',
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="hero-shell relative overflow-hidden">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-blue/20 bg-white/80 px-3.5 py-2 text-xs font-semibold text-brand-blue shadow-sm backdrop-blur">
                <BadgeCheck className="h-4 w-4" /> Tư vấn giáo dục chuyên sâu về Thái Lan
              </div>
              <h1 className="mt-6 text-[2.35rem] sm:text-5xl font-extrabold text-slate-950">
                Biến kế hoạch du học thành một <span className="inline-block whitespace-nowrap text-brand-blue">lộ trình rõ ràng.</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
                Từ chọn ngành, chọn trường đến học bổng và hồ sơ — RNE đồng hành bằng tư vấn cá nhân hóa, thông tin minh bạch và quyết định dựa trên mục tiêu thật của bạn.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href={CONSULTATION_URL} target="_blank" rel="noreferrer" className="btn-primary justify-center">
                  Đặt lịch tư vấn <ArrowRight className="w-4 h-4" />
                </a>
                <button onClick={() => onNavigate('services')} className="btn-outline justify-center">
                  Xem lộ trình dịch vụ
                </button>
              </div>
              <div className="mt-8 grid sm:grid-cols-2 gap-3 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-green" /> Đánh giá hồ sơ theo mục tiêu</span>
                <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-brand-green" /> Minh bạch chi phí & điều kiện</span>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-100 shadow-[0_30px_80px_rgba(11,31,58,0.18)] ring-1 ring-slate-900/5">
                <img
                  src="/rne-consultation-hero.jpg"
                  alt="Chuyên viên Right Now Education trao đổi lộ trình du học cùng sinh viên Việt Nam"
                  className="aspect-[4/3] w-full object-cover object-center"
                  width="1536"
                  height="1024"
                  fetchPriority="high"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/55 to-transparent" aria-hidden />
                <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-lg backdrop-blur">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue text-white"><CalendarCheck className="h-5 w-5" /></span>
                  <span><strong className="block text-sm text-slate-950">Bắt đầu bằng buổi tư vấn định hướng</strong><span className="text-xs text-slate-500">Hiểu mục tiêu trước khi đề xuất giải pháp</span></span>
                </div>
              </div>
              <div className="absolute -right-6 -top-6 -z-10 h-40 w-40 rounded-full bg-brand-yellow/30 blur-2xl" aria-hidden />
              <div className="absolute -bottom-8 -left-8 -z-10 h-48 w-48 rounded-full bg-brand-blue/20 blur-3xl" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT IS RNE */}
      <section className="bg-surface-gray">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <p className="section-label">RNE LÀ GÌ?</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-black leading-tight">
                Một lộ trình học tập tốt cần dẫn đến một tương lai nghề nghiệp rõ ràng hơn.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-3">
              <p className="text-gray-700 leading-relaxed">
                Right Now Education không chỉ hỗ trợ khách hàng nộp hồ sơ vào trường. RNE bắt đầu từ mục tiêu học tập, định hướng nghề nghiệp, khả năng tài chính và trải nghiệm hiện có của từng người để xây dựng một lộ trình phù hợp.
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Thái Lan là thị trường chuyên sâu của RNE, bao gồm các trường đại học công lập, tư thục, quốc tế và các học viện chuyên ngành. Với những khách hàng có nhu cầu khác, RNE cũng có thể triển khai các dịch vụ tương ứng tại Anh, Mỹ, Úc, New Zealand và Singapore.
              </p>
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {VALUE_STATEMENTS.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover-lift">
                <div className={`w-10 h-10 rounded-xl ${v.color} flex items-center justify-center mb-4`}>
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-brand-black leading-snug">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHO IS RNE FOR */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div>
            <p className="section-label">RNE DÀNH CHO AI</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-black leading-tight md:whitespace-nowrap">
              RNE có thể đồng hành cùng bạn ở đâu?
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {AUDIENCES.map((a, i) => {
              const colors = ['bg-surface-pale-blue', 'bg-surface-pale-yellow', 'bg-surface-pale-pink', 'bg-orange-50', 'bg-green-50', 'bg-surface-pale-blue', 'bg-surface-pale-yellow'];
              return (
                <div key={i} className={`rounded-2xl p-6 ${colors[i % colors.length]} hover-lift`}>
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                    <Compass className="w-5 h-5 text-brand-blue" />
                  </div>
                  <p className="font-semibold text-brand-black leading-snug">{a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-black text-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-14 md:py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-yellow">ƯU TIÊN CỦA NGƯỜI HỌC HIỆN ĐẠI</p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight">Không chỉ “đi được” mà phải đi đúng.</h2>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
              {MODERN_PRIORITIES.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5">
                  <span className="text-xs font-bold text-brand-yellow">0{index + 1}</span>
                  <h3 className="mt-2 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FIVE SERVICES */}
      <section className="bg-surface-gray">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-label">DỊCH VỤ CỦA RNE</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-black leading-tight">
              Không chỉ nộp hồ sơ. RNE giúp bạn xây dựng cả một lộ trình.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DISPLAY_SERVICES.map((s) => {
              const c = COLOR_MAP[s.color];
              return (
                <article key={s.id} className={`rounded-2xl p-7 ${c.bg} border ${c.border} border-opacity-20 hover-lift`}>
                  <div className={`w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-5 ${c.text}`}>
                    <ServiceIcon name={s.icon} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-black leading-snug">{s.title}</h3>
                  <p className="mt-3 text-sm text-gray-700 leading-relaxed">{s.short}</p>
                </article>
              );
            })}
            <div className="rounded-2xl p-7 bg-brand-black text-white flex flex-col justify-center hover-lift">
              <Sparkles className="w-8 h-8 text-brand-yellow mb-4" />
              <p className="text-sm text-gray-300 leading-relaxed">
                Các dịch vụ trên có thể được triển khai tại Thái Lan, Anh, Mỹ, Úc, New Zealand và Singapore, tùy theo điều kiện hồ sơ và tình trạng chương trình tại từng thời điểm.
              </p>
              <button onClick={() => onNavigate('services')} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow hover:underline">
                Xem chi tiết dịch vụ <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FEATURED SCHOOLS */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-label">TRƯỜNG ĐẠI HỌC THÁI LAN</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-black leading-tight">
              Những ngôi trường có thể trở thành bước tiếp theo của bạn.
            </h2>
          </div>
          <div className="mt-12 overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              {DISPLAY_SCHOOLS.slice(0, 10).map((school) => (
                <div key={school.name} className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover-lift">
                  <SchoolLogo name={school.name} abbr={school.abbr} className="h-16 w-16" />
                  <p className="text-xs font-medium text-center text-gray-700 leading-tight line-clamp-2">{school.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <button onClick={() => onNavigate('schools')} className="btn-outline">
              Khám phá các trường tại Thái Lan <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6 — PROCESS */}
      <section className="bg-surface-pale-blue">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-label">QUY TRÌNH LÀM VIỆC</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-black leading-tight">
              Bắt đầu từ mục tiêu. Kết thúc bằng một lộ trình rõ ràng.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-brand-blue/20" aria-hidden />
            {PROCESS_STEPS.map((step, i) => (
              <div key={i} className="relative flex md:flex-col items-center gap-4 md:gap-3 md:text-center">
                <div className="shrink-0 w-16 h-16 rounded-full bg-brand-blue text-white font-extrabold text-xl flex items-center justify-center shadow-md z-10">
                  {i + 1}
                </div>
                <p className="font-semibold text-brand-black leading-snug md:text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — TRUST */}
      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-label">CAM KẾT CỦA RNE</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-black leading-tight">
              Minh bạch từ lựa chọn đầu tiên đến kết quả cuối cùng.
            </h2>
          </div>
          <div className="mt-12 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {COMMITMENTS.map((c, i) => (
                <div key={i} className="flex gap-3 p-5 rounded-2xl bg-surface-gray">
                  <ShieldCheck className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed">{c}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-brand-blue p-7 text-white flex flex-col">
              <ShieldCheck className="w-9 h-9 text-brand-yellow mb-4" />
              <p className="font-bold text-lg leading-snug">
                RNE cam kết xây dựng lộ trình để khách hàng tiếp cận chương trình phù hợp với mục tiêu và ngân sách đã thống nhất.
              </p>
              <p className="mt-4 text-sm text-white/80 leading-relaxed">
                Các điều kiện về đầu ra, phương án thay thế hoặc chính sách hỗ trợ nếu kết quả chưa đạt kỳ vọng sẽ được quy định rõ trong từng gói dịch vụ và hợp đồng.
              </p>
            </div>
          </div>
          <p className="mt-8 text-xs text-gray-500 max-w-3xl leading-relaxed">
            RNE không cam kết đảm bảo kết quả nhập học, học bổng, internship hoặc visa trừ khi có thỏa thuận bằng văn bản cụ thể.
          </p>
        </div>
      </section>

      {/* SECTION 8 - TESTIMONIALS */}
      <section className="bg-surface-pale-yellow">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <p className="section-label">CÂU CHUYỆN HỌC VIÊN</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-black leading-tight">Những hành trình RNE đã đồng hành.</h2>
            <p className="mt-4 text-gray-700 leading-relaxed">Hình ảnh và chia sẻ của học viên trúng tuyển sẽ được cập nhật sau khi có sự đồng ý từ từng bạn.</p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {TESTIMONIAL_SLOTS.map((label, index) => (
              <article key={label} className="overflow-hidden rounded-2xl border border-brand-yellow/40 bg-white shadow-sm">
                <div className="aspect-[4/3] bg-gradient-to-br from-brand-blue/10 via-white to-brand-yellow/25 flex items-center justify-center p-6 text-center">
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-blue shadow-sm">Hình ảnh học viên</span>
                </div>
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">Câu chuyện {index + 1}</p>
                  <h3 className="mt-2 font-bold text-brand-black leading-snug">{label}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">Nội dung sẽ được cập nhật cùng hình ảnh và chia sẻ thực tế của học viên.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 - INSIGHTS */}
      <section className="bg-surface-gray">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="section-label">INSIGHTS</p>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-brand-black leading-tight">
                Hiểu kỹ trước khi lựa chọn.
              </h2>
            </div>
            <button onClick={() => onNavigate('insights')} className="btn-outline self-start md:self-auto">
              Xem tất cả Insights <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARTICLES.slice(0, 4).map((a) => (
              <article key={a.slug} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover-lift flex flex-col">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-brand-blue uppercase tracking-wide">{a.category}</span>
                  <h3 className="mt-2 font-bold text-brand-black leading-snug line-clamp-3">{a.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-2">{a.excerpt}</p>
                  <p className="mt-4 text-xs text-gray-500">{a.readingTime} • {new Date(a.publishedAt).toLocaleDateString('vi-VN')}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 - FINAL CTA */}
      <CTASection
        onNavigate={onNavigate}
        heading="Chưa biết nên bắt đầu từ trường, học bổng hay trải nghiệm nghề nghiệp?"
        body="Hãy chia sẻ mục tiêu và ngân sách của bạn. RNE sẽ giúp bạn xác định bước đi phù hợp nhất ở thời điểm hiện tại."
        variant="multicolor"
      />
    </>
  );
}
