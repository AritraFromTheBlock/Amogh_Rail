import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  color?: string; // custom hex or automatic
  status?: 'NORMAL' | 'HIGH' | 'CRITICAL' | 'DEFAULT';
  height?: string;
  showTrack?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color,
  status,
  height = 'h-1.5',
  showTrack = true
}) => {
  const clamped = Math.min(100, Math.max(0, value));

  let barColor = color;
  if (!barColor) {
    if (status === 'CRITICAL' || clamped >= 90) {
      barColor = '#C23636'; // danger
    } else if (status === 'HIGH' || clamped >= 75) {
      barColor = '#B9790A'; // caution
    } else if (status === 'NORMAL') {
      barColor = '#1E7F4F'; // clear
    } else {
      barColor = '#0F2C5C'; // brand navy
    }
  }

  return (
    <div className={`w-full ${height} ${showTrack ? 'bg-slate-100' : 'bg-transparent'} rounded-none overflow-hidden relative`}>
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{
          width: `${clamped}%`,
          backgroundColor: barColor
        }}
      />
    </div>
  );
};
