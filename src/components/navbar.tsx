
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogIn, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="w-full px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/651fabb7-571a-4fec-9c31-0e2544550a88.png"
            alt="Pixhigh Logo" 
            className="h-10 w-auto"
          />
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
          
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </Button>
              
              <Button variant="outline" size="sm" asChild className="glass-input">
                <Link to="/profile">
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Link>
              </Button>
              
              <Button size="sm" variant="ghost" onClick={() => signOut()} className="glass">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild className="glass-input">
                <Link to="/login">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
              
              <Button size="sm" asChild className="glass">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
