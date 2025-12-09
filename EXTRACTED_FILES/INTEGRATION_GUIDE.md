# Harmony Hub Integration Guide for Spookify

This folder contains all the necessary files extracted from the harmony-hub-main project to integrate the **Library** and **Browse** pages into your Spookify project.

## 📁 Folder Structure

```
EXTRACTED_FILES/
├── pages/
│   ├── Library.tsx          # Library page component
│   └── Browse.tsx           # Browse page (renamed from Explore.tsx)
├── components/
│   ├── shared/
│   │   ├── FilterPills.tsx   # Filter button component
│   │   ├── MediaCard.tsx     # Card component for displaying media
│   │   ├── GenreCard.tsx     # Genre card component
│   │   ├── SectionHeader.tsx # Section header with "Show all" link
│   │   └── SongRow.tsx       # Song row component
│   └── ui/                   # Already in your project
├── context/
│   └── PlayerContext.tsx     # Player state management context
├── types/
│   └── music-harmony-hub.ts  # Type definitions (may differ from your music.ts)
├── data/
│   └── mockData.ts          # Mock data for testing
├── lib/
│   └── utils.ts             # Utility functions (cn for className merging)
├── styles/
│   └── harmony-hub-components.css # Custom CSS classes
└── assets/
    └── images/              # For any images needed
```

## 🚀 Integration Steps

### Step 1: Copy Page Components

Copy the page files to your Spookify pages directory:

```bash
cp pages/Library.tsx src/pages/
cp pages/Browse.tsx src/pages/
```

### Step 2: Copy Shared Components

Copy the shared components:

```bash
cp components/shared/* src/components/shared/
```

### Step 3: Copy Context (Optional)

If you want to use the PlayerContext from harmony-hub instead of your MusicContext:

```bash
cp context/PlayerContext.tsx src/context/
```

Or, you can continue using your existing `MusicContext.tsx`.

### Step 4: Copy Type Definitions (Optional)

Review `types/music-harmony-hub.ts` and merge with your existing `src/types/music.ts` if needed:

```bash
# Review the harmony-hub type definitions first
cat types/music-harmony-hub.ts

# Merge into your existing types file or replace if compatible
cp types/music-harmony-hub.ts src/types/
```

### Step 5: Copy Data

Copy the mock data for testing:

```bash
cp data/mockData.ts src/data/
```

### Step 6: Copy Utilities

The `utils.ts` is likely already in your project, but if not:

```bash
cp lib/utils.ts src/lib/
```

### Step 7: Add CSS Styles

Add the custom CSS classes to your global styles or Tailwind config:

```bash
cat styles/harmony-hub-components.css >> src/index.css
# Or import it in your main App.tsx
```

### Step 8: Update Routes

Add the new pages to your router configuration in `src/App.tsx`:

```tsx
import LibraryPage from '@/pages/Library';
import BrowsePage from '@/pages/Browse';

// In your router/Routes:
<Route path="/library" element={<LibraryPage />} />
<Route path="/browse" element={<BrowsePage />} />
```

### Step 9: Update Navigation

Add navigation links to your sidebar/navbar:

```tsx
<NavLink to="/library" label="Library" icon={<LibraryIcon />} />
<NavLink to="/browse" label="Browse" icon={<BrowseIcon />} />
```

## 🔗 Dependencies & Import Paths

The extracted files use `@/` path aliases. Make sure your `tsconfig.json` includes:

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

## 📦 Required Packages

All UI components use shadcn/ui components. Verify you have these installed:

- `dialog` - For create playlist modal
- `button` - Button component
- `input` - Input field component
- `textarea` - Text area component
- `label` - Label component
- `dropdown-menu` - For song row actions
- `form` - For form handling (if using)
- `use-toast` - Toast notifications

You can install missing components with:

```bash
npx shadcn-ui@latest add <component-name>
```

## 🎨 Customization Notes

### Type Compatibility

Your Spookify `music.ts` uses different field names (e.g., `artist: string` vs `artist: Artist` object). You have two options:

1. **Use harmony-hub types**: Replace your types with the extracted `music-harmony-hub.ts`
2. **Adapt components**: Modify the extracted components to work with your existing type definitions

### Context Integration

- The extracted `PlayerContext` has a different structure than your `MusicContext`
- You can use either one, but stick with one throughout your app to avoid conflicts
- If keeping your `MusicContext`, remove the `PlayerContext` import from components and use your context instead

### Mock Data

Replace the mock data with real API calls when you're ready to integrate with your backend.

## 🎯 Component Usage Examples

### Library Page

```tsx
import LibraryPage from "@/pages/Library";

// In your Routes
<Route path="/library" element={<LibraryPage />} />;
```

### Browse Page

```tsx
import BrowsePage from "@/pages/Browse";

// In your Routes
<Route path="/browse" element={<BrowsePage />} />;
```

### MediaCard Component

```tsx
import MediaCard from "@/components/shared/MediaCard";

<MediaCard
  type="song"
  title="Song Title"
  subtitle="Artist Name"
  image="https://..."
  onClick={() => playSong(song)}
  song={song}
/>;
```

### FilterPills Component

```tsx
import FilterPills from "@/components/shared/FilterPills";

<FilterPills
  options={["All", "Playlists", "Albums"]}
  activeOption="All"
  onChange={(option) => setFilter(option)}
/>;
```

## 🐛 Troubleshooting

### Import Errors

- Verify your `tsconfig.json` has the `@/` path alias configured
- Check that all imported components exist in your project
- Make sure you've copied UI components from shadcn/ui if they're missing

### Styling Issues

- Import the CSS file in your main application
- Check that Tailwind CSS is configured correctly
- Verify custom CSS classes are not conflicting with existing styles

### Context Errors

- Wrap your app with the `PlayerProvider` if using the harmony-hub context:

  ```tsx
  import { PlayerProvider } from "@/context/PlayerContext";

  <PlayerProvider>
    <App />
  </PlayerProvider>;
  ```

### Type Mismatches

- Review the type definitions in both `music.ts` files
- Adapt component props if needed to match your types
- Create adapter functions if types differ significantly

## 📝 Additional Notes

- The **Browse** page is renamed from **Explore** to fit Spookify's naming
- The **Library** page includes a create playlist modal
- Both pages use responsive grid layouts that work on all screen sizes
- Components use Tailwind CSS for styling
- All icons come from lucide-react

## 🔄 Future Enhancements

1. Replace mock data with actual API calls
2. Connect to your backend for real playlists
3. Add real user authentication
4. Implement actual song playback
5. Add sharing and collaboration features

## ❓ Questions or Issues?

If you encounter any issues during integration:

1. Check the error messages in the console
2. Verify all imports are correct
3. Ensure all dependencies are installed
4. Review the component props match your usage
5. Check for naming conflicts in your existing components

---

**Created**: December 8, 2025
**Source**: harmony-hub-main project
**Target**: Spookify project
