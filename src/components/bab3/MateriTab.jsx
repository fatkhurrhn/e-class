// src/components/bab4/MateriTab.jsx
import React from 'react';

const MateriTab = ({
    gameComponents,
    activeGame,
    setActiveGame,
    setActiveTab
}) => {
    const materiPokok = [
        "Bentuk Datar: Segitiga, Persegi, Lingkaran, Persegi Panjang",
        "Sifat-sifat bentuk: jumlah sisi, sudut, dan ciri khas",
        "Bentuk dalam kehidupan sehari-hari",
        "Pola dan susunan bentuk sederhana"
    ];

    return (
        <div className="space-y-12">
            {/* Materi Pokok */}
            <div>
                <h2 className="text-3xl font-bold text-[#355485] mb-8 flex items-center gap-3">
                    <span>📚</span>
                    Materi Pokok Pembelajaran
                </h2>
                <div className="bg-white rounded-2xl border border-[#e5e7eb] overflow-hidden">
                    <div className="bg-gradient-to-r from-[#355485] to-[#2a436c] text-white p-6">
                        <h3 className="text-xl font-bold">Kompetensi Dasar</h3>
                        <p className="opacity-90">Mengenal berbagai pengurangan sederhana dan penerapannya</p>
                    </div>
                    <div className="p-6">
                        <ul className="space-y-4">
                            {materiPokok.map((materi, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <span className="text-[#355485] pt-1">{materi}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Sub Materi Detail */}
            <div>
                <h2 className="text-3xl font-bold text-[#355485] mb-8">Sub Materi Pembelajaran</h2>
                <div className="space-y-6">
                    {gameComponents.map((game) => (
                        <div
                            key={game.id}
                            className={`bg-gradient-to-br from-white to-[#f9fafb] rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 
                ${game.component
                                    ? 'border-[#4f90c6] cursor-pointer hover:border-[#355485]'
                                    : 'border-[#e5e7eb]'
                                }`}
                            onClick={() => {
                                if (game.component) {
                                    setActiveGame(game.id);
                                    setActiveTab('game');
                                }
                            }}
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white text-xl`}>
                                    {game.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-[#355485] text-lg">
                                        Sub Materi {String.fromCharCode(96 + game.id)}: {game.subMateri}
                                    </h3>
                                    <p className="text-[#6b7280] text-sm">{game.description}</p>
                                    <div className="mt-2">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full 
                      ${game.component
                                                ? 'bg-[#f0f7ff] text-[#4f90c6]'
                                                : 'bg-[#e5e7eb] text-[#9ca3af]'
                                            }`}
                                        >
                                            {game.component ? '🎮 Game Tersedia' : '🕐 Game Segera Hadir'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="ml-16">
                                <h4 className="font-semibold text-[#355485] mb-2">Yang akan dipelajari:</h4>
                                <ul className="text-[#6b7280] text-sm space-y-1">
                                    {game.id === 1 && (
                                        <>
                                            <li>• Mengidentifikasi bentuk dari benda sekitar</li>
                                            <li>• Menyebutkan nama bentuk yang tepat</li>
                                            <li>• Menghubungkan bentuk dengan benda nyata</li>
                                        </>
                                    )}
                                    {game.id === 2 && (
                                        <>
                                            <li>• Membedakan berbagai jenis bentuk</li>
                                            <li>• Mengelompokkan berdasarkan warna, jenis, dan sisi</li>
                                            <li>• Memahami kategori bangun datar vs bangun ruang</li>
                                            <li>• Melatih logika klasifikasi</li>
                                        </>
                                    )}
                                    {game.id === 3 && (
                                        <>
                                            <li>• Menyusun bentuk menjadi pola</li>
                                            <li>• Mengurai bentuk kompleks</li>
                                            <li>• Mengembangkan kreativitas visual</li>
                                            <li>• Melatih kemampuan spatial</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips Belajar */}
            <div className="bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#355485] mb-6 text-center">💡 Tips Belajar Efektif</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl p-5">
                        <div className="text-3xl mb-3">🎯</div>
                        <h4 className="font-bold text-[#355485] mb-2">Mulai dari yang Mudah</h4>
                        <p className="text-[#6b7280] text-sm">
                            Mulailah dengan benda-benda yang familiar sebelum beralih ke bentuk yang lebih kompleks
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                        <div className="text-3xl mb-3">🔄</div>
                        <h4 className="font-bold text-[#355485] mb-2">Ulangi dan Praktik</h4>
                        <p className="text-[#6b7280] text-sm">
                            Mainkan game berulang kali untuk menguatkan pemahaman dan meningkatkan skor
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                        <div className="text-3xl mb-3">👀</div>
                        <h4 className="font-bold text-[#355485] mb-2">Amati Sekitar</h4>
                        <p className="text-[#6b7280] text-sm">
                            Cari bentuk-bentuk geometri di sekitar rumah dan sekolah untuk praktik langsung
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-5">
                        <div className="text-3xl mb-3">🏆</div>
                        <h4 className="font-bold text-[#355485] mb-2">Targetkan Skor</h4>
                        <p className="text-[#6b7280] text-sm">
                            Tetapkan target skor untuk setiap sesi permainan sebagai motivasi belajar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MateriTab;