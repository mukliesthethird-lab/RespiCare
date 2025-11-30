'use client';

export default function LoadingSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Card Skeleton */}
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32"></div>
        </div>
    );
}

export function AQICardSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="flex items-start justify-between mb-4">
                <div className="space-y-2 flex-1">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mt-2"></div>
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
    );
}

export function MapSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-56 mb-4"></div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
    );
}
