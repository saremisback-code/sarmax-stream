import { Play, Pause, Plus, Check } from 'lucide-react';
import { usePlayer, Track } from '@/context/PlayerContext';
import { useState } from 'react';

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  const { play, addToQueue, currentTrack, isPlaying } = usePlayer();
  const isActive = currentTrack?.id === track.id;
  const [queued, setQueued] = useState(false);

  const handleQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToQueue(track);
    setQueued(true);
    setTimeout(() => setQueued(false), 1500);
  };

  return (
    <div
      className="group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:bg-secondary/50 p-3"
      onClick={() => play(track)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary mb-3 shadow-lg shadow-background/50">
        <img
          src={track.thumbnail}
          alt={track.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-end justify-end p-2">
          <button
            className={`h-11 w-11 rounded-full bg-primary shadow-xl shadow-primary/30 flex items-center justify-center transition-all duration-200 ${
              isActive
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
            } hover:scale-105 active:scale-95`}
            onClick={(e) => {
              e.stopPropagation();
              play(track);
            }}
          >
            {isActive && isPlaying ? (
              <Pause className="h-5 w-5 text-primary-foreground" fill="currentColor" />
            ) : (
              <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
            )}
          </button>
        </div>
        {/* Duration badge */}
        <span className="absolute bottom-2 left-2 bg-background/80 text-foreground text-[10px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm">
          {track.duration}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className={`font-display font-semibold text-sm truncate leading-tight ${isActive ? 'text-primary' : 'text-foreground'}`}>
          {track.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {track.artist}
        </p>
      </div>

      {/* Add to queue */}
      <button
        onClick={handleQueue}
        className={`absolute top-5 right-5 h-7 w-7 rounded-full flex items-center justify-center transition-all duration-200 ${
          queued
            ? 'bg-primary text-primary-foreground opacity-100'
            : 'bg-background/70 backdrop-blur-sm text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100'
        }`}
        title="Add to queue"
      >
        {queued ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
