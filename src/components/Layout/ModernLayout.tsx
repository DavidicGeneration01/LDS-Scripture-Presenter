import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import HeaderBar from './HeaderBar';
import SidebarNav from './SidebarNav';

interface ModernLayoutProps {
  children: ReactNode;
  isLive?: boolean;
  connectionStatus?: 'connected' | 'disconnected';
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ 
  children, 
  isLive = false,
  connectionStatus = 'disconnected'
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(!isLive);

  if (isLive) {
    // Full presentation mode - no UI
    return (
      <div className="w-full h-screen overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f0f0f]">
      {/* Sidebar Navigation */}
      <SidebarNav 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className={cn(
        'flex-1 flex flex-col overflow-hidden transition-all duration-300',
        sidebarOpen ? 'ml-0' : 'ml-0'
      )}>
        {/* Header Bar */}
        <HeaderBar 
          connectionStatus={connectionStatus}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
