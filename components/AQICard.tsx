'use client';

import { CityAQI, getAQIColor } from '@/lib/mockData';
import { motion } from 'framer-motion';
import { MapPin, Wind } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface AQICardProps {
  city: CityAQI;
  index: number;
}

export default function AQICard({ city, index }: AQICardProps) {
  const t = useTranslations('dashboard');
  const color = getAQIColor(city.aqi);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all p-6 border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin size={20} className="text-medical-primary dark:text-medical-secondary" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{city.city}</h3>
        </div>
        <Wind size={20} className="text-gray-400" />
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div 
            className="text-4xl font-bold mb-1"
            style={{ color }}
          >
            {city.aqi}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {t(city.category)}
          </div>
        </div>
        
        <div className="text-right text-xs text-gray-500 dark:text-gray-400">
          <div>PM2.5: {city.pm25}</div>
          <div>PM10: {city.pm10}</div>
        </div>
      </div>
      
      <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min((city.aqi / 300) * 100, 100)}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
}
