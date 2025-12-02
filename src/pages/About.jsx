import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

/**
 * @searchdata  
 * title: Tentang Kami - MI Al-Ikhlas
 * description: Profil sekolah dan informasi tentang platform E-Class
 * keywords: [tentang, profil, sejarah, visi misi, tim pengembang]
 * type: about
 * path: /tentang
 */

export default function About() {
    const teamMembers = [
        {
            name: "Fatkhurrhn",
            role: "Project Manager & Fullstack Developer",
            description: "Mengkoordinasi tim dan mengembangkan fitur utama aplikasi"
        },
        {
            name: "Shalsha",
            role: "UI/UX Designer & Content Creator",
            description: "Mendesain interface yang user-friendly dan menyusun konten edukatif"
        },
        {
            name: "Dimas",
            role: "Frontend Developer",
            description: "Mengimplementasikan design dan interaksi pengguna"
        },
        {
            name: "Rega",
            role: "Game Developer & Educational Specialist",
            description: "Mengembangkan game edukatif dan memastikan kesesuaian dengan kurikulum"
        }
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#355485] to-[#2a436c] text-white py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang E-Class MI Al-Ikhlas</h1>
                    <p className="text-xl opacity-90 max-w-3xl mx-auto">
                        Platform pembelajaran berbasis game yang dirancang khusus untuk meningkatkan
                        minat belajar matematika siswa MI Al-Ikhlas Depok
                    </p>
                </div>
            </div>

            {/* School Information */}
            <div className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-justify">
                        <div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-6">Profil MI Al-Ikhlas Depok</h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Penelitian ini dilaksanakan di MI Al-Ikhlas, sebuah Madrasah Ibtidaiyah
                                    yang berlokasi di Jl. Bhakti Abri Jl. Adul No.67, RT.3/RW.8, Sukamaju Baru,
                                    Kecamatan Tapos, Kota Depok, Jawa Barat 16455.
                                </p>
                                <div className="bg-[#f0f7ff] p-6 rounded-2xl border-l-4 border-[#355485]">
                                    <h3 className="font-bold text-[#355485] text-lg mb-2">Visi MI Al-Ikhlas</h3>
                                    <p className="italic">"Terwujudnya generasi Islam yang berakhlakul karimah, cerdas, terampil dan unggul dalam prestasi"</p>
                                </div>
                                <p>
                                    Visi ini dijabarkan ke dalam beberapa misi, di antaranya:
                                    <strong> mewujudkan pembelajaran yang berbasis Al-Qur'an dan Sunnah</strong>, serta
                                    <strong> penguatan perilaku dalam keseharian yang berlandaskan nilai-nilai Islam</strong>.
                                </p>
                                <p>
                                    Sebagai lembaga pendidikan dasar berbasis Islam, MI Al-Ikhlas berkomitmen
                                    membentuk generasi yang tidak hanya unggul secara akademik, tetapi juga
                                    memiliki akhlak yang mulia dan keterampilan hidup yang baik.
                                </p>
                                <p>
                                    Dalam mendukung proses pembelajaran, MI Al-Ikhlas telah dilengkapi dengan
                                    berbagai sarana dan prasarana yang memadai, antara lain ruang kelas baru
                                    dan mushala sebagai pusat kegiatan keagamaan untuk mendukung kebutuhan
                                    siswa selama di sekolah.
                                </p>
                                <p className="font-semibold text-[#355485]">
                                    Kondisi lingkungan belajar yang mendukung serta nilai-nilai religius yang
                                    tertanam kuat menjadikan MI Al-Ikhlas sebagai tempat yang tepat untuk
                                    pengembangan pendidikan karakter dan akademik.
                                </p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#f0f7ff] to-[#e3f2fd] p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-[#355485] mb-6 text-center">Fasilitas Sekolah</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                    <div className="text-3xl mb-2">🏫</div>
                                    <p className="font-semibold text-gray-800">Ruang Kelas</p>
                                    <p className="text-sm text-gray-600">Nyaman & Modern</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                    <div className="text-3xl mb-2">🕌</div>
                                    <p className="font-semibold text-gray-800">Mushala</p>
                                    <p className="text-sm text-gray-600">Pusat Kegiatan</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                    <div className="text-3xl mb-2">📚</div>
                                    <p className="font-semibold text-gray-800">Perpustakaan</p>
                                    <p className="text-sm text-gray-600">Sumber Belajar</p>
                                </div>
                                <div className="bg-white p-4 rounded-xl text-center shadow-sm">
                                    <div className="text-3xl mb-2">💻</div>
                                    <p className="font-semibold text-gray-800">Lab Komputer</p>
                                    <p className="text-sm text-gray-600">Teknologi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#355485] mb-4">Tim Pengembang</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Dedicated team yang berkomitmen menciptakan pengalaman belajar yang menyenangkan
                            untuk siswa MI Al-Ikhlas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                            >
                                <div className="w-20 h-20 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg mb-2">{member.name}</h3>
                                <p className="text-[#4f90c6] font-semibold text-sm mb-3">{member.role}</p>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Project Purpose */}
            <div className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-[#355485] mb-6">Tujuan Pengembangan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-6">
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="font-bold text-gray-800 mb-3">Efektivitas Belajar</h3>
                            <p className="text-gray-600 text-sm">
                                Meningkatkan pemahaman konsep matematika melalui pendekatan game-based learning
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-4">🚀</div>
                            <h3 className="font-bold text-gray-800 mb-3">Engagement Siswa</h3>
                            <p className="text-gray-600 text-sm">
                                Menghilangkan kejenuhan dan meningkatkan minat belajar siswa terhadap matematika
                            </p>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl mb-4">💡</div>
                            <h3 className="font-bold text-gray-800 mb-3">Inovasi Pembelajaran</h3>
                            <p className="text-gray-600 text-sm">
                                Menyediakan media pembelajaran modern yang sesuai dengan perkembangan teknologi
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}