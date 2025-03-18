
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Destination } from '@/utils/crowdData';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { name, location, crowdLevel, imageUrl, lastUpdated } = destination;
  
  // Determine crowd level indicator color
  const crowdColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500"
  }[crowdLevel];

  return (
    <Card className="overflow-hidden group transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageUrl || "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2"} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium">
          {lastUpdated}
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm">{location}</p>
      </CardContent>
      
      <CardFooter className="px-4 pb-4 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full ${crowdColor}`}></div>
          <span className="text-sm">{crowdLevel} Crowd</span>
        </div>
        
        <button className="text-sm text-primary font-medium hover:underline">
          View Details
        </button>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
