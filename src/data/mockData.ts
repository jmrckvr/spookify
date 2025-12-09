import { Artist, Song, Album, Playlist, Genre, User } from "@/types/music";

// Current user mock
export const currentUser: User = {
  id: "1",
  name: "Justin Ryan Balinas",
  email: "justin@example.com",
  plan: "basic",
  following: 0,
  followers: 10000,
  createdAt: new Date("2023-01-01"),
};

// Mock artists
export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Drake",
    image: "/covers/drake.jpg",
    monthlyListeners: 85000000,
    followers: 75000000,
    isFollowing: true,
  },
  {
    id: "2",
    name: "SZA",
    image: "/covers/sza.jpg",
    monthlyListeners: 55000000,
    followers: 25000000,
    isFollowing: false,
  },
  {
    id: "3",
    name: "Kendrick Lamar",
    image: "/covers/kendricklamar.jpg",
    monthlyListeners: 45000000,
    followers: 35000000,
    isFollowing: true,
  },
  {
    id: "4",
    name: "LANY",
    image: "/covers/lany.jpg",
    monthlyListeners: 15000000,
    followers: 8000000,
    isFollowing: false,
  },
  {
    id: "5",
    name: "Frank Ocean",
    image: "/covers/frankocean.jpg",
    monthlyListeners: 35000000,
    followers: 20000000,
    isFollowing: true,
  },
  {
    id: "6",
    name: "Ben&Ben",
    image: "public/covers/benben.png",
    monthlyListeners: 5000000,
    followers: 3000000,
    isFollowing: true,
  },
  {
    id: "7",
    name: "DD Osama",
    image: "public/covers/ddosama.jpg",
    monthlyListeners: 8000000,
    followers: 5000000,
    isFollowing: false,
  },
  {
    id: "8",
    name: "Unique Salonga",
    image: "public/covers/uniquesalonga.jpg",
    monthlyListeners: 2000000,
    followers: 1000000,
    isFollowing: true,
  },
  {
    id: "9",
    name: "Jireh Lim",
    image: "public/covers/jirehlim.jpg",
    monthlyListeners: 1500000,
    followers: 800000,
    isFollowing: false,
  },
  {
    id: "10",
    name: "HELLMERRY",
    image: "public/covers/hellmerry_myday.jpg",
    monthlyListeners: 1000000,
    followers: 500000,
    isFollowing: false,
  },
  {
    id: "11",
    name: "Itchyworms",
    image: "/covers/itchyworms.jpg",
    monthlyListeners: 3000000,
    followers: 1500000,
    isFollowing: true,
  },
];

// Mock songs
export const mockSongs: Song[] = [
  {
    id: "1",
    title: "Sino",
    artist: mockArtists[7],
    coverImage:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    duration: 245,
    isLiked: true,
    url: "/songs/Unique Salonga - Sino.mp3",
  },
  {
    id: "2",
    title: "Buko",
    artist: mockArtists[8],
    coverImage:
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    duration: 198,
    isLiked: false,
    url: "/songs/Jireh Lim - Buko.mp3",
  },
  {
    id: "3",
    title: "My Day",
    artist: mockArtists[9],
    coverImage:
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400",
    duration: 210,
    isLiked: true,
    url: "/songs/HELLMERRY - My Day.mp3",
  },
  {
    id: "4",
    title: "Dead Opps",
    artist: mockArtists[6],
    coverImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",
    duration: 180,
    isLiked: false,
    url: "/songs/DD Osama - Dead Opps.mp3",
  },
  {
    id: "5",
    title: "Thinkin Bout You",
    artist: mockArtists[4],
    coverImage:
      "https://images.unsplash.com/photo-1549213783-8284d0336c4f?w=400",
    duration: 240,
    isLiked: true,
    url: "/songs/Frank Ocean - Thinkin Bout You.mp3",
  },
  {
    id: "6",
    title: "God's Plan",
    artist: mockArtists[0],
    coverImage:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400",
    duration: 198,
    isLiked: true,
    url: "/songs/Drake - Godx27s Plan.mp3",
  },
  {
    id: "7",
    title: "SOS",
    artist: mockArtists[1],
    coverImage:
      "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=400",
    duration: 210,
    isLiked: false,
    url: "/songs/SZA - SOS.mp3",
  },
  {
    id: "8",
    title: "HUMBLE.",
    artist: mockArtists[2],
    coverImage:
      "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=400",
    duration: 177,
    isLiked: true,
    url: "/songs/Kendrick Lamar - HUMBLE.mp3",
  },
  {
    id: "9",
    title: "ILYSB",
    artist: mockArtists[3],
    coverImage:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
    duration: 187,
    isLiked: false,
    url: "/songs/LANY - ILYSB.mp3",
  },
  {
    id: "10",
    title: "Leaves",
    artist: mockArtists[5],
    coverImage:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
    duration: 256,
    isLiked: true,
    url: "/songs/Ben&Ben - Leaves.mp3",
  },
  {
    id: "11",
    title: "Akin Ka Na Lang",
    artist: mockArtists[10],
    coverImage:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
    duration: 210,
    isLiked: false,
    url: "/songs/Itchyworms - Akin Ka Na Lang (Official Music Video).mp3",
  },
];

