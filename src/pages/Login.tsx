import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('arjun.sharma@railways.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [remember, setRemember] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-[#0f172a] select-none overflow-hidden transition-colors">
      
      {/* Left Column: Login Section */}
      <div className="w-full lg:w-[40%] flex flex-col justify-between relative z-10 bg-white dark:bg-[#111827] shadow-2xl transition-colors">
        
        {/* Top Header Logos - Left Side */}
        <header className="p-8 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Amogh Rail Logo" className="h-16 w-auto object-contain drop-shadow-sm" />
            <span className="font-bold text-2xl tracking-[0.2em] text-[#0F2C5C] dark:text-white uppercase drop-shadow-sm transition-colors">
              AMOGH RAIL
            </span>
          </div>
        </header>

        {/* Centered Login Card */}
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md bg-white dark:bg-[#1E293B] border border-[rgba(15,44,92,0.15)] dark:border-white/10 shadow-xl p-8 rounded-sm transition-colors">
            
            {/* Card Header & Tabs */}
            <div className="mb-6">
              <div className="flex border-b border-[rgba(15,44,92,0.10)] dark:border-white/10 mb-5 transition-colors">
                <button
                  type="button"
                  onClick={() => setIsSignIn(true)}
                  className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors relative flex-1 text-center ${
                    isSignIn 
                      ? 'text-[#0F2C5C] dark:text-white border-b-2 border-[#0F2C5C] dark:border-white' 
                      : 'text-[#5B6478] dark:text-gray-400 hover:text-[#0F2C5C] dark:hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignIn(false)}
                  className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors relative flex-1 text-center ${
                    !isSignIn 
                      ? 'text-[#0F2C5C] dark:text-white border-b-2 border-[#0F2C5C] dark:border-white' 
                      : 'text-[#5B6478] dark:text-gray-400 hover:text-[#0F2C5C] dark:hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <h2 className="text-lg font-semibold text-[#0F2C5C] dark:text-white transition-colors">
                {isSignIn ? 'Traffic Controller Sign In' : 'Register Terminal Operator'}
              </h2>
              <p className="text-xs text-[#5B6478] dark:text-gray-400 mt-1 transition-colors">
                {isSignIn 
                  ? 'Enter your IR-CAD credentials to access real-time dispatch.' 
                  : 'Request Northern Zone control room operator authorization.'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#5B6478] dark:text-gray-400 mb-1 font-sans transition-colors">
                  Official Email / Employee ID
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@railways.gov.in"
                    className="w-full h-10 px-3 pl-9 text-xs font-mono text-[#0F2C5C] dark:text-white bg-[#F8F9FA] dark:bg-[#0f172a] border border-[rgba(15,44,92,0.15)] dark:border-white/10 focus:border-[#0F2C5C] dark:focus:border-white focus:bg-white dark:focus:bg-[#1E293B] focus:outline-none transition-colors"
                  />
                  <Mail className="w-4 h-4 text-[#5B6478] dark:text-gray-400 absolute left-3 top-3 transition-colors" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#5B6478] dark:text-gray-400 font-sans transition-colors">
                    Password
                  </label>
                  {isSignIn && (
                    <a href="#forgot" className="text-[11px] text-[#2F5FD1] hover:underline">
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-10 px-3 pl-9 text-xs font-mono text-[#0F2C5C] dark:text-white bg-[#F8F9FA] dark:bg-[#0f172a] border border-[rgba(15,44,92,0.15)] dark:border-white/10 focus:border-[#0F2C5C] dark:focus:border-white focus:bg-white dark:focus:bg-[#1E293B] focus:outline-none transition-colors"
                  />
                  <Lock className="w-4 h-4 text-[#5B6478] dark:text-gray-400 absolute left-3 top-3 transition-colors" />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-3.5 h-3.5 text-[#0F2C5C] dark:text-slate-700 border-[rgba(15,44,92,0.2)] dark:border-white/20 rounded-none focus:ring-0"
                  />
                  <span className="text-xs text-[#5B6478] dark:text-gray-400 transition-colors">Remember this terminal</span>
                </label>
              </div>

              {/* Primary Orange CTA Button */}
              <button
                type="submit"
                className="w-full h-11 bg-[#0F2C5C] dark:bg-[#334155] hover:bg-[#1a3d7c] dark:hover:bg-slate-600 text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm mt-2"
              >
                <span>{isSignIn ? 'Sign In to Control Room' : 'Submit Operator Request'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[rgba(15,44,92,0.10)] dark:border-white/10"></div>
                </div>
                <span className="relative px-3 bg-white dark:bg-[#1E293B] text-[10px] uppercase font-mono tracking-widest text-[#5B6478] dark:text-gray-500 transition-colors">
                  OR ENTERPRISE AUTH
                </span>
              </div>

              {/* SSO Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => login('arjun.sharma@railways.gov.in', '')}
                  className="h-9 px-2 border border-[rgba(15,44,92,0.15)] dark:border-white/10 bg-[#F8F9FA] dark:bg-[#0f172a] hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F2C5C] dark:text-gray-300 text-[11px] font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Google SSO</span>
                </button>
                <button
                  type="button"
                  onClick={() => login('arjun.sharma@railways.gov.in', '')}
                  className="h-9 px-2 border border-[rgba(15,44,92,0.15)] dark:border-white/10 bg-[#F8F9FA] dark:bg-[#0f172a] hover:bg-slate-100 dark:hover:bg-slate-800 text-[#0F2C5C] dark:text-gray-300 text-[11px] font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>IR-Gov Auth</span>
                </button>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-6 pt-4 border-t border-[rgba(15,44,92,0.08)] dark:border-white/10 flex items-center gap-2 text-[10px] font-mono text-[#5B6478] dark:text-gray-500 transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1E7F4F] dark:text-[#4ade80] shrink-0" />
              <span>SECURE TERMINAL · 256-BIT ENCRYPTION</span>
            </div>

          </div>
        </main>
      </div>

      {/* Right Column: Train Image Background */}
      <div className="hidden lg:block lg:w-[60%] relative">
        <div 
          className="absolute inset-0 bg-cover bg-[80%_center]"
          style={{ backgroundImage: `url('/train_bg.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20" />
        
        {/* Top-Right: Team Logo */}
        <div className="absolute top-8 right-8 flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 shadow-lg">
          <img src="/team_logo.png" alt="Team Logo" className="h-10 w-auto object-contain drop-shadow-lg" />
        </div>

        {/* Bottom Disclaimer */}
        <div className="absolute bottom-6 right-8 text-right">
          <span className="font-mono text-[10px] text-white bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm">
            FOR AUTHORIZED INDIAN RAILWAYS DISPATCH PERSONNEL ONLY
          </span>
        </div>
      </div>

    </div>
  );
};
