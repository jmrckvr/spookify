# EXTRACTED_FILES - Complete Index

## 📖 Documentation Files (Read These First!)

1. **README.md** - Quick reference and 5-minute setup guide
2. **INTEGRATION_GUIDE.md** - Comprehensive integration instructions
3. **FILE_MANIFEST.md** - Detailed file descriptions and dependencies
4. **INDEX.md** (this file) - Navigation guide

---

## 📂 Directory Structure & Files

### `/pages` - Page Components

```
pages/
├── Library.tsx (215 lines)
│   ├── Features: Search, filter, create playlist
│   ├── Dependencies: FilterPills, MediaCard, Dialog components
│   ├── Routes: GET /library
│   └── URL Params: ?filter=All|Playlists|Albums|Artists
│
└── Browse.tsx (128 lines)
    ├── Features: Genre browsing, artist discovery, new releases
    ├── Dependencies: SectionHeader, MediaCard, GenreCard
    ├── Routes: GET /browse, GET /browse?genre=
    └── State: Genre selection, drill-down navigation
```

**When to use:**

- Library page for user's saved playlists, albums, and artists
- Browse page for discovering new content and genres

---

### `/components/shared` - Reusable Components

```
components/shared/
├── FilterPills.tsx (27 lines)
│   ├── Props: options[], activeOption, onChange()
│   ├── Use: Filter collections by type
│   └── Example: <FilterPills options={['All', 'Music', 'Podcasts']} />
│
├── MediaCard.tsx (68 lines)
│   ├── Props: type, title, subtitle, image, onClick, song?, isCircle?
│   ├── Types: 'song' | 'artist' | 'album' | 'playlist' | 'mix'
│   ├── Features: Play button overlay, responsive images
│   └── Use: Display media items in grids
│
├── GenreCard.tsx (27 lines)
│   ├── Props: genre { id, name, gradient, slug }
│   ├── Features: Link to /genre/{slug}
│   └── Use: Genre selection with gradient backgrounds
│
├── SectionHeader.tsx (24 lines)
│   ├── Props: title, showAll?, allLink?
│   ├── Features: Optional "Show all" link
│   └── Use: Section titles with navigation
│
└── SongRow.tsx (100 lines)
    ├── Props: song, index?, showIndex?
    ├── Features: Like button, add to playlist, dropdown menu
    ├── Use: Song listings in tables/lists
    └── Actions: Play, Like, Add to playlist, Share
```

**Quick component decision tree:**

- Grid of media items? → Use `MediaCard`
- Filter buttons? → Use `FilterPills`
- Genre selection? → Use `GenreCard`
- Section title? → Use `SectionHeader`
- Song list? → Use `SongRow`

---

### `/context` - State Management

```
context/
└── PlayerContext.tsx (125 lines)
    ├── Provider: PlayerProvider
    ├── Hook: usePlayer()
    ├── State: currentSong, isPlaying, volume, progress, queue, shuffle, repeat
    ├── Methods: playSong, pauseSong, nextSong, previousSong
    ├── Advanced: toggleShuffle, toggleRepeat, setVolume, setProgress
    └── Note: Optional - can use your existing MusicContext instead
```

**When to use PlayerContext:**

- You need player state management
- You want controls like play, pause, skip
- You need queue/shuffle/repeat functionality

---

### `/types` - Type Definitions

```
types/
└── music-harmony-hub.ts (93 lines)
    ├── Interfaces:
    │   ├── User { id, name, email, avatar?, plan, following, followers }
    │   ├── Artist { id, name, image, monthlyListeners, followers, isFollowing }
    │   ├── Song { id, title, artist, coverImage, duration, isLiked }
    │   ├── Album { id, title, artist, coverImage, releaseDate, songs }
    │   ├── Playlist { id, name, description, coverImage, owner, songs, isPublic }
    │   ├── Genre { id, name, gradient, slug }
    │   ├── PlayerState { currentSong, isPlaying, volume, progress, queue }
    │   └── API types { ApiResponse<T>, PaginatedResponse<T> }
    └── Note: Review compatibility with your existing music.ts
```

