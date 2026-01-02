
import React, { useMemo } from 'react';
import UserLayout from '../../components/UserLayout';
import { useAuth } from '../../App';
import { useNavigate } from 'react-router-dom';

const UserTasks: React.FC = () => {
  const { user, tasks, toggleTask } = useAuth();
  const navigate = useNavigate();
  
  const registeredNames = user?.registeredDiseases || [];

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => registeredNames.includes(t.condition));
  }, [registeredNames, tasks]);

  const categories = ['Morning', 'Afternoon', 'Evening'];
  const hasTasks = filteredTasks.length > 0;

  const completedInActive = filteredTasks.filter(t => t.completed).length;
  const adherencePercent = hasTasks ? Math.round((completedInActive / filteredTasks.length) * 100) : 0;

  return (
    <UserLayout>
      <div className="bg-gradient-to-br from-slate-900 to-sky-900 rounded-3xl p-6 text-white mb-4 shadow-xl shadow-sky-900/40 relative overflow-hidden border border-slate-800">
        <div className="absolute -right-10 -top-10 size-40 bg-sky-400/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h2 className="font-bold text-2xl mb-1 tracking-tight">Active Plan</h2>
          <p className="text-sky-200/70 text-sm font-medium">
            You're managing {registeredNames.length} care {registeredNames.length === 1 ? 'plan' : 'plans'} today.
          </p>
          {hasTasks && (
            <>
              <div className="mt-6 flex items-end justify-between mb-2">
                <span className="text-xs font-bold text-sky-200 uppercase tracking-widest">Global Adherence</span>
                <span className="text-2xl font-black text-white">
                  {adherencePercent}%
                </span>
              </div>
              <div className="h-2.5 bg-black/30 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-700 ease-out" 
                  style={{ width: `${adherencePercent}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-8 pb-10">
        {!hasTasks ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="size-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mb-6">
              <span className="material-symbols-outlined text-[40px]">task_alt</span>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">No Active Tasks</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Register for a care plan in the Disease Library to start tracking your daily progress.
            </p>
            <button 
              onClick={() => navigate('/user/diseases')}
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-slate-950 font-bold rounded-xl hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20"
            >
              Go to Library
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        ) : (
          categories.map(cat => {
            const catTasks = filteredTasks.filter(t => t.category === cat);
            if (catTasks.length === 0) return null;

            return (
              <div key={cat}>
                <div className="flex items-center justify-between mb-4 px-1">
                  <h3 className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <span className="material-symbols-outlined text-[18px] text-sky-400">
                      {cat === 'Morning' ? 'wb_sunny' : cat === 'Afternoon' ? 'partly_cloudy_day' : 'bedtime'}
                    </span>
                    {cat}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                    {catTasks.filter(t => t.completed).length} / {catTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {catTasks.map(task => (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm cursor-pointer hover:border-sky-500/50 transition-all select-none group ${task.completed ? 'opacity-50 grayscale-[0.5]' : ''}`}
                    >
                      <div className={`relative flex items-center justify-center size-12 rounded-xl shrink-0 ${task.color} transition-transform group-active:scale-95`}>
                        <span className="material-symbols-outlined text-[24px]">{task.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className={`text-white font-bold text-base leading-tight truncate ${task.completed ? 'line-through text-slate-500' : ''}`}>{task.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider">{task.time}</p>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${task.conditionColor} border border-white/5`}>
                            {task.condition}
                          </span>
                        </div>
                      </div>
                      <div className={`size-7 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${task.completed ? 'bg-emerald-500 border-emerald-500 scale-110 shadow-lg shadow-emerald-500/20' : 'border-slate-700 bg-slate-800 hover:border-sky-50'}`}>
                        {task.completed && <span className="material-symbols-outlined text-white text-[18px] font-bold">check</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </UserLayout>
  );
};

export default UserTasks;
