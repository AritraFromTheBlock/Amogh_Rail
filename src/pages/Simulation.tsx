import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { useToast } from '../context/ToastContext';
import { StatCard } from '../components/common/StatCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { Play, Pause, RotateCcw, Eye, CheckCircle2 } from 'lucide-react';

export const Simulation: React.FC = () => {
  const { simulation, toggleSimulation, restartSimulation } = useSystem();
  const { addToast } = useToast();
  const [showVisualizer, setShowVisualizer] = useState(false);

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Title Header */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] dark:text-white tracking-tight transition-colors">
          Simulation
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] dark:text-gray-400 uppercase tracking-wider transition-colors">
          Northern Zone Control Room
        </span>
      </div>

      {/* Main Simulation Container */}
      <div className="space-y-6">
        
        {/* Scenario Header & Digital Clock */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
              TRAFFIC SCENARIO SIMULATOR
            </div>
            <h2 className="text-lg font-semibold text-[#0F2C5C] dark:text-white transition-colors">
              {simulation.scenarioName}
            </h2>
            <p className="text-xs text-[#5B6478] dark:text-gray-400 transition-colors">
              {simulation.isRunning 
                ? 'Scenario running — AI evaluating decision tree' 
                : 'Scenario paused — state checkpoint saved'}
            </p>
          </div>

          {/* Large Digital Simulation Clock */}
          <div className="font-mono text-3xl md:text-4xl font-semibold text-[#0F2C5C] dark:text-white tracking-tight transition-colors">
            {simulation.simTime}
          </div>
        </div>

        {/* 4 Stats Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 pb-6 border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 transition-colors">
          <StatCard
            label="Simulated Trains"
            value={simulation.simulatedTrains}
          />
          <StatCard
            label="AI Decisions Evaluated"
            value={simulation.aiDecisionsEvaluated}
          />
          <StatCard
            label="Efficiency Gain"
            value={simulation.efficiencyGain}
            deltaType="positive"
          />
          <StatCard
            label="Conflicts Resolved"
            value={simulation.conflictsResolved}
          />
        </div>

        {/* Simulation Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[#5B6478] dark:text-gray-400 transition-colors">
              Simulation progress <span className="font-semibold text-[#0F2C5C] dark:text-white ml-2 transition-colors">{simulation.progressPercent}% complete</span>
            </span>
            <span className="text-[#5B6478] dark:text-gray-400 transition-colors">
              ETA {simulation.eta}
            </span>
          </div>
          <ProgressBar
            value={simulation.progressPercent}
            color="#2F5FD1"
            height="h-[3px]"
          />
        </div>

        {/* Control Action Buttons matching Figma */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => {
              toggleSimulation();
              addToast(simulation.isRunning ? 'Simulation paused' : 'Simulation resumed', 'info');
            }}
            className="px-4 py-2 border border-[rgba(15,44,92,0.15)] dark:border-white/10 bg-white dark:bg-[#111827] hover:bg-[#F8F9FB] dark:hover:bg-[#1f2937] text-xs font-medium text-[#0F2C5C] dark:text-white transition-colors rounded-none flex items-center gap-2"
          >
            {simulation.isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause Simulation</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Resume Simulation</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              restartSimulation();
              addToast('Simulation restarted and reset to genesis block', 'success');
            }}
            className="px-4 py-2 border border-[rgba(15,44,92,0.15)] dark:border-white/10 bg-white dark:bg-[#111827] hover:bg-[#F8F9FB] dark:hover:bg-[#1f2937] text-xs font-medium text-[#0F2C5C] dark:text-white transition-colors rounded-none flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>

          <button
            onClick={() => {
              setShowVisualizer(!showVisualizer);
              addToast(showVisualizer ? 'Visualizer collapsed' : 'Opening sandbox visualizer', 'info');
            }}
            className="px-5 py-2 bg-[#0F2C5C] dark:bg-[#1E293B] hover:bg-[#1a3d7c] dark:hover:bg-slate-700 text-xs font-medium text-white transition-colors rounded-none flex items-center gap-2 shadow-sm border border-white/10"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showVisualizer ? 'Hide Visual Sandbox' : 'View Simulation'}</span>
          </button>
        </div>

        {/* Visual Sandbox Drawer / Container */}
        {showVisualizer && (
          <div className="p-6 border border-[rgba(15,44,92,0.15)] dark:border-white/10 bg-[#F8F9FB] dark:bg-[#111827] space-y-4 transition-colors">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-semibold uppercase text-[#0F2C5C] dark:text-white">
                OR-Tools CP-SAT Corridor Flow Sandbox
              </span>
              <span className="font-mono text-[11px] text-[#1E7F4F] dark:text-[#4ade80] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Realtime Optimization Active
              </span>
            </div>

            {/* Schematic Node Visualizer */}
            <div className="h-44 bg-white dark:bg-[#1E293B] border border-[rgba(15,44,92,0.10)] dark:border-white/10 p-4 flex flex-col justify-between relative overflow-hidden transition-colors">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] text-slate-100 dark:text-slate-800 bg-[size:2rem_2rem] opacity-60"></div>
              
              {/* Corridor Node Points */}
              <div className="relative z-10 flex justify-between items-center px-4 my-auto">
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#0F2C5C] dark:bg-slate-300 text-white dark:text-black rounded-none flex items-center justify-center font-mono text-[9px] mx-auto">N</div>
                  <span className="font-mono text-[11px] font-semibold text-[#0F2C5C] dark:text-white block mt-1">NDLS</span>
                  <span className="text-[10px] text-[#5B6478] dark:text-gray-400">Platform 1-16</span>
                </div>

                <div className="flex-1 h-[2px] bg-[#0F2C5C]/20 dark:bg-white/20 mx-4 relative">
                  <div className="absolute top-[-6px] left-[35%] w-3.5 h-3.5 bg-[#F5821F] rounded-none animate-pulse flex items-center justify-center text-[8px] text-white font-mono">12</div>
                </div>

                <div className="text-center">
                  <div className="w-4 h-4 bg-[#0F2C5C] dark:bg-slate-300 text-white dark:text-black rounded-none flex items-center justify-center font-mono text-[9px] mx-auto">M</div>
                  <span className="font-mono text-[11px] font-semibold text-[#0F2C5C] dark:text-white block mt-1">MTJ</span>
                  <span className="text-[10px] text-[#5B6478] dark:text-gray-400">Speed 115 km/h</span>
                </div>

                <div className="flex-1 h-[2px] bg-[#0F2C5C]/20 dark:bg-white/20 mx-4 relative">
                  <div className="absolute top-[-6px] left-[60%] w-3.5 h-3.5 bg-[#1E7F4F] rounded-none flex items-center justify-center text-[8px] text-white font-mono">120</div>
                </div>

                <div className="text-center">
                  <div className="w-4 h-4 bg-[#0F2C5C] dark:bg-slate-300 text-white dark:text-black rounded-none flex items-center justify-center font-mono text-[9px] mx-auto">A</div>
                  <span className="font-mono text-[11px] font-semibold text-[#0F2C5C] dark:text-white block mt-1">AGC</span>
                  <span className="text-[10px] text-[#5B6478] dark:text-gray-400">Clear Track</span>
                </div>

                <div className="flex-1 h-[2px] bg-[#0F2C5C]/20 dark:bg-white/20 mx-4 relative">
                  <div className="absolute top-[-6px] left-[20%] w-3.5 h-3.5 bg-[#C23636] rounded-none flex items-center justify-center text-[8px] text-white font-mono">FR</div>
                </div>

                <div className="text-center">
                  <div className="w-4 h-4 bg-[#0F2C5C] dark:bg-slate-300 text-white dark:text-black rounded-none flex items-center justify-center font-mono text-[9px] mx-auto">C</div>
                  <span className="font-mono text-[11px] font-semibold text-[#0F2C5C] dark:text-white block mt-1">CNB</span>
                  <span className="text-[10px] text-[#5B6478] dark:text-gray-400">94% Load</span>
                </div>
              </div>

              <div className="relative z-10 text-[10px] font-mono text-[#5B6478] dark:text-gray-500 flex justify-between border-t border-slate-100 dark:border-slate-700/50 pt-2 transition-colors">
                <span>SIMULATION SEED: #IR-CP-89240</span>
                <span>DISPATCH HEURISTIC: CONFLICT-FREE SLOTTING</span>
              </div>
            </div>
          </div>
        )}

        {/* Section: SIMULATION LOG matching Figma */}
        <div className="space-y-4 pt-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478] dark:text-gray-400 transition-colors">
            SIMULATION LOG
          </div>

          <div className="space-y-3 font-mono text-xs">
            {simulation.logs.map((log) => (
              <div key={log.id} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 transition-colors">
                <span className="text-[#5B6478] dark:text-gray-500 shrink-0 font-medium">
                  {log.time}
                </span>
                <span 
                  className="w-1.5 h-1.5 rounded-full shrink-0" 
                  style={{ backgroundColor: log.color || '#5B6478' }}
                />
                <span className="text-[#0F2C5C] dark:text-gray-200 leading-tight">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
