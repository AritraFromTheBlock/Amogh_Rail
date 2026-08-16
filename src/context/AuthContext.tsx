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
  provider?: 'google' | 'password' | 'ir-gov';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  pendingUser: UserProfile | null;
  setPendingUser: (user: UserProfile | null) => void;
  prepareEmailLogin: (email: string) => void;
  signInWithGooglePending: () => Promise<UserProfile | null>;
  complete2FA: (customUser?: UserProfile) => void;
  logout: () => void;
  isGoogleLoading: boolean;
}

const DEFAULT_USER: UserProfile = {
  name: 'Arjun Sharma',
  initials: 'AS',
  role: 'Cluster Controller',
  zone: 'Northern Zone Control Room',
  email: 'arjun.sharma@railways.gov.in',
  provider: 'password'
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
    photoURL: fbUser.photoURL || undefined,
    provider: 'google'
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

  const [pendingUser, setPendingUser] = useState<UserProfile | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Listen to Firebase auth state, but only auto-authenticate if 2FA was already verified (saved in localStorage)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const is2FAComplete = localStorage.getItem('amogh_auth') === 'true';
      if (firebaseUser && is2FAComplete) {
        const profile = firebaseUserToProfile(firebaseUser);
        setUser(profile);
        setIsAuthenticated(true);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('amogh_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Step 1: Prepare standard email/password login
  const prepareEmailLogin = (email: string) => {
    const profile: UserProfile = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      provider: 'password'
    };
    setPendingUser(profile);
  };

  // Step 1: Google Sign-In via Firebase (triggers 2FA flow next)
  const signInWithGooglePending = async (): Promise<UserProfile | null> => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const profile = firebaseUserToProfile(result.user);
      setPendingUser(profile);
      return profile;
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };
      console.error('Google sign-in error:', firebaseError.message);
      if (firebaseError.code !== 'auth/popup-closed-by-user') {
        alert(`Google Sign-In failed: ${firebaseError.message}`);
      }
      return null;
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Step 2: Complete 2FA and grant full application access
  const complete2FA = (customUser?: UserProfile) => {
    const finalUser = customUser || pendingUser || DEFAULT_USER;
    setUser(finalUser);
    setIsAuthenticated(true);
    setPendingUser(null);
    localStorage.setItem('amogh_auth', JSON.stringify(true));
    localStorage.setItem('amogh_user', JSON.stringify(finalUser));
  };

  const logout = () => {
    signOut(auth).catch(console.error);
    setIsAuthenticated(false);
    setUser(null);
    setPendingUser(null);
    localStorage.removeItem('amogh_auth');
    localStorage.removeItem('amogh_user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated, 
        user, 
        pendingUser, 
        setPendingUser, 
        prepareEmailLogin, 
        signInWithGooglePending, 
        complete2FA, 
        logout, 
        isGoogleLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
