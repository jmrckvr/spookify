import { Song, Playlist } from "@/types/music";

export const mockSongs: Song[] = [
  { id: "1", title: "Midnight Dreams", artist: "Luna Wave", album: "Nocturnal", duration: "3:45", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
  { id: "2", title: "Electric Pulse", artist: "Neon Riders", album: "Voltage", duration: "4:12", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop" },
  { id: "3", title: "Ocean Breeze", artist: "Coastal Vibes", album: "Tidal", duration: "3:28", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop" },
  { id: "4", title: "Urban Jungle", artist: "City Lights", album: "Metro", duration: "4:01", cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop" },
  { id: "5", title: "Starlight", artist: "Cosmic Echo", album: "Galaxy", duration: "5:23", cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop" },
  { id: "6", title: "Desert Wind", artist: "Sahara Sound", album: "Dunes", duration: "3:56", cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
  { id: "7", title: "Rainfall", artist: "Storm Collective", album: "Thunder", duration: "4:44", cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop" },
  { id: "8", title: "Firefly", artist: "Summer Nights", album: "Glow", duration: "3:33", cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop" },
];

export const mockPlaylists: Playlist[] = [
  { id: "1", name: "My Favorites", songs: [mockSongs[0], mockSongs[2], mockSongs[4]], cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop" },
  { id: "2", name: "Workout Mix", songs: [mockSongs[1], mockSongs[3]], cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop" },
  { id: "3", name: "Chill Vibes", songs: [mockSongs[5], mockSongs[6], mockSongs[7]], cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop" },
];
