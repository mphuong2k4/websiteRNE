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

  return (
    <div
      className={`${className} rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm`}
      aria-label={`Logo ${name}`}
    >
      {website && !failed ? (
        <img
          src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(website)}&sz=128`}
          alt={`Biểu trưng ${name}`}
          className="h-[72%] w-[72%] object-contain"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="logo-placeholder px-2 leading-tight">{abbr}</span>
      )}
    </div>
  );
}
