import { Search, Home, TrendingUp, Library, Heart, ListMusic, Settings } from 'lucide-react';
import { useState } from 'react';

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'search', label: 'Search', icon: Search },
  { id: 'trending', label: 'Trending', icon: TrendingUp },
];

const libraryItems = [
  { id: 'liked', label: 'Liked Songs', icon: Heart },
  { id: 'queue', label: 'Queue', icon: ListMusic },
];

export function AppSidebar({ currentView, onNavigate, collapsed, onToggle }: AppSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-0 bottom-[var(--player-height)] z-30 flex flex-col border-r border-border bg-sidebar transition-all duration-200 ${
        collapsed ? 'w-[4.5rem]' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-border">
        <div className="h-8 w-8 rounded bg-primary flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-primary-foreground text-sm">S</span>
        </div>
        {!collapsed && (
          <span className="font-display font-semibold text-foreground text-lg tracking-tight">
            Sarmax
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors duration-150 ${
              currentView === item.id
                ? 'bg-sidebar-accent text-foreground'
                : 'text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}

        <div className="pt-6 pb-2">
          {!collapsed && (
            <span className="px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Library
            </span>
          )}
        </div>

        {libraryItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors duration-150 ${
              currentView === item.id
                ? 'bg-sidebar-accent text-foreground'
                : 'text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-center h-12 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </aside>
  );
}
