
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, CheckCircle, X, ArrowRight, Share2, Globe, Target, Award } from 'lucide-react';
import { Resource } from '../types';
import { getResources } from '../services/resourceService';
import ShareButtons from '../components/ShareButtons';

const ResourceModal: React.FC<{ resource: Resource; onClose: () => void }> = ({ resource, onClose }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = originalStyle; };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 lg:p-10 animate-fadeIn">
      <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full h-full lg:h-[90vh] lg:max-w-7xl lg:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-scaleUp">
        <button onClick={onClose} className="lg:hidden absolute top-6 right-6 z-[110] bg-white/10 text-white p-3 rounded-full border border-white/20 shadow-xl"><X size={24} /></button>
        <div className="relative h-64 sm:h-80 lg:h-auto lg:w-[42%] shrink-0">
          <img src={resource.image} alt={resource.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent lg:bg-gradient-to-r" />
          <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 right-8 text-white space-y-4">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg inline-block ${resource.status === 'Ongoing' ? 'bg-green-600' : 'bg-blue-600'}`}>{resource.status}</span>
            <h2 className="text-3xl lg:text-6xl font-black leading-[1.1] tracking-tighter">{resource.title}</h2>
            <div className="flex items-center space-x-3 text-white/70 font-bold text-xs uppercase tracking-widest"><MapPin size={16} className="text-green-400" /><span>{resource.location}</span></div>
          </div>
        </div>
        <div className="flex-grow overflow-hidden flex flex-col bg-white">
          <div className="hidden lg:flex items-center justify-between p-12 pb-0 shrink-0">
             <div className="flex items-center space-x-4 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]"><Globe size={18} className="text-green-500" /><span>Verified Knowledge Asset</span></div>
             <button onClick={onClose} className="bg-gray-50 hover:bg-gray-100 text-gray-400 p-4 rounded-full transition-all group"><X size={20} className="group-hover:rotate-90 transition-transform duration-300" /></button>
          </div>
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            <div className="p-8 sm:p-12 lg:p-16 lg:pt-8 space-y-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {resource.metrics?.map((metric, i) => (
                  <div key={i} className={`p-8 rounded-[2.5rem] border flex flex-col items-center text-center group transition-all hover:shadow-xl ${i % 2 === 0 ? 'bg-green-50/40 border-green-100' : 'bg-blue-50/40 border-blue-100'}`}>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-3">{metric.label}</p>
                    <p className="font-black text-gray-900 text-3xl sm:text-4xl leading-none tracking-tighter">{metric.value}</p>
                  </div>
                ))}
              </div>
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-800 first-letter:text-7xl lg:first-letter:text-8xl first-letter:font-black first-letter:text-green-600 first-letter:mr-5 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-2">
                  {resource.content || resource.description}
                </p>
              </div>
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-10">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-50 rounded-2xl"><Share2 size={20} className="text-gray-900" /></div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Amplify Impact</span>
                      <span className="text-xs font-bold text-gray-900">Share this resource with your network</span>
                    </div>
                 </div>
                 <ShareButtons url={`${window.location.origin}/#/resources?id=${resource.id}`} title={`Impact Update: ${resource.title}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Resources: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    const all = getResources();
    setResources(all);
    const id = searchParams.get('id');
    if (id) {
      const res = all.find(r => r.id === id);
      if (res) setSelectedResource(res);
    } else {
      setSelectedResource(null);
    }
  }, [searchParams]);

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-gray-950 pt-32 pb-24 lg:pt-48 lg:pb-40 text-center text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Strategic Impact Library</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-none">
            Our <span className="text-green-500">Resources</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed">
            Documenting our journey in engineering sustainable ecosystems and climate-resilient communities across Nigeria.
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-40 lg:space-y-64">
            {resources.map((res, idx) => (
              <div key={res.id} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 group`}>
                <div className="w-full lg:w-[50%] shrink-0">
                  <div className="aspect-[16/10] rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-green-900/10 relative">
                    <img src={res.image} alt={res.title} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                    <div className="absolute top-8 left-8 z-20">
                      <span className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl backdrop-blur-xl border ${res.status === 'Ongoing' ? 'bg-green-600/90 border-green-500 text-white' : 'bg-blue-600/90 border-blue-500 text-white'}`}>{res.status}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-[50%] space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-green-600"><MapPin size={20} /><span className="text-[10px] font-black uppercase tracking-[0.4em]">{res.location}</span></div>
                    <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 tracking-tighter leading-none">{res.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-lg lg:text-xl font-medium">{res.description}</p>
                  </div>
                  <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                    <button onClick={() => setSearchParams({ id: res.id })} className="w-full sm:w-auto bg-gray-950 text-white px-10 py-5 rounded-2xl font-black text-sm lg:text-base hover:bg-green-600 transition-all flex items-center justify-center space-x-4 group/btn shadow-2xl shadow-gray-900/20">
                      <span>Explore Asset</span><ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                    <ShareButtons url={`${window.location.origin}/#/resources?id=${res.id}`} title={`Progress update: ${res.title}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedResource && <ResourceModal resource={selectedResource} onClose={() => setSearchParams({})} />}
    </div>
  );
};

export default Resources;
