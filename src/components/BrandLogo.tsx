interface BrandLogoProps {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}

export default function BrandLogo({ inverse = false, compact = false, className = '' }: BrandLogoProps) {
  const mark = (
    <span className="h-full aspect-square shrink-0" aria-hidden="true">
      <img src="/rne-brand-logo.png" alt="" className="h-full w-full object-contain" />
    </span>
  );

  const wordmark = (
    <span className="flex flex-col text-left leading-none whitespace-nowrap">
      <span className={`text-[1rem] md:text-[1.12rem] font-extrabold ${inverse ? 'text-white' : 'text-brand-black'}`}>Right Now</span>
      <span className="mt-1 text-[0.48rem] md:text-[0.53rem] font-bold uppercase tracking-[0.34em] text-brand-blue">Education</span>
    </span>
  );

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Right Now Education">
      {compact ? mark : <>{mark}{wordmark}</>}
    </span>
  );
}
