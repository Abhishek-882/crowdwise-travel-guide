
import React from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import CrowdFilter from '@/components/CrowdFilter';
import DestinationGrid from '@/components/DestinationGrid';
import useCrowdData from '@/hooks/useCrowdData';
import { Destination } from '@/utils/crowdData';
import { toast } from '@/components/ui/use-toast';

const Destinations = () => {
  const {
    destinations,
    isLoading,
    filter,
    filterByCrowdLevel,
    forceUpdate
  } = useCrowdData();

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Destination[]>([]);

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

  React.useEffect(() => {
    console.log("Destinations page loaded");
    toast({
      title: "Destinations",
      description: "Browse and discover crowd-free destinations",
    });
  }, []);

  const displayDestinations = searchQuery ? searchResults : destinations;

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto pt-24 px-6 py-16">
        <div className="mb-12 max-w-2xl">
          <div className="flex items-center mb-2">
            <div className="w-10 h-1 bg-primary rounded-full mr-4"></div>
            <span className="text-sm font-medium text-primary">All Destinations</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Explore All Destinations</h2>
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
        <DestinationGrid
          destinations={displayDestinations}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Destinations;
