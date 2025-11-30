import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { FileText, AlertTriangle, Scale, Ban } from 'lucide-react';

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-medical-primary to-medical-secondary rounded-xl shadow-lg p-8 text-white mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <FileText size={48} />
                        <div>
                            <h1 className="text-4xl font-bold">
                                {locale === 'id' ? 'Syarat dan Ketentuan' : 'Terms of Service'}
                            </h1>
                            <p className="text-blue-100">
                                {locale === 'id' ? 'Terakhir diperbarui: November 2024' : 'Last updated: November 2024'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 space-y-8 border border-gray-200 dark:border-gray-700">
                    {locale === 'id' ? (
                        <>
                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <AlertTriangle className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Penerimaan Syarat</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Dengan mengakses dan menggunakan RespiCare, Anda setuju untuk terikat oleh Syarat dan Ketentuan ini.
                                    Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak menggunakan layanan kami.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Ban className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Batasan Tanggung Jawab</h2>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                                        PENTING - Mohon Dibaca dengan Seksama:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-yellow-900 dark:text-yellow-100">
                                        <li>RespiCare BUKAN alat diagnostik medis dan tidak dimaksudkan untuk menggantikan saran medis profesional</li>
                                        <li>Hasil prediksi hanya untuk tujuan informasi dan tidak boleh digunakan untuk diagnosis atau pengobatan mandiri</li>
                                        <li>RespiCare tidak bertanggung jawab atas keputusan medis yang dibuat berdasarkan hasil aplikasi</li>
                                        <li>Kami tidak menjamin akurasi, kelengkapan, atau keandalan prediksi</li>
                                    </ul>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    RespiCare, pengembangnya, dan afiliasinya tidak akan bertanggung jawab atas:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                                    <li>Kerugian yang timbul dari penggunaan atau ketidakmampuan untuk menggunakan layanan</li>
                                    <li>Keputusan medis yang dibuat berdasarkan hasil prediksi</li>
                                    <li>Ketidakakuratan atau kesalahan dalam data atau prediksi</li>
                                    <li>Gangguan layanan atau kehilangan data</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Penggunaan yang Dapat Diterima</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Anda setuju untuk TIDAK:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    <li>Menggunakan layanan untuk tujuan ilegal atau tidak sah</li>
                                    <li>Mencoba mendapatkan akses tidak sah ke sistem kami</li>
                                    <li>Mengganggu atau mengganggu integritas atau kinerja layanan</li>
                                    <li>Menggunakan hasil untuk memberikan saran medis kepada orang lain</li>
                                    <li>Membagikan akun Anda dengan orang lain</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Akun Pengguna</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Anda bertanggung jawab untuk menjaga keamanan akun Anda dan password. Anda setuju untuk:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                                    <li>Memberikan informasi yang akurat dan lengkap saat pendaftaran</li>
                                    <li>Memperbarui informasi akun Anda agar tetap akurat</li>
                                    <li>Segera memberi tahu kami jika terjadi penggunaan tidak sah atas akun Anda</li>
                                    <li>Tidak membagikan kredensial akun Anda</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hak Kekayaan Intelektual</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Semua konten, fitur, dan fungsionalitas RespiCare dilindungi oleh hak cipta, merek dagang, dan hak kekayaan intelektual lainnya.
                                    Dilarang menggunakan, mereproduksi, atau mendistribusikan konten kami tanpa izin tertulis.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Perubahan Layanan</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Kami berhak untuk memodifikasi, menangguhkan, atau menghentikan layanan kapan saja tanpa pemberitahuan sebelumnya.
                                    Kami tidak akan bertanggung jawab kepada Anda atau pihak ketiga manapun atas modifikasi, penangguhan, atau penghentian layanan.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hukum yang Berlaku</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa akan diselesaikan di pengadilan yang berwenang di Indonesia.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kontak</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami di:
                                    <a href="mailto:legal@respicare.app" className="text-medical-primary underline ml-1">legal@respicare.app</a>
                                </p>
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <AlertTriangle className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Acceptance of Terms</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    By accessing and using RespiCare, you agree to be bound by these Terms of Service.
                                    If you do not agree to these terms, please do not use our service.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Ban className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Limitation of Liability</h2>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                                    <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                                        IMPORTANT - Please Read Carefully:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 text-sm text-yellow-900 dark:text-yellow-100">
                                        <li>RespiCare is NOT a medical diagnostic tool and is not intended to replace professional medical advice</li>
                                        <li>Prediction results are for informational purposes only and should not be used for self-diagnosis or self-treatment</li>
                                        <li>RespiCare is not responsible for medical decisions made based on application results</li>
                                        <li>We do not guarantee the accuracy, completeness, or reliability of predictions</li>
                                    </ul>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    RespiCare, its developers, and affiliates will not be liable for:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                                    <li>Damages arising from the use or inability to use the service</li>
                                    <li>Medical decisions made based on prediction results</li>
                                    <li>Inaccuracies or errors in data or predictions</li>
                                    <li>Service interruptions or data loss</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Acceptable Use</h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    You agree NOT to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    <li>Use the service for illegal or unauthorized purposes</li>
                                    <li>Attempt to gain unauthorized access to our systems</li>
                                    <li>Interfere with or disrupt the integrity or performance of the service</li>
                                    <li>Use results to provide medical advice to others</li>
                                    <li>Share your account with others</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">User Accounts</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    You are responsible for maintaining the security of your account and password. You agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                                    <li>Provide accurate and complete information during registration</li>
                                    <li>Keep your account information up to date</li>
                                    <li>Notify us immediately of any unauthorized use of your account</li>
                                    <li>Not share your account credentials</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Intellectual Property</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    All content, features, and functionality of RespiCare are protected by copyright, trademark, and other intellectual property rights.
                                    You may not use, reproduce, or distribute our content without written permission.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Service Changes</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    We reserve the right to modify, suspend, or discontinue the service at any time without prior notice.
                                    We will not be liable to you or any third party for any modification, suspension, or discontinuation of the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Governing Law</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    These Terms of Service are governed by the laws of the Republic of Indonesia. Any disputes will be resolved in competent courts in Indonesia.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact</h2>
                                <p className="text-gray-700 dark:text-gray-300">
                                    If you have questions about these Terms of Service, please contact us at:
                                    <a href="mailto:legal@respicare.app" className="text-medical-primary underline ml-1">legal@respicare.app</a>
                                </p>
                            </section>
                        </>
                    )}
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href={`/${locale}`}
                        className="text-medical-primary hover:text-medical-dark font-medium"
                    >
                        ← {locale === 'id' ? 'Kembali ke beranda' : 'Back to home'}
                    </Link>
                </div>
            </div>
        </div>
    );
}
