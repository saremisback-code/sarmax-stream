import { useState, useEffect, useCallback } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { BottomPlayer } from '@/components/BottomPlayer';
import { TrackCard } from '@/components/TrackCard';
import { SearchBar } from '@/components/SearchBar';
import { QueueView } from '@/components/QueueView';
import { PlayerProvider, Track } from '@/context/PlayerContext';
import { searchYouTube, getTrendingMusic, YouTubeSearchResult } from '@/lib/youtube';
import { Loader2, TrendingUp, Search, Home as HomeIcon } from 'lucide-react';

function MainContent() {
  const [currentView, setCurrentView] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadTrending = useCallback(async () => {
    setLoading(true);
    try {
      const results = await getTrendingMusic();
      setTracks(results);
    } catch (e) {
      console.error('Failed to load trending:', e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTrending();
  }, [loadTrending]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
    setLoading(true);
    try {
      const results = await searchYouTube(query);
      setTracks(results);
    } catch (e) {
      console.error('Search failed:', e);
    }
    setLoading(false);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view === 'home' || view === 'trending') {
      loadTrending();
      setSearchQuery('');
    }
  };

  const sidebarWidth = collapsed ? '4.5rem' : '15rem';

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <main
        className="transition-all duration-200 pb-[var(--player-height)]"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              {currentView === 'search' && searchQuery ? (
                <h1 className="font-display text-3xl font-bold text-foreground">
                  Results for "{searchQuery}"
                </h1>
              ) : currentView === 'queue' ? null : (
                <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
                  {currentView === 'trending' ? (
                    <><TrendingUp className="h-7 w-7 text-primary" /> Trending Now</>
                  ) : (
                    <>Good {getGreeting()}</>
                  )}
                </h1>
              )}
            </div>
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Content */}
          {currentView === 'queue' ? (
            <QueueView />
          ) : loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {tracks.map(track => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
              {tracks.length === 0 && !loading && (
                <div className="text-center py-32">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Search for your favorite music</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <BottomPlayer />
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 18) return 'Afternoon';
  return 'Evening';
}

const Index = () => (
  <PlayerProvider>
    <MainContent />
  </PlayerProvider>
);

export default Index;
