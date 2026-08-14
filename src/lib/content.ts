import { ARTICLES, type Article } from '@/data/articles';
import { supabase } from '@/lib/supabase';

export type ArticleStatus = 'draft' | 'published';
export interface CmsOverride {
  type: 'text' | 'image';
  value: string;
}

export interface StudentGalleryItem {
  id: string;
  image: string;
  alt: string;
  caption: string;
}

export interface StudentGalleryGroup {
  id: string;
  title: string;
  items: StudentGalleryItem[];
}
export interface ManagedArticle extends Article {
  id?: string;
  status: ArticleStatus;
}

export interface SiteSettings {
  primaryColor: string;
  accentColor: string;
  darkColor: string;
  heroEyebrow: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  heroImage: string;
  ctaLabel: string;
  consultationUrl: string;
  overrides: Record<string, CmsOverride>;
  studentGalleryGroups: StudentGalleryGroup[];
}

export const DEFAULT_SETTINGS: SiteSettings = {
  primaryColor: '#0B5ED7',
  accentColor: '#F6B918',
  darkColor: '#0B1F3A',
  heroEyebrow: 'Tư vấn giáo dục chuyên sâu về Thái Lan',
  heroTitle: 'Biến kế hoạch du học thành một',
  heroHighlight: 'lộ trình rõ ràng.',
  heroDescription: 'Từ chọn ngành, chọn trường đến học bổng và hồ sơ — RNE đồng hành bằng tư vấn cá nhân hóa, thông tin minh bạch và quyết định dựa trên mục tiêu thật của bạn.',
  heroImage: '/rne-consultation-hero.jpg',
  ctaLabel: 'Đặt lịch tư vấn',
  consultationUrl: 'https://www.facebook.com/profile.php?id=61592041495494',
  overrides: {},
  studentGalleryGroups: [
    {
      id: 'hanh-trinh-hoc-vien',
      title: 'Hành trình học viên RNE',
      items: [
        { id: 'demo-1', image: '/assets/students/student-demo-1.jpg', alt: 'Học viên RNE trong khuôn viên trường đại học', caption: 'Sẵn sàng cho hành trình học tập quốc tế' },
        { id: 'demo-2', image: '/assets/students/student-demo-2.jpg', alt: 'Nhóm sinh viên quốc tế tại trường đại học', caption: 'Kết nối và trưởng thành trong môi trường đa văn hóa' },
        { id: 'demo-3', image: '/assets/students/student-demo-3.jpg', alt: 'Sinh viên trong lễ tốt nghiệp', caption: 'Đánh dấu một cột mốc đáng nhớ' },
      ],
    },
  ],
};

export async function loadPublicContent() {
  if (!supabase) return { articles: [], settings: DEFAULT_SETTINGS };
  const [articleResult, settingsResult] = await Promise.all([
    supabase.from('cms_articles').select('id, status, document').eq('status', 'published').order('updated_at', { ascending: false }),
    supabase.from('site_settings').select('settings').eq('id', 'main').maybeSingle(),
  ]);
  return {
    articles: articleResult.error ? [] : (articleResult.data || []).map((row) => ({ ...row.document, id: row.id, status: row.status })) as ManagedArticle[],
    settings: settingsResult.error ? DEFAULT_SETTINGS : { ...DEFAULT_SETTINGS, ...(settingsResult.data?.settings || {}) },
  };
}

export async function loadAdminArticles(): Promise<ManagedArticle[]> {
  if (!supabase) throw new Error('Supabase chưa được cấu hình.');
  const { data, error } = await supabase.from('cms_articles').select('id, status, document').order('updated_at', { ascending: false });
  if (error) throw error;
  const managed = (data || []).map((row) => ({ ...row.document, id: row.id, status: row.status })) as ManagedArticle[];
  return mergeAdminArticles(managed);
}

function mergeAdminArticles(managed: ManagedArticle[]) {
  const managedSlugs = new Set(managed.map((article) => article.slug));
  const originals = ARTICLES
    .filter((article) => !managedSlugs.has(article.slug))
    .map((article) => ({ ...article, status: 'published' as const }));
  return [...managed, ...originals];
}

export async function saveArticle(article: ManagedArticle): Promise<void> {
  if (!supabase) throw new Error('Supabase chưa được cấu hình.');
  const { id, status, ...document } = article;
  const payload = { ...(id ? { id } : {}), slug: article.slug, status, document, updated_at: new Date().toISOString() };
  const { error } = await supabase.from('cms_articles').upsert(payload, { onConflict: 'slug' });
  if (error) throw error;
}

export async function deleteArticle(article: ManagedArticle): Promise<void> {
  if (!supabase) throw new Error('Supabase chưa được cấu hình.');
  const query = article.id
    ? supabase.from('cms_articles').delete().eq('id', article.id)
    : supabase.from('cms_articles').delete().eq('slug', article.slug);
  const { error } = await query;
  if (error) throw error;
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  if (!supabase) throw new Error('Supabase chưa được cấu hình.');
  const { error } = await supabase.from('site_settings').upsert({ id: 'main', settings, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function uploadSiteImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) throw new Error('Vui lòng chọn đúng tệp hình ảnh.');
  if (file.size > 8 * 1024 * 1024) throw new Error('Ảnh không được lớn hơn 8 MB.');
  if (!supabase) throw new Error('Supabase Storage chưa được cấu hình.');
  const extension = (file.name.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi, '').toLowerCase();
  const path = 'uploads/' + Date.now() + '-' + crypto.randomUUID() + '.' + extension;
  const result = await supabase.storage.from('site-assets').upload(path, file, { cacheControl: '3600', upsert: false });
  if (result.error) throw result.error;
  return supabase.storage.from('site-assets').getPublicUrl(result.data.path).data.publicUrl;
}

export function hexToRgbChannels(hex: string) {
  const value = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(value)) return null;
  return `${parseInt(value.slice(0, 2), 16)} ${parseInt(value.slice(2, 4), 16)} ${parseInt(value.slice(4, 6), 16)}`;
}
