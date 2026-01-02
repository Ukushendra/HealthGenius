
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const AdminLayout: React.FC<{ children: React.ReactNode, title?: string }> = ({ children, title }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden max-w-md mx-auto bg-slate-950 font-display text-white">
      <header className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg shadow-black/20">
        <div className="flex items-center px-5 py-4 justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/admin')}>
              <div className="size-8 rounded-lg bg-sky-500 shadow-lg shadow-sky-500/20 flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="material-symbols-outlined text-slate-950 text-lg font-black">bolt</span>
              </div>
              <span className="text-lg font-black tracking-tighter text-white italic">Health<span className="text-sky-400">Genius</span></span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="relative flex size-10 items-center justify-center rounded-full hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-slate-300">notifications</span>
              <span className="absolute top-2 right-2 size-2.5 rounded-full bg-red-500 border-2 border-slate-950"></span>
            </button>
            <NavLink 
              to="/admin/profile" 
              className="size-9 rounded-full bg-sky-600 overflow-hidden border border-slate-700 flex items-center justify-center font-bold hover:ring-2 hover:ring-sky-400 transition-all active:scale-90"
            >
              SJ
            </NavLink>
          </div>
        </div>
        {title && (
          <div className="px-5 pb-3">
             <h1 className="text-xs font-black uppercase tracking-[0.2em] text-sky-500/80">{title}</h1>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col gap-6 px-5 py-6 mb-24">
        {children}
      </main>

      <div className="fixed bottom-0 max-w-md w-full bg-slate-900 border-t border-slate-800 px-6 py-2 pb-6 z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between">
          <NavLink to="/admin" end className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-sky-400 scale-110' : 'text-slate-400 opacity-70'}`}>
            <span className="material-symbols-outlined text-[24px]">dashboard</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">System</span>
          </NavLink>
          <NavLink to="/admin/tasks" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-sky-400 scale-110' : 'text-slate-400 opacity-70'}`}>
            <span className="material-symbols-outlined text-[24px]">clinical_notes</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Diseases</span>
          </NavLink>
          <div className="relative -top-6">
            <button className="size-14 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-2xl shadow-sky-500/40 hover:bg-sky-400 hover:scale-105 active:scale-95 transition-all border-4 border-slate-950">
              <span className="material-symbols-outlined text-[28px] font-bold">add</span>
            </button>
          </div>
          <NavLink to="/admin/diseases" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-sky-400 scale-110' : 'text-slate-400 opacity-70'}`}>
            <span className="material-symbols-outlined text-[24px]">menu_book</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Library</span>
          </NavLink>
          <NavLink to="/admin/profile" className={({ isActive }) => `flex flex-col items-center gap-1 p-2 transition-all ${isActive ? 'text-sky-400 scale-110' : 'text-slate-400 opacity-70'}`}>
            <span className="material-symbols-outlined text-[24px]">account_circle</span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">Profile</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
