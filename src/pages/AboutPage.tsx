import { Target, Wallet, GitCompareArrows, GraduationCap, Briefcase, ShieldCheck } from 'lucide-react';
import type { Page } from '@/lib/navigation';
import CTASection from '@/components/CTASection';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const APPROACH = [
  { icon: Target, text: 'Bắt đầu từ mục tiêu của khách hàng' },
  { icon: Wallet, text: 'Xem xét ngân sách và khả năng tài chính' },
  { icon: GitCompareArrows, text: 'So sánh nhiều phương án' },
  { icon: GraduationCap, text: 'Không chỉ tập trung vào nhập học' },
  { icon: Briefcase, text: 'Kết hợp giáo dục với trải nghiệm nghề nghiệp' },
  { icon: ShieldCheck, text: 'Minh bạch về điều kiện, chi phí và khả năng cạnh tranh' },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <>
      <section className="bg-surface-pale-pink">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="section-label">VỀ RIGHT NOW EDUCATION</p>
              <h1 className="page-hero-title mt-4 font-extrabold text-brand-black">
                Tư vấn rõ ràng cho một quyết định quan trọng.
              </h1>
              <p className="mt-5 text-gray-700 leading-relaxed">RNE giúp người học nhìn thấy cả cơ hội, chi phí và bước đi tiếp theo trước khi lựa chọn.</p>
            </div>
            <img src="/thailand-campus-life.jpg" alt="Sinh viên quốc tế trong khuôn viên đại học tại Thái Lan" className="aspect-[16/10] w-full rounded-3xl object-cover shadow-xl" width="1536" height="1024" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24 space-y-16">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-black leading-tight">Câu chuyện của RNE</h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-gray-700 leading-relaxed">
              <p>
                Right Now Education (RNE) được thành lập tại Việt Nam vào năm 2026 với định hướng trở thành đơn vị tư vấn giáo dục chuyên sâu về Thái Lan.
              </p>
              <p>
                RNE tập trung vào Thái Lan vì đây là thị trường giáo dục quốc tế đang phát triển nhanh, có chi phí hợp lý, vị trí địa lý gần Việt Nam và ngày càng nhiều chương trình chất lượng bằng tiếng Anh. Tuy nhiên, thông tin về trường, học bổng và điều kiện tuyển sinh vẫn còn phân tán và thiếu minh bạch.
              </p>
              <p>
                Vấn đề RNE muốn giải quyết là khoảng trống thông tin trong giáo dục quốc tế — khi người học đưa ra quyết định dựa trên cảm tính thay vì dữ liệu kiểm chứng. RNE xây dựng lộ trình dựa trên mục tiêu, ngân sách và khả năng cạnh tranh thực tế của từng cá nhân.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-black leading-tight">ROI-first — lợi ích trước, sau đó là chi phí</h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-gray-700 leading-relaxed">
              <p>
                RNE tiếp cận giáo dục như một khoản đầu tư: mỗi lựa chọn trường, học bổng hay chương trình internship cần được đánh giá dựa trên giá trị thực tế mang lại cho lộ trình nghề nghiệp dài hạn.
              </p>
              <p>
                Giáo dục, học bổng và chuẩn bị nghề nghiệp không nên tách rời. RNE kết nối ba yếu tố này thành một lộ trình nhất quán — giúp người học không chỉ nhập học mà còn có định hướng rõ ràng sau khi tốt nghiệp.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-surface-pale-blue p-8 md:p-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-blue mb-3">SỨ MỆNH</p>
            <p className="text-xl md:text-2xl font-bold text-brand-black leading-snug max-w-3xl">
              Giúp người học đưa ra quyết định giáo dục phù hợp hơn bằng cách kết nối lựa chọn trường học với học bổng, trải nghiệm quốc tế và định hướng nghề nghiệp dài hạn.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-black leading-tight mb-8">Cách RNE tiếp cận</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {APPROACH.map((a, i) => (
                <div key={i} className="rounded-2xl border border-gray-100 p-6 hover-lift">
                  <div className="w-10 h-10 rounded-xl bg-surface-pale-blue flex items-center justify-center mb-4">
                    <a.icon className="w-5 h-5 text-brand-blue" />
                  </div>
                  <p className="font-semibold text-brand-black leading-snug">{a.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trust pillars */}
          <div className="rounded-3xl bg-surface-gray p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-black leading-tight mb-6">RNE xây dựng niềm tin bằng</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Chuyên môn của founder và đội ngũ',
                'Đối tác đã được xác minh',
                'Quy trình minh bạch',
                'Nội dung giáo dục kiểm chứng',
                'Trải nghiệm cộng đồng',
                'Số liệu có thể kiểm chứng',
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4">
                  <span className="w-2 h-2 rounded-full bg-brand-green shrink-0" />
                  <span className="text-sm text-gray-700">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        onNavigate={onNavigate}
        heading="Muốn hiểu rõ hơn về cách RNE làm việc?"
        body="Đăng ký tư vấn để trao đổi trực tiếp với đội ngũ RNE về mục tiêu của bạn."
      />
    </>
  );
}
