import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { Check, Image as ImageIcon, LogOut, MousePointer2, RotateCcw, Save, Type, X } from 'lucide-react';
import { useContent } from '@/contexts/ContentContext';
import { saveSettings, uploadSiteImage, type CmsOverride } from '@/lib/content';
import { supabase } from '@/lib/supabase';

const PAGE_OPTIONS = [
  ['/', 'Trang chủ'],
  ['/dich-vu', 'Dịch vụ'],
  ['/truong-thai-lan', 'Trường tại Thái Lan'],
  ['/insights', 'Insights'],
  ['/ve-rne', 'Về RNE'],
  ['/lien-he', 'Liên hệ'],
  ['/chinh-sach-bao-mat', 'Chính sách bảo mật'],
  ['/dieu-khoan-dich-vu', 'Điều khoản dịch vụ'],
  ['/chinh-sach-hoan-phi', 'Chính sách hoàn phí'],
  ['/tuyen-bo-mien-tru-trach-nhiem', 'Miễn trừ trách nhiệm'],
] as const;

interface Selection {
  key: string;
  type: 'text' | 'image';
  value: string;
}

function routeKey() {
  return window.location.hash.replace(/^#/, '') || '/';
}

function elementPath(element: Element, root: Element) {
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current !== root) {
    const tag = current.tagName.toLowerCase();
    const parent: Element | null = current.parentElement;
    if (!parent) break;
    const siblings = Array.from(parent.children).filter((item) => item.tagName === current?.tagName);
    parts.unshift(tag + ':nth-of-type(' + (siblings.indexOf(current) + 1) + ')');
    current = parent;
  }
  return parts.join('>');
}

function ignored(element: Element | null) {
  return !element || Boolean(element.closest('[data-cms-ignore]')) || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(element.tagName);
}

function textKey(node: Text, root: Element) {
  const parent = node.parentElement;
  if (!parent) return '';
  const index = Array.from(parent.childNodes).indexOf(node);
  return routeKey() + '|text|' + elementPath(parent, root) + '|' + index;
}

function imageKey(image: HTMLImageElement, root: Element) {
  return routeKey() + '|image|' + elementPath(image, root);
}

function allTextNodes(root: Element) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let node = walker.nextNode();
  while (node) {
    const text = node as Text;
    if (text.nodeValue?.trim() && !ignored(text.parentElement)) nodes.push(text);
    node = walker.nextNode();
  }
  return nodes;
}

function applyOverrides(root: Element, overrides: Record<string, CmsOverride>) {
  allTextNodes(root).forEach((node) => {
    const override = overrides[textKey(node, root)];
    if (override?.type === 'text' && node.nodeValue !== override.value) node.nodeValue = override.value;
  });
  root.querySelectorAll<HTMLImageElement>('img').forEach((image) => {
    if (ignored(image)) return;
    const override = overrides[imageKey(image, root)];
    if (override?.type === 'image' && image.src !== override.value) image.src = override.value;
  });
}

function useOverrideRenderer() {
  const { settings } = useContent();
  useEffect(() => {
    const root = document.querySelector('[data-cms-root]');
    if (!root) return;
    let queued = false;
    const render = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        applyOverrides(root, settings.overrides || {});
        queued = false;
      });
    };
    render();
    const observer = new MutationObserver(render);
    observer.observe(root, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [settings.overrides]);
}

export function ContentOverrides() {
  useOverrideRenderer();
  return null;
}

function findText(target: Element, root: Element) {
  const nodes = allTextNodes(target);
  return nodes.find((node) => node.parentElement && root.contains(node.parentElement)) || null;
}

