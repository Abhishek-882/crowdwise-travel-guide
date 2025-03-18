
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DestinationGrid from '@/components/DestinationGrid';
import CrowdFilter from '@/components/CrowdFilter';
import SearchBar from '@/components/SearchBar';
import useCrowdData from '@/hooks/useCrowdData';
import { cn } from '@/lib/utils';
import { Destination } from '@/utils/crowdData';
import { toast } from '@/components/ui/use-toast';

const Index = () => {
  const location = useLocation();
  const { 
    destinations, 
    isLoading, 
    filter, 
    filterByCrowdLevel,
    forceUpdate
  } = useCrowdData();
  
  const [scrollY, setScrollY] = useState(0);
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Log navigation events
  useEffect(() => {
    console.log("Current path:", location.pathname);
    // Show toast notification when route changes
    toast({
      title: "Page Loaded",
      description: `You are now viewing: ${location.pathname || 'Home'}`,
    });
    
    // Scroll to top on navigation
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = destinations.filter(dest => 
      dest.name.toLowerCase().includes(query.toLowerCase()) ||
      dest.location.toLowerCase().includes(query.toLowerCase()) ||
      dest.description.toLowerCase().includes(query.toLowerCase()) ||
      dest.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const displayDestinations = searchQuery ? searchResults : destinations;
  
  // Render different content based on path
  const renderContent = () => {
    const path = location.pathname;
    
    if (path === '/about') {
      return (
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold mb-6">About CrowdWise</h1>
          <p className="max-w-2xl mx-auto">
            CrowdWise is a platform dedicated to helping travelers find less crowded destinations.
            Our mission is to provide real-time crowd data to enhance travel experiences.
          </p>
        </div>
      );
    }
    
    if (path === '/contact') {
      return (
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          <p className="max-w-2xl mx-auto mb-6">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <button className="px-6 py-3 bg-primary text-white rounded-md">
            Send Message
          </button>
        </div>
      );
    }
    
    if (path === '/login' || path === '/signup') {
      return (
        <div className="py-24 text-center">
          <h1 className="text-3xl font-bold mb-6">
            {path === '/login' ? 'Login to Your Account' : 'Create an Account'}
          </h1>
          <div className="max-w-md mx-auto p-6 bg-card rounded-lg shadow-md">
            <p className="mb-6">
              {path === '/login' 
                ? 'Enter your credentials to access your account' 
                : 'Join CrowdWise to get personalized recommendations'
              }
            </p>
            <button className="w-full py-3 bg-primary text-white rounded-md">
              {path === '/login' ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </div>
      );
    }
    
    // Default: show destinations
    return (
      <>
        {/* Section heading */}
        <div className="mb-12 max-w-2xl">
          <div className="flex items-center mb-2">
            <div className="w-10 h-1 bg-primary rounded-full mr-4"></div>
            <span className="text-sm font-medium text-primary">Live Updates</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Discover Crowd-Free Destinations</h2>
          <p className="text-muted-foreground">
            Find your perfect escape with our real-time crowd data. 
            Our system updates crowd levels hourly to help you avoid busy tourist spots.
          </p>
        </div>
        
        {/* Search and filter section */}
        <div className="mb-12 space-y-6">
          {/* Data update indicator */}
          <div className="p-4 rounded-lg bg-secondary flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative mr-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full absolute inset-0 animate-ping opacity-75"></div>
              </div>
              <span className="text-sm">Crowd data automatically updates hourly</span>
            </div>
            <button 
              onClick={forceUpdate}
              className="px-4 py-1.5 rounded-md bg-background hover:bg-background/80 text-sm font-medium flex items-center space-x-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Update Now</span>
            </button>
          </div>
          
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <SearchBar 
              onSearch={handleSearch} 
              className="w-full sm:max-w-md"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
          
          {/* Filters */}
          <CrowdFilter 
            activeFilter={filter} 
            onFilterChange={filterByCrowdLevel}
          />
          
          {/* Search results indicator */}
          {searchQuery && (
            <div className="text-sm">
              Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </div>
          )}
        </div>
        
        {/* Destination grid */}
        <div className={cn(
          "opacity-0 translate-y-8 transition-all duration-1000 ease-out",
          scrollY > 300 ? "opacity-100 translate-y-0" : ""
        )}>
          <DestinationGrid 
            destinations={displayDestinations} 
            isLoading={isLoading}
          />
        </div>
        
        {/* More information section */}
        <div className={cn(
          "mt-24 bg-secondary rounded-2xl p-8 sm:p-12 opacity-0 translate-y-8 transition-all duration-1000 ease-out",
          scrollY > 800 ? "opacity-100 translate-y-0" : ""
        )}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-2">
                <div className="w-8 h-1 bg-primary rounded-full mr-3"></div>
                <span className="text-sm font-medium text-primary">How It Works</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Real-Time Crowd Intelligence</h2>
              <p className="text-foreground/80 mb-6">
                Our platform uses advanced algorithms to analyze and predict crowd levels at destinations worldwide. 
                Get updated data every hour to make informed travel decisions.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Hourly crowd level updates",
                  "Filter destinations by crowd density",
                  "Discover hidden gems and less-crowded alternatives",
                  "Make informed travel decisions based on real data"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 text-primary mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="mt-8 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                Learn More
              </button>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden relative md:absolute md:top-1/2 md:-translate-y-1/2 card-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
                  alt="Serene mountain landscape"
                  className="w-full h-full object-cover"
                />
                
                {/* Stats overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 glass-effect flex justify-between items-center">
                  <div className="text-center flex-1">
                    <p className="text-lg font-bold">Low</p>
                    <p className="text-xs">Current Crowd</p>
                  </div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div className="text-center flex-1">
                    <p className="text-lg font-bold">Peak</p>
                    <p className="text-xs">Evening Hours</p>
                  </div>
                  <div className="h-10 w-px bg-white/20"></div>
                  <div className="text-center flex-1">
                    <p className="text-lg font-bold">Perfect</p>
                    <p className="text-xs">Morning Visit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className={cn(
          "mt-24 text-center max-w-3xl mx-auto opacity-0 translate-y-8 transition-all duration-1000 ease-out",
          scrollY > 1200 ? "opacity-100 translate-y-0" : ""
        )}>
          <h2 className="text-3xl font-bold mb-6">Ready for a Crowd-Free Adventure?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of travelers who use our platform to discover peaceful destinations and create more meaningful travel experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg bg-secondary hover:bg-secondary/70 font-medium transition-colors">
              View All Destinations
            </button>
          </div>
        </div>
      </>
    );
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Content sections */}
      <main className="container mx-auto px-6 py-16">
        {renderContent()}
      </main>
      
      {/* Footer */}
      <footer className="bg-secondary py-12 mt-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <img src="/logo.svg" alt="CrowdWise" className="h-8 w-8 text-primary mr-2" />
              <span className="font-semibold text-lg">CrowdWise</span>
            </div>
            
            <div className="flex gap-6">
              {["Destinations", "About Us", "How It Works", "Contact"].map((item, index) => (
                <a key={index} href="#" className="text-sm hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} CrowdWise. All rights reserved.
            </p>
            
            <div className="flex gap-4">
              {["Facebook", "Twitter", "Instagram"].map((social, index) => (
                <a key={index} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
