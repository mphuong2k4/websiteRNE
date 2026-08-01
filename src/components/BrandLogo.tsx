interface BrandLogoProps {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}

export default function BrandLogo({ inverse = false, compact = false, className = '' }: BrandLogoProps) {
  const wordmark = inverse ? '#FFFFFF' : '#0B1F3A';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Right Now Education">
      <svg viewBox="0 0 48 48" className="h-full w-auto shrink-0" role="img" aria-hidden="true">
        <rect width="48" height="48" rx="14" fill="#0B5ED7" />
        <path d="M10 15.5 23.8 10l14.2 5.5v17L24 38l-14-5.5v-17Z" fill="#fff" opacity=".98" />
        <path d="M24 18.2v19.3M10.5 16 24 21.2 37.5 16" fill="none" stroke="#0B5ED7" strokeWidth="3" strokeLinejoin="round" />
        <path d="m28.5 12.2 4.9-4.1 1.8 1.1-3.1 5.6" fill="#F6B918" />
        <path d="M24 21.2 10.5 16v16.2L24 37.5V21.2Z" fill="#EAF2FF" />
        <path d="M24 21.2 37.5 16v16.2L24 37.5V21.2Z" fill="#fff" />
        <path d="M17 24.3h4.2M17 28h4.2M27 24.3h4.2M27 28h4.2" stroke="#0B5ED7" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      {!compact && (
        <span className="flex flex-col text-left leading-none">
          <span className="text-[1.03rem] md:text-[1.15rem] font-extrabold" style={{ color: wordmark }}>
            Right Now
          </span>
          <span className="mt-1 text-[0.48rem] md:text-[0.53rem] font-bold uppercase tracking-[0.34em] text-brand-blue">
            Education
          </span>
        </span>
      )}
    </span>
  );
}
