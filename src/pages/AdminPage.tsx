import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import type { Session } from '@supabase/supabase-js';
import { ArrowLeft, Eye, FileText, Image as ImageIcon, LogOut, MousePointer2, Plus, Save, Trash2 } from 'lucide-react';
import { CATEGORIES, type ArticleSection } from '@/data/articles';
import { useContent } from '@/contexts/ContentContext';
import { deleteArticle, loadAdminArticles, saveArticle, saveSettings, uploadSiteImage, type ManagedArticle, type SiteSettings, type StudentGalleryGroup } from '@/lib/content';
import { supabase } from '@/lib/supabase';
import BrandLogo from '@/components/BrandLogo';

const input = 'mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/10';
const label = 'block text-xs font-semibold uppercase tracking-wide text-slate-500';

function slugify(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function blankArticle(): ManagedArticle {
  const day = new Date().toISOString().slice(0, 10);
  return { status: 'draft', slug: '', title: '', seoTitle: '', metaDescription: '', keywords: [], category: CATEGORIES[1], excerpt: '', image: '', imageAlt: '', publishedAt: day, updatedAt: day, readingTime: '5 phút', author: 'Đội ngũ Right Now Education', introduction: '', sections: [], faq: [], sources: [] };
}

function sectionsToText(items: ArticleSection[]) {
  return items.map((item) => ['## ' + item.heading, ...item.paragraphs, ...(item.bullets || []).map((part) => '- ' + part)].join('\n\n')).join('\n\n');
}

function textToSections(value: string): ArticleSection[] {
  const result: ArticleSection[] = [];
  let current: ArticleSection = { heading: 'Nội dung', paragraphs: [], bullets: [] };
  const push = () => {
    if (current.paragraphs.length || current.bullets?.length || current.heading !== 'Nội dung') result.push(current);
  };
  value.split('\n').forEach((raw) => {
    const line = raw.trim();
    if (!line) return;
    if (line.startsWith('## ')) {
      push();
      current = { heading: line.slice(3), paragraphs: [], bullets: [] };
    } else if (line.startsWith('- ')) current.bullets?.push(line.slice(2));
    else current.paragraphs.push(line);
  });
  push();
  return result.map((item) => ({ ...item, bullets: item.bullets?.length ? item.bullets : undefined }));
}

function Login({ done }: { done: (session: Session) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    if (!supabase) return;
    const result = await supabase.auth.signInWithPassword({ email, password });
    if (result.error || !result.data.session) {
      setBusy(false);
      setError('Email hoặc mật khẩu không đúng.');
      return;
    }
    const permission = await supabase.rpc('is_admin');
    setBusy(false);
    if (permission.error || permission.data !== true) {
      await supabase.auth.signOut();
      setError('Tài khoản này không có quyền quản trị.');
      return;
    }
    done(result.data.session);
  };
  return <div className='flex min-h-screen items-center justify-center bg-slate-950 p-5'>
    <form onSubmit={submit} className='w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl'>
      <BrandLogo className='h-10' />
      <h1 className='mt-6 text-center text-2xl font-extrabold text-brand-black'>Đăng nhập</h1>
      <label className={label + ' mt-7'}>Email<input required type='email' className={input} value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label className={label + ' mt-4'}>Mật khẩu<input required type='password' className={input} value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      {error && <p className='mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700'>{error}</p>}
      <button disabled={busy} className='mt-6 w-full rounded-xl bg-brand-blue px-4 py-3 font-semibold text-white disabled:opacity-50'>{busy ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
    </form>
  </div>;
}

function SupabaseRequired() {
  return <div className='flex min-h-screen items-center justify-center bg-slate-950 p-5'><div className='w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl'><BrandLogo className='mx-auto h-10' /><h1 className='mt-6 text-2xl font-extrabold text-brand-black'>Chưa kết nối database</h1><p className='mt-3 text-sm leading-relaxed text-slate-600'>Admin đã được khóa ở chế độ Supabase-only. Hãy cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY trên môi trường triển khai.</p></div></div>;
}

export default function AdminPage() {
  const visualEditorUrl = window.location.pathname + '?rne-edit=1#/';
  const content = useContent();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(Boolean(supabase));
  const [tab, setTab] = useState<'posts' | 'gallery'>('posts');
  const [items, setItems] = useState<ManagedArticle[]>([]);
  const [draft, setDraft] = useState<ManagedArticle | null>(null);
  const [body, setBody] = useState('');
  const [faq, setFaq] = useState('');
  const [sources, setSources] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const active = Boolean(session);

  const reload = useCallback(async () => {
    if (!active) return;
    try { setItems(await loadAdminArticles()); }
    catch (err) { setNotice(err instanceof Error ? err.message : 'Không thể tải dữ liệu CMS.'); }
  }, [active]);

  useEffect(() => {
    const client = supabase;
    if (!client) return;
    const verify = async (next: Session | null) => {
      if (!next) { setSession(null); setChecking(false); return; }
      const permission = await client.rpc('is_admin');
      setSession(permission.data === true ? next : null);
      setChecking(false);
    };
    void client.auth.getSession().then(({ data }) => void verify(data.session));
    const listener = client.auth.onAuthStateChange((_event, next) => void verify(next));
    return () => listener.data.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (active) void reload(); }, [active, reload]);

  const edit = (article: ManagedArticle) => {
    setDraft({ ...article });
    setBody(sectionsToText(article.sections));
    setFaq(article.faq.map((item) => item.question + ' | ' + item.answer).join('\n'));
    setSources(article.sources.map((item) => item.label + ' | ' + item.url).join('\n'));
    setNotice('');
  };
  const field = <K extends keyof ManagedArticle>(key: K, value: ManagedArticle[K]) => setDraft((old) => old ? { ...old, [key]: value } : old);
  const pairs = (value: string) => value.split('\n').map((line) => line.split('|').map((part) => part.trim())).filter((parts) => parts[0] && parts[1]);

  const savePost = async () => {
    if (!draft?.title.trim()) { setNotice('Vui lòng nhập tiêu đề.'); return; }
    setBusy(true);
    const next: ManagedArticle = { ...draft, slug: draft.slug || slugify(draft.title), seoTitle: draft.seoTitle || draft.title + ' | RNE', updatedAt: new Date().toISOString().slice(0, 10), sections: textToSections(body), faq: pairs(faq).map(([question, answer]) => ({ question, answer })), sources: pairs(sources).map(([sourceLabel, url]) => ({ label: sourceLabel, url })) };
    try { await saveArticle(next); await reload(); await content.refresh(); setDraft(null); setNotice(next.status === 'published' ? 'Đã xuất bản bài viết.' : 'Đã lưu bản nháp.'); }
    catch (err) { setNotice(err instanceof Error ? err.message : 'Không thể lưu bài viết.'); }
    finally { setBusy(false); }
  };
  const remove = async (article: ManagedArticle) => {
    if (!confirm('Xóa bài viết ‘' + article.title + '’?')) return;
    try { await deleteArticle(article); await reload(); await content.refresh(); setDraft(null); setNotice('Đã xóa bài viết.'); }
    catch (err) { setNotice(err instanceof Error ? err.message : 'Không thể xóa bài.'); }
  };
  if (!supabase) return <SupabaseRequired />;
  if (checking) return <div className='flex min-h-screen items-center justify-center bg-slate-950 text-white'>Đang kiểm tra phiên đăng nhập...</div>;
  if (!session) return <Login done={setSession} />;

  return <div className='min-h-screen bg-slate-100 text-slate-900'>
    <header className='sticky top-0 z-30 border-b border-slate-200 bg-white/95'>
      <div className='mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3'>
        <div className='flex items-center gap-4'><BrandLogo className='h-9' /><span className='hidden border-l border-slate-200 pl-4 sm:block'><strong className='block text-sm text-brand-black'>Trang quản trị</strong><small className='text-slate-500'>{session.user.email}</small></span></div>
        <div className='flex gap-2'><a href={visualEditorUrl} className='inline-flex items-center gap-2 rounded-xl bg-brand-blue px-3 py-2 text-sm font-semibold text-white'><MousePointer2 className='h-4 w-4' /> Chỉnh trực tiếp</a><a href='#/' className='inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm'><Eye className='h-4 w-4' /> Xem web</a><button onClick={() => void supabase?.auth.signOut()} className='rounded-xl border border-slate-200 p-2.5' aria-label='Đăng xuất'><LogOut className='h-4 w-4' /></button></div>
      </div>
    </header>
    <div className='mx-auto grid max-w-[1440px] lg:grid-cols-[220px_1fr]'>
      <aside className='border-b border-slate-200 bg-white p-4 lg:min-h-[calc(100vh-65px)] lg:border-b-0 lg:border-r'>
        <nav className='flex gap-2 lg:flex-col'>
          <button onClick={() => { setTab('posts'); setDraft(null); }} className={(tab === 'posts' ? 'bg-brand-blue text-white' : 'text-slate-600 hover:bg-slate-100') + ' flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold'}><FileText className='h-4 w-4' /> Bài viết</button>
          <button onClick={() => { setTab('gallery'); setDraft(null); }} className={(tab === 'gallery' ? 'bg-brand-blue text-white' : 'text-slate-600 hover:bg-slate-100') + ' flex flex-1 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold'}><ImageIcon className='h-4 w-4' /> Hình ảnh học viên</button>
          <a href={visualEditorUrl} className='flex flex-1 items-center gap-2 rounded-xl bg-slate-950 px-3 py-2.5 text-sm font-semibold text-white'><MousePointer2 className='h-4 w-4' /> Sửa mọi vị trí</a>
        </nav>
      </aside>
      <main className='min-w-0 p-5 md:p-8'>
        {notice && <p className='mb-5 rounded-xl border border-brand-blue/20 bg-white p-3 text-sm text-brand-blue'>{notice}</p>}
        {tab === 'posts' && !draft && <PostList items={items} onEdit={edit} onNew={() => edit(blankArticle())} />}
        {tab === 'posts' && draft && <PostEditor draft={draft} body={body} faq={faq} sources={sources} busy={busy} field={field} setBody={setBody} setFaq={setFaq} setSources={setSources} back={() => setDraft(null)} save={savePost} remove={remove} />}
        {tab === 'gallery' && <GalleryManager settings={content.settings} refresh={content.refresh} notify={setNotice} />}
      </main>
    </div>
  </div>;
}

function PostList({ items, onEdit, onNew }: { items: ManagedArticle[]; onEdit: (item: ManagedArticle) => void; onNew: () => void }) {
  return <><div className='flex flex-wrap items-end justify-between gap-4'><div><p className='text-xs font-semibold uppercase tracking-widest text-brand-blue'>Nội dung</p><h1 className='mt-1 text-2xl font-extrabold text-brand-black'>Tất cả bài viết</h1><p className='mt-1 text-sm text-slate-500'>{items.length} bài viết hiện có trên website</p></div><button onClick={onNew} className='inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white'><Plus className='h-4 w-4' /> Viết bài mới</button></div>
    <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white'>{items.length === 0 ? <div className='p-12 text-center text-slate-500'><FileText className='mx-auto mb-3 text-slate-300' />Chưa có bài viết CMS.</div> : items.map((item) => <button key={item.id || item.slug} onClick={() => onEdit(item)} className='flex w-full items-center gap-4 border-b border-slate-100 p-4 text-left last:border-0 hover:bg-slate-50'><img src={item.image || '/rne-consultation-hero.jpg'} alt='' className='h-14 w-20 rounded-lg object-cover' /><span className='min-w-0 flex-1'><strong className='block truncate text-sm'>{item.title}</strong><small className='text-slate-500'>{item.category} · /{item.slug}</small></span><span className={(item.status === 'published' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700') + ' rounded-full px-2.5 py-1 text-xs font-semibold'}>{item.status === 'published' ? 'Đã đăng' : 'Bản nháp'}</span></button>)}</div></>;
}

