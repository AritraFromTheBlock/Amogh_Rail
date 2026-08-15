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
    <aside className="w-56 shrink-0 h-screen sticky top-0 bg-[#FFFFFF] border-r border-[rgba(15,44,92,0.10)] flex flex-col justify-between select-none z-20">
      
      {/* Top Section */}
      <div>
        {/* Logo matching Figma design */}
        <div className="h-16 px-6 flex items-center border-b border-[rgba(15,44,92,0.10)]">
          <div className="flex items-center gap-2">
            {/* Rail Track Symbol */}
            <div className="flex flex-col gap-0.5 text-[#0F2C5C]">
              <div className="w-3.5 h-[2.5px] bg-[#0F2C5C] rounded-none"></div>
              <div className="w-3.5 h-[2.5px] bg-[#0F2C5C] rounded-none"></div>
            </div>
            <span className="font-bold text-[13px] tracking-[0.15em] text-[#0F2C5C] uppercase">
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
                    ? 'text-[#0F2C5C] font-semibold bg-[#F4F6F9]'
                    : 'text-[#5B6478] hover:text-[#0F2C5C] hover:bg-[#F8F9FB]'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#0F2C5C]" />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status matching Figma design */}
      <div className="p-4 px-6 border-t border-[rgba(15,44,92,0.10)] bg-[#FFFFFF]">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1E7F4F] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E7F4F]"></span>
          </span>
          <span className="font-mono text-[10px] font-semibold tracking-wider text-[#0F2C5C] uppercase">
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>

    </aside>
  );
};
