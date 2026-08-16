import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export interface UserProfile {
  name: string;
  initials: string;
  role: string;
  zone: string;
  email: string;
  photoURL?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, pass: string) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isGoogleLoading: boolean;
}

const DEFAULT_USER: UserProfile = {
  name: 'Arjun Sharma',
  initials: 'AS',
  role: 'Cluster Controller',
  zone: 'Northern Zone Control Room',
  email: 'arjun.sharma@railways.gov.in'
};

const firebaseUserToProfile = (fbUser: User): UserProfile => {
  const name = fbUser.displayName || 'Operator';
  const parts = name.split(' ');
  const initials = parts.length >= 2 
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : name.substring(0, 2).toUpperCase();

  return {
    name,
    initials,
    role: 'Cluster Controller',
    zone: 'Northern Zone Control Room',
    email: fbUser.email || '',
    photoURL: fbUser.photoURL || undefined
  };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('amogh_auth');
    return saved ? JSON.parse(saved) : false;
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('amogh_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Listen to Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const profile = firebaseUserToProfile(firebaseUser);
        setUser(profile);
        setIsAuthenticated(true);
        localStorage.setItem('amogh_auth', JSON.stringify(true));
        localStorage.setItem('amogh_user', JSON.stringify(profile));
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('amogh_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Standard email/password login (demo)
  const login = (email: string) => {
    const profile = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email
    };
    setUser(profile);
    setIsAuthenticated(true);
    localStorage.setItem('amogh_user', JSON.stringify(profile));
  };

  // Google Sign-In via Firebase
  const loginWithGoogle = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profile = firebaseUserToProfile(result.user);
      setUser(profile);
      setIsAuthenticated(true);
      localStorage.setItem('amogh_user', JSON.stringify(profile));
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      console.error('Google sign-in error:', firebaseError.message);
      // Don't throw – just let the user try again
      if (firebaseError.code !== 'auth/popup-closed-by-user') {
        alert(`Google Sign-In failed: ${firebaseError.message}`);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const logout = () => {
    signOut(auth).catch(console.error);
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('amogh_auth');
    localStorage.removeItem('amogh_user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, loginWithGoogle, logout, isGoogleLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
