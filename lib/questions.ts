// File: lib/questions.ts

export interface Question {
  id: number;
  questionId: string;
  questionEn: string;
  type: 'scale' | 'yesno';
  weight: number;
  diseaseFactors: {
    chronicCough: number;
    asthma: number;
    copd: number;
    respiratoryInfection: number;
  };
}

export const predictionQuestions: Question[] = [
  {
    id: 1,
    questionId: 'Apakah Anda mengalami batuk yang berlangsung lebih dari 3 minggu?',
    questionEn: 'Do you experience cough lasting more than 3 weeks?',
    type: 'yesno',
    weight: 2.0, // Dinaikkan karena ini gejala utama
    diseaseFactors: { chronicCough: 0.9, asthma: 0.3, copd: 0.4, respiratoryInfection: 0.3 }
  },
  {
    id: 2,
    questionId: 'Apakah Anda sering mengalami sesak napas?',
    questionEn: 'Do you often experience shortness of breath?',
    type: 'scale',
    weight: 1.8,
    diseaseFactors: { chronicCough: 0.2, asthma: 0.8, copd: 0.7, respiratoryInfection: 0.3 }
  },
  {
    id: 3,
    questionId: 'Apakah Anda perokok aktif atau tidak merokok?',
    questionEn: 'Are you an active or former smoker?',
    type: 'yesno', // Ubah ke yesno untuk dampak lebih tegas
    weight: 2.5, // Bobot sangat tinggi untuk faktor risiko utama
    diseaseFactors: { chronicCough: 0.6, asthma: 0.4, copd: 0.95, respiratoryInfection: 0.2 }
  },
  {
    id: 4,
    questionId: 'Apakah ada riwayat asma dalam keluarga?',
    questionEn: 'Is there a family history of asthma?',
    type: 'yesno',
    weight: 1.5,
    diseaseFactors: { chronicCough: 0.1, asthma: 0.9, copd: 0.1, respiratoryInfection: 0.0 }
  },
  {
    id: 5,
    questionId: 'Seberapa sering Anda terpapar polusi udara (kendaraan, industri)?',
    questionEn: 'How often are you exposed to air pollution (vehicles, industry)?',
    type: 'scale',
    weight: 1.7,
    diseaseFactors: { chronicCough: 0.5, asthma: 0.6, copd: 0.5, respiratoryInfection: 0.4 }
  },
  {
    id: 6,
    questionId: 'Apakah Anda mengalami mengi (bunyi "ngik-ngik" saat bernapas)?',
    questionEn: 'Do you experience wheezing (whistling sound when breathing)?',
    type: 'yesno',
    weight: 2.0,
    diseaseFactors: { chronicCough: 0.1, asthma: 0.95, copd: 0.6, respiratoryInfection: 0.2 }
  },
  {
    id: 7,
    questionId: 'Apakah Anda sering terpapar asap rokok (perokok pasif)?',
    questionEn: 'Are you often exposed to secondhand smoke?',
    type: 'scale',
    weight: 1.5,
    diseaseFactors: { chronicCough: 0.4, asthma: 0.5, copd: 0.4, respiratoryInfection: 0.2 }
  },
  {
    id: 8,
    questionId: 'Apakah Anda bekerja di lingkungan berdebu atau bahan kimia?',
    questionEn: 'Do you work in a dusty or chemical environment?',
    type: 'yesno',
    weight: 1.6,
    diseaseFactors: { chronicCough: 0.5, asthma: 0.4, copd: 0.7, respiratoryInfection: 0.2 }
  },
  {
    id: 9,
    questionId: 'Apakah Anda mengalami batuk berdahak?',
    questionEn: 'Do you experience cough with phlegm?',
    type: 'yesno',
    weight: 1.4,
    diseaseFactors: { chronicCough: 0.8, asthma: 0.2, copd: 0.8, respiratoryInfection: 0.6 }
  },
  {
    id: 10,
    questionId: 'Seberapa sering Anda mengalami pilek atau flu dalam 6 bulan terakhir?',
    questionEn: 'How often have you had colds or flu in the last 6 months?',
    type: 'scale',
    weight: 1.2,
    diseaseFactors: { chronicCough: 0.2, asthma: 0.3, copd: 0.1, respiratoryInfection: 0.9 }
  },
  {
    id: 11,
    questionId: 'Apakah Anda mengalami nyeri dada saat bernapas?',
    questionEn: 'Do you experience chest pain when breathing?',
    type: 'yesno',
    weight: 1.7,
    diseaseFactors: { chronicCough: 0.2, asthma: 0.3, copd: 0.3, respiratoryInfection: 0.8 }
  },
  {
    id: 12,
    questionId: 'Apakah Anda memiliki alergi terhadap debu, tungau, atau serbuk sari?',
    questionEn: 'Do you have allergies to dust, mites, or pollen?',
    type: 'yesno',
    weight: 1.5,
    diseaseFactors: { chronicCough: 0.3, asthma: 0.9, copd: 0.1, respiratoryInfection: 0.2 }
  },
  {
    id: 13,
    questionId: 'Seberapa sering Anda berolahraga per minggu?',
    questionEn: 'How often do you exercise per week?',
    type: 'scale',
    weight: 1.0,
    // Nilai negatif berarti mengurangi risiko
    diseaseFactors: { chronicCough: -0.2, asthma: -0.1, copd: -0.2, respiratoryInfection: -0.3 }
  },
  {
    id: 14,
    questionId: 'Apakah Anda mengalami kelelahan yang tidak biasa?',
    questionEn: 'Do you experience unusual fatigue?',
    type: 'scale',
    weight: 1.1,
    diseaseFactors: { chronicCough: 0.3, asthma: 0.3, copd: 0.6, respiratoryInfection: 0.5 }
  },
  {
    id: 15,
    questionId: 'Apakah Anda berusia di atas 40 tahun?',
    questionEn: 'Are you over 40 years old?',
    type: 'yesno',
    weight: 1.2,
    diseaseFactors: { chronicCough: 0.2, asthma: 0.1, copd: 0.8, respiratoryInfection: 0.1 }
  },
  {
    id: 16,
    questionId: 'Apakah Anda mengalami demam dalam 2 minggu terakhir?',
    questionEn: 'Have you had a fever in the last 2 weeks?',
    type: 'yesno',
    weight: 1.8,
    diseaseFactors: { chronicCough: 0.1, asthma: 0.1, copd: 0.1, respiratoryInfection: 0.95 }
  },
  {
    id: 17,
    questionId: 'Apakah Anda memiliki riwayat penyakit paru-paru?',
    questionEn: 'Do you have a history of lung disease?',
    type: 'yesno',
    weight: 2.5, // Sangat signifikan
    diseaseFactors: { chronicCough: 0.5, asthma: 0.5, copd: 0.8, respiratoryInfection: 0.3 }
  },
  {
    id: 18,
    questionId: 'Seberapa parah gejala Anda mempengaruhi aktivitas sehari-hari?',
    questionEn: 'How severely do your symptoms affect daily activities?',
    type: 'scale',
    weight: 1.6,
    diseaseFactors: { chronicCough: 0.4, asthma: 0.6, copd: 0.7, respiratoryInfection: 0.5 }
  },
  {
    id: 19,
    questionId: 'Apakah Anda mengalami produksi lendir berlebih?',
    questionEn: 'Do you experience excessive mucus production?',
    type: 'yesno',
    weight: 1.3,
    diseaseFactors: { chronicCough: 0.7, asthma: 0.3, copd: 0.8, respiratoryInfection: 0.5 }
  },
  {
    id: 20,
    questionId: 'Apakah gejala Anda memburuk di malam hari atau pagi hari?',
    questionEn: 'Do your symptoms worsen at night or morning?',
    type: 'yesno',
    weight: 1.4,
    diseaseFactors: { chronicCough: 0.4, asthma: 0.85, copd: 0.4, respiratoryInfection: 0.2 }
  },
  {
    id: 21,
    questionId: 'Seberapa sering Anda terpapar AC atau perubahan suhu mendadak?',
    questionEn: 'How often are you exposed to AC or sudden temperature changes?',
    type: 'scale',
    weight: 1.1,
    diseaseFactors: { chronicCough: 0.3, asthma: 0.6, copd: 0.1, respiratoryInfection: 0.4 }
  },
  {
    id: 22,
    questionId: 'Apakah Anda mengonsumsi obat pernapasan secara rutin?',
    questionEn: 'Do you regularly take respiratory medication?',
    type: 'yesno',
    weight: 1.8,
    diseaseFactors: { chronicCough: 0.3, asthma: 0.7, copd: 0.7, respiratoryInfection: 0.2 }
  },
  {
    id: 23,
    questionId: 'Apakah Anda mengalami suara serak atau perubahan suara?',
    questionEn: 'Do you experience hoarseness or voice changes?',
    type: 'yesno',
    weight: 1.2,
    diseaseFactors: { chronicCough: 0.5, asthma: 0.1, copd: 0.1, respiratoryInfection: 0.6 }
  },
  {
    id: 24,
    questionId: 'Seberapa baik kualitas tidur Anda?',
    questionEn: 'How good is your sleep quality?',
    type: 'scale',
    weight: 1.0,
    // Kualitas tidur buruk (nilai rendah) -> risiko naik (ditangani di UI/logic jika perlu, 
    // tapi disini kita asumsi user input skala gangguan: 0=tidak terganggu, 3=sangat terganggu)
    diseaseFactors: { chronicCough: 0.3, asthma: 0.5, copd: 0.4, respiratoryInfection: 0.3 }
  },
  {
    id: 25,
    questionId: 'Apakah Anda tinggal di area dengan kualitas udara buruk?',
    questionEn: 'Do you live in an area with poor air quality?',
    type: 'yesno',
    weight: 1.5,
    diseaseFactors: { chronicCough: 0.5, asthma: 0.6, copd: 0.5, respiratoryInfection: 0.3 }
  }
];

