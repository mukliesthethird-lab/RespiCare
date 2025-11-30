'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, LogIn, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

interface AuthPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    locale: string;
}

export default function AuthPromptModal({ isOpen, onClose, locale }: AuthPromptModalProps) {
    const content = {
        en: {
            title: "Get the Most Out of Your Health Check",
            subtitle: "Sign in to save your results and track your health over time",
            benefits: [
                "Save and review your prediction history",
                "Track health trends over time",
                "Get personalized health insights",
                "Access your results from anywhere"
            ],
            loginButton: "Sign In",
            signupButton: "Create Account",
            continueButton: "Continue Without Account",
            note: "You can still use the health check without an account"
        },
        id: {
            title: "Dapatkan Manfaat Maksimal dari Health Check",
            subtitle: "Masuk untuk menyimpan hasil dan melacak kesehatan Anda dari waktu ke waktu",
            benefits: [
                "Simpan dan tinjau riwayat prediksi Anda",
                "Lacak tren kesehatan dari waktu ke waktu",
                "Dapatkan wawasan kesehatan yang dipersonalisasi",
                "Akses hasil Anda dari mana saja"
            ],
            loginButton: "Masuk",
            signupButton: "Buat Akun",
            continueButton: "Lanjutkan Tanpa Akun",
            note: "Anda tetap dapat menggunakan health check tanpa akun"
        }
    };

    const t = content[locale as keyof typeof content] || content.en;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-200 dark:border-gray-700"
                        >
                            {/* Header with gradient */}
                            <div className="relative bg-gradient-to-br from-medical-primary to-medical-secondary p-6 text-white">
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>

                                <div className="pr-8">
                                    <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
                                    <p className="text-blue-100 text-sm">{t.subtitle}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Benefits List */}
                                <div className="space-y-3 mb-6">
                                    {t.benefits.map((benefit, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start space-x-3"
                                        >
                                            <CheckCircle2 className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm">{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Link
                                        href={`/${locale}/auth/login?callbackUrl=/${locale}/prediction`}
                                        className="flex items-center justify-center space-x-2 w-full py-3 bg-medical-primary hover:bg-medical-dark text-white rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                                    >
                                        <LogIn size={20} />
                                        <span>{t.loginButton}</span>
                                    </Link>

                                    <Link
                                        href={`/${locale}/auth/signup`}
                                        className="flex items-center justify-center space-x-2 w-full py-3 bg-white dark:bg-gray-700 border-2 border-medical-primary text-medical-primary dark:text-medical-secondary hover:bg-blue-50 dark:hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                                    >
                                        <UserPlus size={20} />
                                        <span>{t.signupButton}</span>
                                    </Link>

                                    <button
                                        onClick={onClose}
                                        className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
                                    >
                                        {t.continueButton}
                                    </button>
                                </div>

                                {/* Note */}
                                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                                    {t.note}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
