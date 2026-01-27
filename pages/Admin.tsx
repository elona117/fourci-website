
import * as React from 'react';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Plus, Trash2, Edit3, Save, X, FileText, ImageIcon, Settings } from 'lucide-react';
import { Resource } from '../types';
import { getResources, saveResource, deleteResource } from '../services/resourceService';

const Admin: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [editing, setEditing] = useState<Partial<Resource> | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      const data = await getResources();
      setResources(data);
    };
    loadResources();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.description) return;

    const resourceToSave = {
      ...editing,
      id: editing.id || Date.now().toString(),
      status: editing.status || 'Ongoing',
      location: editing.location || 'Borno State, Nigeria',
      image: editing.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
      metrics: editing.metrics || [],
      content: editing.content || editing.description,
    } as Resource;

    await saveResource(resourceToSave);
    const data = await getResources();
    setResources(data);
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure? This action cannot be undone.')) {
      await deleteResource(id);
      const data = await getResources();
      setResources(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-gray-900 text-white hidden lg:flex flex-col">
        <div className="p-8 border-b border-gray-800">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center font-black">F</div>
            <span className="font-bold tracking-tight">FOURCi Studio</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">Internal CMS</span>
        </div>
        <nav className="p-6 space-y-2 flex-grow">
          <button className="w-full flex items-center space-x-3 bg-green-600/10 text-green-500 p-4 rounded-2xl font-bold text-sm">
            <LayoutDashboard size={18} />
            <span>Resource Manager</span>
          </button>
        </nav>
        <div className="p-6 border-t border-gray-800">
           <a href="/" className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Return to Site</a>
        </div>
      </aside>

      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Backend Dashboard</h1>
              <p className="text-gray-500 font-medium">Manage knowledge assets and "Explore More" reporting content.</p>
            </div>
            <button 
              onClick={() => { setEditing({}); setShowForm(true); }}
              className="bg-gray-950 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center space-x-3 hover:bg-green-600 transition-all shadow-xl shadow-gray-900/10"
            >
              <Plus size={20} />
              <span>Add Resource</span>
            </button>
          </header>

          <div className="grid grid-cols-1 gap-6">
            {resources.map((res) => (
              <div key={res.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                  <img src={res.image} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-grow space-y-2 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start space-x-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${res.status === 'Ongoing' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                      {res.status}
                    </span>
                    {!res.isCustom && <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Core Asset</span>}
                  </div>
                  <h3 className="text-2xl font-black text-gray-900">{res.title}</h3>
                  <p className="text-gray-500 line-clamp-1">{res.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => { setEditing(res); setShowForm(true); }}
                    className="p-4 bg-gray-50 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-2xl transition-all"
                  >
                    <Edit3 size={20} />
                  </button>
                  {res.isCustom && (
                    <button 
                      onClick={() => handleDelete(res.id)}
                      className="p-4 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-2xl transition-all"
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col animate-scaleUp">
              <div className="p-8 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-50 rounded-2xl text-green-600"><FileText size={24} /></div>
                  <h2 className="text-2xl font-black tracking-tight">{editing?.id ? 'Edit Resource' : 'New Resource'}</h2>
                </div>
                <button onClick={() => setShowForm(false)} className="p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"><X size={20} /></button>
              </div>

              <form onSubmit={handleSave} className="flex-grow overflow-y-auto p-10 space-y-10 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Resource Title</label>
                    <input 
                      type="text" placeholder="e.g. Sahel Green Wall Phase 2" required
                      value={editing?.title || ''} onChange={e => setEditing({...editing, title: e.target.value})}
                      className="w-full bg-gray-50 border-0 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-green-600 outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Cover Image URL</label>
                    <input 
                      type="url" placeholder="https://..."
                      value={editing?.image || ''} onChange={e => setEditing({...editing, image: e.target.value})}
                      className="w-full bg-gray-50 border-0 rounded-2xl p-5 font-bold focus:ring-2 focus:ring-green-600 outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Public Summary (Brief)</label>
                  <textarea 
                    rows={2} required
                    value={editing?.description || ''} onChange={e => setEditing({...editing, description: e.target.value})}
                    className="w-full bg-gray-50 border-0 rounded-2xl p-5 font-medium text-gray-600 outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Operational Dossier (Full "Explore More" Content)</label>
                  <textarea 
                    rows={10} placeholder="Enter the full report here. This will be shown when users click 'Explore Asset'..."
                    value={editing?.content || ''} onChange={e => setEditing({...editing, content: e.target.value})}
                    className="w-full bg-gray-950 text-green-400 border-0 rounded-[2rem] p-8 font-mono text-sm leading-relaxed outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider italic">Note: Supports long-form multi-paragraph text.</p>
                </div>
              </form>

              <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end gap-4 shrink-0">
                <button onClick={() => setShowForm(false)} className="px-8 py-4 font-black text-gray-400 hover:text-gray-900 transition-all">Cancel</button>
                <button 
                  onClick={handleSave}
                  className="bg-green-600 text-white px-12 py-4 rounded-2xl font-black flex items-center space-x-3 hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 active:scale-95"
                >
                  <Save size={20} />
                  <span>Push to Live Site</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
