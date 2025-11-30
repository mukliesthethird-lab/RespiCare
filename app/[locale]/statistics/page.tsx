'use client';

import { useTranslations } from 'next-intl';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { indonesianCities } from '@/lib/mockData';
import { motion } from 'framer-motion';

export default function StatisticsPage() {
  const t = useTranslations('statistics');

  const correlationData = indonesianCities.map(city => ({
    city: city.city,
    aqi: city.aqi,
    riskScore: Math.min(100, city.aqi * 0.4 + Math.random() * 20),
  }));

  const distributionData = indonesianCities.map(city => ({
    city: city.city,
    chronicCough: Math.floor(Math.random() * 40 + 10),
    asthma: Math.floor(Math.random() * 35 + 15),
    copd: Math.floor(Math.random() * 30 + 10),
    infection: Math.floor(Math.random() * 25 + 5),
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('correlationTitle')}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="aqi"
                name="AQI"
                stroke="#6b7280"
                label={{ value: 'Air Quality Index (AQI)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                dataKey="riskScore"
                name="Risk Score"
                stroke="#6b7280"
                label={{ value: 'Disease Risk Score', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  borderRadius: '8px',
                }}
                wrapperClassName="dark:bg-gray-800"
              />
              <Scatter
                name="Cities"
                data={correlationData}
                fill="#0066CC"
                animationDuration={1500}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('distributionTitle')}
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="city"
                stroke="#6b7280"
                angle={-45}
                textAnchor="end"
                height={100}
                style={{ fontSize: '12px' }}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                }}
                wrapperClassName="dark:bg-gray-800"
              />
              <Legend />
              <Bar dataKey="chronicCough" fill="#FF6B6B" name="Chronic Cough" animationDuration={1500} />
              <Bar dataKey="asthma" fill="#4ECDC4" name="Asthma" animationDuration={1500} />
              <Bar dataKey="copd" fill="#FFE66D" name="COPD" animationDuration={1500} />
              <Bar dataKey="infection" fill="#95E1D3" name="Infection" animationDuration={1500} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg shadow-md p-6 border border-blue-200 dark:border-blue-800"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            {t('correlationTitle')}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {
              'Data menunjukkan korelasi positif antara kualitas udara buruk (AQI tinggi) dengan peningkatan risiko penyakit pernapasan. Kota dengan AQI lebih tinggi cenderung memiliki persentase risiko penyakit yang lebih besar.'
            }
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">0.78</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Correlation</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{indonesianCities.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cities</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {Math.round(indonesianCities.reduce((sum, c) => sum + c.aqi, 0) / indonesianCities.length)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg AQI</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {indonesianCities.filter(c => c.aqi <= 50).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Good Air</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
