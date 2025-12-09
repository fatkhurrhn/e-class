import React from 'react';
import { Link } from 'react-router-dom';

// Component ChapterCard
const ChapterCard = ({ chapter, onClick }) => {
    // Jika onClick diberikan, gunakan onclick, jika tidak, gunakan Link
    const CardContent = ({ children }) => {
        if (onClick) {
            return (
                <div onClick={onClick} className="cursor-pointer">
                    {children}
                </div>
            );
        } else {
            return (
                <Link to={chapter.link || '/'} className="block">
                    {children}
                </Link>
            );
        }
    };

    return (
        <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-[#4f90c6]">
            <CardContent>
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
                        {/* <span className={`px-2 py-1 rounded-full text-xs font-bold ${chapter.level === 'Pemula' ? 'bg-green-100 text-green-800' :
                            chapter.level === 'Dasar' ? 'bg-blue-100 text-blue-800' :
                                chapter.level === 'Menengah' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-purple-100 text-purple-800'
                            }`}>
                            {chapter.level}
                        </span> */}
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

                    {/* Semester Badge */}
                    {/* {chapter.semester && (
                        <div className="mb-4">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${chapter.semester === 1 ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                Semester {chapter.semester}
                            </span>
                        </div>
                    )} */}

                    {/* CTA Button */}
                    <div className={`w-full ${chapter.completed ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-700' : 'bg-gradient-to-r from-gray-100 to-gray-50 hover:from-[#4f90c6] hover:to-[#90b6d5] text-gray-600 hover:text-white'} font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg border ${chapter.completed ? 'border-green-200' : 'border-gray-200 group-hover:border-transparent'} text-center`}>
                        {chapter.completed ? '🎉 Selesai' : '🚀 Mulai Belajar'}
                    </div>
                </div>
            </CardContent>
        </div>
    );
};

// Main Component ChaptersSection
export default function ChaptersSection({ searchQuery }) {
    // Data chapters
    const chapters = [
        // Semester 1
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
            completed: false,
            link: "/s1/bab1",
            semester: 1
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
            completed: false,
            link: "/s1/bab2",
            semester: 1
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
            completed: false,
            link: "/s1/bab3",
            semester: 1
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
            completed: false,
            link: "/s1/bab4",
            semester: 1
        },
        // Semester 2
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
            completed: false,
            link: "/s1/bab5",
            semester: 2
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
            completed: false,
            link: "/s1/bab6",
            semester: 2
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
            completed: false,
            link: "/s1/bab7",
            semester: 2
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
            completed: false,
            link: "/s1/bab8",
            semester: 2
        },
    ];

    // Filter chapters berdasarkan search query
    const filteredChapters = chapters.filter(chapter =>
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pisahkan berdasarkan semester
    const semester1Chapters = filteredChapters.filter(chapter => chapter.semester === 1);
    const semester2Chapters = filteredChapters.filter(chapter => chapter.semester === 2);

    return (
        <div className="py-7 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
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

                {/* Semester 1 Section */}
                {semester1Chapters.length > 0 && (
                    <div className="mb-12">
                        {/* Semester Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-lg">
                                1
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#355485]">Semester 1</h3>
                                <p className="text-gray-600 text-sm">Kelas 1 - Materi Dasar Matematika</p>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-blue-100 to-transparent"></div>
                        </div>

                        {/* Semester 1 Chapters Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {semester1Chapters.map((chapter) => (
                                <ChapterCard
                                    key={chapter.id}
                                    chapter={chapter}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Semester 2 Section */}
                {semester2Chapters.length > 0 && (
                    <div>
                        {/* Semester Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-lg">
                                2
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#355485]">Semester 2</h3>
                                <p className="text-gray-600 text-sm">Kelas 1 - Materi Lanjutan Matematika</p>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-r from-purple-100 to-transparent"></div>
                        </div>

                        {/* Semester 2 Chapters Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {semester2Chapters.map((chapter) => (
                                <ChapterCard
                                    key={chapter.id}
                                    chapter={chapter}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State - Ketika tidak ada hasil pencarian */}
                {filteredChapters.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">Bab tidak ditemukan</h3>
                        <p className="text-gray-500">Coba kata kunci lain atau lihat semua bab di atas</p>
                    </div>
                )}

                {/* Stats Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-[#355485]">{chapters.length}</div>
                            <div className="text-sm text-gray-600">Total Bab</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#4f90c6]">
                                {chapters.reduce((total, chapter) => total + chapter.gameCount, 0)}
                            </div>
                            <div className="text-sm text-gray-600">Total Game</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#355485]">2</div>
                            <div className="text-sm text-gray-600">Semester</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-green-600">100%</div>
                            <div className="text-sm text-gray-600">Gratis Akses</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}