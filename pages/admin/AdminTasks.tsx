
import React, { useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../App';

const AdminTasks: React.FC = () => {
  const { masterDiseases, addDisease } = useAuth();
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [name, setName] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [taskInput, setTaskInput] = useState('');
  const [tasksList, setTasksList] = useState<string[]>([]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasksList([...tasksList, taskInput.trim()]);
      setTaskInput('');
    }
  };

  const removeTask = (index: number) => {
    setTasksList(tasksList.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || tasksList.length === 0) return;

    addDisease({
      name,
      severity,
      tasks: tasksList
    });

    // Reset and Close
    setName('');
    setSeverity('Medium');
    setTasksList([]);
    setShowForm(false);
  };

  return (
    <AdminLayout title="Disease Management">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-white mb-1">Disease Library</h2>
        <p className="text-slate-500 text-sm">Define care plans and required tasks for specific conditions.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="flex flex-col p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20">
          <span className="text-2xl font-bold text-sky-400">{masterDiseases.length}</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Total Diseases</span>
        </div>
        <div className="flex flex-col p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-2xl font-bold text-emerald-400">9</span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Avg Tasks / Day</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Disease Registry</h3>
          <button className="text-xs font-bold text-sky-400">Manage Categories</button>
        </div>
        
        {masterDiseases.map(disease => (
          <div key={disease.id} className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden hover:border-sky-500/30 transition-all shadow-sm">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="size-12 rounded-2xl bg-slate-800 flex items-center justify-center text-sky-400">
                    <span className="material-symbols-outlined text-[28px]">clinical_notes</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-0.5">{disease.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase">{disease.severity} Severity</span>
                      <span className={`size-2 rounded-full ${disease.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      <span className="text-[10px] font-medium text-slate-500">{disease.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Management Tasks</p>
                <div className="flex flex-wrap gap-2">
                  {disease.tasks.map((task, idx) => (
                    <span key={idx} className="text-[10px] font-medium px-2 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                      {task}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                <p className="text-xs text-slate-500"><span className="text-white font-bold">{disease.tasks.length}</span> Tasks configured</p>
                <button className="flex items-center gap-1 text-xs font-bold text-sky-400">
                  Manage Details <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 right-6 size-14 rounded-full bg-sky-500 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 border-4 border-slate-950"
      >
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>

      {/* Create Disease Form Overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-full duration-500 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Create Disease Entry</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-500 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Disease Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800 border-slate-700 rounded-xl text-white focus:ring-sky-500 text-sm h-12"
                  placeholder="e.g. Asthma Flare-up Management"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Severity Level</label>
                <select 
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full bg-slate-800 border-slate-700 rounded-xl text-white focus:ring-sky-500 text-sm h-12"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Management Tasks</label>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text" 
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    className="flex-1 bg-slate-800 border-slate-700 rounded-xl text-white focus:ring-sky-500 text-sm h-12"
                    placeholder="e.g. Morning Inhaler"
                  />
                  <button 
                    type="button"
                    onClick={handleAddTask}
                    className="size-12 bg-sky-500 text-white rounded-xl flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
                
                <div className="space-y-2">
                  {tasksList.map((t, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800 rounded-xl border border-slate-700">
                      <span className="text-sm text-white">{t}</span>
                      <button type="button" onClick={() => removeTask(idx)} className="text-rose-400">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  ))}
                  {tasksList.length === 0 && (
                    <p className="text-xs text-slate-600 text-center py-4 border-2 border-dashed border-slate-800 rounded-xl">
                      Add at least one task to create disease plan
                    </p>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={!name || tasksList.length === 0}
                className="w-full py-4 bg-sky-500 hover:bg-sky-400 disabled:bg-slate-700 text-slate-950 font-bold rounded-xl transition-all uppercase tracking-widest text-sm shadow-lg shadow-sky-500/20"
              >
                Launch Disease Plan
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminTasks;
