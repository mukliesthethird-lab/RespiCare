import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Shield, Lock, Eye, Database, UserX, Mail } from 'lucide-react';

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
    unstable_setRequestLocale(locale);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-r from-medical-primary to-medical-secondary rounded-xl shadow-lg p-8 text-white mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <Shield size={48} />
                        <div>
                            <h1 className="text-4xl font-bold">
                                {locale === 'id' ? 'Kebijakan Privasi' : 'Privacy Policy'}
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
                                    <Database className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data yang Kami Kumpulkan</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Kami mengumpulkan informasi berikut untuk menyediakan layanan kami:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    <li><strong>Informasi Akun:</strong> Nama, alamat email, dan password terenkripsi</li>
                                    <li><strong>Data Prediksi:</strong> Jawaban kuesioner dan hasil prediksi risiko penyakit</li>
                                    <li><strong>Data Penggunaan:</strong> Informasi tentang bagaimana Anda menggunakan aplikasi</li>
                                    <li><strong>Cookies:</strong> Preferensi bahasa, tema, dan status login</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Lock className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bagaimana Kami Melindungi Data Anda</h2>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    <li>Password dienkripsi dengan bcrypt</li>
                                    <li>Data disimpan dalam database yang aman</li>
                                    <li>Koneksi HTTPS untuk semua transmisi data</li>
                                    <li>Akses data dibatasi hanya untuk pengguna yang terautentikasi</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Eye className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Penggunaan Data</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Kami menggunakan data Anda untuk:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                                    <li>Menyediakan layanan prediksi penyakit pernapasan</li>
                                    <li>Menyimpan riwayat prediksi Anda</li>
                                    <li>Meningkatkan kualitas layanan kami</li>
                                    <li>Mengirim pembaruan penting terkait layanan</li>
                                </ul>
                                <p className="text-gray-700 dark:text-gray-300 mt-3 font-semibold">
                                    Kami TIDAK pernah menjual data pribadi Anda kepada pihak ketiga.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <UserX className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hak Anda</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    Anda memiliki hak untuk:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    <li>Mengakses dan mengunduh data pribadi Anda</li>
                                    <li>Memperbaiki informasi yang tidak akurat</li>
                                    <li>Menghapus akun dan semua data terkait</li>
                                    <li>Menolak atau membatasi pemrosesan data tertentu</li>
                                    <li>Memindahkan data Anda ke layanan lain</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Mail className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hubungi Kami</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Jika Anda memiliki pertanyaan tentang kebijakan privasi ini atau ingin menggunakan hak Anda,
                                    silakan hubungi kami di: <a href="mailto:privacy@respicare.app" className="text-medical-primary underline">privacy@respicare.app</a>
                                </p>
                            </section>
                        </>
                    ) : (
                        <>
                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Database className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data We Collect</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    We collect the following information to provide our services:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    <li><strong>Account Information:</strong> Name, email address, and encrypted password</li>
                                    <li><strong>Prediction Data:</strong> Questionnaire responses and disease risk prediction results</li>
                                    <li><strong>Usage Data:</strong> Information about how you use the application</li>
                                    <li><strong>Cookies:</strong> Language preference, theme, and login status</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Lock className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">How We Protect Your Data</h2>
                                </div>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    <li>Passwords are encrypted with bcrypt</li>
                                    <li>Data is stored in secure databases</li>
                                    <li>HTTPS connections for all data transmission</li>
                                    <li>Data access is limited to authenticated users only</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Eye className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Usage</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    We use your data to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4 mt-3">
                                    <li>Provide respiratory disease prediction services</li>
                                    <li>Store your prediction history</li>
                                    <li>Improve the quality of our services</li>
                                    <li>Send important service-related updates</li>
                                </ul>
                                <p className="text-gray-700 dark:text-gray-300 mt-3 font-semibold">
                                    We NEVER sell your personal data to third parties.
                                </p>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <UserX className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Rights</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-3">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                                    <li>Access and download your personal data</li>
                                    <li>Correct inaccurate information</li>
                                    <li>Delete your account and all related data</li>
                                    <li>Object to or limit certain data processing</li>
                                    <li>Transfer your data to another service</li>
                                </ul>
                            </section>

                            <section>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Mail className="text-medical-primary" size={24} />
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    If you have questions about this privacy policy or wish to exercise your rights,
                                    please contact us at: <a href="mailto:privacy@respicare.app" className="text-medical-primary underline">privacy@respicare.app</a>
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
