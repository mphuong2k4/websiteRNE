interface BrandLogoProps {
  inverse?: boolean;
  compact?: boolean;
  className?: string;
}

export default function BrandLogo({ inverse = false, compact = false, className = '' }: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center ${className}`} aria-label="Right Now Education">
      <img
        src="/rne-brand-logo.png"
        alt="Right Now Education"
        className={`h-full w-auto object-contain ${inverse ? 'rounded-lg bg-white p-1.5' : ''} ${compact ? 'aspect-square' : ''}`}
      />
    </span>
  );
}
