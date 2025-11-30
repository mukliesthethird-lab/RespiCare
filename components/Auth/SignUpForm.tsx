'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, AlertCircle, CheckCircle, CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';

interface SignUpFormProps {
    locale: string;
}

interface PasswordRequirement {
    label: string;
    met: boolean;
}

export default function SignUpForm({ locale }: SignUpFormProps) {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswordHints, setShowPasswordHints] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const getPasswordRequirements = (pass: string): PasswordRequirement[] => {
        return [
            {
                label: locale === 'id' ? 'Minimal 6 karakter' : 'At least 6 characters',
                met: pass.length >= 6
            },
            {
                label: locale === 'id' ? 'Mengandung huruf' : 'Contains letters',
                met: /[a-zA-Z]/.test(pass)
            },
            {
                label: locale === 'id' ? 'Mengandung angka' : 'Contains numbers',
                met: /\d/.test(pass)
            },
            {
                label: locale === 'id' ? 'Mengandung huruf besar (opsional)' : 'Contains uppercase (optional)',
                met: /[A-Z]/.test(pass)
            },
        ];
    };

    const requirements = getPasswordRequirements(password);
    const passwordStrength = requirements.filter(r => r.met).length;

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

    const handleNameBlur = () => {
        if (name && name.trim().length < 2) {
            setFieldErrors(prev => ({
                ...prev,
                name: locale === 'id' ? 'Nama terlalu pendek' : 'Name is too short'
            }));
        } else {
            setFieldErrors(prev => ({ ...prev, name: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setFieldErrors({});

        // Validation
        const newFieldErrors: typeof fieldErrors = {};

        if (!name || name.trim().length < 2) {
            newFieldErrors.name = locale === 'id' ? 'Nama minimal 2 karakter' : 'Name must be at least 2 characters';
        }

        if (!email) {
            newFieldErrors.email = locale === 'id' ? 'Email wajib diisi' : 'Email is required';
        } else if (!validateEmail(email)) {
            newFieldErrors.email = locale === 'id' ? 'Format email tidak valid' : 'Invalid email format';
        }

        if (!password) {
            newFieldErrors.password = locale === 'id' ? 'Password wajib diisi' : 'Password is required';
        } else if (password.length < 6) {
            newFieldErrors.password = locale === 'id' ? 'Password minimal 6 karakter' : 'Password must be at least 6 characters';
        } else if (!/[a-zA-Z]/.test(password)) {
            newFieldErrors.password = locale === 'id' ? 'Password harus mengandung huruf' : 'Password must contain letters';
        } else if (!/\d/.test(password)) {
            newFieldErrors.password = locale === 'id' ? 'Password harus mengandung angka' : 'Password must contain numbers';
        }

        if (password !== confirmPassword) {
            newFieldErrors.confirmPassword = locale === 'id' ? 'Password tidak cocok' : 'Passwords do not match';
        }

        if (Object.keys(newFieldErrors).length > 0) {
            setFieldErrors(newFieldErrors);
            setError(locale === 'id' ? 'Mohon perbaiki kesalahan di atas' : 'Please fix the errors above');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error?.includes('already exists')) {
                    setFieldErrors({ email: locale === 'id' ? 'Email sudah terdaftar' : 'Email already registered' });
                    setError(locale === 'id' ? 'Akun dengan email ini sudah ada' : 'An account with this email already exists');
                } else {
                    setError(data.error || (locale === 'id' ? 'Pendaftaran gagal' : 'Registration failed'));
                }
                return;
            }

            setSuccess(true);
            setTimeout(() => {
                router.push(`/${locale}/auth/login`);
            }, 2000);
        } catch (error: any) {
            setError(locale === 'id' ? 'Tidak dapat terhubung. Periksa koneksi internet Anda.' : 'Connection failed. Check your internet connection.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg p-6 text-center animate-in slide-in-from-top-2">
                <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {locale === 'id' ? 'Pendaftaran Berhasil!' : 'Registration Successful!'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    {locale === 'id' ? 'Mengarahkan ke halaman login...' : 'Redirecting to login...'}
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg p-3 flex items-start space-x-2 animate-in slide-in-from-top-2">
                    <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
                </div>
            )}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {locale === 'id' ? 'Nama Lengkap' : 'Full Name'}
                </label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setFieldErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        onBlur={handleNameBlur}
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm transition-colors ${fieldErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        placeholder={locale === 'id' ? 'Nama Anda' : 'Your Name'}
                        required
                    />
                    {name && !fieldErrors.name && name.trim().length >= 2 && (
                        <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                    )}
                </div>
                {fieldErrors.name && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center space-x-1">
                        <XCircle size={12} />
                        <span>{fieldErrors.name}</span>
                    </p>
                )}
            </div>

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
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm transition-colors ${fieldErrors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
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
                        <XCircle size={12} />
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
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setFieldErrors(prev => ({ ...prev, password: undefined }));
                        }}
                        onFocus={() => setShowPasswordHints(true)}
                        className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm transition-colors ${fieldErrors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        placeholder="••••••••"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {fieldErrors.password && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center space-x-1">
                        <XCircle size={12} />
                        <span>{fieldErrors.password}</span>
                    </p>
                )}
                {showPasswordHints && password && (
                    <div className="mt-2 space-y-1">
                        {requirements.map((req, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs">
                                {req.met ? (
                                    <CheckCircle2 className="text-green-500 flex-shrink-0" size={14} />
                                ) : (
                                    <XCircle className="text-gray-400 flex-shrink-0" size={14} />
                                )}
                                <span className={req.met ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>
                                    {req.label}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setFieldErrors(prev => ({ ...prev, confirmPassword: undefined }));
                        }}
                        className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:ring-2 focus:ring-medical-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm transition-colors ${fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                            }`}
                        placeholder="••••••••"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        tabIndex={-1}
                    >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {confirmPassword && password === confirmPassword && (
                        <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500" size={18} />
                    )}
                </div>
                {fieldErrors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center space-x-1">
                        <XCircle size={12} />
                        <span>{fieldErrors.confirmPassword}</span>
                    </p>
                )}
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
                    <span>{locale === 'id' ? 'Daftar' : 'Sign Up'}</span>
                )}
            </button>
        </form>
    );
}
