
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  const handleAnimationEnd = () => {
    if (transitionStage === 'fadeOut') {
      setTransitionStage('fadeIn');
      setDisplayLocation(location);
      // Small artificial delay for "professional loading" feel
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Top Technical Progress Bar */}
      <div 
        className={`fixed top-0 left-0 right-0 h-[2px] bg-green-500 z-[100] transition-all duration-700 ease-in-out origin-left ${
          transitionStage === 'fadeOut' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
        }`} 
      />

      {/* Transition Overlay */}
      <div 
        className={`fixed inset-0 bg-white/40 backdrop-blur-sm z-[90] pointer-events-none transition-opacity duration-500 ease-in-out ${
          transitionStage === 'fadeOut' ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        onTransitionEnd={handleAnimationEnd}
        className={`transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          transitionStage === 'fadeOut' 
            ? 'opacity-0 translate-y-4 scale-[0.98] blur-sm' 
            : 'opacity-100 translate-y-0 scale-100 blur-0'
        }`}
      >
        {children}
      </div>

      <style>{`
        .transition-stage-in {
          animation: slideUpIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes slideUpIn {
          from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0px); }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
