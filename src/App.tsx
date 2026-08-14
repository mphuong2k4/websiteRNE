import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import SchoolsPage from '@/pages/SchoolsPage';
import InsightsPage from '@/pages/InsightsPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';
import RefundPage from '@/pages/RefundPage';
import DisclaimerPage from '@/pages/DisclaimerPage';
import AdminPage from '@/pages/AdminPage';
import VisualEditor, { ContentOverrides } from '@/components/VisualEditor';
import { pageFromPath, urlFor, type Page } from '@/lib/navigation';

function getCurrentPage(): Page {
  const hash = window.location.hash.replace(/^#/, '');
  return pageFromPath(hash || '/');
}

export default function App() {
  const visualEdit = new URLSearchParams(window.location.search).get('rne-edit') === '1';
  const [page, setPage] = useState<Page>(getCurrentPage());

  useEffect(() => {
    const onHashChange = () => {
      setPage(getCurrentPage());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (next: Page) => {
    const url = `#${urlFor(next)}`;
    if (window.location.hash !== url) {
      window.location.hash = url;
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const labels: Record<Page, string> = {
      home: 'Trang chủ', services: 'Dịch vụ', schools: 'Trường tại Thái Lan', insights: 'Insights',
      about: 'Về RNE', contact: 'Liên hệ', privacy: 'Chính sách bảo mật', terms: 'Điều khoản dịch vụ',
      refund: 'Chính sách hoàn phí', disclaimer: 'Miễn trừ trách nhiệm',
      admin: 'Quản trị',
    };
    document.title = `${labels[page]} | Right Now Education`;
  }, [page]);

  const render = () => {
    switch (page) {
      case 'home': return <HomePage onNavigate={navigate} />;
      case 'services': return <ServicesPage onNavigate={navigate} />;
      case 'schools': return <SchoolsPage onNavigate={navigate} />;
      case 'insights': return <InsightsPage onNavigate={navigate} />;
      case 'about': return <AboutPage onNavigate={navigate} />;
      case 'contact': return <ContactPage onNavigate={navigate} />;
      case 'privacy': return <PrivacyPage />;
      case 'terms': return <TermsPage />;
      case 'refund': return <RefundPage />;
      case 'disclaimer': return <DisclaimerPage />;
      case 'admin': return <AdminPage />;
      default: return <HomePage onNavigate={navigate} />;
    }
  };

  if (page === 'admin') return <AdminPage />;

  return (
    <>
    {visualEdit && <VisualEditor />}
    <div data-cms-root className="min-h-screen bg-white flex flex-col">
      <Header current={page} onNavigate={navigate} />
      <main className="flex-1">{render()}</main>
      <Footer onNavigate={navigate} />
      <ContentOverrides />
    </div>
    </>
  );
}
