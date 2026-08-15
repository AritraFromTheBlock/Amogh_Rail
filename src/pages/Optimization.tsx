import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { useToast } from '../context/ToastContext';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { MoreHorizontal } from 'lucide-react';

export const Optimization: React.FC = () => {
  const { trains, updateTrainStatus } = useSystem();
  const { addToast } = useToast();
  const [activeMenuTrain, setActiveMenuTrain] = useState<string | null>(null);

  // Take first 6 trains as in Page 3 screenshot
  const displayTrains = trains.slice(0, 6);

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Title Header */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] dark:text-white tracking-tight transition-colors">
          Optimization
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] dark:text-gray-400 uppercase tracking-wider transition-colors">
          Northern Zone Control Room
        </span>
      </div>

      {/* AI Optimization & Prediction Top Metrics Strip */}
      <div className="space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
          AI OPTIMIZATION & PREDICTION
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-1 pb-6 border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 transition-colors">
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
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
            LIVE TRAIN OPERATIONS
          </div>
          <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => addToast('Syncing AI operation feeds...', 'info')}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E7F4F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E7F4F]"></span>
            </span>
            <span className="font-mono text-[11px] font-semibold text-[#1E7F4F] tracking-wider uppercase">
              LIVE
            </span>
          </div>
        </div>

        <div className="border border-[rgba(15,44,92,0.10)] dark:border-white/10 overflow-x-auto bg-white dark:bg-[#111827] transition-colors shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937] text-[11px] font-mono uppercase text-[#5B6478] dark:text-gray-400 tracking-wider transition-colors">
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
            <tbody className="divide-y divide-[rgba(15,44,92,0.08)] dark:divide-white/10 text-xs">
              {displayTrains.map((train) => (
                <tr 
                  key={train.trainNo} 
                  className="hover:bg-[#F8F9FA] dark:hover:bg-[#1f2937] transition-colors cursor-pointer group"
                  onClick={() => addToast(`Analyzing optimization metrics for ${train.trainNo}`, 'info')}
                >
                  <td className="py-3 px-4 font-mono font-medium text-[#0F2C5C] dark:text-white transition-colors">
                    {train.trainNo}
                  </td>
                  <td className="py-3 px-4 font-medium text-[#0F2C5C] dark:text-gray-300 transition-colors">
                    {train.name || train.trainType}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#5B6478] dark:text-gray-400 transition-colors">
                    {train.route || train.sectionId}
                  </td>
                  <td className="py-3 px-4 text-[#0F2C5C] dark:text-gray-300 transition-colors">
                    {train.location}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={train.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className={
                      train.delayMin && train.delayMin > 20 
                        ? 'text-[#C23636] dark:text-[#f87171] font-medium'
                        : train.delayMin && train.delayMin > 0 ? 'text-[#B9790A] dark:text-[#fbbf24] font-medium' : 'text-[#5B6478] dark:text-gray-500'
                    }>
                      {train.delay}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[#0F2C5C] dark:text-gray-300 font-medium transition-colors">
                    {train.trackType || train.platform}
                  </td>
                  <td className="py-3 px-4 font-mono text-[#0F2C5C] dark:text-gray-300 transition-colors">
                    {train.scheduledDeparture || train.etd}
                  </td>
                  <td className="py-3 px-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActiveMenuTrain(activeMenuTrain === train.trainNo ? null : train.trainNo)}
                      className="p-1 hover:bg-slate-200/70 dark:hover:bg-slate-700/50 text-[#5B6478] dark:text-gray-400 hover:text-[#0F2C5C] dark:hover:text-white transition-colors rounded"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {activeMenuTrain === train.trainNo && (
                      <div className="absolute right-4 mt-1 w-44 bg-white dark:bg-[#1E293B] border border-[rgba(15,44,92,0.15)] dark:border-white/10 shadow-xl py-1 z-30 text-left font-sans">
                        <button
                          onClick={() => {
                            updateTrainStatus(train.trainNo, 'ON TIME', '—');
                            addToast(`AI Optimizer cleared delay for ${train.trainNo}`, 'success');
                            setActiveMenuTrain(null);
                          }}
                          className="w-full px-3 py-1.5 text-xs text-[#1E7F4F] dark:text-[#4ade80] hover:bg-slate-50 dark:hover:bg-[#334155] flex items-center font-medium transition-colors"
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
