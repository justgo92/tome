'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../auth/AuthContext';

export default function Header({ setIsMobileMenuOpen }: { 
  setIsMobileMenuOpen: (open: boolean) => void;
}) {
  const { user } = useAuth();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Mock notifications for UI demonstration
  const notifications = [
    { id: 1, message: 'Your "Employee Onboarding" asset is ready for review', time: '5 minutes ago', isRead: false },
    { id: 2, message: 'New feature: AI-powered quiz generation is now available', time: '2 hours ago', isRead: false },
    { id: 3, message: 'Your credits have been successfully added to your account', time: '1 day ago', isRead: true },
  ];

  return (
    <header className="bg-white/5 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative h-16 flex justify-between">
          <div className="relative z-10 px-2 flex lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              {/* Mobile menu button */}
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
              
              {/* Logo on mobile */}
              <Link href="/dashboard" className="md:hidden ml-2">
                <span className="text-xl font-bold text-white">TOME</span>
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 flex items-center lg:hidden">
            {/* Mobile profile dropdown */}
            <div className="flex-shrink-0 relative ml-5">
              <div>
                <button
                  type="button"
                  className="bg-white/10 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan"
                  id="mobile-user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-tome-purple/30 flex items-center justify-center text-white font-medium">
                    {user?.user_metadata?.full_name 
                      ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                      : user?.email?.substring(0, 2).toUpperCase() || 'U'}
                  </div>
                </button>
              </div>
              
              {/* Profile dropdown panel */}
              {isProfileMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white/10 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="mobile-user-menu"
                >
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-tome-purple/20"
                    role="menuitem"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-tome-purple/20"
                    role="menuitem"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-tome-purple/20"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      // Add sign out functionality here
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
            {/* Search bar */}
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-md leading-5 bg-white/10 placeholder-gray-400 focus:outline-none focus:bg-white/20 focus:border-white/30 focus:ring-white focus:text-white sm:text-sm"
                    placeholder="Search assets, documents..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            
            {/* Notification button */}
            <button
              type="button"
              className="flex-shrink-0 relative p-1 text-gray-300 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
              {/* Notification badge */}
              {notifications.filter(n => !n.isRead).length > 0 && (
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-tome-navy"></span>
              )}
            </button>
            
            {/* Notification dropdown */}
            {isNotificationsOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white/10 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none top-16">
                <div className="px-4 py-2 border-b border-white/10">
                  <h3 className="text-sm font-medium text-white">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-center py-4 text-sm text-gray-300">No notifications</p>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-tome-purple/20 ${!notification.isRead ? 'bg-tome-purple/10' : ''}`}
                      >
                        <p className="text-sm text-white">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-white/10">
                    <button className="text-xs text-tome-cyan hover:text-tome-cyan-light">
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Profile dropdown */}
            <div className="flex-shrink-0 relative ml-5">
              <div>
                <button
                  type="button"
                  className="bg-white/10 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-tome-purple/30 flex items-center justify-center text-white font-medium">
                    {user?.user_metadata?.full_name 
                      ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
                      : user?.email?.substring(0, 2).toUpperCase() || 'U'}
                  </div>
                </button>
              </div>
              
              {/* Profile dropdown panel */}
              {isProfileMenuOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white/10 backdrop-blur-md ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-tome-purple/20"
                    role="menuitem"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2 text-sm text-gray-200 hover:bg-tome-purple/20"
                    role="menuitem"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    className="w-full text-left block px-4 py-2 text-sm text-gray-200 hover:bg-tome-purple/20"
                    role="menuitem"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      // Add sign out functionality here
                    }}
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
