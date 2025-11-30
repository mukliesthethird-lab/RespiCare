'use client';

import { useState, useEffect, RefObject } from 'react';
import { predictionQuestions, calculatePrediction, type PredictionResult } from '@/lib/questions';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle2 } from 'lucide-react';

interface PredictionFormProps {
  locale: string;
  onSubmit: (results: PredictionResult) => void;
  titleRef?: RefObject<HTMLDivElement>;
}

export default function PredictionForm({ locale, onSubmit, titleRef }: PredictionFormProps) {
  const t = useTranslations('prediction');

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 5;
  const totalPages = Math.ceil(predictionQuestions.length / questionsPerPage);

  // Scroll to title when changing pages
  useEffect(() => {
    const scrollToTop = () => {
      if (titleRef?.current) {
        // Calculate position with offset for header
        const yOffset = -80;
        const element = titleRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        // Fallback to top of window
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Small delay to allow animation to start
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [currentPage, titleRef]);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    const results = calculatePrediction(answers);
    onSubmit(results);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentPage(0);
    // Scroll akan otomatis ditangani oleh useEffect di atas karena currentPage berubah ke 0
  };

  const currentQuestions = predictionQuestions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const isPageComplete = currentQuestions.every(q => answers[q.id] !== undefined);
  const progress = (Object.keys(answers).length / predictionQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Object.keys(answers).length} / {predictionQuestions.length}
          </span>
          <span className="text-sm font-medium text-medical-primary dark:text-medical-secondary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-medical-primary to-medical-secondary"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {currentQuestions.map((question, index) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:!bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex-1">
                  {question.id}. {locale === 'id' ? question.questionId : question.questionEn}
                </h3>
                {answers[question.id] !== undefined && (
                  <CheckCircle2 className="text-green-500 flex-shrink-0 ml-2" size={24} />
                )}
              </div>

              {question.type === 'yesno' ? (
                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(question.id, 0)}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${answers[question.id] === 0
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    {locale === 'id' ? 'Tidak' : 'No'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(question.id, 3)}
                    className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all ${answers[question.id] === 3
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                  >
                    {locale === 'id' ? 'Ya' : 'Yes'}
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>{locale === 'id' ? 'Tidak Pernah' : 'Never'}</span>
                    <span>{locale === 'id' ? 'Sangat Sering' : 'Very Often'}</span>
                  </div>
                  <div className="flex space-x-2">
                    {[0, 1, 2, 3].map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAnswer(question.id, value)}
                        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${answers[question.id] === value
                          ? 'bg-medical-primary text-white shadow-lg'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="mt-8 flex justify-between items-center">
        <div className="space-x-2">
          {currentPage > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {locale === 'id' ? 'Sebelumnya' : 'Previous'}
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {t('reset')}
          </motion.button>
        </div>

        <div className="space-x-2">
          {currentPage < totalPages - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!isPageComplete}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${isPageComplete
                ? 'bg-medical-primary text-white hover:bg-medical-dark'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
            >
              {locale === 'id' ? 'Selanjutnya' : 'Next'}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== predictionQuestions.length}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${Object.keys(answers).length === predictionQuestions.length
                ? 'bg-gradient-to-r from-medical-primary to-medical-secondary text-white hover:shadow-lg'
                : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
            >
              {t('submit')}
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}