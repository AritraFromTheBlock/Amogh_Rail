import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { StatCard } from '../components/common/StatCard';

interface StationNode {
  code: string;
  name: string;
  x: number;
  y: number;
  platforms: number;
  status: 'CLEAR' | 'CONGESTED' | 'MAINTENANCE';
  activeTrains: string[];
}

export const Network: React.FC = () => {
  const { corridors, trains } = useSystem();
  const { addToast } = useToast();
  const [selectedStation, setSelectedStation] = useState<string>('HWH');

  const STATIONS: StationNode[] = [
    { code: 'HWH', name: 'Howrah', x: 120, y: 80, platforms: 16, status: 'CLEAR', activeTrains: [] },
    { code: 'BWN', name: 'Barddhaman', x: 260, y: 60, platforms: 8, status: 'CLEAR', activeTrains: [] },
    { code: 'GUS', name: 'Guskara', x: 280, y: 150, platforms: 10, status: 'CONGESTED', activeTrains: [] },
    { code: 'MMR', name: 'Manmad', x: 420, y: 160, platforms: 6, status: 'MAINTENANCE', activeTrains: [] },
    { code: 'BLY', name: 'Bally', x: 620, y: 140, platforms: 14, status: 'CONGESTED', activeTrains: [] },
    { code: 'SKG', name: 'Saktigarh', x: 460, y: 240, platforms: 8, status: 'CLEAR', activeTrains: [] },
  ].map(st => {
    const active = trains.filter(t => t.location === st.code).map(t => t.trainNo);
    return {
      ...st,
      activeTrains: active,
      status: active.length > 3 ? 'CONGESTED' : st.status // Dynamic congestion logic
    } as StationNode;
  });

  const activeNode = STATIONS.find(s => s.code === selectedStation) || STATIONS[0];

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Title Header */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] dark:text-white tracking-tight transition-colors">
          Network
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] dark:text-gray-400 uppercase tracking-wider transition-colors">
          Northern Zone Control Room
        </span>
      </div>

      {/* Corridor Quick Metrics */}
      <div 
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-1 pb-6 border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 transition-colors cursor-pointer"
        onClick={() => addToast('Refreshing corridor metrics...', 'info')}
      >
        <StatCard
          label="Active Tracks"
          value={86}
          delta="100% Electrified"
          deltaType="positive"
        />
        <StatCard
          label="Interlocking Nodes"
          value={42}
          delta="Electronic CAD"
          deltaType="neutral"
        />
        <StatCard
          label="Track Load Index"
          value="68%"
          delta="Nominal Flow"
          deltaType="positive"
        />
        <StatCard
          label="Active Signal Posts"
          value={312}
          delta="Automatic Block"
          deltaType="neutral"
        />
      </div>

      {/* Interactive Rail Schematic Canvas */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
            TOPOLOGICAL TRACK SCHEMATIC & SIGNAL INTERLOCKING
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#5B6478]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#1E7F4F]"></span> Clear</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#B9790A]"></span> Caution</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#C23636]"></span> Occupied / Congested</span>
          </div>
        </div>

        {/* SVG Railway Schematic */}
        <div className="border border-[rgba(15,44,92,0.12)] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#0f172a] p-6 relative overflow-x-auto select-none transition-colors">
          <svg viewBox="0 0 760 300" className="w-full h-auto min-w-[680px]">
            
            {/* Grid Pattern */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(15,44,92,0.03)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Railway Tracks (Main Lines) */}
            {/* NDLS to GZB */}
            <line x1="120" y1="80" x2="260" y2="60" className="stroke-[#0F2C5C] dark:stroke-white/50 transition-colors" strokeWidth="2.5" />
            <line x1="120" y1="84" x2="260" y2="64" stroke="#0F2C5C" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* NDLS to MTJ */}
            <line x1="120" y1="80" x2="280" y2="150" className="stroke-[#0F2C5C] dark:stroke-white/50 transition-colors" strokeWidth="2.5" />
            <line x1="120" y1="84" x2="280" y2="154" className="stroke-[#0F2C5C] dark:stroke-white/30 transition-colors" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

            {/* MTJ to AGC */}
            <line x1="280" y1="150" x2="420" y2="160" className="stroke-[#0F2C5C] dark:stroke-white/50 transition-colors" strokeWidth="2.5" />
            
            {/* AGC to CNB */}
            <line x1="420" y1="160" x2="620" y2="140" stroke="#C23636" strokeWidth="2.5" />

            {/* AGC to JHS */}
            <line x1="420" y1="160" x2="460" y2="240" className="stroke-[#0F2C5C] dark:stroke-white/50 transition-colors" strokeWidth="2.5" />

            {/* GZB to CNB High-speed Quad Line */}
            <path d="M 260 60 Q 450 70 620 140" fill="none" className="stroke-[#0F2C5C] dark:stroke-white/50 transition-colors" strokeWidth="2" strokeDasharray="5 5" opacity="0.8" />

            {/* Train Markers with Live Pulses */}
            {/* Train Marker 1 */}
            <g transform="translate(230, 125)">
              <rect x="-18" y="-10" width="36" height="18" fill="#C23636" rx="1" />
              <text x="0" y="3" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">{trains[0]?.trainNo || 'T1'}</text>
            </g>

            {/* Train Marker 2 */}
            <g transform="translate(360, 153)">
              <rect x="-18" y="-10" width="36" height="18" fill="#1E7F4F" rx="1" />
              <text x="0" y="3" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">{trains[1]?.trainNo || 'T2'}</text>
            </g>

            {/* Train Marker 3 */}
            <g transform="translate(445, 205)">
              <rect x="-18" y="-10" width="36" height="18" fill="#B9790A" rx="1" />
              <text x="0" y="3" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">{trains[2]?.trainNo || 'T3'}</text>
            </g>

            {/* Train Marker 4 */}
            <g transform="translate(540, 148)">
              <rect x="-18" y="-10" width="36" height="18" fill="#1E7F4F" rx="1" />
              <text x="0" y="3" fill="#ffffff" fontSize="9" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">{trains[3]?.trainNo || 'T4'}</text>
            </g>

            {/* Station Nodes */}
            {STATIONS.map((st) => {
              const isSelected = selectedStation === st.code;
              return (
                <g 
                  key={st.code} 
                  transform={`translate(${st.x}, ${st.y})`}
                  onClick={() => {
                    setSelectedStation(st.code);
                    addToast(`Focused junction telemetry on ${st.name} (${st.code})`, 'info');
                  }}
                  className="cursor-pointer"
                >
                  <circle
                    r={isSelected ? 10 : 7}
                    fill={st.status === 'CONGESTED' ? '#C23636' : st.status === 'MAINTENANCE' ? '#B9790A' : '#0F2C5C'}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 3 : 2}
                  />
                  <text 
                    x="0" 
                    y={st.y > 180 ? 22 : -14} 
                    textAnchor="middle" 
                    className="font-mono text-[11px] font-bold fill-[#0F2C5C] dark:fill-white transition-colors"
                  >
                    {st.code}
                  </text>
                  <text 
                    x="0" 
                    y={st.y > 180 ? 32 : -26} 
                    textAnchor="middle" 
                    className="font-sans text-[9px] fill-[#5B6478] dark:fill-gray-400 transition-colors"
                  >
                    {st.name}
                  </text>
                </g>
              );
            })}

          </svg>
        </div>
      </div>

      {/* Junction Detail & Platform Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[rgba(15,44,92,0.10)] dark:border-white/10 pt-6 transition-colors">
        
        {/* Selected Station Panel (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
            JUNCTION TELEMETRY: {activeNode.name} ({activeNode.code})
          </div>

          <div className="p-4 border border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#111827] space-y-3 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5B6478] dark:text-gray-400">Total Platforms</span>
              <span className="font-mono font-semibold text-[#0F2C5C] dark:text-white">{activeNode.platforms} Platforms</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5B6478] dark:text-gray-400">Signal Route Aspect</span>
              <StatusBadge status={activeNode.status} size="sm" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#5B6478] dark:text-gray-400">Active Train Rakes</span>
              <span className="font-mono text-[#0F2C5C] dark:text-white">{activeNode.activeTrains.join(', ') || 'None'}</span>
            </div>
            <div className="pt-2 border-t border-[rgba(15,44,92,0.08)] dark:border-white/10 flex justify-between items-center text-[11px] font-mono text-[#5B6478] dark:text-gray-500 transition-colors">
              <span>SOLID STATE INTERLOCK: CAD-OK</span>
              <span>POWER: SUBSTATION GRID A</span>
            </div>
          </div>
        </div>

        {/* Corridor Route Capacities (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
            CORRIDOR ALLOCATION
          </div>

          <div className="border border-[rgba(15,44,92,0.10)] dark:border-white/10 overflow-x-auto bg-white dark:bg-[#111827] transition-colors">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937] font-mono text-[11px] text-[#5B6478] dark:text-gray-400 uppercase transition-colors">
                  <th className="py-2.5 px-3">CORRIDOR</th>
                  <th className="py-2.5 px-3">LOAD</th>
                  <th className="py-2.5 px-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(15,44,92,0.08)] dark:divide-white/10">
                {corridors.map((c) => (
                  <tr 
                    key={c.id} 
                    className="cursor-pointer hover:bg-[#F8F9FB] dark:hover:bg-[#1f2937]"
                    onClick={() => addToast(`Reviewing corridor: ${c.name}`, 'info')}
                  >
                    <td className="py-2.5 px-3 font-medium text-[#0F2C5C] dark:text-white transition-colors">{c.name}</td>
                    <td className="py-2.5 px-3 font-mono text-[#0F2C5C] dark:text-white transition-colors">{c.load}%</td>
                    <td className="py-2.5 px-3"><StatusBadge status={c.status} size="sm" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};
