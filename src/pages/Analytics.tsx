import React from 'react';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { WEEKLY_PERFORMANCE } from '../data/mockData';

export const Analytics: React.FC = () => {
  const departures = [
    {
      train: '12967',
      destination: 'Mumbai Central',
      platform: 'P3',
      scheduled: '14:50',
      status: 'DELAYED 18M'
    },
    {
      train: '12002',
      destination: 'Kalka',
      platform: 'P1',
      scheduled: '15:00',
      status: 'ON TIME'
    },
    {
      train: '12884',
      destination: 'Patna Jn',
      platform: 'P5',
      scheduled: '15:25',
      status: 'BOARDING'
    },
    {
      train: '12425',
      destination: 'Kanpur Central',
      platform: 'P2',
      scheduled: '15:40',
      status: 'ON TIME'
    }
  ];

  return (
    <div className="space-y-10 max-w-7xl">
      
      {/* Title Header matching Figma */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] tracking-tight">
          Analytics
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] uppercase tracking-wider">
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
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
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
                  <span className="font-mono text-[11px] text-[#5B6478]">
                    {item.percentage}%
                  </span>

                  {/* Bar */}
                  <div className="w-full flex justify-center h-24 items-end">
                    <div
                      className={`w-full max-w-[48px] transition-all duration-500 rounded-none ${
                        item.highlight 
                          ? 'bg-[#2F5FD1]' 
                          : 'bg-transparent'
                      }`}
                      style={{
                        height: item.highlight ? `${heightPercent}%` : '0px'
                      }}
                    />
                  </div>

                  {/* Day label */}
                  <span className="font-sans text-xs text-[#5B6478] font-medium mt-1">
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
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
          LIVE DEPARTURE SCHEDULE
        </div>

        <div className="overflow-x-auto max-w-4xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] font-mono uppercase text-[#5B6478] tracking-wider">
                <th className="py-2.5 pr-6 font-medium">TRAIN</th>
                <th className="py-2.5 pr-6 font-medium">DESTINATION</th>
                <th className="py-2.5 pr-6 font-medium">PLATFORM</th>
                <th className="py-2.5 pr-6 font-medium">SCHEDULED</th>
                <th className="py-2.5 font-medium">STATUS</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {departures.map((row) => (
                <tr key={row.train} className="hover:bg-[#F8F9FB]/50 transition-colors">
                  <td className="py-3.5 pr-6 font-mono font-medium text-[#0F2C5C]">
                    {row.train}
                  </td>
                  <td className="py-3.5 pr-6 font-medium text-[#0F2C5C]">
                    {row.destination}
                  </td>
                  <td className="py-3.5 pr-6 font-mono font-medium text-[#0F2C5C]">
                    {row.platform}
                  </td>
                  <td className="py-3.5 pr-6 font-mono text-[#0F2C5C]">
                    {row.scheduled}
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
