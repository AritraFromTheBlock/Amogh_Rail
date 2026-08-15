import React from 'react';
import { useSystem } from '../../context/SystemContext';
import type { ActiveNav } from '../../types';

interface NavItem {
  id: ActiveNav;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'Dashboard', label: 'Dashboard' },
  { id: 'Network', label: 'Network' },
  { id: 'Operations', label: 'Operations' },
  { id: 'Optimization', label: 'Optimization' },
  { id: 'Simulation', label: 'Simulation' },
  { id: 'Analytics', label: 'Analytics' },
  { id: 'Settings', label: 'Settings' },
];

export const Sidebar: React.FC = () => {
  const { activeNav, setActiveNav } = useSystem();

  return (
    <aside className="w-56 shrink-0 h-screen sticky top-0 bg-[#FFFFFF] dark:bg-[#111827] border-r border-[rgba(15,44,92,0.10)] dark:border-white/10 flex flex-col justify-between select-none z-20 transition-colors">
      
      {/* Top Section */}
      <div>
        <div className="h-20 px-6 flex items-center border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-white dark:bg-[#111827] transition-colors">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Amogh Rail Logo" className="h-12 w-auto object-contain drop-shadow-sm" />
            <span className="font-bold text-[15px] tracking-[0.15em] text-[#0F2C5C] dark:text-white uppercase transition-colors">
              AMOGH RAIL
            </span>
          </div>
        </div>

        {/* Nav List */}
        <nav className="py-6 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full text-left px-4 py-2.5 text-[13px] font-medium transition-colors relative flex items-center ${
                  isActive
                    ? 'text-[#0F2C5C] dark:text-white font-semibold bg-[#F4F6F9] dark:bg-[#1f2937]'
                    : 'text-[#5B6478] dark:text-gray-400 hover:text-[#0F2C5C] dark:hover:text-white hover:bg-[#F8F9FB] dark:hover:bg-[#1E293B]'
                }`}
              >
                {isActive && (
                  <span 
                    className="absolute left-0 top-0 bottom-0 w-[3px] transition-colors"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status matching Figma design */}
      <div className="p-4 px-6 border-t border-[rgba(15,44,92,0.10)] dark:border-white/10 bg-[#FFFFFF] dark:bg-[#111827] transition-colors">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span 
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: 'var(--color-accent)' }}
            ></span>
            <span 
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: 'var(--color-accent)' }}
            ></span>
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-[#0F2C5C] dark:text-gray-300 uppercase transition-colors">
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>

    </aside>
  );
};
