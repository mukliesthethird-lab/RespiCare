import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRiskLevel = (percentage: number): { level: string; color: string } => {
  if (percentage < 25) return { level: 'low', color: 'text-green-600 dark:text-green-400' };
  if (percentage < 50) return { level: 'medium', color: 'text-yellow-600 dark:text-yellow-400' };
  if (percentage < 75) return { level: 'high', color: 'text-orange-600 dark:text-orange-400' };
  return { level: 'veryHigh', color: 'text-red-600 dark:text-red-400' };
};

export const getHealthTips = (
  chronicCough: number,
  asthma: number,
  copd: number,
  infection: number,
  locale: string = 'id'
) => {
  const tips: Record<string, string[]> = {
    id: [
      // ORIGINAL
      'Konsultasikan dengan dokter untuk pemeriksaan lebih lanjut',     // 0
      'Hindari paparan asap rokok dan polusi udara',                    // 1
      'Gunakan masker saat berada di luar ruangan',                     // 2
      'Jaga kebersihan rumah dari debu dan alergen',                    // 3
      'Lakukan olahraga ringan secara teratur',                         // 4
      'Konsumsi makanan bergizi dan perbanyak air putih',               // 5
      'Gunakan air purifier di dalam ruangan',                          // 6
      'Istirahat yang cukup untuk memperkuat sistem imun',              // 7

      // NEW GENERAL TIPS
      'Gunakan humidifier untuk menjaga kelembapan udara',              // 8
      'Kurangi aktivitas berat saat gejala kambuh',                     // 9
      'Hindari perubahan suhu ekstrem secara mendadak',                 // 10

      // NEW ASTHMA TIPS
      'Pastikan inhaler selalu tersedia dan mudah dijangkau',           // 11
      'Lakukan pemeriksaan fungsi paru secara berkala',                 // 12
      'Hindari pemicu asma seperti debu, bulu hewan, atau parfum tajam', // 13

      // NEW COPD TIPS
      'Lakukan latihan pernapasan seperti pursed-lip breathing',        // 14
      'Pantau saturasi oksigen jika memungkinkan',                      // 15

      // NEW INFECTION TIPS
      'Cuci tangan secara rutin untuk mencegah penyebaran kuman',       // 16
      'Pastikan ventilasi rumah baik untuk mengurangi risiko infeksi'   // 17
    ],

    en: [
      'Consult with a doctor for further examination',
      'Avoid exposure to cigarette smoke and air pollution',
      'Wear a mask when outdoors',
      'Keep your home clean from dust and allergens',
      'Do light exercise regularly',
      'Eat nutritious food and drink plenty of water',
      'Use an air purifier indoors',
      'Get enough rest to strengthen your immune system',

      // NEW GENERAL TIPS
      'Use a humidifier to maintain healthy air humidity',
      'Reduce heavy physical activity when symptoms worsen',
      'Avoid sudden extreme temperature changes',

      // NEW ASTHMA TIPS
      'Keep your inhaler accessible at all times',
      'Do regular lung function checkups',
      'Avoid asthma triggers such as dust, pet dander, or strong fragrances',

      // NEW COPD TIPS
      'Practice breathing exercises like pursed-lip breathing',
      'Monitor your oxygen saturation if possible',

      // NEW INFECTION TIPS
      'Wash your hands regularly to reduce germ transmission',
      'Ensure good home ventilation to lower infection risks'
    ]
  };

  const maxRisk = Math.max(chronicCough, asthma, copd, infection);
  const selectedTips: string[] = [];

  // Risiko tertinggi → tips umum intensif
  if (maxRisk > 50) {
    selectedTips.push(tips[locale][0], tips[locale][1], tips[locale][2]);
  }

  // Asma / COPD (original)
  if (asthma > 40 || copd > 40) {
    selectedTips.push(tips[locale][3], tips[locale][6]);
  }

  // **NEW: Asma lebih spesifik**
  if (asthma > 50) {
    selectedTips.push(tips[locale][11], tips[locale][12], tips[locale][13]);
  }

  // **NEW: COPD lebih spesifik**
  if (copd > 50) {
    selectedTips.push(tips[locale][14], tips[locale][15]);
  }

  // Infeksi (original + new)
  if (infection > 40) {
    selectedTips.push(tips[locale][7], tips[locale][16], tips[locale][17]);
  }

  // Tips umum dasar
  selectedTips.push(tips[locale][4], tips[locale][5], tips[locale][8], tips[locale][9], tips[locale][10]);

  return Array.from(new Set(selectedTips)); // Hilangkan duplikat
};
