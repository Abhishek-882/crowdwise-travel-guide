
import React from 'react';
import DestinationCard from './DestinationCard';
import { Destination } from '@/utils/crowdData';

interface DestinationGridProps {
  destinations: Destination[];
  isLoading: boolean;
}

const DestinationGrid: React.FC<DestinationGridProps> = ({ destinations, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-video rounded-md mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No destinations found</p>
        <p className="mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.map((destination) => (
        <DestinationCard 
          key={destination.id} 
          destination={destination} 
        />
      ))}
    </div>
  );
};

export default DestinationGrid;
