import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  initials: string;
  role: string;
  zone: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, pass: string) => void;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = {
  name: 'Arjun Sharma',
  initials: 'AS',
  role: 'Traffic Controller',
  zone: 'Northern Zone Control Room',
  email: 'arjun.sharma@railways.gov.in'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('amogh_auth');
    return saved ? JSON.parse(saved) : true; // Default logged in for immediate review
  });

  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);

  useEffect(() => {
    localStorage.setItem('amogh_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const login = (email: string) => {
    setUser({
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
