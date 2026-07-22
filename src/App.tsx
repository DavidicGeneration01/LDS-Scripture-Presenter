import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ModernLayout from './components/Layout/ModernLayout';
import ControlPanel from './components/ControlPanel';
import SlideDisplay from './components/SlideDisplay';
import { VerseData, AIInsight, PresentationSettings, ThemeMode, HistoryItem, BroadcastMessage, Collection } from './types';
import { getVerseInsights } from './services/geminiService';
import { findScripture } from './services/scriptureService';
import storage from './services/storageService';

const BROADCAST_CHANNEL_NAME = 'lumina_live_channel';

const AppContent: React.FC = () => {
  const [isReceiverMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        return new URL(window.location.href).searchParams.get('mode') === 'live';
      } catch { return false; }
    }
    return false;
  });

  const [currentVerse, setCurrentVerse] = useState<VerseData | null>(null);
  const [currentInsight, setCurrentInsight] = useState<AIInsight | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');

  const channel = useMemo(() => {
    try {
      return new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    } catch (e) {
      console.error('BroadcastChannel not supported', e);
      return null;
    }
  }, []);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumina_history');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const [settings, setSettings] = useState<PresentationSettings>(() => {
    try {
      const saved = localStorage.getItem('lumina_settings');
      return saved ? JSON.parse(saved) : {
        fontSize: 4.0,
        fontMode: 'auto',
        theme: ThemeMode.Classic,
        showReference: true,
        alignment: 'center'
      };
    } catch {
      return { fontSize: 4.0, fontMode: 'auto', theme: ThemeMode.Classic, showReference: true, alignment: 'center' };
    }
  });

  const [favorites, setFavorites] = useState<VerseData[]>(() => {
    try { return storage.loadFavorites(); } catch { return []; }
  });

  const [collections, setCollections] = useState<Collection[]>(() => {
    try { return storage.loadCollections(); } catch { return []; }
  });

  const [pinned, setPinned] = useState<VerseData | null>(() => {
    try { return storage.loadPinned(); } catch { return null; }
  });

  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const [previewScale, setPreviewScale] = useState(0.5);

  useEffect(() => {
    if (isReceiverMode) {
      setConnectionStatus('connected');

      const updateStateIfChanged = (newVerse: VerseData | null, newSettings: PresentationSettings) => {
        setCurrentVerse(prevVerse => {
          if (!prevVerse && !newVerse) return null;
          if (prevVerse && newVerse && prevVerse.reference === newVerse.reference && prevVerse.text === newVerse.text) return prevVerse;
          return newVerse;
        });

        setSettings(prevSettings => {
          if (JSON.stringify(prevSettings) === JSON.stringify(newSettings)) return prevSettings;
          return newSettings;
        });
      };

      const handleBroadcast = (event: MessageEvent<BroadcastMessage>) => {
        if (event.data.type === 'STATE_UPDATE') {
          updateStateIfChanged(event.data.payload.verse, event.data.payload.settings);
        }
      };

      const handleStorage = (event: StorageEvent) => {
        if (event.key === 'lumina_live_state' && event.newValue) {
          const state = JSON.parse(event.newValue);
          updateStateIfChanged(state.verse, state.settings);
        }
      };

      if (channel) {
        channel.onmessage = handleBroadcast;
        channel.postMessage({ type: 'REQUEST_STATE' });
      }

      window.addEventListener('storage', handleStorage);

      const pollInterval = setInterval(() => {
        try {
          const savedState = localStorage.getItem('lumina_live_state');
          if (savedState) {
            const state = JSON.parse(savedState);
            updateStateIfChanged(state.verse, state.settings);
          }
        } catch (e) {}
      }, 1000);

      try {
        const savedState = localStorage.getItem('lumina_live_state');
        if (savedState) {
          const state = JSON.parse(savedState);
          updateStateIfChanged(state.verse, state.settings);
        }
      } catch (e) {}

      return () => {
        if (channel) channel.onmessage = null;
        window.removeEventListener('storage', handleStorage);
        clearInterval(pollInterval);
      };
    } else {
      const handleMessage = (event: MessageEvent<BroadcastMessage>) => {
        if (event.data.type === 'REQUEST_STATE') {
          channel?.postMessage({ type: 'STATE_UPDATE', payload: { verse: currentVerse, settings } });
        }
      };
      if (channel) channel.onmessage = handleMessage;
      return () => { if (channel) channel.onmessage = null; };
    }
  }, [channel, isReceiverMode]);

  useEffect(() => {
    if (!isReceiverMode) {
      channel?.postMessage({ type: 'STATE_UPDATE', payload: { verse: currentVerse, settings } });

      try {
        localStorage.setItem('lumina_live_state', JSON.stringify({ verse: currentVerse, settings }));
        localStorage.setItem('lumina_settings', JSON.stringify(settings));
        storage.saveFavorites(favorites);
        storage.saveCollections(collections);
        storage.savePinned(pinned);
      } catch (e) {}
    }
  }, [currentVerse, settings, isReceiverMode, channel]);

  useEffect(() => {
    if (!isReceiverMode) {
      try { localStorage.setItem('lumina_history', JSON.stringify(history)); } catch (e) {}
    }
  }, [history, isReceiverMode]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (isReceiverMode) return;
    const calculateScale = () => {
      if (previewContainerRef.current) {
        const { clientWidth, clientHeight } = previewContainerRef.current;
        const TARGET_WIDTH = 1920;
        const TARGET_HEIGHT = 1080;
        const scaleX = clientWidth / TARGET_WIDTH;
        const scaleY = clientHeight / TARGET_HEIGHT;
        const scale = Math.min(scaleX, scaleY) * 0.9;
        setPreviewScale(scale);
      }
    };
    window.addEventListener('resize', calculateScale);
    calculateScale();
    const interval = setInterval(calculateScale, 1000);
    return () => { window.removeEventListener('resize', calculateScale); clearInterval(interval); };
  }, [isReceiverMode]);

  const handleUpdateSettings = (newSettings: Partial<PresentationSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Favorites / Collections / Pinned handlers
  const toggleFavorite = (verse: VerseData) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.reference === verse.reference);
      const next = exists ? prev.filter(f => f.reference !== verse.reference) : [verse, ...prev];
      storage.saveFavorites(next);
      return next;
    });
  };

  const togglePinned = (verse: VerseData) => {
    setPinned(prev => {
      const next = prev && prev.reference === verse.reference ? null : verse;
      storage.savePinned(next);
      return next;
    });
  };

  const createCollection = (name: string) => {
    const col: Collection = { id: Date.now().toString(), name, items: [] };
    setCollections(prev => { const next = [col, ...prev]; storage.saveCollections(next); return next; });
    return col;
  };

  const addToCollection = (collectionId: string, verse: VerseData) => {
    setCollections(prev => {
      const next = prev.map(c => c.id === collectionId ? ({ ...c, items: [verse, ...c.items.filter(i => i.reference !== verse.reference)] }) : c);
      storage.saveCollections(next);
      return next;
    });
  };

  const removeFromCollection = (collectionId: string, verseRef: string) => {
    setCollections(prev => {
      const next = prev.map(c => c.id === collectionId ? ({ ...c, items: c.items.filter(i => i.reference !== verseRef) }) : c);
      storage.saveCollections(next);
      return next;
    });
  };

  const toggleFullscreen = async () => {
    const elem = document.getElementById('presentation-container');
    if (!elem) return;
    if (!document.fullscreenElement) await elem.requestFullscreen(); else document.exitFullscreen();
  };

  const fetchInsightsForVerse = useCallback(async (verse: VerseData) => {
    setCurrentInsight(null);
    const API_KEY = (import.meta as any).env?.VITE_API_KEY || (window as any).process?.env?.API_KEY || '';
    if (navigator.onLine && API_KEY) {
      const insight = await getVerseInsights(verse.reference, verse.text);
      setCurrentInsight(insight);
    }
  }, []);

  const addToHistory = (verse: VerseData) => {
    setHistory(prev => {
      const filtered = prev.filter(h => h.verse.reference !== verse.reference);
      const newEntry: HistoryItem = { id: Date.now().toString(), verse, timestamp: Date.now() };
      return [newEntry, ...filtered].slice(0, 20);
    });
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setLoadingMessage('');
    if (!((import.meta as any).env?.VITE_API_KEY) && /alma|nephi|moroni/i.test(query)) {
      setLoadingMessage('DOWNLOADING LIBRARY...');
    }

    try {
      const verse = await findScripture(query);
      setCurrentVerse(verse);
      addToHistory(verse);
      fetchInsightsForVerse(verse);
    } catch (error: any) {
      alert(error.message || 'Could not find verse.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleManualPresent = (verse: VerseData) => {
    setCurrentVerse(verse);
    addToHistory(verse);
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setCurrentVerse(item.verse);
    fetchInsightsForVerse(item.verse);
  };

  const handleLaunchLive = () => {
    const width = 1280; const height = 720;
    const left = (window.screen.width - width) / 2; const top = (window.screen.height - height) / 2;
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'live');
    try {
      window.open(url.toString(), 'MormonScripturePresenterLive', `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`);
      channel?.postMessage({ type: 'STATE_UPDATE', payload: { verse: currentVerse, settings } });
    } catch (e) { alert('Error opening window.'); }
  };

  const handleNavigateVerse = async (direction: 'next' | 'prev') => {
    if (!currentVerse) return;
    const regex = /^(.+)\s+(\d+):(\d+)$/;
    const match = currentVerse.reference.match(regex);
    if (match) {
      const book = match[1].trim();
      const chapter = parseInt(match[2]);
      const verse = parseInt(match[3]);
      const newVerseNum = direction === 'next' ? verse + 1 : verse - 1;
      if (newVerseNum < 1) return;
      const newQuery = `${book} ${chapter}:${newVerseNum}`;
      setIsLoading(true);
      try {
        const v = await findScripture(newQuery);
        setCurrentVerse(v);
        addToHistory(v);
        fetchInsightsForVerse(v);
      } catch (err: any) {
        if (err.message.includes('not found')) alert(`Cannot navigate ${direction}: Verse not found or end of chapter.`);
      } finally { setIsLoading(false); }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      if (isReceiverMode) return;
      if (e.key === 'ArrowRight') handleNavigateVerse('next');
      if (e.key === 'ArrowLeft') handleNavigateVerse('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVerse, isReceiverMode]);

  if (isReceiverMode) {
    return (
      <ModernLayout isLive={true} connectionStatus={connectionStatus}>
        <div id="presentation-container" className="h-screen w-screen bg-black overflow-hidden relative">
          <SlideDisplay verse={currentVerse} settings={settings} isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} isLoading={false} isLive={true} loadingMessage="" />
          {!currentVerse && (
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-black/50 px-3 py-1 rounded text-xs text-gray-400 font-mono z-50">
              <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span>{connectionStatus === 'connected' ? 'Live Signal Active' : 'Disconnected'}</span>
            </div>
          )}
        </div>
      </ModernLayout>
    );
  }

  return (
    <ModernLayout connectionStatus={connectionStatus}>
      <div className="flex h-full w-full overflow-hidden">
        {/* Control Panel */}
        <div className="w-96 flex-shrink-0 z-20 flex flex-col h-full glass-effect-md border-r border-white/10">
          <ControlPanel 
            onSearch={handleSearch} 
            isLoading={isLoading} 
            currentVerse={currentVerse} 
            insight={currentInsight} 
            settings={settings} 
            updateSettings={handleUpdateSettings} 
            history={history} 
            onSelectHistory={handleSelectHistory} 
            onLaunchLive={handleLaunchLive} 
            onManualPresent={handleManualPresent} 
            onNext={() => handleNavigateVerse('next')} 
            onPrev={() => handleNavigateVerse('prev')}
            favorites={favorites}
            collections={collections}
            pinned={pinned}
            onToggleFavorite={toggleFavorite}
            onTogglePinned={togglePinned}
            onCreateCollection={createCollection}
            onAddToCollection={addToCollection}
            onRemoveFromCollection={removeFromCollection}
          />
        </div>

        {/* Presentation Preview */}
        <div className="flex-1 relative h-full bg-gradient-dark flex flex-col">
          {/* Preview Header */}
          <div className="flex-none px-6 py-4 glass-effect-md border-b border-white/10 flex justify-between items-center text-white/60 text-micro uppercase tracking-widest font-semibold z-10">
            <span className="flex items-center gap-2">
              <span className="text-small text-white/80">Live Preview Console</span>
            </span>
            <span className="flex items-center text-green-400 gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              System Active
            </span>
          </div>

          {/* Preview Area */}
          <div className="flex-1 relative overflow-hidden" ref={previewContainerRef}>
            <div style={{ 
              width: '1920px', 
              height: '1080px', 
              position: 'absolute', 
              top: '50%', 
              left: '50%', 
              transform: `translate(-50%, -50%) scale(${previewScale})`, 
              transformOrigin: 'center center' 
            }} className="shadow-2xl border-2 border-white/10 bg-black overflow-hidden flex-shrink-0 transition-transform duration-100 ease-out rounded-lg">
              <SlideDisplay 
                verse={currentVerse} 
                settings={settings} 
                isFullscreen={false} 
                toggleFullscreen={() => {}} 
                isLoading={isLoading} 
                loadingMessage={loadingMessage} 
                isLive={false} 
              />
            </div>
            <div className="absolute bottom-4 right-4 text-micro font-bold text-white/10 uppercase pointer-events-none select-none">1920x1080 Scaled Preview</div>
          </div>
        </div>
      </div>
    </ModernLayout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
