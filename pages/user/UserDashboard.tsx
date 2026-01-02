
import React, { useMemo } from 'react';
import UserLayout from '../../components/UserLayout';
import { useAuth } from '../../App';
import { useNavigate } from 'react-router-dom';

const UserDashboard: React.FC = () => {
  const { user, tasks } = useAuth();
  const navigate = useNavigate();

  const registeredNames = user?.registeredDiseases || [];
  
  // Filter tasks that belong to registered diseases
  const activeTasks = useMemo(() => {
    return tasks.filter(t => registeredNames.includes(t.condition));
  }, [tasks, registeredNames]);

  const completedCount = activeTasks.filter(t => t.completed).length;
  const totalCount = activeTasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // SVG dash array calculation
  const circumference = 2 * Math.PI * 15.9155;
  const strokeDasharray = `${(progressPercent / 100) * circumference}, ${circumference}`;

  return (
    <UserLayout>
      <section>
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-sky-700 p-6 shadow-lg shadow-sky-900/20 text-white relative overflow-hidden border border-slate-800/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div>
              <h3 className="text-xl font-bold">Daily Progress</h3>
              <p className="text-sky-100/80 text-sm font-medium mt-1">
                {totalCount === 0 
                  ? "Start a care plan to see progress" 
                  : progressPercent === 100 
                  ? "Perfect score today! Amazing work." 
                  : "You're making great strides."}
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider">Today</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="relative size-20 shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <circle 
                  className="text-black/30" 
                  cx="18" cy="18" r="15.9155" 
                  fill="none" stroke="currentColor" strokeWidth="3"
                />
                <circle 
                  className="text-white transition-all duration-1000 ease-out drop-shadow-md" 
                  cx="18" cy="18" r="15.9155" 
                  fill="none" stroke="currentColor" 
                  strokeDasharray={strokeDasharray} 
                  strokeLinecap="round" strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-lg font-bold">{progressPercent}%</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5 text-sky-100/80">
                  <span>Tasks Completed</span>
                  <span>{completedCount}/{totalCount}</span>
                </div>
                <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-1000 ease-out rounded-full" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xl font-bold text-white">Active Protocols</h3>
          <button 
            onClick={() => navigate('/user/diseases')}
            className="text-sm font-semibold text-sky-400 hover:text-sky-300"
          >
            Manage Plans
          </button>
        </div>
        
        {registeredNames.length > 0 ? (
          <div className="space-y-3">
            {registeredNames.map((name, idx) => {
              const conditionTasks = tasks.filter(t => t.condition === name);
              const conditionDone = conditionTasks.filter(t => t.completed).length;
              const condPercent = conditionTasks.length > 0 ? (conditionDone / conditionTasks.length) * 100 : 0;
              
              return (
                <div 
                  key={idx}
                  onClick={() => navigate('/user/tasks')}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/30 transition-all cursor-pointer group"
                >
                  <div className="size-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">verified</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-bold group-hover:text-sky-400 transition-colors">{name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                       <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-[100px]">
                          <div className="h-full bg-sky-500" style={{ width: `${condPercent}%` }}></div>
                       </div>
                       <span className="text-[10px] text-slate-500 font-bold uppercase">{conditionDone}/{conditionTasks.length} DONE</span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-slate-700 group-hover:text-white transition-colors">chevron_right</span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl p-8 text-center">
            <p className="text-slate-500 text-sm mb-4">You haven't enrolled in any care plans yet.</p>
            <button 
              onClick={() => navigate('/user/diseases')}
              className="px-6 py-2 bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-widest rounded-xl border border-sky-500/20 hover:bg-sky-500/20"
            >
              Browse Library
            </button>
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xl font-bold text-white">Metrics</h3>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Last Update: Today</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-32 hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start">
              <span className="p-2 rounded-xl bg-rose-500/10 text-rose-400">
                <span className="material-symbols-outlined filled text-[20px]">favorite</span>
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{user?.metrics?.heartRate || '--'} <span className="text-sm font-medium text-slate-500">bpm</span></p>
              <p className="text-xs text-slate-400 font-medium">Avg Heart Rate</p>
            </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between h-32 hover:border-slate-700 transition-colors">
            <div className="flex justify-between items-start">
              <span className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <span className="material-symbols-outlined text-[20px]">monitor_weight</span>
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{user?.metrics?.weight || '--'} <span className="text-sm font-medium text-slate-500">lbs</span></p>
              <p className="text-xs text-slate-400 font-medium">Weight</p>
            </div>
          </div>
        </div>
      </section>
    </UserLayout>
  );
};

export default UserDashboard;
