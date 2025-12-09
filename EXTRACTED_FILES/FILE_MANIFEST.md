# EXTRACTED_FILES - File Manifest & Summary

## Overview

This extraction contains all necessary files from the harmony-hub-main project to integrate **Library** and **Browse** pages into Spookify, with zero external dependencies beyond what's already in Spookify.

---

## 📋 Files Extracted

### **Pages** (2 files)

| File                | Purpose                                                 | Dependencies                                            |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| `pages/Library.tsx` | User library with search, filter, and playlist creation | FilterPills, MediaCard, Dialog/Button/Input/Textarea UI |
| `pages/Browse.tsx`  | Explore genres, discover artists & albums               | SectionHeader, MediaCard, GenreCard, PlayerContext      |

**Key Features:**

- ✅ Filter content by type (All/Playlists/Albums/Artists)
- ✅ Search functionality
- ✅ Create playlist dialog
- ✅ Genre browsing with drill-down
- ✅ Responsive grid layout

---

### **Components** (5 shared components)

| File                                  | Purpose                            | Reusable                             |
| ------------------------------------- | ---------------------------------- | ------------------------------------ |
| `components/shared/FilterPills.tsx`   | Filter button group                | Yes - Generic filter component       |
| `components/shared/MediaCard.tsx`     | Media item card display            | Yes - Works with any media type      |
| `components/shared/GenreCard.tsx`     | Genre category card                | Yes - Can adapt for other categories |
| `components/shared/SectionHeader.tsx` | Section title with "Show all" link | Yes - Reusable section header        |
| `components/shared/SongRow.tsx`       | Song list item row                 | Yes - Can use for playlists/albums   |

**Component Features:**

- ✅ Fully styled with Tailwind CSS
- ✅ Responsive design
- ✅ Hover effects & animations
- ✅ Icon integration (lucide-react)
- ✅ Dropdown menus for song actions
- ✅ Like/add to playlist buttons

---

### **Context** (1 file)

| File                        | Purpose                 | Note                                     |
| --------------------------- | ----------------------- | ---------------------------------------- |
| `context/PlayerContext.tsx` | Player state management | Optional - You can use your MusicContext |

**Provides:**

- Player state (current song, playing, volume, etc.)
- Control methods (play, pause, skip, shuffle, repeat)
- Queue management
- Progress tracking

---

### **Types** (1 file)

| File                         | Purpose          | Compatibility                                       |
| ---------------------------- | ---------------- | --------------------------------------------------- |
| `types/music-harmony-hub.ts` | Type definitions | Review before using - May differ from your music.ts |

**Includes:**

- User, Artist, Song, Album, Playlist, Genre interfaces
- PlayerState interface
- SearchResult, ApiResponse types

---

### **Data** (1 file)

| File               | Purpose               | Usage                                                 |
| ------------------ | --------------------- | ----------------------------------------------------- |
| `data/mockData.ts` | Mock data for testing | For development/testing - Replace with real API calls |

**Contains:**

- 10 mock artists
- 10 mock songs
- 5 mock albums
- 7 mock playlists
- 12 music genres with gradients
- 5 personalized mixes

---

### **Utilities** (1 file)

| File           | Purpose                    | Dependency           |
| -------------- | -------------------------- | -------------------- |
| `lib/utils.ts` | Class name merging utility | clsx, tailwind-merge |

**Function:**

- `cn()` - Merges Tailwind classes intelligently

---

### **Styles** (1 file)

| File                                | Purpose                   | Format       |
| ----------------------------------- | ------------------------- | ------------ |
| `styles/harmony-hub-components.css` | Component-specific styles | Tailwind/CSS |

**Includes:**

- Filter pill styles
- Media card hover effects
- Play button overlay
- Genre card styling
- Song row styling
- Fade-in animation

---

## 📊 File Statistics

```
Total Files: 13
├── Pages: 2
├── Components: 5
├── Context: 1
├── Types: 1
├── Data: 1
├── Utilities: 1
├── Styles: 1
└── Documentation: 2
```

**Total Lines of Code:** ~800 lines
**Languages:** TypeScript/TSX, CSS, Markdown

---

## 🔗 Import Structure

### Path Aliases Required

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Example Import Paths

