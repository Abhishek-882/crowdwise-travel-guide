
import { CrowdLevel } from '@/utils/crowdData';
import { cn } from '@/lib/utils';

interface CrowdFilterProps {
  activeFilter: CrowdLevel | 'All';
  onFilterChange: (filter: CrowdLevel | 'All') => void;
  className?: string;
}

const CrowdFilter = ({ activeFilter, onFilterChange, className }: CrowdFilterProps) => {
  const filters: { label: string; value: CrowdLevel | 'All'; icon: React.ReactNode; description: string }[] = [
    {
      label: 'All Places',
      value: 'All',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'See all destinations regardless of crowd levels'
    },
    {
      label: 'Low Crowds',
      value: 'Low',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      description: 'Perfect for peaceful travel experiences'
    },
    {
      label: 'Medium Crowds',
      value: 'Medium',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      description: 'Balanced atmosphere with moderate activity'
    },
    {
      label: 'High Crowds',
      value: 'High',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: 'Lively and bustling popular destinations'
    }
  ];

  return (
    <div className={cn("flex flex-col", className)}>
      <h3 className="text-lg font-medium mb-4">Filter by Crowd Level</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "flex flex-col items-start rounded-xl p-4 transition-all duration-200",
              "hover:bg-secondary/80",
              activeFilter === filter.value 
                ? "bg-primary/10 text-primary border-primary/20 border" 
                : "bg-secondary border-transparent border"
            )}
          >
            <div className="flex items-center mb-2">
              <div className={cn(
                "rounded-full p-1.5 mr-3",
                activeFilter === filter.value 
                  ? "bg-primary/20" 
                  : "bg-background"
              )}>
                {filter.icon}
              </div>
              <span className="font-medium">{filter.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{filter.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CrowdFilter;
