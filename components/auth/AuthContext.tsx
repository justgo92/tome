'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import supabaseClient from '../../supabaseClient';

// Set this to true to bypass authentication for development
const DEV_MODE = true;

type AuthContextType = {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, metadata?: { full_name?: string, organization_name?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(DEV_MODE ? {
    user: {
      id: 'dev-user-id',
      email: 'dev@example.com',
      aud: 'authenticated',
      role: 'authenticated',
      email_confirmed_at: new Date(),
      phone: null,
      phone_confirmed_at: null,
      confirmed_at: new Date(),
      recovery_sent_at: null,
      last_sign_in_at: new Date(),
      app_metadata: {},
      user_metadata: {},
      created_at: new Date(),
      updated_at: new Date(),
    },
    expires_at: 0,
    expires_in: 0,
    refresh_token: '',
    token_type: '',
    access_token: '',
  } : null);
  const [user, setUser] = useState<User | null>(DEV_MODE ? {
    id: 'dev-user-id',
    email: 'dev@example.com',
    aud: 'authenticated',
    role: 'authenticated',
    email_confirmed_at: new Date(),
    phone: null,
    phone_confirmed_at: null,
    confirmed_at: new Date(),
    recovery_sent_at: null,
    last_sign_in_at: new Date(),
    app_metadata: {},
    user_metadata: {},
    created_at: new Date(),
    updated_at: new Date(),
  } : null);
  const [isLoading, setIsLoading] = useState(!DEV_MODE);

  useEffect(() => {
    // Skip authentication check in development mode
    if (DEV_MODE) {
      return;
    }
    
    // Get initial session
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    metadata?: { full_name?: string, organization_name?: string }
  ) => {
    setIsLoading(true);
    
    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    
    setIsLoading(false);
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });
    
    setIsLoading(false);
    return { error };
  };

  const signOut = async () => {
    setIsLoading(true);
    await supabaseClient.auth.signOut();
    setIsLoading(false);
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    setIsLoading(false);
    return { error };
  };

  const value = {
    session,
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
