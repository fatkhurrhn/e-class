// src/pages/bab4/IndexBab4.jsx
import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Game1TebakBentuk from '../../components/bab4/Game1TebakBentuk'
import Game2KelompokkanBentuk from '../../components/bab4/Game2KelompokkanBentuk';
import Game3PuzzleBentuk from '../../components/bab4/Game3PuzzleBentuk';

/**
 * @searchdata
 * title: Bab 4 - Mengenal Bentuk
 * description: Belajar mengenal berbagai bentuk geometri melalui permainan seru
 * keywords: [bangun datar, segitiga, persegi, lingkaran, geometri, bentuk]
 * type: chapter
 * chapter: Bab 4
 * path: /s1/bab4
 */

export default function IndexBab4() {
    const [activeTab, setActiveTab] = useState('materi'); // 'info', 'game', 'materi'
    const [activeGame, setActiveGame] = useState(1); // Default ke Game 1

    const gameComponents = [
        {
            id: 1,
            title: "Tebak Bentuk dari Benda",
            description: "Kenali bentuk geometri dari benda-benda sehari-hari",
            component: <Game1TebakBentuk />,
            icon: "🔍",
            subMateri: "Mendeskripsikan benda berdasarkan bentuk",
            color: "from-[#4f90c6] to-[#90b6d5]"
        },
        {
            id: 2,
            title: "Kelompokkan Bentuk",
            description: "Pilah dan kelompokkan bentuk berdasarkan jenisnya",
            component: <Game2KelompokkanBentuk />, 
            icon: "🔄",
            subMateri: "Mengelompokkan bangun datar",
            color: "from-[#355485] to-[#2a436c]"
        },
        {
            id: 3,
            title: "Puzzle Bentuk",
            description: "Susun bentuk-bentuk menjadi pola yang benar",
            component: <Game3PuzzleBentuk />,
            icon: "🧩",
            subMateri: "Menyusun dan mengurai bentuk bangun",
            color: "from-purple-500 to-pink-500"
        }
    ];

    const learningObjectives = [
        {
            icon: "🎯",
            title: "Kemampuan Mengamati",
            description: "Mengidentifikasi bentuk dasar dari berbagai benda"
        },
        {
            icon: "🧠",
            title: "Pemahaman Konsep",
            description: "Memahami sifat-sifat bentuk geometri sederhana"
        },
        {
            icon: "🤔",
            title: "Kemampuan Analisis",
            description: "Membedakan dan mengelompokkan berbagai bentuk"
        },
        {
            icon: "✨",
            title: "Kreativitas",
            description: "Menyusun bentuk menjadi pola yang menarik"
        }
    ];

    const materiPokok = [
        "Bentuk Datar: Segitiga, Persegi, Lingkaran, Persegi Panjang",
        "Sifat-sifat bentuk: jumlah sisi, sudut, dan ciri khas",
        "Bentuk dalam kehidupan sehari-hari",
        "Pola dan susunan bentuk sederhana"
    ];

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-[#355485] via-[#2a436c] to-[#1e2e4a] text-white py-16 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-[#4f90c6]/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#90b6d5]/30 rounded-full blur-lg"></div>
                    <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/10 rounded-full"></div>
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Text Content */}
                        <div className="lg:w-2/3">
                            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                                <span className="text-sm font-medium">Bab 4 • Kelas 1 Semester 1</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                Mengenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#90b6d5] to-[#4f90c6]">Bentuk</span>
                            </h1>

                            <p className="text-xl opacity-90 mb-6 max-w-2xl">
                                Jelajahi dunia geometri melalui permainan seru yang membantu memahami
                                berbagai bentuk dalam kehidupan sehari-hari.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                    <span className="text-sm">🎮 Game Interaktif</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                    <span className="text-sm">📚 3 Sub Materi</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                    <span className="text-sm">🏆 Sistem Skor</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Illustration */}
                        <div className="lg:w-1/3 flex justify-center">
                            <div className="relative">
                                <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-[#4f90c6]/20 to-[#90b6d5]/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                    <div className="text-center">
                                        <div className="text-6xl md:text-8xl mb-4">🔺🔵◼️</div>
                                        <div className="text-white/80 text-sm">Bentuk Geometri</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all duration-300 whitespace-nowrap ${activeTab === 'info'
                                    ? 'border-[#4f90c6] text-[#355485]'
                                    : 'border-transparent text-[#6b7280] hover:text-[#355485]'
                                }`}
                        >
                            <span className="text-lg">📋</span>
                            Informasi Bab
                        </button>
                        <button
                            onClick={() => setActiveTab('game')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all duration-300 whitespace-nowrap ${activeTab === 'game'
                                    ? 'border-[#4f90c6] text-[#355485]'
                                    : 'border-transparent text-[#6b7280] hover:text-[#355485]'
                                }`}
                        >
                            <span className="text-lg">🎮</span>
                            Permainan
                        </button>
                        <button
                            onClick={() => setActiveTab('materi')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all duration-300 whitespace-nowrap ${activeTab === 'materi'
                                    ? 'border-[#4f90c6] text-[#355485]'
                                    : 'border-transparent text-[#6b7280] hover:text-[#355485]'
                                }`}
                        >
                            <span className="text-lg">📚</span>
                            Materi Pembelajaran
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">

                {/* Info Tab */}
                {activeTab === 'info' && (
                    <div className="space-y-12">
                        {/* Learning Objectives */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-8 flex items-center gap-3">
                                <span>🎯</span>
                                Tujuan Pembelajaran
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {learningObjectives.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-gradient-to-br from-[#f9fafb] to-white rounded-2xl p-6 border border-[#e5e7eb] 
                             hover:border-[#cbdde9] transition-all duration-300 group hover:shadow-lg"
                                    >
                                        <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                        <h3 className="font-bold text-[#355485] text-lg mb-2">{item.title}</h3>
                                        <p className="text-[#6b7280] text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Game Cards Preview - Fixed Color Version */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-8 flex items-center gap-3">
                                <span>🎮</span>
                                Permainan yang Tersedia
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {gameComponents.map((game) => (
                                    <div
                                        key={game.id}
                                        className={`rounded-2xl p-6 border-2 transition-all duration-300 group
          ${game.component
                                                ? 'border-[#e5e7eb] hover:border-[#355485] hover:shadow-xl cursor-pointer bg-white'
                                                : 'border-[#e5e7eb]/50 opacity-70 bg-white/50'
                                            }
          ${game.id === activeGame && activeTab === 'game'
                                                ? 'ring-2 ring-[#355485] border-[#355485]'
                                                : ''
                                            }`}
                                        onClick={() => {
                                            if (game.component) {
                                                setActiveGame(game.id);
                                                setActiveTab('game');
                                                window.scrollTo({ top: 400, behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        {/* Card Header */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl
            ${game.id === 1 ? 'bg-gradient-to-br from-[#4f90c6] to-[#90b6d5]' :
                                                    game.id === 2 ? 'bg-gradient-to-br from-[#355485] to-[#2a436c]' :
                                                        'bg-gradient-to-br from-purple-500 to-pink-500'
                                                }
            ${game.component ? 'group-hover:scale-110 transition-transform duration-300' : ''}`}
                                            >
                                                {game.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#355485] text-lg">{game.title}</h3>
                                                <div className="text-sm text-[#6b7280]">{game.subMateri}</div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-[#6b7280] text-sm mb-4">{game.description}</p>

                                        {/* Status & Action */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-medium px-3 py-1 rounded-full 
              ${game.component
                                                        ? game.id === 1 ? 'bg-blue-50 text-[#355485]' :
                                                            game.id === 2 ? 'bg-blue-100 text-[#2a436c]' :
                                                                'bg-purple-50 text-purple-700'
                                                        : 'bg-gray-100 text-[#9ca3af]'
                                                    }`}
                                                >
                                                    Sub Materi {String.fromCharCode(96 + game.id)}
                                                </span>
                                                {game.component && game.id === activeGame && activeTab === 'game' && (
                                                    <span className={`text-xs font-semibold animate-pulse
                ${game.id === 1 ? 'text-[#4f90c6]' :
                                                            game.id === 2 ? 'text-[#355485]' :
                                                                'text-purple-500'
                                                        }`}
                                                    >
                                                        ✓ Sedang Dimainkan
                                                    </span>
                                                )}
                                            </div>

                                            <div className={`flex items-center gap-2 ${game.component ? '' : 'opacity-50'}`}>
                                                {game.component ? (
                                                    <button className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 
                hover:scale-105 group-hover:shadow-md
                ${game.id === 1 ? 'bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] hover:from-[#3a7bb5] hover:to-[#7aa8d1]' :
                                                            game.id === 2 ? 'bg-gradient-to-r from-[#355485] to-[#2a436c] hover:from-[#2a436c] hover:to-[#1e2e4a]' :
                                                                'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                                                        }`}
                                                    >
                                                        Mainkan
                                                    </button>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-[#9ca3af]">Segera</span>
                                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                                            <span className="text-gray-400">⏳</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Feature Badges */}
                                        {game.component && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <div className="flex flex-wrap gap-2">
                                                    {game.id === 1 && (
                                                        <>
                                                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">8 Soal</span>
                                                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Timer</span>
                                                            <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Skor</span>
                                                        </>
                                                    )}
                                                    {game.id === 2 && (
                                                        <>
                                                            <span className="text-xs px-2 py-1 bg-[#f0f7ff] text-[#355485] rounded-full">4 Level</span>
                                                            <span className="text-xs px-2 py-1 bg-[#f0f7ff] text-[#355485] rounded-full">Drag & Drop</span>
                                                            <span className="text-xs px-2 py-1 bg-[#f0f7ff] text-[#355485] rounded-full">Bonus Waktu</span>
                                                        </>
                                                    )}
                                                    {game.id === 3 && (
                                                        <>
                                                            <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">4 Level Puzzle</span>
                                                            <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">Hint System</span>
                                                            <span className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-full">Move Counter</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Active Game Indicator */}
                                        {game.id === activeGame && activeTab === 'game' && (
                                            <div className="mt-3">
                                                <div className="flex justify-between text-xs text-[#6b7280] mb-1">
                                                    <span>Status Game</span>
                                                    <span>Aktif</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                    <div className={`h-1.5 rounded-full w-full animate-pulse
                ${game.id === 1 ? 'bg-gradient-to-r from-[#4f90c6] to-[#90b6d5]' :
                                                            game.id === 2 ? 'bg-gradient-to-r from-[#355485] to-[#2a436c]' :
                                                                'bg-gradient-to-r from-purple-500 to-pink-500'
                                                        }`}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-2xl p-8">
                            <h3 className="text-2xl font-bold text-[#355485] mb-6 text-center">📊 Bab 4 dalam Angka</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#355485] mb-2">3</div>
                                    <div className="text-sm text-[#6b7280]">Sub Materi</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#355485] mb-2">3</div>
                                    <div className="text-sm text-[#6b7280]">Game Tersedia</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#355485] mb-2">8</div>
                                    <div className="text-sm text-[#6b7280]">Jenis Bentuk</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-[#355485] mb-2">20m</div>
                                    <div className="text-sm text-[#6b7280]">Estimasi Belajar</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Tab */}
                {activeTab === 'game' && (
                    <div className="space-y-12">
                        {/* Game Selection */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-6 flex items-center gap-3">
                                <span>🕹️</span>
                                Pilih Permainan
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                {gameComponents.map((game) => (
                                    <button
                                        key={game.id}
                                        onClick={() => {
                                            // Set active game
                                            setActiveGame(game.id);
                                            // Jika game tersedia, langsung tampilkan
                                            if (game.component) {
                                                setActiveTab('game');
                                            }
                                        }}
                                        className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 ${game.component
                                                ? 'border-[#4f90c6] bg-gradient-to-br from-[#f0f7ff] to-white hover:shadow-xl hover:border-[#355485]'
                                                : 'border-[#e5e7eb] bg-white opacity-60 cursor-not-allowed'
                                            } ${activeGame === game.id ? 'ring-2 ring-[#4f90c6]' : ''}`}
                                        disabled={!game.component}
                                    >
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white text-xl`}>
                                                {game.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-[#355485]">{game.title}</h3>
                                                <div className="text-sm text-[#6b7280]">{game.subMateri}</div>
                                            </div>
                                        </div>
                                        <p className="text-[#6b7280] text-sm mb-4">{game.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${game.component
                                                    ? 'bg-[#f9fafb] text-[#355485]'
                                                    : 'bg-[#e5e7eb] text-[#9ca3af]'
                                                }`}>
                                                {game.component ? '✅ Tersedia' : '🕐 Segera Hadir'}
                                            </span>
                                            {game.component && (
                                                <span className="text-xs text-[#4f90c6] font-semibold">
                                                    {activeGame === game.id ? '✓ Aktif' : '↪ Klik untuk main'}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Current Active Game */}
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-[#355485] flex items-center gap-3">
                                    <span>🎮</span>
                                    {gameComponents.find(g => g.id === activeGame)?.title}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <div className="text-sm text-[#6b7280] bg-[#f9fafb] px-4 py-2 rounded-full">
                                        Sub Materi: {gameComponents.find(g => g.id === activeGame)?.subMateri}
                                    </div>
                                    {/* Game Navigation */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                const prevGame = gameComponents.find(g => g.id === activeGame - 1);
                                                if (prevGame?.component) {
                                                    setActiveGame(activeGame - 1);
                                                }
                                            }}
                                            disabled={!gameComponents.find(g => g.id === activeGame - 1)?.component}
                                            className="p-2 rounded-lg bg-[#f9fafb] hover:bg-[#e5e7eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={() => {
                                                const nextGame = gameComponents.find(g => g.id === activeGame + 1);
                                                if (nextGame?.component) {
                                                    setActiveGame(activeGame + 1);
                                                }
                                            }}
                                            disabled={!gameComponents.find(g => g.id === activeGame + 1)?.component}
                                            className="p-2 rounded-lg bg-[#f9fafb] hover:bg-[#e5e7eb] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                        >
                                            →
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Game Component */}
                            <div className="animate-fade-in">
                                {gameComponents.find(g => g.id === activeGame)?.component}
                            </div>

                            {/* Game Description */}
                            <div className="mt-8 bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-2xl p-6">
                                <h3 className="font-bold text-[#355485] text-lg mb-3 flex items-center gap-2">
                                    <span>📝</span>
                                    Tentang Game Ini
                                </h3>
                                <p className="text-[#6b7280]">
                                    {activeGame === 1 && "Game ini membantu siswa mengenali bentuk geometri dari benda-benda yang sering ditemui dalam kehidupan sehari-hari. Dengan mengamati gambar benda, siswa belajar mengidentifikasi bentuk dasar seperti lingkaran, segitiga, persegi, dan lain-lain."}
                                    {activeGame === 2 && "Game ini melatih kemampuan mengelompokkan dan mengklasifikasikan bentuk berdasarkan berbagai kriteria seperti warna, jenis, jumlah sisi, dan kategori bangun. Siswa belajar mengenali pola dan karakteristik setiap bentuk geometri."}
                                    {activeGame === 3 && "Game puzzle yang melatih kemampuan visual-spatial dengan menyusun bentuk menjadi pola tertentu."}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Materi Tab */}
                {activeTab === 'materi' && (
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
                                    <p className="opacity-90">Mengenal berbagai bentuk geometri dan penerapannya</p>
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
                                        className={`bg-gradient-to-br from-white to-[#f9fafb] rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 ${activeTab === 'materi' && game.component
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
                                                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${game.component
                                                            ? 'bg-[#f0f7ff] text-[#4f90c6]'
                                                            : 'bg-[#e5e7eb] text-[#9ca3af]'
                                                        }`}>
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
                )}
            </div>

            <Footer />

            {/* Custom Animation */}
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
        </>
    )
}