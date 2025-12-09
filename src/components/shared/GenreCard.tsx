import React from "react";
import { Link } from "react-router-dom";
import { Genre } from "@/types/music";
import { cn } from "@/lib/utils";

interface GenreCardProps {
  genre: Genre;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  return (
    <Link to={`/genre/${genre.slug}`} className="group">
      <div
        className={cn(
          "w-full h-48 rounded-xl p-6 flex items-end cursor-pointer",
          "transition-all duration-300 ease-out",
          "hover:shadow-2xl hover:scale-105 active:scale-95",
          genre.gradient
        )}
      >
        <h3 className="text-3xl font-bold text-white drop-shadow-lg">
          {genre.name}
        </h3>
      </div>
    </Link>
  );
};

export default GenreCard;
