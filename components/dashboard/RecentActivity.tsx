'use client';

type Activity = {
  id: number;
  type: 'upload' | 'generation' | 'completion' | 'credit' | 'review';
  title: string;
  description: string;
  time: string;
  status?: 'completed' | 'in-progress' | 'pending' | 'failed';
};

const activityIcons = {
  upload: (
    <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
      <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    </div>
  ),
  generation: (
    <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
      <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    </div>
  ),
  completion: (
    <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
      <svg className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  ),
  credit: (
    <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
      <svg className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  ),
  review: (
    <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center">
      <svg className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </div>
  ),
};

const statusBadges = {
  'completed': <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Completed</span>,
  'in-progress': <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">In Progress</span>,
  'pending': <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Pending</span>,
  'failed': <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Failed</span>,
};

export default function RecentActivity({ activities }: { activities: Activity[] }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium text-white">Recent Activity</h3>
        
        <div className="mt-6 flow-root">
          <ul className="-my-5 divide-y divide-white/10">
            {activities.length === 0 ? (
              <li className="py-5">
                <div className="text-center text-gray-300">No recent activity</div>
              </li>
            ) : (
              activities.map((activity) => (
                <li key={activity.id} className="py-5">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {activityIcons[activity.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                      <p className="text-sm text-gray-400">{activity.description}</p>
                      <div className="mt-1 flex items-center">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        {activity.status && (
                          <div className="ml-2">
                            {statusBadges[activity.status]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        
        {activities.length > 0 && (
          <div className="mt-6">
            <a
              href="#"
              className="w-full flex justify-center items-center px-4 py-2 border border-white/20 shadow-sm text-sm font-medium rounded-md text-white bg-white/5 hover:bg-white/10"
            >
              View all activity
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