```typescript
// Components
import FilterPills from "@/components/shared/FilterPills";
import MediaCard from "@/components/shared/MediaCard";

// Context
import { usePlayer, PlayerProvider } from "@/context/PlayerContext";

// Types
import { Song, Playlist, Genre } from "@/types/music-harmony-hub";

// Data
import { mockSongs, mockArtists, genres } from "@/data/mockData";

// Utilities
import { cn } from "@/lib/utils";
```

---

## ✅ Pre-Integration Checklist

- [ ] Review INTEGRATION_GUIDE.md
- [ ] Check tsconfig.json has @/ path alias
- [ ] Verify shadcn/ui components are installed:
  - [ ] dialog
  - [ ] button
  - [ ] input
  - [ ] textarea
  - [ ] label
  - [ ] dropdown-menu
  - [ ] use-toast
- [ ] Review type definitions compatibility
- [ ] Plan context strategy (PlayerContext vs MusicContext)
- [ ] Backup existing files before copying

---

## 🚀 Quick Start Integration

1. **Copy pages:**

   ```bash
   cp pages/*.tsx src/pages/
   ```

2. **Copy components:**

   ```bash
   cp components/shared/*.tsx src/components/shared/
   ```

3. **Copy data & context:**

   ```bash
   cp data/mockData.ts src/data/
   cp context/PlayerContext.tsx src/context/
   ```

4. **Add routes in App.tsx:**

   ```tsx
   import LibraryPage from '@/pages/Library';
   import BrowsePage from '@/pages/Browse';

   <Route path="/library" element={<LibraryPage />} />
   <Route path="/browse" element={<BrowsePage />} />
   ```

5. **Add styles:**

   ```tsx
   // In App.tsx or main.tsx
   import "./styles/harmony-hub-components.css";
   ```

6. **Update navigation:**
   ```tsx
   // In Navbar or Sidebar
   <NavLink to="/library" label="Library" />
   <NavLink to="/browse" label="Browse" />
   ```

---

## 🎯 Component Dependencies Map

```
Library Page
├── FilterPills
├── MediaCard
│   └── usePlayer (from PlayerContext)
├── Dialog, Button, Input, Textarea, Label (shadcn/ui)
└── useToast (from shadcn/ui)

Browse Page
├── MediaCard
│   └── usePlayer
├── GenreCard
│   └── Link (react-router)
├── SectionHeader
│   └── Link
└── mockData, genres

MediaCard
├── usePlayer (from PlayerContext)
├── Play icon (lucide-react)
└── Tailwind CSS

SongRow
├── usePlayer
├── DropdownMenu (shadcn/ui)
├── Icons (lucide-react)
└── Tailwind CSS
```

---

## 📦 External Dependencies

### Required (Already in Spookify)

- ✅ react
- ✅ react-router-dom
- ✅ typescript
- ✅ tailwindcss
- ✅ lucide-react (for icons)
- ✅ shadcn/ui components

### Optional

- ⚠️ clsx (for cn utility)
- ⚠️ tailwind-merge (for cn utility)

---

## 🔄 Integration Strategies

### Option A: Use Harmony Hub Context

```tsx
import { PlayerProvider } from "@/context/PlayerContext";

export function App() {
  return (
    <PlayerProvider>
      <YourRoutes />
    </PlayerProvider>
  );
}
```

### Option B: Keep Your MusicContext

- Remove PlayerContext usage from components
- Adapt components to work with MusicContext
- No context conflicts

### Option C: Hybrid Approach

- Use both contexts (if namespaced properly)
- Map between context types as needed
- More complex but offers flexibility

---

## 📝 Notes for Customization

1. **Mock Data**: Replace with real API calls when ready
2. **Styling**: All styles use Tailwind - customize theme in tailwind.config.ts
3. **Icons**: All from lucide-react - easily replaceable
4. **Responsive**: Tested on mobile/tablet/desktop
5. **Accessibility**: Components include basic ARIA attributes

---

## ⚠️ Known Limitations

- Uses mock data (no real backend)
- PlayerContext is separate from MusicContext (choose one)
- Type definitions may differ from your music.ts
- Requires react-router-dom for navigation
- Icons from lucide-react (consistent with harmony-hub)

---

## 📞 Support

For integration help:

1. Review INTEGRATION_GUIDE.md
2. Check component prop types
3. Verify import paths
4. Test with mock data first
5. Gradually replace mock data with real API

---

**Last Updated**: December 8, 2025
**For**: Spookify Project
**From**: harmony-hub-main
