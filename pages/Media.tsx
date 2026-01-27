
// Fix: Use namespace import for React to ensure JSX intrinsic elements are properly resolved
import * as React from 'react';
import { Play, FileText, Download, Image as ImageIcon } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const Media: React.FC = () => {
  return (
    <div className="bg-white">
      <section className="bg-green-900 py-24 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Media & Resources</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto font-light">
            Stay updated with our latest news, galleries, and download official reports.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Photos */}
          <div className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <ImageIcon className="text-green-600" />
                <span>Photo Gallery</span>
              </h2>
              <button className="text-blue-600 font-bold hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-2xl bg-gray-100 group cursor-pointer relative shadow-md">
                  <img src={`https://picsum.photos/seed/${i+10}/800/800`} alt="Gallery" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-3">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Enlarge</span>
                    <div className="bg-white/10 backdrop-blur-md rounded-full px-2 py-1 flex items-center space-x-1 border border-white/20">
                       <ShareButtons 
                        url={`${window.location.origin}/#/media?gallery=${i}`} 
                        title="Beautiful climate conservation work by FOURCi" 
                       />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="mb-24">
             <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <Play className="text-red-600" />
                <span>Video Campaigns</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-video bg-gray-900 rounded-[2rem] overflow-hidden relative shadow-2xl group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e2?auto=format&fit=crop&q=80&w=1200" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-60" alt="Video thumb" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform shadow-lg">
                    <Play size={32} fill="white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
                  <ShareButtons url="https://youtube.com" title="Watch FOURCi's Anniversary Documentary" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-white font-bold text-lg">FOURCi Anniversary Documentary</h4>
                  <p className="text-gray-300 text-sm italic">5:20 • Awareness Campaign</p>
                </div>
              </div>
              <div className="aspect-video bg-gray-900 rounded-[2rem] overflow-hidden relative shadow-2xl group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1464241353125-b3058f71085c?auto=format&fit=crop&q=80&w=1200" loading="lazy" decoding="async" className="w-full h-full object-cover opacity-60" alt="Video thumb" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform shadow-lg">
                    <Play size={32} fill="white" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md p-1 rounded-full border border-white/20">
                  <ShareButtons url="https://youtube.com" title="Progress of Sahel Green Belt 2024" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-white font-bold text-lg"> Sahel Green Belt: Progress 2024</h4>
                  <p className="text-gray-300 text-sm italic">3:45 • Field Updates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reports */}
          <div className="bg-gray-50 rounded-[3rem] p-12 md:p-20 border border-gray-100">
             <div className="flex items-center space-x-3 mb-12">
              <h2 className="text-3xl font-bold flex items-center space-x-3">
                <FileText className="text-blue-600" />
                <span>Reports & Publications</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Annual Impact Report 2023", date: "Jan 2024", size: "2.4 MB" },
                { title: "Climate Resilience Survey", date: "Nov 2023", size: "1.8 MB" },
                { title: "NGO Governance Charter", date: "Sep 2023", size: "1.1 MB" }
              ].map((report, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group flex flex-col">
                  <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{report.title}</h4>
                  <p className="text-xs text-gray-400 mb-6 uppercase tracking-wider font-semibold">Published {report.date} • {report.size}</p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <button className="flex items-center space-x-2 text-blue-600 font-bold text-sm hover:underline active:scale-95 transition-transform">
                      <Download size={16} />
                      <span>PDF</span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <ShareButtons 
                        url={`${window.location.origin}/#/media?report=${idx}`} 
                        title={`Download the FOURCi ${report.title}`} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Media;
