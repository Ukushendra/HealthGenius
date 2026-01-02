
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';

const UserLayout: React.FC<{ children: React.ReactNode, title?: string }> = ({ children, title }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden max-w-md mx-auto bg-slate-950 font-display">
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md transition-shadow duration-300 border-b border-slate-800/50">
        <div className="px-4 pt-6 pb-2 flex items-center justify-between">
          <NavLink 
            to="/user/profile" 
            className="flex items-center gap-3 group transition-transform active:scale-95"
          >
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-slate-700 shadow-sm group-hover:border-sky-400 transition-all" 
              style={{ backgroundImage: `url(${user?.avatar})` }}
            />
            <div>
              <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider mb-0.5">Welcome Back</p>
              <h2 className="text-2xl font-bold leading-none tracking-tight text-white group-hover:text-sky-400 transition-colors">
                {user?.name?.split(' ')[0]}
              </h2>
            </div>
          </NavLink>
          <button className="flex items-center justify-center size-10 rounded-full bg-slate-900 text-sky-400 border border-slate-800 hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined filled">notifications</span>
          </button>
        </div>
        <div className="px-4 pb-4 mt-2">
          <nav className="flex p-1 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto no-scrollbar gap-1">
            <NavLink to="/user" end className={({ isActive }) => `flex-1 py-2 px-3 text-[10px] text-center font-bold rounded-xl transition-all whitespace-nowrap ${isActive ? 'text-white bg-sky-600 shadow-sm' : 'text-slate-400 hover:text-sky-400 hover:bg-slate-800'}`}>Dashboard</NavLink>
            <NavLink to="/user/diseases" className={({ isActive }) => `flex-1 py-2 px-3 text-[10px] text-center font-bold rounded-xl transition-all whitespace-nowrap ${isActive ? 'text-white bg-sky-600 shadow-sm' : 'text-slate-400 hover:text-sky-400 hover:bg-slate-800'}`}>Diseases</NavLink>
            <NavLink to="/user/tasks" className={({ isActive }) => `flex-1 py-2 px-3 text-[10px] text-center font-bold rounded-xl transition-all whitespace-nowrap ${isActive ? 'text-white bg-sky-600 shadow-sm' : 'text-slate-400 hover:text-sky-400 hover:bg-slate-800'}`}>Tasks</NavLink>
            <NavLink to="/user/profile" className={({ isActive }) => `flex-1 py-2 px-3 text-[10px] text-center font-bold rounded-xl transition-all whitespace-nowrap ${isActive ? 'text-white bg-sky-600 shadow-sm' : 'text-slate-400 hover:text-sky-400 hover:bg-slate-800'}`}>Profile</NavLink>
            <NavLink to="/user/history" className={({ isActive }) => `flex-1 py-2 px-3 text-[10px] text-center font-bold rounded-xl transition-all whitespace-nowrap ${isActive ? 'text-white bg-sky-600 shadow-sm' : 'text-slate-400 hover:text-sky-400 hover:bg-slate-800'}`}>History</NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-6 px-4 py-6 mb-20">
        {children}
      </main>

      <div className="fixed bottom-0 max-w-md w-full bg-slate-900 border-t border-slate-800 px-4 py-3 flex justify-between items-center z-50">
        <NavLink to="/user" className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>
        <NavLink to="/user/diseases" className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">clinical_notes</span>
          <span className="text-[10px] font-medium">Diseases</span>
        </NavLink>
        <div className="relative -top-6 px-2">
          <button className="bg-sky-600 hover:bg-sky-500 text-white rounded-full p-4 shadow-lg shadow-sky-500/30 transition-all transform hover:scale-105">
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
        </div>
        <NavLink to="/user/tasks" className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">task_alt</span>
          <span className="text-[10px] font-medium">Tasks</span>
        </NavLink>
        <NavLink to="/user/history" className={({ isActive }) => `flex flex-col items-center gap-1 flex-1 ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-medium">History</span>
        </NavLink>
      </div>
    </div>
  );
};

export default UserLayout;
