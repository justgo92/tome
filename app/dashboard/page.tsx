'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../components/auth/AuthContext';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import StatCard from '../../components/dashboard/StatCard';
import QuickActions from '../../components/dashboard/QuickActions';
import RecentActivity from '../../components/dashboard/RecentActivity';
import RecentAssets from '../../components/dashboard/RecentAssets';

// Icons for stat cards
const DocumentIcon = () => (
  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
    <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
);

const AssetIcon = () => (
  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
    <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  </div>
);

const CreditIcon = () => (
  <div className="h-10 w-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
    <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
);

const UsageIcon = () => (
  <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
    <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  </div>
);

// Icons for quick actions
const UploadIcon = () => (
  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const BuyCreditsIcon = () => (
  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ViewAssetsIcon = () => (
  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: 'upload' as const,
    title: 'Customer Service SOP',
    description: 'Uploaded new Standard Operating Procedure document',
    time: '10 minutes ago',
    status: 'completed' as const,
  },
  {
    id: 2,
    type: 'generation' as const,
    title: 'Safety Protocol Training',
    description: 'Started generating e-learning module',
    time: '1 hour ago',
    status: 'in-progress' as const,
  },
  {
    id: 3,
    type: 'credit' as const,
    title: 'Credit Purchase',
    description: 'Added 50 credits to your account',
    time: '2 days ago',
  },
];

// Mock data for recent assets
const recentAssets = [
  {
    id: '1',
    title: 'Customer Service Training',
    type: 'e-learning' as const,
    createdAt: '2 days ago',
    status: 'published' as const,
  },
  {
    id: '2',
    title: 'Safety Protocol Overview',
    type: 'video' as const,
    createdAt: '1 week ago',
    status: 'review' as const,
  },
  {
    id: '3',
    title: 'Onboarding Process',
    type: 'process-map' as const,
    createdAt: '2 weeks ago',
    status: 'draft' as const,
  },
];

// Quick actions data
const quickActions = [
  {
    id: 'upload',
    name: 'Upload Document',
    description: 'Upload a new SOP to transform into training',
    href: '/dashboard/upload',
    icon: <UploadIcon />,
    color: 'bg-blue-500/20',
  },
  {
    id: 'credits',
    name: 'Buy Credits',
    description: 'Purchase credits to generate more content',
    href: '/dashboard/credits',
    icon: <BuyCreditsIcon />,
    color: 'bg-yellow-500/20',
  },
  {
    id: 'assets',
    name: 'View All Assets',
    description: 'Browse and manage your training assets',
    href: '/dashboard/assets',
    icon: <ViewAssetsIcon />,
    color: 'bg-purple-500/20',
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <DashboardLayout>
      {/* Welcome header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Welcome, {user.user_metadata?.full_name || user.email}</h1>
        <p className="mt-1 text-gray-300">Here's what's happening with your training content</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Documents Uploaded"
          value="5"
          description="2 pending processing"
          icon={<DocumentIcon />}
          trend={{ value: 20, isPositive: true }}
        />
        <StatCard
          title="Training Assets"
          value="12"
          description="3 in review"
          icon={<AssetIcon />}
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Credits Available"
          value="42"
          description="Used 8 this month"
          icon={<CreditIcon />}
        />
        <StatCard
          title="Monthly Usage"
          value="68%"
          description="+12% from last month"
          icon={<UsageIcon />}
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Quick actions */}
      <div className="mb-6">
        <QuickActions actions={quickActions} />
      </div>

      {/* Recent assets and activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentAssets assets={recentAssets} />
        <RecentActivity activities={recentActivities} />
      </div>
    </DashboardLayout>
  );
}
