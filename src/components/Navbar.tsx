
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">
                CW
              </div>
              <span className="font-semibold text-lg hidden sm:inline-block">CrowdWise</span>
            </Link>
            
            <nav className="hidden md:flex ml-8 gap-6">
              {["Destinations", "About", "Contact"].map((item) => (
                <Link 
                  key={item} 
                  to={`/${item.toLowerCase()}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Button size="sm">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
