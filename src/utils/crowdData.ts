
// Types
export type CrowdLevel = 'Low' | 'Medium' | 'High';

export interface Destination {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  crowdLevel: CrowdLevel;
  lastUpdated: string;
  category: 'Beach' | 'Mountain' | 'City' | 'Historical' | 'Adventure';
  priceRange: 'Budget' | 'Moderate' | 'Luxury';
  rating: number;
}

// Generate crowd level with weighted randomization
export const generateCrowdLevel = (): CrowdLevel => {
  const hour = new Date().getHours();
  const isWeekend = [0, 6].includes(new Date().getDay());
  
  // Base probabilities
  let lowProb = 0.4;
  let mediumProb = 0.4;
  let highProb = 0.2;
  
  // Adjust for time of day
  if (hour >= 9 && hour <= 17) {
    // Daytime: more likely to be crowded
    lowProb -= 0.1;
    highProb += 0.1;
  } else if (hour >= 18 && hour <= 21) {
    // Evening: peak hours
    lowProb -= 0.2;
    highProb += 0.2;
  } else {
    // Early morning or late night: less crowded
    lowProb += 0.2;
    highProb -= 0.2;
  }
  
  // Adjust for weekend
  if (isWeekend) {
    lowProb -= 0.15;
    highProb += 0.15;
  }
  
  // Ensure probabilities are valid
  lowProb = Math.max(0.1, Math.min(0.8, lowProb));
  highProb = Math.max(0.1, Math.min(0.8, highProb));
  mediumProb = 1 - lowProb - highProb;
  
  // Generate random number and determine crowd level
  const rand = Math.random();
  if (rand < lowProb) return 'Low';
  if (rand < lowProb + mediumProb) return 'Medium';
  return 'High';
};

// Mock destination data
export const destinations: Destination[] = [
  {
    id: '1',
    name: 'Serene Shores',
    location: 'Goa, India',
    description: 'A peaceful beachside retreat away from the tourist crowds with pristine waters and golden sands.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    crowdLevel: 'Medium',
    lastUpdated: new Date().toISOString(),
    category: 'Beach',
    priceRange: 'Moderate',
    rating: 4.7
  },
  {
    id: '2',
    name: 'Alpine Hideaway',
    location: 'Shimla, India',
    description: 'Nestled among pine forests, this mountain retreat offers panoramic views and crisp, clean air.',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    crowdLevel: 'Low',
    lastUpdated: new Date().toISOString(),
    category: 'Mountain',
    priceRange: 'Luxury',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Heritage Walk',
    location: 'Jaipur, India',
    description: 'Explore the rich history and architecture of the Pink City through less-traveled pathways.',
    imageUrl: 'https://images.unsplash.com/photo-1460574283810-2aab119d8511',
    crowdLevel: 'High',
    lastUpdated: new Date().toISOString(),
    category: 'Historical',
    priceRange: 'Budget',
    rating: 4.5
  },
  {
    id: '4',
    name: 'Wildlife Safari',
    location: 'Ranthambore, India',
    description: 'An immersive wildlife experience in a less-visited national park with diverse flora and fauna.',
    imageUrl: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    crowdLevel: 'Low',
    lastUpdated: new Date().toISOString(),
    category: 'Adventure',
    priceRange: 'Moderate',
    rating: 4.8
  },
  {
    id: '5',
    name: 'Urban Escape',
    location: 'Mumbai, India',
    description: 'Discover hidden urban gems and peaceful corners in the bustling metropolis.',
    imageUrl: 'https://images.unsplash.com/photo-1580634240124-bc53e6591357',
    crowdLevel: 'High',
    lastUpdated: new Date().toISOString(),
    category: 'City',
    priceRange: 'Luxury',
    rating: 4.4
  },
  {
    id: '6',
    name: 'Valley Retreat',
    location: 'Manali, India',
    description: 'A tranquil valley setting with snow-capped mountains and lush green meadows.',
    imageUrl: 'https://images.unsplash.com/photo-1536768139911-e290a59011e4',
    crowdLevel: 'Medium',
    lastUpdated: new Date().toISOString(),
    category: 'Mountain',
    priceRange: 'Budget',
    rating: 4.6
  }
];

// Update crowd levels for all destinations
export const updateAllCrowdLevels = (): Destination[] => {
  return destinations.map(dest => ({
    ...dest,
    crowdLevel: generateCrowdLevel(),
    lastUpdated: new Date().toISOString()
  }));
};

// Get destinations filtered by crowd level
export const getDestinationsByCrowdLevel = (level: CrowdLevel | 'All'): Destination[] => {
  if (level === 'All') return destinations;
  return destinations.filter(dest => dest.crowdLevel === level);
};

// Format time since last update
export const getTimeSinceUpdate = (dateString: string): string => {
  const now = new Date();
  const updated = new Date(dateString);
  const diffMs = now.getTime() - updated.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins === 1) return '1 min ago';
  if (diffMins < 60) return `${diffMins} mins ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  return `${diffDays} days ago`;
};
