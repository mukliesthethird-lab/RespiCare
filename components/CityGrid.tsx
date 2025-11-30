'use client';

import { useState } from 'react';
import AQICard from './AQICard';
import { CityAQI } from '@/lib/mockData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CityGridProps {
  cities: CityAQI[];
  title: string;
  seeMoreLabel: string;
  seeLessLabel: string;
}

export default function CityGrid({ cities, title, seeMoreLabel, seeLessLabel }: CityGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Jika tidak di-expand, hanya tampilkan 6 kota pertama
  const visibleCities = isExpanded ? cities : cities.slice(0, 6);

  return (
    <div className="mb-12">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {visibleCities.map((city, index) => (
            <AQICard key={city.city} city={city} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {cities.length > 6 && (
        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-medical-primary font-medium hover:underline flex items-center justify-center mx-auto space-x-1 transition-colors group"
          >
            <span>{isExpanded ? seeLessLabel : seeMoreLabel}</span>
            {isExpanded ? (
              <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            ) : (
              <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}