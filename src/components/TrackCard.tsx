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
      className="group relative rounded-lg cursor-pointer transition-all duration-200 hover:bg-card p-2.5"
      onClick={() => play(track)}
    >
      {/* Thumbnail — square, music-style */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary mb-2.5">
        <img
          src={track.thumbnail}
          alt={track.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-200" />
        
        {/* Play button overlay */}
        <button
          className={`absolute bottom-2 right-2 h-10 w-10 rounded-full bg-primary shadow-xl shadow-background/50 flex items-center justify-center transition-all duration-200 ${
            isActive
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0'
          } hover:scale-105 active:scale-95`}
          onClick={(e) => {
            e.stopPropagation();
            play(track);
          }}
        >
          {isActive && isPlaying ? (
            <Pause className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          ) : (
            <Play className="h-4 w-4 text-primary-foreground ml-0.5" fill="currentColor" />
          )}
        </button>

        {/* Add to queue */}
        <button
          onClick={handleQueue}
          className={`absolute top-2 right-2 h-6 w-6 rounded-full flex items-center justify-center transition-all duration-200 ${
            queued
              ? 'bg-primary text-primary-foreground opacity-100'
              : 'bg-background/60 backdrop-blur-sm text-foreground/80 hover:text-foreground opacity-0 group-hover:opacity-100'
          }`}
          title="Add to queue"
        >
          {queued ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
        </button>
      </div>

      {/* Info */}
      <div className="px-0.5 space-y-0.5">
        <p className={`font-display font-semibold text-[13px] line-clamp-2 leading-tight ${isActive ? 'text-primary' : 'text-foreground'}`}>
          {track.title}
        </p>
        <p className="text-[11px] text-muted-foreground truncate">
          {track.artist}
        </p>
      </div>
    </div>
  );
}
