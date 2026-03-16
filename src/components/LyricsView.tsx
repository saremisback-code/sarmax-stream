import { Mic2, ExternalLink } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useState, useEffect } from 'react';

interface LyricsData {
  lyrics: string;
  source: string;
}

async function fetchLyrics(title: string, artist: string): Promise<LyricsData | null> {
  try {
    // Use lyrics.ovh free API
    const res = await fetch(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.lyrics) {
      return { lyrics: data.lyrics, source: 'lyrics.ovh' };
    }
    return null;
  } catch {
    return null;
  }
}

export function LyricsView() {
  const { currentTrack } = usePlayer();
  const [lyrics, setLyrics] = useState<LyricsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!currentTrack) {
      setLyrics(null);
      setNotFound(false);
      return;
    }

    setLoading(true);
    setNotFound(false);
    setLyrics(null);

    fetchLyrics(currentTrack.title, currentTrack.artist).then(result => {
      if (result) {
        setLyrics(result);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [currentTrack?.id]);

  if (!currentTrack) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <Mic2 className="h-12 w-12 text-muted-foreground/20 mb-4" />
        <p className="font-display font-semibold text-foreground mb-1">No track playing</p>
        <p className="text-sm text-muted-foreground">Play a song to see lyrics</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      {/* Track header */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={currentTrack.thumbnail}
          alt={currentTrack.title}
          className="h-16 w-16 rounded-lg object-cover shadow-lg"
        />
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold text-foreground truncate">
            {currentTrack.title}
          </h2>
          <p className="text-sm text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Lyrics content */}
      {loading ? (
        <div className="space-y-3 py-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-5 bg-muted/30 rounded animate-pulse" style={{ width: `${50 + Math.random() * 40}%` }} />
          ))}
        </div>
      ) : lyrics ? (
        <div className="space-y-1">
          {lyrics.lyrics.split('\n').map((line, i) => (
            <p
              key={i}
              className={`font-display text-lg leading-relaxed transition-colors ${
                line.trim() === '' ? 'h-6' : 'text-foreground/80 hover:text-foreground'
              }`}
            >
              {line}
            </p>
          ))}
          <div className="flex items-center gap-1.5 pt-8 text-[11px] text-muted-foreground/50">
            <ExternalLink className="h-3 w-3" />
            <span>Source: {lyrics.source}</span>
          </div>
        </div>
      ) : notFound ? (
        <div className="text-center py-16">
          <Mic2 className="h-10 w-10 text-muted-foreground/20 mx-auto mb-4" />
          <p className="font-display font-semibold text-foreground mb-1">Lyrics not found</p>
          <p className="text-sm text-muted-foreground">
            We couldn't find lyrics for "{currentTrack.title}" by {currentTrack.artist}
          </p>
        </div>
      ) : null}
    </div>
  );
}
