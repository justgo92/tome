'use client';

import Link from 'next/link';

export default function SignUpConfirmationPage() {
  return (
    <div className="min-h-screen bg-tome-gradient from-tome-navy via-tome-purple-dark to-tome-navy flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-bold text-white">TOME</span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="max-w-md w-full mx-auto bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-glass text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-tome-cyan/20 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-tome-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-4">Account Created Successfully!</h2>
          
          <p className="text-gray-300 mb-6">
            We've sent a confirmation email to your inbox. Please verify your email address to activate your account.
          </p>
          
          <div className="space-y-4">
            <Link 
              href="/auth/login" 
              className="w-full inline-block py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-tome-cyan hover:bg-tome-cyan-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan transition-colors duration-200"
            >
              Go to Sign In
            </Link>
            
            <p className="text-sm text-gray-400">
              Didn't receive an email? Check your spam folder or{' '}
              <Link href="/auth/signup" className="text-tome-cyan hover:text-tome-cyan-light">
                try again
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
