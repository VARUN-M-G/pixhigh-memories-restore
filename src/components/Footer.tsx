
import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 mt-12 border-t">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold mb-4 text-lg">Pixhigh</h3>
          <p className="text-muted-foreground">
            Transform your photos with AI-powered restoration and enhancement.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <nav className="space-y-2">
            <Link to="/" className="block text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/dashboard" className="block text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link to="/profile" className="block text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
          </nav>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Legal & Contact</h4>
          <div className="space-y-2">
            <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <p className="text-muted-foreground mt-4">
              Email: <a 
                href="mailto:varunmg101@gmail.com" 
                className="underline hover:text-blue-600 transition-colors"
              >
                varunmg101@gmail.com
              </a>
            </p>
            <p className="text-muted-foreground">
              © {new Date().getFullYear()} Prajwal C | Tech Mahindra. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
