import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MediaCard from "@/components/shared/MediaCard";
import GenreCard from "@/components/shared/GenreCard";
import { genres, mockSongs, mockArtists, mockAlbums } from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";

const ExplorePage: React.FC = () => {
  const navigate = useNavigate();
  const { playSong } = usePlayer();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleGenreClick = (slug: string) => {
    setSelectedGenre(slug);
  };

  if (selectedGenre) {
    const genre = genres.find((g) => g.slug === selectedGenre);
    return (
      <div className="container mx-auto px-6 py-8 animate-fade-in">
        <button
          onClick={() => setSelectedGenre(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Explore</span>
        </button>

        <h1 className="text-4xl font-bold text-foreground mb-8">
          {genre?.name}
        </h1>

        <section className="mb-10">
          <SectionHeader title="Popular in this genre" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockSongs.slice(0, 5).map((song) => (
              <MediaCard
                key={song.id}
                type="song"
                title={song.title}
                subtitle={song.artist.name}
                image={song.coverImage}
                song={song}
                onClick={() => playSong(song)}
              />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeader title="Artists" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mockArtists.slice(0, 5).map((artist) => (
              <MediaCard
                key={artist.id}
                type="artist"
                title={artist.name}
                image={artist.image}
                isCircle
                onClick={() => navigate(`/artist/${artist.id}`)}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <h1 className="text-4xl font-bold text-foreground mb-8">Explore</h1>

      {/* Genre Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {genres.map((genre) => (
          <div key={genre.id} onClick={() => handleGenreClick(genre.slug)}>
            <GenreCard genre={genre} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
