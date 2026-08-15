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
    <div className="relative min-h-screen w-full flex flex-col justify-between select-none bg-[#0a192f] overflow-hidden">
      
      {/* Full-bleed Hero Train Background with Deep Navy Scrim */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transform transition-transform duration-10000 ease-out"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1532103054090-a33923a7c120?q=80&w=2000&auto=format&fit=crop')`,
        }}
      />
      {/* Heavy Navy Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F2C5C]/90 via-[#0F2C5C]/85 to-[#071733]/95" />

      {/* Top Header Logos */}
      <header className="relative z-10 p-8 flex items-center justify-between">
        {/* Top-Left: Amogh Rail */}
        <div className="flex items-center gap-2.5">
          <div className="flex flex-col gap-0.5 text-white">
            <div className="w-4 h-[2.5px] bg-white"></div>
            <div className="w-4 h-[2.5px] bg-white"></div>
          </div>
          <span className="font-bold text-sm tracking-[0.2em] text-white uppercase">
            AMOGH RAIL
          </span>
        </div>

        {/* Top-Right: Indian Railways Authority */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#1E7F4F] animate-pulse"></div>
          <span className="font-mono text-[11px] tracking-wider text-slate-300 uppercase">
            INDIAN RAILWAYS · CENTRAL TRAFFIC CONTROL
          </span>
        </div>
      </header>

      {/* Centered Login Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-[rgba(15,44,92,0.15)] shadow-2xl p-8 rounded-none">
          
          {/* Card Header & Tabs */}
          <div className="mb-6">
            <div className="flex border-b border-[rgba(15,44,92,0.10)] mb-5">
              <button
                type="button"
                onClick={() => setIsSignIn(true)}
                className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors relative flex-1 text-center ${
                  isSignIn 
                    ? 'text-[#0F2C5C] border-b-2 border-[#0F2C5C]' 
                    : 'text-[#5B6478] hover:text-[#0F2C5C]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignIn(false)}
                className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors relative flex-1 text-center ${
                  !isSignIn 
                    ? 'text-[#0F2C5C] border-b-2 border-[#0F2C5C]' 
                    : 'text-[#5B6478] hover:text-[#0F2C5C]'
                }`}
              >
                Create Account
              </button>
            </div>

            <h2 className="text-lg font-semibold text-[#0F2C5C]">
              {isSignIn ? 'Traffic Controller Sign In' : 'Register Terminal Operator'}
            </h2>
            <p className="text-xs text-[#5B6478] mt-1">
              {isSignIn 
                ? 'Enter your IR-CAD credentials to access real-time dispatch.' 
                : 'Request Northern Zone control room operator authorization.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[#5B6478] mb-1 font-sans">
                Official Email / Employee ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@railways.gov.in"
                  className="w-full h-10 px-3 pl-9 text-xs font-mono text-[#0F2C5C] bg-[#F8F9FA] border border-[rgba(15,44,92,0.15)] focus:border-[#0F2C5C] focus:bg-white focus:outline-none transition-colors"
                />
                <Mail className="w-4 h-4 text-[#5B6478] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#5B6478] font-sans">
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
                  className="w-full h-10 px-3 pl-9 text-xs font-mono text-[#0F2C5C] bg-[#F8F9FA] border border-[rgba(15,44,92,0.15)] focus:border-[#0F2C5C] focus:bg-white focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-[#5B6478] absolute left-3 top-3" />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#0F2C5C] border-[rgba(15,44,92,0.2)] rounded-none focus:ring-0"
                />
                <span className="text-xs text-[#5B6478]">Remember this terminal</span>
              </label>
            </div>

            {/* Primary Orange CTA Button */}
            <button
              type="submit"
              className="w-full h-11 bg-[#F5821F] hover:bg-[#e0751a] text-white font-medium text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm mt-2"
            >
              <span>{isSignIn ? 'Sign In to Control Room' : 'Submit Operator Request'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[rgba(15,44,92,0.10)]"></div>
              </div>
              <span className="relative px-3 bg-white text-[10px] uppercase font-mono tracking-widest text-[#5B6478]">
                OR ENTERPRISE AUTH
              </span>
            </div>

            {/* SSO Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => login('arjun.sharma@railways.gov.in', '')}
                className="h-9 px-2 border border-[rgba(15,44,92,0.15)] bg-[#F8F9FA] hover:bg-slate-100 text-[#0F2C5C] text-[11px] font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Google SSO</span>
              </button>
              <button
                type="button"
                onClick={() => login('arjun.sharma@railways.gov.in', '')}
                className="h-9 px-2 border border-[rgba(15,44,92,0.15)] bg-[#F8F9FA] hover:bg-slate-100 text-[#0F2C5C] text-[11px] font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>IR-Gov Auth</span>
              </button>
            </div>

          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-4 border-t border-[rgba(15,44,92,0.08)] flex items-center gap-2 text-[10px] font-mono text-[#5B6478]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1E7F4F] shrink-0" />
            <span>SECURE TERMINAL · 256-BIT ENCRYPTION · LEVEL 4 CAD</span>
          </div>

        </div>
      </main>

      {/* Bottom Disclaimer */}
      <footer className="relative z-10 p-4 text-center">
        <span className="font-mono text-[10px] text-slate-400">
          FOR AUTHORIZED INDIAN RAILWAYS DISPATCH PERSONNEL ONLY · UNAUTHORIZED ACCESS IS PROHIBITED
        </span>
      </footer>

    </div>
  );
};
