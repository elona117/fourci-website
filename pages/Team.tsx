
import * as React from 'react';
import { Linkedin, Twitter, Users, Shield, Heart, MapPin, Globe } from 'lucide-react';
import { TEAM_MEMBERS } from '../constants';
import { TeamMember } from '../types';

const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col h-full relative overflow-hidden">
    <div className="shimmer-overlay opacity-0 group-hover:opacity-10 transition-opacity"></div>
    
    <div className="relative mb-6">
      <div className="aspect-square rounded-2xl overflow-hidden relative shadow-inner">
        <img 
          src={member.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400'} 
          alt={member.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
        />
      </div>
      {member.socials && (
        <div className="absolute bottom-3 right-3 flex space-x-2">
          {member.socials.linkedin && (
            <a 
              href={member.socials.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur p-2.5 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-lg"
            >
              <Linkedin size={18} />
            </a>
          )}
          {member.socials.twitter && (
            <a 
              href={member.socials.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/90 backdrop-blur p-2.5 rounded-xl text-gray-900 hover:bg-black hover:text-white transition-all shadow-lg"
            >
              <Twitter size={18} />
            </a>
          )}
        </div>
      )}
    </div>
    
    <div className="flex-grow space-y-3">
      <div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{member.name}</h3>
        <p className="text-xs font-black text-green-600 uppercase tracking-[0.2em]">{member.role}</p>
      </div>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">{member.bio}</p>
    </div>
  </div>
);

const TeamSection: React.FC<{ 
  title: string; 
  category: TeamMember['category']; 
  description: string;
  icon: React.ReactNode 
}> = ({ title, category, description, icon }) => {
  const members = TEAM_MEMBERS.filter(m => m.category === category);
  if (members.length === 0) return null;

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-10">
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-green-600">
            <div className="p-3 bg-green-50 rounded-2xl">
              {icon}
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em]">{category} Division</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter">{title}</h2>
          <p className="text-gray-500 text-lg max-w-2xl font-medium">{description}</p>
        </div>
        <div className="hidden lg:flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
          <Users size={16} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{members.length} Professional Members</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
};

const Team: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-green-950 py-24 md:py-40 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-950/50 to-green-950"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-2.5 rounded-full mb-10">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Our Personnel Database</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            Meet the <span className="text-green-500">People</span> <br /> Behind FOURCi
          </h1>
          <p className="text-lg md:text-2xl text-green-100/60 max-w-3xl mx-auto font-medium leading-relaxed px-4">
            A diverse collective of ecologists, community strategists, and advocates united by the goal of fostering climate resilience in the Sahel.
          </p>
        </div>
      </section>

      {/* Main Team Content */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 md:space-y-56">
          
          <TeamSection 
            title="Organizational Leadership" 
            category="Leadership" 
            description="Our directors bring decades of experience in environmental advocacy and non-profit management to steer FOURCi's strategic path."
            icon={<Shield size={24} />} 
          />

          <TeamSection 
            title="The Field Force" 
            category="Field Staff" 
            description="The dedicated professionals who manage our reforestation hubs, school eco-clubs, and community monitoring networks across Nigeria."
            icon={<MapPin size={24} />} 
          />

          <TeamSection 
            title="Strategic Volunteers" 
            category="Volunteer" 
            description="Our global network of passionate advocates and local liaisons who help scale our impact beyond traditional field boundaries."
            icon={<Heart size={24} />} 
          />

          {/* Join Us CTA */}
          <div className="bg-blue-600 rounded-[3rem] lg:rounded-[5rem] p-12 md:p-32 text-center text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
               <Globe size={300} />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">Want to Join our Mission?</h2>
              <p className="text-blue-100 text-lg md:text-2xl font-medium leading-relaxed opacity-80">
                We are always looking for passionate environmentalists, researchers, and community organizers to join our expanding network.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
                <a href="/#/get-involved" className="bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-sm lg:text-base hover:bg-gray-100 transition-all active:scale-95 shadow-2xl shadow-blue-500/20">
                  Join as a Volunteer
                </a>
                <a href="/#/contact" className="bg-blue-700 text-white border border-blue-500 px-12 py-5 rounded-2xl font-black text-sm lg:text-base hover:bg-blue-800 transition-all active:scale-95">
                  Request to Partner
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .shimmer-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%);
          animation: shimmerEffect 3s infinite linear;
          pointer-events: none;
        }
        @keyframes shimmerEffect {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(150%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

export default Team;
