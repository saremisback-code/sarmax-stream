import { Play, MoreHorizontal, Plus } from 'lucide-react';
import { usePlayer, Track } from '@/context/PlayerContext';

interface TrackCardProps {
  track: Track;
}

export function TrackCard({ track }: TrackCardProps) {
  const { play, addToQueue, currentTrack, isPlaying } = usePlayer();
  const isActive = currentTrack?.id === track.id;

  return (
    <div
      className={`group relative rounded overflow-hidden cursor-pointer transition-all duration-150 hover:scale-[1.02] ${
        isActive ? 'ring-1 ring-primary' : ''
      }`}
      onClick={() => play(track)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={track.thumbnail}
          alt={track.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <Play className="h-5 w-5 text-primary-foreground ml-0.5" fill="currentColor" />
          </div>
        </div>
        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-[10px] font-medium px-1.5 py-0.5 rounded">
          {track.duration}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="font-display font-medium text-sm text-foreground truncate leading-tight">
          {track.title}
        </p>
        <p className="text-xs text-muted-foreground mt-1 truncate">
          {track.artist}
        </p>
      </div>

      {/* Add to queue */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          addToQueue(track);
        }}
        className="absolute top-2 right-2 h-7 w-7 rounded bg-background/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground"
        title="Add to queue"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
