export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  cover: string;
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