// Mock albums
export const mockAlbums: Album[] = [
  {
    id: "1",
    title: "My Day",
    artist: mockArtists[9],
    coverImage: "public/covers/hellmerry_myday.jpg",
    releaseDate: new Date("2023-06-15"),
    songs: mockSongs.slice(0, 3),
  },
  {
    id: "2",
    title: "My Game",
    artist: mockArtists[9],
    coverImage: "public/covers/mikekosa.jpg",
    releaseDate: new Date("2022-11-20"),
    songs: mockSongs.slice(3, 6),
  },
  {
    id: "3",
    title: "Blonde",
    artist: mockArtists[4],
    coverImage: "public/covers/blondecover.jpg",
    releaseDate: new Date("2016-08-20"),
    songs: mockSongs.slice(0, 4),
  },
  {
    id: "4",
    title: "DAMN.",
    artist: mockArtists[2],
    coverImage: "public/covers/damnicon.jpg",
    releaseDate: new Date("2017-04-14"),
    songs: mockSongs.slice(2, 5),
  },
  {
    id: "5",
    title: "SOS",
    artist: mockArtists[1],
    coverImage: "public/covers/sossza.jpg",
    releaseDate: new Date("2022-12-09"),
    songs: mockSongs.slice(4, 8),
  },
];

// Mock playlists
export const mockPlaylists: Playlist[] = [
  {
    id: "1",
    name: "Liked Songs",
    coverImage: "public/covers/likesong.jpg",
    owner: currentUser,
    songs: mockSongs.filter((s) => s.isLiked),
    isPublic: false,
    createdAt: new Date(),
  },
  {
    id: "2",
    name: "Matured Songs",
    coverImage: "public/covers/maturedsongs.jpg",
    owner: currentUser,
    songs: [mockSongs[10], ...mockSongs.slice(0, 4)],
    isPublic: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    name: "Chill Vibes",
    coverImage: "public/covers/chillsongs.jpg",
    owner: currentUser,
    songs: mockSongs.slice(2, 7),
    isPublic: true,
    createdAt: new Date(),
  },
  {
    id: "4",
    name: "Workout Mix",
    coverImage: "public/covers/workoutmix.jpg",
    owner: currentUser,
    songs: mockSongs.slice(1, 6),
    isPublic: false,
    createdAt: new Date(),
  },
  {
    id: "5",
    name: "Sa Susunod Na Habang Buhay",
    coverImage: "public/covers/sasusunod.jpg",
    owner: currentUser,
    songs: mockSongs.slice(3, 8),
    isPublic: true,
    createdAt: new Date(),
  },
  {
    id: "6",
    name: "247",
    coverImage: "public/covers/247.jpg",
    owner: currentUser,
    songs: mockSongs.slice(0, 4),
    isPublic: true,
    createdAt: new Date(),
  },
  {
    id: "7",
    name: "Playlist habang naliligo",
    coverImage: "public/covers/ligoplaylist.jpg",
    owner: currentUser,
    songs: mockSongs.slice(5, 10),
    isPublic: true,
    createdAt: new Date(),
  },
];

// Genre categories
export const genres: Genre[] = [
  {
    id: "1",
    name: "Trending",
    gradient: "bg-gradient-to-br from-yellow-600 to-yellow-900",
    slug: "trending",
  },
  {
    id: "2",
    name: "R&B",
    gradient: "bg-gradient-to-br from-blue-600 to-indigo-900",
    slug: "rnb",
  },
  {
    id: "3",
    name: "Pop",
    gradient: "bg-gradient-to-br from-pink-500 to-purple-800",
    slug: "pop",
  },
  {
    id: "4",
    name: "OPM",
    gradient: "bg-gradient-to-br from-orange-500 to-orange-800",
    slug: "opm",
  },
  {
    id: "5",
    name: "Kpop",
    gradient: "bg-gradient-to-br from-purple-500 to-pink-700",
    slug: "kpop",
  },
  {
    id: "6",
    name: "Hiphop",
    gradient: "bg-gradient-to-br from-lime-500 to-emerald-700",
    slug: "hiphop",
  },
  {
    id: "7",
    name: "Love",
    gradient: "bg-gradient-to-br from-orange-400 to-amber-600",
    slug: "love",
  },
  {
    id: "8",
    name: "Rock",
    gradient: "bg-gradient-to-br from-red-500 to-rose-800",
    slug: "rock",
  },
  {
    id: "9",
    name: "Soul",
    gradient: "bg-gradient-to-br from-teal-400 to-cyan-700",
    slug: "soul",
  },
  {
    id: "10",
    name: "Electronic",
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-800",
    slug: "electronic",
  },
  {
    id: "11",
    name: "Metal",
    gradient: "bg-gradient-to-br from-gray-500 to-gray-800",
    slug: "metal",
  },
  {
    id: "12",
    name: "Indie",
    gradient: "bg-gradient-to-br from-amber-500 to-orange-700",
    slug: "indie",
  },
];

// Your Mix playlists for home page
export const yourMixes = [
  {
    id: "mix1",
    name: "Your Mix 1",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    description: "Drake, SZA, Kendrick Lamar and more",
  },
  {
    id: "mix2",
    name: "Your Mix 2",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    description: "LANY, Frank Ocean, Ben&Ben",
  },
  {
    id: "mix3",
    name: "Your Mix 3",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400",
    description: "Chill vibes for your evening",
  },
  {
    id: "mix4",
    name: "Your Mix 4",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",
    description: "OPM classics and new hits",
  },
  {
    id: "mix5",
    name: "Your Mix 5",
    image: "https://images.unsplash.com/photo-1549213783-8284d0336c4f?w=400",
    description: "Hip-hop essentials",
  },
];
