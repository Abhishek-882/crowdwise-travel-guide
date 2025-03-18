
import { useState, useEffect, useCallback } from 'react';
import { Destination } from '@/utils/crowdData';

// Sample destinations data with all required properties
const sampleDestinations: Destination[] = [
  {
    id: '1',
    name: 'Taj Mahal',
    location: 'Agra, Uttar Pradesh',
    category: 'Historical',
    description: 'One of the seven wonders of the world, an ivory-white marble mausoleum.',
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523',
    crowdLevel: 'Medium',
    lastUpdated: '10 min ago',
    priceRange: '₹1000-₹2000',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Goa Beaches',
    location: 'Goa',
    category: 'Beach',
    description: 'Famous beaches with golden sand and clear water.',
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2',
    crowdLevel: 'High',
    lastUpdated: '5 min ago',
    priceRange: '₹2000-₹5000',
    rating: 4.5
  },
  {
    id: '3',
    name: 'Shimla Hills',
    location: 'Shimla, Himachal Pradesh',
    category: 'Mountain',
    description: 'Beautiful hill station with scenic views.',
    imageUrl: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23',
    crowdLevel: 'Low',
    lastUpdated: '15 min ago',
    priceRange: '₹3000-₹6000',
    rating: 4.7
  }
];

const useCrowdData = () => {
  const [destinations, setDestinations] = useState<Destination[]>(sampleDestinations);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  // Simulate fetching data
  useEffect(() => {
    console.log("useCrowdData hook initialized");
    // This would be an API call in a real application
  }, []);

  // Filter by crowd level
  const filterByCrowdLevel = (level: string | null) => {
    setFilter(level);
    console.log(`Filtering by crowd level: ${level}`);
    
    if (!level) {
      setDestinations(sampleDestinations);
      return;
    }
    
    const filtered = sampleDestinations.filter(dest => dest.crowdLevel === level);
    setDestinations(filtered);
  };

  // Force update function (simulate refresh)
  const forceUpdate = useCallback(() => {
    setIsLoading(true);
    console.log("Forcing update of crowd data");
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would fetch fresh data
    }, 1000);
  }, []);

  return {
    destinations,
    isLoading,
    filter,
    filterByCrowdLevel,
    forceUpdate
  };
};

export default useCrowdData;
