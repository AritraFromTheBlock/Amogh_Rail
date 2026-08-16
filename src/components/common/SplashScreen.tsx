import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Fast 1 second total duration
    const duration = 1000;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setIsFading(true);
        setTimeout(() => onComplete(), 300); // Fast fade out
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#0F2C5C] flex flex-col items-center justify-center select-none transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Centered Content */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <img src="/logo.png" alt="Amogh Rail Logo" className="h-24 md:h-28 w-auto object-contain drop-shadow-2xl" />
        <div className="flex flex-col items-center text-center">
          <h1 className="font-bold text-xl md:text-2xl tracking-[0.2em] text-white uppercase drop-shadow-md">
            AMOGH RAIL
          </h1>
          <p className="text-blue-300/80 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase mt-1">
            SECURE TERMINAL GATEWAY
          </p>
        </div>
      </div>

      {/* Sleek Loading Bar */}
      <div className="w-64 md:w-80 absolute bottom-20">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase">
            Establishing Connection...
          </span>
          <span className="text-[10px] font-mono text-white/80 font-bold">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)] transition-all duration-[20ms] ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
    </div>
  );
};
