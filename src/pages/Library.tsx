import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  ArrowLeft,
  Play,
  Heart,
  MoreHorizontal,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AudioPlayer } from "@/components/AudioPlayer";
import { PlayerBar } from "@/components/PlayerBar";
import { MusicProvider } from "@/context/MusicContext";
import FilterPills from "@/components/shared/FilterPills";
import MediaCard from "@/components/shared/MediaCard";
import SongRow from "@/components/shared/SongRow";
import {
  mockPlaylists,
  mockAlbums,
  mockArtists,
  mockSongs,
} from "@/data/mockData";
import { useMusic } from "@/context/MusicContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const filterOptions = ["All", "Playlists", "Albums", "Artists", "Liked Songs"];

const LibraryContent: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlaylist, setSelectedPlaylist, songs, playlists } =
    useMusic();
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      setShowCreatePlaylist(false);
      setNewPlaylistName("");
      setNewPlaylistDescription("");
    }
  };

  const handlePlaylistClick = (playlist: any) => {
    setSelectedPlaylist(playlist);
  };

  const handleBackFromPlaylist = () => {
    setSelectedPlaylist(null);
  };

  // Use playlists from database, fallback to mock
  const playlistsToUse = playlists.length > 0 ? playlists : mockPlaylists;
  const songsToUse = songs.length > 0 ? songs : mockSongs;

  const filteredPlaylists = playlistsToUse.filter((p: any) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = mockAlbums.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtists = mockArtists.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSongs = songsToUse.filter(
    (s: any) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof s.artist === "string"
        ? s.artist.toLowerCase().includes(searchQuery.toLowerCase())
        : s.artist.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const likedSongs = songsToUse.filter((s: any) => s.isLiked);

  const renderContent = () => {
    switch (activeFilter) {
      case "Playlists":
        return filteredPlaylists.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPlaylists.map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => handlePlaylistClick(playlist)}
                className="cursor-pointer"
              >
                <MediaCard
                  type="playlist"
                  title={playlist.name}
                  subtitle={`${
                    (playlist as any).song_count ||
                    (playlist as any).songs?.length ||
                    0
                  } songs`}
                  image={playlist.coverImage}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-lg">No playlists found</p>
          </div>
        );

      case "Albums":
        return filteredAlbums.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAlbums.map((album) => (
              <MediaCard
                key={album.id}
                type="album"
                title={album.title}
                subtitle={album.artist.name}
                image={album.coverImage}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-lg">No albums found</p>
          </div>
        );

      case "Artists":
        return filteredArtists.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredArtists.map((artist) => (
              <MediaCard
                key={artist.id}
                type="artist"
                title={artist.name}
                subtitle={`${
                  ((artist.monthlyListeners || 0) / 1000000) | 0
                }M listeners`}
                image={artist.image}
                isCircle={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-lg">No artists found</p>
          </div>
        );

      case "Liked Songs":
        return likedSongs.length > 0 ? (
          <div className="space-y-2">
            {likedSongs.map((song, index) => (
              <SongRow key={song.id} song={song} index={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-lg">No liked songs yet</p>
          </div>
        );

      default:
        return (
          <div className="space-y-8">
            {/* All Items Combined Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Show all items mixed */}
              {likedSongs.length > 0 && (
                <MediaCard
                  key="liked-songs"
                  type="playlist"
                  title="Liked songs"
                  subtitle={`${likedSongs.length} songs`}
                  image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300"
                />
              )}
              {filteredPlaylists.slice(0, 4).map((playlist) => (
                <div
                  key={playlist.id}
                  onClick={() => handlePlaylistClick(playlist)}
                  className="cursor-pointer"
                >
                  <MediaCard
                    type="playlist"
                    title={playlist.name}
                    subtitle={`${playlist.songs.length} songs`}
                    image={playlist.coverImage}
                  />
                </div>
              ))}
              {filteredAlbums.slice(0, 3).map((album) => (
                <MediaCard
                  key={album.id}
                  type="album"
                  title={album.title}
                  subtitle={album.artist.name}
                  image={album.coverImage}
                />
              ))}
              {filteredArtists.slice(0, 2).map((artist) => (
                <MediaCard
                  key={artist.id}
                  type="artist"
                  title={artist.name}
                  subtitle={`${
                    ((artist.monthlyListeners || 0) / 1000000) | 0
                  }M listeners`}
                  image={artist.image}
                  isCircle={true}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {/* Playlist Detail View */}
      {selectedPlaylist ? (
        <>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-b from-blue-900/40 to-background pt-8 pb-12">
            <div className="px-6 flex gap-8 items-end mb-8">
              {/* Back Button */}
              <button
                onClick={handleBackFromPlaylist}
                className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              {/* Playlist Cover */}
              <div className="w-48 h-48 rounded-lg shadow-2xl overflow-hidden flex-shrink-0 mt-8">
                <img
                  src={selectedPlaylist.coverImage}
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

          {/* Songs List */}
          <div className="px-6 py-6">
            <div className="space-y-2">
              {songs && songs.length > 0 ? (
                songs.map((song: any, index: number) => (
                  <SongRow key={song.id} song={song} index={index} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <p className="text-lg">No songs in this playlist</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Header */}
          <div className="p-6 border-b border-border/30">
            {/* Filter Pills and Search */}
            <div className="flex items-center justify-between gap-4">
              <FilterPills
                options={filterOptions}
                activeOption={activeFilter}
                onChange={setActiveFilter}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6">{renderContent()}</div>
        </>
      )}

      {/* Create Playlist Dialog */}
      <Dialog open={showCreatePlaylist} onOpenChange={setShowCreatePlaylist}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Create a playlist</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Playlist Name</Label>
              <Input
                id="name"
                placeholder="My Playlist"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="bg-secondary border-border focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Add an optional description"
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
                className="bg-secondary border-border focus:ring-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCreatePlaylist(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreatePlaylist}
              className="bg-primary hover:bg-primary/90"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LibraryPage: React.FC = () => {
  return (
    <MusicProvider>
      <div className="h-screen flex flex-col bg-background overflow-hidden">
        <Navbar onAuthClick={() => {}} showLibrarySearch={true} />
        <AudioPlayer />

        <main className="flex-1 overflow-y-auto scrollbar-thin bg-background">
          <LibraryContent />
        </main>

        <PlayerBar />
      </div>
    </MusicProvider>
  );
};

export default LibraryPage;
