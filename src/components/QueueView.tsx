import { X, Play, Music2 } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

export function QueueView() {
  const { queue, removeFromQueue, currentTrack, play } = usePlayer();

  return (
    <div className="animate-fade-in max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Queue</h1>

      {currentTrack && (
        <div className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-4">
            Now Playing
          </h2>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/40 border border-border/30">
            <img src={currentTrack.thumbnail} alt="" className="h-14 w-14 rounded-lg object-cover shadow-lg" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold text-primary truncate">{currentTrack.title}</p>
              <p className="text-sm text-muted-foreground truncate mt-0.5">{currentTrack.artist}</p>
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">{currentTrack.duration}</span>
          </div>
        </div>
      )}

      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground/60 mb-4">
        Up Next · {queue.length} {queue.length === 1 ? 'track' : 'tracks'}
      </h2>

      {queue.length === 0 ? (
        <div className="text-center py-16">
          <Music2 className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">
            Your queue is empty
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Add songs by clicking the + button on any track
          </p>
        </div>
      ) : (
        <div className="space-y-0.5">
          {queue.map((track, i) => (
            <div
              key={`${track.id}-${i}`}
              className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary/40 group transition-colors"
            >
              <span className="text-xs text-muted-foreground/50 w-5 text-right tabular-nums font-medium">
                {i + 1}
              </span>
              <img src={track.thumbnail} alt="" className="h-10 w-10 rounded-md object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-sm font-medium text-foreground truncate">{track.title}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{track.artist}</p>
              </div>
              <span className="text-xs text-muted-foreground tabular-nums">{track.duration}</span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => play(track)}
                  className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
                </button>
                <button
                  onClick={() => removeFromQueue(i)}
                  className="h-7 w-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-secondary transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
