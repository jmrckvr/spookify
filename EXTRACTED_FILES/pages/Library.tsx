import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Plus, Search } from "lucide-react";
import FilterPills from "@/components/shared/FilterPills";
import MediaCard from "@/components/shared/MediaCard";
import { mockPlaylists, mockAlbums, mockArtists } from "@/data/mockData";
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
import { useToast } from "@/hooks/use-toast";

const filterOptions = ["All", "Playlists", "Albums", "Artists"];

const LibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || "All";
  const [activeFilter, setActiveFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const { toast } = useToast();

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      toast({
        title: "Playlist created",
        description: `"${newPlaylistName}" has been created.`,
      });
      setShowCreatePlaylist(false);
      setNewPlaylistName("");
      setNewPlaylistDescription("");
    }
  };

  const filteredPlaylists = mockPlaylists.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = mockAlbums.filter((a) =>
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtists = mockArtists.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeFilter) {
      case "Playlists":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPlaylists.map((playlist) => (
              <MediaCard
                key={playlist.id}
                type="playlist"
                title={playlist.name}
                subtitle={`${playlist.songs.length} songs`}
                image={
                  playlist.coverImage ||
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
                }
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              />
            ))}
          </div>
        );
      case "Albums":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAlbums.map((album) => (
              <MediaCard
                key={album.id}
                type="album"
                title={album.title}
                subtitle={album.artist.name}
                image={album.coverImage}
                onClick={() => navigate(`/album/${album.id}`)}
              />
            ))}
          </div>
        );
      case "Artists":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredArtists.map((artist) => (
              <MediaCard
                key={artist.id}
                type="artist"
                title={artist.name}
                subtitle={`${(artist.monthlyListeners / 1000000).toFixed(
                  1
                )}M listeners`}
                image={artist.image}
                isCircle
                onClick={() => navigate(`/artist/${artist.id}`)}
              />
            ))}
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Mix of playlists, albums, and artists */}
            {filteredPlaylists.slice(0, 5).map((playlist) => (
              <MediaCard
                key={playlist.id}
                type="playlist"
                title={playlist.name}
                subtitle={`${playlist.songs.length} songs`}
                image={
                  playlist.coverImage ||
                  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"
                }
                onClick={() => navigate(`/playlist/${playlist.id}`)}
              />
            ))}
            {filteredArtists.slice(0, 5).map((artist) => (
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
        );
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <FilterPills
          options={filterOptions}
          activeOption={activeFilter}
          onChange={setActiveFilter}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mb-6">
        <button
          onClick={() => setShowCreatePlaylist(true)}
          className="w-10 h-10 rounded-md bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search in library"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 bg-secondary rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-48"
          />
        </div>
      </div>

      {/* Content */}
      {renderContent()}

      {/* Create Playlist Dialog */}
      <Dialog open={showCreatePlaylist} onOpenChange={setShowCreatePlaylist}>
        <DialogContent>
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                placeholder="Add an optional description"
                value={newPlaylistDescription}
                onChange={(e) => setNewPlaylistDescription(e.target.value)}
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
            <Button onClick={handleCreatePlaylist}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LibraryPage;
