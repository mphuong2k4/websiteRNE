import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ARTICLES, type Article } from '@/data/articles';
import { DEFAULT_SETTINGS, hexToRgbChannels, loadPublicContent, type SiteSettings } from '@/lib/content';

interface ContentValue {
  articles: Article[];
  settings: SiteSettings;
  loading: boolean;
  refresh: () => Promise<void>;
}

const ContentContext = createContext<ContentValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [managed, setManaged] = useState<Article[]>([]);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    const content = await loadPublicContent();
    setManaged(content.articles);
    setSettings(content.settings);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
    const handler = () => void refresh();
    window.addEventListener('rne-content-updated', handler);
    return () => window.removeEventListener('rne-content-updated', handler);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const primary = hexToRgbChannels(settings.primaryColor);
    const accent = hexToRgbChannels(settings.accentColor);
    const dark = hexToRgbChannels(settings.darkColor);
    if (primary) { root.style.setProperty('--brand-blue-rgb', primary); root.style.setProperty('--blue', settings.primaryColor); }
    if (accent) { root.style.setProperty('--brand-yellow-rgb', accent); root.style.setProperty('--yellow', settings.accentColor); }
    if (dark) { root.style.setProperty('--brand-black-rgb', dark); root.style.setProperty('--black', settings.darkColor); }
  }, [settings]);

  const articles = useMemo(() => {
    const managedSlugs = new Set(managed.map((article) => article.slug));
    return [...managed, ...ARTICLES.filter((article) => !managedSlugs.has(article.slug))];
  }, [managed]);

  return <ContentContext.Provider value={{ articles, settings, loading, refresh }}>{children}</ContentContext.Provider>;
}

// Hook is colocated with its provider so CMS consumers share one public module.
// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const value = useContext(ContentContext);
  if (!value) throw new Error('useContent must be used inside ContentProvider');
  return value;
}
