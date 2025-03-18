
import React from 'react';
import { cn } from "@/lib/utils";

interface CrowdFilterProps {
  activeFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

const CrowdFilter: React.FC<CrowdFilterProps> = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { value: null, label: 'All', icon: '🌍' },
    { value: 'Low', label: 'Low Crowd', icon: '🟢' },
    { value: 'Medium', label: 'Medium Crowd', icon: '🟡' },
    { value: 'High', label: 'High Crowd', icon: '🔴' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.label}
          onClick={() => onFilterChange(filter.value)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            activeFilter === filter.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary hover:bg-secondary/80"
          )}
        >
          <span className="mr-1">{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default CrowdFilter;
