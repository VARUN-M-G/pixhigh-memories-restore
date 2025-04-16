
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogIn } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link to="/" className="text-2xl font-bold text-primary">
            Pixhigh
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild className="glass-input">
            <Link to="/login">
              <LogIn className="h-4 w-4 mr-1" />
              Login
            </Link>
          </Button>
          <Button size="sm" asChild className="glass">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
