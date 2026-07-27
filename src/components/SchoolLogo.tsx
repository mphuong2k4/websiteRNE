interface SchoolLogoProps {
  name: string;
  abbr: string;
  className?: string;
}

export default function SchoolLogo({ name, abbr, className = 'h-16 w-16' }: SchoolLogoProps) {
  return (
    <div
      className={`${className} rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden`}
      aria-label={`Logo ${name}`}
    >
      <span className="logo-placeholder px-2 leading-tight">{abbr}</span>
    </div>
  );
}
