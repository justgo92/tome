'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';

// Set this to true to bypass authentication for development
const DEV_MODE = true;

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [devModeEnabled, setDevModeEnabled] = useState(false);

  // Define public paths that don't require authentication
  const isPublicPath = 
    pathname === '/' || 
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/demo');

  useEffect(() => {
    // In development mode, set a flag to bypass authentication
    if (DEV_MODE) {
      setDevModeEnabled(true);
      return;
    }

    // Skip redirect during initial loading
    if (isLoading) return;

    // If user is not authenticated and trying to access a protected route
    if (!user && !isPublicPath) {
      router.push('/auth/login');
      return;
    }

    // If user is authenticated and on an auth page, redirect to dashboard
    if (user && pathname.startsWith('/auth/')) {
      router.push('/dashboard');
      return;
    }
  }, [user, isLoading, router, pathname, isPublicPath]);

  // Show loading state (only if not in dev mode)
  if (isLoading && !DEV_MODE) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tome-gradient from-tome-navy via-tome-purple-dark to-tome-navy">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-tome-cyan border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // For the homepage, auth pages, and demo pages, always render children
  if (isPublicPath) {
    return <>{children}</>;
  }

  // In development mode, bypass authentication
  if (DEV_MODE) {
    return <>{children}</>;
  }

  // For protected routes, only render if authenticated
  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return <>{children}</>;
}
