import React from 'react';
import { useSystem } from '../context/SystemContext';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { WEEKLY_PERFORMANCE } from '../data/analyticsData';

export const Analytics: React.FC = () => {
  const { trains } = useSystem();
  const departures = trains.slice(0, 8); // Top 8 trains

  return (
    <div className="space-y-10 max-w-7xl">
      
      {/* Title Header matching Figma */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] dark:text-white tracking-tight transition-colors">
          Analytics
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] dark:text-gray-400 uppercase tracking-wider transition-colors">
          Northern Zone Control Room
        </span>
      </div>

      {/* Top 3 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-1">
        <StatCard
          label="On-Time Performance"
          value="84.6%"
          delta="+4.2%"
          deltaType="positive"
        />
        <StatCard
          label="Average Delay"
          value="11.8 min"
          delta="−8%"
          deltaType="positive"
        />
        <StatCard
          label="Total Alerts This Week"
          value="37"
        />
      </div>

      {/* Weekly On-Time Performance Bar Chart matching Figma */}
      <div className="space-y-4 pt-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
          WEEKLY ON-TIME PERFORMANCE
        </div>

        {/* Minimal Bar Chart */}
        <div className="pt-8 pb-4">
          <div className="grid grid-cols-7 gap-6 items-end h-36 max-w-2xl">
            {WEEKLY_PERFORMANCE.map((item) => {
              const heightPercent = (item.percentage / 100) * 100;
              return (
                <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                  {/* Percentage label */}
                  <span className="font-mono text-[11px] text-[#5B6478] dark:text-gray-400 transition-colors">
                    {item.percentage}%
                  </span>

                  {/* Bar */}
                  <div className="w-full flex justify-center h-24 items-end">
                    <div
                      className={`w-full max-w-[48px] transition-all duration-500 rounded-none ${
                        item.highlight 
                          ? 'bg-[#2F5FD1] dark:bg-[#4dabf7]' 
                          : 'bg-transparent'
                      }`}
                      style={{
                        height: item.highlight ? `${heightPercent}%` : '0px'
                      }}
                    />
                  </div>

                  {/* Day label */}
                  <span className="font-sans text-xs text-[#5B6478] dark:text-gray-400 font-medium mt-1 transition-colors">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Departure Schedule Section matching Figma */}
      <div className="space-y-4 pt-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
          LIVE DEPARTURE SCHEDULE
        </div>

        <div className="overflow-x-auto max-w-4xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-mono uppercase text-[#5B6478] dark:text-gray-400 tracking-wider transition-colors border-b border-[rgba(15,44,92,0.10)] dark:border-white/10">
                <th className="py-2.5 pr-6 font-medium">TRAIN</th>
                <th className="py-2.5 pr-6 font-medium">DESTINATION</th>
                <th className="py-2.5 pr-6 font-medium">PLATFORM</th>
                <th className="py-2.5 pr-6 font-medium">SCHEDULED</th>
                <th className="py-2.5 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {departures.map((row) => (
                <tr key={row.trainNo} className="hover:bg-[#F8F9FB]/50 dark:hover:bg-slate-800/50 transition-colors border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 last:border-0">
                  <td className="py-3.5 pr-6 font-mono font-medium text-[#0F2C5C] dark:text-gray-200">
                    {row.trainNo}
                  </td>
                  <td className="py-3.5 pr-6 font-medium text-[#0F2C5C] dark:text-gray-200">
                    {row.destination}
                  </td>
                  <td className="py-3.5 pr-6 font-mono font-medium text-[#0F2C5C] dark:text-gray-200">
                    {row.platform}
                  </td>
                  <td className="py-3.5 pr-6 font-mono text-[#0F2C5C] dark:text-gray-200">
                    {row.scheduledDeparture}
                  </td>
                  <td className="py-3.5">
                    <StatusBadge status={row.status} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
