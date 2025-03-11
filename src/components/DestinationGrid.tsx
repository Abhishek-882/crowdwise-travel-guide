
import { Fragment } from 'react';
import DestinationCard from './DestinationCard';
import { cn } from '@/lib/utils';
import { Destination } from '@/utils/crowdData';

interface DestinationGridProps {
  destinations: Destination[];
  isLoading: boolean;
  className?: string;
}

const DestinationGrid = ({ destinations, isLoading, className }: DestinationGridProps) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
      {isLoading ? (
        // Skeleton loaders
        <Fragment>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="rounded-2xl overflow-hidden card-shadow animate-pulse">
              <div className="aspect-[4/3] bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
              </div>
            </div>
          ))}
        </Fragment>
      ) : destinations.length > 0 ? (
        // Actual destinations
        destinations.map((destination) => (
          <DestinationCard 
            key={destination.id} 
            destination={destination} 
          />
        ))
      ) : (
        // Empty state
        <div className="col-span-full text-center py-12">
          <div className="mb-4">
            <svg 
              className="w-16 h-16 mx-auto text-muted-foreground/40" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">No destinations found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or check back later for new destinations.</p>
        </div>
      )}
    </div>
  );
};

export default DestinationGrid;
