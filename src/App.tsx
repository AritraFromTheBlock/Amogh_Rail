import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SystemProvider, useSystem } from './context/SystemContext';
import { ToastProvider } from './context/ToastContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Network } from './pages/Network';
import { Operations } from './pages/Operations';
import { Optimization } from './pages/Optimization';
import { Simulation } from './pages/Simulation';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { SplashScreen } from './components/common/SplashScreen';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { activeNav } = useSystem();
  const [showLogin, setShowLogin] = useState(false);

  if (!isAuthenticated) {
    if (showLogin) {
      return <Login onBack={() => setShowLogin(false)} />;
    }
    return <Landing onNavigateLogin={() => setShowLogin(true)} />;
  }

  const renderActiveScreen = () => {
    switch (activeNav) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Network':
        return <Network />;
      case 'Operations':
        return <Operations />;
      case 'Optimization':
        return <Optimization />;
      case 'Simulation':
        return <Simulation />;
      case 'Analytics':
        return <Analytics />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderActiveScreen()}
    </Layout>
  );
};

export function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <ToastProvider>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {!showSplash && (
        <AuthProvider>
          <SystemProvider>
            <AppContent />
          </SystemProvider>
        </AuthProvider>
      )}
    </ToastProvider>
  );
}

export default App;
