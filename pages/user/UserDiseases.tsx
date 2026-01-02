
import React, { useState } from 'react';
import UserLayout from '../../components/UserLayout';
import { useAuth } from '../../App';
import { useNavigate } from 'react-router-dom';

const UserDiseases: React.FC = () => {
  const { user, toggleDisease } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const diseases = [
    { 
      id: 1, 
      title: 'Diabetes Type 2', 
      desc: 'A chronic condition that affects the way the body processes blood sugar (glucose).', 
      cat: 'Metabolic', 
      tag: 'Common', 
      icon: 'bloodtype', 
      color: 'bg-sky-500/10 text-sky-400',
      progress: 65,
      tasks: [
        { id: 't1', title: 'Metformin 500mg', impact: 'Lowers glucose production in the liver.' },
        { id: 't2', title: 'Daily 30m Walk', impact: 'Increases insulin sensitivity.' },
        { id: 't3', title: 'Carb Counting', impact: 'Prevents blood sugar spikes.' }
      ]
    },
    { 
      id: 2, 
      title: 'Hypertension', 
      desc: 'High blood pressure is a common condition that affects the body\'s arteries.', 
      cat: 'Cardiovascular', 
      tag: 'Critical', 
      icon: 'favorite', 
      color: 'bg-rose-500/10 text-rose-400',
      progress: 40,
      tasks: [
        { id: 't4', title: 'BP Measurement', impact: 'Monitors management effectiveness.' },
        { id: 't5', title: 'Low Sodium Meal', impact: 'Reduces fluid retention and pressure.' },
        { id: 't6', title: 'Stress Meditation', impact: 'Lowers cortisol and heart rate.' }
      ]
    },
    { 
      id: 3, 
      title: 'Asthma', 
      desc: 'A condition in which your airways narrow and swell and may produce extra mucus.', 
      cat: 'Respiratory', 
      tag: '', 
      icon: 'air', 
      color: 'bg-indigo-500/10 text-indigo-400',
      progress: 90,
      tasks: [
        { id: 't7', title: 'Peak Flow Check', impact: 'Early warning of airway narrowing.' },
        { id: 't8', title: 'Inhaler Prep', impact: 'Ensures immediate symptom relief.' }
      ]
    },
    { 
      id: 4, 
      title: 'Migraine', 
      desc: 'A headache of varying intensity, often accompanied by nausea and sensitivity to light.', 
      cat: 'Neurological', 
      tag: '', 
      icon: 'psychology', 
      color: 'bg-emerald-500/10 text-emerald-400',
      progress: 20,
      tasks: [
        { id: 't9', title: 'Hydration Log', impact: 'Reduces common vascular triggers.' },
        { id: 't10', title: 'Sleep Routine', impact: 'Regulates neurological sensitivity.' }
      ]
    },
  ];

  const filtered = diseases.filter(d => 
    d.title.toLowerCase().includes(search.toLowerCase()) || 
    d.cat.toLowerCase().includes(search.toLowerCase())
  );

  const isRegistered = (title: string) => user?.registeredDiseases?.includes(title);

  return (
    <UserLayout>
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white mb-1">Diseases & Conditions</h2>
        <p className="text-slate-500 text-sm">Find and enroll in care plans tailored to your health needs.</p>
      </div>

      <div className="sticky top-[140px] z-20 pb-2 bg-slate-950/50 backdrop-blur-sm">
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 material-symbols-outlined text-[20px]">search</span>
          <input 
            className="flex w-full min-w-0 flex-1 rounded-2xl text-white bg-slate-900 border border-slate-800 h-12 pl-12 pr-4 placeholder:text-slate-500 text-sm focus:outline-0 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all duration-200" 
            placeholder="Search conditions, symptoms..." 
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map(d => {
          const enrolled = isRegistered(d.title);
          return (
            <div key={d.id} className={`group relative flex flex-col bg-slate-900 rounded-2xl p-5 border transition-all duration-300 shadow-sm ${enrolled ? 'border-sky-500/50 ring-1 ring-sky-500/20' : 'border-slate-800 hover:border-sky-500/30'}`}>
              {enrolled && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase tracking-wider border border-sky-500/20">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Enrolled
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div className={`flex items-center justify-center size-14 rounded-2xl ${d.color} shadow-inner`}>
                  <span className="material-symbols-outlined text-[32px]">{d.icon}</span>
                </div>
              </div>
              
              <h3 className="text-white text-xl font-bold mb-1 group-hover:text-sky-400 transition-colors">{d.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{d.desc}</p>
              
              {selectedId === d.id ? (
                <div className="mt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">assignment_turned_in</span>
                      Management Tasks
                    </h4>
                    <div className="space-y-3">
                      {d.tasks.map(task => (
                        <div key={task.id} className="flex flex-col gap-0.5">
                          <p className="text-sm font-bold text-white flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-sky-500"></span>
                            {task.title}
                          </p>
                          <p className="text-xs text-slate-400 ml-3.5 italic">{task.impact}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => toggleDisease(d.title)}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${enrolled ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20' : 'bg-sky-50 text-slate-950 hover:bg-sky-400 shadow-lg shadow-sky-500/20'}`}
                    >
                      {enrolled ? 'Stop Care Plan' : 'Start Care Plan'}
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                      className="px-4 py-3 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-700 transition-colors uppercase tracking-widest"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-4">
                  <span className="text-xs font-medium text-slate-500">{d.cat} • Chronic</span>
                  <button 
                    onClick={() => setSelectedId(d.id)}
                    className="flex items-center gap-1.5 text-sm font-bold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    View & Register
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </UserLayout>
  );
};

export default UserDiseases;
