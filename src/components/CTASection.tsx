import { ArrowRight } from 'lucide-react';
import type { Page } from '@/lib/navigation';

interface CTASectionProps {
  onNavigate: (page: Page) => void;
  heading: string;
  body: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryPage?: Page;
  secondaryPage?: Page;
  variant?: 'blue' | 'multicolor';
}

export default function CTASection({
  onNavigate,
  heading,
  body,
  primaryLabel = 'Đăng ký tư vấn',
  secondaryLabel = 'Liên hệ với RNE',
  primaryPage = 'contact',
  secondaryPage = 'contact',
  variant = 'blue',
}: CTASectionProps) {
  return (
    <section
      className={`relative overflow-hidden ${
        variant === 'multicolor'
          ? 'bg-gradient-to-r from-brand-blue via-brand-blue to-brand-orange'
          : 'bg-brand-blue'
      }`}
    >
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-brand-yellow/20 blur-2xl" aria-hidden />
      <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-brand-pink/20 blur-2xl" aria-hidden />
      <div className="relative mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight max-w-3xl mx-auto">{heading}</h2>
        <p className="mt-5 text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{body}</p>
        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onNavigate(primaryPage)}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold bg-brand-yellow text-brand-black hover:bg-yellow-300 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {primaryLabel}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate(secondaryPage)}
            className="btn-outline-white"
          >
            {secondaryLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
