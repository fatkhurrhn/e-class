import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LocalSearch from '../components/LocalSearch';

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    const chapters = [
        {
            id: 1,
            title: "Bab 1",
            subtitle: "Ayo Membilang sampai 10",
            color: "#355485",
            description: "Belajar mengenal angka 1-10 dengan permainan menyenangkan",
            games: ["Hitung Benda", "Pasangkan Angka", "Urutkan Angka"],
            duration: "30-45 menit",
            level: "Pemula",
            gameCount: 5,
            completed: false
        },
        {
            id: 2,
            title: "Bab 2",
            subtitle: "Penjumlahan sampai 10",
            color: "#2a436c",
            description: "Menguasai operasi penjumlahan dasar dengan cara yang seru",
            games: ["Tambah Buah", "Kumpulkan Bola", "Lompat Angka"],
            duration: "45-60 menit",
            level: "Dasar",
            gameCount: 6,
            completed: false
        },
        {
            id: 3,
            title: "Bab 3",
            subtitle: "Pengurangan sampai 10",
            color: "#4f90c6",
            description: "Memahami konsep pengurangan melalui permainan interaktif",
            games: ["Kurangi Kue", "Selamatkan Hewan", "Tebak Hasil"],
            duration: "45-60 menit",
            level: "Dasar",
            gameCount: 5,
            completed: false
        },
        {
            id: 4,
            title: "Bab 4",
            subtitle: "Mengenal Bentuk",
            color: "#90b6d5",
            description: "Mengenal berbagai bentuk geometri dalam kehidupan sehari-hari",
            games: ["Cari Bentuk", "Puzzle Geometri", "Bangun Bentuk"],
            duration: "40-50 menit",
            level: "Pemula",
            gameCount: 4,
            completed: false
        },
        {
            id: 5,
            title: "Bab 5",
            subtitle: "Ayo Membilang sampai dengan 20",
            color: "#355485",
            description: "Melanjutkan perjalanan berhitung hingga angka 20",
            games: ["Hitung Hewan", "Rantai Angka", "Tembak Balon"],
            duration: "35-50 menit",
            level: "Menengah",
            gameCount: 6,
            completed: false
        },
        {
            id: 6,
            title: "Bab 6",
            subtitle: "Penjumlahan dan Pengurangan sampai dengan 20",
            color: "#2a436c",
            description: "Menggabungkan penjumlahan dan pengurangan dengan tantangan baru",
            games: ["Kalkulator Cilik", "Lomba Matematika", "Petualangan Angka"],
            duration: "50-70 menit",
            level: "Menengah",
            gameCount: 7,
            completed: false
        },
        {
            id: 7,
            title: "Bab 7",
            subtitle: "Pengukuran Panjang Benda",
            color: "#4f90c6",
            description: "Belajar mengukur dan membandingkan panjang benda",
            games: ["Ukur Benda", "Bandinkan Tinggi", "Tebak Panjang"],
            duration: "40-55 menit",
            level: "Menengah",
            gameCount: 5,
            completed: false
        },
        {
            id: 8,
            title: "Bab 8",
            subtitle: "Mengenal Diagram",
            color: "#90b6d5",
            description: "Pengenalan dasar diagram dan penyajian data sederhana",
            games: ["Buat Diagram", "Baca Grafik", "Data Hewan"],
            duration: "45-60 menit",
            level: "Lanjutan",
            gameCount: 4,
            completed: false
        },
    ];

    const gameTypes = [
        {
            icon: "🎯",
            title: "Kuis Interaktif",
            description: "Tantangan soal dengan timer dan skor",
            color: "from-purple-500 to-pink-500",
            count: "12 Game"
        },
        {
            icon: "🧩",
            title: "Puzzle & Matching",
            description: "Teka-teki dan permainan mencocokkan",
            color: "from-blue-500 to-cyan-500",
            count: "8 Game"
        },
        {
            icon: "🏃",
            title: "Game Aksi",
            description: "Permainan cepat dengan kontrol sederhana",
            color: "from-green-500 to-emerald-500",
            count: "6 Game"
        },
        {
            icon: "📊",
            title: "Simulasi",
            description: "Eksperimen dan simulasi interaktif",
            color: "from-orange-500 to-red-500",
            count: "4 Game"
        }
    ];

    const stats = [
        { number: "50+", label: "Game Edukatif" },
        { number: "8", label: "Bab Materi" },
        { number: "4", label: "Tipe Permainan" },
        { number: "100%", label: "Sesuai Kurikulum" }
    ];

    const filteredChapters = chapters.filter(chapter =>
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />

            {/* Hero Section*/}
            <div
                className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden"
                style={{
                    backgroundImage: 'url("https://web-assets.esetstatic.com/tn/-x700/blog/sko/infographics/03.jpeg")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#355485]/90 via-[#2a436c]/80 to-[#1e2e4a]/90"></div>

                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-transparent via-[#4f90c6]/20 to-transparent animate-spin-slow"></div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#90b6d5] to-transparent"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
                    {/* School Badge */}
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mt-3 mb-4 border border-white/30 shadow-lg">
                        <span className="text-sm font-semibold">MI Al-Ikhlas Depok - Media Pembelajaran Berbasis Game</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="block">Jadikan Matematika</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#90b6d5] via-[#4f90c6] to-[#2a436c] drop-shadow-2xl">
                            Petualangan Seru!
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl opacity-95 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
                        Platform <span className="font-bold text-yellow-300">game-based learning</span> eksklusif untuk siswa MI Al-Ikhlas.
                        Belajar sambil bermain dengan ratusan game edukatif yang menyenangkan!
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <LocalSearch />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-yellow-300 drop-shadow-lg">{stat.number}</div>
                                <div className="text-white/80 text-sm font-medium mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                    </div>
                </div>
            </div>


            {/* Game Types Section */}
            <div className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#355485] mb-4">
                            Beragam Jenis Permainan
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Pilih gaya belajar favoritmu dengan berbagai tipe game yang disesuaikan dengan materi pembelajaran
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {gameTypes.map((gameType, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${gameType.color} text-white text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    {gameType.icon}
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg mb-2">{gameType.title}</h3>
                                <p className="text-gray-600 text-sm mb-3">{gameType.description}</p>
                                <div className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                                    {gameType.count}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chapters Grid Section */}
            <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center bg-[#355485] text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                            📚 Kurikulum MI Al-Ikhlas
                        </div>
                        <h2 className="text-3xl font-bold text-[#355485] mb-4">
                            Materi Pembelajaran Per Bab
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Jelajahi semua bab materi matematika yang dirancang khusus untuk siswa MI
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredChapters.map((chapter) => (
                            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-[#4f90c6]">
                                {/* Header dengan warna dinamis */}
                                <div
                                    className="h-3 w-full"
                                    style={{ backgroundColor: chapter.color }}
                                ></div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-2xl font-bold text-gray-800 group-hover:text-[#355485] transition-colors duration-300">
                                                {chapter.title}
                                            </div>
                                            <div className="text-sm font-semibold text-gray-600 mt-1 leading-tight">
                                                {chapter.subtitle}
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${chapter.level === 'Pemula' ? 'bg-green-100 text-green-800' :
                                                chapter.level === 'Dasar' ? 'bg-blue-100 text-blue-800' :
                                                    chapter.level === 'Menengah' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-purple-100 text-purple-800'
                                            }`}>
                                            {chapter.level}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {chapter.description}
                                    </p>

                                    {/* Game Count & Duration */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div className="flex items-center gap-1">
                                            <span>🎮</span>
                                            <span>{chapter.gameCount} Game</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>⏱️</span>
                                            <span>{chapter.duration}</span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <button className="w-full bg-gradient-to-r from-gray-100 to-gray-50 hover:from-[#4f90c6] hover:to-[#90b6d5] text-gray-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg border border-gray-200 group-hover:border-transparent">
                                        {chapter.completed ? '🎉 Selesai' : '🚀 Mulai Belajar'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredChapters.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Materi tidak ditemukan</h3>
                            <p className="text-gray-500">Coba kata kunci lain atau lihat semua materi di atas</p>
                        </div>
                    )}
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-16 bg-gradient-to-br from-[#355485] to-[#2a436c] text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">
                            Cara Belajar di E-Class
                        </h2>
                        <p className="text-xl opacity-90 max-w-2xl mx-auto">
                            3 Langkah mudah mulai petualangan belajar matematikamu
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-bold mb-3">Pilih Bab</h3>
                            <p className="opacity-90">Pilih materi yang ingin dipelajari dari daftar bab yang tersedia</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-bold mb-3">Mainkan Game</h3>
                            <p className="opacity-90">Selesaikan berbagai game edukatif yang menyenangkan</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-bold mb-3">Raih Prestasi</h3>
                            <p className="opacity-90">Kumpulkan bintang dan naik level untuk jadi juara matematika</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div className="py-20 bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-[#355485] mb-6">
                        Siap Jadi Juara Matematika?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Bergabung dengan siswa MI Al-Ikhlas lainnya dan buktikan bahwa belajar matematika bisa sangat menyenangkan!
                    </p>
                    <button 
                        className="bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] hover:from-[#3a7bb5] hover:to-[#7aa8d1] text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                    >
                        🎮 Mulai Sekarang - Gratis!
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
}