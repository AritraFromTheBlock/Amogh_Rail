import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { AlertsDrawer } from '../common/AlertsDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] flex">
      {/* Permanent Mission Control Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-8 bg-[#FFFFFF] overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Alerts Flyout */}
      <AlertsDrawer />
    </div>
  );
};
