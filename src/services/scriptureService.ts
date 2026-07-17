import { VerseData } from '../types';

// --- Abbreviation Mapping (partial, extended as needed) ---
const BOOK_MAP: Record<string, string> = {
  'gn': 'genesis', 'gen': 'genesis', 'genesis': 'genesis',
  'ex': 'exodus', 'exodus': 'exodus',
  'matt': 'matthew', 'mt': 'matthew', 'matthew': 'matthew',
  'john': 'john', 'jn': 'john', 'jhn': 'john',
  '1ne': '1 nephi', '1nephi': '1 nephi', '1 nephi': '1 nephi',
  '2ne': '2 nephi', 'alma': 'alma', 'mosiah': 'mosiah',
  'dc': 'doctrine and covenants', 'd&c': 'doctrine and covenants',
  'moses': 'moses', 'abraham': 'abraham',
  'joseph smith-matthew': 'joseph smith-matthew', 'joseph smith-history': 'joseph smith-history'
};

// --- In-Memory Cache for LDS JSON databases ---
let bomCache: any = null;
let dcCache: any = null;
let pgpCache: any = null;

// --- Local Offline Library ---
const OFFLINE_LIBRARY: Record<string, VerseData> = {
  "1_nephi_3_1": { reference: "1 Nephi 3:1", text: "And it came to pass that I, Nephi, returned from speaking with the Lord, to the tent of my father.", book: "1 Nephi", chapter: 3, verse: 1, version: "Book of Mormon" },
  "1_nephi_3_7": { reference: "1 Nephi 3:7", text: "And it came to pass that I, Nephi, said unto my father: I will go and do the things which the Lord hath commanded...", book: "1 Nephi", chapter: 3, verse: 7, version: "Book of Mormon" },
  "john_5_39": { reference: "John 5:39", text: "Search the scriptures; for in them ye think ye have eternal life: and they are they which testify of me.", book: "John", chapter: 5, verse: 39, version: "KJV" }
};

const parseQuery = (query: string) => {
  const clean = query.trim().toLowerCase().replace(/[—–]/g, '-').replace(/\s*-\s*/g, '-').replace(/&/g, 'and');
  const regex = /^(\d*)?\s*([a-z&\s-]+?)\s*(\d+)[:.\s]*(\d+)$/;
  const match = clean.match(regex);
  if (!match) return null;
  const leadingNum = match[1] || '';
  const bookText = match[2];
  const chapter = parseInt(match[3]);
  const verse = parseInt(match[4]);
  const rawBook = (leadingNum + bookText).trim().replace(/\s+/g, ' ');
  const normalizedBook = BOOK_MAP[rawBook] || rawBook;
  return { book: normalizedBook, chapter, verse };
};

const parseQueryToKey = (query: string): string | null => {
  const parsed = parseQuery(query);
  if(!parsed) return null;
  return `${parsed.book.replace(/ /g, '_')}_${parsed.chapter}_${parsed.verse}`;
};

const fetchFromBibleApi = async (book: string, chapter: number, verse: number): Promise<VerseData> => {
  const query = `${book} ${chapter}:${verse}`;
  const res = await fetch(`https://bible-api.com/${encodeURIComponent(query)}?translation=kjv`);
  if (!res.ok) throw new Error('Not in Bible API');
  const data = await res.json();
  const v = data.verses && data.verses[0];
  return {
    reference: data.reference || `${book} ${chapter}:${verse}`,
    text: (v?.text || '').trim().replace(/\n/g, ' '),
    book: v?.book_name || book,
    chapter,
    verse,
    version: 'KJV'
  };
};

const normalizeTitle = (t: string) => t.toLowerCase().replace(/[—–]/g, '-').replace(/\s*-\s*/g, '-').replace(/&/g, 'and').trim();