export default function VisualEditor() {
  const content = useContent();
  const [authorized, setAuthorized] = useState(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [draft, setDraft] = useState('');
  const [notice, setNotice] = useState('Click vào chữ hoặc ảnh cần chỉnh.');
  const [saving, setSaving] = useState(false);
  const hoverRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!supabase) {
      window.location.href = window.location.pathname + '#/admin';
      return;
    }
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) setAuthorized(true);
      else window.location.href = window.location.pathname + '#/admin';
    });
  }, []);

  useEffect(() => {
    if (!authorized) return;
    const root = document.querySelector<HTMLElement>('[data-cms-root]');
    if (!root) return;
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ignored(target)) return;
      if (hoverRef.current && hoverRef.current !== target) hoverRef.current.removeAttribute('data-cms-hover');
      target.setAttribute('data-cms-hover', 'true');
      hoverRef.current = target;
    };
    const out = () => {
      hoverRef.current?.removeAttribute('data-cms-hover');
      hoverRef.current = null;
    };
    const click = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (ignored(target)) return;
      const image = target.closest('img') as HTMLImageElement | null;
      if (image && root.contains(image)) {
        event.preventDefault();
        event.stopPropagation();
        const next = { key: imageKey(image, root), type: 'image' as const, value: image.currentSrc || image.src };
        setSelection(next);
        setDraft(next.value);
        return;
      }
      const node = findText(target, root);
      if (!node) return;
      event.preventDefault();
      event.stopPropagation();
      const next = { key: textKey(node, root), type: 'text' as const, value: node.nodeValue || '' };
      setSelection(next);
      setDraft(next.value);
    };
    root.addEventListener('mouseover', over, true);
    root.addEventListener('mouseout', out, true);
    root.addEventListener('click', click, true);
    return () => {
      root.removeEventListener('mouseover', over, true);
      root.removeEventListener('mouseout', out, true);
      root.removeEventListener('click', click, true);
      out();
    };
  }, [authorized]);

  const persist = async (override?: CmsOverride) => {
    if (!selection) return;
    setSaving(true);
    try {
      const overrides = { ...(content.settings.overrides || {}) };
      if (override) overrides[selection.key] = override;
      else delete overrides[selection.key];
      await saveSettings({ ...content.settings, overrides });
      await content.refresh();
      setSelection(null);
      setNotice(override ? 'Đã lưu thay đổi.' : 'Đã khôi phục nội dung gốc.');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Không thể lưu thay đổi.');
    } finally {
      setSaving(false);
    }
  };

  const chooseImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selection) return;
    setSaving(true);
    setNotice('Đang tải ảnh lên...');
    try {
      const url = await uploadSiteImage(file);
      setDraft(url);
      await persist({ type: 'image', value: url });
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Không thể tải ảnh.');
      setSaving(false);
    }
  };

  if (!authorized) return null;
  return <>
    <div data-cms-ignore className='fixed inset-x-0 top-0 z-[100] border-b border-slate-700 bg-slate-950 px-3 py-2 text-white shadow-2xl'>
      <div className='mx-auto flex max-w-[1500px] flex-wrap items-center gap-2'>
        <span className='inline-flex items-center gap-2 rounded-lg bg-brand-blue px-3 py-2 text-sm font-bold'><MousePointer2 className='h-4 w-4' /> Chỉnh trực tiếp</span>
        <select value={routeKey()} onChange={(event) => { window.location.hash = event.target.value; setSelection(null); }} className='rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white'>
          {PAGE_OPTIONS.map(([path, name]) => <option key={path} value={path} className='text-slate-900'>{name}</option>)}
        </select>
        <span className='min-w-0 flex-1 truncate text-xs text-slate-300'>{notice}</span>
        <a href={window.location.pathname + '#/admin'} className='rounded-lg border border-white/20 px-3 py-2 text-sm hover:bg-white/10'>Về Admin</a>
        <button onClick={() => { window.location.href = window.location.pathname + '#/'; }} className='inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-slate-900'><LogOut className='h-4 w-4' /> Thoát</button>
      </div>
    </div>
    <div data-cms-ignore className='h-14' />

    {selection && <div data-cms-ignore className='fixed inset-0 z-[110] flex items-end justify-center bg-slate-950/35 p-3 backdrop-blur-[1px] sm:items-center'>
      <div className='w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl'>
        <div className='flex items-center justify-between gap-3'>
          <h2 className='flex items-center gap-2 font-bold text-brand-black'>{selection.type === 'text' ? <Type className='h-5 w-5 text-brand-blue' /> : <ImageIcon className='h-5 w-5 text-brand-blue' />}{selection.type === 'text' ? 'Chỉnh nội dung' : 'Thay hình ảnh'}</h2>
          <button onClick={() => setSelection(null)} className='rounded-lg p-2 text-slate-400 hover:bg-slate-100'><X className='h-5 w-5' /></button>
        </div>
        {selection.type === 'text' ? <textarea autoFocus rows={7} value={draft} onChange={(event) => setDraft(event.target.value)} className='mt-4 w-full rounded-xl border border-slate-200 p-3 text-sm leading-relaxed outline-none focus:border-brand-blue' /> : <div className='mt-4'><img src={draft} alt='Ảnh đang chọn' className='max-h-64 w-full rounded-xl bg-slate-100 object-contain' /><label className='mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand-blue/30 bg-blue-50 p-4 text-sm font-semibold text-brand-blue hover:border-brand-blue'><ImageIcon className='h-5 w-5' /> Chọn ảnh từ máy<input type='file' accept='image/*' onChange={(event) => void chooseImage(event)} className='hidden' /></label><p className='mt-2 text-xs text-slate-500'>JPEG, PNG, WebP, GIF hoặc SVG · tối đa 8 MB</p></div>}
        <div className='mt-5 flex flex-wrap justify-between gap-2'>
          <button disabled={saving} onClick={() => void persist()} className='inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600'><RotateCcw className='h-4 w-4' /> Khôi phục gốc</button>
          {selection.type === 'text' && <button disabled={saving || !draft.trim()} onClick={() => void persist({ type: 'text', value: draft })} className='inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50'>{saving ? <Save className='h-4 w-4 animate-pulse' /> : <Check className='h-4 w-4' />} Lưu thay đổi</button>}
        </div>
      </div>
    </div>}
  </>;
}

// The renderer and editor intentionally share the same DOM key helpers.
// eslint-disable-next-line react-refresh/only-export-components
export { applyOverrides };
