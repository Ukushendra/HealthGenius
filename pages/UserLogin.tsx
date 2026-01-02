
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { UserRole } from '../types';

const UserLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, UserRole.USER);
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
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">Welcome</h2>
        <div className="size-10"></div> 
      </div>
      <div className="flex flex-col flex-1 px-6 pb-8 max-w-md mx-auto w-full">
        <div className="mb-8 mt-4 text-center">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-sky-100 dark:bg-surface-dark text-primary mb-4">
            <span className="material-symbols-outlined text-[32px]">health_and_safety</span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight mb-3">Manage your health</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[280px] mx-auto">
            Securely access your records and care plan with our sky-high standards.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex h-12 w-full items-center justify-center rounded-xl bg-slate-100 dark:bg-surface-dark p-1 border border-transparent dark:border-slate-800/30">
            <label className="flex-1 cursor-pointer h-full flex items-center justify-center rounded-lg bg-white dark:bg-primary shadow-sm transition-all duration-200">
              <span className="text-sm font-semibold text-primary dark:text-white">Log In</span>
            </label>
            <div 
              onClick={() => navigate('/signup')}
              className="flex-1 cursor-pointer h-full flex items-center justify-center rounded-lg transition-all duration-200">
              <span className="text-sm font-semibold text-slate-500">Sign Up</span>
            </div>
          </div>
        </div>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <label className="flex flex-col w-full group">
            <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal pb-2 ml-1">Email Address</span>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-400 dark:text-slate-500 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">mail</span>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 h-14 pl-12 pr-4 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-normal leading-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder="name@example.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <label className="flex flex-col w-full group">
            <div className="flex justify-between items-center pb-2 ml-1">
              <span className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal">Password</span>
              <a className="text-sm font-medium text-sky-600 dark:text-primary hover:text-sky-700 hover:underline" href="#">Forgot?</a>
            </div>
            <div className="relative flex w-full items-center rounded-xl">
              <span className="absolute left-4 text-slate-400 dark:text-slate-500 material-symbols-outlined text-[20px] group-focus-within:text-primary transition-colors">lock</span>
              <input 
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-slate-900 dark:text-white bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 h-14 pl-12 pr-12 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-normal leading-normal focus:outline-0 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" 
                placeholder="Enter your password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors" type="button">
                <span className="material-symbols-outlined text-[24px]">visibility</span>
              </button>
            </div>
          </label>
          <div className="flex items-center gap-2 px-1 py-1 bg-sky-50 dark:bg-surface-dark/50 p-2 rounded-lg border border-sky-100 dark:border-surface-border/50">
            <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Your data is encrypted and HIPAA compliant.</p>
          </div>
          <button 
            className="mt-4 flex w-full h-14 items-center justify-center rounded-xl bg-primary hover:bg-primary-hover text-white text-base font-bold tracking-wide hover:shadow-lg active:scale-[0.98] transition-all duration-200 shadow-md shadow-sky-500/20" 
            type="submit">
            Log In
          </button>
        </form>
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
          </div>
          <div className="relative bg-white dark:bg-background-dark px-4">
            <span className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500 tracking-wider">Or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:bg-sky-50 dark:hover:bg-slate-700 hover:border-primary/30 transition-all duration-200">
            <span className="text-slate-900 dark:text-white material-symbols-outlined text-[20px]">smartphone</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Apple</span>
          </button>
          <button className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-surface-dark hover:bg-sky-50 dark:hover:bg-slate-700 hover:border-primary/30 transition-all duration-200">
            <span className="font-bold text-[10px] leading-none bg-slate-900 text-white rounded-full p-1">G</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
