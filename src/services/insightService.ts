import { VerseInsight } from '../types';

export const getVerseInsights = async (reference: string, text: string): Promise<VerseInsight> => {
  const apiKey = (import.meta as any).env?.VITE_API_KEY || (window as any).process?.env?.API_KEY || '';
  if (!apiKey || !navigator.onLine) {
    return {
      context: 'Insights are unavailable while offline.',
      theology: '',
      application: 'Connect to the internet and add an API key to enable this panel.'
    };
  }

  try {
    const short = (s: string) => s.length > 120 ? s.slice(0, 117) + '...' : s;
    return {
      context: `Context for ${reference}: ${short(text)}`,
      theology: `Theological note: ${short(text)}`,
      application: `Application: ${short(text)}`
    };
  } catch (e) {
    return {
      context: 'Could not load context.',
      theology: '',
      application: 'Try again after checking the connection.'
    };
  }
};

export default { getVerseInsights };
