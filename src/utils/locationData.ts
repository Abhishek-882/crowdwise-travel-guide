
export interface Location {
  id: string;
  name: string;
  region: string;
  categories: string[];
  description: string;
  imageUrl: string;
  basePrice: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const regions = [
  'North India',
  'South India',
  'East India',
  'West India',
  'Central India',
  'Northeast India'
] as const;

export const categories = [
  'Historical',
  'Religious',
  'Beach',
  'Mountain',
  'Wildlife',
  'Adventure',
  'Cultural',
  'Heritage'
] as const;

export const locations: Location[] = [
  {
    id: '1',
    name: 'Taj Mahal',
    region: 'North India',
    categories: ['Historical', 'Heritage'],
    description: 'One of the seven wonders of the world, this ivory-white marble mausoleum is a testament to eternal love.',
    imageUrl: 'https://example.com/taj-mahal.jpg',
    basePrice: 1500,
    coordinates: {
      lat: 27.1751,
      lng: 78.0421
    }
  },
  // ... Add at least 19 more locations
];

export const calculateTravelCost = (
  distance: number,
  vehicleType: string,
  ticketType: 'normal' | 'vip' | null,
  includeGuide: boolean
): number => {
  let baseCost = distance * 2; // ₹2 per km
  
  // Vehicle type multiplier
  const vehicleMultiplier = {
    car: 1,
    bus: 0.5,
    train: 0.7
  }[vehicleType] || 1;
  
  // Ticket type multiplier
  const ticketMultiplier = ticketType === 'vip' ? 2 : 1;
  
  // Guide cost
  const guideCost = includeGuide ? 2000 : 0;
  
  return (baseCost * vehicleMultiplier * ticketMultiplier) + guideCost;
};
