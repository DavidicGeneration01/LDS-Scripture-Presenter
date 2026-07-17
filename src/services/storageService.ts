import { VerseData, HistoryItem, PresentationSettings } from '../types';

const safeGet = <T,>(key: string, fallback: T): T => {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) as T : fallback; } catch { return fallback; }
};

const safeSet = (key: string, value: any) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn('storage set failed', e); }
};

export const loadHistory = (): HistoryItem[] => safeGet<HistoryItem[]>('lumina_history', []);
export const saveHistory = (items: HistoryItem[]) => safeSet('lumina_history', items);

export const loadSettings = (): PresentationSettings | null => safeGet<PresentationSettings | null>('lumina_settings', null);
export const saveSettings = (s: PresentationSettings) => safeSet('lumina_settings', s);

export const loadFavorites = (): VerseData[] => safeGet<VerseData[]>('lumina_favorites', []);
export const saveFavorites = (items: VerseData[]) => safeSet('lumina_favorites', items);

export const loadCollections = (): { id: string; name: string; items: VerseData[] }[] => safeGet('lumina_collections', []);
export const saveCollections = (cols: any[]) => safeSet('lumina_collections', cols);

export const loadPinned = (): VerseData | null => safeGet<VerseData | null>('lumina_pinned', null);
export const savePinned = (v: VerseData | null) => safeSet('lumina_pinned', v);

export default { loadHistory, saveHistory, loadSettings, saveSettings, loadFavorites, saveFavorites, loadCollections, saveCollections, loadPinned, savePinned };
