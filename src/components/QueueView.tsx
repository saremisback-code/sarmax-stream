import { X, GripVertical, Play } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

export function QueueView() {
  const { queue, removeFromQueue, currentTrack, play } = usePlayer();

  return (
    <div className="animate-fade-in">
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Queue</h1>

      {currentTrack && (
        <div className="mb-8">
          <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
            Now Playing
          </h2>
          <div className="flex items-center gap-3 p-3 rounded bg-secondary/50">
            <img src={currentTrack.thumbnail} alt="" className="h-10 w-10 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-medium text-foreground truncate">{currentTrack.title}</p>
              <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
            </div>
            <span className="text-xs text-muted-foreground">{currentTrack.duration}</span>
          </div>
        </div>
      )}

      <h2 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
        Up Next · {queue.length} tracks
      </h2>

      {queue.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          Queue is empty. Add songs to get started.
        </p>
      ) : (
        <div className="space-y-1">
          {queue.map((track, i) => (
            <div
              key={`${track.id}-${i}`}
              className="flex items-center gap-3 p-3 rounded hover:bg-secondary/50 group transition-colors"
            >
              <span className="text-xs text-muted-foreground w-5 text-right">{i + 1}</span>
              <img src={track.thumbnail} alt="" className="h-10 w-10 rounded object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-medium text-foreground truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground">{track.duration}</span>
              <button
                onClick={() => play(track)}
                className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeFromQueue(i)}
                className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
