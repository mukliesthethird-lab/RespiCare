'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Users, Activity, TrendingUp, Shield } from 'lucide-react';
import { format } from 'date-fns';

interface AdminStats {
    totalUsers: number;
    totalPredictions: number;
    recentUsers: any[];
    recentPredictions: any[];
}

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const t = useTranslations('adminDashboard');
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);
    const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/${locale}/auth/login`);
        } else if (status === 'authenticated') {
            const userRole = (session?.user as any)?.role;
            if (userRole !== 'admin') {
                router.push(`/${locale}/dashboard/user`);
            } else {
                fetchStats();
            }
        }
    }, [status, session, router, locale]);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/admin/stats');
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-medical-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <Shield className="w-8 h-8 text-medical-primary" />
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {t('title')}
                        </h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{t('overview')}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('totalUsers')}</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stats?.totalUsers || 0}
                                </p>
                            </div>
                            <Users className="w-12 h-12 text-blue-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('totalPredictions')}</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stats?.totalPredictions || 0}
                                </p>
                            </div>
                            <Activity className="w-12 h-12 text-medical-primary opacity-20" />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Avg per User</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stats?.totalUsers && stats?.totalPredictions
                                        ? (stats.totalPredictions / stats.totalUsers).toFixed(1)
                                        : '0'}
                                </p>
                            </div>
                            <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-medical-primary to-medical-secondary rounded-lg shadow-sm p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-90">System Status</p>
                                <p className="text-2xl font-bold mt-1">Active</p>
                            </div>
                            <Shield className="w-12 h-12 opacity-30" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Users */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('recentUsers')}</h2>
                        <div className="space-y-3">
                            {stats?.recentUsers && stats.recentUsers.length > 0 ? (
                                stats.recentUsers.slice(0, 5).map((user: any) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-medical-primary to-medical-secondary flex items-center justify-center text-white font-medium">
                                                {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name || 'No name'}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${user.role === 'admin'
                                                    ? 'bg-medical-primary/10 text-medical-primary'
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                                                }`}>
                                                {user.role}
                                            </span>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {format(new Date(user.created_at), 'MMM dd, yyyy')}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No users yet</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Predictions */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('recentPredictions')}</h2>
                        <div className="space-y-3">
                            {stats?.recentPredictions && stats.recentPredictions.length > 0 ? (
                                stats.recentPredictions.slice(0, 5).map((prediction: any) => (
                                    <div
                                        key={prediction.id}
                                        className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {prediction.user_name || prediction.user_email}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {format(new Date(prediction.created_at), 'MMM dd, HH:mm')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <div>
                                                <span className="text-gray-500 dark:text-gray-400">Asthma:</span>
                                                <span className="ml-1 font-medium text-gray-900 dark:text-white">
                                                    {prediction.asthma.toFixed(1)}%
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 dark:text-gray-400">COPD:</span>
                                                <span className="ml-1 font-medium text-gray-900 dark:text-white">
                                                    {prediction.copd.toFixed(1)}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-8">No predictions yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