interface EditorProps {
  draft: ManagedArticle; body: string; faq: string; sources: string; busy: boolean;
  field: <K extends keyof ManagedArticle>(key: K, value: ManagedArticle[K]) => void;
  setBody: (value: string) => void; setFaq: (value: string) => void; setSources: (value: string) => void;
  back: () => void; save: () => void; remove: (item: ManagedArticle) => void;
}

function PostEditor(props: EditorProps) {
  const d = props.draft;
  const [uploading, setUploading] = useState(false);
  const upload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try { props.field('image', await uploadSiteImage(file)); }
    catch (error) { alert(error instanceof Error ? error.message : 'Không thể tải ảnh.'); }
    finally { setUploading(false); }
  };
  return <><div className='flex justify-between gap-3'><button onClick={props.back} className='inline-flex items-center gap-2 text-sm text-slate-500'><ArrowLeft className='h-4 w-4' /> Danh sách</button><div className='flex gap-2'>{d.id && <button onClick={() => props.remove(d)} className='rounded-xl border border-red-200 p-2.5 text-red-600'><Trash2 className='h-4 w-4' /></button>}<button disabled={props.busy} onClick={props.save} className='inline-flex items-center gap-2 rounded-xl bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white'><Save className='h-4 w-4' /> Lưu bài</button></div></div>
    <div className='mt-5 grid gap-5 xl:grid-cols-[1fr_320px]'>
      <section className='space-y-5 rounded-2xl border border-slate-200 bg-white p-6'>
        <label className={label}>Tiêu đề<input className={input + ' text-lg font-semibold'} value={d.title} onChange={(e) => props.field('title', e.target.value)} /></label>
        <div className='grid gap-4 md:grid-cols-2'><label className={label}>Slug<input className={input} value={d.slug} onChange={(e) => props.field('slug', slugify(e.target.value))} /></label><label className={label}>Chuyên mục<select className={input} value={d.category} onChange={(e) => props.field('category', e.target.value)}>{CATEGORIES.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label></div>
        <label className={label}>Mô tả ngắn<textarea rows={3} className={input} value={d.excerpt} onChange={(e) => props.field('excerpt', e.target.value)} /></label>
        <label className={label}>Đoạn mở đầu<textarea rows={4} className={input} value={d.introduction} onChange={(e) => props.field('introduction', e.target.value)} /></label>
        <label className={label}>Nội dung <small className='normal-case font-normal text-slate-400'>· ## tiêu đề · - gạch đầu dòng</small><textarea rows={18} className={input + ' font-mono leading-7'} value={props.body} onChange={(e) => props.setBody(e.target.value)} placeholder={'## Tiêu đề phần\nNội dung đoạn văn\n- Ý chính'} /></label>
        <label className={label}>FAQ <small className='normal-case font-normal text-slate-400'>· Câu hỏi | Câu trả lời</small><textarea rows={4} className={input} value={props.faq} onChange={(e) => props.setFaq(e.target.value)} /></label>
        <label className={label}>Nguồn <small className='normal-case font-normal text-slate-400'>· Tên nguồn | URL</small><textarea rows={4} className={input} value={props.sources} onChange={(e) => props.setSources(e.target.value)} /></label>
      </section>
      <aside className='space-y-5'>
        <Box title='Xuất bản'><label className={label}>Trạng thái<select className={input} value={d.status} onChange={(e) => props.field('status', e.target.value as ManagedArticle['status'])}><option value='draft'>Bản nháp</option><option value='published'>Xuất bản</option></select></label><div className='mt-4 grid grid-cols-2 gap-3'><label className={label}>Ngày đăng<input type='date' className={input} value={d.publishedAt} onChange={(e) => props.field('publishedAt', e.target.value)} /></label><label className={label}>Thời gian đọc<input className={input} value={d.readingTime} onChange={(e) => props.field('readingTime', e.target.value)} /></label></div><label className={label + ' mt-4'}>Tác giả<input className={input} value={d.author} onChange={(e) => props.field('author', e.target.value)} /></label></Box>
        <Box title='Ảnh đại diện'><label className={label}>URL ảnh<input className={input} value={d.image} onChange={(e) => props.field('image', e.target.value)} /></label><label className='mt-3 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-brand-blue/30 bg-blue-50 p-3 text-sm font-semibold text-brand-blue'>{uploading ? 'Đang tải ảnh...' : 'Tải ảnh từ máy'}<input type='file' accept='image/*' className='hidden' disabled={uploading} onChange={(event) => void upload(event)} /></label>{d.image && <img src={d.image} alt='' className='mt-3 aspect-video rounded-xl object-cover' />}<label className={label + ' mt-4'}>Mô tả ảnh<input className={input} value={d.imageAlt} onChange={(e) => props.field('imageAlt', e.target.value)} /></label></Box>
        <Box title='SEO'><label className={label}>SEO title<input className={input} value={d.seoTitle} onChange={(e) => props.field('seoTitle', e.target.value)} /></label><label className={label + ' mt-4'}>Meta description<textarea rows={3} className={input} value={d.metaDescription} onChange={(e) => props.field('metaDescription', e.target.value)} /></label><label className={label + ' mt-4'}>Từ khóa<input className={input} value={d.keywords.join(', ')} onChange={(e) => props.field('keywords', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))} /></label></Box>
      </aside>
    </div></>;
}

