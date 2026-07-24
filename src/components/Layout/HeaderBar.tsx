import React, { useState } from 'react';
import { Circle, Settings, CircleHelp, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface HeaderBarProps {
  connectionStatus: 'connected' | 'disconnected';
  onSettingsClick?: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  connectionStatus,
  onSettingsClick
}) => {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="glass-effect-md px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-heading-2 text-white flex items-center gap-3">
              <span>Mormon Scripture Presenter</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg glass-effect transition-all duration-300',
              connectionStatus === 'connected' ? 'border-green-500/30' : 'border-red-500/30'
            )}>
              <Circle
                size={8}
                className={cn(
                  'fill-current animate-pulse',
                  connectionStatus === 'connected' ? 'text-green-500' : 'text-red-500'
                )}
              />
              <span className="text-small text-white/70">
                {connectionStatus === 'connected' ? 'Live' : 'Offline'}
              </span>
            </div>

            <button
              onClick={onSettingsClick}
              className={cn(
                'p-2 rounded-lg glass-button transition-all duration-300',
                'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
              )}
              aria-label="Open settings"
              title="Open Settings"
            >
              <Settings size={20} className="text-white/80" />
            </button>

            <button
              onClick={() => setShowAbout(true)}
              className={cn(
                'p-2 rounded-lg glass-button transition-all duration-300',
                'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
              )}
              aria-label="About app"
              title="About App"
            >
              <CircleHelp size={20} className="text-white/80" />
            </button>
          </div>
        </div>
      </header>

      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
          <div className="glass-effect-lg w-full max-w-xl rounded-lg border border-white/15 p-6 shadow-2xl animate-scale-in">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-heading-1 text-white">About LDS Scripture Presenter</h2>
                <p className="mt-1 text-small text-white/50">Created by David O. Alade</p>
              </div>
              <button
                onClick={() => setShowAbout(false)}
                className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Close about app"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-white/75">
              <p className="text-small leading-relaxed">
                LDS Scripture Presenter is a local presentation tool built for scripture readings and projection. It fills a gap for Book of Mormon, Pearl of Great Price, Doctrine and Covenants, and KJV Bible presentation alongside familiar worship presentation workflows.
              </p>
              <p className="text-small leading-relaxed">
                The operator view searches scripture references, keeps recent readings, supports manual text, and opens a live receiver window for audience display.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="text-micro uppercase tracking-wider text-white/45">Built With</p>
                  <p className="mt-1 text-small text-white/80">Vite, React, TypeScript, Tailwind CSS</p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="text-micro uppercase tracking-wider text-white/45">Live Sync</p>
                  <p className="mt-1 text-small text-white/80">BroadcastChannel and localStorage</p>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <p className="text-micro uppercase tracking-wider text-white/45">Data Sources</p>
                <p className="mt-1 text-small text-white/80">
                  KJV Bible references use public Bible data. Latter-day Saint scripture references load from online JSON scripture data when available.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderBar;
