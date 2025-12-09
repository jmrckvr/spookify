import React from "react";
import { Link } from "react-router-dom";
import { Genre } from "@/types/music";
import { cn } from "@/lib/utils";

interface GenreCardProps {
  genre: Genre;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  return (
    <Link to={`/genre/${genre.slug}`} className="genre-card">
      <div className={cn("w-full h-full p-4 flex items-start", genre.gradient)}>
        <h3 className="text-xl font-bold text-foreground">{genre.name}</h3>
      </div>
    </Link>
  );
};

export default GenreCard;
