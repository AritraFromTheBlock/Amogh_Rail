export type SignalStatus = 'ON TIME' | 'DELAYED' | 'APPROACHING' | 'BOARDING' | 'HELD';

export interface Train {
  trainNo: string;
  name: string;
  route: string;
  location: string;
  status: SignalStatus;
  delay: string;
  delayMinutes: number;
  platform: string;
  etd: string;
  scheduledTime: string;
  destination: string;
  speed?: number;
  priority?: 'High' | 'Express' | 'Passenger' | 'Freight';
  currentTrack?: string;
  nextStation?: string;
}

export type CorridorStatus = 'NORMAL' | 'HIGH' | 'CRITICAL';

export interface Corridor {
  id: string;
  name: string;
  load: number;
  status: CorridorStatus;
  activeTrains: number;
  tracks: number;
}

export interface AIRecommendation {
  id: string;
  type: 'CONGESTION' | 'PREDICTION' | 'REROUTE';
  badge: 'AI';
  title: string;
  description: string;
  confidence?: string;
  location?: string;
  savings?: string;
}

export interface SimulationLog {
  id: string;
  time: string;
  message: string;
  color?: string;
}

export interface SimulationState {
  scenarioName: string;
  subTitle: string;
  simTime: string;
  simulatedTrains: number;
  aiDecisionsEvaluated: number;
  efficiencyGain: string;
  conflictsResolved: number;
  progressPercent: number;
  eta: string;
  isRunning: boolean;
  logs: SimulationLog[];
}

export interface WeeklyData {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  percentage: number;
  highlight?: boolean;
}

export interface SystemDiagnostic {
  name: string;
  percentage: number;
}

export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'resolved' | 'info';
  message: string;
  timestamp: string;
  location: string;
  trainNo?: string;
}

export type ActiveNav = 
  | 'Dashboard'
  | 'Network'
  | 'Operations'
  | 'Optimization'
  | 'Simulation'
  | 'Analytics'
  | 'Settings';
