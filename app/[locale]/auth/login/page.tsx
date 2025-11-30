import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import LoginForm from '@/components/Auth/LoginForm';

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <div className="fixed inset-0 overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-6">
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/respicare-logo-large.png"
                            alt="RespiCare"
                            width={400}
                            height={120}
                            className="h-28 w-auto"
                            priority
                        />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {locale === 'id' ? 'Masuk ke Akun' : 'Sign In'}
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {locale === 'id' ? 'Masuk untuk melacak riwayat prediksi Anda' : 'Sign in to track your prediction history'}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <LoginForm locale={locale} />

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {locale === 'id' ? 'Belum punya akun?' : "Don't have an account?"}{' '}
                            <Link
                                href={`/${locale}/auth/signup`}
                                className="text-medical-primary hover:text-medical-dark font-medium"
                            >
                                {locale === 'id' ? 'Daftar sekarang' : 'Sign up now'}
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <Link
                        href={`/${locale}`}
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-medical-primary"
                    >
                        ← {locale === 'id' ? 'Kembali ke beranda' : 'Back to home'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
