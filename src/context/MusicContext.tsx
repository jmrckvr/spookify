import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Song, Playlist, User } from "@/types/music";

interface MusicContextType {
  songs: Song[];
  playlists: Playlist[];
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  user: User | null;
  selectedPlaylist: Playlist | null;
  searchQuery: string;

  setCurrentSong: (song: Song | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  setUser: (user: User | null) => void;
  setSelectedPlaylist: (playlist: Playlist | null) => void;
  setSearchQuery: (query: string) => void;

  addSongToPlaylist: (song: Song, playlistId: string) => void;
  removeSongFromPlaylist: (songId: string, playlistId: string) => void;
  transferSong: (songId: string, fromPlaylistId: string, toPlaylistId: string) => void;
  createPlaylist: (name: string) => void;
  playNext: () => void;
  playPrevious: () => void;
  deletePlaylist: (playlistId: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch playlists from PHP API
  useEffect(() => {
    const fetchPlaylists = async () => {
      const res = await fetch(`/api/getPlaylists.php?user_id=${user?.id || 1}`);
      const data = await res.json();
      setPlaylists(data);
    };
    fetchPlaylists();
  }, [user]);

  // Fetch songs when a playlist is selected
  useEffect(() => {
    const fetchSongs = async () => {
      if (!selectedPlaylist) return;
      const res = await fetch(`/api/getSongs.php?playlist_id=${selectedPlaylist.id}`);
      const data = await res.json();
      setSongs(data);
    };
    fetchSongs();
  }, [selectedPlaylist]);

  const createPlaylist = async (name: string) => {
    const res = await fetch("/api/createPlaylist.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, user_id: user?.id || 1 }),
    });
    const newPlaylist = await res.json();
    setPlaylists(prev => [...prev, newPlaylist]);
  };

  const deletePlaylist = async (playlistId: string) => {
    await fetch("/api/deletePlaylist.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: playlistId }),
    });

    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
    if (selectedPlaylist?.id === playlistId) {
      setSelectedPlaylist(null);
    }
  };

  return (
    <MusicContext.Provider
      value={{
        songs,
        playlists,
        currentSong,
        isPlaying,
        volume,
        progress,
        user,
        selectedPlaylist,
        searchQuery,
        setCurrentSong,
        setIsPlaying,
        setVolume,
        setProgress,
        setUser,
        setSelectedPlaylist,
        setSearchQuery,
        addSongToPlaylist: () => { }, // implement with API
        removeSongFromPlaylist: () => { }, // implement with API
        transferSong: () => { }, // implement with API
        createPlaylist,
        playNext: () => { },
        playPrevious: () => { },
        deletePlaylist,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used within a MusicProvider");
  return context;
}