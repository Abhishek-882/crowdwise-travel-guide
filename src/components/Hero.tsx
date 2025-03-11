
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate assets loading and trigger animation
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        {/* Background image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')",
            opacity: loaded ? 1 : 0,
            transition: 'opacity 1.5s ease-in-out'
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 mt-[-3rem]">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tiny label */}
          <div 
            className={cn(
              "inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-xs font-medium",
              loaded ? "opacity-100" : "opacity-0 translate-y-4",
              "transition-all duration-700 ease-out delay-300"
            )}
          >
            Find Your Perfect Escape
          </div>
          
          {/* Main headline */}
          <h1 
            className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance",
              loaded ? "opacity-100" : "opacity-0 translate-y-4",
              "transition-all duration-700 ease-out delay-500"
            )}
          >
            Discover Places <span className="text-primary">Without the Crowds</span>
          </h1>
          
          {/* Subtitle */}
          <p 
            className={cn(
              "text-lg text-foreground/80 mb-8 max-w-2xl mx-auto text-balance",
              loaded ? "opacity-100" : "opacity-0 translate-y-4",
              "transition-all duration-700 ease-out delay-700"
            )}
          >
            Real-time crowd data helps you find peaceful destinations while avoiding
            the tourist rush. Experience more authentic travel.
          </p>
          
          {/* Search input and button */}
          <div 
            className={cn(
              "flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto",
              loaded ? "opacity-100" : "opacity-0 translate-y-4",
              "transition-all duration-700 ease-out delay-900"
            )}
          >
            <div className="w-full glass-effect rounded-full pl-4 pr-2 py-2 flex items-center">
              <svg 
                className="w-5 h-5 text-muted-foreground mr-3" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
              <input 
                type="text" 
                placeholder="Where would you like to go?" 
                className="w-full bg-transparent border-none focus:outline-none text-sm"
              />
            </div>
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
              Explore
            </button>
          </div>
          
          {/* Stats */}
          <div 
            className={cn(
              "flex flex-wrap justify-center mt-16 gap-x-12 gap-y-6",
              loaded ? "opacity-100" : "opacity-0 translate-y-4",
              "transition-all duration-700 ease-out delay-1100"
            )}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">200+</p>
              <p className="text-sm text-muted-foreground">Destinations</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">25k+</p>
              <p className="text-sm text-muted-foreground">Happy Travelers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">Hourly</p>
              <p className="text-sm text-muted-foreground">Crowd Updates</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Arrow indicator */}
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce",
          loaded ? "opacity-100" : "opacity-0",
          "transition-opacity duration-1000 ease-out delay-1500"
        )}
      >
        <svg 
          className="w-6 h-6 text-foreground/60" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
