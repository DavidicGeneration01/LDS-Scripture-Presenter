import { AIInsight } from '../types';

export const getVerseInsights = async (reference: string, text: string): Promise<AIInsight> => {
  const API_KEY = (import.meta as any).env?.VITE_API_KEY || (window as any).process?.env?.API_KEY || '';
  if (!API_KEY || !navigator.onLine) {
    return {
      context: 'Offline Mode.',
      theology: 'AI Insights unavailable.',
      application: 'Please check internet/API Key.'
    };
  }

  // Placeholder implementation: in a production app this would call the AI provider.
  // For now, return a lightweight synthesized insight to avoid blocking the UI.
  try {
    const short = (s: string) => s.length > 120 ? s.slice(0, 117) + '...' : s;
    return {
      context: `Context for ${reference}: ${short(text)}`,
      theology: `Theological note: ${short(text)}`,
      application: `Application: ${short(text)}`
    };
  } catch (e) {
    return { context: 'Could not load context.', theology: 'Could not load theology.', application: 'Could not load application.' };
  }
};

export default { getVerseInsights };
