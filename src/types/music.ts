export interface Song {
  id: string;
  title: string;
  artist: string;   // resolved via join
  album: string;    // resolved via join
  duration: number; // keep numeric for math
  cover: string;
  url: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  cover?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}