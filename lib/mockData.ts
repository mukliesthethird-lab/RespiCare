export interface CityAQI {
  city: string;
  aqi: number;
  category: 'good' | 'moderate' | 'unhealthy' | 'veryUnhealthy' | 'hazardous';
  latitude: number;
  longitude: number;
  pm25: number;
  pm10: number;
}

export interface TrendData {
  date: string;
  aqi: number;
}

export const indonesianCities: CityAQI[] = [
  { city: 'Jakarta', aqi: 75, category: 'moderate', latitude: -6.1750, longitude: 106.8656, pm25: 35, pm10: 75 },
  { city: 'Surabaya', aqi: 117, category: 'unhealthy', latitude: -7.2575, longitude: 112.7521, pm25: 40, pm10: 85 },
  { city: 'Bandung', aqi: 153, category: 'veryUnhealthy', latitude: -6.9175, longitude: 107.6191, pm25: 28, pm10: 65 },
  { city: 'Semarang', aqi: 85, category: 'moderate', latitude: -6.9667, longitude: 110.4167, pm25: 35, pm10: 75 },
  { city: 'Makassar', aqi: 48, category: 'good', latitude: -5.1477, longitude: 119.4327, pm25: 18, pm10: 42 },
  { city: 'Medan', aqi: 205, category: 'hazardous', latitude: 3.5833, longitude: 98.6667, pm25: 25, pm10: 58 },
  { city: 'Palembang', aqi: 82, category: 'moderate', latitude: -2.9761, longitude: 104.7754, pm25: 51, pm10: 94 },
  { city: 'Denpasar', aqi: 42, category: 'good', latitude: -8.6705, longitude: 115.2126, pm25: 15, pm10: 38 },
  { city: 'Yogyakarta', aqi: 68, category: 'moderate', latitude: -7.7956, longitude: 110.3695, pm25: 26, pm10: 60 },
  { city: 'Balikpapan', aqi: 35, category: 'good', latitude: -1.2379, longitude: 116.8529, pm25: 8, pm10: 18 },
  { city: 'Tangerang', aqi: 152, category: 'veryUnhealthy', latitude: -6.1757, longitude: 106.6297, pm25: 35, pm10: 75 },
  { city: 'Bekasi', aqi: 79, category: 'moderate', latitude: -6.2347, longitude: 106.9382, pm25: 31, pm10: 70 },
  { city: 'Bogor', aqi: 67, category: 'moderate', latitude: -6.5958, longitude: 106.7872, pm25: 35, pm10: 75 },
  { city: 'Depok', aqi: 108, category: 'unhealthy', latitude: -6.1757, longitude: 106.6297, pm25: 35, pm10: 75 },
  { city: 'Pekanbaru', aqi: 94, category: 'moderate', latitude: -0.2347, longitude: 101.4419, pm25: 35, pm10: 75 },
  { city: 'Tanjungpinang', aqi: 85, category: 'moderate', latitude: -2.7281, longitude: 107.6379, pm25: 35, pm10: 75 },
  { city: 'Manado', aqi: 55, category: 'moderate', latitude: 1.4927, longitude: 124.8419, pm25: 20, pm10: 45 },
  { city: 'Kupang', aqi: 33, category: 'good', latitude: -10.1773, longitude: 123.6069, pm25: 10, pm10: 25 },
  { city: 'Samarinda', aqi: 48, category: 'good', latitude: -0.5020, longitude: 117.1530, pm25: 15, pm10: 38 },
  { city: 'Malang', aqi: 62, category: 'moderate', latitude: -7.9839, longitude: 112.6214, pm25: 27, pm10: 55 },
  { city: 'Pontianak', aqi: 70, category: 'moderate', latitude: -0.0264, longitude: 109.3425, pm25: 30, pm10: 60 },
  { city: 'Padang', aqi: 45, category: 'good', latitude: -0.9497, longitude: 100.3545, pm25: 17, pm10: 40 },
  { city: 'Banda Aceh', aqi: 50, category: 'good', latitude: 5.5560, longitude: 95.3222, pm25: 18, pm10: 42 },
  { city: 'Jambi', aqi: 76, category: 'moderate', latitude: -1.6100, longitude: 103.6100, pm25: 25, pm10: 55 },
  { city: 'Palu', aqi: 55, category: 'moderate', latitude: -0.8950, longitude: 119.8572, pm25: 22, pm10: 50 },
  { city: 'Ternate', aqi: 38, category: 'good', latitude: 0.7893, longitude: 127.3770, pm25: 12, pm10: 28 },
  { city: 'Jayapura', aqi: 42, category: 'good', latitude: -2.5333, longitude: 140.7171, pm25: 15, pm10: 35 },
  { city: 'Banjarmasin', aqi: 65, category: 'moderate', latitude: -3.3167, longitude: 114.5833, pm25: 28, pm10: 58 },
  { city: 'Cirebon', aqi: 50, category: 'good', latitude: -6.7328, longitude: 108.5522, pm25: 18, pm10: 40 },
  { city: 'Serang', aqi: 55, category: 'moderate', latitude: -6.1200, longitude: 106.1500, pm25: 22, pm10: 45 },
  { city: 'Mataram', aqi: 40, category: 'good', latitude: -8.5833, longitude: 116.1167, pm25: 15, pm10: 35 },
  { city: 'Denpasar', aqi: 45, category: 'good', latitude: -8.6500, longitude: 115.2167, pm25: 17, pm10: 40 },
  { city: 'Mojokerto', aqi: 55, category: 'moderate', latitude: -7.4667, longitude: 112.4333, pm25: 22, pm10: 45 },
];


export const generateTrendData = (baseAQI: number): TrendData[] => {
  const data: TrendData[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const variation = Math.floor(Math.random() * 30) - 15;
    data.push({
      date: date.toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
      aqi: Math.max(0, baseAQI + variation)
    });
  }
  
  return data;
};

export const getAQIColor = (aqi: number): string => {
  if (aqi <= 50) return '#00E400';
  if (aqi <= 100) return '#FFFF00';
  if (aqi <= 150) return '#FF7E00';
  if (aqi <= 200) return '#FF0000';
  return '#8F3F97';
};

export const getAQICategory = (aqi: number): string => {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'unhealthy';
  if (aqi <= 200) return 'veryUnhealthy';
  return 'hazardous';
};

export const getAQIAdvice = (category: string, locale: string = 'id'): string => {
  const advice: Record<string, Record<string, string>> = {
    good: {
      id: 'Kualitas udara baik. Aman untuk aktivitas outdoor.',
      en: 'Air quality is good. Safe for outdoor activities.'
    },
    moderate: {
      id: 'Kualitas udara sedang. Orang sensitif sebaiknya mengurangi aktivitas outdoor berkepanjangan.',
      en: 'Air quality is moderate. Sensitive individuals should limit prolonged outdoor activities.'
    },
    unhealthy: {
      id: 'Tidak sehat. Gunakan masker dan batasi aktivitas outdoor.',
      en: 'Unhealthy. Wear a mask and limit outdoor activities.'
    },
    veryUnhealthy: {
      id: 'Sangat tidak sehat! Hindari aktivitas outdoor. Gunakan air purifier indoor.',
      en: 'Very unhealthy! Avoid outdoor activities. Use indoor air purifier.'
    },
    hazardous: {
      id: 'Berbahaya! Tetap di dalam ruangan. Gunakan masker N95 jika harus keluar.',
      en: 'Hazardous! Stay indoors. Wear N95 mask if going outside is necessary.'
    }
  };
  
  return advice[category]?.[locale] || advice.good[locale];
};
