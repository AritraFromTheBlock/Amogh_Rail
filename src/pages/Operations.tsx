import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { StatusBadge } from '../components/common/StatusBadge';
import type { Train } from '../types';
import { MoreHorizontal } from 'lucide-react';

export const Operations: React.FC = () => {
  const { trains, updateTrainStatus } = useSystem();
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [activeMenuTrain, setActiveMenuTrain] = useState<string | null>(null);

  return (
    <div className="space-y-6 max-w-7xl">
      
      {/* Title Header */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] tracking-tight">
          Operations
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] uppercase tracking-wider">
          Northern Zone Control Room
        </span>
      </div>

      {/* Section Header */}
      <div className="flex items-center justify-between pt-2">
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

      {/* Dense Mission-Critical Data Table */}
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
              <th className="py-3 px-4 font-medium text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(15,44,92,0.08)] text-xs">
            {trains.map((train) => (
              <tr 
                key={train.trainNo}
                className="hover:bg-[#F8F9FA] transition-colors group cursor-pointer"
                onClick={() => setSelectedTrain(train)}
              >
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
                <td className="py-3 px-4 text-right relative" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => setActiveMenuTrain(activeMenuTrain === train.trainNo ? null : train.trainNo)}
                    className="p-1 hover:bg-slate-200/70 text-[#5B6478] hover:text-[#0F2C5C] transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Dropdown Action Menu */}
                  {activeMenuTrain === train.trainNo && (
                    <div className="absolute right-4 mt-1 w-48 bg-white border border-[rgba(15,44,92,0.15)] shadow-xl py-1 z-30 text-left font-sans">
                      <div className="px-3 py-1 text-[10px] font-mono uppercase text-[#5B6478] border-b border-[rgba(15,44,92,0.08)]">
                        Dispatch Override
                      </div>
                      <button
                        onClick={() => {
                          updateTrainStatus(train.trainNo, 'ON TIME', '—');
                          setActiveMenuTrain(null);
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#1E7F4F] hover:bg-slate-50 flex items-center gap-1.5 font-medium"
                      >
                        Set Clear / On-Time
                      </button>
                      <button
                        onClick={() => {
                          updateTrainStatus(train.trainNo, 'DELAYED', '+15 min');
                          setActiveMenuTrain(null);
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#C23636] hover:bg-slate-50 flex items-center gap-1.5 font-medium"
                      >
                        Flag Delay (+15m)
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTrain(train);
                          setActiveMenuTrain(null);
                        }}
                        className="w-full px-3 py-1.5 text-xs text-[#0F2C5C] hover:bg-slate-50 flex items-center gap-1.5"
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
        <div className="fixed inset-0 z-50 bg-[#0F2C5C]/20 flex items-center justify-center p-4">
          <div className="bg-white border border-[rgba(15,44,92,0.15)] shadow-2xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-start justify-between border-b border-[rgba(15,44,92,0.10)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-[#0F2C5C]">
                    {selectedTrain.trainNo}
                  </span>
                  <span className="text-sm font-semibold text-[#0F2C5C]">
                    {selectedTrain.name}
                  </span>
                </div>
                <p className="font-mono text-xs text-[#5B6478] mt-0.5">
                  {selectedTrain.route} · Destination: {selectedTrain.destination}
                </p>
              </div>
              <StatusBadge status={selectedTrain.status} size="md" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono text-[#5B6478]">Current Track Block</span>
                <p className="font-mono font-medium text-[#0F2C5C]">{selectedTrain.currentTrack || 'Track 1 Up'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono text-[#5B6478]">Next Signal Post</span>
                <p className="font-mono font-medium text-[#0F2C5C]">{selectedTrain.nextStation || 'Junction Auto'}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono text-[#5B6478]">Telemetry Speed</span>
                <p className="font-mono font-medium text-[#0F2C5C]">{selectedTrain.speed || 110} km/h</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-mono text-[#5B6478]">Assigned Platform</span>
                <p className="font-mono font-medium text-[#0F2C5C]">{selectedTrain.platform}</p>
              </div>
            </div>

            <div className="p-3 bg-[#F8F9FB] border border-[rgba(15,44,92,0.08)] flex items-center justify-between text-xs">
              <span className="text-[#5B6478]">AI Path Priority</span>
              <span className="font-mono font-semibold text-[#1E7F4F]">{selectedTrain.priority || 'Express High'}</span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[rgba(15,44,92,0.10)]">
              <button
                onClick={() => setSelectedTrain(null)}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#5B6478] hover:bg-slate-100 border border-[rgba(15,44,92,0.15)]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  updateTrainStatus(selectedTrain.trainNo, 'ON TIME', '—');
                  setSelectedTrain(null);
                }}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider bg-[#0F2C5C] text-white hover:bg-[#1a3d7c]"
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
