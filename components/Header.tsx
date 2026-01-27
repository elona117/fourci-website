
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* Visual Reading Progress Bar - Hidden from SR */}
      <div 
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[3px] bg-green-500 transition-all duration-150 ease-out z-[60] shadow-[0_0_8px_rgba(34,197,94,0.4)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link 
            to="/" 
            className="flex items-center space-x-3 group active:scale-95 transition-transform outline-none"
            aria-label="FOURCi Home"
          >
            <img 
              src="https://i.postimg.cc/tTmGZ5Qf/FOURCi-Watermark-colored.png" 
              alt="" 
              loading="lazy"
              decoding="async"
              className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col border-l border-gray-100 pl-3">
              <span className="text-lg md:text-xl font-bold text-gray-900 tracking-tight leading-none group-hover:text-green-600 transition-colors">FOURCi</span>
              <span className="text-[8px] md:text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5 hidden xs:block">Initiative for Community</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8" aria-label="Primary Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative text-sm font-medium transition-colors py-1 group active:scale-95 outline-none focus-visible:text-green-600 ${
                    isActive ? 'text-green-600 font-semibold' : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  {item.label}
                  <span 
                    className={`absolute bottom-0 left-0 h-[2px] bg-green-600 transition-transform duration-300 origin-left ease-out ${
                      isActive ? 'w-full scale-x-100' : 'w-full scale-x-0 group-hover:scale-x-100'
                    }`} 
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
            <Link
              to="/get-involved"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg transform focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Donate Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-600 hover:text-green-600 active:scale-90 transition-all p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-green-500"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <nav
        id="mobile-navigation"
        className={`lg:hidden fixed inset-x-0 bg-white border-b border-gray-100 transition-all duration-500 ease-in-out z-40 ${
          isOpen ? 'top-16 opacity-100 visible h-screen overflow-y-auto' : 'top-[-100%] opacity-0 invisible h-0'
        }`}
        aria-label="Mobile Navigation"
      >
        <div className="px-4 pt-4 pb-24 space-y-1">
          {NAV_ITEMS.map((item, idx) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-4 text-lg font-medium rounded-xl transition-all active:scale-[0.98] outline-none ${
                location.pathname === item.path ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
              }`}
              style={{ transitionDelay: `${idx * 0.05}s` }}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-6 px-4">
            <Link
              to="/get-involved"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-blue-600 text-white px-5 py-4 rounded-xl text-lg font-bold hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
