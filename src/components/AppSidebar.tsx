import { Search, Home, TrendingUp, Heart, ListMusic, ChevronLeft, Music2 } from 'lucide-react';

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
];

const libraryItems = [
  { id: 'queue', label: 'Queue', icon: ListMusic },
];

export function AppSidebar({ currentView, onNavigate, collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 bottom-[var(--player-height)] z-30 flex flex-col bg-sidebar transition-all duration-300 ease-out ${
        collapsed ? 'w-[4.5rem]' : 'w-[16.5rem]'
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="h-9 w-9 rounded-lg bg-primary glow-primary flex items-center justify-center shrink-0">
          <Music2 className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <span className="font-display font-bold text-foreground text-xl tracking-tight">
            Sarmax
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map(item => {
          const isActive = currentView === item.id || (item.id === 'home' && currentView === 'search');
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/40'
              }`}
            >
              <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        <div className="pt-8 pb-2">
          {!collapsed && (
            <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/60">
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
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-sidebar-accent text-foreground'
                  : 'text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/40'
              }`}
            >
              <item.icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-12 border-t border-border/50 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
        />
      </button>
    </aside>
  );
}
