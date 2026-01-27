
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { useState, useEffect } from 'react';
import { WifiOff, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

const ConnectivityStatus: React.FC = () => {
  const [status, setStatus] = useState<'online' | 'offline' | 'restoring'>(
    navigator.onLine ? 'online' : 'offline'
  );
  const [isVisible, setIsVisible] = useState(false);

  // When connection is restored, we show a brief "restoring" state then reload the page
  const handleOnline = () => {
    // If we were already online, don't trigger unnecessary reloads
    if (status === 'online' && navigator.onLine) return;
    
    setStatus('restoring');
    // Small delay to allow the user to see the "re-establishing" status before the hard refresh
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleOffline = () => {
    setStatus('offline');
    setIsVisible(true);
  };

  useEffect(() => {
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial check for immediate offline state
    if (!navigator.onLine) {
      setIsVisible(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [status]); // Added status to dependencies to ensure we have the current state context

  const handleRetry = () => {
    if (navigator.onLine) {
      handleOnline();
    } else {
      // Shake effect or feedback
      const el = document.getElementById('offline-card');
      el?.classList.add('animate-shake');
      setTimeout(() => el?.classList.remove('animate-shake'), 500);
    }
  };

  if (!isVisible && status === 'online') return null;

  return (
    <>
      {/* Top Status Bar */}
      <div className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-700 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className={`px-4 py-2 flex items-center justify-center space-x-3 shadow-2xl backdrop-blur-md border-b ${
          status === 'offline' ? 'bg-red-600/90 border-red-500' : 
          status === 'restoring' ? 'bg-amber-500/90 border-amber-400' : 
          'bg-green-600/90 border-green-500'
        } text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]`}>
          {status === 'offline' && (
            <>
              <WifiOff size={14} className="animate-pulse" />
              <span>Connectivity Lost • Viewing Offline Cache</span>
            </>
          )}
          {status === 'restoring' && (
            <>
              <RefreshCw size={14} className="animate-spin" />
              <span>Connection Found • Refreshing Platform...</span>
            </>
          )}
          {status === 'online' && (
            <>
              <CheckCircle2 size={14} />
              <span>Connection Restored • Sync Complete</span>
            </>
          )}
        </div>
      </div>

      {/* Immersive Offline Overlay */}
      {status === 'offline' && (
        <div className="fixed inset-0 z-[190] bg-gray-950/40 backdrop-blur-[2px] flex items-center justify-center p-6 animate-fadeIn">
          <div 
            id="offline-card"
            className="bg-white rounded-[2.5rem] p-10 md:p-16 max-w-md w-full shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-gray-100 text-center space-y-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20 scale-150" />
              <div className="relative bg-red-50 w-24 h-24 rounded-full flex items-center justify-center text-red-600 mx-auto">
                <WifiOff size={40} />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Offline Mode</h2>
              <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                Your connection to the FOURCi network was interrupted. You can still browse previously loaded pages, but real-time tools are currently unavailable.
              </p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleRetry}
                className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl hover:bg-black transition-all active:scale-95 flex items-center justify-center space-x-3 group"
              >
                <RefreshCw size={18} className="group-active:rotate-180 transition-transform duration-500" />
                <span>Verify Connection</span>
              </button>
              
              <div className="flex items-center justify-center space-x-2 text-amber-600 bg-amber-50 py-2 px-4 rounded-full inline-flex mx-auto">
                <AlertTriangle size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Dynamic features disabled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        .animate-shake { animation: shake 0.2s ease-in-out infinite; }
      `}</style>
    </>
  );
};

export default ConnectivityStatus;
