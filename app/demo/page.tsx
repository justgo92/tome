'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock user data
const mockUser = {
  email: 'demo@example.com',
  user_metadata: {
    full_name: 'Demo User',
    organization_name: 'TOME Demo'
  }
};

// Icons for the sidebar
const DashboardIcon = () => (
  <svg className="h-6 w-6 text-tome-cyan mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
  </svg>
);

const DocumentIcon = () => (
  <svg className="h-6 w-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
);

// Icons for stat cards
const StatDocumentIcon = () => (
  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
);

const AssetIcon = () => (
  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  </div>
);

const CreditIcon = () => (
  <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
    <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
);

const UsageIcon = () => (
  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  </div>
);

// Mock data for quick actions
const quickActions = [
  {
    name: 'Upload Document',
    description: 'Upload a new document to your library',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    href: '#'
  },
  {
    name: 'Buy Credits',
    description: 'Purchase additional credits for your account',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: '#'
  },
  {
    name: 'View All Assets',
    description: 'Browse all your training assets',
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    href: '#'
  }
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    title: 'Document Uploaded',
    description: 'You uploaded "Employee Handbook.pdf"',
    time: '2 hours ago',
    type: 'upload'
  },
  {
    id: 2,
    title: 'Training Asset Created',
    description: 'New training module "Customer Service Basics" created',
    time: '1 day ago',
    type: 'asset'
  },
  {
    id: 3,
    title: 'Credits Purchased',
    description: 'You purchased 100 additional credits',
    time: '3 days ago',
    type: 'credit'
  }
];

// Mock data for recent assets
const recentAssets = [
  {
    id: 1,
    title: 'Customer Service Training',
    type: 'E-Learning Module',
    date: '2 days ago',
    thumbnail: null
  },
  {
    id: 2,
    title: 'Safety Protocol Overview',
    type: 'Interactive Guide',
    date: '1 week ago',
    thumbnail: null
  },
  {
    id: 3,
    title: 'Product Knowledge Base',
    type: 'Reference Material',
    date: '2 weeks ago',
    thumbnail: null
  },
  {
    id: 4,
    title: 'New Hire Orientation',
    type: 'Onboarding',
    date: '1 month ago',
    thumbnail: null
  }
];

export default function DemoDashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-tome-gradient from-tome-navy via-tome-purple-dark to-tome-navy">
      {/* Sidebar - simplified version */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white/5 backdrop-blur-md">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <span className="text-2xl font-bold text-white">TOME</span>
            </div>
            <nav className="mt-8 flex-1 px-2 space-y-1">
              <Link
                href="#"
                className="bg-tome-purple/20 text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150"
              >
                <DashboardIcon />
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:bg-tome-purple/10 hover:text-white group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150"
              >
                <DocumentIcon />
                Upload Documents
              </Link>
              {/* Add more sidebar items as needed */}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-white/10 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-tome-purple/30 flex items-center justify-center text-white font-medium">
                  DU
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {mockUser.user_metadata.full_name}
                </p>
                <button
                  className="flex items-center text-xs font-medium text-gray-300 hover:text-white transition-colors duration-150"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Header - simplified */}
        <header className="bg-white/5 backdrop-blur-sm shadow-md">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative h-16 flex justify-between">
              <div className="relative z-10 px-2 flex lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <button
                    type="button"
                    className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:bg-tome-purple/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tome-cyan"
                    onClick={() => setIsMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Welcome header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-white">Welcome, {mockUser.user_metadata.full_name}</h1>
                <p className="mt-1 text-gray-300">Here's what's happening with your training content</p>
              </div>

              {/* Stats overview */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center">
                      <StatDocumentIcon />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-300 truncate">Documents Uploaded</p>
                        <p className="mt-1 text-3xl font-semibold text-white">5</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center">
                      <AssetIcon />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-300 truncate">Training Assets</p>
                        <p className="mt-1 text-3xl font-semibold text-white">12</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center">
                      <CreditIcon />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-300 truncate">Credits Available</p>
                        <p className="mt-1 text-3xl font-semibold text-white">250</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                  <div className="p-5">
                    <div className="flex items-center">
                      <UsageIcon />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-300 truncate">Monthly Usage</p>
                        <p className="mt-1 text-3xl font-semibold text-white">78%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mb-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white">Quick Actions</h3>
                    
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {quickActions.map((action, index) => (
                        <div
                          key={index}
                          className="relative group bg-white/10 rounded-lg p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-tome-cyan hover:bg-white/15 transition-colors duration-200"
                        >
                          <div>
                            <span className="inline-flex p-3 rounded-lg bg-tome-purple/20">
                              {action.icon}
                            </span>
                          </div>
                          <div className="mt-4">
                            <h3 className="text-lg font-medium text-white">
                              <a href={action.href} className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true"></span>
                                {action.name}
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-300">{action.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent activity and assets */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent assets */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">Recent Assets</h3>
                      <a 
                        href="#" 
                        className="text-sm font-medium text-tome-cyan hover:text-tome-cyan-light"
                      >
                        View all
                      </a>
                    </div>
                    
                    <div className="mt-6">
                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        {recentAssets.slice(0, 4).map((asset) => (
                          <a
                            key={asset.id}
                            href="#"
                            className="group block w-full rounded-lg overflow-hidden bg-white/10 hover:bg-white/15 transition-colors duration-200"
                          >
                            <div className="aspect-w-16 aspect-h-9 bg-gray-800 group-hover:opacity-75">
                              <div className="flex items-center justify-center h-full">
                                <div className="p-4 rounded-full bg-white/5">
                                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="text-base font-medium text-white truncate">{asset.title}</h4>
                              <div className="mt-2 flex items-center text-sm text-gray-400">
                                <span>{asset.type}</span>
                                <span className="mx-1">•</span>
                                <span>{asset.date}</span>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                    
                    <div className="mt-6 flow-root">
                      <ul className="-my-5 divide-y divide-white/10">
                        {recentActivities.map((activity) => (
                          <li key={activity.id} className="py-5">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                                <p className="text-sm text-gray-400">{activity.description}</p>
                                <div className="mt-1 flex items-center">
                                  <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
