import { VerseData } from '../types';

type ScriptureVolume = 'Old Testament' | 'New Testament' | 'Book of Mormon' | 'Doctrine and Covenants' | 'Pearl of Great Price';

const normalizeAlias = (value: string) =>
  value
    .toLowerCase()
    .replace(/[—–]/g, '-')
    .replace(/&/g, 'and')
    .replace(/\./g, '')
    .replace(/\s*-\s*/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

const compactAlias = (value: string) => normalizeAlias(value).replace(/\s+/g, '');

const VOLUME_ALIASES: Record<string, ScriptureVolume> = {
  ot: 'Old Testament',
  old: 'Old Testament',
  oldtestament: 'Old Testament',
  nt: 'New Testament',
  new: 'New Testament',
  newtestament: 'New Testament',
  bom: 'Book of Mormon',
  bookofmormon: 'Book of Mormon',
  pgp: 'Pearl of Great Price',
  pearl: 'Pearl of Great Price',
  pearlofgreatprice: 'Pearl of Great Price'
};

const BOOK_ENTRIES: Array<{ book: string; volume: ScriptureVolume; aliases: string[] }> = [
  { book: 'genesis', volume: 'Old Testament', aliases: ['gen', 'gn', 'genesis'] },
  { book: 'exodus', volume: 'Old Testament', aliases: ['exo', 'ex', 'exodus'] },
  { book: 'leviticus', volume: 'Old Testament', aliases: ['lev', 'leviticus'] },
  { book: 'numbers', volume: 'Old Testament', aliases: ['num', 'numbers'] },
  { book: 'deuteronomy', volume: 'Old Testament', aliases: ['deu', 'deut', 'deuteronomy'] },
  { book: 'joshua', volume: 'Old Testament', aliases: ['jos', 'josh', 'joshua'] },
  { book: 'judges', volume: 'Old Testament', aliases: ['jdg', 'judg', 'judges'] },
  { book: 'ruth', volume: 'Old Testament', aliases: ['rut', 'ruth'] },
  { book: '1 samuel', volume: 'Old Testament', aliases: ['1sa', '1 sam', '1samuel', '1 samuel', 'first samuel'] },
  { book: '2 samuel', volume: 'Old Testament', aliases: ['2sa', '2 sam', '2samuel', '2 samuel', 'second samuel'] },
  { book: '1 kings', volume: 'Old Testament', aliases: ['1ki', '1 kgs', '1kings', '1 kings', 'first kings'] },
  { book: '2 kings', volume: 'Old Testament', aliases: ['2ki', '2 kgs', '2kings', '2 kings', 'second kings'] },
  { book: '1 chronicles', volume: 'Old Testament', aliases: ['1ch', '1 chr', '1chronicles', '1 chronicles', 'first chronicles'] },
  { book: '2 chronicles', volume: 'Old Testament', aliases: ['2ch', '2 chr', '2chronicles', '2 chronicles', 'second chronicles'] },
  { book: 'ezra', volume: 'Old Testament', aliases: ['ezr', 'ezra'] },
  { book: 'nehemiah', volume: 'Old Testament', aliases: ['neh', 'nehemiah'] },
  { book: 'esther', volume: 'Old Testament', aliases: ['est', 'esther'] },
  { book: 'job', volume: 'Old Testament', aliases: ['job'] },
  { book: 'psalms', volume: 'Old Testament', aliases: ['psa', 'ps', 'psalm', 'psalms'] },
  { book: 'proverbs', volume: 'Old Testament', aliases: ['pro', 'prov', 'proverbs'] },
  { book: 'ecclesiastes', volume: 'Old Testament', aliases: ['ecc', 'eccl', 'ecclesiastes'] },
  { book: 'song of solomon', volume: 'Old Testament', aliases: ['sng', 'song', 'song of solomon', 'solomon'] },
  { book: 'isaiah', volume: 'Old Testament', aliases: ['isa', 'isaiah'] },
  { book: 'jeremiah', volume: 'Old Testament', aliases: ['jer', 'jeremiah'] },
  { book: 'lamentations', volume: 'Old Testament', aliases: ['lam', 'lamentations'] },
  { book: 'ezekiel', volume: 'Old Testament', aliases: ['ezk', 'ezek', 'ezekiel'] },
  { book: 'daniel', volume: 'Old Testament', aliases: ['dan', 'daniel'] },
  { book: 'hosea', volume: 'Old Testament', aliases: ['hos', 'hosea'] },
  { book: 'joel', volume: 'Old Testament', aliases: ['jol', 'joel'] },
  { book: 'amos', volume: 'Old Testament', aliases: ['amo', 'amos'] },
  { book: 'obadiah', volume: 'Old Testament', aliases: ['oba', 'obadiah'] },
  { book: 'jonah', volume: 'Old Testament', aliases: ['jon', 'jonah'] },
  { book: 'micah', volume: 'Old Testament', aliases: ['mic', 'micah'] },
  { book: 'nahum', volume: 'Old Testament', aliases: ['nam', 'nah', 'nahum'] },
  { book: 'habakkuk', volume: 'Old Testament', aliases: ['hab', 'habakkuk'] },
  { book: 'zephaniah', volume: 'Old Testament', aliases: ['zep', 'zeph', 'zephaniah'] },
  { book: 'haggai', volume: 'Old Testament', aliases: ['hag', 'haggai'] },
  { book: 'zechariah', volume: 'Old Testament', aliases: ['zec', 'zech', 'zechariah'] },
  { book: 'malachi', volume: 'Old Testament', aliases: ['mal', 'malachi'] },
  { book: 'matthew', volume: 'New Testament', aliases: ['mat', 'matt', 'mt', 'matthew'] },
  { book: 'mark', volume: 'New Testament', aliases: ['mrk', 'mk', 'mark'] },
  { book: 'luke', volume: 'New Testament', aliases: ['luk', 'lk', 'luke'] },
  { book: 'john', volume: 'New Testament', aliases: ['jhn', 'jn', 'john'] },
  { book: 'acts', volume: 'New Testament', aliases: ['act', 'acts'] },
  { book: 'romans', volume: 'New Testament', aliases: ['rom', 'romans'] },
  { book: '1 corinthians', volume: 'New Testament', aliases: ['1co', '1 cor', '1corinthians', '1 corinthians', 'first corinthians'] },
  { book: '2 corinthians', volume: 'New Testament', aliases: ['2co', '2 cor', '2corinthians', '2 corinthians', 'second corinthians'] },
  { book: 'galatians', volume: 'New Testament', aliases: ['gal', 'galatians'] },
  { book: 'ephesians', volume: 'New Testament', aliases: ['eph', 'ephesians'] },
  { book: 'philippians', volume: 'New Testament', aliases: ['php', 'phil', 'philippians'] },
  { book: 'colossians', volume: 'New Testament', aliases: ['col', 'colossians'] },
  { book: '1 thessalonians', volume: 'New Testament', aliases: ['1th', '1 thes', '1thessalonians', '1 thessalonians', 'first thessalonians'] },
  { book: '2 thessalonians', volume: 'New Testament', aliases: ['2th', '2 thes', '2thessalonians', '2 thessalonians', 'second thessalonians'] },
  { book: '1 timothy', volume: 'New Testament', aliases: ['1ti', '1 tim', '1timothy', '1 timothy', 'first timothy'] },
  { book: '2 timothy', volume: 'New Testament', aliases: ['2ti', '2 tim', '2timothy', '2 timothy', 'second timothy'] },
  { book: 'titus', volume: 'New Testament', aliases: ['tit', 'titus'] },
  { book: 'philemon', volume: 'New Testament', aliases: ['phm', 'philemon'] },
  { book: 'hebrews', volume: 'New Testament', aliases: ['heb', 'hebrews'] },
  { book: 'james', volume: 'New Testament', aliases: ['jas', 'james'] },
  { book: '1 peter', volume: 'New Testament', aliases: ['1pe', '1 pet', '1peter', '1 peter', 'first peter'] },
  { book: '2 peter', volume: 'New Testament', aliases: ['2pe', '2 pet', '2peter', '2 peter', 'second peter'] },
  { book: '1 john', volume: 'New Testament', aliases: ['1jn', '1 jhn', '1john', '1 john', 'first john'] },
  { book: '2 john', volume: 'New Testament', aliases: ['2jn', '2 jhn', '2john', '2 john', 'second john'] },
  { book: '3 john', volume: 'New Testament', aliases: ['3jn', '3 jhn', '3john', '3 john', 'third john'] },
  { book: 'jude', volume: 'New Testament', aliases: ['jud', 'jude'] },
  { book: 'revelation', volume: 'New Testament', aliases: ['rev', 'revelation'] },
  { book: '1 nephi', volume: 'Book of Mormon', aliases: ['1ne', '1 ne', '1nph', '1 nph', '1nephi', '1 nephi', 'first nephi'] },
  { book: '2 nephi', volume: 'Book of Mormon', aliases: ['2ne', '2 ne', '2nph', '2 nph', '2nephi', '2 nephi', 'second nephi'] },
  { book: 'jacob', volume: 'Book of Mormon', aliases: ['jac', 'jacob'] },
  { book: 'enos', volume: 'Book of Mormon', aliases: ['eno', 'enos'] },
  { book: 'jarom', volume: 'Book of Mormon', aliases: ['jar', 'jarom'] },
  { book: 'omni', volume: 'Book of Mormon', aliases: ['omn', 'omni'] },
  { book: 'words of mormon', volume: 'Book of Mormon', aliases: ['wom', 'words', 'words of mormon'] },
  { book: 'mosiah', volume: 'Book of Mormon', aliases: ['mos', 'mosiah'] },
  { book: 'alma', volume: 'Book of Mormon', aliases: ['alm', 'alma'] },
  { book: 'helaman', volume: 'Book of Mormon', aliases: ['hel', 'helaman'] },
  { book: '3 nephi', volume: 'Book of Mormon', aliases: ['3ne', '3 ne', '3nph', '3 nph', '3nephi', '3 nephi', 'third nephi'] },
  { book: '4 nephi', volume: 'Book of Mormon', aliases: ['4ne', '4 ne', '4nph', '4 nph', '4nephi', '4 nephi', 'fourth nephi'] },
  { book: 'mormon', volume: 'Book of Mormon', aliases: ['mrm', 'mormon'] },
  { book: 'ether', volume: 'Book of Mormon', aliases: ['eth', 'ether'] },
  { book: 'moroni', volume: 'Book of Mormon', aliases: ['mni', 'moro', 'moroni'] },
  { book: 'doctrine and covenants', volume: 'Doctrine and Covenants', aliases: ['dc', 'dandc', 'doctrine and covenants'] },
  { book: 'moses', volume: 'Pearl of Great Price', aliases: ['mse', 'mos', 'moses'] },
  { book: 'abraham', volume: 'Pearl of Great Price', aliases: ['abr', 'abraham'] },
  { book: 'joseph smith-matthew', volume: 'Pearl of Great Price', aliases: ['jsm', 'joseph smith-matthew', 'joseph smith matthew'] },
  { book: 'joseph smith-history', volume: 'Pearl of Great Price', aliases: ['jsh', 'joseph smith-history', 'joseph smith history'] },
  { book: 'articles of faith', volume: 'Pearl of Great Price', aliases: ['aof', 'articles of faith'] }
];

const BOOK_MAP = BOOK_ENTRIES.reduce<Record<string, Array<{ book: string; volume: ScriptureVolume }>>>((map, entry) => {
  [entry.book, ...entry.aliases].forEach(alias => {
    [normalizeAlias(alias), compactAlias(alias)].forEach(key => {
      map[key] = map[key] || [];
      if (!map[key].some(item => item.book === entry.book && item.volume === entry.volume)) {
        map[key].push({ book: entry.book, volume: entry.volume });
      }
    });
  });
  return map;
}, {});

const BIBLE_BOOKS = new Set(BOOK_ENTRIES.filter(entry => entry.volume === 'Old Testament' || entry.volume === 'New Testament').map(entry => entry.book));
const LDS_BOOKS = new Set(BOOK_ENTRIES.filter(entry => entry.volume === 'Book of Mormon' || entry.volume === 'Doctrine and Covenants' || entry.volume === 'Pearl of Great Price').map(entry => entry.book));
const getBookEntry = (book: string) => BOOK_ENTRIES.find(entry => entry.book === book);

let bomCache: any = null;
let dcCache: any = null;
let pgpCache: any = null;

const OFFLINE_LIBRARY: Record<string, VerseData> = {
  "1_nephi_3_1": { reference: "1 Nephi 3:1", text: "And it came to pass that I, Nephi, returned from speaking with the Lord, to the tent of my father.", book: "1 Nephi", chapter: 3, verse: 1, version: "Book of Mormon" },
  "1_nephi_3_7": { reference: "1 Nephi 3:7", text: "And it came to pass that I, Nephi, said unto my father: I will go and do the things which the Lord hath commanded...", book: "1 Nephi", chapter: 3, verse: 7, version: "Book of Mormon" },
  "john_5_39": { reference: "John 5:39", text: "Search the scriptures; for in them ye think ye have eternal life: and they are they which testify of me.", book: "John", chapter: 5, verse: 39, version: "KJV" }
};

const resolveVolumePrefix = (query: string) => {
  const compact = compactAlias(query);
  const prefix = Object.keys(VOLUME_ALIASES)
    .sort((a, b) => b.length - a.length)
    .find(alias => compact.startsWith(alias) && compact.length > alias.length);

  if (!prefix) return { query, volume: undefined as ScriptureVolume | undefined };

  const prefixRegex = new RegExp(`^\\s*${prefix.split('').join('\\s*')}\\s*:?\\s*`, 'i');
  return {
    query: query.replace(prefixRegex, '').trim(),
    volume: VOLUME_ALIASES[prefix]
  };
};

const resolveBook = (rawBook: string, preferredVolume?: ScriptureVolume) => {
  const normalized = normalizeAlias(rawBook);
  const compact = compactAlias(rawBook);
  const candidates = [...(BOOK_MAP[normalized] || []), ...(BOOK_MAP[compact] || [])].filter(
    (candidate, index, all) => all.findIndex(item => item.book === candidate.book && item.volume === candidate.volume) === index
  );
  const preferred = preferredVolume && candidates.find(candidate => candidate.volume === preferredVolume);
  return preferred || candidates[0] || { book: normalized, volume: undefined };
};

const parseQuery = (query: string) => {
  const prefixed = resolveVolumePrefix(query);
  const clean = normalizeAlias(prefixed.query);
  const regex = /^(\d*)?\s*([a-z\s-]+?)\s*(\d+)[:.\s]*(\d+)$/;
  const match = clean.match(regex);
  if (!match) return null;
  const leadingNum = match[1] || '';
  const bookText = match[2];
  const chapter = parseInt(match[3]);
  const verse = parseInt(match[4]);
  const rawBook = (leadingNum + bookText).trim().replace(/\s+/g, ' ');
  const resolved = resolveBook(rawBook, prefixed.volume);
  return { book: resolved.book, chapter, verse, volume: resolved.volume || prefixed.volume };
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

const normalizeTitle = normalizeAlias;

const fetchLdsScripture = async (book: string, chapter: number, verse: number): Promise<VerseData> => {
  let cache: any = null;
  let url = '';
  let volume = '';

  if (LDS_BOOKS.has(book) && getBookEntry(book)?.volume === 'Book of Mormon') {
    volume = 'Book of Mormon';
    url = 'https://raw.githubusercontent.com/bcbooks/scriptures-json/master/book-of-mormon.json';
    cache = bomCache;
  } else if (book === 'doctrine and covenants') {
    volume = 'Doctrine and Covenants';
    url = 'https://raw.githubusercontent.com/bcbooks/scriptures-json/master/doctrine-and-covenants.json';
    cache = dcCache;
  } else if (LDS_BOOKS.has(book) && getBookEntry(book)?.volume === 'Pearl of Great Price') {
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
    if (volume === 'Doctrine and Covenants') dcCache = cache;
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
    else if (volume === 'Doctrine and Covenants' && cache.books.length > 0) { chapters = cache.books[0].chapters; bookTitle = cache.books[0].book; }
  }

  if (!chapters && cache.sections && Array.isArray(cache.sections)) { chapters = cache.sections; bookTitle = 'Doctrine and Covenants'; }
  if (!chapters && cache.chapters && Array.isArray(cache.chapters)) { chapters = cache.chapters; if (volume === 'Doctrine and Covenants') bookTitle = 'Doctrine and Covenants'; }
  if (!chapters) throw new Error(`Data structure mismatch: Could not locate chapters for ${book}.`);

  const chapterData = chapters.find((c: any) => (c.chapter || c.section) == chapter);
  if (!chapterData) throw new Error(`${volume === 'Doctrine and Covenants' ? 'Section' : 'Chapter'} ${chapter} not found.`);
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

export const findScripture = async (query: string): Promise<VerseData> => {
  const parsed = parseQuery(query);
  if (!parsed) throw new Error("Invalid format. Try '1 Nephi 3:7'");
  const offlineKey = `${parsed.book.replace(/ /g, '_')}_${parsed.chapter}_${parsed.verse}`;
  if (OFFLINE_LIBRARY[offlineKey]) return OFFLINE_LIBRARY[offlineKey];

  if (navigator.onLine) {
    try {
      if (BIBLE_BOOKS.has(parsed.book)) {
        return await fetchFromBibleApi(parsed.book, parsed.chapter, parsed.verse);
      }
      return await fetchLdsScripture(parsed.book, parsed.chapter, parsed.verse);
    } catch (err: any) { throw new Error(err.message || 'Verse not found in any database.'); }
  }

  throw new Error('Offline: Verse not in local library.');
};

export default { findScripture };
