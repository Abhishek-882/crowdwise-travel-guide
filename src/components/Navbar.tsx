
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';
import ProfileModal from './ProfileModal';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

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
              {[
                { name: "Destinations", path: "/destinations" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowProfileModal(true)}
                >
                  Profile
                </Button>
                <Button 
                  size="sm"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowAuthModal(true)}
                >
                  Login
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setShowAuthModal(false)}
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)}
        />
      )}
      
      {showProfileModal && (
        <ProfileModal 
          isOpen={showProfileModal} 
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
