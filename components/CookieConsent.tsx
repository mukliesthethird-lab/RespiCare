'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, Settings } from 'lucide-react';

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsOpen(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookie-consent', 'all');
        setIsOpen(false);
    };

    const handleRejectAll = () => {
        localStorage.setItem('cookie-consent', 'necessary');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6">
                    <div className="flex items-start space-x-4">
                        <Cookie className="text-medical-primary flex-shrink-0 mt-1" size={32} />
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                Cookie Preferences
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                We use cookies to enhance your browsing experience, remember your preferences, and analyze our traffic.
                                By clicking "Accept All", you consent to our use of cookies.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleAcceptAll}
                                    className="px-6 py-2 bg-gradient-to-r from-medical-primary to-medical-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all"
                                >
                                    Accept All
                                </button>
                                <button
                                    onClick={handleRejectAll}
                                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                                >
                                    Necessary Only
                                </button>
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                                Read our <a href="/privacy" className="underline">Privacy Policy</a> and <a href="/terms" className="underline">Terms of Service</a>.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
