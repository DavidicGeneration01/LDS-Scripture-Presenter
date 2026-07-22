import React from 'react';
import { Menu, Circle, Settings, CircleHelp } from 'lucide-react';
import { cn } from '../../utils/cn';

interface HeaderBarProps {
  connectionStatus: 'connected' | 'disconnected';
  onSidebarToggle: () => void;
  sidebarOpen: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({
  connectionStatus,
  onSidebarToggle,
  sidebarOpen
}) => {
  return (
    <header className="glass-effect-md px-6 py-4 border-b border-white/10">
      <div className="flex items-center justify-between h-16">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSidebarToggle}
            className={cn(
              'p-2 rounded-lg glass-button transition-all duration-300',
              'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
            )}
            aria-label="Toggle sidebar"
          >
            <Menu size={20} className="text-white/80" />
          </button>

          <div className="h-8 w-px bg-white/10" />

          <h1 className="text-heading-2 text-white flex items-center gap-3">
            <span>Mormon Scripture Presenter</span>
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Connection Status */}
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

          {/* Settings Button */}
          <button
            className={cn(
              'p-2 rounded-lg glass-button transition-all duration-300',
              'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
            )}
            aria-label="Settings"
          >
            <Settings size={20} className="text-white/80" />
          </button>

          {/* Help Button */}
          <button
            className={cn(
              'p-2 rounded-lg glass-button transition-all duration-300',
              'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
            )}
            aria-label="Help"
          >
            <CircleHelp size={20} className="text-white/80" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
