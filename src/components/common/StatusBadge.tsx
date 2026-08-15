import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant?: 'outline' | 'solid';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant = 'outline',
  size = 'sm' 
}) => {
  const upper = status.toUpperCase();

  let colorClasses = '';

  if (upper.includes('DELAY') || upper === 'CRITICAL' || upper === 'HIGH RISK') {
    colorClasses = variant === 'outline' 
      ? 'border-[#C23636] text-[#C23636] bg-transparent'
      : 'bg-[#C23636] text-white border-transparent';
  } else if (upper.includes('APPROACHING') || upper === 'HIGH' || upper === 'CAUTION' || upper === 'MODERATE') {
    colorClasses = variant === 'outline' 
      ? 'border-[#B9790A] text-[#B9790A] bg-transparent'
      : 'bg-[#B9790A] text-white border-transparent';
  } else if (upper.includes('ON TIME') || upper === 'NORMAL' || upper === 'RESOLVED' || upper === 'CLEAR' || upper === 'OPERATIONAL') {
    colorClasses = variant === 'outline' 
      ? 'border-[#1E7F4F] text-[#1E7F4F] bg-transparent'
      : 'bg-[#1E7F4F] text-white border-transparent';
  } else if (upper.includes('BOARDING') || upper === 'AI' || upper === 'INFO' || upper === 'REROUTE' || upper === 'CONGESTION' || upper === 'PREDICTION') {
    colorClasses = variant === 'outline' 
      ? 'border-[#2F5FD1] text-[#2F5FD1] bg-transparent'
      : 'bg-[#2F5FD1] text-white border-transparent';
  } else {
    colorClasses = 'border-[#5B6478] text-[#5B6478] bg-transparent';
  }

  const sizeClasses = size === 'sm' 
    ? 'text-[11px] px-1.5 py-0.5 tracking-wider' 
    : 'text-xs px-2 py-1 tracking-wider';

  return (
    <span 
      className={`inline-flex items-center justify-center font-mono font-semibold uppercase border rounded-xs ${sizeClasses} ${colorClasses} whitespace-nowrap transition-colors`}
    >
      {status}
    </span>
  );
};
