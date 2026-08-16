import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, Key, RefreshCw } from 'lucide-react';

interface LoginProps {
  onBack?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onBack }) => {
  const { login, loginWithGoogle, isGoogleLoading } = useAuth();
  const [step, setStep] = useState<'login' | '2fa'>('login');
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState('arjun.sharma@railways.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [remember, setRemember] = useState(true);
  const [pin, setPin] = useState(['', '', '', '', '', '']);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('2fa');
  };

  const handle2FASubmit = () => {
    if (pin.join('') === '262026') {
      login(email, password);
    } else {
      alert("Invalid PIN. Use 262026 for demo.");
    }
  };

  const autofill = () => {
    setPin(['2', '6', '2', '0', '2', '6']);
  };

  return (
    <div className="h-screen w-full flex relative select-none overflow-hidden bg-slate-900 text-white font-sans">
      
      {/* Full-screen Bright Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-[80%_center] z-0"
        style={{ backgroundImage: `url('/train_bg.jpg')` }}
      />
      
      {/* Very subtle gradient on the right side for the bottom disclaimer visibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0 pointer-events-none" />
      
      {/* Top-Right: Team Logo */}
      <div className="hidden lg:flex absolute top-6 right-8 z-20 items-center gap-3 bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl px-5 py-3 shadow-xl transition-all hover:bg-white hover:scale-105">
        <img src="/team_logo.png" alt="Hexaverse Team Logo" className="h-10 w-auto object-contain" />
        <div className="flex flex-col border-l border-gray-300 pl-3">
          <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">Developed By</span>
          <span className="text-sm font-extrabold text-[#0F2C5C] tracking-wide">HEXAVERSE</span>
        </div>
      </div>

      {/* Bottom Disclaimer */}
      <div className="hidden lg:block absolute bottom-6 right-8 z-20 text-right">
        <span className="font-mono text-[10px] text-white/90 bg-black/40 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/20 shadow-lg">
          FOR AUTHORIZED INDIAN RAILWAYS DISPATCH PERSONNEL ONLY
        </span>
      </div>
      
      {/* Left Column: Glassmorphic Login Section */}
      <div className="w-full lg:w-[420px] xl:w-[480px] flex flex-col h-full relative z-10 bg-black/60 backdrop-blur-2xl border-r border-white/20 shadow-[20px_0_40px_rgba(0,0,0,0.3)]">
        
        {/* Header */}
        <header className="px-8 pt-10 pb-2 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Amogh Rail Logo" className="h-12 w-auto object-contain drop-shadow-md" />
            <span className="font-bold text-2xl tracking-[0.2em] text-white uppercase drop-shadow-md">
              AMOGH RAIL
            </span>
          </div>
          {onBack && step === 'login' && (
            <button 
              onClick={onBack}
              className="p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
              title="Back to Landing Page"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          {step === '2fa' && (
            <button 
              onClick={() => setStep('login')}
              className="p-2 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full"
              title="Back to Login"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
        </header>

        {/* Centered Login Card - Pushed slightly upwards */}
        <main className="flex-1 w-full px-8 pt-2 pb-6 flex flex-col justify-start items-center">
          
          {step === 'login' ? (
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-6 rounded-3xl mt-4">
              
              {/* Card Header & Tabs */}
              <div className="mb-5">
                <div className="flex border-b border-white/20 mb-4">
                  <button
                    type="button"
                    onClick={() => setIsSignIn(true)}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all relative flex-1 text-center ${
                      isSignIn 
                        ? 'text-white border-b-2 border-blue-400 drop-shadow-md' 
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignIn(false)}
                    className={`pb-2 text-xs font-bold uppercase tracking-wider transition-all relative flex-1 text-center ${
                      !isSignIn 
                        ? 'text-white border-b-2 border-blue-400 drop-shadow-md' 
                        : 'text-white/50 hover:text-white/80'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <h2 className="text-xl font-bold text-white drop-shadow-sm">
                  {isSignIn ? 'Cluster Controller' : 'Register Operator'}
                </h2>
                <p className="text-[11px] text-white/70 mt-1.5 leading-relaxed">
                  {isSignIn 
                    ? 'Enter your IR-CAD credentials to access real-time dispatch.' 
                    : 'Request Northern Zone control room operator authorization.'}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-white/80 mb-1.5 ml-1">
                    Official Email / Employee ID
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@railways.gov.in"
                      className="w-full h-10 px-4 pl-10 text-xs font-medium text-white bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl focus:border-blue-400 focus:bg-black/40 focus:ring-1 focus:ring-blue-400 outline-none transition-all placeholder-white/40 shadow-inner"
                    />
                    <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5 ml-1 mr-1">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-white/80">
                      Password
                    </label>
                    {isSignIn && (
                      <a href="#forgot" className="text-[10px] font-medium text-blue-300 hover:text-blue-200 transition-colors">
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
                      className="w-full h-10 px-4 pl-10 text-xs font-medium text-white bg-black/20 backdrop-blur-sm border border-white/20 rounded-xl focus:border-blue-400 focus:bg-black/40 focus:ring-1 focus:ring-blue-400 outline-none transition-all shadow-inner"
                    />
                    <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-3" />
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center pt-1 ml-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative flex items-center justify-center w-4 h-4">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(e) => setRemember(e.target.checked)}
                        className="peer w-4 h-4 appearance-none bg-black/20 border border-white/30 rounded checked:bg-blue-500 checked:border-blue-500 transition-colors focus:outline-none cursor-pointer"
                      />
                      <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium text-white/80 group-hover:text-white transition-colors">Remember this terminal</span>
                  </label>
                </div>

                {/* Primary CTA Button */}
                <button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] mt-2"
                >
                  <span>{isSignIn ? 'Sign In to Control Room' : 'Submit Operator Request'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Divider */}
                <div className="relative my-5 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <span className="relative px-3 bg-transparent text-[9px] font-bold uppercase tracking-widest text-white/50 backdrop-blur-sm">
                    OR ENTERPRISE AUTH
                  </span>
                </div>

                {/* SSO Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    disabled={isGoogleLoading}
                    className="h-10 px-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-wait"
                  >
                    {isGoogleLoading ? (
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-3.5 h-3.5" />
                    )}
                    <span>{isGoogleLoading ? 'Signing in...' : 'Google'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep('2fa')}
                    className="h-10 px-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>IR-Gov</span>
                  </button>
                </div>
              </form>

              {/* Security Notice */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[9px] font-mono font-medium text-emerald-400">
                <ShieldCheck className="w-3 h-3 shrink-0" />
                <span>SECURE TERMINAL · 256-BIT ENCRYPTION</span>
              </div>

            </div>
          ) : (
            <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 rounded-3xl mt-4 flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
              
              <div className="w-14 h-14 rounded-full border border-blue-400/30 flex items-center justify-center mb-5 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Key className="w-6 h-6 text-blue-400" />
              </div>

              <h2 className="text-lg font-bold uppercase tracking-widest text-white mb-2 drop-shadow-sm">
                Two-Factor Auth
              </h2>
              
              <p className="text-center text-xs text-white/70 mb-6 leading-relaxed">
                Enter the 6-digit secure code sent to your<br/>registered email address to access the terminal.
              </p>

              <div className="w-full border border-blue-400/30 bg-blue-500/10 rounded-xl p-3 flex items-center justify-between mb-4 shadow-inner">
                <div className="flex items-center gap-2">
                  <Key className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] text-blue-300 font-medium tracking-wide">Demo Static PIN: <span className="font-bold text-xs text-blue-400">262026</span></span>
                </div>
                <button 
                  onClick={autofill}
                  className="px-2.5 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[9px] font-bold uppercase rounded hover:bg-blue-500/30 transition-colors"
                >
                  Auto-fill
                </button>
              </div>

              <p className="text-center text-[9px] text-blue-300/80 italic mb-6 px-2">
                * Note: 262026 is a temporary demo PIN for evaluation. Dynamic OTP generation will be integrated in future releases.
              </p>

              <div className="flex items-center justify-center gap-2 w-full mb-8">
                {pin.map((digit, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const newPin = [...pin];
                      newPin[i] = e.target.value.replace(/\D/g, ''); // only numbers
                      setPin(newPin);
                      if (e.target.value && i < 5) {
                        const nextInput = document.getElementById(`pin-${i + 1}`);
                        if (nextInput) nextInput.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && i > 0) {
                        const prevInput = document.getElementById(`pin-${i - 1}`);
                        if (prevInput) prevInput.focus();
                      }
                    }}
                    id={`pin-${i}`}
                    className="w-10 h-12 bg-black/30 border border-white/20 rounded-lg text-center text-lg font-bold text-white focus:border-blue-400 focus:bg-black/50 focus:ring-1 focus:ring-blue-400 outline-none transition-colors shadow-inner"
                  />
                ))}
              </div>

              <button
                onClick={handle2FASubmit}
                className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] uppercase tracking-widest rounded-xl transition-all shadow-[0_4px_14px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 mb-6"
              >
                <span>Verify & Authenticate</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center gap-2">
                <button className="flex items-center gap-2 text-[10px] text-white/50 hover:text-white/80 transition-colors uppercase tracking-widest">
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend Code in 26s</span>
                </button>
                <div className="flex items-center gap-2 text-[9px] text-emerald-400 font-mono font-medium tracking-wider mt-4 pt-4 border-t border-white/10 w-full justify-center">
                  <ShieldCheck className="w-3 h-3" />
                  <span>SECURE VERIFICATION GATEWAY</span>
                </div>
              </div>
              
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
