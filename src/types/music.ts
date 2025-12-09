export interface Artist {
  id: string;
  name: string;
  image: string;
  monthlyListeners?: number;
  followers?: number;
  isFollowing?: boolean;
  genres?: string[];
}

export interface Album {
  id: string;
  title: string;
  artist: Artist;
  coverImage: string;
  releaseDate: Date;
  songs?: Song[];
  totalTracks?: number;
}

export interface Genre {
  id: string;
  name: string;
  gradient: string;
  slug: string;
}

export interface Song {
  id: string;
  title: string;
  artist: Artist;
  album?: Album;
  coverImage: string;
  duration: number;
  isLiked?: boolean;
  url?: string;
  playCount?: number;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  coverImage: string;
  owner?: User;
  isPublic?: boolean;
  createdAt?: Date;
  description?: string;
  songCount?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan?: string;
  following?: number;
  followers?: number;
  createdAt?: Date;
  avatar?: string;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  shuffle: boolean;
  repeat: "off" | "one" | "all";
  queue: Song[];
}
