# Quick Reference Guide

## 🎯 What's Included

This folder contains everything needed to add **Library** and **Browse** pages to Spookify:

- ✅ 2 fully functional page components
- ✅ 5 reusable UI components
- ✅ Player state management context
- ✅ Type definitions
- ✅ Mock data for testing
- ✅ Utility functions
- ✅ Custom CSS styles
- ✅ Complete documentation

---

## 📁 Quick File Lookup

**Need a specific component?**

| Looking For     | Location                              | Import                                                          |
| --------------- | ------------------------------------- | --------------------------------------------------------------- |
| Library page    | `pages/Library.tsx`                   | `import Library from '@/pages/Library'`                         |
| Browse page     | `pages/Browse.tsx`                    | `import Browse from '@/pages/Browse'`                           |
| Card display    | `components/shared/MediaCard.tsx`     | `import MediaCard from '@/components/shared/MediaCard'`         |
| Filter buttons  | `components/shared/FilterPills.tsx`   | `import FilterPills from '@/components/shared/FilterPills'`     |
| Genre cards     | `components/shared/GenreCard.tsx`     | `import GenreCard from '@/components/shared/GenreCard'`         |
| Song lists      | `components/shared/SongRow.tsx`       | `import SongRow from '@/components/shared/SongRow'`             |
| Section headers | `components/shared/SectionHeader.tsx` | `import SectionHeader from '@/components/shared/SectionHeader'` |
| Player state    | `context/PlayerContext.tsx`           | `import { usePlayer } from '@/context/PlayerContext'`           |
| Mock data       | `data/mockData.ts`                    | `import { mockSongs, mockArtists } from '@/data/mockData'`      |

---

## ⚡ 5-Minute Setup

1. **Copy all files to your Spookify project:**

   ```bash
   # Copy pages
   cp EXTRACTED_FILES/pages/* src/pages/

   # Copy components
   cp EXTRACTED_FILES/components/shared/* src/components/shared/

   # Copy data & context
   cp EXTRACTED_FILES/data/* src/data/
   cp EXTRACTED_FILES/context/* src/context/

   # Copy utilities & styles
   cp EXTRACTED_FILES/lib/* src/lib/
   cp EXTRACTED_FILES/styles/* src/styles/
   ```

2. **Add routes in `src/App.tsx`:**

   ```tsx
   import LibraryPage from '@/pages/Library';
   import BrowsePage from '@/pages/Browse';

   // Add these routes
   <Route path="/library" element={<LibraryPage />} />
   <Route path="/browse" element={<BrowsePage />} />
   ```

3. **Import styles in `src/main.tsx`:**

   ```tsx
   import "./styles/harmony-hub-components.css";
   ```

4. **Add navigation links:**
   ```tsx
   // In your Navbar or Sidebar
   <Link to="/library">Library</Link>
   <Link to="/browse">Browse</Link>
   ```

Done! ✨

---

## 🎨 Component Props Reference

### MediaCard

```tsx
<MediaCard
  type="song" | "album" | "artist" | "playlist" | "mix"
  title="String"
  subtitle="Optional string"
  image="URL"
  onClick={() => {}}
  song={Song}  // Optional, for songs only
  isCircle={boolean}  // For circular images (artists)
/>
```

### FilterPills

```tsx
<FilterPills
  options={["Option 1", "Option 2"]}
  activeOption="Option 1"
  onChange={(option) => {}}
/>
```

### SectionHeader

```tsx
<SectionHeader
  title="Section Title"
  showAll={false} // Optional
  allLink="/page" // Optional
/>
```

### GenreCard

```tsx
<GenreCard
  genre={{
    id: "1",
    name: "Pop",
    gradient: "bg-gradient-to-br from-pink-500 to-purple-800",
    slug: "pop",
  }}
/>
```

### SongRow

```tsx
<SongRow
  song={Song}
  index={0} // Optional
  showIndex={true} // Optional
/>
```

---

## 🔌 Context Usage

### Using PlayerContext

```tsx
import { usePlayer, PlayerProvider } from "@/context/PlayerContext";

// Wrap your app
<PlayerProvider>
  <App />
</PlayerProvider>;

// Use in components
function MyComponent() {
  const { playSong, pauseSong, currentSong } = usePlayer();

  return <button onClick={() => playSong(song)}>Play</button>;
}
```

---

## 🎯 Common Customization Tasks

### Change Component Colors

Edit `styles/harmony-hub-components.css` to update Tailwind classes.

### Use Different Icons

Replace lucide-react imports:

```tsx
// From
import { Play, Heart } from "lucide-react";

// To
import { Play, Heart } from "your-icon-library";
```

### Replace Mock Data

In `data/mockData.ts`, replace the mock arrays with API calls:

```tsx
export async function fetchArtists() {
  const response = await fetch("/api/artists");
  return response.json();
}
```

### Customize Responsive Grid

In page components, change grid classes:

```tsx
// From
grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5

// To (wider)
grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
```

---

## 🐛 Common Issues & Fixes

| Issue                            | Solution                                                              |
| -------------------------------- | --------------------------------------------------------------------- |
| `Module not found: @/components` | Verify tsconfig.json has baseUrl & paths set correctly                |
| `PlayerProvider is not defined`  | Import it: `import { PlayerProvider } from '@/context/PlayerContext'` |
| `Missing UI component`           | Install with: `npx shadcn-ui@latest add <component>`                  |
| `Styles not applying`            | Check CSS file is imported in main.tsx                                |
| `Type errors with Song`          | Review music.ts compatibility, adapt types if needed                  |
| `Tailwind classes not working`   | Ensure tailwind.config.ts includes src/ paths                         |

---

## 📚 File Organization

```
EXTRACTED_FILES/
├── INTEGRATION_GUIDE.md      ← Read this first
├── FILE_MANIFEST.md          ← Detailed file info
├── README.md                 ← This file
├── pages/                    ← Copy to src/pages
├── components/shared/        ← Copy to src/components/shared
├── context/                  ← Copy to src/context
├── data/                     ← Copy to src/data
├── lib/                      ← Copy to src/lib
├── styles/                   ← Copy to src/styles
├── types/                    ← Copy to src/types (review first)
└── assets/                   ← Copy to src/assets
```

---

## ✅ Pre-Integration Checklist

Before copying files, verify:

- [ ] `tsconfig.json` has @/ path alias
- [ ] Tailwind CSS is configured
- [ ] React Router is installed
- [ ] shadcn/ui components installed (at least: button, dialog, input, textarea, label, dropdown-menu, use-toast)
- [ ] lucide-react is installed
- [ ] You have a backup of your project

---

## 🎬 After Integration

1. **Test the pages:**

   ```bash
   npm run dev
   # Visit /library and /browse
   ```

2. **Check console for errors:**
   Look for import errors, type errors, missing components

3. **Replace mock data:**
   Update mockData.ts to use real API calls

4. **Customize styling:**
   Adjust colors, sizes in CSS and component files

5. **Connect to your backend:**
   Replace API endpoints when ready

---

## 📞 Need Help?

1. Check `INTEGRATION_GUIDE.md` for detailed steps
2. Review `FILE_MANIFEST.md` for file descriptions
3. Look at component prop types for usage
4. Check import statements for correct paths
5. Test with mock data before using real data

---

## 🎉 You're All Set!

The extraction is complete and ready for integration. Start with the Library page, then add Browse when you're ready.

Happy coding! 🚀
