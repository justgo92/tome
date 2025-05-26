'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';

export default function ForgotPasswordForm() {
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await resetPassword(email);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setSuccessMessage('Password reset instructions have been sent to your email');
      setEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while sending reset instructions');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="max-w-md w-full mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-glass">
      <h2 className="text-2xl font-bold text-white mb-6">Reset Your Password</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md">
          <p className="text-red-100 text-sm">{error}</p>
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-md">
          <p className="text-green-100 text-sm">{successMessage}</p>
        </div>
      )}
      
      <p className="text-gray-300 mb-6">
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-200">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md bg-white/10 border border-white/20 text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tome-cyan focus:border-transparent"
            placeholder="you@company.com"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-tome-cyan hover:bg-tome-cyan-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-300">
          <Link href="/auth/login" className="font-medium text-tome-cyan hover:text-tome-cyan-light">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
