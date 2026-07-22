import React, { createContext, useState, useCallback, ReactNode } from 'react';
import THEME_TOKENS, { ThemeTokens } from '../constants/theme';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  mode: ThemeMode;
  tokens: ThemeTokens;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialMode = 'dark' }) => {
  const [mode, setMode] = useState<ThemeMode>(initialMode);

  const toggleTheme = useCallback(() => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const setTheme = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
  }, []);

  const value: ThemeContextType = {
    mode,
    tokens: THEME_TOKENS,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
