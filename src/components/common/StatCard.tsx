import React from 'react';
import { useToast } from '../../context/ToastContext';

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaType?: 'positive' | 'negative' | 'neutral' | 'caution';
  subLabel?: string;
  unit?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  delta,
  deltaType = 'neutral',
  subLabel,
  unit
}) => {
  const { addToast } = useToast();
  return (
    <div 
      className="flex flex-col py-1 cursor-pointer group hover:bg-[#F8F9FB] dark:hover:bg-[#1f2937] px-2 -mx-2 rounded transition-colors"
      onClick={() => addToast(`Viewing metric history: ${label}`, 'info')}
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-[#5B6478] dark:text-gray-400 mb-1.5 font-sans transition-colors">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-2xl md:text-3xl font-semibold tracking-tight text-[#0F2C5C] dark:text-white transition-colors">
          {value}
          {unit && <span className="text-lg font-normal ml-1 text-[#5B6478] dark:text-gray-400">{unit}</span>}
        </span>
        {delta && (
          <span 
            className={`font-mono text-xs font-medium ${
              deltaType === 'positive' ? 'text-[#1E7F4F] dark:text-[#4ade80]' :
              deltaType === 'negative' ? 'text-[#C23636] dark:text-[#f87171]' :
              deltaType === 'caution' ? 'text-[#B9790A] dark:text-[#fbbf24]' :
              'text-[#5B6478] dark:text-gray-400'
            } transition-colors`}
          >
            {delta}
          </span>
        )}
      </div>
      {subLabel && (
        <span className="text-[11px] text-[#5B6478] dark:text-gray-500 mt-1 font-sans transition-colors">
          {subLabel}
        </span>
      )}
    </div>
  );
};
