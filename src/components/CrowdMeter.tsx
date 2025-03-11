
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CrowdLevel, getTimeSinceUpdate } from '@/utils/crowdData';

interface CrowdMeterProps {
  level: CrowdLevel;
  lastUpdated: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CrowdMeter = ({ level, lastUpdated, className, size = 'md' }: CrowdMeterProps) => {
  const [timeAgo, setTimeAgo] = useState(getTimeSinceUpdate(lastUpdated));
  
  // Update time display every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getTimeSinceUpdate(lastUpdated));
    }, 60000);
    
    return () => clearInterval(interval);
  }, [lastUpdated]);
  
  // Color and position based on crowd level
  const getColor = () => {
    switch(level) {
      case 'Low': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'High': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };
  
  const getPosition = () => {
    switch(level) {
      case 'Low': return 'left-[10%]';
      case 'Medium': return 'left-[50%]';
      case 'High': return 'left-[90%]';
      default: return 'left-[10%]';
    }
  };
  
  // Size classes
  const getSizeClasses = () => {
    switch(size) {
      case 'sm': return 'h-1.5 text-xs';
      case 'lg': return 'h-3 text-base';
      default: return 'h-2 text-sm';
    }
  };
  
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Label */}
      <div className="flex items-center justify-between mb-1.5">
        <span className={cn(
          "font-medium",
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
        )}>
          Crowd Level: <span className={cn(
            level === 'Low' ? 'text-green-600' : 
            level === 'Medium' ? 'text-yellow-600' : 
            'text-red-600'
          )}>{level}</span>
        </span>
        <span className={cn(
          "text-muted-foreground",
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs'
        )}>
          Updated {timeAgo}
        </span>
      </div>
      
      {/* Meter */}
      <div className={cn('relative w-full bg-secondary rounded-full overflow-hidden', getSizeClasses())}>
        {/* Dots showing possible values */}
        <div className="absolute inset-0 flex justify-between px-[5%]">
          <div className="h-full w-1 rounded-full bg-green-500/30"></div>
          <div className="h-full w-1 rounded-full bg-yellow-500/30"></div>
          <div className="h-full w-1 rounded-full bg-red-500/30"></div>
        </div>
        
        {/* Current value indicator */}
        <div 
          className={cn(
            'absolute h-full w-3 rounded-full transform -translate-x-1/2 transition-all duration-500 ease-out',
            getColor(),
            getPosition()
          )}
        />
      </div>
    </div>
  );
};

export default CrowdMeter;
