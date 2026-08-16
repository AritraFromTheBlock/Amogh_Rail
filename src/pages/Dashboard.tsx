import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { Train, Activity, GitBranch, Maximize2, Minimize2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToast } = useToast();

  return (
    <div className="space-y-6 max-w-[1600px]">
      
      {/* Title Header matching Figma */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] dark:text-white tracking-tight transition-colors">
          Dashboard
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] dark:text-gray-400 uppercase tracking-wider transition-colors">
          Northern Zone Control Room
        </span>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative">
        
        {/* Top Row: Live Traffic Simulation (Full Width) */}
        <div className={`flex flex-col shadow-lg transition-all duration-500 ease-in-out bg-white dark:bg-[#111827] ${isExpanded ? 'fixed inset-0 z-[100] h-screen w-screen' : 'lg:col-span-12 min-h-[500px] relative rounded-xl overflow-hidden'}`}>
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#0F2C5C] dark:bg-[#0B1120] border-b border-white/5 text-white transition-colors">
            <span className="font-sans text-[13px] font-bold tracking-widest uppercase">
              LIVE TRAFFIC SIMULATION {isExpanded && ' — FULLSCREEN MODE'}
            </span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5 bg-white/10 px-3 py-1 rounded-sm">
                <span className="w-2 h-2 rounded-full bg-[#1E7F4F] animate-pulse"></span>
                <span className="font-mono text-[10px] font-semibold tracking-wider uppercase text-white">
                  SIMULATION READY
                </span>
              </div>
              
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/70 hover:text-white transition-colors bg-white/5 p-1.5 rounded hover:bg-white/20"
                title={isExpanded ? "Restore Dashboard" : "Maximize Simulation"}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Main Blank Canvas Area */}
          <div className="flex-1 bg-[#F8F9FB] dark:bg-[#0f172a] border-x border-b border-[rgba(15,44,92,0.15)] dark:border-white/10 flex flex-col items-center justify-center relative overflow-hidden transition-colors rounded-b-xl">
            {/* Extremely subtle grid background */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-10"
              style={{
                backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />
            
            {/* Empty State Text */}
            <div className="relative z-10 text-center space-y-3 opacity-40 dark:opacity-50">
              <Activity className={`mx-auto text-[#0F2C5C] dark:text-white transition-all duration-500 ${isExpanded ? 'w-16 h-16' : 'w-10 h-10'}`} strokeWidth={1.5} />
              <div className="space-y-1">
                <h2 className={`font-sans font-bold text-[#0F2C5C] dark:text-white tracking-[0.25em] transition-all duration-500 ${isExpanded ? 'text-2xl' : 'text-[15px]'}`}>
                  SIMULATION VIEW
                </h2>
                <p className={`font-mono tracking-wider text-[#0F2C5C] dark:text-gray-300 transition-all duration-500 ${isExpanded ? 'text-sm' : 'text-[11px]'}`}>
                  Awaiting simulation data...
                </p>
              </div>
            </div>
            
            <button 
              className="mt-6 z-10 bg-[#0F2C5C] dark:bg-[#1E293B] text-white px-6 py-2 rounded text-xs tracking-wider uppercase hover:bg-[#1a3d7c] transition-colors shadow-lg border border-white/10"
              onClick={() => addToast('Starting AI traffic simulation model...', 'info')}
            >
              Initialize Engine
            </button>
          </div>
        </div>

        {/* Bottom Left: Network & Movements */}
        <div className={`lg:col-span-6 space-y-6 transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none absolute' : 'opacity-100 relative'}`}>
          
          {/* Network Status */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
              NETWORK STATUS
            </div>
            <div 
              className="border border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-white dark:bg-[#111827] cursor-pointer hover:border-[#2F5FD1] transition-all rounded-xl overflow-hidden"
              onClick={() => addToast('Network diagnostics initiated', 'info')}
            >
              <div className="px-4 py-3 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937]">
                <h3 className="text-xs font-semibold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                  Northern Zone
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center border-b border-[rgba(15,44,92,0.06)] dark:border-white/5 pb-2">
                  <span className="text-[11px] text-[#5B6478] dark:text-gray-400 font-medium">Active Sections</span>
                  <span className="font-mono text-xs text-[#0F2C5C] dark:text-white font-semibold">42 / 48</span>
                </div>
                <div className="flex justify-between items-center border-b border-[rgba(15,44,92,0.06)] dark:border-white/5 pb-2">
                  <span className="text-[11px] text-[#5B6478] dark:text-gray-400 font-medium">Occupied Blocks</span>
                  <span className="font-mono text-xs text-[#0F2C5C] dark:text-white font-semibold">128</span>
                </div>
                <div className="flex justify-between items-center border-b border-[rgba(15,44,92,0.06)] dark:border-white/5 pb-2">
                  <span className="text-[11px] text-[#5B6478] dark:text-gray-400 font-medium">Available Routes</span>
                  <span className="font-mono text-xs text-[#0F2C5C] dark:text-white font-semibold">315</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[11px] text-[#5B6478] font-medium">Signal Status</span>
                  <StatusBadge status="normal" size="sm" />
                </div>
              </div>
            </div>
          </div>

          {/* Train Movements */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
              TRAIN MOVEMENTS
            </div>
            <div className="border border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-white dark:bg-[#111827] divide-y divide-[rgba(15,44,92,0.08)] dark:divide-white/10 transition-colors rounded-xl overflow-hidden">
              {useSystem().trains.slice(0, 4).map((train, i) => {
                const isDelayed = train.delayMin && train.delayMin > 0;
                return (
                  <div 
                    key={i} 
                    className="p-3 flex items-center justify-between hover:bg-[#F8F9FB] dark:hover:bg-[#1f2937] transition-colors cursor-pointer"
                    onClick={() => addToast(`Fetching live telemetry for ${train.trainNo}`, 'info')}
                  >
                    <div className="flex items-center gap-3">
                      <Train className="w-4 h-4 text-[#0F2C5C] dark:text-gray-300 opacity-80" />
                      <div className="flex flex-col">
                        <span className="font-mono text-xs font-semibold text-[#0F2C5C] dark:text-white">
                          {train.trainNo} <span className="text-[9px] text-[#5B6478] dark:text-gray-500 tracking-wider ml-1">{train.sectionId}</span>
                        </span>
                        <span className="text-[10px] text-[#5B6478] dark:text-gray-400 truncate max-w-[120px]">
                          {train.trainType} • Upstream Delay: {train.upstreamDelayMin}m
                        </span>
                      </div>
                    </div>
                    <span className={`font-mono text-[10px] font-bold ${isDelayed ? 'text-[#C23636] dark:text-[#f87171]' : 'text-[#1E7F4F] dark:text-[#4ade80]'}`}>
                      {isDelayed ? `DELAY +${train.delayMin}m` : 'ON TIME'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Right: AI & Alerts */}
        <div className={`lg:col-span-6 space-y-6 transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none absolute right-0' : 'opacity-100 relative'}`}>
          
          {/* AI Optimization */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400">
              AI OPTIMIZATION
            </div>
            <div 
              className="border border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-white dark:bg-[#111827] p-4 space-y-5 cursor-pointer hover:border-[#1E7F4F] transition-all rounded-xl"
              onClick={() => addToast('Applying optimized schedules...', 'success')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-[#0F2C5C] dark:text-gray-300" />
                  <span className="text-[11px] font-bold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                    Conflicts Detected
                  </span>
                </div>
                <span className="font-mono text-sm font-bold text-[#C23636] dark:text-[#f87171]">3</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                  Delay Risk
                </span>
                <span className="font-mono text-xs font-bold text-[#1E7F4F] dark:text-[#4ade80]">LOW</span>
              </div>

              <div className="flex items-center justify-between border-t border-[rgba(15,44,92,0.08)] dark:border-white/10 pt-4">
                <span className="text-[11px] font-bold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                  Optimization Status
                </span>
                <div className="bg-[#1E7F4F]/10 dark:bg-[#1E7F4F]/20 text-[#1E7F4F] dark:text-[#4ade80] px-2 py-0.5 rounded-sm">
                  <span className="font-mono text-[10px] font-bold tracking-wider">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400">
              ALERTS
            </div>
            <div className="border border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-white dark:bg-[#111827] divide-y divide-[rgba(15,44,92,0.08)] dark:divide-white/10 rounded-xl overflow-hidden">
              {[
                { severity: 'CRITICAL', text: 'Signal failure at NDLS Outer', time: '17:42', color: 'text-[#C23636] dark:text-[#f87171]', bg: 'bg-[#C23636]/10', border: 'border-l-[3px] border-[#C23636]' },
                { severity: 'WARNING', text: 'Track circuit drop block A4', time: '17:38', color: 'text-[#F5821F] dark:text-[#fb923c]', bg: 'bg-[#F5821F]/10', border: 'border-l-[3px] border-[#F5821F]' },
                { severity: 'CAUTION', text: 'Speed restriction active 30kmph', time: '17:15', color: 'text-[#B9790A] dark:text-[#fbbf24]', bg: 'bg-[#B9790A]/10', border: 'border-l-[3px] border-[#B9790A]' },
                { severity: 'NORMAL', text: 'Route cleared for 12301', time: '17:10', color: 'text-[#1E7F4F] dark:text-[#4ade80]', bg: 'bg-[#1E7F4F]/10', border: 'border-l-[3px] border-[#1E7F4F]' },
              ].map((alert, i) => (
                <div 
                  key={i} 
                  className={`p-3 ${alert.border} hover:bg-[#F8F9FB] dark:hover:bg-[#1f2937] transition-colors cursor-pointer`}
                  onClick={() => addToast(`Acknowledged alert: ${alert.text}`, alert.severity === 'CRITICAL' ? 'error' : 'info')}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-[9px] font-bold tracking-wider px-1.5 py-0.5 ${alert.color} ${alert.bg} dark:bg-opacity-20`}>
                      {alert.severity}
                    </span>
                    <span className="font-mono text-[10px] text-[#5B6478] dark:text-gray-500">{alert.time}</span>
                  </div>
                  <p className="text-[11px] text-[#0F2C5C] dark:text-gray-200 font-medium leading-snug mt-1.5">
                    {alert.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
