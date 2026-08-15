import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface ToastMessage {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface ToastContextType {
  addToast: (message: string, type?: ToastMessage['type']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastMessage['type'] = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`
              pointer-events-auto flex items-center px-4 py-3 rounded shadow-lg font-mono text-xs text-white transform transition-all duration-300 animate-pulse
              ${toast.type === 'info' ? 'bg-[#0F2C5C] dark:bg-[#1E293B] border border-white/10' : ''}
              ${toast.type === 'success' ? 'bg-[#1E7F4F] border border-white/10' : ''}
              ${toast.type === 'warning' ? 'bg-[#F5821F] border border-white/10' : ''}
              ${toast.type === 'error' ? 'bg-[#C23636] border border-white/10' : ''}
            `}
          >
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
