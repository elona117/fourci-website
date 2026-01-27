
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { useEffect, useState } from 'react';

const LoadingScreen: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Initial reveal sequence
    const startTimer = setTimeout(() => setHasStarted(true), 150);
    
    // Smooth exit duration
    const loadTimer = setTimeout(() => setIsExiting(true), 3800);
    const hideTimer = setTimeout(() => setIsVisible(false), 5000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(loadTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[1000] flex flex-col items-center justify-center mesh-bg overflow-hidden ${isExiting ? 'exit-aperture pointer-events-none' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="FOURCi Initializing"
    >
      {/* Background Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full transition-all duration-[3000ms] ${hasStarted ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
          <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-green-400/5 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-blue-400/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>
      </div>

      <div className="relative flex flex-col items-center">
        {/* The Core Aperture */}
        <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center mb-12">
          
          {/* Technical Outer Ring */}
          <svg className="absolute w-full h-full -rotate-90 transform opacity-20" viewBox="0 0 120 120">
            <circle 
              cx="60" cy="60" r="58" 
              stroke="#16a34a" strokeWidth="0.5" 
              fill="none" 
              strokeDasharray="1 8"
            />
            <circle 
              cx="60" cy="60" r="58" 
              stroke="#16a34a" strokeWidth="1.5" 
              fill="none" 
              strokeDasharray="60 120" 
              strokeLinecap="round" 
              className="animate-technical-dash"
            />
          </svg>

          {/* Magnetic Orbit Dots */}
          <div className="absolute inset-8 animate-[spin_8s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" />
          </div>
          <div className="absolute inset-8 animate-[spin_12s_linear_infinite_reverse]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] opacity-40" />
          </div>

          {/* Glass Core */}
          <div className={`relative w-44 h-44 md:w-52 md:h-52 rounded-full transition-all duration-[1500ms] cubic-bezier(0.2, 0.8, 0.2, 1) transform ${hasStarted ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}`}>
            <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-full border border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.06)] overflow-hidden">
               <div className="shimmer-overlay opacity-20"></div>
            </div>
            
            {/* Logo Image */}
            <div className="absolute inset-0 flex items-center justify-center animate-logo-float">
              <img 
                src="https://i.postimg.cc/tTmGZ5Qf/FOURCi-Watermark-colored.png" 
                alt="FOURCi" 
                className="w-28 md:w-32 h-auto drop-shadow-[0_15px_15px_rgba(0,0,0,0.08)]"
              />
            </div>
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="relative overflow-hidden pt-2">
           <h1 
            className={`text-4xl md:text-5xl font-black text-gray-900 tracking-[0.3em] uppercase transition-all duration-[2000ms] ${hasStarted ? 'animate-tracking-reveal' : 'opacity-0'}`}
          >
            FOURCi
          </h1>
        </div>

        {/* Sub-brand Minimal line */}
        <div className="mt-8 relative w-48 h-[1px]">
          <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-green-500/30 to-transparent transition-all duration-[2500ms] ${hasStarted ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
          <div className={`absolute top-0 left-0 h-full bg-green-600 transition-all duration-[4000ms] ease-out ${hasStarted ? 'w-full opacity-0' : 'w-0 opacity-100'}`} />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
