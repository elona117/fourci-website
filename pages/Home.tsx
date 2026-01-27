
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Users, Megaphone, FileText, CheckCircle2, Leaf } from 'lucide-react';
import { PROGRAMS, IMPACT_STATS } from '../constants';

const HERO_IMAGES = [
  "https://i.postimg.cc/yWqGDZ1t/Whats-App-Image-2026-01-09-at-10-09-09.jpg",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2000"
];

const Home: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:h-[90vh] flex items-center overflow-hidden" aria-label="Hero">
        {/* Slideshow Background */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
                activeSlide === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img
                src={img}
                alt=""
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
                  activeSlide === idx ? 'scale-110' : 'scale-100'
                }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
          <div className="shimmer-overlay opacity-20 z-20"></div>
        </div>
        
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
          <div className="max-w-3xl space-y-6 md:space-y-8 animate-reveal">
            <div className="inline-flex items-center space-x-2 bg-green-600/30 backdrop-blur-md border border-green-500/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></span>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-green-300">Resilience In Action</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Concern on <span className="text-green-500">Climate Change</span> for the Community.
            </h1>
            
            <p className="text-base md:text-xl text-gray-100 leading-relaxed max-w-2xl font-medium drop-shadow-md">
              Leading the charge for a greener Sahel. We empower communities to adapt, innovate, and protect the environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/get-involved"
                className="bg-green-600 hover:bg-green-700 active:scale-95 text-white px-8 py-3.5 md:py-4 rounded-xl font-bold text-center transition-all transform shadow-xl hover:shadow-green-500/20 flex items-center justify-center space-x-2 group"
              >
                <span>Take Action Today</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                to="/about"
                className="bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 md:py-4 rounded-xl font-bold text-center transition-all"
              >
                Learn Our Mission
              </Link>
            </div>
          </div>
        </div>

        {/* Slideshow Pagination Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex space-x-3">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeSlide === idx ? 'w-8 bg-green-500' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 md:py-24 bg-pattern relative overflow-hidden" aria-labelledby="intro-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1 animate-reveal">
              <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="shimmer-overlay opacity-20"></div>
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"
                  alt="A close-up of hands planting a small sapling in dark soil"
                  loading="lazy"
                  decoding="async"
                  className="w-full hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 bg-blue-600 text-white p-6 md:p-8 rounded-2xl md:rounded-3xl hidden sm:block z-20 shadow-xl max-w-[280px] md:max-w-xs overflow-hidden">
                <div className="shimmer-overlay opacity-10"></div>
                <p className="text-xl md:text-2xl font-bold italic leading-tight">"Fostering sustainable life in local communities."</p>
                <p className="mt-2 md:mt-4 font-semibold opacity-80 text-sm md:text-base">— FOURCi Initiative</p>
              </div>
            </div>
            
            <div className="space-y-6 md:space-y-8 order-1 lg:order-2 animate-reveal" style={{ animationDelay: '0.2s' }}>
              <div>
                <p id="intro-heading" className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-2">Who We Are</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">Empowering Communities Through Sustainable Action</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                FOURCi is a non-governmental organization dedicated to addressing the critical challenges posed by climate change. We focus on community-level awareness, environmental restoration, and building long-term resilience across the Sahel.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Grassroots Engagement",
                  "Climate Advocacy",
                  "Environmental Conservation",
                  "Youth Empowerment"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition-all hover:border-green-100 hover:shadow-md active:scale-95 cursor-default relative overflow-hidden group">
                    <div className="shimmer-overlay opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    <CheckCircle2 className="text-green-500 h-5 w-5 md:h-6 md:w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="font-semibold text-gray-700 text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 md:py-24 bg-gray-50" aria-labelledby="focus-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 animate-reveal">
            <p id="focus-heading" className="text-green-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-3">Our Focus Areas</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How We Make a Difference</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PROGRAMS.map((program, idx) => (
              <article key={program.id} className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform lg:hover:-translate-y-2 flex flex-col animate-reveal`} style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="h-48 md:h-56 overflow-hidden relative">
                  <div className="shimmer-overlay opacity-30"></div>
                  <img src={program.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-grow relative overflow-hidden">
                   <div className="shimmer-overlay opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">{program.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                    {program.description}
                  </p>
                  <Link to="/programs" className="text-green-600 font-bold text-sm flex items-center hover:translate-x-1 transition-transform mt-auto group-hover:underline">
                    Learn More <ArrowRight size={16} className="ml-2" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-20 bg-blue-900 text-white relative overflow-hidden" aria-label="Our Impact in Numbers">
        <div className="shimmer-overlay opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {IMPACT_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-2 md:space-y-4 animate-reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-400 drop-shadow-lg">
                  <span className="sr-only">{stat.label}: </span>
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-blue-200 opacity-80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24" aria-labelledby="cta-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-600 rounded-2xl md:rounded-[3rem] p-8 md:p-16 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl animate-reveal">
            <div className="shimmer-overlay opacity-10"></div>
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 relative z-10">
              <h2 id="cta-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Join Our Movement for a Sustainable Planet</h2>
              <p className="text-lg md:text-xl text-green-100 font-medium opacity-90">Small actions lead to massive impact. Together, we can restore the Sahel.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/get-involved" className="bg-white text-green-700 px-8 py-3.5 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-gray-100 active:scale-95 transition-all shadow-lg text-center">
                  Get Involved
                </Link>
                <Link to="/contact" className="bg-transparent border-2 border-white/50 text-white px-8 py-3.5 md:px-10 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-white/10 active:scale-95 transition-all text-center">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
