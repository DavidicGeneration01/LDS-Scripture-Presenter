import React, { ReactNode } from 'react';
import HeaderBar from './HeaderBar';

interface ModernLayoutProps {
  children: ReactNode;
  isLive?: boolean;
  connectionStatus?: 'connected' | 'disconnected';
  onSettingsClick?: () => void;
}

const ModernLayout: React.FC<ModernLayoutProps> = ({ 
  children, 
  isLive = false,
  connectionStatus = 'disconnected',
  onSettingsClick
}) => {
  if (isLive) {
    return (
      <div className="w-full h-screen overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0f0f0f]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <HeaderBar connectionStatus={connectionStatus} onSettingsClick={onSettingsClick} />
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModernLayout;
