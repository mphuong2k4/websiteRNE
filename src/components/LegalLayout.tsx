import type { ReactNode } from 'react';

interface LegalLayoutProps {
  title: string;
  updated: string;
  children: ReactNode;
}

export default function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-content px-5 sm:px-8 py-16 md:py-24">
        <p className="section-label">PHÁP LÝ</p>
        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold text-brand-black leading-tight">{title}</h1>
        <p className="mt-3 text-sm text-gray-500">Cập nhật lần cuối: {new Date(updated).toLocaleDateString('vi-VN')}</p>
        <div className="mt-10 prose prose-gray max-w-3xl text-gray-700 leading-relaxed space-y-4">
          {children}
        </div>
      </div>
    </section>
  );
}
