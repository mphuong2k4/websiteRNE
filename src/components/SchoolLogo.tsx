import { useState } from 'react';
import { SCHOOL_WEBSITES } from '@/data/schoolWebsites';

interface SchoolLogoProps {
  name: string;
  abbr: string;
  className?: string;
}

export default function SchoolLogo({ name, abbr, className = 'h-16 w-16' }: SchoolLogoProps) {
  const [failed, setFailed] = useState(false);
  const website = SCHOOL_WEBSITES[abbr];
  const logoUrl = abbr === 'CMU'
    ? 'https://www.cmu.ac.th/favicon.ico'
    : website && `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(website)}&sz=256`;

  return (
    <div
      className={`${className} rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm`}
      aria-label={`Logo ${name}`}
    >
      {logoUrl && !failed ? (
        <img
          src={logoUrl}
          alt={`Biểu trưng ${name}`}
          className="h-[78%] w-[78%] object-contain"
          loading="lazy"
          onLoad={(event) => {
            if (event.currentTarget.naturalWidth < 96 || event.currentTarget.naturalHeight < 96) setFailed(true);
          }}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="logo-placeholder px-2 text-sm font-extrabold tracking-tight leading-tight text-brand-blue">{abbr}</span>
      )}
    </div>
  );
}
