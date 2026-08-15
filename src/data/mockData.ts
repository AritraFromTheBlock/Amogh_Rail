import type { Train, Corridor, AIRecommendation, SimulationState, WeeklyData, SystemDiagnostic, AlertItem } from '../types';

export const INITIAL_TRAINS: Train[] = [
  {
    trainNo: '12967',
    name: 'Rajdhani Express',
    route: 'NDLS → MMCT',
    location: 'Mathura Jn',
    status: 'DELAYED',
    delay: '+18 min',
    delayMinutes: 18,
    platform: 'P3',
    etd: '14:42',
    scheduledTime: '14:50',
    destination: 'Mumbai Central',
    speed: 115,
    priority: 'High',
    currentTrack: 'Track 2 Up Main',
    nextStation: 'Kota Jn'
  },
  {
    trainNo: '12884',
    name: 'Garib Rath',
    route: 'NDLS → PNBE',
    location: 'Jhansi Jn',
    status: 'APPROACHING',
    delay: '+6 min',
    delayMinutes: 6,
    platform: 'P5',
    etd: '15:10',
    scheduledTime: '15:25',
    destination: 'Patna Jn',
    speed: 98,
    priority: 'Express',
    currentTrack: 'Track 1 Down',
    nextStation: 'Kanpur Central'
  },
  {
    trainNo: '12425',
    name: 'Intercity Express',
    route: 'AGC → CNB',
    location: 'Panipat',
    status: 'ON TIME',
    delay: '—',
    delayMinutes: 0,
    platform: 'P2',
    etd: '13:55',
    scheduledTime: '15:40',
    destination: 'Kanpur Central',
    speed: 85,
    priority: 'Passenger',
    currentTrack: 'Track 3 Loop',
    nextStation: 'Aligarh Jn'
  },
  {
    trainNo: '12002',
    name: 'Shatabdi Express',
    route: 'NDLS → KKDE',
    location: 'Agra Cantt',
    status: 'ON TIME',
    delay: '—',
    delayMinutes: 0,
    platform: 'P1',
    etd: '14:00',
    scheduledTime: '15:00',
    destination: 'Kalka',
    speed: 130,
    priority: 'High',
    currentTrack: 'Track 1 Up Main',
    nextStation: 'Mathura Jn'
  },
  {
    trainNo: '12627',
    name: 'Karnataka Express',
    route: 'NDLS → SBC',
    location: 'Ghaziabad',
    status: 'DELAYED',
    delay: '+31 min',
    delayMinutes: 31,
    platform: 'P7',
    etd: '16:30',
    scheduledTime: '16:00',
    destination: 'KSR Bengaluru',
    speed: 72,
    priority: 'Express',
    currentTrack: 'Track 4 Slow',
    nextStation: 'Tundla Jn'
  },
  {
    trainNo: '12001',
    name: 'Bhopal Shatabdi',
    route: 'NDLS → BPL',
    location: 'Agra Fort',
    status: 'ON TIME',
    delay: '—',
    delayMinutes: 0,
    platform: 'P4',
    etd: '14:20',
    scheduledTime: '14:20',
    destination: 'Bhopal Jn',
    speed: 120,
    priority: 'High',
    currentTrack: 'Track 2 Main',
    nextStation: 'Gwalior Jn'
  },
  {
    trainNo: '12311',
    name: 'Kalka Mail',
    route: 'HWH → KLK',
    location: 'Ambala',
    status: 'APPROACHING',
    delay: '+3 min',
    delayMinutes: 3,
    platform: 'P6',
    etd: '17:15',
    scheduledTime: '17:10',
    destination: 'Kalka',
    speed: 90,
    priority: 'Express',
    currentTrack: 'Track 1 Loop',
    nextStation: 'Chandigarh'
  }
];

export const CORRIDORS: Corridor[] = [
  {
    id: 'corridor-1',
    name: 'Northern Corridor',
    load: 82,
    status: 'HIGH',
    activeTrains: 46,
    tracks: 8
  },
  {
    id: 'corridor-2',
    name: 'Western Corridor',
    load: 64,
    status: 'NORMAL',
    activeTrains: 38,
    tracks: 6
  },
  {
    id: 'corridor-3',
    name: 'Eastern Corridor',
    load: 47,
    status: 'NORMAL',
    activeTrains: 24,
    tracks: 4
  },
  {
    id: 'corridor-4',
    name: 'Central Freight',
    load: 91,
    status: 'CRITICAL',
    activeTrains: 20,
    tracks: 2
  }
];

