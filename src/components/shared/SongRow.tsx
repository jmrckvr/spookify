import React from "react";
import { Heart, Plus, MoreHorizontal, Play } from "lucide-react";
import { useMusic } from "@/context/MusicContext";
import { Song } from "@/types/music";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SongRowProps {
  song: Song;
  index?: number;
  showIndex?: boolean;
}

const SongRow: React.FC<SongRowProps> = ({ song, index, showIndex = true }) => {
  const { setCurrentSong, setIsPlaying, currentSong, isPlaying } = useMusic();

  const isCurrentSong = currentSong?.id === song.id;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group",
        isCurrentSong && "bg-accent"
      )}
      onClick={() => {
        setCurrentSong(song);
        setIsPlaying(true);
      }}
    >
      {/* Index / Play indicator */}
      {showIndex && (
        <div className="w-6 text-center text-muted-foreground group-hover:hidden">
          {index !== undefined ? index + 1 : ""}
        </div>
      )}
      <button className="w-6 hidden group-hover:flex items-center justify-center text-foreground">
        <Play className="w-4 h-4 fill-current" />
      </button>

      {/* Cover Image */}
      <img
        src={song.coverImage}
        alt={song.title}
        className="w-12 h-12 rounded object-cover"
      />

      {/* Song Info */}
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "font-medium truncate",
            isCurrentSong ? "text-primary" : "text-foreground"
          )}
        >
          {song.title}
        </p>
        <p className="text-sm text-muted-foreground truncate">
          {song.artist.name}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Heart
            className={cn(
              "w-5 h-5",
              song.isLiked && "fill-primary text-primary"
            )}
          />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Plus className="w-5 h-5" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Add to playlist</DropdownMenuItem>
            <DropdownMenuItem>Go to artist</DropdownMenuItem>
            <DropdownMenuItem>Go to album</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Share</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Duration */}
      <span className="text-sm text-muted-foreground w-12 text-right">
        {formatDuration(song.duration)}
      </span>
    </div>
  );
};

export default SongRow;
