import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Volume1, Shuffle, Repeat } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { useState, useCallback } from 'react';

export function BottomPlayer() {
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
    <div className="fixed bottom-0 left-0 right-0 z-50 h-[var(--player-height)] glass-surface border-t border-border/50">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 group">
        <div
          className="h-1 cursor-pointer group-hover:h-1.5 transition-all"
          onClick={handleProgressClick}
        >
          <div className="h-full bg-muted/50">
            <div
              className="h-full bg-primary transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-primary/30"
          style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>

      <div className="flex items-center justify-between h-full px-5 pt-1">
        {/* Track info */}
        <div className="flex items-center gap-4 w-80 min-w-0">
          <div className="relative shrink-0">
            <img
              src={currentTrack.thumbnail}
              alt={currentTrack.title}
              className="h-12 w-12 rounded-md object-cover shadow-lg"
            />
            {isPlaying && (
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
            )}
          </div>
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-foreground truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-5">
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Shuffle className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={previous}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="h-4 w-4" fill="currentColor" />
            </button>
            <button
              onClick={togglePlay}
              className="h-9 w-9 rounded-full bg-foreground flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-150"
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
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Repeat className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground tabular-nums">
            <span className="w-8 text-right">{formatTime(currentTime)}</span>
            <span className="text-muted-foreground/40">/</span>
            <span className="w-8">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-3 w-80 justify-end">
          <button
            onClick={() => setVolume(volume === 0 ? 80 : 0)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <VolumeIcon className="h-4 w-4" />
          </button>
          <div
            className="w-24 h-1 bg-muted/50 rounded-full cursor-pointer relative group"
            onClick={handleVolumeClick}
          >
            <div
              className="h-full bg-foreground/70 rounded-full transition-[width] group-hover:bg-primary"
              style={{ width: `${volume}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${volume}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
