import React, { useEffect, useState, useMemo } from 'react';
import { VerseData, PresentationSettings, ThemeMode } from '../types';
import { Minimize2, Maximize2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface SlideDisplayProps {
  verse: VerseData | null;
  settings: PresentationSettings;
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  isLoading: boolean;
  loadingMessage?: string;
  isLive: boolean;
}

const SlideDisplay: React.FC<SlideDisplayProps> = ({ 
  verse, 
  settings, 
  isFullscreen, 
  toggleFullscreen, 
  isLoading, 
  loadingMessage, 
  isLive 
}) => {
  const [animateKey, setAnimateKey] = useState(0);
  
  useEffect(() => { 
    if (verse) setAnimateKey(prev => prev + 1); 
  }, [verse?.reference, verse?.text]);

  const getThemeClasses = (theme: ThemeMode) => {
    switch (theme) {
      case ThemeMode.Classic: 
        return 'bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white font-serif';
      case ThemeMode.Modern: 
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans';
      case ThemeMode.Nature: 
        return 'bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-emerald-50 font-serif';
      case ThemeMode.Light: 
        return 'bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 font-serif';
      case ThemeMode.Dark: 
      default: 
        return 'bg-gradient-to-br from-black via-slate-900 to-black text-white font-sans';
    }
  };

  const getAlignmentClass = (align: 'left' | 'center' | 'right') => {
    switch (align) { 
      case 'left': return 'text-left'; 
      case 'right': return 'text-right'; 
      default: return 'text-center'; 
    }
  };

  const fontSize = useMemo(() => {
    if (settings.fontMode === 'manual') return settings.fontSize || 4;
    if (!verse) return 4;
    const len = verse.text.length;
    const calculated = 10 - Math.log(len) * 1.1;
    return Math.min(8.5, Math.max(2.2, calculated));
  }, [verse?.text, settings.fontSize, settings.fontMode]);

  const fontSizeStyle = { 
    fontSize: `${fontSize}rem`, 
    lineHeight: '1.4',
    letterSpacing: '0.01em'
  };

  if (!verse && !isLoading) {
    return (
      <div className={cn(
        'relative flex flex-col items-center justify-center w-full h-full overflow-hidden',
        getThemeClasses(settings.theme)
      )}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white animate-pulse" />
        </div>

        <div className="relative z-10 text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-display-1 font-display tracking-wider">
              Mormon Scripture Presenter
            </h1>
            <div className="flex justify-center gap-2">
              <div className="w-16 h-1 bg-current/30 rounded-full" />
              <div className="w-24 h-1 bg-current/50 rounded-full" />
              <div className="w-16 h-1 bg-current/30 rounded-full" />
            </div>
          </div>
          <p className="text-body text-current/70 tracking-wider font-light">
            Ready to present.
          </p>
        </div>

        <div className="absolute top-8 left-8 w-32 h-32 border border-current/10 rounded-full opacity-20" />
        <div className="absolute bottom-8 right-8 w-40 h-40 border border-current/5 rounded-full opacity-10" />
      </div>
    );
  }

  return (
    <div 
      id="presentation-area" 
      className={cn(
        'relative flex flex-col items-center justify-center w-full h-full',
        'p-8 md:p-16 overflow-hidden transition-all duration-500',
        getThemeClasses(settings.theme)
      )}
    >
      <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white" />
      </div>

      <div className="absolute top-0 left-0 w-64 h-64 bg-current/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-30" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-current/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-20" />

      {isLive && (
        <button 
          onClick={toggleFullscreen}
          className={cn(
            'absolute top-6 right-6 p-3 rounded-lg glass-button',
            'transition-all duration-300 z-50 opacity-0 hover:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-white/50'
          )}
          title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        >
          {isFullscreen ? (
            <Minimize2 size={24} className="text-white/80" />
          ) : (
            <Maximize2 size={24} className="text-white/80" />
          )}
        </button>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-40 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-2 border-white/10" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white/80 animate-spin" />
            </div>
            <span className="text-heading-2 font-display tracking-widest text-white/80 animate-pulse">
              {loadingMessage || 'SEARCHING'}
            </span>
          </div>
        </div>
      )}

      {verse && (
        <div 
          key={animateKey}
          className={cn(
            'z-30 max-w-[90%] w-full',
            getAlignmentClass(settings.alignment),
            'animate-fade-in-up'
          )}
        >
          <div 
            className={cn(
              'font-serif mb-12 tracking-wide drop-shadow-lg',
              'leading-relaxed text-balance transition-all duration-300'
            )}
            style={fontSizeStyle}
          >
            {verse.text}
          </div>

          {settings.showReference && (
            <div className="mt-12 pt-8 border-t border-current/20 inline-block w-full animate-fade-in-up transition-all duration-500 delay-100">
              <h2 className={cn(
                'text-display-2 font-display tracking-wider uppercase',
                'text-current transition-colors duration-300'
              )}>
                {verse.reference}
              </h2>
              <p className="text-body mt-3 opacity-70 uppercase tracking-wider font-light transition-all duration-300">
                {verse.version}
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        @keyframes fadeInUp { 
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          } 
          to { 
            opacity: 1; 
            transform: translateY(0); 
          } 
        }
        .animate-fade-in-up {
          animation: fadeInUp 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default SlideDisplay;
