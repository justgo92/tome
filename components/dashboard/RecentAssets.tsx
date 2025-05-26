'use client';

import Link from 'next/link';

type Asset = {
  id: string;
  title: string;
  type: 'e-learning' | 'video' | 'process-map' | 'quiz' | 'document';
  thumbnail?: string;
  createdAt: string;
  status: 'draft' | 'review' | 'published';
};

// Asset type icons
const assetTypeIcons = {
  'e-learning': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  'video': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  'process-map': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
    </svg>
  ),
  'quiz': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  'document': (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
};

// Status badges
const statusBadges = {
  'draft': <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Draft</span>,
  'review': <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">In Review</span>,
  'published': <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Published</span>,
};

export default function RecentAssets({ assets }: { assets: Asset[] }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Recent Assets</h3>
          <Link 
            href="/dashboard/assets" 
            className="text-sm font-medium text-tome-cyan hover:text-tome-cyan-light"
          >
            View all
          </Link>
        </div>
        
        <div className="mt-6">
          {assets.length === 0 ? (
            <div className="text-center py-10">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-white">No assets</h3>
              <p className="mt-1 text-sm text-gray-400">Get started by creating a new asset.</p>
              <div className="mt-6">
                <Link
                  href="/dashboard/upload"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-tome-cyan hover:bg-tome-cyan-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tome-cyan"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Upload Document
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {assets.map((asset) => (
                <Link
                  key={asset.id}
                  href={`/dashboard/assets/${asset.id}`}
                  className="group block w-full rounded-lg overflow-hidden bg-white/10 hover:bg-white/15 transition-colors duration-200"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gray-800 group-hover:opacity-75">
                    {asset.thumbnail ? (
                      <img
                        src={asset.thumbnail}
                        alt={asset.title}
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="p-4 rounded-full bg-white/5">
                          {assetTypeIcons[asset.type]}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <h4 className="text-base font-medium text-white truncate">{asset.title}</h4>
                      <div className="ml-2 flex-shrink-0">
                        {statusBadges[asset.status]}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-400">
                      <div className="flex items-center">
                        {assetTypeIcons[asset.type]}
                        <span className="ml-1 capitalize">{asset.type.replace('-', ' ')}</span>
                      </div>
                      <span className="mx-2">•</span>
                      <span>{asset.createdAt}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
