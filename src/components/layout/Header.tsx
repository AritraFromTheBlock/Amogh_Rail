import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSystem } from '../../context/SystemContext';
import { Bell, LogOut, Shield } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { istTime, unreadAlertsCount, setIsAlertsOpen } = useSystem();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Dynamic greeting based on current IST hour
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <header className="h-16 bg-[#FFFFFF] border-b border-[rgba(15,44,92,0.10)] px-8 flex items-center justify-between sticky top-0 z-10 select-none">
      
      {/* Left: Greeting */}
      <div>
        <h1 className="text-[15px] font-medium text-[#0F2C5C]">
          {getGreeting()}, {user?.name.split(' ')[0] || 'Arjun'}
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        
        {/* Live IST Clock */}
        <div className="font-mono text-[13px] text-[#0F2C5C] tracking-tight">
          {istTime || '17:34:07 IST'}
        </div>

        {/* Alerts Bell */}
        <button
          onClick={() => setIsAlertsOpen(true)}
          className="relative p-1.5 text-[#0F2C5C] hover:text-[#2F5FD1] transition-colors"
          title="Open System Alerts"
          aria-label="System Alerts"
        >
          <Bell className="w-[18px] h-[18px] stroke-[1.75]" />
          {unreadAlertsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#C23636] rounded-full ring-2 ring-white"></span>
          )}
        </button>

        {/* Profile Chip */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-none hover:bg-[#F8F9FB] transition-colors text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#0F2C5C] text-white flex items-center justify-center font-mono text-xs font-semibold">
              {user?.initials || 'AS'}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-[13px] font-semibold leading-none text-[#0F2C5C]">
                {user?.name || 'Arjun Sharma'}
              </span>
              <span className="text-[10px] text-[#5B6478] leading-tight mt-0.5">
                {user?.role || 'Traffic Controller'}
              </span>
            </div>
          </button>

          {/* User Popover Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[rgba(15,44,92,0.12)] shadow-lg py-1 z-50">
              <div className="px-4 py-2 border-b border-[rgba(15,44,92,0.08)]">
                <p className="text-xs font-semibold text-[#0F2C5C]">{user?.name}</p>
                <p className="text-[11px] text-[#5B6478] font-mono">{user?.zone}</p>
                <p className="text-[10px] text-[#5B6478] truncate">{user?.email}</p>
              </div>
              
              <div className="py-1">
                <div className="px-4 py-1.5 flex items-center gap-2 text-xs text-[#5B6478]">
                  <Shield className="w-3.5 h-3.5 text-[#1E7F4F]" />
                  <span>Role: IR-Level 4 Clearance</span>
                </div>
              </div>

              <div className="border-t border-[rgba(15,44,92,0.08)] pt-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-[#C23636] hover:bg-[#F8F9FA] flex items-center gap-2 font-medium"
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
