import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Train, Corridor, AIRecommendation, SimulationState, AlertItem, ActiveNav } from '../types';
import { INITIAL_TRAINS, CORRIDORS, AI_RECOMMENDATIONS, INITIAL_SIMULATION, SYSTEM_ALERTS } from '../data/mockData';

interface SystemSettings {
  theme: 'Dark' | 'Light' | 'System';
  accentColor: string;
  liveMonitoring: boolean;
  aiAssistance: boolean;
  criticalAlerts: boolean;
  autoRefresh: boolean;
  refreshInterval: string;
  timezone: string;
}

interface SystemContextType {
  activeNav: ActiveNav;
  setActiveNav: (nav: ActiveNav) => void;
  istTime: string;
  trains: Train[];
  corridors: Corridor[];
  aiRecommendations: AIRecommendation[];
  simulation: SimulationState;
  alerts: AlertItem[];
  unreadAlertsCount: number;
  isAlertsOpen: boolean;
  setIsAlertsOpen: (open: boolean) => void;
  settings: SystemSettings;
  updateSettings: (partial: Partial<SystemSettings>) => void;
  toggleSimulation: () => void;
  restartSimulation: () => void;
  dismissRecommendation: (id: string) => void;
  applyRecommendation: (id: string) => void;
  updateTrainStatus: (trainNo: string, newStatus: Train['status'], newDelay?: string) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeNav, setActiveNav] = useState<ActiveNav>('Dashboard');
  const [istTime, setIstTime] = useState<string>('');
  const [trains, setTrains] = useState<Train[]>(INITIAL_TRAINS);
  const [corridors] = useState<Corridor[]>(CORRIDORS);
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>(AI_RECOMMENDATIONS);
  const [simulation, setSimulation] = useState<SimulationState>(INITIAL_SIMULATION);
  const [alerts, setAlerts] = useState<AlertItem[]>(SYSTEM_ALERTS);
  const [isAlertsOpen, setIsAlertsOpen] = useState<boolean>(false);

  const [settings, setSettings] = useState<SystemSettings>({
    theme: 'Light',
    accentColor: '#0F2C5C',
    liveMonitoring: true,
    aiAssistance: true,
    criticalAlerts: true,
    autoRefresh: false,
    refreshInterval: '30s',
    timezone: 'Asia/Kolkata'
  });

  // Handle Dark Mode and Accent Color globally
  useEffect(() => {
    // Theme
    if (settings.theme === 'Dark') {
      document.documentElement.classList.add('dark');
    } else if (settings.theme === 'Light') {
      document.documentElement.classList.remove('dark');
    } else {
      // System
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (systemDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    // Accent Color
    document.documentElement.style.setProperty('--color-accent', settings.accentColor);
  }, [settings.theme, settings.accentColor]);

  // Real-time IST Clock (updates every second with IST timezone and en-IN formatting)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatted = new Intl.DateTimeFormat('en-IN', options).format(now);
      setIstTime(`${formatted} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Live simulation ticker when running
  useEffect(() => {
    if (!simulation.isRunning) return;

    const interval = setInterval(() => {
      setSimulation(prev => {
        const nextProgress = prev.progressPercent >= 100 ? 100 : prev.progressPercent + 0.5;
        const nextDecisions = prev.aiDecisionsEvaluated + 1;
        
        return {
          ...prev,
          progressPercent: Number(nextProgress.toFixed(1)),
          aiDecisionsEvaluated: nextDecisions
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [simulation.isRunning]);

  const updateSettings = (partial: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...partial }));
  };

  const toggleSimulation = () => {
    setSimulation(prev => ({
      ...prev,
      isRunning: !prev.isRunning
    }));
  };

  const restartSimulation = () => {
    setSimulation({
      ...INITIAL_SIMULATION,
      progressPercent: 0,
      aiDecisionsEvaluated: 12,
      isRunning: true
    });
  };

  const dismissRecommendation = (id: string) => {
    setAiRecommendations(prev => prev.filter(r => r.id !== id));
  };

  const applyRecommendation = (id: string) => {
    const rec = aiRecommendations.find(r => r.id === id);
    if (rec) {
      if (rec.type === 'REROUTE') {
        setTrains(prev => prev.map(t => t.trainNo === '12884' ? { ...t, delay: '—', status: 'ON TIME' } : t));
      }
      setAlerts(prev => [
        {
          id: `alt-${Date.now()}`,
          severity: 'resolved',
          message: `AI action applied: ${rec.title}`,
          timestamp: istTime.replace(' IST', ''),
          location: rec.location || 'Network'
        },
        ...prev
      ]);
      dismissRecommendation(id);
    }
  };

  const updateTrainStatus = (trainNo: string, newStatus: Train['status'], newDelay = '—') => {
    setTrains(prev => prev.map(t => {
      if (t.trainNo === trainNo) {
        return {
          ...t,
          status: newStatus,
          delay: newDelay,
          delayMinutes: newStatus === 'ON TIME' ? 0 : t.delayMinutes
        };
      }
      return t;
    }));
  };

  return (
    <SystemContext.Provider
      value={{
        activeNav,
        setActiveNav,
        istTime,
        trains,
        corridors,
        aiRecommendations,
        simulation,
        alerts,
        unreadAlertsCount: alerts.length,
        isAlertsOpen,
        setIsAlertsOpen,
        settings,
        updateSettings,
        toggleSimulation,
        restartSimulation,
        dismissRecommendation,
        applyRecommendation,
        updateTrainStatus
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = (): SystemContextType => {
  const context = useContext(SystemContext);
  if (!context) throw new Error('useSystem must be used within a SystemProvider');
  return context;
};
