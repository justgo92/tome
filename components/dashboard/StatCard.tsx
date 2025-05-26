'use client';

type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
};

export default function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg shadow-glass overflow-hidden">
      <div className="p-5">
        <div className="flex items-center">
          {icon && <div className="flex-shrink-0 mr-3">{icon}</div>}
          <div>
            <p className="text-sm font-medium text-gray-300 truncate">{title}</p>
            <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
          </div>
        </div>
        
        {(description || trend) && (
          <div className="mt-4">
            {description && <p className="text-sm text-gray-400">{description}</p>}
            
            {trend && (
              <div className="mt-1">
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? 'text-green-400' : 'text-red-400'
                  } flex items-center`}
                >
                  {trend.isPositive ? (
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  ) : (
                    <svg className="self-center flex-shrink-0 h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"></path>
                    </svg>
                  )}
                  <span className="ml-1">
                    {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                  </span>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
