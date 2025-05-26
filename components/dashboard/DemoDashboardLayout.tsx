'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

// Mock user data for demo purposes
const mockUser = {
  email: 'demo@example.com',
  user_metadata: {
    full_name: 'Demo User',
    organization_name: 'TOME Demo'
  }
};

export default function DemoDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-tome-gradient from-tome-navy via-tome-purple-dark to-tome-navy">
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
        user={mockUser} 
      />
      
      <div className="md:pl-64 flex flex-col flex-1">
        <Header 
          setIsMobileMenuOpen={setIsMobileMenuOpen} 
          user={mockUser}
        />
        
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
