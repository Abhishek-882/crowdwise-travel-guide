
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-primary/20 to-background pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Smarter, <span className="text-primary">Avoid Crowds</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover the best destinations with real-time crowd data to ensure a peaceful and enjoyable travel experience.
          </p>
          <button className="px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
            Explore Now
          </button>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-primary/10 to-transparent opacity-70 -z-10"></div>
    </div>
  );
};

export default Hero;
