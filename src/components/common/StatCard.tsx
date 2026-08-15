import React from 'react';

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
  return (
    <div className="flex flex-col py-1">
      <div className="text-[11px] font-medium uppercase tracking-wider text-[#5B6478] mb-1.5 font-sans">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-2xl md:text-3xl font-semibold tracking-tight text-[#0F2C5C]">
          {value}
          {unit && <span className="text-lg font-normal ml-1 text-[#5B6478]">{unit}</span>}
        </span>
        {delta && (
          <span 
            className={`font-mono text-xs font-medium ${
              deltaType === 'positive' ? 'text-[#1E7F4F]' :
              deltaType === 'negative' ? 'text-[#C23636]' :
              deltaType === 'caution' ? 'text-[#B9790A]' :
              'text-[#5B6478]'
            }`}
          >
            {delta}
          </span>
        )}
      </div>
      {subLabel && (
        <span className="text-[11px] text-[#5B6478] mt-1 font-sans">
          {subLabel}
        </span>
      )}
    </div>
  );
};
