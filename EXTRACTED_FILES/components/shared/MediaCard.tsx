import React from "react";
import { Play } from "lucide-react";
import { usePlayer } from "@/context/PlayerContext";
import { Song, Artist, Album, Playlist } from "@/types/music";
import { cn } from "@/lib/utils";

interface MediaCardProps {
  type: "song" | "artist" | "album" | "playlist" | "mix";
  title: string;
  subtitle?: string;
  image: string;
  onClick?: () => void;
  song?: Song;
  isCircle?: boolean;
}

const MediaCard: React.FC<MediaCardProps> = ({
  type,
  title,
  subtitle,
  image,
  onClick,
  song,
  isCircle = false,
}) => {
  const { playSong } = usePlayer();

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (song) {
      playSong(song);
    }
  };

  const isArtist = type === "artist" || isCircle;

  return (
    <div className="media-card group" onClick={onClick}>
      <div className="relative">
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full aspect-square object-cover shadow-lg transition-transform duration-300 group-hover:scale-[1.02]",
            isArtist ? "rounded-full" : "rounded-md"
          )}
        />
        {(type === "song" ||
          type === "album" ||
          type === "playlist" ||
          type === "mix") && (
          <button onClick={handlePlay} className="play-button-overlay">
            <Play className="w-5 h-5 fill-current text-primary-foreground ml-0.5" />
          </button>
        )}
      </div>
      <h3 className="font-semibold text-foreground mt-3 truncate">{title}</h3>
      {subtitle && (
        <p className="text-sm text-muted-foreground truncate mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default MediaCard;
