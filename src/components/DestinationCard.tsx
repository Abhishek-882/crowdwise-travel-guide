
import { useState } from 'react';
import { cn } from '@/lib/utils';
import CrowdMeter from './CrowdMeter';
import { Destination } from '@/utils/crowdData';

interface DestinationCardProps {
  destination: Destination;
  className?: string;
}

const DestinationCard = ({ destination, className }: DestinationCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { name, location, description, imageUrl, crowdLevel, lastUpdated, category, rating } = destination;
  
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl transition-all duration-300 card-shadow hover:shadow-lg animate-scale-in",
        className
      )}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <div 
          className={cn(
            "absolute inset-0 bg-gray-200 animate-pulse-slow",
            imageLoaded ? "opacity-0" : "opacity-100"
          )}
        />
        <img 
          src={imageUrl} 
          alt={name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            "group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Category pill */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-effect text-xs font-medium">
          {category}
        </div>
        
        {/* Rating pill */}
        <div className="absolute top-4 right-4 px-2 py-1 rounded-full glass-effect text-xs font-medium flex items-center">
          <svg 
            className="w-3.5 h-3.5 text-yellow-400 mr-1" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {rating.toFixed(1)}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-medium leading-tight mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{location}</p>
        <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{description}</p>
        
        {/* Crowd meter */}
        <CrowdMeter level={crowdLevel} lastUpdated={lastUpdated} size="sm" />
        
        {/* Action button */}
        <button className="w-full mt-4 py-2 rounded-lg bg-secondary hover:bg-secondary/70 text-sm font-medium transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
