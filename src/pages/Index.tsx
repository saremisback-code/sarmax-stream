import { useState, useEffect, useCallback } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { BottomPlayer } from '@/components/BottomPlayer';
import { TrackCard } from '@/components/TrackCard';
import { SearchBar } from '@/components/SearchBar';
import { QueueView } from '@/components/QueueView';
import { PlayerProvider, Track } from '@/context/PlayerContext';
import { searchYouTube, getTrendingMusic } from '@/lib/youtube';
import { Loader2, TrendingUp, Search, Music2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

function MainContent() {
  const [currentView, setCurrentView] = useState('home');
  const [collapsed, setCollapsed] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loadTrending = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await getTrendingMusic();
      setTracks(results);
    } catch (e: any) {
      console.error('Failed to load trending:', e);
      setError(e.message || 'Failed to load trending music');
      toast.error('Could not load trending music. Check your API key setup.');
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
    setError(null);
    try {
      const results = await searchYouTube(query);
      setTracks(results);
    } catch (e: any) {
      console.error('Search failed:', e);
      setError(e.message || 'Search failed');
      toast.error('Search failed. Check your API key setup.');
    }
    setLoading(false);
  }, []);

  const handleNavigate = (view: string) => {
    setCurrentView(view);
    if (view === 'home' || view === 'trending') {
      loadTrending();
      setSearchQuery('');
      setError(null);
    }
  };

  const sidebarWidth = collapsed ? '4.5rem' : '16.5rem';

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
      />

      <main
        className="transition-all duration-300 ease-out pb-[var(--player-height)]"
        style={{ marginLeft: sidebarWidth }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-10 gap-4">
            <div className="shrink-0">
              {currentView === 'search' && searchQuery ? (
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                  Results for "<span className="text-primary">{searchQuery}</span>"
                </h1>
              ) : currentView === 'queue' ? null : (
                <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                  {currentView === 'trending' ? (
                    <>
                      <TrendingUp className="h-6 w-6 text-primary" />
                      Trending Now
                    </>
                  ) : (
                    <>Good {getGreeting()} 👋</>
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
            <div className="flex flex-col items-center justify-center py-32 gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground">Loading music...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 max-w-md mx-auto text-center">
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <div>
                <p className="text-foreground font-display font-semibold mb-2">Something went wrong</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {error.includes('not been used') || error.includes('disabled')
                    ? 'The YouTube Data API v3 is not enabled for your API key. Enable it in the Google Cloud Console, wait a minute, then refresh.'
                    : error}
                </p>
              </div>
              <button
                onClick={() => currentView === 'search' ? handleSearch(searchQuery) : loadTrending()}
                className="mt-2 px-5 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {tracks.map(track => (
                  <TrackCard key={track.id} track={track} />
                ))}
              </div>
              {tracks.length === 0 && !loading && (
                <div className="text-center py-32">
                  <Music2 className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-foreground font-display font-semibold mb-1">Start listening</p>
                  <p className="text-sm text-muted-foreground">Search for your favorite artists and songs</p>
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
