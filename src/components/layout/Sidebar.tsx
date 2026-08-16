import React, { useState } from 'react';
import { useSystem } from '../../context/SystemContext';
import { Menu, LayoutDashboard, Network, Activity, Zap, MonitorPlay, BarChart3, Settings as SettingsIcon } from 'lucide-react';
import type { ActiveNav } from '../../types';

interface NavItem {
  id: ActiveNav;
  label: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'Network', label: 'Network', icon: Network },
  { id: 'Operations', label: 'Operations', icon: Activity },
  { id: 'Optimization', label: 'Optimization', icon: Zap },
  { id: 'Simulation', label: 'Simulation', icon: MonitorPlay },
  { id: 'Analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'Settings', label: 'Settings', icon: SettingsIcon },
];

export const Sidebar: React.FC = () => {
  const { activeNav, setActiveNav } = useSystem();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} shrink-0 h-screen sticky top-0 bg-[#FFFFFF] dark:bg-[#111827] border-r border-[rgba(15,44,92,0.10)] dark:border-white/10 flex flex-col justify-between select-none z-20 transition-all duration-300 ease-in-out`}>
      
      {/* Top Section */}
      <div>
        <div className={`h-20 px-4 flex items-center border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-white dark:bg-[#111827] transition-colors ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors text-[#0F2C5C] dark:text-white shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          {!isCollapsed && (
            <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
              <img src="/logo.png" alt="Amogh Rail Logo" className="h-10 w-auto object-contain drop-shadow-sm" />
              <span className="font-bold text-[15px] tracking-[0.1em] text-[#0F2C5C] dark:text-white uppercase transition-colors">
                AMOGH RAIL
              </span>
            </div>
          )}
        </div>

        {/* Nav List */}
        <nav className="py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full px-4 py-2.5 text-sm font-medium transition-colors relative flex items-center gap-3 rounded-md ${
                  isActive
                    ? 'text-[#0F2C5C] dark:text-white font-semibold bg-[#F4F6F9] dark:bg-[#1f2937]'
                    : 'text-[#5B6478] dark:text-gray-400 hover:text-[#0F2C5C] dark:hover:text-white hover:bg-[#F8F9FB] dark:hover:bg-[#1E293B]'
                } ${isCollapsed ? 'justify-center px-0' : 'justify-start'}`}
              >
                {isActive && (
                  <span 
                    className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-md transition-colors"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                )}
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[var(--color-accent)]' : ''}`} />
                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
              </button>
            );
          })}
        </nav>
        
        {/* Mid Section Widget to fill blank space */}
        {!isCollapsed && (
          <div className="px-4 mt-6">
            <div className="p-4 bg-[#F8F9FB] dark:bg-[#1E293B]/50 rounded-xl border border-[rgba(15,44,92,0.08)] dark:border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#5B6478] dark:text-gray-400 mb-3 border-b border-[rgba(15,44,92,0.05)] dark:border-white/5 pb-2">
                Northern Zone
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#0F2C5C] dark:text-gray-300 font-medium">Active Trains</span>
                  <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#0F2C5C] dark:text-gray-300 font-medium">Network Load</span>
                  <span className="text-sm font-mono font-bold text-[#1E7F4F] dark:text-emerald-400">76%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#0F2C5C] dark:text-gray-300 font-medium">Alerts</span>
                  <span className="text-sm font-mono font-bold text-red-500">2 Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status matching Figma design */}
      <div className={`p-4 ${isCollapsed ? 'px-0 flex justify-center' : 'px-6'} border-t border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#111827] transition-colors`}>
        <div className={`flex items-center gap-2 ${isCollapsed ? 'justify-center' : ''}`} title="ALL SYSTEMS OPERATIONAL">
          <span className="relative flex h-2 w-2 shrink-0">
            <span 
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: 'var(--color-accent)' }}
            ></span>
            <span 
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: 'var(--color-accent)' }}
            ></span>
          </span>
          {!isCollapsed && (
            <span className="font-mono text-xs font-semibold tracking-wider text-[#0F2C5C] dark:text-gray-300 uppercase transition-colors whitespace-nowrap overflow-hidden">
              ALL SYSTEMS OPERATIONAL
            </span>
          )}
        </div>
      </div>

    </aside>
  );
};
