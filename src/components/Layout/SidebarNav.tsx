import React, { useState } from 'react';
import { 
  Search, BookOpen, History, Star, Folder, Settings, 
  ChevronDown, Zap, Layers, Eye, Plus
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  onClick?: () => void;
  submenu?: NavItem[];
}

interface SidebarNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ isOpen, onToggle }) => {
  const [activeItem, setActiveItem] = useState<string>('search');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['library']));

  const toggleSubmenu = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const navItems: NavItem[] = [
    {
      id: 'search',
      label: 'Search',
      icon: <Search size={20} />,
    },
    {
      id: 'recent',
      label: 'Recent',
      icon: <History size={20} />,
      badge: 5,
    },
    {
      id: 'library',
      label: 'Library',
      icon: <BookOpen size={20} />,
      submenu: [
        {
          id: 'favorites',
          label: 'Favorites',
          icon: <Star size={16} />,
          badge: 12,
        },
        {
          id: 'collections',
          label: 'Collections',
          icon: <Folder size={16} />,
          badge: 3,
        },
        {
          id: 'saved',
          label: 'Saved',
          icon: <Zap size={16} />,
        },
      ],
    },
    {
      id: 'themes',
      label: 'Themes',
      icon: <Layers size={20} />,
    },
    {
      id: 'preview',
      label: 'Preview',
      icon: <Eye size={20} />,
    },
  ];

  const renderNavItem = (item: NavItem, isSubmenu = false) => {
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems.has(item.id);
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            setActiveItem(item.id);
            if (hasSubmenu) {
              toggleSubmenu(item.id);
            }
            item.onClick?.();
          }}
          className={cn(
            'w-full flex items-center justify-between px-4 py-3 rounded-lg',
            'text-small transition-all duration-200',
            isActive
              ? 'glass-effect-accent text-white bg-blue-500/20'
              : 'text-white/70 hover:text-white hover:glass-effect-dark',
            isSubmenu && 'pl-8 text-xs'
          )}
        >
          <div className="flex items-center gap-3">
            <span className={isActive ? 'text-blue-400' : 'text-white/50'}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </div>
          <div className="flex items-center gap-2">
            {item.badge && (
              <span className="px-2 py-1 text-xs bg-blue-500/30 text-blue-200 rounded-full">
                {item.badge}
              </span>
            )}
            {hasSubmenu && (
              <ChevronDown
                size={16}
                className={cn(
                  'transition-transform duration-200',
                  isExpanded ? 'rotate-180' : ''
                )}
              />
            )}
          </div>
        </button>

        {/* Submenu */}
        {hasSubmenu && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.submenu!.map(subitem => renderNavItem(subitem, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className={cn(
      'glass-effect-md border-r border-white/10 flex flex-col overflow-y-auto',
      'transition-all duration-300 ease-out',
      isOpen ? 'w-64' : 'w-20'
    )}>
      {/* Sidebar Header */}
      <div className="flex-shrink-0 px-4 py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          {isOpen && (
            <h2 className="text-heading-3 text-white font-semibold">Menu</h2>
          )}
          <button
            onClick={onToggle}
            className={cn(
              'p-2 rounded-lg glass-button transition-all duration-300',
              'hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
            )}
            aria-label="Toggle sidebar"
          >
            <ChevronDown
              size={18}
              className={cn(
                'transition-transform duration-300',
                !isOpen ? 'rotate-90' : '-rotate-90'
              )}
            />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map(item => renderNavItem(item))}
      </nav>

      {/* Footer Section */}
      <div className="flex-shrink-0 px-2 py-4 border-t border-white/10 space-y-2">
        <button className={cn(
          'w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg',
          'glass-button hover:bg-blue-500/30 transition-all duration-300'
        )}>
          <Plus size={18} />
          {isOpen && <span className="text-small">New</span>}
        </button>
        
        <button className={cn(
          'w-full flex items-center gap-3 px-4 py-2 rounded-lg',
          'text-white/60 hover:text-white transition-all duration-300'
        )}>
          <Settings size={18} />
          {isOpen && <span className="text-small">Settings</span>}
        </button>
      </div>
    </aside>
  );
};

export default SidebarNav;
