
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';

const UserSignup: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    login(email, UserRole.USER, name);
    navigate('/user');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-white dark:bg-background-dark overflow-x-hidden font-display transition-colors duration-200">
      <div className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-white dark:bg-background-dark/95 backdrop-blur-sm max-w-md mx-auto w-full">
        <button 
          onClick={() => navigate('/')}
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-sky-50 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Create Account</h2>
        <div className="size-10"></div> 
      </div>
      <div className="flex flex-col flex-1 px-6 pb-8 max-w-md mx-auto w-full">
        <div className="mb-8 mt-4 text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-sky-100 dark:bg-surface-dark text-primary mb-4">
            <span className="material-symbols-outlined text-[32px]">person_add</span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight mb-3">Join HealthApp</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[280px] mx-auto">
            Start tracking your vitals and managing your care plan today.
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark p-1 border border-transparent dark:border-slate-800/30">
            <div 
              onClick={() => navigate('/login')}
              className="flex-1 cursor-pointer h-full flex items-center justify-center rounded-lg transition-all duration-200">
              <span className="text-sm font-semibold text-slate-500">Log In</span>
            </div>
            <label className="flex-1 cursor-pointer h-full flex items-center justify-center rounded-lg bg-white dark:bg-primary shadow-sm transition-all duration-200">
              <span className="text-sm font-semibold text-primary dark:text-white">Sign Up</span>
            </label>
          </div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col w-full group">
            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-1.5 ml-1">Full Name</span>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 dark:text-slate-500 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">person</span>
              <input 
                className="flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 h-14 pl-12 pr-4 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder="John Doe" 
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </label>
          
          <label className="flex flex-col w-full group">
            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-1.5 ml-1">Email Address</span>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 dark:text-slate-500 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">mail</span>
              <input 
                className="flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 h-14 pl-12 pr-4 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder="name@example.com" 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>

          <label className="flex flex-col w-full group">
            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-1.5 ml-1">Create Password</span>
            <div className="relative flex w-full items-center rounded-xl">
              <span className="absolute left-4 text-slate-400 dark:text-slate-500 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">lock</span>
              <input 
                className="flex w-full min-w-0 flex-1 rounded-xl text-slate-900 dark:text-white bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 h-14 pl-12 pr-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder="Min. 8 characters" 
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </label>

          <div className="flex items-start gap-3 mt-2 px-1">
            <input type="checkbox" required className="mt-1 rounded border-slate-300 text-primary focus:ring-primary h-4 w-4" id="terms" />
            <label htmlFor="terms" className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
              I agree to the <a href="#" className="text-primary font-semibold">Terms of Service</a> and <a href="#" className="text-primary font-semibold">Privacy Policy</a>, including the processing of health data.
            </label>
          </div>

          <button 
            className="mt-6 flex w-full h-14 items-center justify-center rounded-xl bg-primary hover:bg-primary-hover text-white text-base font-bold tracking-wide hover:shadow-lg active:scale-[0.98] transition-all duration-200 shadow-md shadow-sky-500/20" 
            type="submit">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account? <button onClick={() => navigate('/login')} className="text-primary font-bold hover:underline">Log In</button>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