export const AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-1',
    type: 'CONGESTION',
    badge: 'AI',
    title: 'Kanpur Junction at 94% capacity',
    description: 'Immediate reroute recommended',
    location: 'Kanpur Junction'
  },
  {
    id: 'rec-2',
    type: 'PREDICTION',
    badge: 'AI',
    title: 'Train 12967 — 18–25 min delay',
    description: '87% confidence · Near Jhansi',
    confidence: '87%',
    location: 'Near Jhansi'
  },
  {
    id: 'rec-3',
    type: 'REROUTE',
    badge: 'AI',
    title: 'Train 12884 via Route B',
    description: 'Saves 12 min · AI Verified',
    savings: '12 min'
  }
];

export const INITIAL_SIMULATION: SimulationState = {
  scenarioName: 'Peak Hour Traffic Optimization',
  subTitle: 'Scenario running — AI evaluating decision tree',
  simTime: '14:37:22',
  simulatedTrains: 128,
  aiDecisionsEvaluated: 342,
  efficiencyGain: '+18.6%',
  conflictsResolved: 14,
  progressPercent: 72,
  eta: '4 min 12 sec',
  isRunning: true,
  logs: [
    {
      id: 'log-1',
      time: '14:37:10',
      message: 'AI resolved conflict at Kanpur Jn — rerouted Train 12967 via Track B',
      color: '#1E7F4F'
    },
    {
      id: 'log-2',
      time: '14:36:55',
      message: 'Congestion detected at Mughal Sarai — initiating cascade hold protocol',
      color: '#B9790A'
    },
    {
      id: 'log-3',
      time: '14:35:40',
      message: 'Train 12002 cleared Agra Cantt — slot reallocated for freight convoy',
      color: '#2F5FD1'
    },
    {
      id: 'log-4',
      time: '14:34:12',
      message: 'Northern corridor load peaked at 88% — capacity throttle applied',
      color: '#C23636'
    },
    {
      id: 'log-5',
      time: '14:32:00',
      message: 'Simulation scenario loaded — 128 trains, 342 decision nodes',
      color: '#5B6478'
    }
  ]
};

export const WEEKLY_PERFORMANCE: WeeklyData[] = [
  { day: 'Mon', percentage: 78 },
  { day: 'Tue', percentage: 83 },
  { day: 'Wed', percentage: 81 },
  { day: 'Thu', percentage: 84 },
  { day: 'Fri', percentage: 84 },
  { day: 'Sat', percentage: 79 },
  { day: 'Sun', percentage: 84, highlight: true }
];

export const SYSTEM_DIAGNOSTICS: SystemDiagnostic[] = [
  { name: 'AI Engine', percentage: 98 },
  { name: 'Database', percentage: 100 },
  { name: 'Network Gateway', percentage: 96 },
  { name: 'Signal Interface', percentage: 99 }
];

export const SYSTEM_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    severity: 'critical',
    message: 'Central Freight Corridor section at 91% capacity threshold',
    timestamp: '17:33:10',
    location: 'Central Freight Corridor'
  },
  {
    id: 'alt-2',
    severity: 'warning',
    message: 'Train 12627 Karnataka Express delay increased by +12 min',
    timestamp: '17:30:45',
    location: 'Ghaziabad',
    trainNo: '12627'
  },
  {
    id: 'alt-3',
    severity: 'warning',
    message: 'Platform 3 Mathura Jn slot conflict detected with freight rake',
    timestamp: '17:28:12',
    location: 'Mathura Jn'
  },
  {
    id: 'alt-4',
    severity: 'info',
    message: 'AI re-scheduled Train 12884 via chord line to recover 12 mins',
    timestamp: '17:25:00',
    location: 'Jhansi Sector',
    trainNo: '12884'
  },
  {
    id: 'alt-5',
    severity: 'resolved',
    message: 'Agra Cantt P1 track signal interlock restored to clear state',
    timestamp: '17:18:22',
    location: 'Agra Cantt'
  },
  {
    id: 'alt-6',
    severity: 'info',
    message: 'Northern zone morning shift controller handover verified',
    timestamp: '17:00:00',
    location: 'Control HQ'
  },
  {
    id: 'alt-7',
    severity: 'resolved',
    message: 'Panipat interlocking track circuit reset verified by loco pilot',
    timestamp: '16:45:10',
    location: 'Panipat'
  }
];
