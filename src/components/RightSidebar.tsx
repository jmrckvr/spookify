import { X, Play, Heart } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { useState } from "react";

export function RightSidebar() {
  const { currentSong, queue, playSong } = usePlayer();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <aside className="w-80 bg-card border-l border-border overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-border p-4 flex items-center justify-between z-10">
        <h3 className="text-lg font-bold text-foreground">Queue</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Now Playing */}
      {currentSong && (
        <div className="p-4 border-b border-border/50">
          <p className="text-xs uppercase font-semibold text-muted-foreground mb-3">
            Now Playing
          </p>
          <div className="flex gap-3 items-start">
            <img
              src={currentSong.coverImage}
              alt={currentSong.title}
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {currentSong.title}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {currentSong.artist.name}
              </p>
              <div className="flex gap-2 mt-2">
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next Up */}
      <div className="p-4">
        <p className="text-xs uppercase font-semibold text-muted-foreground mb-3">
          Next Up
        </p>
        <div className="space-y-3">
          {queue.slice(0, 10).map((song, index) => (
            <div
              key={`${song.id}-${index}`}
              onClick={() => playSong(song)}
              className="flex gap-3 items-start cursor-pointer group hover:bg-secondary/50 p-2 rounded transition-colors"
            >
              <img
                src={song.coverImage}
                alt={song.title}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary">
                  {song.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {song.artist.name}
                </p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                <Play className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
