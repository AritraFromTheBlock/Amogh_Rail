import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/common/StatusBadge';
import { StatCard } from '../components/common/StatCard';
import { 
  Train, 
  ArrowRight, 
  Radio, 
  Layers, 
  RefreshCw, 
  Sparkles, 
  AlertTriangle,
  PlayCircle,
  ExternalLink
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { 
    trains, 
    corridors, 
    aiRecommendations, 
    alerts, 
    simulation, 
    setActiveNav,
    applyRecommendation
  } = useSystem();
  
  const { addToast } = useToast();
  const [filterTrainType, setFilterTrainType] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    addToast('Refreshing live telemetry and sensor feeds...', 'info');
    setTimeout(() => {
      setIsRefreshing(false);
      addToast('Dashboard data synchronized with Northern Zone Control', 'success');
    }, 600);
  };

  // Filter trains for movements panel
  const filteredTrains = trains
    .filter(t => {
      if (filterTrainType === 'ALL') return true;
      if (filterTrainType === 'DELAYED') return (t.delayMin && t.delayMin > 0) || (t.delayMinutes && t.delayMinutes > 0);
      if (filterTrainType === 'EXPRESS') return t.trainType?.includes('Express') || t.trainType?.includes('Rajdhani') || t.trainType?.includes('Vande');
      if (filterTrainType === 'FREIGHT') return t.trainType?.includes('Freight') || t.priority === 'Freight';
      return true;
    })
    .slice(0, 5);

  const activeTrainsCount = trains.length;
  const delayedTrainsCount = trains.filter(t => (t.delayMin && t.delayMin > 0) || (t.delayMinutes && t.delayMinutes > 0)).length;
  const onTimePercentage = Math.round(((activeTrainsCount - delayedTrainsCount) / (activeTrainsCount || 1)) * 100);

  return (
    <div className="space-y-5 max-w-[1600px] pb-10">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10 pb-4">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-bold text-[#0F2C5C] dark:text-white tracking-tight transition-colors">
            Dashboard
          </h1>
          <span className="font-mono text-[11px] text-[#5B6478] dark:text-gray-400 uppercase tracking-wider transition-colors">
            Northern Zone Control Room
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1E7F4F]/10 dark:bg-[#1E7F4F]/20 text-[#1E7F4F] dark:text-[#4ade80] px-3 py-1.5 rounded-md border border-[#1E7F4F]/20">
            <span className="w-2 h-2 rounded-full bg-[#1E7F4F] animate-pulse"></span>
            <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
              ALL SYSTEMS LIVE
            </span>
          </div>

          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0F2C5C] dark:text-gray-300 bg-white dark:bg-[#1f2937] border border-[rgba(15,44,92,0.15)] dark:border-white/10 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            title="Sync live telemetry"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#2F5FD1]' : ''}`} />
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* Top KPI Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl p-4 shadow-sm hover:border-[#2F5FD1]/40 transition-all">
          <StatCard
            label="Active Trains"
            value={activeTrainsCount}
            delta={`${onTimePercentage}% On-Time`}
            deltaType={onTimePercentage >= 85 ? 'positive' : 'caution'}
            subLabel={`${delayedTrainsCount} delayed · ${activeTrainsCount - delayedTrainsCount} on schedule`}
          />
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl p-4 shadow-sm hover:border-[#2F5FD1]/40 transition-all">
          <StatCard
            label="Network Section Load"
            value="76%"
            delta="42/48 Active"
            deltaType="positive"
            subLabel="Northern & Western corridors normal"
          />
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl p-4 shadow-sm hover:border-[#2F5FD1]/40 transition-all">
          <StatCard
            label="AI Decisions & Gain"
            value={simulation.conflictsResolved}
            unit="Resolved"
            delta={simulation.efficiencyGain}
            deltaType="positive"
            subLabel="Automated conflict-free slotting"
          />
        </div>

        <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl p-4 shadow-sm hover:border-[#C23636]/40 transition-all">
          <StatCard
            label="Active Safety Notices"
            value={alerts.filter(a => a.severity === 'critical' || a.severity === 'warning').length}
            delta="2 Critical"
            deltaType="negative"
            subLabel="Track interlock & corridor alerts"
          />
        </div>
      </div>

      {/* Broader Simulation Banner with single 'Show Simulation' button */}
      <div className="bg-gradient-to-r from-[#0F2C5C] via-[#143A75] to-[#0A1E3F] dark:from-[#0B1120] dark:via-[#111827] dark:to-[#0f172a] rounded-xl border border-white/15 text-white shadow-md px-6 py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all">
        
        {/* Left: Info & Description */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 dark:bg-white/5 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
            <PlayCircle className="w-6 h-6 text-sky-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1E7F4F] animate-pulse"></span>
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-sky-300">
                TRAFFIC SIMULATION ENGINE
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Live Corridor Traffic & Flow Simulator
            </h2>
            <p className="text-xs text-white/70 max-w-xl">
              Execute real-time route simulations, train headway modeling, and dynamic bottleneck evaluations.
            </p>
          </div>
        </div>

        {/* Right: Only a single 'Show Simulation' Button */}
        <div className="shrink-0 flex items-center">
          <button
            onClick={() => {
              // Placeholder ready for the simulation external link redirect
              addToast('Opening Traffic Simulation...', 'info');
              // window.open('SIMULATION_URL_HERE', '_blank');
            }}
            className="w-full sm:w-auto px-6 py-3 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white text-sm font-semibold rounded-lg shadow-lg hover:shadow-sky-500/25 flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer group"
          >
            <span>Show Simulation</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>

      {/* Main 3-Column Operational Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Column 1: Network & Corridor Status (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Network Section Summary Card */}
          <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#0F2C5C] dark:text-sky-400" />
                <h3 className="text-xs font-bold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                  Network Section Status
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#1E7F4F] dark:text-[#4ade80] font-bold bg-[#1E7F4F]/10 px-2 py-0.5 rounded">
                NORMAL
              </span>
            </div>

            <div className="p-4 space-y-3.5">
              <div className="flex justify-between items-center border-b border-[rgba(15,44,92,0.06)] dark:border-white/5 pb-2">
                <span className="text-xs text-[#5B6478] dark:text-gray-400 font-medium">Active Sections</span>
                <span className="font-mono text-xs text-[#0F2C5C] dark:text-white font-bold">42 / 48</span>
              </div>
              <div className="flex justify-between items-center border-b border-[rgba(15,44,92,0.06)] dark:border-white/5 pb-2">
                <span className="text-xs text-[#5B6478] dark:text-gray-400 font-medium">Occupied Blocks</span>
                <span className="font-mono text-xs text-[#0F2C5C] dark:text-white font-bold">128 Blocks</span>
              </div>
              <div className="flex justify-between items-center border-b border-[rgba(15,44,92,0.06)] dark:border-white/5 pb-2">
                <span className="text-xs text-[#5B6478] dark:text-gray-400 font-medium">Available Routes</span>
                <span className="font-mono text-xs text-[#0F2C5C] dark:text-white font-bold">315 Paths</span>
              </div>
              <div className="flex justify-between items-center pt-0.5">
                <span className="text-xs text-[#5B6478] dark:text-gray-400 font-medium">Signal Interlock Status</span>
                <StatusBadge status="normal" size="sm" />
              </div>
            </div>
          </div>

          {/* Corridor Capacity Load Card */}
          <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#0F2C5C] dark:text-sky-400" />
                <h3 className="text-xs font-bold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                  Corridor Load
                </h3>
              </div>
              <button 
                onClick={() => setActiveNav('Network')}
                className="text-[11px] text-[#2F5FD1] dark:text-sky-400 hover:underline flex items-center gap-1 font-medium"
              >
                View Map <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              {corridors.map((c) => {
                const isCritical = c.status === 'CRITICAL' || c.load >= 90;
                const isHigh = c.status === 'HIGH' || (c.load >= 80 && c.load < 90);
                return (
                  <div key={c.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-[#0F2C5C] dark:text-gray-200">
                        {c.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-[#5B6478] dark:text-gray-400">
                          {c.activeTrains} trains
                        </span>
                        <span className={`font-mono text-xs font-bold ${
                          isCritical ? 'text-[#C23636] dark:text-[#f87171]' :
                          isHigh ? 'text-[#F5821F] dark:text-[#fb923c]' :
                          'text-[#1E7F4F] dark:text-[#4ade80]'
                        }`}>
                          {c.load}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCritical ? 'bg-[#C23636]' :
                          isHigh ? 'bg-[#F5821F]' :
                          'bg-[#1E7F4F]'
                        }`}
                        style={{ width: `${c.load}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Column 2: Live Train Movements & Telemetry (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
            
            {/* Header with Filter Pills */}
            <div className="px-4 py-3 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Train className="w-3.5 h-3.5 text-[#0F2C5C] dark:text-sky-400" />
                  <h3 className="text-xs font-bold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                    Train Movements
                  </h3>
                </div>
                <button 
                  onClick={() => setActiveNav('Operations')}
                  className="text-[11px] text-[#2F5FD1] dark:text-sky-400 hover:underline flex items-center gap-1 font-medium"
                >
                  Operations <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
                {(['ALL', 'DELAYED', 'EXPRESS', 'FREIGHT'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterTrainType(type)}
                    className={`px-2 py-0.5 text-[10px] font-mono font-medium rounded transition-colors ${
                      filterTrainType === type
                        ? 'bg-[#0F2C5C] dark:bg-sky-500 text-white'
                        : 'bg-white dark:bg-[#111827] text-[#5B6478] dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-[rgba(15,44,92,0.10)] dark:border-white/10'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* List of Trains */}
            <div className="divide-y divide-[rgba(15,44,92,0.08)] dark:divide-white/10">
              {filteredTrains.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#5B6478] dark:text-gray-400">
                  No trains found matching this filter
                </div>
              ) : (
                filteredTrains.map((train, i) => {
                  const delay = train.delayMin ?? train.delayMinutes ?? 0;
                  const isDelayed = delay > 0;
                  return (
                    <div 
                      key={train.trainNo || i}
                      onClick={() => addToast(`Telemetry: Train ${train.trainNo} at Section ${train.sectionId || train.location}`, 'info')}
                      className="p-3.5 hover:bg-[#F8F9FB] dark:hover:bg-[#1f2937] transition-colors cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isDelayed ? 'bg-red-50 dark:bg-red-950/30 text-[#C23636] dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-950/30 text-[#1E7F4F] dark:text-emerald-400'
                        }`}>
                          <Train className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-xs font-bold text-[#0F2C5C] dark:text-white">
                              {train.trainNo}
                            </span>
                            <span className="font-mono text-[9px] px-1 bg-slate-100 dark:bg-slate-800 text-[#5B6478] dark:text-gray-400 rounded">
                              {train.sectionId || 'SEC-04'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5B6478] dark:text-gray-400 truncate max-w-[150px]">
                            {train.name || train.trainType || 'Express Service'}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded ${
                          isDelayed 
                            ? 'bg-red-100 dark:bg-red-950/50 text-[#C23636] dark:text-[#f87171]' 
                            : 'bg-emerald-100 dark:bg-emerald-950/50 text-[#1E7F4F] dark:text-[#4ade80]'
                        }`}>
                          {isDelayed ? `+${delay}m` : 'ON TIME'}
                        </span>
                        <div className="text-[10px] text-[#5B6478] dark:text-gray-500 font-mono mt-0.5">
                          {train.speed ? `${train.speed} km/h` : '105 km/h'}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer link */}
            <div className="p-2.5 bg-[#F8F9FB] dark:bg-[#1f2937] border-t border-[rgba(15,44,92,0.08)] dark:border-white/10 text-center">
              <button
                onClick={() => setActiveNav('Operations')}
                className="text-xs font-semibold text-[#0F2C5C] dark:text-white hover:text-[#2F5FD1] transition-colors"
              >
                View all {activeTrainsCount} active trains in Operations →
              </button>
            </div>

          </div>

        </div>

        {/* Column 3: AI Real-Time Decisions & System Alerts (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* AI Dispatch & Optimization Hub */}
          <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#0F2C5C] dark:text-amber-400" />
                <h3 className="text-xs font-bold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                  AI Dispatch Feed
                </h3>
              </div>
              <button
                onClick={() => setActiveNav('Optimization')}
                className="text-[11px] text-[#2F5FD1] dark:text-sky-400 hover:underline flex items-center gap-1 font-medium"
              >
                Optimization <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Recommendation list */}
            <div className="p-3.5 space-y-3">
              {aiRecommendations.slice(0, 2).map((rec) => (
                <div 
                  key={rec.id}
                  className="p-3 rounded-lg border border-[rgba(15,44,92,0.08)] dark:border-white/10 bg-[#F8F9FB]/60 dark:bg-[#1f2937]/50 space-y-2 hover:border-[#1E7F4F]/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-[#0F2C5C] dark:text-sky-300 px-1.5 py-0.5 rounded">
                        {rec.type}
                      </span>
                      <span className="text-[10px] text-[#5B6478] dark:text-gray-400 truncate max-w-[130px]">
                        {rec.location || 'Northern Sector'}
                      </span>
                    </div>
                    {rec.savings && (
                      <span className="font-mono text-[10px] font-bold text-[#1E7F4F] dark:text-[#4ade80]">
                        Saves {rec.savings}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-[#0F2C5C] dark:text-white leading-snug">
                    {rec.title}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#5B6478] dark:text-gray-400">
                      {rec.description}
                    </span>
                    <button
                      onClick={() => {
                        applyRecommendation(rec.id);
                        addToast(`Action executed: ${rec.title}`, 'success');
                      }}
                      className="px-2 py-1 bg-[#1E7F4F] hover:bg-[#17663e] text-white font-mono text-[10px] font-bold rounded transition-colors shrink-0"
                    >
                      Apply Action
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Alerts Panel */}
          <div className="bg-white dark:bg-[#111827] border border-[rgba(15,44,92,0.10)] dark:border-white/10 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-3 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#1f2937] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-[#C23636] dark:text-red-400" />
                <h3 className="text-xs font-bold text-[#0F2C5C] dark:text-white uppercase tracking-wider">
                  Live Safety & Signals
                </h3>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#C23636] dark:text-red-400">
                {alerts.filter(a => a.severity === 'critical' || a.severity === 'warning').length} active
              </span>
            </div>

            <div className="divide-y divide-[rgba(15,44,92,0.08)] dark:divide-white/10 max-h-[220px] overflow-y-auto">
              {alerts.slice(0, 3).map((alert) => {
                const isCritical = alert.severity === 'critical';
                const isWarning = alert.severity === 'warning';
                return (
                  <div 
                    key={alert.id}
                    onClick={() => addToast(`Alert Acknowledged: ${alert.message}`, isCritical ? 'error' : 'info')}
                    className="p-3 hover:bg-[#F8F9FB] dark:hover:bg-[#1f2937] transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                        isCritical ? 'bg-red-100 dark:bg-red-950/50 text-[#C23636] dark:text-red-400' :
                        isWarning ? 'bg-amber-100 dark:bg-amber-950/50 text-[#F5821F] dark:text-amber-400' :
                        'bg-sky-100 dark:bg-sky-950/50 text-[#2F5FD1] dark:text-sky-400'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="font-mono text-[10px] text-[#5B6478] dark:text-gray-500">
                        {alert.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#0F2C5C] dark:text-gray-200 font-medium leading-snug">
                      {alert.message}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
