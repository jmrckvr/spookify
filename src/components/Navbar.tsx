import {
  Search,
  Home,
  Library,
  Disc3,
  Bell,
  User,
  ArrowLeft,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMusic } from "@/context/MusicContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onAuthClick: () => void;
  showBackButton?: boolean;
  showLibrarySearch?: boolean;
}

export function Navbar({
  onAuthClick,
  showBackButton = false,
  showLibrarySearch = false,
}: NavbarProps) {
  const { user, setUser, searchQuery, setSearchQuery, setSelectedPlaylist } =
    useMusic();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="h-16 bg-background border-b border-border/30 flex items-center px-6 gap-4">
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full hover:bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      )}

      {/* Logo */}
      <div className="flex items-center gap-2 min-w-[160px]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
          <Disc3 className="h-5 w-5 text-primary-foreground animate-spin" />
        </div>
        <span className="text-lg font-bold text-foreground">Spookify</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-1">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => navigate("/explore")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
        >
          <Disc3 className="h-5 w-5" />
          <span>Explore</span>
        </button>
        <button
          onClick={() => navigate("/library")}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
        >
          <Library className="h-5 w-5" />
          <span>Library</span>
        </button>
      </nav>

      {/* Search Bar - Show on home/explore, hide on library */}
      {!showLibrarySearch && (
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="What do you want to play?"
              className="pl-10 bg-secondary/60 border-0 rounded-full text-sm focus:bg-secondary focus:ring-2 focus:ring-primary/50 focus-visible:ring-offset-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Library Search */}
      {showLibrarySearch && (
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground transition-all">
            <span>+</span>
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search in library"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-secondary/50 border border-border/30 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-48"
            />
          </div>
        </div>
      )}

      {/* Right Actions */}
      <div className="flex items-center gap-3 min-w-fit">
        <button className="w-10 h-10 rounded-full hover:bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-all">
          <Bell className="h-5 w-5" />
        </button>

        {user ? (
          <button
            onClick={onAuthClick}
            className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center text-primary-foreground transition-all"
          >
            <User className="h-5 w-5" />
          </button>
        ) : (
          <Button
            onClick={onAuthClick}
            className="bg-primary hover:bg-primary/90 rounded-full px-8"
          >
            Sign Up
          </Button>
        )}
      </div>
    </header>
  );
}
