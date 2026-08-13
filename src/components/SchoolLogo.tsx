import { useState } from 'react';
import { GraduationCap } from 'lucide-react';
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
          onError={() => setFailed(true)}
        />
      ) : (
        <GraduationCap className="h-8 w-8 text-brand-blue" aria-label={`Biểu tượng ${name}`} />
      )}
    </div>
  );
}