function Box({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className='rounded-2xl border border-slate-200 bg-white p-5'><h2 className='mb-4 font-bold text-brand-black'>{title}</h2>{children}</section>;
}

function GalleryManager({ settings, refresh, notify }: { settings: SiteSettings; refresh: () => Promise<void>; notify: (value: string) => void }) {
  const [groups, setGroups] = useState<StudentGalleryGroup[]>(settings.studentGalleryGroups);
  const [uploading, setUploading] = useState('');
  const [saving, setSaving] = useState(false);
  useEffect(() => setGroups(settings.studentGalleryGroups), [settings.studentGalleryGroups]);

  const updateGroup = (id: string, update: Partial<StudentGalleryGroup>) => {
    setGroups((current) => current.map((group) => group.id === id ? { ...group, ...update } : group));
  };
  const addGroup = () => {
    setGroups((current) => [...current, { id: crypto.randomUUID(), title: 'Cụm hình ảnh học viên ' + (current.length + 1), items: [] }]);
  };
  const upload = async (groupId: string, event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(groupId);
    try {
      const uploaded = await Promise.all(files.map(async (file) => ({ id: crypto.randomUUID(), image: await uploadSiteImage(file), alt: 'Hình ảnh học viên RNE', caption: 'Nhập nội dung cho hình ảnh này' })));
      setGroups((current) => current.map((group) => group.id === groupId ? { ...group, items: [...group.items, ...uploaded] } : group));
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Không thể tải ảnh.');
    } finally {
      setUploading('');
      event.target.value = '';
    }
  };
  const save = async () => {
    setSaving(true);
    try {
      await saveSettings({ ...settings, studentGalleryGroups: groups });
      await refresh();
      notify('Đã cập nhật thư viện ảnh học viên.');
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Không thể lưu thư viện.');
    } finally {
      setSaving(false);
    }
  };

  return <><div className='flex flex-wrap items-end justify-between gap-4'><div><p className='text-xs font-semibold uppercase tracking-widest text-brand-blue'>Thư viện</p><h1 className='mt-1 text-2xl font-extrabold text-brand-black'>Hình ảnh học viên</h1><p className='mt-1 text-sm text-slate-500'>Tải nhiều ảnh và phân chia thành các cụm hiển thị trên trang chủ.</p></div><button onClick={addGroup} className='inline-flex items-center gap-2 rounded-xl border border-brand-blue px-4 py-2.5 text-sm font-semibold text-brand-blue'><Plus className='h-4 w-4' /> Thêm cụm hình ảnh</button></div>
    <div className='mt-6 space-y-6'>{groups.map((group, groupIndex) => <section key={group.id} className='rounded-2xl border border-slate-200 bg-white p-5 md:p-6'>
      <div className='flex flex-wrap items-center gap-3'><span className='flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 font-bold text-brand-blue'>{groupIndex + 1}</span><input value={group.title} onChange={(event) => updateGroup(group.id, { title: event.target.value })} className='min-w-[220px] flex-1 rounded-xl border border-slate-200 px-3 py-2 font-semibold text-brand-black outline-none focus:border-brand-blue' />{groups.length > 1 && <button onClick={() => setGroups((current) => current.filter((item) => item.id !== group.id))} className='rounded-xl border border-red-200 p-2.5 text-red-600' aria-label='Xóa cụm'><Trash2 className='h-4 w-4' /></button>}</div>
      <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>{group.items.map((item) => <div key={item.id} className='group relative overflow-hidden rounded-xl border border-slate-200 bg-white'><div className='relative'><img src={item.image} alt={item.alt} className='aspect-[4/3] h-full w-full object-cover' /><button onClick={() => updateGroup(group.id, { items: group.items.filter((image) => image.id !== item.id) })} className='absolute right-2 top-2 rounded-lg bg-white/90 p-2 text-red-600 opacity-100 shadow-sm md:opacity-0 md:group-hover:opacity-100' aria-label='Xóa ảnh'><Trash2 className='h-4 w-4' /></button></div><textarea rows={3} value={item.caption || ''} onChange={(event) => updateGroup(group.id, { items: group.items.map((image) => image.id === item.id ? { ...image, caption: event.target.value } : image) })} placeholder='Nội dung dưới ảnh' className='w-full resize-none border-0 border-t border-slate-200 p-3 text-sm leading-relaxed outline-none focus:bg-blue-50' /></div>)}
        <label className='flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-brand-blue/30 bg-blue-50 p-4 text-center text-sm font-semibold text-brand-blue hover:border-brand-blue'><ImageIcon className='mb-2 h-7 w-7' />{uploading === group.id ? 'Đang tải ảnh...' : 'Tải ảnh từ máy'}<span className='mt-1 text-xs font-normal text-slate-500'>Có thể chọn nhiều ảnh</span><input type='file' accept='image/*' multiple disabled={Boolean(uploading)} onChange={(event) => void upload(group.id, event)} className='hidden' /></label>
      </div>
    </section>)}</div>
    <div className='sticky bottom-4 mt-6 flex justify-end'><button disabled={saving || Boolean(uploading)} onClick={() => void save()} className='inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-3 font-semibold text-white shadow-lg disabled:opacity-50'><Save className='h-4 w-4' /> {saving ? 'Đang lưu...' : 'Lưu thư viện ảnh'}</button></div></>;
}
