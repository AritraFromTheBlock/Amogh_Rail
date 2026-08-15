import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { StatCard } from '../components/common/StatCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { Play, Pause, RotateCcw, Eye, CheckCircle2 } from 'lucide-react';

export const Simulation: React.FC = () => {
  const { simulation, toggleSimulation, restartSimulation } = useSystem();
  const [showVisualizer, setShowVisualizer] = useState(false);

  return (
    <div className="space-y-8 max-w-7xl">
      
      {/* Title Header */}
      <div className="flex items-baseline gap-3">
        <h1 className="text-xl font-semibold text-[#0F2C5C] tracking-tight">
          Simulation
        </h1>
        <span className="font-mono text-[11px] text-[#5B6478] uppercase tracking-wider">
          Northern Zone Control Room
        </span>
      </div>

      {/* Main Simulation Container */}
      <div className="space-y-6">
        
        {/* Scenario Header & Digital Clock */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
              TRAFFIC SCENARIO SIMULATOR
            </div>
            <h2 className="text-lg font-semibold text-[#0F2C5C]">
              {simulation.scenarioName}
            </h2>
            <p className="text-xs text-[#5B6478]">
              {simulation.isRunning 
                ? 'Scenario running — AI evaluating decision tree' 
                : 'Scenario paused — state checkpoint saved'}
            </p>
          </div>

          {/* Large Digital Simulation Clock */}
          <div className="font-mono text-3xl md:text-4xl font-semibold text-[#0F2C5C] tracking-tight">
            {simulation.simTime}
          </div>
        </div>

        {/* 4 Stats Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-2 pb-6 border-b border-[rgba(15,44,92,0.10)]">
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
            <span className="text-[#5B6478]">
              Simulation progress <span className="font-semibold text-[#0F2C5C] ml-2">{simulation.progressPercent}% complete</span>
            </span>
            <span className="text-[#5B6478]">
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
            onClick={toggleSimulation}
            className="px-4 py-2 border border-[rgba(15,44,92,0.15)] bg-white hover:bg-[#F8F9FB] text-xs font-medium text-[#0F2C5C] transition-colors rounded-none flex items-center gap-2"
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
            onClick={restartSimulation}
            className="px-4 py-2 border border-[rgba(15,44,92,0.15)] bg-white hover:bg-[#F8F9FB] text-xs font-medium text-[#0F2C5C] transition-colors rounded-none flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>

          <button
            onClick={() => setShowVisualizer(!showVisualizer)}
            className="px-5 py-2 bg-[#0F2C5C] hover:bg-[#1a3d7c] text-xs font-medium text-white transition-colors rounded-none flex items-center gap-2 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{showVisualizer ? 'Hide Visual Sandbox' : 'View Simulation'}</span>
          </button>
        </div>

        {/* Visual Sandbox Drawer / Container */}
        {showVisualizer && (
          <div className="p-6 border border-[rgba(15,44,92,0.15)] bg-[#F8F9FB] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono font-semibold uppercase text-[#0F2C5C]">
                OR-Tools CP-SAT Corridor Flow Sandbox
              </span>
              <span className="font-mono text-[11px] text-[#1E7F4F] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Realtime Optimization Active
              </span>
            </div>

            {/* Schematic Node Visualizer */}
            <div className="h-44 bg-white border border-[rgba(15,44,92,0.10)] p-4 flex flex-col justify-between relative overflow-hidden">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-60"></div>
              
              {/* Corridor Node Points */}
              <div className="relative z-10 flex justify-between items-center px-4 my-auto">
                <div className="text-center">
                  <div className="w-4 h-4 bg-[#0F2C5C] text-white rounded-none flex items-center justify-center font-mono text-[9px] mx-auto">N</div>
                  <span className="font-mono text-[11px] font-semibold text-[#0F2C5C] block mt-1">NDLS</span>
                  <span className="text-[10px] text-[#5B6478]">Platform 1-16</span>
                </div>

                <div className="flex-1 h-[2px] bg-[#0F2C5C]/20 mx-4 relative">
                  <div className="absolute top-[-6px] left-[35%] w-3.5 h-3.5 bg-[#F5821F] rounded-none animate-pulse flex items-center justify-center text-[8px] text-white font-mono">12</div>
                </div>

                <div className="text-center">
                  <div className="w-4 h-4 bg-[#0F2C5C] text-white rounded-none flex items-center justify-center font-mono text-[9px] mx-auto">M</div>
                  <span className="font-mono text-[11px] font-semibold text-[#0F2C5C] block mt-1">MTJ</span>
                  <span className="text-[10px] text-[#5B6478]">Speed 115 km/h</span>
                </div>

                <div className="flex-1 h-[2px] bg-[#0F2C5C]/20 mx-4 relative">
                  <div className="absolute top-[-6px] left-[60%] w-3.5 h-3.5 bg-[#1E7F4F] rounded-none flex items-center justify-center text-[8px] text-white font-mono">120</div>
                </div>

                <div className="text-center">
                  <div className="w-4 h-4 bg-[#0F2C5C] text-white rounded-none flex items-center justify-center font-mono text-[9px] mx-auto">A</div>
                  <span className="font-mono text-[11px] font-semibold text-[#0F2C5C] block mt-1">AGC</span>
                  <span className="text-[10px] text-[#5B6478]">Clear Track</span>
                </div>

                <div className="flex-1 h-[2px] bg-[#0F2C5C]/20 mx-4 relative">
                  <div className="absolute top-[-6px] left-[20%] w-3.5 h-3.5 bg-[#C23636] rounded-none flex items-center justify-center text-[8px] text-white font-mono">FR</div>
                </div>

                <div className="text-center">
                  <div className="w-4 h-4 bg-[#0F2C5C] text-white rounded-none flex items-center justify-center font-mono text-[9px] mx-auto">C</div>
                  <span className="font-mono text-[11px] font-semibold text-[#0F2C5C] block mt-1">CNB</span>
                  <span className="text-[10px] text-[#5B6478]">94% Load</span>
                </div>
              </div>

              <div className="relative z-10 text-[10px] font-mono text-[#5B6478] flex justify-between border-t border-slate-100 pt-2">
                <span>SIMULATION SEED: #IR-CP-89240</span>
                <span>DISPATCH HEURISTIC: CONFLICT-FREE SLOTTING</span>
              </div>
            </div>
          </div>
        )}

        {/* Section: SIMULATION LOG matching Figma */}
        <div className="space-y-4 pt-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#5B6478]">
            SIMULATION LOG
          </div>

          <div className="space-y-3 font-mono text-xs">
            {simulation.logs.map((log) => (
              <div key={log.id} className="flex items-center gap-3 text-slate-700">
                <span className="text-[#5B6478] shrink-0 font-medium">
                  {log.time}
                </span>
                <span 
                  className="w-1.5 h-1.5 rounded-full shrink-0" 
                  style={{ backgroundColor: log.color || '#5B6478' }}
                />
                <span className="text-[#0F2C5C] leading-tight">
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
