'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
    locale: string;
}

export default function LoginForm({ locale }: LoginFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailBlur = () => {
        if (email && !validateEmail(email)) {
            setFieldErrors(prev => ({
                ...prev,
                email: locale === 'id' ? 'Format email tidak valid' : 'Invalid email format'
            }));
        } else {
            setFieldErrors(prev => ({ ...prev, email: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        if (!email || !password) {
            setError(locale === 'id' ? 'Mohon isi semua field' : 'Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            setFieldErrors({ email: locale === 'id' ? 'Format email tidak valid' : 'Invalid email format' });
            return;
        }

        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                if (result.error.includes('credentials')) {
                    setError(locale === 'id'
                        ? 'Email atau password salah. Silakan periksa kembali.'
                        : 'Incorrect email or password. Please check and try again.');
                } else {
                    setError(locale === 'id' ? 'Terjadi kesalahan. Silakan coba lagi.' : 'An error occurred. Please try again.');
                }
            } else {
                // If there's a callback URL, use it. Otherwise go to dashboard
                if (callbackUrl) {
                    router.push(callbackUrl);
                } else {
                    router.push(`/${locale}`);
                }
                router.refresh();
            }
        } catch (error) {
            setError(locale === 'id' ? 'Tidak dapat terhubung. Periksa koneksi internet Anda.' : 'Connection failed. Check your internet connection.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg p-3 flex items-start space-x-2">
                    <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                        <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
                        {error.includes('salah') || error.includes('Incorrect') ? (
                            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                                {locale === 'id' ? 'Tip: Pastikan huruf besar/kecil sudah benar' : 'Tip: Check your caps lock'}
                            </p>
                        ) : null}
                    </div>
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {locale === 'id' ? 'Alamat Email' : 'Email Address'}
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setFieldErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        onBlur={handleEmailBlur}
                        className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm transition-colors ${fieldErrors.email
                            ? 'border-red-500 dark:border-red-400'
                            : 'border-gray-300 dark:border-gray-600'
                            }`}
                        placeholder="nama@contoh.com"
                        required
                    />
                    {email && !fieldErrors.email && validateEmail(email) && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                    )}
                </div>
                {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center space-x-1">
                        <AlertCircle size={12} />
                        <span>{fieldErrors.email}</span>
                    </p>
                )}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                        placeholder="••••••••"
                        required
                        minLength={6}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-medical-primary to-medical-secondary text-white py-2.5 px-4 rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-2"
            >
                {isLoading ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{locale === 'id' ? 'Memproses...' : 'Processing...'}</span>
                    </>
                ) : (
                    <span>{locale === 'id' ? 'Masuk' : 'Sign In'}</span>
                )}
            </button>
        </form>
    );
}
