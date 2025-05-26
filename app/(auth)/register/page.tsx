'use client';

import SignUpForm from '@/components/auth/SignUpForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-tome-gradient from-tome-navy via-tome-purple-dark to-tome-navy flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-glass">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Create an Account</h1>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
