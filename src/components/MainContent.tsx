import { useMusic } from "@/context/MusicContext";
import { SongCard } from "./SongCard";
import { Music, Play, Heart, MoreHorizontal } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import MediaCard from "@/components/shared/MediaCard";
import SongRow from "@/components/shared/SongRow";
import {
  mockArtists,
  mockAlbums,
  mockPlaylists,
  mockSongs,
  yourMixes,
} from "@/data/mockData";
import { usePlayer } from "@/context/PlayerContext";

export function MainContent() {
  const { songs, selectedPlaylist, searchQuery } = useMusic();
  const { playSong } = usePlayer();

  const displaySongs = selectedPlaylist ? songs : songs;

  const filteredSongs = displaySongs.filter((song) => {
    const query = searchQuery.toLowerCase();
    return [song.title, song.artist, song.album]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(query));
  });

  // If a playlist is selected, show Spotify-style playlist view
  if (selectedPlaylist) {
    return (
      <main className="flex-1 overflow-y-auto scrollbar-thin bg-background">
        {/* Hero Section with Gradient Background */}
        <div className="relative bg-gradient-to-b from-blue-900/40 to-background pt-8 pb-12">
          <div className="px-6 flex gap-8 items-end mb-8">
            {/* Playlist Cover */}
            <div className="w-48 h-48 rounded-lg shadow-2xl overflow-hidden flex-shrink-0">
              <img
                src={
                  selectedPlaylist.coverImage ||
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
                }
                alt={selectedPlaylist.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Playlist Info */}
            <div className="pb-4">
              <p className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                Playlist
              </p>
              <h1 className="text-6xl font-bold text-foreground mb-4 line-clamp-3">
                {selectedPlaylist.name}
              </h1>
              {selectedPlaylist.description && (
                <p className="text-lg text-muted-foreground mb-6">
                  {selectedPlaylist.description}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {songs.length} songs
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 flex gap-4 items-center">
            <button className="w-12 h-12 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-all">
              <Play className="w-5 h-5 fill-current" />
            </button>
            <button className="text-3xl text-muted-foreground hover:text-foreground transition-colors">
              <Heart className="w-8 h-8" />
            </button>
            <button className="text-3xl text-muted-foreground hover:text-foreground transition-colors">
              <MoreHorizontal className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 py-4 border-b border-border/30 flex gap-8">
          <button className="text-sm font-semibold text-foreground border-b-2 border-primary pb-4">
            All
          </button>
          <button className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors pb-4">
            Music
          </button>
          <button className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors pb-4">
            Podcasts
          </button>
        </div>

        {/* Songs List */}
        <div className="px-6 py-6">
          <div className="space-y-2">
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <SongRow key={song.id} song={song} index={index} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                <Music className="h-16 w-16 mb-4 opacity-50" />
                <p className="text-lg">No songs in this playlist</p>
              </div>
            )}
          </div>
        </div>
      </main>
    );
  }

  // Default home view
  return (
    <main className="flex-1 overflow-y-auto scrollbar-thin p-6 bg-background">
      {/* Browse All Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Browse All</h2>
        <p className="text-sm text-muted-foreground">
          {filteredSongs.length} songs available
        </p>
      </div>

      {filteredSongs.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSongs.map((song) => (
            <SongCard key={song.id} song={song} showTransfer={false} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Music className="h-16 w-16 mb-4 opacity-50" />
          <p className="text-lg">
            {searchQuery ? "No songs found" : "No songs available"}
          </p>
        </div>
      )}
    </main>
  );
}
