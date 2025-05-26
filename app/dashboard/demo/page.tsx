'use client';

import { useState } from 'react';

// Simple mock user data
const mockUser = {
  email: 'demo@example.com',
  user_metadata: {
    full_name: 'Demo User',
    organization_name: 'TOME Demo'
  }
};

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
              {['Dashboard', 'Upload Documents', 'Training Assets', 'Credits', 'Settings'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`${
                    index === 0
                      ? 'bg-tome-purple/20 text-white'
                      : 'text-gray-300 hover:bg-tome-purple/10 hover:text-white'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150`}
                >
                  <span className="mr-3 h-6 w-6 text-gray-400"></span>
                  {item}
                </a>
              ))}
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
                {['Documents Uploaded', 'Training Assets', 'Credits Available', 'Monthly Usage'].map((title, index) => (
                  <div key={index} className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          <div className="h-10 w-10 rounded-full bg-tome-purple/20 flex items-center justify-center">
                            <svg className="h-6 w-6 text-tome-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-300 truncate">{title}</p>
                          <p className="mt-1 text-3xl font-semibold text-white">{index * 5 + 5}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="mb-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-white">Quick Actions</h3>
                    
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {['Upload Document', 'Buy Credits', 'View All Assets'].map((name, index) => (
                        <div
                          key={index}
                          className="relative group bg-white/10 rounded-lg p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-tome-cyan hover:bg-white/15 transition-colors duration-200"
                        >
                          <div>
                            <span className="inline-flex p-3 rounded-lg bg-tome-purple/20">
                              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </span>
                          </div>
                          <div className="mt-4">
                            <h3 className="text-lg font-medium text-white">
                              <a href="#" className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true"></span>
                                {name}
                              </a>
                            </h3>
                            <p className="mt-2 text-sm text-gray-300">Quick description for {name.toLowerCase()}</p>
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
                        {['Customer Service Training', 'Safety Protocol Overview'].map((title, index) => (
                          <a
                            key={index}
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
                              <h4 className="text-base font-medium text-white truncate">{title}</h4>
                              <div className="mt-2 flex items-center text-sm text-gray-400">
                                <span>{index + 1} days ago</span>
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
                        {['Uploaded new document', 'Started generating e-learning module', 'Added 50 credits'].map((description, index) => (
                          <li key={index} className="py-5">
                            <div className="flex items-start space-x-4">
                              <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">Activity {index + 1}</p>
                                <p className="text-sm text-gray-400">{description}</p>
                                <div className="mt-1 flex items-center">
                                  <p className="text-xs text-gray-500">{index + 1} hours ago</p>
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
