import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import CityGrid from '@/components/CityGrid'; // Pastikan komponen ini sudah ada dari langkah sebelumnya
import PollutionChart from '@/components/PollutionChart';
import { indonesianCities, generateTrendData, getAQIAdvice } from '@/lib/mockData';
import { AlertTriangle, Activity, Wind, Shield, ArrowRight, Stethoscope } from 'lucide-react';

// Import Peta secara dinamis
const IndonesiaMap = dynamic(() => import('@/components/IndonesiaMap'), { ssr: false });

export default function LandingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  
  // 1. Tetap cari kota terburuk untuk ALARM / Alert di atas
  const worstCity = indonesianCities.reduce((prev, current) => 
    (prev.aqi > current.aqi) ? prev : current
  );

  // 2. Hitung RATA-RATA AQI Nasional untuk Grafik Trend
  const averageAQI = Math.round(
    indonesianCities.reduce((sum, city) => sum + city.aqi, 0) / indonesianCities.length
  );

  // 3. Generate data trend berdasarkan Rata-rata Nasional
  const trendData = generateTrendData(averageAQI);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      
      {/* --- HERO SECTION --- */}
      <section className="relative bg-gradient-to-br from-medical-primary to-medical-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-blue-100">AI System Online v1.0</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                {t('landing.heroTitle')}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-xl">
                {t('landing.heroSubtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={`/${locale}/prediction`}
                  className="px-8 py-4 bg-white text-medical-primary rounded-lg font-bold text-lg hover:bg-blue-50 transition-all shadow-lg flex items-center justify-center space-x-2 group"
                >
                  <Stethoscope size={24} />
                  <span>{t('landing.ctaPredict')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#dashboard"
                  className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-lg font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  {t('landing.ctaMonitor')}
                </a>
              </div>
            </div>
            
            {/* Visual Hero */}
            <div className="hidden lg:block relative animate-slide-up">
              <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/30 rounded-full blur-3xl"></div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/20 pb-4">
                    <div>
                      {/* PERBAIKAN: Gunakan translation key */}
                      <div className="text-sm text-blue-200">{t('landing.heroVisual.statusLabel')}</div>
                      <div className="text-2xl font-bold text-white">{t('landing.heroVisual.statusValue')}</div>
                    </div>
                    <Activity className="text-green-400" size={40} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      {/* PERBAIKAN: Gunakan translation key */}
                      <span>{t('landing.heroVisual.asthmaRisk')}</span>
                      <span>12% ({t('landing.heroVisual.low')})</span>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-blue-100">
                      {/* PERBAIKAN: Gunakan translation key */}
                      <span>{t('landing.heroVisual.copdRisk')}</span>
                      <span>5% ({t('landing.heroVisual.low')})</span>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: t('landing.feature1Title'), desc: t('landing.feature1Desc'), color: "text-blue-600" },
              { icon: Wind, title: t('landing.feature2Title'), desc: t('landing.feature2Desc'), color: "text-green-600" },
              { icon: Activity, title: t('landing.feature3Title'), desc: t('landing.feature3Desc'), color: "text-orange-600" }
            ].map((feature, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50 hover:shadow-md transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-white dark:bg-gray-800 shadow-sm ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- DASHBOARD SECTION --- */}
      <div id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t('dashboard.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Alert Peringatan (Tetap menggunakan kota terburuk karena ini penting untuk peringatan) */}
        {worstCity.aqi > 150 && (
          <div className="mb-10 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start space-x-3 animate-pulse-slow">
            <AlertTriangle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-bold text-red-900 dark:text-red-100">
                {locale === 'id' ? 'Peringatan Kualitas Udara Ekstrem' : 'Air Quality Warning'}
              </h3>
              <p className="text-red-800 dark:text-red-200">
                {locale === 'id' 
                  ? `Terdeteksi kualitas udara berbahaya di ${worstCity.city} (AQI: ${worstCity.aqi}). ${getAQIAdvice(worstCity.category, locale)}`
                  : `Air quality in ${worstCity.city} is very poor (AQI: ${worstCity.aqi}). ${getAQIAdvice(worstCity.category, locale)}`
                }
              </p>
            </div>
          </div>
        )}

        {/* Peta Indonesia */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Wind size={20} className="text-medical-primary" />
            <span>{t('dashboard.mapTitle')}</span>
          </h3>
          <div className="shadow-lg rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <IndonesiaMap cities={indonesianCities} />
          </div>
        </div>

        {/* City Grid (Daftar Kota) */}
        <CityGrid 
          cities={indonesianCities}
          title={t('dashboard.aqiTitle')}
          seeMoreLabel={t('dashboard.seeMore')}
          seeLessLabel={t('dashboard.seeLess')}
        />

        {/* Grafik & Saran */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Judul Grafik disesuaikan menjadi Indonesia (Rata-rata) */}
            <PollutionChart 
              data={trendData} 
              title={`${t('dashboard.trendTitle')} - Indonesia ${locale === 'id' ? '(Rata-rata)' : '(Average)'}`} 
            />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 h-fit">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
              <Shield size={20} className="text-medical-secondary" />
              <span>{t('dashboard.adviceTitle')}</span>
            </h3>
            <div className="space-y-4">
              {['good', 'moderate', 'unhealthy'].map((category) => (
                <div key={category} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5"
                    style={{ 
                      backgroundColor: category === 'good' ? '#00E400' :
                                       category === 'moderate' ? '#FFFF00' : '#FF7E00'
                    }}
                  />
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white capitalize">
                      {t(`dashboard.${category}`)}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      {getAQIAdvice(category, locale)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}