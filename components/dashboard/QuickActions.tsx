'use client';

import Link from 'next/link';

type QuickAction = {
  id: string;
  name: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
};

export default function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium text-white">Quick Actions</h3>
        
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {actions.map((action) => (
            <div
              key={action.id}
              className="relative group bg-white/10 rounded-lg p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-tome-cyan hover:bg-white/15 transition-colors duration-200"
            >
              <div>
                <span className={`inline-flex p-3 rounded-lg ${action.color}`}>
                  {action.icon}
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-white">
                  <Link href={action.href} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true"></span>
                    {action.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-300">{action.description}</p>
              </div>
              <span
                className="pointer-events-none absolute top-6 right-6 text-gray-400 group-hover:text-gray-300"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