**Type compatibility notes:**

- Your Spookify types use `artist: string` (name only)
- Harmony-hub types use `artist: Artist` (full object)
- Choose to adapt either components or types
- Or create adapter functions to convert between types

---

### `/data` - Mock Data

```
data/
└── mockData.ts (86 lines)
    ├── mockArtists[10] - Drake, SZA, Kendrick, LANY, Frank Ocean, etc.
    ├── mockSongs[10] - Sino, Buko, My Day, Dead Opps, etc.
    ├── mockAlbums[5] - My Day, My Game, Blonde, DAMN., SOS
    ├── mockPlaylists[7] - Liked Songs, Matured Songs, Chill Vibes, etc.
    ├── genres[12] - Trending, R&B, Pop, OPM, Kpop, Hiphop, etc.
    ├── yourMixes[5] - Personalized mix playlists
    └── currentUser - Default user for testing
```

**Usage:**

```typescript
// Import and use mock data
import { mockSongs, mockArtists, genres } from "@/data/mockData";

// During development - shows working UI
// Before production - replace with API calls:
const fetchSongs = async () => {
  const response = await fetch("/api/songs");
  return response.json();
};
```

---

### `/lib` - Utilities

```
lib/
└── utils.ts (6 lines)
    ├── Function: cn(...inputs)
    ├── Purpose: Merge Tailwind classes intelligently
    ├── Dependencies: clsx, tailwind-merge
    └── Example: cn('px-4', 'px-8') // Returns 'px-8' (last wins)
```

**Usage:**

```tsx
import { cn } from "@/lib/utils";

// Merge conditional classes
const buttonClass = cn(
  "px-4 py-2",
  isActive && "bg-primary text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
);
```

---

### `/styles` - CSS Styles

```
styles/
└── harmony-hub-components.css (~60 lines)
    ├── Filter pills styling
    ├── Media card hover effects & play button
    ├── Genre card gradient backgrounds
    ├── Song row hover states
    ├── Fade-in animation
    └── Tailwind utility helpers
```

**Include in your app:**

```tsx
// In main.tsx or App.tsx
import "./styles/harmony-hub-components.css";
```

---

### `/assets` - Images & Media

```
assets/
└── images/
    └── (Empty - ready for your assets)
```

---

## 🔄 Integration Flow Chart

```
Start Here
    ↓
1. Read README.md (5 min)
    ↓
2. Check INTEGRATION_GUIDE.md for detailed steps
    ↓
3. Verify tsconfig.json has @/ path alias
    ↓
4. Copy files to Spookify:
    ├── pages/* → src/pages/
    ├── components/shared/* → src/components/shared/
    ├── data/* → src/data/
    ├── context/* → src/context/
    ├── lib/* → src/lib/
    └── styles/* → src/styles/
    ↓
5. Add routes in App.tsx
    ↓
6. Import CSS file
    ↓
7. Update navigation
    ↓
8. Test with npm run dev
    ↓
✅ Done!
```

---

## 🎯 Quick Start by Role

### **Frontend Developer**

1. Copy all files (use provided commands)
2. Add routes to App.tsx
3. Update navigation
4. Test components
5. Customize styling

### **Full Stack Developer**

1. Copy files
2. Review type definitions (adapt to your schema)
3. Replace mockData with API calls
4. Update backend endpoints
5. Connect authentication

### **UI/UX Designer**

1. Focus on `/styles/harmony-hub-components.css`
2. Customize colors/spacing in Tailwind classes
3. Modify component layout in page files
4. Test responsive design

### **DevOps/Deployment**

1. Verify dependencies installed
2. Check build configuration
3. Ensure path aliases work in build
4. Test in production environment

---

## 📋 Dependency Matrix

### External Dependencies

```
✅ Already in Spookify:
  - react
  - react-router-dom
  - typescript
  - tailwindcss
  - lucide-react
  - shadcn/ui (all components)

⚠️ Check if installed:
  - clsx
  - tailwind-merge
  - (usually included with shadcn/ui)
```

### Component Dependencies

