import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { useAuth } from '../context/AuthContext';
import { SYSTEM_DIAGNOSTICS } from '../data/mockData';
import { ProgressBar } from '../components/common/ProgressBar';
import { Check, ShieldCheck } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useSystem();
  const { user } = useAuth();
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  const accentColors = [
    { name: 'Signal Clear', hex: '#1E7F4F' },
    { name: 'Signal Caution', hex: '#B9790A' },
    { name: 'Signal Danger', hex: '#C23636' },
    { name: 'Brand Navy', hex: '#0F2C5C' },
    { name: 'Signal Info', hex: '#2F5FD1' },
  ];

  const handleSave = () => {
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 2500);
  };

  return (
    <div className="space-y-10 max-w-7xl">
      
      {/* Title Header matching Figma */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] tracking-tight">
          Settings
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] uppercase tracking-wider">
          Northern Zone Control Room
        </span>
      </div>

      {/* Grid: 2 columns matching Page 5 screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column (6 cols): System Health Diagnostics */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
            SYSTEM HEALTH DIAGNOSTICS
          </div>

          <div className="space-y-4">
            {SYSTEM_DIAGNOSTICS.map((diag) => (
              <div key={diag.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#0F2C5C]">
                    {diag.name}
                  </span>
                  <span className="font-mono text-xs text-[#0F2C5C]">
                    {diag.percentage}%
                  </span>
                </div>
                <ProgressBar
                  value={diag.percentage}
                  color="#1E7F4F"
                  height="h-[3px]"
                />
              </div>
            ))}
          </div>

          {/* Overall Status banner */}
          <div className="pt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1E7F4F]" />
            <span className="font-mono text-[11px] font-medium tracking-wider text-[#0F2C5C] uppercase">
              98% OVERALL — ALL SYSTEMS OPERATIONAL
            </span>
          </div>

          {/* Monitoring & Alerts Toggles */}
          <div className="pt-8 space-y-5 border-t border-[rgba(15,44,92,0.10)]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
              MONITORING & ALERTS
            </div>

            <div className="space-y-4">
              
              {/* Live Monitoring */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#0F2C5C]">Live Monitoring</h4>
                  <p className="text-[11px] text-[#5B6478]">Real-time track and train data</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ liveMonitoring: !settings.liveMonitoring })}
                  className={`w-9 h-5 flex items-center transition-colors p-0.5 rounded-none ${
                    settings.liveMonitoring ? 'bg-[#0F2C5C]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 shadow-sm transform transition-transform ${
                      settings.liveMonitoring ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* AI Assistance */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#0F2C5C]">AI Assistance</h4>
                  <p className="text-[11px] text-[#5B6478]">Show AI recommendations in dashboard</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ aiAssistance: !settings.aiAssistance })}
                  className={`w-9 h-5 flex items-center transition-colors p-0.5 rounded-none ${
                    settings.aiAssistance ? 'bg-[#0F2C5C]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 shadow-sm transform transition-transform ${
                      settings.aiAssistance ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Critical Alerts */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#0F2C5C]">Critical Alerts</h4>
                  <p className="text-[11px] text-[#5B6478]">Push alerts for danger-level events</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ criticalAlerts: !settings.criticalAlerts })}
                  className={`w-9 h-5 flex items-center transition-colors p-0.5 rounded-none ${
                    settings.criticalAlerts ? 'bg-[#0F2C5C]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 shadow-sm transform transition-transform ${
                      settings.criticalAlerts ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Auto Refresh */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-semibold text-[#0F2C5C]">Auto Refresh</h4>
                  <p className="text-[11px] text-[#5B6478]">Refresh dashboard data every 30 seconds</p>
                </div>
                <button
                  type="button"
                  onClick={() => updateSettings({ autoRefresh: !settings.autoRefresh })}
                  className={`w-9 h-5 flex items-center transition-colors p-0.5 rounded-none ${
                    settings.autoRefresh ? 'bg-[#0F2C5C]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 shadow-sm transform transition-transform ${
                      settings.autoRefresh ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Appearance & System Configuration */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Appearance Section */}
          <div className="space-y-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
              APPEARANCE
            </div>

            {/* Theme Selector matching Figma */}
            <div className="space-y-1.5">
              <span className="text-xs text-[#5B6478]">Theme</span>
              <div className="flex items-center gap-1">
                {(['Dark', 'Light', 'System'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => updateSettings({ theme: t })}
                    className={`px-3 py-1 text-xs font-medium transition-colors ${
                      settings.theme === t
                        ? 'bg-[#0F2C5C] text-white'
                        : 'bg-[#F8F9FB] text-[#5B6478] hover:bg-slate-200/60'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color Picker matching Figma */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs text-[#5B6478]">Accent Color</span>
              <div className="flex items-center gap-2">
                {accentColors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => updateSettings({ accentColor: col.hex })}
                    className={`w-5 h-5 rounded-none transition-transform relative ${
                      settings.accentColor === col.hex ? 'ring-2 ring-offset-2 ring-[#0F2C5C] scale-110' : ''
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* System Configuration Section */}
          <div className="pt-8 space-y-5 border-t border-[rgba(15,44,92,0.10)]">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
              SYSTEM CONFIGURATION
            </div>

            <div className="space-y-4">
              
              {/* Refresh interval */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#0F2C5C] font-medium">Refresh interval</span>
                <select
                  value={settings.refreshInterval}
                  onChange={(e) => updateSettings({ refreshInterval: e.target.value })}
                  className="h-8 px-3 text-xs font-mono text-[#0F2C5C] bg-[#F8F9FB] border border-[rgba(15,44,92,0.15)] focus:outline-none"
                >
                  <option value="15s">15s</option>
                  <option value="30s">30s</option>
                  <option value="60s">60s</option>
                </select>
              </div>

              {/* Timezone */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#0F2C5C] font-medium">Timezone</span>
                <select
                  value={settings.timezone}
                  onChange={(e) => updateSettings({ timezone: e.target.value })}
                  className="h-8 px-3 text-xs font-mono text-[#0F2C5C] bg-[#F8F9FB] border border-[rgba(15,44,92,0.15)] focus:outline-none"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST +05:30)</option>
                  <option value="UTC">UTC (+00:00)</option>
                </select>
              </div>

              {/* Profile */}
              <div className="pt-2 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#0F2C5C] font-medium">Profile</span>
                  <button 
                    onClick={handleSave}
                    className="text-[11px] text-[#2F5FD1] hover:underline"
                  >
                    Edit Profile
                  </button>
                </div>
                <p className="text-xs text-[#5B6478]">
                  {user?.name} · {user?.role} · {user?.zone}
                </p>
              </div>

              {/* Session */}
              <div className="pt-2 space-y-1">
                <span className="text-xs text-[#0F2C5C] font-medium">Session</span>
                <div className="p-3 bg-[#F8F9FB] border border-[rgba(15,44,92,0.08)] flex items-center justify-between text-[11px] font-mono text-[#5B6478]">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#1E7F4F]" />
                    AUTH: ACTIVE TOKEN
                  </span>
                  <span>TIMEOUT: 8h 00m</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Saved Toast Notification */}
      {showSavedNotification && (
        <div className="fixed bottom-6 right-6 bg-[#0F2C5C] text-white px-4 py-2.5 shadow-lg flex items-center gap-2 text-xs font-mono animate-fade-in">
          <Check className="w-4 h-4 text-[#1E7F4F]" />
          <span>System configuration updated successfully</span>
        </div>
      )}

    </div>
  );
};
