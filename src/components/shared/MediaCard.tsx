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
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="relative mb-4 overflow-hidden">
        <div
          className={cn(
            "w-full aspect-square object-cover shadow-lg transition-all duration-300 group-hover:shadow-2xl",
            isArtist ? "rounded-full" : "rounded-lg"
          )}
        >
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        {/* Play Button Overlay */}
        {(type === "song" ||
          type === "album" ||
          type === "playlist" ||
          type === "mix") && (
          <button
            onClick={handlePlay}
            className={cn(
              "absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg",
              "opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0",
              "flex items-center justify-center"
            )}
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
        )}
      </div>

      {/* Text Content */}
      <div className="px-1">
        <h3 className="font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1 group-hover:text-muted-foreground/90 transition-colors">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default MediaCard;