```
Library Page requires:
  ├── FilterPills
  ├── MediaCard
  └── shadcn/ui: dialog, button, input, textarea, label, use-toast

Browse Page requires:
  ├── MediaCard
  ├── GenreCard
  ├── SectionHeader
  └── PlayerContext (or adapt for your context)

All components require:
  ├── Tailwind CSS
  ├── lucide-react (icons)
  └── React 18+
```

---

## 🔍 File Reference by Feature

### Want to implement...

**...search functionality?**

- See: `pages/Library.tsx` (line ~130-145)
- Code: Search input with state filtering

**...genre browsing?**

- See: `pages/Browse.tsx` (line ~60-85)
- Components: `GenreCard.tsx`, genre selection state

**...playlist creation?**

- See: `pages/Library.tsx` (line ~165-215)
- Components: Dialog, Button, Input, Textarea

**...media grid display?**

- See: `pages/Library.tsx`, `pages/Browse.tsx`
- Component: `MediaCard.tsx`
- CSS: `styles/harmony-hub-components.css` (.media-card, .play-button-overlay)

**...song list/table?**

- Component: `SongRow.tsx`
- Features: Like button, dropdown menu, duration

**...filter buttons?**

- Component: `FilterPills.tsx`
- See: `pages/Library.tsx` (line ~25)

**...player state?**

- Context: `PlayerContext.tsx`
- Hook: `usePlayer()`

---

## 🐛 Troubleshooting Reference

| Error                                      | File                              | Solution                                      |
| ------------------------------------------ | --------------------------------- | --------------------------------------------- |
| `Cannot find module '@/'`                  | tsconfig.json                     | Add baseUrl and paths config                  |
| `PlayerContext not found`                  | context/                          | Check import path, wrap app in PlayerProvider |
| `Missing UI component`                     | components/ui                     | Install with shadcn-ui add                    |
| `Styles not applied`                       | styles/harmony-hub-components.css | Import in main.tsx                            |
| `Type 'string' not assignable to 'Artist'` | types/                            | Adapt components to use your type schema      |
| `usePlayer returns undefined`              | context/                          | Ensure wrapped in PlayerProvider              |

---

## 📊 Statistics

```
Extracted Code:
├── TypeScript/TSX: ~800 lines
├── CSS: ~60 lines
├── Markdown: ~600 lines (documentation)
├── Components: 5 shared + 2 pages
├── Contexts: 1
├── Type files: 1
├── Data files: 1
└── Utilities: 1

Coverage:
├── Pages: 100% (Library + Browse)
├── Components: 100% (all shared)
├── Context: 100% (PlayerContext)
├── Styles: 100% (component CSS)
└── Documentation: 100% (guides + references)
```

---

## ✅ Extraction Verification Checklist

- [x] Page components (Library, Browse)
- [x] Shared components (5 components)
- [x] Context (PlayerContext)
- [x] Type definitions
- [x] Mock data
- [x] Utility functions
- [x] CSS styles
- [x] Documentation (3 guides)
- [x] File manifest
- [x] Quick reference
- [x] Integration index

---

## 🚀 Next Steps

1. **Start with README.md** - 5-minute overview
2. **Follow INTEGRATION_GUIDE.md** - Detailed instructions
3. **Reference FILE_MANIFEST.md** - When you need details
4. **Use this INDEX.md** - To navigate the extraction

---

## 📞 Support Resources in This Extraction

| Need               | File                                    |
| ------------------ | --------------------------------------- |
| Quick start        | README.md                               |
| Step-by-step guide | INTEGRATION_GUIDE.md                    |
| File details       | FILE_MANIFEST.md                        |
| Navigation         | INDEX.md (this file)                    |
| Component usage    | Component source files (well-commented) |
| Type info          | types/music-harmony-hub.ts              |
| Styling help       | styles/harmony-hub-components.css       |

---

**Extraction Complete!** ✨

You now have everything needed to integrate the Library and Browse pages from harmony-hub into your Spookify project. Start with README.md for a quick overview, then use INTEGRATION_GUIDE.md for detailed steps.

Good luck! 🚀
