import React from 'react';
import ChapterCard from './ChapterCard';

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
        completed: false,
        link: "/s1/bab1" // Tambahkan link
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
        link: "/s1/bab2"
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
        link: "/s1/bab3"
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
        link: "/s1/bab4" // Link untuk Bab 4
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
        completed: false,
        link: "/s1/bab5"
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
        link: "/s1/bab6"
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
        link: "/s1/bab7"
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
        link: "/s1/bab8"
    },
];

export default function ChaptersSection({ searchQuery }) {
    const filteredChapters = chapters.filter(chapter =>
        chapter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chapter.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Fungsi untuk handle klik chapter
    const handleChapterClick = (link) => {
        window.location.href = link;
    };

    return (
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
                        <ChapterCard
                            key={chapter.id}
                            chapter={chapter}
                            onClick={() => handleChapterClick(chapter.link)}
                        />
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
    );
}