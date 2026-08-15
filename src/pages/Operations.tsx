import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/common/StatusBadge';
import type { Train } from '../types';
import { MoreHorizontal } from 'lucide-react';

export const Operations: React.FC = () => {
  const { trains, updateTrainStatus } = useSystem();
  const { addToast } = useToast();
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [activeMenuTrain, setActiveMenuTrain] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-7xl">
      
      {/* Title Header */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] dark:text-white tracking-tight transition-colors">
          Operations
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] dark:text-gray-400 uppercase tracking-wider transition-colors">
          Northern Zone Control Room
        </span>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
          LIVE TRAIN OPERATIONS
        </div>
        <div className="flex items-center gap-1.5" onClick={() => addToast('Live feed synced', 'success')}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E7F4F] dark:bg-[#4ade80] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E7F4F]"></span>
          </span>
          <span className="font-mono text-[11px] font-semibold text-[#1E7F4F] tracking-wider uppercase">
            LIVE
          </span>
        </div>
      </div>

      {/* Dense Mission-Critical Data Table */}
      <div className="border border-[rgba(15,44,92,0.10)] dark:border-white/10 overflow-x-auto bg-white dark:bg-[#111827] transition-colors shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937] text-[11px] font-mono uppercase text-[#5B6478] dark:text-gray-400 tracking-wider transition-colors">
              <th className="py-3 px-4 font-medium">TRAIN NO.</th>
              <th className="py-3 px-4 font-medium">TYPE</th>
              <th className="py-3 px-4 font-medium">SECTION</th>
              <th className="py-3 px-4 font-medium">LOCATION</th>
              <th className="py-3 px-4 font-medium">STATUS</th>
              <th className="py-3 px-4 font-medium">DELAY</th>
              <th className="py-3 px-4 font-medium">TRACK</th>
              <th className="py-3 px-4 font-medium">DEPARTURE</th>
              <th className="py-3 px-4 font-medium text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(15,44,92,0.08)] dark:divide-white/10 text-xs">
            {trains.map((train) => (
              <tr 
                key={train.trainNo}
                className="hover:bg-[#F8F9FA] dark:hover:bg-[#1f2937] transition-colors group cursor-pointer"
                onClick={() => {
                  setSelectedTrain(train);
                  addToast(`Accessing telemetry for ${train.trainNo}`, 'info');
                }}
              >
                <td className="py-3 px-4 font-mono font-medium text-[#0F2C5C] dark:text-white transition-colors">
                  {train.trainNo}
                </td>
                <td className="py-3 px-4 font-medium text-[#0F2C5C] dark:text-gray-300 transition-colors">
                  {train.trainType}
                </td>
                <td className="py-3 px-4 font-mono text-[#5B6478] dark:text-gray-400 transition-colors">
                  {train.sectionId}
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
                  {train.trackType}
                </td>
                <td className="py-3 px-4 font-mono text-[#0F2C5C] dark:text-gray-300 transition-colors">
                  {train.scheduledDeparture}
                </td>
                <td className="py-3 px-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setActiveMenuTrain(activeMenuTrain === train.trainNo ? null : train.trainNo)}
                    className="p-1 hover:bg-slate-200/70 dark:hover:bg-slate-700/50 text-[#5B6478] dark:text-gray-400 hover:text-[#0F2C5C] dark:hover:text-white transition-colors rounded"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Dropdown Action Menu */}
                  {activeMenuTrain === train.trainNo && (
                    <div className="absolute right-4 mt-1 w-48 bg-white dark:bg-[#1E293B] border border-[rgba(15,44,92,0.15)] dark:border-white/10 shadow-xl py-1 z-30 text-left font-sans">
                      <div className="px-3 py-1 text-[10px] font-mono uppercase text-[#5B6478] dark:text-gray-400 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10">
                        Dispatch Override
                      </div>
                      <button
                        onClick={() => {
                          updateTrainStatus(train.trainNo, 'ON TIME', '—');
                          addToast(`Dispatched override: ${train.trainNo} is Clear`, 'success');
                          setActiveMenuTrain(null);
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#1E7F4F] dark:text-[#4ade80] hover:bg-slate-50 dark:hover:bg-[#334155] flex items-center gap-1.5 font-medium transition-colors"
                      >
                        Set Clear / On-Time
                      </button>
                      <button
                        onClick={() => {
                          updateTrainStatus(train.trainNo, 'DELAYED', '+15 min');
                          addToast(`Flagged delay for ${train.trainNo}`, 'warning');
                          setActiveMenuTrain(null);
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#C23636] dark:text-[#f87171] hover:bg-slate-50 dark:hover:bg-[#334155] flex items-center gap-1.5 font-medium transition-colors"
                      >
                        Flag Delay (+15m)
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTrain(train);
                          addToast(`Viewing telemetry for ${train.trainNo}`, 'info');
                          setActiveMenuTrain(null);
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#0F2C5C] dark:text-white hover:bg-slate-50 dark:hover:bg-[#334155] flex items-center gap-1.5 transition-colors"
                      >
                        View Telemetry
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Train Details Telemetry Modal */}
      {selectedTrain && (
        <div className="fixed inset-0 z-50 bg-[#0F2C5C]/20 dark:bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#1E293B] border border-[rgba(15,44,92,0.15)] dark:border-white/10 shadow-2xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-start justify-between border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-[#0F2C5C] dark:text-white">
                    {selectedTrain.trainNo}
                  </span>
                  <span className="text-sm font-semibold text-[#0F2C5C] dark:text-gray-300">
                    {selectedTrain.trainType} · {selectedTrain.priority} Priority
                  </span>
                </div>
                <p className="font-mono text-xs text-[#5B6478] dark:text-gray-400 mt-0.5">
                  Section: {selectedTrain.sectionId} · Destination: {selectedTrain.destination}
                </p>
              </div>
              <StatusBadge status={selectedTrain.status} size="md" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono text-[#5B6478] dark:text-gray-400">Track Type</span>
                <p className="font-mono font-medium text-[#0F2C5C] dark:text-white">{selectedTrain.trackType || 'Single'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono text-[#5B6478] dark:text-gray-400">Scheduled Arrival</span>
                <p className="font-mono font-medium text-[#0F2C5C] dark:text-white">{selectedTrain.scheduledArrival || '--:--'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono text-[#5B6478] dark:text-gray-400">Upstream Delay</span>
                <p className="font-mono font-medium text-[#0F2C5C] dark:text-white">{selectedTrain.upstreamDelayMin || 0} min</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono text-[#5B6478] dark:text-gray-400">Time of Day</span>
                <p className="font-mono font-medium text-[#0F2C5C] dark:text-white">{selectedTrain.timeOfDayBucket || 'Day'}</p>
              </div>
            </div>

            <div className="p-3 bg-[#F8F9FB] dark:bg-[#0f172a] border border-[rgba(15,44,92,0.08)] dark:border-white/10 flex items-center justify-between text-xs transition-colors">
              <span className="text-[#5B6478] dark:text-gray-400">Section Congestion</span>
              <span className="font-mono font-semibold text-[#C23636] dark:text-[#f87171]">
                {selectedTrain.sectionCongestionLevel ? (selectedTrain.sectionCongestionLevel * 100).toFixed(0) : 0}%
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[rgba(15,44,92,0.10)] dark:border-white/10">
              <button
                onClick={() => setSelectedTrain(null)}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#5B6478] dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-[rgba(15,44,92,0.15)] dark:border-white/10 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateTrainStatus(selectedTrain.trainNo, 'ON TIME', '—');
                  addToast(`Track cleared and schedule resolved for ${selectedTrain.trainNo}`, 'success');
                  setSelectedTrain(null);
                }}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[#0F2C5C] text-white hover:bg-[#1a3d7c] transition-colors"
              >
                Resolve & Clear Track
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
