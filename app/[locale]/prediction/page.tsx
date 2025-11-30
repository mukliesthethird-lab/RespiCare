'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import PredictionForm from '@/components/PredictionForm';
import PredictionResults from '@/components/PredictionResults';
import AuthPromptModal from '@/components/AuthPromptModal';
import { type PredictionResult } from '@/lib/questions';
import { useParams } from 'next/navigation';

export default function PredictionPage() {
  const t = useTranslations('prediction');
  const params = useParams();
  const locale = params.locale as string;
  const { data: session, status } = useSession();

  const [results, setResults] = useState<PredictionResult | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  // Show modal every time for unauthenticated users
  useEffect(() => {
    // Wait for session to load
    if (status === 'loading') return;

    // Show modal if user is not logged in
    if (status === 'unauthenticated') {
      setShowAuthModal(true);
    }
  }, [status]);

  const handleCloseModal = () => {
    setShowAuthModal(false);
  };

  // Scroll to top when page first loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = (predictionResults: PredictionResult) => {
    setResults(predictionResults);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Auth Prompt Modal */}
      <AuthPromptModal
        isOpen={showAuthModal}
        onClose={handleCloseModal}
        locale={locale}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!results ? (
          <>
            <div ref={titleRef} className="mb-8 animate-fade-in">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {t('title')}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                {t('subtitle')}
              </p>
            </div>

            <PredictionForm locale={locale} onSubmit={handleSubmit} titleRef={titleRef} />
          </>
        ) : (
          <PredictionResults results={results} locale={locale} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
