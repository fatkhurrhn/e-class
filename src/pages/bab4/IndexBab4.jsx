// src/pages/bab4/IndexBab4.jsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from '../../components/bab4/HeroSection';
import InfoTab from '../../components/bab4/InfoTab';
import GameTab from '../../components/bab4/GameTab';
import MateriTab from '../../components/bab4/MateriTab';

import Game1TebakBentuk from '../../components/bab4/Game1TebakBentuk';
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
    const [activeTab, setActiveTab] = useState('game'); // 'info', 'game', 'materi'
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

    return (
        <>
            <Navbar />
            <HeroSection />

            {/* Navigation Tabs */}
            <div className="sticky top-0 z-40 bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all duration-300 whitespace-nowrap 
                ${activeTab === 'info'
                                    ? 'border-[#4f90c6] text-[#355485]'
                                    : 'border-transparent text-[#6b7280] hover:text-[#355485]'
                                }`}
                        >
                            <span className="text-lg">📋</span>
                            Informasi Bab
                        </button>
                        <button
                            onClick={() => setActiveTab('game')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all duration-300 whitespace-nowrap 
                ${activeTab === 'game'
                                    ? 'border-[#4f90c6] text-[#355485]'
                                    : 'border-transparent text-[#6b7280] hover:text-[#355485]'
                                }`}
                        >
                            <span className="text-lg">🎮</span>
                            Permainan
                        </button>
                        {/* <button
                            onClick={() => setActiveTab('materi')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium border-b-2 transition-all duration-300 whitespace-nowrap 
                ${activeTab === 'materi'
                                    ? 'border-[#4f90c6] text-[#355485]'
                                    : 'border-transparent text-[#6b7280] hover:text-[#355485]'
                                }`}
                        >
                            <span className="text-lg">📚</span>
                            Materi Pembelajaran
                        </button> */}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                {/* Render Tab Content */}
                {activeTab === 'info' && (
                    <InfoTab
                        gameComponents={gameComponents}
                        activeGame={activeGame}
                        setActiveGame={setActiveGame}
                        setActiveTab={setActiveTab}
                    />
                )}

                {activeTab === 'game' && (
                    <GameTab
                        gameComponents={gameComponents}
                        activeGame={activeGame}
                        setActiveGame={setActiveGame}
                        setActiveTab={setActiveTab}
                    />
                )}

                {/* {activeTab === 'materi' && (
                    <MateriTab
                        gameComponents={gameComponents}
                        activeGame={activeGame}
                        setActiveGame={setActiveGame}
                        setActiveTab={setActiveTab}
                    />
                )} */}

                {/* Navigation Help */}
                <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-[#6b7280] text-sm">
                            🎮 Gunakan menu di atas untuk menjelajahi semua fitur Bab 4
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="px-4 py-2 bg-[#f9fafb] text-[#355485] rounded-lg hover:bg-[#e5e7eb] transition-colors duration-300"
                            >
                                ↑ Kembali ke Atas
                            </button>
                            <button
                                onClick={() => setActiveTab(
                                    activeTab === 'info' ? 'game' :
                                        activeTab === 'game' ? 'materi' : 'info'
                                )}
                                className="px-4 py-2 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white rounded-lg 
                         hover:from-[#3a7bb5] hover:to-[#7aa8d1] transition-all duration-300"
                            >
                                Lanjutkan →
                            </button>
                        </div>
                    </div>
                </div>
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
    );
}