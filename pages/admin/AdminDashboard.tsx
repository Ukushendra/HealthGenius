
import React from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard: React.FC = () => {
  return (
    <AdminLayout title="System Overview">
      <section>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Patients', value: '12.5k', change: '+12%', icon: 'group', color: 'bg-sky-500/10 text-sky-400' },
            { label: 'Active Care Plans', value: '8,430', change: '+5%', icon: 'check_circle', color: 'bg-emerald-500/10 text-emerald-400' },
            { label: 'Health Alerts', value: '24', change: '+2', icon: 'warning', color: 'bg-amber-500/10 text-amber-400' },
            { label: 'Pending Reports', value: '156', change: '+8%', icon: 'forum', color: 'bg-indigo-500/10 text-indigo-400' }
          ].map(stat => (
            <div key={stat.label} className="bg-slate-900/80 p-4 rounded-3xl border border-slate-800 shadow-xl shadow-black/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg ${stat.color}`}>
                  <span className="material-symbols-outlined text-[20px]">{stat.icon}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-[10px] font-bold text-emerald-400 mb-1 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[12px] font-bold">trending_up</span>
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Quick Actions</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {[
            { label: 'Add Patient', icon: 'person_add', primary: true },
            { label: 'Broadcast', icon: 'campaign' },
            { label: 'Policies', icon: 'policy' },
            { label: 'Backups', icon: 'database' }
          ].map(action => (
            <button key={action.label} className="flex flex-col items-center gap-2 min-w-[84px] group">
              <div className={`size-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 ${action.primary ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30' : 'bg-slate-900 border border-slate-800 text-slate-300'}`}>
                <span className="material-symbols-outlined text-[28px] font-bold">{action.icon}</span>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter group-hover:text-white transition-colors">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="flex-1">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-xs font-black uppercase tracking-widest text-slate-500">Recent Admissions</h2>
          <button className="text-[10px] font-black uppercase tracking-widest text-sky-400 hover:text-sky-300">Detailed View</button>
        </div>
        <div className="bg-slate-900/50 rounded-3xl border border-slate-800 shadow-2xl divide-y divide-slate-800/50">
          {[
            { name: 'Sarah Miller', id: '#8492', status: 'Active', avatar: 'https://picsum.photos/seed/1/100/100', plan: 'Diabetes Care' },
            { name: 'James K.', id: '#8493', status: 'Pending', avatar: 'https://picsum.photos/seed/2/100/100', plan: 'Hypertension' },
            { name: 'Linda Ross', id: '#8494', status: 'Active', avatar: 'https://picsum.photos/seed/3/100/100', plan: 'Asthma Log' }
          ].map(user => (
            <div key={user.id} className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full border-2 border-slate-700 overflow-hidden bg-slate-800">
                   <img src={user.avatar} alt="" className="size-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-black text-white">{user.name}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{user.id} • {user.plan}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                {user.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminDashboard;
