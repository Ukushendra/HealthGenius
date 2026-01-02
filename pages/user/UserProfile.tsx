
import React from 'react';
import { useAuth } from '../../App';
import UserLayout from '../../components/UserLayout';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <UserLayout>
      <section className="flex flex-col items-center py-4 px-4 relative">
        <div className="relative group">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 shadow-lg ring-4 ring-slate-800 relative z-10" 
            style={{ backgroundImage: `url(${user?.avatar})` }}
          />
          <button className="absolute bottom-1 right-1 z-20 bg-sky-500 text-white p-2 rounded-full shadow-md hover:bg-sky-600 transition-colors border-2 border-slate-900">
            <span className="material-symbols-outlined text-[18px] leading-none">photo_camera</span>
          </button>
        </div>
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">{user?.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-900/30 text-sky-400">
              Premium Member
            </span>
            <span className="text-sm text-slate-500">{user?.email}</span>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <div className="flex-1 min-w-[100px] flex flex-col gap-1 rounded-2xl bg-slate-900 p-4 items-center text-center shadow-sm border border-slate-800">
            <div className="bg-orange-900/30 text-orange-400 p-2 rounded-full mb-1">
              <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
            </div>
            <p className="text-white text-2xl font-bold leading-tight">12</p>
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Streak</p>
          </div>
          <div className="flex-1 min-w-[100px] flex flex-col gap-1 rounded-2xl bg-slate-900 p-4 items-center text-center shadow-sm border border-slate-800">
            <div className="bg-sky-900/30 text-sky-400 p-2 rounded-full mb-1">
              <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
            </div>
            <p className="text-white text-2xl font-bold leading-tight">5</p>
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Logs/Wk</p>
          </div>
          <div className="flex-1 min-w-[100px] flex flex-col gap-1 rounded-2xl bg-slate-900 p-4 items-center text-center shadow-sm border border-slate-800">
            <div className="bg-green-900/30 text-green-400 p-2 rounded-full mb-1">
              <span className="material-symbols-outlined text-[20px]">ecg_heart</span>
            </div>
            <p className="text-white text-2xl font-bold leading-tight">92</p>
            <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">Health</p>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 px-1">Settings</h3>
        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-800">
          <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-800 transition-colors border-b border-slate-800/50">
            <div className="flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 shrink-0 size-10">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-white text-base font-medium">Personal Info</p>
            </div>
            <span className="material-symbols-outlined text-slate-600">chevron_right</span>
          </button>
          <button className="w-full flex items-center gap-4 px-4 py-4 hover:bg-slate-800 transition-colors">
            <div className="flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 shrink-0 size-10">
              <span className="material-symbols-outlined">notifications</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-white text-base font-medium">Notifications</p>
            </div>
            <span className="material-symbols-outlined text-slate-600">chevron_right</span>
          </button>
        </div>
      </section>

      <div className="mt-auto pb-4">
        <button 
          onClick={logout}
          className="w-full py-3 rounded-xl border border-red-900/50 text-red-400 bg-red-900/10 font-semibold hover:bg-red-900/20 transition-colors"
        >
          Log Out
        </button>
        <p className="text-center text-slate-600 text-xs mt-4">Version 2.4.1 (Build 302)</p>
      </div>
    </UserLayout>
  );
};

export default UserProfile;
