/**
 * Premium Theme System & Design Tokens
 * Luxury dark mode first with refined blue accents
 */

export const THEME_TOKENS = {
  colors: {
    // Primary backgrounds
    bg: {
      primary: '#0f0f0f',      // Deep charcoal
      secondary: '#1a1a2e',    // Slate
      tertiary: '#252541',     // Elevated surface
      hover: '#2d2d4a',        // Hover state
      active: '#3a3a5c',       // Active state
    },
    
    // Accent colors
    accent: {
      primary: '#0066cc',      // Refined blue
      dark: '#0052a3',         // Darker blue
      light: '#3399ff',        // Lighter blue
      bright: '#00d4ff',       // Bright accent
    },
    
    // Text colors
    text: {
      primary: '#f5f5f5',      // Off-white
      secondary: 'rgba(255, 255, 255, 0.6)',
      tertiary: 'rgba(255, 255, 255, 0.4)',
      disabled: 'rgba(255, 255, 255, 0.2)',
    },
    
    // Borders & dividers
    border: {
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(255, 255, 255, 0.05)',
      accent: 'rgba(0, 102, 204, 0.3)',
    },
    
    // Status colors
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#0066cc',
    },
    
    // Semantic colors
    semantic: {
      blue: { 50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af', 900: '#1e3a8a', 950: '#172554' },
      slate: { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#64748b', 600: '#475569', 700: '#334155', 800: '#1e293b', 900: '#0f172a', 950: '#020617' },
    },
  },
  
  typography: {
    fontFamily: {
      display: "'Cinzel', serif",      // Display/headlines
      serif: "'Playfair Display', serif",  // Elegant body
      sans: "'Inter', sans-serif",     // Modern sans
    },
    
    scale: {
      // Display sizes
      display1: { size: '48px', weight: 600, lineHeight: 1.2, letterSpacing: '0.02em' },
      display2: { size: '32px', weight: 600, lineHeight: 1.3, letterSpacing: '0.01em' },
      
      // Heading sizes
      heading1: { size: '24px', weight: 600, lineHeight: 1.3, letterSpacing: '0em' },
      heading2: { size: '20px', weight: 600, lineHeight: 1.4, letterSpacing: '0em' },
      heading3: { size: '18px', weight: 500, lineHeight: 1.4, letterSpacing: '0em' },
      
      // Body sizes
      body: { size: '16px', weight: 400, lineHeight: 1.6, letterSpacing: '0em' },
      bodySmall: { size: '14px', weight: 400, lineHeight: 1.5, letterSpacing: '0em' },
      
      // Small text
      small: { size: '13px', weight: 500, lineHeight: 1.4, letterSpacing: '0.01em' },
      micro: { size: '12px', weight: 500, lineHeight: 1.3, letterSpacing: '0.02em' },
    },
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
    '4xl': '64px',
  },
  
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.3)',
    '2xl': '0 25px 50px rgba(0, 0, 0, 0.4)',
    glow: '0 0 20px rgba(0, 102, 204, 0.2)',
  },
  
  transitions: {
    fast: '100ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
};

export type ThemeTokens = typeof THEME_TOKENS;
export default THEME_TOKENS;
