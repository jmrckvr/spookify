import { Search, Home, Library, Disc3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/context/MusicContext";

interface NavbarProps {
  onAuthClick: () => void;
}

export function Navbar({ onAuthClick }: NavbarProps) {
  const { user, setUser, searchQuery, setSearchQuery, setSelectedPlaylist } = useMusic();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="h-16 bg-background border-b border-border flex items-center px-6 gap-6">
      {/* Logo */}
      <div className="flex items-center gap-2 min-w-[200px]">
        <Disc3 className="h-8 w-8 text-primary animate-pulse-glow" />
        <span className="text-xl font-bold text-foreground">Spookify</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search songs, artists, albums..."
            className="pl-10 bg-card border-border focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6">
        <button
          onClick={() => setSelectedPlaylist(null)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="h-5 w-5" />
          <span className="hidden md:inline">Home</span>
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <Disc3 className="h-5 w-5" />
          <span className="hidden md:inline">Browse</span>
        </button>
        <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <Library className="h-5 w-5" />
          <span className="hidden md:inline">Library</span>
        </button>
      </nav>

      {/* Auth */}
      <div className="flex items-center gap-4 min-w-[200px] justify-end">
        {user ? (
          <>
            <span className="text-xl font-bold mr-5 uppercase">{user.username}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button onClick={onAuthClick} className="bg-primary hover:bg-primary/90">
            Login / Register
          </Button>
        )}
      </div>
    </header>
  );
}
