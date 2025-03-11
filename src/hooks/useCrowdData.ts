
import { useState, useEffect } from 'react';
import { 
  Destination, 
  destinations as initialDestinations, 
  updateAllCrowdLevels,
  CrowdLevel
} from '@/utils/crowdData';

export function useCrowdData() {
  const [destinations, setDestinations] = useState<Destination[]>(initialDestinations);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(initialDestinations);
  const [filter, setFilter] = useState<CrowdLevel | 'All'>('All');
  const [isLoading, setIsLoading] = useState(false);

  // Update crowd levels every hour with a bit of randomization
  useEffect(() => {
    // Initial update
    updateCrowdData();

    // Set up interval for updates - randomly between 45-75 minutes to seem more natural
    const getRandomInterval = () => Math.floor(Math.random() * (75 - 45 + 1) + 45) * 60 * 1000;
    let intervalId: number;

    const scheduleNextUpdate = () => {
      intervalId = window.setTimeout(() => {
        updateCrowdData();
        scheduleNextUpdate();
      }, getRandomInterval());
    };

    scheduleNextUpdate();

    return () => clearTimeout(intervalId);
  }, []);

  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filter, destinations]);

  // Update crowd data with a loading state to show user it's updating
  const updateCrowdData = () => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      const updatedDestinations = updateAllCrowdLevels();
      setDestinations(updatedDestinations);
      setIsLoading(false);
    }, 800);
  };

  // Apply current filters to destinations
  const applyFilters = () => {
    let results = [...destinations];
    
    if (filter !== 'All') {
      results = results.filter(dest => dest.crowdLevel === filter);
    }
    
    setFilteredDestinations(results);
  };

  // Set filter by crowd level
  const filterByCrowdLevel = (level: CrowdLevel | 'All') => {
    setFilter(level);
  };

  // Force manual update (for user-triggered updates)
  const forceUpdate = () => {
    updateCrowdData();
  };

  return {
    destinations: filteredDestinations,
    allDestinations: destinations,
    isLoading,
    filter,
    filterByCrowdLevel,
    forceUpdate
  };
}

export default useCrowdData;
