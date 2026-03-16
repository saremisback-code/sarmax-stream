import { Home, TrendingUp, ListMusic, ChevronLeft, Mic2, FileText } from 'lucide-react';
import sarmaxLogo from '@/assets/sarmax-logo.png';

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
  { id: 'lyrics', label: 'Lyrics', icon: Mic2 },
];

const libraryItems = [
  { id: 'queue', label: 'Queue', icon: ListMusic },
];

const legalItems = [
  { id: 'terms', label: 'Terms', icon: FileText },
  { id: 'privacy', label: 'Privacy', icon: FileText },
];

export function AppSidebar({ currentView, onNavigate, collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 bottom-[var(--player-height)] z-30 flex flex-col border-r border-border/40 transition-all duration-300 ease-out ${
        collapsed ? 'w-[4.5rem]' : 'w-[15rem]'
      }`}
      style={{ background: 'hsl(var(--sidebar-background))' }}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-4 shrink-0">
        <img src={sarmaxLogo} alt="Sarmax" className="h-8 w-8 shrink-0" />
        {!collapsed && (
          <span className="font-display font-bold text-foreground text-lg tracking-tight">
            Sarmax
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2.5 space-y-0.5 overflow-y-auto scrollbar-thin">
        {navItems.map(item => {
          const isActive = currentView === item.id || (item.id === 'home' && currentView === 'search');
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        <div className="pt-6 pb-1.5">
          {!collapsed && (
            <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
              Library
            </span>
          )}
        </div>

        {libraryItems.map(item => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <item.icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* Legal - bottom section */}
        <div className="pt-6 pb-1.5">
          {!collapsed && (
            <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
              Legal
            </span>
          )}
        </div>

        {legalItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-[11px] font-medium transition-all duration-150 ${
              currentView === item.id
                ? 'bg-sidebar-accent text-foreground'
                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/30'
            }`}
          >
            <item.icon className={`h-[14px] w-[14px] shrink-0`} />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-11 border-t border-sidebar-border text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
        />
      </button>
    </aside>
  );
}
