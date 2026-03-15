import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ListMusic } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useState, useCallback } from 'react';

export function BottomPlayer() {
  const {
    currentTrack, isPlaying, togglePlay, next, previous,
    volume, setVolume, progress, duration, currentTime, seekTo,
  } = usePlayer();

  const [showVolume, setShowVolume] = useState(false);

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

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[var(--player-height)] glass-surface border-t border-border">
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div className="h-full bg-muted">
          <div
            className="h-full bg-primary transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>

      <div className="flex items-center justify-between h-full px-4 pt-1">
        {/* Track info */}
        <div className="flex items-center gap-3 w-72 min-w-0">
          <img
            src={currentTrack.thumbnail}
            alt={currentTrack.title}
            className="h-12 w-12 rounded object-cover shrink-0"
          />
          <div className="min-w-0">
            <p className="font-display font-medium text-sm text-foreground truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-4">
            <button
              onClick={previous}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="h-4 w-4" fill="currentColor" />
            </button>
            <button
              onClick={togglePlay}
              className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform duration-150"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 text-background" fill="currentColor" />
              ) : (
                <Play className="h-4 w-4 text-background ml-0.5" fill="currentColor" />
              )}
            </button>
            <button
              onClick={next}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="h-4 w-4" fill="currentColor" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 w-72 justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVolume(volume === 0 ? 80 : 0)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="w-24 h-1 accent-primary bg-muted rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
