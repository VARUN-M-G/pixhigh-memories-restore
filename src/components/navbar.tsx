
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LogIn, User, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

export function Navbar() {
  const { user, signOut } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  // Add scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-full px-4 py-3 sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img 
            alt="Pixhigh Logo" 
            className="h-16 w-auto" 
            src="/lovable-uploads/240e9a32-401f-482d-914c-85046ee2364a.png" 
          />
        </Link>
        
        {isMobile ? (
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu} 
              className="p-1 h-12 w-12 rounded-full hover:bg-gray-100/80"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
            
            {mobileMenuOpen && (
              <div className="absolute right-0 top-14 w-60 rounded-lg shadow-xl py-2 bg-white dark:bg-gray-800 glass-card z-50 animate-fade-in">
                <Link 
                  to="/" 
                  className="block px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Home</span>
                </Link>
                
                {user ? (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                      <span className="font-medium">Dashboard</span>
                    </Link>
                    
                    <Link 
                      to="/profile" 
                      className="block px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <User className="h-5 w-5 text-green-600" />
                      <span className="font-medium">Profile</span>
                    </Link>
                    
                    <div className="border-t my-1 border-gray-200 dark:border-gray-700"></div>
                    
                    <button 
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }} 
                      className="block px-5 py-3 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-red-600"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block px-5 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LogIn className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">Login</span>
                    </Link>
                    
                    <Link 
                      to="/signup" 
                      className="mx-4 my-2 py-2 px-5 bg-blue-600 text-white rounded-lg flex items-center justify-center font-medium" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up Free
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild className="font-medium">
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild className="font-medium">
                  <Link to="/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                    </svg>
                    Dashboard
                  </Link>
                </Button>
                
                <Button variant="outline" size="sm" asChild className="glass-input font-medium">
                  <Link to="/profile">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
                
                <Button size="sm" variant="ghost" onClick={() => signOut()} className="font-medium text-red-600 hover:text-red-700 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild className="glass-input font-medium">
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                
                <Button size="sm" asChild className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/signup">Sign Up Free</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
