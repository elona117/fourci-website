
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, CheckCircle, X, ArrowRight, Share2, Globe, Target, Award, Calendar } from 'lucide-react';
// Fix: Import RESOURCES and Resource instead of PROJECTS and Project
import { RESOURCES } from '../constants';
import { Resource } from '../types';
import ShareButtons from '../components/ShareButtons';

// Fix: Use Resource type for the modal prop
const ProjectModal: React.FC<{ project: Resource; onClose: () => void }> = ({ project, onClose }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 lg:p-10 animate-fadeIn">
      <div 
        className="absolute inset-0 bg-gray-950/90 backdrop-blur-md" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full h-full lg:h-[90vh] lg:max-w-7xl lg:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row animate-scaleUp">
        
        {/* Mobile Close Button - Fixed position to ensure it's always accessible */}
        <button 
          onClick={onClose}
          className="lg:hidden absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white p-3 rounded-full transition-all active:scale-90 border border-white/20 shadow-xl"
          aria-label="Close Modal"
        >
          <X size={24} />
        </button>

        {/* Media Side */}
        <div className="relative h-64 sm:h-80 lg:h-auto lg:w-[42%] shrink-0">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent lg:bg-gradient-to-r" />
          
          <div className="absolute bottom-8 left-8 lg:bottom-16 lg:left-16 right-8 text-white space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg inline-block ${
                project.status === 'Ongoing' ? 'bg-green-600' : 'bg-blue-600'
              }`}>
                {project.status}
              </span>
            </div>
            <h2 className="text-3xl lg:text-6xl font-black leading-[1.1] tracking-tighter">
              {project.title}
            </h2>
            <div className="flex items-center space-x-3 text-white/70 font-bold text-xs uppercase tracking-widest">
              <MapPin size={16} className="text-green-400" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="flex-grow overflow-hidden flex flex-col bg-white">
          {/* Desktop Header Navigation */}
          <div className="hidden lg:flex items-center justify-between p-12 pb-0 shrink-0">
             <div className="flex items-center space-x-4 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em]">
                <Globe size={18} className="text-green-500" />
                <span>Operational Impact Briefing</span>
             </div>
             <button 
                onClick={onClose}
                className="bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-900 p-4 rounded-full transition-all active:scale-90 border border-gray-100 group"
              >
                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-grow overflow-y-auto custom-scrollbar">
            <div className="p-8 sm:p-12 lg:p-16 lg:pt-8 space-y-16">
              
              {/* Impact Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.metrics?.map((metric, i) => (
                  <div key={i} className={`p-8 rounded-[2.5rem] border flex flex-col items-center text-center group transition-all hover:shadow-xl hover:-translate-y-1 ${
                    i % 2 === 0 ? 'bg-green-50/40 border-green-100' : 'bg-blue-50/40 border-blue-100'
                  }`}>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] mb-3">{metric.label}</p>
                    <p className="font-black text-gray-900 text-3xl sm:text-4xl leading-none tracking-tighter">{metric.value}</p>
                  </div>
                ))}
              </div>

              {/* Text Narrative */}
              <div className="space-y-12">
                <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-600 leading-relaxed font-medium">
                  <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-800 first-letter:text-7xl lg:first-letter:text-8xl first-letter:font-black first-letter:text-green-600 first-letter:mr-5 first-letter:float-left first-letter:leading-[0.8] first-letter:mt-2">
                    {project.content || project.description}
                  </p>
                </div>

                {/* Engagement Banner */}
                <div className="bg-gray-950 p-10 sm:p-16 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                    <Target size={250} />
                  </div>
                  <div className="relative z-10 space-y-10">
                    <div className="space-y-4">
                      <div className="inline-flex items-center space-x-2 text-green-500 mb-2">
                        <Award size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Global Partnership Opportunity</span>
                      </div>
                      <h4 className="text-3xl sm:text-5xl font-black tracking-tighter leading-none">Collaborate on our next green milestone.</h4>
                      <p className="text-gray-400 text-base sm:text-xl max-w-2xl leading-relaxed font-medium">
                        Help us scale this model to more frontline communities across Northern Nigeria.
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a href="/#/get-involved" className="bg-green-600 text-white px-10 py-5 rounded-2xl font-black text-sm text-center hover:bg-green-500 transition-all active:scale-95 shadow-2xl shadow-green-900/40">
                        Pledge Support
                      </a>
                      <a href="/#/contact" className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-sm text-center hover:bg-white/10 transition-all active:scale-95">
                        Inquire Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Shared Advocacy */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-10">
                 <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-50 rounded-2xl">
                      <Share2 size={20} className="text-gray-900" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Amplify Impact</span>
                      <span className="text-xs font-bold text-gray-900">Share this report with your network</span>
                    </div>
                 </div>
                 <ShareButtons 
                    url={`${window.location.origin}/#/projects?id=${project.id}`} 
                    title={`Verified Impact Report: ${project.title}`} 
                 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Fix: Use Resource type for selected state
  const [selectedProject, setSelectedProject] = useState<Resource | null>(null);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      // Fix: Use RESOURCES constant
      const project = RESOURCES.find(p => p.id === id);
      if (project) setSelectedProject(project);
    } else {
      setSelectedProject(null);
    }
  }, [searchParams]);

  // Fix: Use Resource type for parameter
  const handleOpenProject = (project: Resource) => {
    setSearchParams({ id: project.id });
  };

  const handleCloseProject = () => {
    setSearchParams({});
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Refined Mature Header */}
      <section className="bg-gray-950 pt-32 pb-24 lg:pt-48 lg:pb-40 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_70%)]" />
          <div className="absolute -top-1/4 -left-1/4 w-[40vw] h-[40vw] bg-blue-600/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-lg border border-white/10 px-5 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Strategic Initiatives Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-8 tracking-tighter leading-none">
            Our Work in <span className="text-green-500">Action</span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-white/40 max-w-3xl mx-auto font-medium leading-relaxed">
            Documenting our journey in engineering sustainable ecosystems and climate-resilient communities across Northern Nigeria.
          </p>
        </div>
      </section>

      {/* Mature Alternating Layout */}
      <section className="py-24 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-40 lg:space-y-64">
            {/* Fix: Map through RESOURCES constant */}
            {RESOURCES.map((project, idx) => (
              <div 
                key={project.id} 
                className={`flex flex-col ${
                  idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-12 lg:gap-24 group`}
              >
                {/* Visual Anchor */}
                <div className="w-full lg:w-[50%] shrink-0">
                  <div className="aspect-[16/10] rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-green-900/10 relative">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" 
                    />
                    <div className="absolute top-8 left-8 z-20">
                      <span className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl backdrop-blur-xl border ${
                        project.status === 'Ongoing' 
                          ? 'bg-green-600/90 border-green-500 text-white' 
                          : 'bg-blue-600/90 border-blue-500 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  </div>
                </div>

                {/* Narrative Block */}
                <div className="w-full lg:w-[50%] space-y-10">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-3 text-green-600">
                      <MapPin size={20} />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">{project.location}</span>
                    </div>
                    
                    <h3 className="text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 tracking-tighter leading-none">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-500 leading-relaxed text-lg lg:text-xl font-medium">
                      {project.description}
                    </p>
                  </div>

                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-4">
                      {project.metrics.map((m, i) => (
                        <div key={i} className="bg-gray-50 border border-gray-100 p-6 rounded-3xl group-hover:bg-white transition-colors group-hover:shadow-lg group-hover:shadow-gray-200/50">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{m.label}</p>
                           <p className="text-2xl font-black text-gray-900 tracking-tighter">{m.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-8">
                    <button 
                      onClick={() => handleOpenProject(project)}
                      className="w-full sm:w-auto bg-gray-950 text-white px-10 py-5 rounded-2xl font-black text-sm lg:text-base hover:bg-green-600 transition-all active:scale-95 flex items-center justify-center space-x-4 group/btn shadow-2xl shadow-gray-900/20"
                    >
                      <span>Explore Report</span>
                      <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                    
                    <ShareButtons 
                      url={`${window.location.origin}/#/projects?id=${project.id}`} 
                      title={`Progress update: ${project.title}`} 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mature Features Bar */}
          <div className="mt-40 lg:mt-64 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-24">
            {[
              { icon: <CheckCircle className="text-green-600" />, title: "Ecological Depth", text: "Initiatives grounded in precise Sahelian ecological science and indigenous knowledge." },
              { icon: <Target className="text-blue-600" />, title: "Precision Impact", text: "Engineering resilient ecosystems designed to evolve and grow alongside local communities." },
              { icon: <Globe className="text-gray-900" />, title: "Total Transparency", text: "Verified reporting and open data ensuring full accountability to our global donor network." }
            ].map((f, i) => (
              <div key={i} className="space-y-6 p-4">
                <div className="p-4 bg-gray-50 w-fit rounded-2xl shadow-sm">{f.icon}</div>
                <h4 className="text-2xl font-black text-gray-900 tracking-tight">{f.title}</h4>
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed font-medium">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={handleCloseProject} 
        />
      )}
    </div>
  );
};

export default Projects;
