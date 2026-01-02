
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden font-display text-text-main bg-background">
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col w-full">
          <div className="h-12 w-full bg-transparent"></div>
          <div className="flex justify-center items-center py-4 px-4">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-xl bg-primary shadow-lg shadow-sky-900/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-900 text-xl font-bold">bolt</span>
              </div>
              <span className="text-xl font-black tracking-tighter text-text-main italic">Health<span className="text-primary">Genius</span></span>
            </div>
          </div>
          <div className="w-full px-5 pt-4 pb-6 max-w-md mx-auto">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-surface shadow-soft" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5UOg7aRvLwv1373AKabXd4ULBDnAziMkYbIpZu3aWlWMywiiZ71c3iylmwNKkfBMQ6W6A-O3uN3bCKKnXW0rbe8dK7I9FHjpieNgFKSEM22CjHLwCv65B9shLbWJrOpk7Ai1uCjfnIMjy1z0QzmaUM89n2KbPvADcOxGXz4gaYBIbhVPKPxAlw1A_7qveyucU9RNI3Zm6565FIICReH4egCqF8LfTktpLYPkjM3vnR3lMTWrhKJM8fKo9EKuu8z4KUxEHjQBpOqw")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f172a]"></div>
              <div className="absolute top-6 right-6 p-3 bg-surface/90 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col gap-1 shadow-xl shadow-black/40 max-w-[130px]">
                <div className="flex items-center gap-1.5 text-primary">
                  <span className="material-symbols-outlined text-base">vital_signs</span>
                  <span className="text-xs font-bold text-text-muted uppercase tracking-wider">System</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-bold text-text-main">Optimum</span>
                  <span className="material-symbols-outlined text-primary text-xl mb-0.5">verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-8 pb-10 pt-2 bg-transparent max-w-md mx-auto w-full">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-5">
              <span className="text-xs font-semibold text-primary uppercase tracking-wide">Next-Gen Care Management</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.2] mb-4 text-text-main">
              The Genius way to<br/>
              <span className="text-primary tracking-tighter">manage your health.</span>
            </h1>
            <p className="text-base md:text-lg text-text-muted font-normal leading-relaxed max-w-xs mx-auto">
              Smarter protocols, automated tracking, and direct admin oversight. Experience HealthGenius.
            </p>
          </div>
          <div className="flex flex-col gap-3.5 w-full">
            <button 
              onClick={() => navigate('/signup')}
              className="group relative flex h-14 w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-primary shadow-lg shadow-sky-900/30 transition-all hover:bg-primary-hover active:scale-[0.98]">
              <span className="relative z-10 text-base font-bold tracking-wide text-slate-900">Start Your Journey</span>
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-2xl bg-surface border border-slate-700 text-white font-semibold transition-colors hover:bg-slate-700 hover:border-slate-600 active:scale-[0.98]">
              <span className="truncate">Patient Login</span>
            </button>
            <button 
              onClick={() => navigate('/admin-login')}
              className="mt-2 text-[10px] text-text-muted hover:text-primary transition-all text-center font-black uppercase tracking-[0.2em]">
              Admin Gate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
