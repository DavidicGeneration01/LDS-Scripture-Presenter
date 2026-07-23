import React, { useState } from 'react';
import { 
  Search, BookOpen, Settings, Info, History, MonitorPlay, 
  Link as LinkIcon, PenTool, ChevronLeft, ChevronRight, Type, 
  Star, Pin, PlusSquare, Zap
} from 'lucide-react';
import { VerseData, AIInsight, PresentationSettings, ThemeMode, HistoryItem, Collection } from '../types';
import { cn } from '../utils/cn';

interface ControlPanelProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  currentVerse: VerseData | null;
  insight: AIInsight | null;
  settings: PresentationSettings;
  updateSettings: (newSettings: Partial<PresentationSettings>) => void;
  history: HistoryItem[];
  onSelectHistory: (item: HistoryItem) => void;
  onLaunchLive: () => void;
  onManualPresent: (verse: VerseData) => void;
  onNext: () => void;
  onPrev: () => void;
  favorites: VerseData[];
  collections: Collection[];
  pinned: VerseData | null;
  onToggleFavorite: (v: VerseData) => void;
  onTogglePinned: (v: VerseData) => void;
  onCreateCollection: (name: string) => Collection;
  onAddToCollection: (collectionId: string, verse: VerseData) => void;
  onRemoveFromCollection: (collectionId: string, verseRef: string) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onSearch,
  isLoading,
  currentVerse,
  insight,
  settings,
  updateSettings,
  history,
  onSelectHistory,
  onLaunchLive,
  onManualPresent,
  onNext,
  onPrev,
  favorites, 
  collections, 
  pinned, 
  onToggleFavorite, 
  onTogglePinned, 
  onCreateCollection, 
  onAddToCollection, 
  onRemoveFromCollection
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'search' | 'settings' | 'insight' | 'manual'>('search');
  const [manualRef, setManualRef] = useState('');
  const [manualText, setManualText] = useState('');
  const [showCollections, setShowCollections] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualRef.trim() && manualText.trim()) {
      const manualVerse: VerseData = { 
        reference: manualRef, 
        text: manualText, 
        book: 'Manual', 
        chapter: 0, 
        verse: 0, 
        version: 'Custom' 
      };
      onManualPresent(manualVerse);
      setManualRef('');
      setManualText('');
    }
  };

  const handleCopyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('mode', 'live');
    navigator.clipboard.writeText(url.toString());
    alert('Live Link copied to clipboard! Paste it in a new window/tab.');
  };

  const handleSaveToCollection = (verse: VerseData) => {
    if (!verse) return;
    if (collections.length === 0) {
      const name = window.prompt('No collections exist. Enter a name to create one:');
      if (!name) return;
      const col = onCreateCollection(name);
      onAddToCollection(col.id, verse);
      alert(`Created collection "${col.name}" and added ${verse.reference}`);
      return;
    }
    setShowCollections(prev => !prev);
  };

  const handleChooseCollection = (id: string) => {
    if (!currentVerse) return;
    onAddToCollection(id, currentVerse);
    setShowCollections(false);
  };

  const isFavorited = currentVerse && favorites.some(f => f.reference === currentVerse.reference);
  const isPinned = currentVerse && pinned && pinned.reference === currentVerse.reference;

  return (
    <div className="h-full flex flex-col bg-gradient-dark text-white/90 w-full z-30 overflow-hidden">
      {/* Header Section */}
      <div className="flex-shrink-0 px-6 py-5 glass-effect-md border-b border-white/10">
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg glass-button flex items-center justify-center">
                <BookOpen size={18} className="text-blue-400" />
              </div>
              <h1 className="text-heading-1 font-display font-semibold">Scripture</h1>
            </div>
            <p className="text-small text-white/50 ml-11">Operator Control</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button 
              onClick={onLaunchLive}
              className={cn(
                'flex-1 min-w-[120px] flex items-center justify-center gap-2',
                'px-4 py-2.5 rounded-lg glass-button',
                'hover:bg-blue-500/30 hover:border-blue-400/50',
                'transition-all duration-200 font-medium text-small',
                'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
              )}
              title="Open Live Window"
            >
              <MonitorPlay size={16} className="text-blue-400" />
              <span>Launch Live</span>
            </button>
            
            <button 
              onClick={handleCopyLink}
              className={cn(
                'px-3 py-2.5 rounded-lg glass-button',
                'hover:bg-white/10 transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-white/50'
              )}
              title="Copy Live Link"
            >
              <LinkIcon size={16} className="text-white/60" />
            </button>

            {currentVerse && (
              <>
                <button 
                  onClick={() => onToggleFavorite(currentVerse)}
                  className={cn(
                    'px-3 py-2.5 rounded-lg transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-white/50',
                    isFavorited 
                      ? 'glass-effect-accent text-yellow-400' 
                      : 'glass-button text-white/60 hover:text-white'
                  )}
                  title="Toggle Favorite"
                >
                  <Star size={16} className={isFavorited ? 'fill-current' : ''} />
                </button>

                <button 
                  onClick={() => onTogglePinned(currentVerse)}
                  className={cn(
                    'px-3 py-2.5 rounded-lg transition-all duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-white/50',
                    isPinned 
                      ? 'glass-effect-accent text-green-400' 
                      : 'glass-button text-white/60 hover:text-white'
                  )}
                  title="Pin Verse"
                >
                  <Pin size={16} />
                </button>

                <div className="relative">
                  <button 
                    onClick={() => handleSaveToCollection(currentVerse)}
                    className="px-3 py-2.5 rounded-lg glass-button hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    title="Add to Collection"
                  >
                    <PlusSquare size={16} className="text-white/60" />
                  </button>

                  {showCollections && (
                    <div className="absolute right-0 mt-2 w-64 glass-effect-lg rounded-lg shadow-xl z-40 p-3 animate-fade-in-up">
                      <p className="text-micro text-white/60 mb-3 uppercase tracking-wider">Select Collection</p>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {collections.map(c => (
                          <button
                            key={c.id}
                            onClick={() => handleChooseCollection(c.id)}
                            className={cn(
                              'w-full text-left py-2 px-3 rounded-lg transition-all duration-200',
                              'glass-button hover:bg-white/10 text-small flex justify-between items-center'
                            )}
                          >
                            <span>{c.name}</span>
                            <span className="text-micro text-white/50">{c.items.length}</span>
                          </button>
                        ))}
                      </div>
                      <button 
                        onClick={() => { 
                          const n = prompt('New collection name:'); 
                          if (n) { 
                            const col = onCreateCollection(n); 
                            onAddToCollection(col.id, currentVerse); 
                            setShowCollections(false); 
                          } 
                        }}
                        className="w-full mt-3 pt-3 border-t border-white/10 py-2 px-3 rounded-lg text-small text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        + Create Collection
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex-shrink-0 flex border-b border-white/10 px-2 gap-1">
        {(['search', 'manual', 'insight', 'settings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 px-2',
              'text-small font-medium transition-all duration-200 relative',
              'focus:outline-none',
              activeTab === tab
                ? 'text-blue-400'
                : 'text-white/50 hover:text-white/70'
            )}
          >
            {tab === 'search' && <Search size={16} />}
            {tab === 'manual' && <PenTool size={16} />}
            {tab === 'insight' && <Info size={16} />}
            {tab === 'settings' && <Settings size={16} />}
            <span className="capitalize">{tab}</span>
            {activeTab === tab && (
              <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* SEARCH TAB */}
        {activeTab === 'search' && (
          <div className="p-6 space-y-6">
            {/* Search Bar */}
            <div className="space-y-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input 
                  type="text" 
                  value={query} 
                  onChange={(e) => setQuery(e.target.value)} 
                  placeholder="Ex: Matt1:2, matt 1:2, 1Nph 1:1..." 
                  className={cn(
                    'w-full glass-input rounded-lg pl-4 pr-12 py-3',
                    'text-body placeholder-white/30',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
                  )}
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className={cn(
                    'absolute right-2 top-2 p-2 rounded-lg',
                    'glass-button hover:bg-blue-500/30',
                    'transition-all duration-200 disabled:opacity-50'
                  )}
                >
                  <Search size={18} className="text-blue-400" />
                </button>
              </form>
              <div className="space-y-2">
                <p className="text-micro text-white/50">KJV Bible, Book of Mormon, Doctrine and Covenants, Pearl of Great Price</p>
                <div className="flex flex-wrap gap-2 text-micro text-white/60">
                  {['Matt1:2', 'JHN 3:16', '1Nph 1:1', 'ALM 5:14', 'MSE 1:39'].map((hint) => (
                    <span key={hint} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono">
                      {hint}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Verse Navigation */}
            {currentVerse && (
              <div className="glass-effect-md rounded-lg p-4 space-y-3">
                <p className="text-micro text-white/50 uppercase tracking-wider font-semibold">Current Verse</p>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={onPrev}
                    className="p-2 rounded-lg glass-button hover:bg-white/10 transition-all duration-200"
                    title="Previous (← Arrow)"
                  >
                    <ChevronLeft size={18} className="text-white/60" />
                  </button>
                  <div className="flex-1 text-center">
                    <h3 className="text-heading-2 font-display text-blue-400">
                      {currentVerse.reference}
                    </h3>
                  </div>
                  <button 
                    onClick={onNext}
                    className="p-2 rounded-lg glass-button hover:bg-white/10 transition-all duration-200"
                    title="Next (→ Arrow)"
                  >
                    <ChevronRight size={18} className="text-white/60" />
                  </button>
                </div>
              </div>
            )}

            {/* History */}
            {history.length > 0 && (
              <div className="space-y-3">
                <p className="text-micro text-white/50 uppercase tracking-wider font-semibold flex items-center gap-2">
                  <History size={14} /> Recent
                </p>
                <div className="space-y-2">
                  {history.slice(0, 5).map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onSelectHistory(item)}
                      className={cn(
                        'w-full text-left p-3 rounded-lg glass-effect',
                        'hover:bg-white/10 transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
                      )}
                    >
                      <h4 className="text-body font-semibold text-blue-300 group-hover:text-blue-200">
                        {item.verse.reference}
                      </h4>
                      <p className="text-small text-white/50 line-clamp-2 mt-1 font-serif italic">
                        "{item.verse.text.substring(0, 60)}..."
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* MANUAL TAB */}
        {activeTab === 'manual' && (
          <div className="p-6 space-y-4 animate-fade-in">
            <div className="glass-effect-lg rounded-lg p-4">
              <p className="text-small text-blue-300 flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                Use this mode for custom content or when offline
              </p>
            </div>

            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div>
                <label className="block text-micro text-white/60 uppercase tracking-wider font-semibold mb-2">
                  Reference / Title
                </label>
                <input 
                  type="text" 
                  value={manualRef} 
                  onChange={(e) => setManualRef(e.target.value)} 
                  placeholder="e.g. Alma 5:14" 
                  className="w-full glass-input rounded-lg px-4 py-2.5 text-body focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required 
                />
              </div>

              <div>
                <label className="block text-micro text-white/60 uppercase tracking-wider font-semibold mb-2">
                  Scripture Text
                </label>
                <textarea 
                  value={manualText} 
                  onChange={(e) => setManualText(e.target.value)} 
                  placeholder="Enter the scripture text here..." 
                  className="w-full glass-input rounded-lg px-4 py-2.5 h-40 text-body font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                  required 
                />
              </div>

              <button 
                type="submit"
                className={cn(
                  'w-full px-4 py-3 rounded-lg glass-button',
                  'hover:bg-blue-500/30 hover:border-blue-400/50',
                  'transition-all duration-200 font-semibold text-body',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/50'
                )}
              >
                Present Now
              </button>
            </form>
          </div>
        )}

        {/* INSIGHT TAB */}
        {activeTab === 'insight' && (
          <div className="p-6 animate-fade-in">
            {!currentVerse ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                <div className="w-12 h-12 rounded-lg glass-effect flex items-center justify-center opacity-50">
                  <Info size={24} className="text-white/50" />
                </div>
                <p className="text-body text-white/60">Select a verse to see insights</p>
              </div>
            ) : !insight ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-4">
                <div className="w-8 h-8 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                <p className="text-small text-white/70">Loading insights...</p>
                <p className="text-micro text-white/50">(Requires Internet & API Key)</p>
              </div>
            ) : (
              <div className="space-y-4">
                {insight.context && (
                  <div className="glass-effect-md rounded-lg p-4 space-y-2">
                    <h3 className="text-micro text-white/70 uppercase tracking-wider font-semibold">Context</h3>
                    <p className="text-small text-white/80 leading-relaxed">{insight.context}</p>
                  </div>
                )}
                {insight.theology && (
                  <div className="glass-effect-md rounded-lg p-4 space-y-2">
                    <h3 className="text-micro text-white/70 uppercase tracking-wider font-semibold">Theological Meaning</h3>
                    <p className="text-small text-white/80 leading-relaxed">{insight.theology}</p>
                  </div>
                )}
                {insight.application && (
                  <div className="glass-effect-md rounded-lg p-4 space-y-2">
                    <h3 className="text-micro text-white/70 uppercase tracking-wider font-semibold">Application</h3>
                    <p className="text-small text-white/80 leading-relaxed">{insight.application}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="p-6 space-y-6 animate-fade-in">
            {/* Font Sizing */}
            <div className="space-y-3">
              <p className="text-micro text-white/70 uppercase tracking-wider font-semibold">Font Sizing</p>
              <div className="glass-effect-md rounded-lg p-4 space-y-4">
                <div className="flex gap-2">
                  {(['auto', 'manual'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateSettings({ fontMode: mode })}
                      className={cn(
                        'flex-1 py-2 px-3 rounded-lg font-semibold text-small',
                        'transition-all duration-200 uppercase',
                        settings.fontMode === mode
                          ? 'glass-effect-accent text-white'
                          : 'glass-button text-white/60 hover:text-white'
                      )}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                {settings.fontMode === 'manual' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-small text-white/70 flex items-center gap-2">
                        <Type size={14} /> Size
                      </span>
                      <span className="text-heading-2 font-display text-blue-400">
                        {settings.fontSize?.toFixed(1)}rem
                      </span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="10" 
                      step="0.1" 
                      value={settings.fontSize || 4}
                      onChange={(e) => updateSettings({ fontSize: parseFloat(e.target.value) })}
                      className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-400"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Theme */}
            <div className="space-y-3">
              <p className="text-micro text-white/70 uppercase tracking-wider font-semibold">Theme</p>
              <div className="grid grid-cols-2 gap-2">
                {(Object.values(ThemeMode) as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => updateSettings({ theme: mode })}
                    className={cn(
                      'py-2 px-3 rounded-lg text-small font-medium',
                      'transition-all duration-200 capitalize',
                      settings.theme === mode
                        ? 'glass-effect-accent text-white border-blue-400/50'
                        : 'glass-button text-white/60 hover:text-white'
                    )}
                  >
                    {mode.toLowerCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Alignment */}
            <div className="space-y-3">
              <p className="text-micro text-white/70 uppercase tracking-wider font-semibold">Alignment</p>
              <div className="flex gap-2 glass-effect-md rounded-lg p-2">
                {(['left', 'center', 'right'] as const).map((align) => (
                  <button
                    key={align}
                    onClick={() => updateSettings({ alignment: align })}
                    className={cn(
                      'flex-1 py-2 px-3 rounded-lg text-small font-medium',
                      'transition-all duration-200 capitalize',
                      settings.alignment === align
                        ? 'glass-effect-accent text-white'
                        : 'text-white/60 hover:text-white'
                    )}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>

            {/* Show Reference Toggle */}
            <div className="glass-effect-md rounded-lg p-4 flex items-center justify-between">
              <p className="text-body text-white/80">Show Reference</p>
              <button
                onClick={() => updateSettings({ showReference: !settings.showReference })}
                className={cn(
                  'relative w-12 h-6 rounded-full transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                  settings.showReference ? 'bg-blue-500/40' : 'bg-white/10'
                )}
              >
                <span
                  className={cn(
                    'absolute top-1 left-1 w-4 h-4 bg-white rounded-full',
                    'transition-transform duration-200',
                    settings.showReference ? 'translate-x-6' : ''
                  )}
                />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 px-6 py-4 glass-effect-md border-t border-white/10 text-center text-micro text-white/40">
        Designed by David O. Alade
      </div>
    </div>
  );
};

export default ControlPanel;
