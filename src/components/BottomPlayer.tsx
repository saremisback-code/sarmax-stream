import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1, Shuffle, Repeat, Mic2 } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useCallback } from 'react';

interface BottomPlayerProps {
  onLyricsToggle?: () => void;
  lyricsActive?: boolean;
}

export function BottomPlayer({ onLyricsToggle, lyricsActive }: BottomPlayerProps) {
  const {
    currentTrack, isPlaying, togglePlay, next, previous,
    volume, setVolume, progress, duration, currentTime, seekTo,
  } = usePlayer();

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    seekTo(pct * duration);
  }, [duration, seekTo]);

  const handleVolumeClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    setVolume(Math.round(pct * 100));
  }, [setVolume]);

  if (!currentTrack) return null;

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[var(--player-height)] glass-surface border-t border-border/30">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 group cursor-pointer" onClick={handleProgressClick}>
        <div className="h-[3px] group-hover:h-1 transition-all duration-150">
          <div className="h-full bg-muted/40 relative">
            <div
              className="h-full bg-primary transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>

      <div className="flex items-center justify-between h-full px-4 pt-0.5">
        {/* Track info */}
        <div className="flex items-center gap-3 w-[280px] min-w-0">
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className="h-11 w-11 rounded object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="font-display font-semibold text-[13px] text-foreground truncate">
              {currentTrack.title}
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-0">
          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <Shuffle className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={previous}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <SkipBack className="h-4 w-4" fill="currentColor" />
            </button>
            <button
              onClick={togglePlay}
              className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5 text-background" fill="currentColor" />
              ) : (
                <Play className="h-3.5 w-3.5 text-background ml-0.5" fill="currentColor" />
              )}
            </button>
            <button
              onClick={next}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <SkipForward className="h-4 w-4" fill="currentColor" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <Repeat className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground tabular-nums">
            <span className="w-8 text-right">{formatTime(currentTime)}</span>
            <span className="text-muted-foreground/30">·</span>
            <span className="w-8">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 w-[280px] justify-end">
          {onLyricsToggle && (
            <button
              onClick={onLyricsToggle}
              className={`transition-colors p-1 ${lyricsActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              title="Lyrics"
            >
              <Mic2 className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setVolume(volume === 0 ? 80 : 0)}
            className="text-muted-foreground hover:text-foreground transition-colors p-1"
          >
            <VolumeIcon className="h-4 w-4" />
          </button>
          <div
            className="w-20 h-1 bg-muted/40 rounded-full cursor-pointer relative group"
            onClick={handleVolumeClick}
          >
            <div
              className="h-full bg-foreground/60 rounded-full transition-[width] group-hover:bg-primary"
              style={{ width: `${volume}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${volume}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
