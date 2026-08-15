import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SystemProvider, useSystem } from './context/SystemContext';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Network } from './pages/Network';
import { Operations } from './pages/Operations';
import { Optimization } from './pages/Optimization';
import { Simulation } from './pages/Simulation';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { activeNav } = useSystem();

  if (!isAuthenticated) {
    return <Login />;
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
  return (
    <AuthProvider>
      <SystemProvider>
        <AppContent />
      </SystemProvider>
    </AuthProvider>
  );
}

export default App;