const fetchLdsScripture = async (book: string, chapter: number, verse: number): Promise<VerseData> => {
  let cache: any = null;
  let url = '';
  let volume = '';

  if (book.includes('nephi') || book.includes('mosiah') || book.includes('alma') || book.includes('helaman') || book.includes('ether') || book.includes('moroni')) {
    volume = 'Book of Mormon';
    url = 'https://raw.githubusercontent.com/bcbooks/scriptures-json/master/book-of-mormon.json';
    cache = bomCache;
  } else if (book.includes('doctrine') || book.includes('doctrine and covenants') || book.includes('d&c')) {
    volume = 'D&C';
    url = 'https://raw.githubusercontent.com/bcbooks/scriptures-json/master/doctrine-and-covenants.json';
    cache = dcCache;
  } else if (book.includes('moses') || book.includes('abraham') || book.includes('joseph smith')) {
    volume = 'Pearl of Great Price';
    url = 'https://raw.githubusercontent.com/bcbooks/scriptures-json/master/pearl-of-great-price.json';
    cache = pgpCache;
  } else {
    throw new Error('Unknown book volume');
  }

  if (!cache) {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Failed to download ${volume}`);
    cache = await resp.json();
    if (volume === 'Book of Mormon') bomCache = cache;
    if (volume === 'D&C') dcCache = cache;
    if (volume === 'Pearl of Great Price') pgpCache = cache;
  }

  let chapters: any[] | undefined;
  let bookTitle = book;

  if (cache.books && Array.isArray(cache.books)) {
    const bookData = cache.books.find((b: any) => {
      const dbBook = normalizeTitle(b.book);
      const searchBook = normalizeTitle(book);
      return dbBook === searchBook || dbBook.includes(searchBook) || searchBook.includes(dbBook);
    });
    if (bookData) { chapters = bookData.chapters; bookTitle = bookData.book; }
    else if (volume === 'D&C' && cache.books.length > 0) { chapters = cache.books[0].chapters; bookTitle = cache.books[0].book; }
  }

  if (!chapters && cache.sections && Array.isArray(cache.sections)) { chapters = cache.sections; bookTitle = 'Doctrine and Covenants'; }
  if (!chapters && cache.chapters && Array.isArray(cache.chapters)) { chapters = cache.chapters; if (volume === 'D&C') bookTitle = 'Doctrine and Covenants'; }
  if (!chapters) throw new Error(`Data structure mismatch: Could not locate chapters for ${book}.`);

  const chapterData = chapters.find((c: any) => (c.chapter || c.section) == chapter);
  if (!chapterData) throw new Error(`${volume === 'D&C' ? 'Section' : 'Chapter'} ${chapter} not found.`);
  if (!chapterData.verses || !Array.isArray(chapterData.verses)) throw new Error('Verses missing in chapter.');
  const verseData = chapterData.verses.find((v: any) => v.verse == verse);
  if (!verseData) throw new Error(`Verse ${verse} not found.`);

  return {
    reference: `${bookTitle} ${chapter}:${verse}`,
    text: verseData.text,
    book: bookTitle,
    chapter,
    verse,
    version: volume
  };
};

const searchVerseAI = async (query: string): Promise<VerseData> => {
  // Placeholder: in production this would call AI if API key present.
  // For now, throw so callers fall back to public sources.
  throw new Error('AI search not configured');
};

export const findScripture = async (query: string): Promise<VerseData> => {
  const parsed = parseQuery(query);
  if (!parsed) throw new Error("Invalid format. Try '1 Nephi 3:7'");
  const offlineKey = `${parsed.book.replace(/ /g, '_')}_${parsed.chapter}_${parsed.verse}`;
  if (OFFLINE_LIBRARY[offlineKey]) return OFFLINE_LIBRARY[offlineKey];

  const API_KEY = (import.meta as any).env?.VITE_API_KEY || (window as any).process?.env?.API_KEY || '';
  if (API_KEY && API_KEY.length > 5) {
    try { return await searchVerseAI(query); } catch (e) { console.warn('AI search failed, falling back'); }
  }

  if (navigator.onLine) {
    try {
      const bibleBooks = ['matthew','mark','luke','john','acts','romans','corinthians','galatians','ephesians','philippians','colossians','thessalonians','timothy','titus','philemon','hebrews','james','peter','jude','revelation','genesis','exodus','leviticus','numbers','deuteronomy','joshua','judges','ruth','samuel','kings','chronicles','ezra','nehemiah','esther','job','psalms','proverbs','ecclesiastes','solomon','isaiah','jeremiah','lamentations','ezekiel','daniel','hosea','joel','amos','obadiah','jonah','micah','nahum','habakkuk','zephaniah','haggai','zechariah','malachi'];
      if (bibleBooks.some(b => parsed.book.includes(b)) && !parsed.book.includes('joseph smith')) {
        return await fetchFromBibleApi(parsed.book, parsed.chapter, parsed.verse);
      }
      return await fetchLdsScripture(parsed.book, parsed.chapter, parsed.verse);
    } catch (err: any) { throw new Error(err.message || 'Verse not found in any database.'); }
  }

  throw new Error('Offline: Verse not in local library.');
};

export default { findScripture };
