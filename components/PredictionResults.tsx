'use client';

import { PredictionResult } from '@/lib/questions';
import { getRiskLevel, getHealthTips } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { AlertCircle, CheckCircle, Activity, Save, Check } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface PredictionResultsProps {
  results: PredictionResult;
  locale: string;
  onReset: () => void;
}

export default function PredictionResults({ results, locale, onReset }: PredictionResultsProps) {
  const t = useTranslations('prediction');
  const { data: session } = useSession();
  const resultRef = useRef<HTMLDivElement>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  // Auto-save prediction for logged-in users
  useEffect(() => {
    const savePrediction = async () => {
      if (!session?.user) return;

      setSaveStatus('saving');

      try {
        const response = await fetch('/api/prediction/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chronicCough: results.chronicCough,
            asthma: results.asthma,
            copd: results.copd,
            respiratoryInfection: results.respiratoryInfection,
          }),
        });

        if (response.ok) {
          setSaveStatus('saved');
        } else {
          setSaveStatus('error');
        }
      } catch (error) {
        console.error('Failed to save prediction:', error);
        setSaveStatus('error');
      }
    };

    savePrediction();
  }, [session, results]);

  const chartData = [
    { name: t('chronicCough'), value: Math.round(results.chronicCough), color: '#FF6B6B' },
    { name: t('asthma'), value: Math.round(results.asthma), color: '#4ECDC4' },
    { name: t('copd'), value: Math.round(results.copd), color: '#FFE66D' },
    { name: t('respiratoryInfection'), value: Math.round(results.respiratoryInfection), color: '#95E1D3' },
  ];

  const healthTips = getHealthTips(
    results.chronicCough,
    results.asthma,
    results.copd,
    results.respiratoryInfection,
    locale
  );

  // 📌 ENHANCED FUNCTION: Download PDF with better formatting
  const handleDownload = async () => {
    if (!resultRef.current) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Header
    pdf.setFillColor(59, 130, 246); // medical-primary color
    pdf.rect(0, 0, pageWidth, 35, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.setFont('helvetica', 'bold');
    pdf.text('RespiCare', 15, 15);
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(locale === 'id' ? 'Laporan Analisis Risiko Penyakit Pernapasan' : 'Respiratory Disease Risk Analysis Report', 15, 25);

    // Date
    const date = new Date().toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    pdf.setTextColor(200, 200, 200);
    pdf.setFontSize(9);
    pdf.text(date, pageWidth - 15, 15, { align: 'right' });

    // Capture content as image
    const element = resultRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = pageWidth - 30;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 15, 40, imgWidth, imgHeight);

    // Footer - Medical Disclaimer
    const footerY = pageHeight - 25;
    pdf.setFillColor(245, 245, 245);
    pdf.rect(0, footerY - 5, pageWidth, 30, 'F');
    pdf.setTextColor(100, 100, 100);
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    const disclaimer = locale === 'id'
      ? 'DISCLAIMER: Ini bukan diagnosis medis. Konsultasikan dengan profesional kesehatan untuk saran medis.'
      : 'DISCLAIMER: This is not a medical diagnosis. Consult healthcare professionals for medical advice.';
    pdf.text(disclaimer, pageWidth / 2, footerY + 2, { align: 'center', maxWidth: pageWidth - 30 });

    pdf.save(`RespiCare-Report-${date.replace(/\s/g, '-')}.pdf`);
  };


  // Card penyakit
  const DiseaseCard = ({ name, percentage, index }: { name: string; percentage: number; index: number }) => {
    const { level, color } = getRiskLevel(percentage);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-white dark:!bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
          <Activity className={color} size={24} />
        </div>

        <div className="mb-3">
          <div className="flex items-end justify-between mb-2">
            <span className={`text-3xl font-bold ${color}`}>{Math.round(percentage)}%</span>
            <span className={`text-sm font-medium ${color}`}>{t(level)}</span>
          </div>

          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="h-full rounded-full"
              style={{ backgroundColor: chartData[index].color }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      ref={resultRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto space-y-8"
    >

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-medical-primary to-medical-secondary rounded-lg shadow-lg p-8 text-white"
      >
        <h2 className="text-3xl font-bold mb-2">{t('resultsTitle')}</h2>
        <p className="text-blue-100">
          {locale === 'id'
            ? 'Berikut adalah hasil analisis risiko penyakit pernapasan Anda'
            : 'Here are your respiratory disease risk analysis results'}
        </p>
      </motion.div>

      {/* SAVE STATUS NOTIFICATION */}
      {session?.user && saveStatus !== 'idle' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg p-4 border ${saveStatus === 'saved'
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
            : saveStatus === 'saving'
              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            }`}
        >
          <div className="flex items-center space-x-3">
            {saveStatus === 'saved' ? (
              <>
                <Check className="text-green-600 dark:text-green-400" size={20} />
                <p className="text-green-800 dark:text-green-200 font-medium">
                  {locale === 'id'
                    ? ' Hasil telah disimpan ke dashboard Anda'
                    : ' Results saved to your dashboard'}
                </p>
              </>
            ) : saveStatus === 'saving' ? (
              <>
                <Save className="text-blue-600 dark:text-blue-400 animate-pulse" size={20} />
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  {locale === 'id' ? 'Menyimpan hasil...' : 'Saving results...'}
                </p>
              </>
            ) : (
              <>
                <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
                <p className="text-red-800 dark:text-red-200 font-medium">
                  {locale === 'id'
                    ? 'Gagal menyimpan hasil. Hasil tetap ditampilkan.'
                    : 'Failed to save results. Results still displayed.'}
                </p>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* RISK LEVELS */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{t('riskLevels')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DiseaseCard name={t('chronicCough')} percentage={results.chronicCough} index={0} />
          <DiseaseCard name={t('asthma')} percentage={results.asthma} index={1} />
          <DiseaseCard name={t('copd')} percentage={results.copd} index={2} />
          <DiseaseCard name={t('respiratoryInfection')} percentage={results.respiratoryInfection} index={3} />
        </div>
      </div>

      {/* PIE CHART */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:!bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
      >
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white text-center">
          {locale === 'id' ? 'Distribusi Risiko Penyakit' : 'Disease Risk Distribution'}
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              animationBegin={600}
              animationDuration={1000}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* HEALTH TIPS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md p-6 border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-start space-x-3 mb-4">
          <AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t('healthTips')}</h3>
            <ul className="space-y-2">
              {healthTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start space-x-2 text-gray-700 dark:text-gray-300"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* BUTTONS */}
      <div className="flex justify-center space-x-4">

        {/* DOWNLOAD PDF BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
        >
          {locale === 'id' ? 'Download Hasil' : 'Download Results'}
        </motion.button>

        {/* RESET BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-8 py-3 bg-gradient-to-r from-medical-primary to-medical-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all"
        >
          {locale === 'id' ? 'Ulangi Tes' : 'Retake Test'}
        </motion.button>

      </div>
    </motion.div>
  );
}
