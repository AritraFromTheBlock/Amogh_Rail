import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // 2.5 second total duration
    const duration = 2500;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setIsFading(true);
        setTimeout(() => onComplete(), 500); // Wait for fade out
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#0F2C5C] flex flex-col items-center justify-center select-none transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Logos and Title */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-6 mb-6">
          <img src="/logo.png" alt="Amogh Rail Logo" className="h-28 w-auto object-contain drop-shadow-2xl animate-pulse" />
          <div className="h-16 w-[1px] bg-white/20"></div>
          <img src="/team_logo.png" alt="Team Logo" className="h-24 w-auto object-contain drop-shadow-2xl" />
        </div>
        
        <h1 className="font-bold text-3xl tracking-[0.3em] text-white uppercase drop-shadow-lg mb-2">
          Amogh Rail
        </h1>
        <p className="text-white/60 font-mono text-[11px] tracking-widest uppercase">
          Intelligent Railway Traffic Control System
        </p>
      </div>

      {/* Loading Progress Bar */}
      <div className="absolute bottom-24 w-64">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
            Initializing Systems...
          </span>
          <span className="text-[10px] font-mono text-white/80 font-bold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 w-full bg-white/10 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-[50ms] ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
    </div>
  );
};