export interface PredictionResult {
  chronicCough: number;
  asthma: number;
  copd: number;
  respiratoryInfection: number;
  totalScore: number;
}

export const calculatePrediction = (answers: Record<number, number>): PredictionResult => {
  // Skor aktual yang didapat user
  let scores = {
    chronicCough: 0,
    asthma: 0,
    copd: 0,
    respiratoryInfection: 0
  };

  // Skor maksimal yang MUNGKIN didapat (untuk normalisasi)
  let maxScores = {
    chronicCough: 0,
    asthma: 0,
    copd: 0,
    respiratoryInfection: 0
  };

  predictionQuestions.forEach((question) => {
    const answerValue = answers[question.id] || 0;
    // Skala jawaban: 0 sampai 3
    
    // Hitung skor user
    // Jika faktor negatif (misal olahraga), jawaban tinggi justru mengurangi skor risiko
    // Kita asumsikan input 'answerValue' untuk olahraga sudah dibalik atau faktor negatif mengurangi total
    // Untuk simplifikasi logika di sini:
    
    const factors = question.diseaseFactors;
    
    // Hitung kontribusi user
    scores.chronicCough += answerValue * question.weight * factors.chronicCough;
    scores.asthma += answerValue * question.weight * factors.asthma;
    scores.copd += answerValue * question.weight * factors.copd;
    scores.respiratoryInfection += answerValue * question.weight * factors.respiratoryInfection;

    // Hitung kontribusi MAKSIMAL (jika user jawab 3 untuk semua gejala positif)
    // Untuk faktor positif (>0), max score adalah jika jawab 3
    // Untuk faktor negatif (<0), max score 'risiko' adalah jika jawab 0 (tidak olahraga), 
    // tapi untuk normalisasi sederhana kita ambil nilai absolut kontribusi maksimal positifnya saja
    
    const maxQVal = 3; 
    
    if (factors.chronicCough > 0) maxScores.chronicCough += maxQVal * question.weight * factors.chronicCough;
    if (factors.asthma > 0) maxScores.asthma += maxQVal * question.weight * factors.asthma;
    if (factors.copd > 0) maxScores.copd += maxQVal * question.weight * factors.copd;
    if (factors.respiratoryInfection > 0) maxScores.respiratoryInfection += maxQVal * question.weight * factors.respiratoryInfection;
  });

  // Fungsi normalisasi: (Skor User / Skor Maksimal) * 100
  const normalize = (score: number, maxScore: number) => {
    if (maxScore === 0) return 0;
    const percentage = (score / maxScore) * 100;
    return Math.max(0, Math.min(100, percentage));
  };

  const result = {
    chronicCough: normalize(scores.chronicCough, maxScores.chronicCough),
    asthma: normalize(scores.asthma, maxScores.asthma),
    copd: normalize(scores.copd, maxScores.copd),
    respiratoryInfection: normalize(scores.respiratoryInfection, maxScores.respiratoryInfection),
  };

  return {
    ...result,
    totalScore: (result.chronicCough + result.asthma + result.copd + result.respiratoryInfection) / 4
  };
};