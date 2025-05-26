'use client';

import ResetPasswordForm from '../../../components/auth/ResetPasswordForm';
import Link from 'next/link';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-tome-gradient from-tome-navy via-tome-purple-dark to-tome-navy flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center">
          <span className="text-3xl font-bold text-white">TOME</span>
        </Link>
        <h2 className="mt-6 text-center text-xl text-gray-300">
          Set your new password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <ResetPasswordForm />
      </div>
    </div>
  );
}
