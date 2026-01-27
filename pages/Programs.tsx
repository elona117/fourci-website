
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Shield, Users, FileText, ArrowRight, Hash } from 'lucide-react';
import { PROGRAMS } from '../constants';

const Programs: React.FC = () => {
  const jumpTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-green-900 pt-16 pb-20 md:pt-24 md:pb-32 text-center text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Our Programs</h1>
          <p className="text-base md:text-xl text-green-100 max-w-3xl mx-auto font-light px-4">
            Strategic initiatives designed to create lasting environmental change and community stability.
          </p>
        </div>

        {/* Quick Jump Sidebar-like Bar */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 hidden lg:block">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex items-center justify-between">
            <span className="px-6 text-[10px] font-black uppercase text-gray-300 tracking-widest border-r border-gray-100">Quick Jump</span>
            {PROGRAMS.map((program) => (
              <button 
                key={program.id}
                onClick={() => jumpTo(program.id)} 
                className="flex-1 py-3 px-4 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 font-bold transition-all text-[11px] uppercase tracking-wider flex items-center justify-center space-x-2"
              >
                <span>{program.title.split(' ').slice(-1)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Spacer */}
      <div className="h-10 lg:hidden"></div>

      <section className="py-16 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-40">
          {PROGRAMS.map((program, idx) => (
            <div 
              key={program.id} 
              id={program.id} 
              className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center scroll-mt-32 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  <img src={program.image} alt={program.title} loading="lazy" decoding="async" className="rounded-2xl md:rounded-[3rem] shadow-2xl w-full aspect-[4/3] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
                  <div className={`absolute -bottom-4 md:-bottom-8 ${idx % 2 === 0 ? '-right-4 md:-right-8' : '-left-4 md:-left-8'} bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl hidden sm:block`}>
                    <div className="bg-green-100 p-3 md:p-4 rounded-xl md:rounded-2xl text-green-600">
                      {program.icon === 'Megaphone' && <Megaphone size={32} />}
                      {program.icon === 'Shield' && <Shield size={32} />}
                      {program.icon === 'Users' && <Users size={32} />}
                      {program.icon === 'FileText' && <FileText size={32} />}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                <div className="inline-flex items-center space-x-2 text-green-600 mb-2">
                  <Hash size={16} />
                  <span className="font-black uppercase tracking-[0.2em] text-[10px]">Strategic Focus {idx + 1}</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{program.title}</h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {program.description}
                  {" "}Sustainable action requires more than just trees; it requires a mindset shift. Our {program.title.toLowerCase()} program is designed to bridge the gap between scientific climate understanding and local action.
                </p>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 uppercase tracking-widest text-[10px] md:text-xs">Program Goals</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {["Targeted Impact", "Community-Led", "Measurable Results", "Scalable Models"].map((goal, i) => (
                      <li key={i} className="flex items-center space-x-2 text-gray-600 text-sm md:text-base">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></div>
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/get-involved" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 md:py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg flex items-center justify-center group">
                  Get Involved
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Programs;
