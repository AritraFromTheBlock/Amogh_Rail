import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { MoreHorizontal } from 'lucide-react';

export const Optimization: React.FC = () => {
  const { trains, updateTrainStatus } = useSystem();
  const [activeMenuTrain, setActiveMenuTrain] = useState<string | null>(null);

  // Take first 6 trains as in Page 3 screenshot
  const displayTrains = trains.slice(0, 6);

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Title Header */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] tracking-tight">
          Optimization
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] uppercase tracking-wider">
          Northern Zone Control Room
        </span>
      </div>

      {/* AI Optimization & Prediction Top Metrics Strip */}
      <div className="space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
          AI OPTIMIZATION & PREDICTION
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-1 pb-6 border-b border-[rgba(15,44,92,0.10)]">
          <StatCard
            label="Congestion Risk"
            value="72%"
            subLabel="High"
            deltaType="negative"
          />
          <StatCard
            label="Delay Probability"
            value="34%"
            subLabel="Moderate"
            deltaType="caution"
          />
          <StatCard
            label="Network Efficiency"
            value="86%"
            delta="+8.4%"
            deltaType="positive"
          />
          <StatCard
            label="AI Safety Score"
            value="94/100"
            subLabel="Excellent"
            deltaType="positive"
          />
        </div>
      </div>

      {/* Live Train Operations Sub-Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
            LIVE TRAIN OPERATIONS
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E7F4F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E7F4F]"></span>
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#1E7F4F] tracking-wider uppercase">
              LIVE
            </span>
          </div>
        </div>

        <div className="border border-[rgba(15,44,92,0.10)] overflow-x-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(15,44,92,0.10)] bg-[#F8F9FB] text-[11px] font-mono uppercase text-[#5B6478] tracking-wider">
                <th className="py-3 px-4 font-medium">TRAIN NO.</th>
                <th className="py-3 px-4 font-medium">NAME</th>
                <th className="py-3 px-4 font-medium">ROUTE</th>
                <th className="py-3 px-4 font-medium">LOCATION</th>
                <th className="py-3 px-4 font-medium">STATUS</th>
                <th className="py-3 px-4 font-medium">DELAY</th>
                <th className="py-3 px-4 font-medium">PLATFORM</th>
                <th className="py-3 px-4 font-medium">ETD</th>
                <th className="py-3 px-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(15,44,92,0.08)] text-xs">
              {displayTrains.map((train) => (
                <tr key={train.trainNo} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-[#0F2C5C]">
                    {train.trainNo}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#0F2C5C]">
                    {train.name}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#5B6478]">
                    {train.route}
                  </td>
                  <td className="py-3 px-4 text-[#0F2C5C]">
                    {train.location}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={train.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className={
                      train.delay.startsWith('+') 
                        ? (parseInt(train.delay) > 20 ? 'text-[#C23636] font-medium' : 'text-[#B9790A] font-medium')
                        : 'text-[#5B6478]'
                    }>
                      {train.delay}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#0F2C5C] font-medium">
                    {train.platform}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#0F2C5C]">
                    {train.etd}
                  </td>
                  <td className="py-3 px-4 text-right relative">
                    <button
                      onClick={() => setActiveMenuTrain(activeMenuTrain === train.trainNo ? null : train.trainNo)}
                      className="p-1 hover:bg-slate-200/70 text-[#5B6478] hover:text-[#0F2C5C] transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {activeMenuTrain === train.trainNo && (
                      <div className="absolute right-4 mt-1 w-44 bg-white border border-[rgba(15,44,92,0.15)] shadow-xl py-1 z-30 text-left font-sans">
                        <button
                          onClick={() => {
                            updateTrainStatus(train.trainNo, 'ON TIME', '—');
                            setActiveMenuTrain(null);
                          }}
                          className="w-full px-3 py-1.5 text-xs text-[#1E7F4F] hover:bg-slate-50 flex items-center font-medium"
                        >
                          Optimize & Clear Delay
                        </button>
                      </div>
                    )}
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
