
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { Target, Eye, Heart, History, Users, ArrowDown } from 'lucide-react';

const About: React.FC = () => {
  const jumpTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-blue-900 pt-16 pb-20 md:pt-24 md:pb-32 text-center text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">Our Mission for the Earth</h1>
          <p className="text-base md:text-xl text-blue-100 max-w-3xl mx-auto font-light px-4">
            Empowering communities to lead climate action and environmental preservation through advocacy, education, and resilience building.
          </p>
        </div>
        
        {/* Internal Jump Nav */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-4xl px-4 hidden md:block">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 flex items-center justify-around">
            <button onClick={() => jumpTo('mission-vision')} className="flex-1 py-3 px-4 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 font-bold transition-all text-sm flex items-center justify-center space-x-2">
              <Target size={16} />
              <span>Mission & Vision</span>
            </button>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <button onClick={() => jumpTo('our-history')} className="flex-1 py-3 px-4 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 font-bold transition-all text-sm flex items-center justify-center space-x-2">
              <History size={16} />
              <span>Our History</span>
            </button>
            <div className="h-8 w-[1px] bg-gray-100"></div>
            <button onClick={() => jumpTo('core-values')} className="flex-1 py-3 px-4 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 font-bold transition-all text-sm flex items-center justify-center space-x-2">
              <Heart size={16} />
              <span>Core Values</span>
            </button>
          </div>
        </div>
      </section>

      {/* Spacer for Jump Nav in Mobile */}
      <div className="h-12 md:hidden"></div>

      {/* Mission & Vision */}
      <section id="mission-vision" className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div className="bg-green-50 p-8 md:p-12 rounded-2xl md:rounded-[2rem] border border-green-100 space-y-4 md:space-y-6">
              <div className="bg-green-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-2 md:mb-4">
                <Target size={24} className="md:hidden" />
                <Target size={32} className="hidden md:block" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-lg">
                To build resilient communities that are environmentally conscious, socially responsible, and proactive in adapting to the changing global climate.
              </p>
            </div>
            
            <div className="bg-blue-50 p-8 md:p-12 rounded-2xl md:rounded-[2rem] border border-blue-100 space-y-4 md:space-y-6">
              <div className="bg-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-2 md:mb-4">
                <Eye size={24} className="md:hidden" />
                <Eye size={32} className="hidden md:block" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-sm md:text-lg">
                To create a future where every community in the Sahel and beyond coexists sustainably with nature, ensuring a safe and green planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section id="our-history" className="py-16 md:py-32 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 md:space-y-8">
              <div className="inline-flex items-center space-x-2 text-blue-600">
                <History size={20} className="md:w-6 md:h-6" />
                <span className="font-bold uppercase tracking-widest text-[10px] md:text-sm">Our Journey</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">Rooted in Passion and Community</h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Founded in Maiduguri, Borno State, FOURCi was born out of the pressing need to address the accelerating environmental degradation in the Sahel region.
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 md:p-2.5 rounded-lg text-green-600 font-bold text-xs md:text-sm shrink-0">2018</div>
                  <p className="text-gray-600 text-sm md:text-base"><span className="font-bold text-gray-900">Inception:</span> Launched as a community awareness group in Borno.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 md:p-2.5 rounded-lg text-green-600 font-bold text-xs md:text-sm shrink-0">2020</div>
                  <p className="text-gray-600 text-sm md:text-base"><span className="font-bold text-gray-900">Growth:</span> Officially registered and expanded tree planting initiatives.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 md:p-2.5 rounded-lg text-green-600 font-bold text-xs md:text-sm shrink-0">2023</div>
                  <p className="text-gray-600 text-sm md:text-base"><span className="font-bold text-gray-900">Impact:</span> Reached 100+ communities with climate resilience training.</p>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=1000" alt="History" loading="lazy" decoding="async" className="rounded-2xl md:rounded-3xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="core-values" className="py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Heart className="text-red-500" />, title: "Compassion", text: "We care deeply about our planet and the people who inhabit it." },
              { icon: <Users className="text-blue-500" />, title: "Collaboration", text: "Working together is the only way to solve the climate crisis." },
              { icon: <Target className="text-green-500" />, title: "Integrity", text: "We are transparent, accountable, and focused on real impact." }
            ].map((v, i) => (
              <div key={i} className="text-center p-8 md:p-10 bg-white border border-gray-100 rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{v.title}</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
