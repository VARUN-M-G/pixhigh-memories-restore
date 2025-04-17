
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogIn, User, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export function Navbar() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <nav className="w-full px-4 py-3 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/651fabb7-571a-4fec-9c31-0e2544550a88.png"
            alt="Pixhigh Logo" 
            className="h-14 w-auto"
          />
        </Link>
        
        {isMobile ? (
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="p-1">
              <Menu className="h-6 w-6" />
            </Button>
            
            {mobileMenuOpen && (
              <div className="absolute right-0 top-12 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 glass-card z-50">
                <Link 
                  to="/" 
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                
                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <button 
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }} 
                      className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4" />
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild className="font-medium">
              <Link to="/">
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
            </Button>
            
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild className="font-medium">
                  <Link to="/dashboard">
                    Dashboard
                  </Link>
                </Button>
                
                <Button variant="outline" size="sm" asChild className="glass-input font-medium">
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Link>
                </Button>
                
                <Button size="sm" variant="ghost" onClick={() => signOut()} className="glass font-medium">
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="glass-input font-medium">
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Link>
                </Button>
                
                <Button size="sm" asChild className="glass font-medium bg-primary hover:bg-primary/90 text-white">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
