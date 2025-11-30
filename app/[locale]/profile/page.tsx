'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { User, Mail, Calendar, Shield, Edit2, Lock, LogOut, Save, X, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const t = useTranslations('profile');
    const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'en';

    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '' });
    const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    const [message, setMessage] = useState({ type: '', text: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push(`/${locale}/auth/login`);
        } else if (status === 'authenticated') {
            fetchProfile();
        }
    }, [status, router, locale]);

    const fetchProfile = async () => {
        try {
            const response = await fetch('/api/user/profile');
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
                setFormData({ name: data.name || '', email: data.email || '' });
            }
        } catch (error) {
            console.error('Failed to fetch profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setProfile(data);
                setEditing(false);
                setMessage({ type: 'success', text: t('updateSuccess') });
            } else {
                setMessage({ type: 'error', text: data.error || t('updateError') });
            }
        } catch (error) {
            setMessage({ type: 'error', text: t('updateError') });
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await fetch('/api/user/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                setChangingPassword(false);
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setMessage({ type: 'success', text: t('passwordUpdateSuccess') });
            } else {
                setMessage({ type: 'error', text: data.error || t('passwordUpdateError') });
            }
        } catch (error) {
            setMessage({ type: 'error', text: t('passwordUpdateError') });
        } finally {
            setSaving(false);
        }
    };

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-medical-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!session || !profile) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('title')}</h1>
                </div>

                {/* Message */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${message.type === 'success'
                            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
                            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
                        }`}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{message.text}</span>
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                        {!editing && !changingPassword && (
                            <button
                                onClick={() => setEditing(true)}
                                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-medical-primary dark:text-medical-secondary hover:bg-medical-light dark:hover:bg-gray-700 rounded-md transition-colors"
                            >
                                <Edit2 size={16} />
                                <span>{t('editProfile')}</span>
                            </button>
                        )}
                    </div>

                    {editing ? (
                        <form onSubmit={handleUpdateProfile} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t('name')}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {t('email')}
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex items-center space-x-2 px-4 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-primary/90 disabled:opacity-50 transition-colors"
                                >
                                    <Save size={16} />
                                    <span>{saving ? 'Saving...' : t('saveChanges')}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditing(false);
                                        setFormData({ name: profile.name || '', email: profile.email || '' });
                                    }}
                                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X size={16} />
                                    <span>{t('cancel')}</span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <User className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('name')}</p>
                                    <p className="text-gray-900 dark:text-white font-medium">{profile.name || 'Not set'}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Mail className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('email')}</p>
                                    <p className="text-gray-900 dark:text-white font-medium">{profile.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Shield className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('role')}</p>
                                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${profile.role === 'admin'
                                            ? 'bg-medical-primary/10 text-medical-primary'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                        }`}>
                                        {profile.role === 'admin' ? t('admin') : t('user')}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Calendar className="text-gray-400" size={20} />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('joinedDate')}</p>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                        {format(new Date(profile.createdAt), 'MMMM dd, yyyy')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Change Password Card */}
                {!editing && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('changePassword')}</h2>
                            {!changingPassword && (
                                <button
                                    onClick={() => setChangingPassword(true)}
                                    className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-medical-primary dark:text-medical-secondary hover:bg-medical-light dark:hover:bg-gray-700 rounded-md transition-colors"
                                >
                                    <Lock size={16} />
                                    <span>Change Password</span>
                                </button>
                            )}
                        </div>

                        {changingPassword ? (
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t('currentPassword')}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type={showCurrentPassword ? 'text' : 'password'}
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t('newPassword')}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type={showNewPassword ? 'text' : 'password'}
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        {t('confirmPassword')}
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex space-x-3">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex items-center space-x-2 px-4 py-2 bg-medical-primary text-white rounded-lg hover:bg-medical-primary/90 disabled:opacity-50 transition-colors"
                                    >
                                        <Save size={16} />
                                        <span>{saving ? 'Updating...' : 'Update Password'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setChangingPassword(false);
                                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                        }}
                                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <X size={16} />
                                        <span>{t('cancel')}</span>
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                Click the button above to change your password
                            </p>
                        )}
                    </div>
                )}

                {/* Logout Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => signOut({ callbackUrl: `/${locale}` })}
                        className="flex items-center space-x-2 px-6 py-2 text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        <LogOut size={18} />
                        <span>{t('logout')}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
