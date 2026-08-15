import type { Train, Corridor, AIRecommendation, SimulationState, WeeklyData, SystemDiagnostic, AlertItem } from '../types';
import { TRAIN_DATA } from './trainsData';

export const INITIAL_TRAINS: Train[] = TRAIN_DATA as Train[];

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
