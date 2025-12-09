// Backend-ready type definitions for Spookify

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "basic" | "premium";
  following: number;
  followers: number;
  createdAt: Date;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  monthlyListeners: number;
  followers: number;
  bio?: string;
  isFollowing: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  coverImage: string;
  releaseDate: Date;
  songs: Song[];
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  album?: Album;
  coverImage: string;
  duration: number; // in seconds
  isLiked: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  owner: User;
  songs: Song[];
  isPublic: boolean;
  createdAt: Date;
}

export interface Genre {
  id: string;
  name: string;
  gradient: string;
  slug: string;
}

export interface SearchResult {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

// Player state
export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  shuffle: boolean;
  repeat: "off" | "one" | "all";
  queue: Song[];
}

// API response types (for future backend integration)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
