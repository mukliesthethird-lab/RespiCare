'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Activity, TrendingUp, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface UserStats {
    predictions: any[];
    totalPredictions: number;
}

export default function UserDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const t = useTranslations('userDashboard');
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);
    const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/${locale}/auth/login`);
        } else if (status === 'authenticated') {
            fetchStats();
        }
    }, [status, router, locale]);

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/user/stats');
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

    const getRiskLevel = (value: number) => {
        if (value >= 0.7) return { label: 'High', color: 'red' };
        if (value >= 0.5) return { label: 'Medium', color: 'yellow' };
        return { label: 'Low', color: 'green' };
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-medical-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session) return null;

    const lastPrediction = stats?.predictions?.[0];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('title')}, {session.user?.name}! 👋
                    </h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('totalPredictions')}</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stats?.totalPredictions || 0}
                                </p>
                            </div>
                            <Activity className="w-12 h-12 text-medical-primary dark:text-medical-secondary opacity-20" />
                        </div>
                    </div>

                    {lastPrediction && (
                        <>
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{t('lastPrediction')}</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                            {format(new Date(lastPrediction.created_at), 'MMM dd, yyyy')}
                                        </p>
                                    </div>
                                    <Clock className="w-12 h-12 text-blue-500 opacity-20" />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Highest Risk</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                            {Math.max(
                                                lastPrediction.asthma,
                                                lastPrediction.copd,
                                                lastPrediction.respiratory_infection
                                            ).toFixed(1)}%
                                        </p>
                                    </div>
                                    <TrendingUp className="w-12 h-12 text-orange-500 opacity-20" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('quickActions')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href={`/${locale}/prediction`}
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-medical-primary to-medical-secondary text-white rounded-lg hover:shadow-lg transition-all font-medium"
                        >
                            <Activity size={20} />
                            <span>{t('newPrediction')}</span>
                        </Link>
                        <Link
                            href={`/${locale}/statistics`}
                            className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                        >
                            <TrendingUp size={20} />
                            <span>{t('viewHistory')}</span>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{t('recentActivity')}</h2>

                    {stats?.predictions && stats.predictions.length > 0 ? (
                        <div className="space-y-4">
                            {stats.predictions.slice(0, 5).map((prediction: any) => (
                                <div
                                    key={prediction.id}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">
                                            {format(new Date(prediction.created_at), 'MMM dd, yyyy - HH:mm')}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {[
                                            { label: 'Asthma', value: prediction.asthma },
                                            { label: 'COPD', value: prediction.copd },
                                            { label: 'Infection', value: prediction.respiratory_infection },
                                            { label: 'Chronic Cough', value: prediction.chronic_cough }
                                        ].map((item) => {
                                            const risk = getRiskLevel(item.value / 100);
                                            return (
                                                <div key={item.label}>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                                                    <div className="flex items-center space-x-2">
                                                        <div className={`w-2 h-2 rounded-full bg-${risk.color}-500`} />
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {item.value.toFixed(1)}%
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">{t('noPredictions')}</p>
                            <Link
                                href={`/${locale}/prediction`}
                                className="inline-block mt-4 px-6 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-primary/90 transition-colors"
                            >
                                {t('newPrediction')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
