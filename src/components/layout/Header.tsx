import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSystem } from '../../context/SystemContext';
import { Bell, LogOut, Shield, Sun, Moon } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { istTime, unreadAlertsCount, setIsAlertsOpen, settings, updateSettings } = useSystem();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Dynamic greeting based on current IST hour
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'Dark' ? 'Light' : 'Dark' });
  };

  return (
    <header className="h-16 bg-[#FFFFFF] dark:bg-[#0B1120] border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 px-8 flex items-center justify-between sticky top-0 z-10 select-none transition-colors">
      
      {/* Left/Center: Greeting & Context */}
      <div className="flex items-center gap-6">
        <h1 className="text-[15px] font-medium text-[#0F2C5C] dark:text-gray-100 transition-colors">
          {getGreeting()}, {user?.name.split(' ')[0] || 'Arjun'}
        </h1>
        <div className="h-4 w-[1px] bg-[rgba(15,44,92,0.2)] dark:bg-white/20 hidden md:block"></div>
        <div className="hidden md:flex items-center gap-2">
          <span 
            className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(30,127,79,0.8)]"
            style={{ backgroundColor: 'var(--color-accent)' }}
          ></span>
          <span className="font-mono text-[11px] font-semibold tracking-wider text-[#5B6478] dark:text-gray-400 uppercase transition-colors">
            NORTHERN ZONE · CENTRAL TRAFFIC CONTROL
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        
        {/* Hexaverse Team Logo Placeholder */}
        {/* Hexaverse Team Logo */}
        <div className="flex items-center">
          <img src="/team_logo.png" alt="Team Logo" className="h-8 w-auto object-contain drop-shadow-sm" />
        </div>

        <div className="h-5 w-[1px] bg-[rgba(15,44,92,0.15)] dark:bg-white/20"></div>

        {/* Live IST Clock */}
        <div className="font-mono text-[13px] text-[#0F2C5C] dark:text-gray-200 tracking-tight transition-colors">
          {istTime || '17:34:07 IST'}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 text-[#0F2C5C] dark:text-gray-300 hover:text-[#2F5FD1] dark:hover:text-[#4dabf7] transition-colors"
          title="Toggle Dark Mode"
          aria-label="Toggle Dark Mode"
        >
          {settings.theme === 'Dark' ? (
            <Sun className="w-[18px] h-[18px] stroke-[1.75]" />
          ) : (
            <Moon className="w-[18px] h-[18px] stroke-[1.75]" />
          )}
        </button>

        {/* Alerts Bell */}
        <button
          onClick={() => setIsAlertsOpen(true)}
          className="relative p-1.5 text-[#0F2C5C] dark:text-gray-300 hover:text-[#2F5FD1] dark:hover:text-[#4dabf7] transition-colors"
          title="Open System Alerts"
          aria-label="System Alerts"
        >
          <Bell className="w-[18px] h-[18px] stroke-[1.75]" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#C23636] rounded-full ring-2 ring-white dark:ring-[#0B1120]"></span>
          )}
        </button>

        {/* Profile Chip */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-none hover:bg-[#F8F9FB] dark:hover:bg-[#1E293B] transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-none bg-[#0F2C5C] dark:bg-slate-700 text-white flex items-center justify-center font-mono text-xs font-semibold transition-colors">
              {user?.initials || 'AS'}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-[13px] font-semibold leading-none text-[#0F2C5C] dark:text-gray-100 transition-colors">
                {user?.name || 'Arjun Sharma'}
              </span>
              <span className="text-[10px] text-[#5B6478] dark:text-gray-400 leading-tight mt-0.5 transition-colors">
                {user?.role || 'Traffic Controller'}
              </span>
            </div>
          </button>

          {/* User Popover Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] border border-[rgba(15,44,92,0.12)] dark:border-white/10 shadow-lg py-1 z-50 transition-colors">
              <div className="px-4 py-2 border-b border-[rgba(15,44,92,0.08)] dark:border-white/10 transition-colors">
                <p className="text-xs font-semibold text-[#0F2C5C] dark:text-white">{user?.name}</p>
                <p className="text-[11px] text-[#5B6478] dark:text-gray-400 font-mono">{user?.zone}</p>
                <p className="text-[10px] text-[#5B6478] dark:text-gray-500 truncate">{user?.email}</p>
              </div>
              
              <div className="py-1">
                <div className="px-4 py-1.5 flex items-center gap-2 text-xs text-[#5B6478] dark:text-gray-400 transition-colors">
                  <Shield className="w-3.5 h-3.5 text-[#1E7F4F] dark:text-[#4ade80]" />
                  <span>Role: IR-Level 4 Clearance</span>
                </div>
              </div>

              <div className="border-t border-[rgba(15,44,92,0.08)] dark:border-white/10 pt-1 transition-colors">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#C23636] dark:text-[#f87171] hover:bg-[#F8F9FA] dark:hover:bg-[#334155] flex items-center gap-2 font-medium transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out of Control Room
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
