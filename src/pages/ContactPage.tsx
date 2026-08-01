import { useState, type FormEvent } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Clock3 } from 'lucide-react';
import type { Page } from '@/lib/navigation';
import { supabase } from '@/lib/supabase';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

const EDUCATION_LEVELS = ['Đang học cấp 3', 'Đã tốt nghiệp cấp 3', 'Đang học đại học / cao đẳng', 'Đã tốt nghiệp đại học', 'Đã có bằng thạc sĩ trở lên'];
const COUNTRIES = ['Thái Lan', 'Anh', 'Mỹ', 'Úc', 'New Zealand', 'Singapore', 'Chưa xác định'];
const SERVICES = ['Tư vấn trường & ngành', 'Chiến lược học bổng', 'Internship', 'Tình nguyện quốc tế', 'Mentorship', 'Khác'];
const BUDGETS = ['Dưới 200 triệu/năm', '200–400 triệu/năm', '400–600 triệu/năm', 'Trên 600 triệu/năm', 'Chưa xác định'];
const START_TIMES = ['Trong 1–3 tháng', 'Trong 3–6 tháng', 'Trong 6–12 tháng', 'Sau 1 năm', 'Chưa xác định'];
const CHANNELS = ['Email', 'Zalo', 'WhatsApp', 'Facebook', 'Điện thoại'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactPage(_props: ContactPageProps) {
  void _props;
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');

  const validate = (form: HTMLFormElement): Record<string, string> => {
    const fd = new FormData(form);
    const e: Record<string, string> = {};
    if (!String(fd.get('fullName') || '').trim()) e.fullName = 'Vui lòng nhập họ và tên.';
    if (!String(fd.get('email') || '').trim()) e.email = 'Vui lòng nhập email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(fd.get('email')))) e.email = 'Email không hợp lệ.';
    if (!String(fd.get('phone') || '').trim()) e.phone = 'Vui lòng nhập số điện thoại.';
    if (!fd.get('consent')) e.consent = 'Bạn cần đồng ý xử lý dữ liệu để gửi yêu cầu.';
    return e;
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (honeypot) return;
    const errs = validate(e.currentTarget);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      full_name: fd.get('fullName'),
      birth_year: fd.get('birthYear'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      education_level: fd.get('educationLevel'),
      country: fd.get('country'),
      service: fd.get('service'),
      field: fd.get('field'),
      budget: fd.get('budget'),
      start_time: fd.get('startTime'),
      content: fd.get('content'),
      contact_channel: fd.get('channel'),
    };

    setStatus('loading');
    if (!supabase) {
      const subject = encodeURIComponent(`Yêu cầu tư vấn từ ${String(payload.full_name || '')}`);
      const body = encodeURIComponent([
        `Họ và tên: ${payload.full_name || ''}`, `Năm sinh: ${payload.birth_year || ''}`,
        `Email: ${payload.email || ''}`, `Số điện thoại: ${payload.phone || ''}`,
        `Trình độ hiện tại: ${payload.education_level || ''}`, `Quốc gia quan tâm: ${payload.country || ''}`,
        `Dịch vụ: ${payload.service || ''}`, `Ngành/lĩnh vực: ${payload.field || ''}`,
        `Ngân sách: ${payload.budget || ''}`, `Thời điểm bắt đầu: ${payload.start_time || ''}`,
        `Kênh liên hệ mong muốn: ${payload.contact_channel || ''}`, '', `Nội dung: ${payload.content || ''}`,
      ].join('\n'));
      window.location.href = `mailto:admin@rightnow-education.info?subject=${subject}&body=${body}`;
      setStatus('idle');
      return;
    }

    const { error } = await supabase.from('contact_submissions').insert(payload);
    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      e.currentTarget.reset();
    }
  };

  return (
    <>
      <section className="bg-surface-pale-blue">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-12 md:py-20">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="section-label">LIÊN HỆ</p>
              <h1 className="page-hero-title title-single-line mt-4 font-extrabold text-brand-black">Bắt đầu từ mục tiêu của bạn.</h1>
              <p className="mt-5 text-gray-700 leading-relaxed">Chia sẻ vài thông tin cơ bản. RNE sẽ giúp bạn xác định bước tiếp theo phù hợp.</p>
            </div>
            <img src="/rne-service-planning.jpg" alt="Buổi trao đổi định hướng cùng chuyên viên RNE" className="lg:col-span-5 aspect-[16/9] w-full rounded-3xl object-cover shadow-xl" width="1536" height="1024" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-content px-5 sm:px-8 py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Contact info */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl bg-surface-gray p-6">
                <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">Thông tin liên hệ</h2>
                <a href="mailto:admin@rightnow-education.info" className="inline-flex items-center gap-2 text-brand-blue font-medium hover:underline">
                  <Mail className="w-5 h-5" /> admin@rightnow-education.info
                </a>
                <div className="mt-6 flex items-start gap-2 text-sm text-gray-600">
                  <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
                  <span>RNE sẽ phản hồi qua email sau khi tiếp nhận thông tin.</span>
                </div>
              </div>
              <div className="rounded-2xl bg-brand-yellow/10 border border-brand-yellow/30 p-5">
                <p className="text-sm text-gray-700 leading-relaxed">
                  Các kênh mạng xã hội chính thức sẽ được cập nhật khi RNE hoàn tất thiết lập. Vui lòng liên hệ qua email trong thời gian này.
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-8">
              {status === 'success' ? (
                <div className="rounded-2xl bg-green-50 border border-brand-green/30 p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-brand-green mx-auto mb-4" />
                  <h2 className="text-xl font-bold text-brand-black">Yêu cầu đã được gửi</h2>
                  <p className="mt-2 text-gray-700">RNE đã nhận được thông tin của bạn và sẽ liên hệ qua kênh bạn đã lựa chọn.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 btn-outline">Gửi yêu cầu khác</button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  {/* Honeypot */}
                  <input type="text" name="company" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                  {status === 'error' && (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-700">Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại hoặc liên hệ trực tiếp qua email.</p>
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Họ và tên" name="fullName" error={errors.fullName} required />
                    <Field label="Năm sinh" name="birthYear" type="number" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Email" name="email" type="email" error={errors.email} required />
                    <Field label="Số điện thoại" name="phone" type="tel" error={errors.phone} required />
                  </div>
                  <SelectField label="Trình độ học vấn hiện tại" name="educationLevel" options={EDUCATION_LEVELS} />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <SelectField label="Quốc gia quan tâm" name="country" options={COUNTRIES} />
                    <SelectField label="Dịch vụ quan tâm" name="service" options={SERVICES} />
                  </div>
                  <Field label="Ngành hoặc lĩnh vực quan tâm" name="field" />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <SelectField label="Ngân sách dự kiến" name="budget" options={BUDGETS} />
                    <SelectField label="Thời điểm muốn bắt đầu" name="startTime" options={START_TIMES} />
                  </div>
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1.5">Nội dung cần hỗ trợ</label>
                    <textarea id="content" name="content" rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition" />
                  </div>
                  <SelectField label="Kênh liên hệ mong muốn" name="channel" options={CHANNELS} />

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="consent" className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue" />
                      <span className="text-sm text-gray-700 leading-relaxed">
                        Tôi đồng ý cho Right Now Education xử lý thông tin cá nhân nhằm mục đích tư vấn. Thông tin sẽ không được chia sẻ với bên thứ ba ngoài mục đích dịch vụ.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1 text-xs text-red-600">{errors.consent}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Đang gửi...</>
                    ) : (
                      <>Gửi yêu cầu tư vấn <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = 'text', error, required }: { label: string; name: string; type?: string; error?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-brand-orange">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          error ? 'border-red-400 focus:ring-2 focus:ring-red-200' : 'border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20'
        }`}
      />
      {error && <p id={`${name}-error`} className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <select
        id={name}
        name={name}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition bg-white"
      >
        <option value="">— Chọn —</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
