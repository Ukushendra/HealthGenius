
import React, { useMemo } from 'react';
import UserLayout from '../../components/UserLayout';
import { useAuth } from '../../App';
import { useNavigate } from 'react-router-dom';

const UserHistory: React.FC = () => {
  const { user, tasks } = useAuth();
  const navigate = useNavigate();

  const registeredDiseases = user?.registeredDiseases || [];
  const dailyTaskCount = tasks.filter(t => registeredDiseases.includes(t.condition)).length;

  // Generate 15 days of historical data
  const historyData = useMemo(() => {
    const days = [];
    const now = new Date();
    
    for (let i = 0; i < 15; i++) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = date.getDate();
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });

      // Simulate completions: high completion for recent days, random for older
      // If i == 0, it's today (we'll show current stats)
      let completed;
      if (i === 0) {
        completed = tasks.filter(t => registeredDiseases.includes(t.condition) && t.completed).length;
      } else {
        // Mock data logic: 70-100% completion for a "healthy" user
        const variance = Math.floor(Math.random() * 3);
        completed = Math.max(0, dailyTaskCount - variance);
      }

      days.push({
        id: i,
        date: `${dayName}, ${monthName} ${dayNum}`,
        completed,
        total: dailyTaskCount,
        isToday: i === 0
      });
    }
    return days;
  }, [tasks, registeredDiseases, dailyTaskCount]);

  const totalCompletions = historyData.reduce((acc, day) => acc + day.completed, 0);
  const totalPossible = historyData.reduce((acc, day) => acc + day.total, 0);
  const avgAdherence = totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0;

  return (
    <UserLayout>
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white mb-1">Activity Log</h2>
        <p className="text-slate-500 text-sm">Reviewing your progress over the last 15 days.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Logs</p>
          <p className="text-2xl font-bold text-white">{totalCompletions}</p>
          <p className="text-[10px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">trending_up</span>
            Consistent
          </p>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Adherence</p>
          <p className="text-2xl font-bold text-white">{avgAdherence}%</p>
          <p className="text-[10px] text-sky-400 font-medium mt-1">15-day average</p>
        </div>
      </div>

      {/* History Timeline */}
      <div className="space-y-4">
        {registeredDiseases.length === 0 ? (
          <div className="bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl p-10 text-center">
            <div className="size-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 mx-auto mb-4">
              <span className="material-symbols-outlined text-[32px]">history_toggle_off</span>
            </div>
            <h3 className="text-white font-bold mb-2">No Care Plans Active</h3>
            <p className="text-slate-500 text-sm mb-6">Enroll in a condition to start logging your health journey.</p>
            <button 
              onClick={() => navigate('/user/diseases')}
              className="px-6 py-3 bg-sky-500 text-slate-950 font-bold rounded-xl hover:bg-sky-400 transition-all"
            >
              Browse Library
            </button>
          </div>
        ) : (
          historyData.map((day) => {
            const percent = day.total > 0 ? (day.completed / day.total) * 100 : 0;
            const isFull = percent === 100;
            const isLow = percent < 50;

            return (
              <div 
                key={day.id} 
                className={`group flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border transition-all ${day.isToday ? 'border-sky-500 ring-1 ring-sky-500/20' : 'border-slate-800 hover:border-slate-700'}`}
              >
                <div className="flex flex-col items-center justify-center size-12 shrink-0 rounded-xl bg-slate-800 border border-slate-700 group-hover:bg-slate-700 transition-colors">
                  <span className={`text-xs font-bold ${day.isToday ? 'text-sky-400' : 'text-slate-400'}`}>
                    {day.date.split(',')[0]}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <h4 className="text-white font-bold text-sm truncate">
                      {day.isToday ? 'Today' : day.date.split(',')[1]}
                    </h4>
                    <span className={`text-[10px] font-bold ${isFull ? 'text-emerald-400' : isLow ? 'text-rose-400' : 'text-sky-400'}`}>
                      {day.completed} / {day.total} Tasks
                    </span>
                  </div>
                  
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-700 ${isFull ? 'bg-emerald-500' : isLow ? 'bg-rose-500' : 'bg-sky-500'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="shrink-0 flex items-center justify-center">
                   {isFull ? (
                     <span className="material-symbols-outlined text-emerald-500 filled text-[24px]">verified</span>
                   ) : (
                     <span className="material-symbols-outlined text-slate-700 text-[24px]">chevron_right</span>
                   )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="py-10 text-center">
        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">End of 15-day period</p>
      </div>
    </UserLayout>
  );
};

export default UserHistory;
