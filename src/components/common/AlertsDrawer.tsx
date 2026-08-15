import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import { StatusBadge } from './StatusBadge';
import { X, CheckCircle2, AlertTriangle, AlertOctagon, Info, BellRing } from 'lucide-react';

export const AlertsDrawer: React.FC = () => {
  const { isAlertsOpen, setIsAlertsOpen, alerts } = useSystem();
  const [filter, setFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'RESOLVED'>('ALL');

  if (!isAlertsOpen) return null;

  const filteredAlerts = alerts.filter(item => {
    if (filter === 'ALL') return true;
    return item.severity.toUpperCase() === filter;
  });

  const getIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertOctagon className="w-4 h-4 text-[#C23636] shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#B9790A] shrink-0 mt-0.5" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4 text-[#1E7F4F] shrink-0 mt-0.5" />;
      default:
        return <Info className="w-4 h-4 text-[#2F5FD1] shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F2C5C]/20 transition-opacity"
        onClick={() => setIsAlertsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[rgba(15,44,92,0.12)] flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 border-b border-[rgba(15,44,92,0.10)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-[#0F2C5C]" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-[#0F2C5C]">
                Active System Alerts
              </h2>
              <span className="font-mono text-xs px-1.5 py-0.2 border border-[rgba(15,44,92,0.15)] text-[#0F2C5C]">
                {alerts.length}
              </span>
            </div>
            <button
              onClick={() => setIsAlertsOpen(false)}
              className="p-1 hover:bg-slate-100 text-[#5B6478] hover:text-[#0F2C5C] transition-colors"
              aria-label="Close alerts panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="px-4 py-2 border-b border-[rgba(15,44,92,0.08)] bg-[#F8F9FB] flex items-center gap-1.5 overflow-x-auto">
            {(['ALL', 'CRITICAL', 'WARNING', 'RESOLVED'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[11px] font-mono font-medium px-2.5 py-1 uppercase tracking-wider transition-colors ${
                  filter === cat
                    ? 'bg-[#0F2C5C] text-white'
                    : 'text-[#5B6478] hover:bg-slate-200/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Alerts Feed */}
          <div className="flex-1 overflow-y-auto divide-y divide-[rgba(15,44,92,0.08)]">
            {filteredAlerts.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#5B6478] font-mono">
                No alerts under selected filter
              </div>
            ) : (
              filteredAlerts.map(alert => (
                <div key={alert.id} className="p-4 hover:bg-[#F8F9FA] transition-colors flex gap-3 items-start">
                  {getIcon(alert.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <StatusBadge status={alert.severity} size="sm" />
                      <span className="font-mono text-[11px] text-[#5B6478]">
                        {alert.timestamp} IST
                      </span>
                    </div>
                    <p className="text-xs text-[#0F2C5C] font-medium leading-relaxed">
                      {alert.message}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[#5B6478] font-mono">
                      <span>LOC: {alert.location}</span>
                      {alert.trainNo && <span>• TRAIN: {alert.trainNo}</span>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-[rgba(15,44,92,0.10)] bg-[#F8F9FB] flex items-center justify-between text-[11px] font-mono text-[#5B6478]">
            <span>NORTHERN ZONE FEED</span>
            <span>AUTO-SYNC ACTIVE</span>
          </div>

        </div>
      </div>
    </div>
  );
};
