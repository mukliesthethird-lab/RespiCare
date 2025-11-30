'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface MedicalDisclaimerProps {
    locale: string;
}

export default function MedicalDisclaimer({ locale }: MedicalDisclaimerProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Check if user has already accepted
        const hasAccepted = localStorage.getItem('medical-disclaimer-accepted');
        if (!hasAccepted) {
            setIsOpen(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('medical-disclaimer-accepted', 'true');
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-start justify-between sticky top-0 bg-white dark:bg-gray-800">
                    <div className="flex items-center space-x-3">
                        <AlertTriangle className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" size={28} />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {locale === 'id' ? 'Pernyataan Medis' : 'Medical Disclaimer'}
                        </h2>
                    </div>
                </div>

                <div className="p-6 space-y-4 text-gray-700 dark:text-gray-300">
                    {locale === 'id' ? (
                        <>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                Penting: Harap Baca dengan Seksama
                            </p>
                            <p>
                                RespiCare adalah alat asesmen risiko pendahuluan untuk penyakit pernapasan dan <strong>BUKAN</strong> alat diagnostik medis.
                                Hasil prediksi yang diberikan hanya untuk tujuan informasi dan edukasi.
                            </p>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                                    Disclaimer Penting:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>Aplikasi ini TIDAK menggantikan konsultasi medis profesional</li>
                                    <li>Jangan gunakan hasil ini untuk diagnosis atau pengobatan mandiri</li>
                                    <li>Selalu konsultasikan dengan dokter atau profesional kesehatan berlisensi</li>
                                    <li>Dalam kondisi darurat medis, segera hubungi layanan darurat</li>
                                    <li>Hasil prediksi berdasarkan algoritma statistik, bukan diagnosis klinis</li>
                                </ul>
                            </div>
                            <p className="text-sm">
                                Dengan melanjutkan, Anda mengakui bahwa:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Anda memahami bahwa ini bukan alat diagnostik medis</li>
                                <li>Anda tidak akan mengandalkan hasil ini untuk keputusan medis</li>
                                <li>Anda akan berkonsultasi dengan profesional kesehatan untuk masalah medis</li>
                                <li>RespiCare tidak bertanggung jawab atas keputusan berdasarkan hasil prediksi</li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                Important: Please Read Carefully
                            </p>
                            <p>
                                RespiCare is a preliminary risk assessment tool for respiratory diseases and is <strong>NOT</strong> a medical diagnostic tool.
                                The prediction results provided are for informational and educational purposes only.
                            </p>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                                <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                                    Important Disclaimers:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-sm">
                                    <li>This application does NOT replace professional medical consultation</li>
                                    <li>Do not use these results for self-diagnosis or self-treatment</li>
                                    <li>Always consult with a licensed doctor or healthcare professional</li>
                                    <li>In case of medical emergency, immediately contact emergency services</li>
                                    <li>Prediction results are based on statistical algorithms, not clinical diagnosis</li>
                                </ul>
                            </div>
                            <p className="text-sm">
                                By continuing, you acknowledge that:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>You understand this is not a medical diagnostic tool</li>
                                <li>You will not rely on these results for medical decisions</li>
                                <li>You will consult healthcare professionals for medical concerns</li>
                                <li>RespiCare is not responsible for decisions made based on prediction results</li>
                            </ul>
                        </>
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-end space-x-4">
                    <button
                        onClick={handleAccept}
                        className="px-6 py-3 bg-gradient-to-r from-medical-primary to-medical-secondary text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                        {locale === 'id' ? 'Saya Mengerti dan Setuju' : 'I Understand and Agree'}
                    </button>
                </div>
            </div>
        </div>
    );
}
