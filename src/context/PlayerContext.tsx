/// <reference types="youtube" />
import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  queue: Track[];
  volume: number;
  progress: number;
  duration: number;
  currentTime: number;
}

interface PlayerContextType extends PlayerState {
  play: (track: Track) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (v: number) => void;
  seekTo: (seconds: number) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  playerRef: React.MutableRefObject<YT.Player | null>;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YT;
  }
}

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    queue: [],
    volume: 80,
    progress: 0,
    duration: 0,
    currentTime: 0,
  });

  const playerRef = useRef<YT.Player | null>(null);
  const intervalRef = useRef<number | null>(null);
  const apiReady = useRef(false);
  const pendingVideoId = useRef<string | null>(null);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      apiReady.current = true;
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      apiReady.current = true;
      if (pendingVideoId.current) {
        createPlayer(pendingVideoId.current);
        pendingVideoId.current = null;
      }
    };
  }, []);

  const startProgressTracking = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        setState(prev => ({
          ...prev,
          currentTime,
          duration,
          progress: duration > 0 ? (currentTime / duration) * 100 : 0,
        }));
      }
    }, 500);
  }, []);

  const createPlayer = useCallback((videoId: string) => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId);
      return;
    }

    // Ensure container exists
    let container = document.getElementById('yt-player-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'yt-player-container';
      container.style.position = 'absolute';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.style.width = '1px';
      container.style.height = '1px';
      document.body.appendChild(container);
    }

    const playerDiv = document.createElement('div');
    playerDiv.id = 'yt-player';
    container.innerHTML = '';
    container.appendChild(playerDiv);

    playerRef.current = new window.YT.Player('yt-player', {
      height: '1',
      width: '1',
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
      },
      events: {
        onReady: (event: YT.PlayerEvent) => {
          event.target.setVolume(state.volume);
          event.target.playVideo();
          startProgressTracking();
        },
        onStateChange: (event: YT.OnStateChangeEvent) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setState(prev => ({ ...prev, isPlaying: true }));
            startProgressTracking();
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setState(prev => ({ ...prev, isPlaying: false }));
          } else if (event.data === window.YT.PlayerState.ENDED) {
            // Auto-play next in queue
            setState(prev => {
              if (prev.queue.length > 0) {
                const [nextTrack, ...rest] = prev.queue;
                setTimeout(() => createPlayer(nextTrack.id), 0);
                return { ...prev, currentTrack: nextTrack, queue: rest, isPlaying: true };
              }
              return { ...prev, isPlaying: false, progress: 0, currentTime: 0 };
            });
          }
        },
      },
    });
  }, [state.volume, startProgressTracking]);

  const play = useCallback((track: Track) => {
    setState(prev => ({ ...prev, currentTrack: track, isPlaying: true, progress: 0, currentTime: 0 }));
    if (apiReady.current) {
      createPlayer(track.id);
    } else {
      pendingVideoId.current = track.id;
    }
  }, [createPlayer]);

  const togglePlay = useCallback(() => {
    if (!playerRef.current) return;
    if (state.isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }, [state.isPlaying]);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
  }, []);

  const resume = useCallback(() => {
    playerRef.current?.playVideo();
  }, []);

  const next = useCallback(() => {
    setState(prev => {
      if (prev.queue.length > 0) {
        const [nextTrack, ...rest] = prev.queue;
        setTimeout(() => createPlayer(nextTrack.id), 0);
        return { ...prev, currentTrack: nextTrack, queue: rest };
      }
      return prev;
    });
  }, [createPlayer]);

  const previous = useCallback(() => {
    if (playerRef.current && playerRef.current.getCurrentTime() > 3) {
      playerRef.current.seekTo(0, true);
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    setState(prev => ({ ...prev, volume: v }));
    playerRef.current?.setVolume(v);
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setState(prev => ({ ...prev, queue: [...prev.queue, track] }));
  }, []);

  const removeFromQueue = useCallback((index: number) => {
    setState(prev => ({
      ...prev,
      queue: prev.queue.filter((_, i) => i !== index),
    }));
  }, []);

  return (
    <PlayerContext.Provider value={{
      ...state,
      play, togglePlay, pause, resume, next, previous,
      setVolume, seekTo, addToQueue, removeFromQueue, playerRef,
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
