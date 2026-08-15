import React from 'react';
import { useSystem } from '../context/SystemContext';
import { StatCard } from '../components/common/StatCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { StatusBadge } from '../components/common/StatusBadge';

export const Dashboard: React.FC = () => {
  const { corridors, aiRecommendations, applyRecommendation } = useSystem();

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Title Header matching Figma */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] tracking-tight">
          Dashboard
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] uppercase tracking-wider">
          Northern Zone Control Room
        </span>
      </div>

      {/* Top 5 Stat Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 pt-2 pb-6 border-b border-[rgba(15,44,92,0.10)]">
        <StatCard
          label="Active Trains"
          value={128}
          delta="+12"
          deltaType="positive"
        />
        <StatCard
          label="On-Time Rate"
          value="84%"
          delta="+3%"
          deltaType="positive"
        />
        <StatCard
          label="Delayed Trains"
          value={21}
          delta="−5"
          deltaType="positive"
        />
        <StatCard
          label="Active Alerts"
          value={7}
          deltaType="caution"
        />
        <StatCard
          label="Network Load"
          value="68%"
          delta="Moderate"
          deltaType="caution"
        />
      </div>

      {/* Middle Grid: Network Overview & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Network Overview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
            NETWORK OVERVIEW
          </div>

          <div className="space-y-5 pt-1">
            {corridors.map((corridor) => (
              <div key={corridor.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#0F2C5C]">
                    {corridor.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#0F2C5C]">
                      {corridor.load}%
                    </span>
                    <StatusBadge status={corridor.status} size="sm" />
                  </div>
                </div>
                <ProgressBar
                  value={corridor.load}
                  status={corridor.status}
                  height="h-[3px]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Recommendations (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
            AI RECOMMENDATIONS
          </div>

          <div className="space-y-3">
            {aiRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 border border-[rgba(15,44,92,0.10)] bg-white hover:border-[rgba(15,44,92,0.25)] transition-all group"
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <StatusBadge status={rec.type} size="sm" />
                  <StatusBadge status="AI" size="sm" />
                </div>
                <h3 className="text-xs font-semibold text-[#0F2C5C] leading-snug">
                  {rec.title}
                </h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] text-[#5B6478]">
                    {rec.description}
                  </p>
                  <button
                    onClick={() => applyRecommendation(rec.id)}
                    className="opacity-0 group-hover:opacity-100 text-[10px] font-mono uppercase tracking-wider text-[#2F5FD1] hover:underline transition-opacity"
                  >
                    Apply Action
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Row: Network Infrastructure & AI Optimization & Prediction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-[rgba(15,44,92,0.10)]">
        
        {/* Network Infrastructure (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
            NETWORK INFRASTRUCTURE
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <StatCard
              label="Active Tracks"
              value={86}
            />
            <StatCard
              label="Stations Online"
              value={42}
            />
          </div>
        </div>

        {/* AI Optimization & Prediction (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
            AI OPTIMIZATION & PREDICTION
          </div>
          <div className="grid grid-cols-2 gap-6">
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
          </div>
        </div>

      </div>

    </div>
  );
};
