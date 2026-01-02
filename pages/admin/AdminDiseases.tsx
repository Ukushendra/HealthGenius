
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../App';

const AdminDiseases: React.FC = () => {
  const { articles, addArticle, masterDiseases } = useAuth();
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [causes, setCauses] = useState('');
  const [remedies, setRemedies] = useState('');
  const [target, setTarget] = useState(masterDiseases[0]?.name || 'General');
  const [status, setStatus] = useState<'Published' | 'Draft'>('Published');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !causes || !remedies) return;

    addArticle({
      title,
      description,
      causes,
      remedies,
      target,
      status,
      icon: 'article'
    });

    // Reset and Close
    setTitle('');
    setDescription('');
    setCauses('');
    setRemedies('');
    setShowForm(false);
  };

  return (
    <AdminLayout title="Content Library">
      <div className="mb-2">
        <h1 className="text-2xl font-bold text-white mb-1">Article Management</h1>
        <p className="text-slate-500 text-sm">Create and curate educational content for your patients.</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar py-2">
        <button className="shrink-0 px-4 py-2 rounded-xl bg-sky-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-sky-500/20">All Library</button>
        <button className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">Published</button>
        <button className="shrink-0 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider hover:text-white transition-colors">Drafts</button>
      </div>

      <div className="flex flex-col gap-4">
        {articles.map(article => (
          <div key={article.id} className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-sm hover:border-sky-500/20 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-4">
                <div className="size-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sky-400 text-[28px]">{article.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight mb-1">{article.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{article.target}</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-[10px] text-slate-500 font-medium">Updated {article.updated}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-800/50 mb-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Read Count</span>
                <span className="text-sm font-bold text-white">{article.views}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Visibility</span>
                <span className={`text-sm font-bold ${article.status === 'Published' ? 'text-emerald-400' : 'text-amber-400'}`}>{article.status}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 flex items-center gap-2">
                <div className={`relative w-10 h-5 rounded-full transition-colors ${article.status === 'Published' ? 'bg-sky-500' : 'bg-slate-700'}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-md transition-all ${article.status === 'Published' ? 'right-0.5' : 'left-0.5'}`}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Status</span>
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500/10 text-sky-400 text-xs font-bold border border-sky-500/20 hover:bg-sky-500/20 transition-all">
                  <span className="material-symbols-outlined text-[16px]">edit_note</span> Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 right-6 size-14 rounded-full bg-sky-500 text-white shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-4 border-slate-950"
      >
        <span className="material-symbols-outlined text-[28px]">post_add</span>
      </button>

      {/* Create Article Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-full duration-500 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Create Educational Content</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Article Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-800 border-slate-700 rounded-xl text-white focus:ring-sky-500 text-sm h-12"
                  placeholder="e.g. Living with COPD"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Target Condition</label>
                <select 
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-slate-800 border-slate-700 rounded-xl text-white focus:ring-sky-500 text-sm h-12"
                >
                  {masterDiseases.map(d => <option key={d.id}>{d.name}</option>)}
                  <option>General Health</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Description (Summary)</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-800 border-slate-700 rounded-xl text-white focus:ring-sky-500 text-sm h-20 py-3"
                  placeholder="Short intro for patients..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Causes</label>
                  <textarea 
                    value={causes}
                    onChange={(e) => setCauses(e.target.value)}
                    className="w-full bg-slate-800 border-slate-700 rounded-xl text-white focus:ring-sky-500 text-sm h-24 py-3"
                    placeholder="List common environmental or genetic causes..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Remedies & Tips</label>
                  <textarea 
                    value={remedies}
                    onChange={(e) => setRemedies(e.target.value)}
                    className="w-full bg-slate-800 border-slate-700 rounded-xl text-white focus:ring-sky-500 text-sm h-24 py-3"
                    placeholder="Provide actionable advice for management..."
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button 
                  type="button"
                  onClick={() => setStatus(status === 'Published' ? 'Draft' : 'Published')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${status === 'Published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                >
                  Status: {status}
                </button>
                <button 
                  type="submit"
                  className="flex-[2] py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all uppercase tracking-widest text-sm shadow-lg shadow-sky-500/20"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDiseases;
