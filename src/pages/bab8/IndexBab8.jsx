// src/pages/bab8/IndexBab8.jsx
import React, { Component, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from '../../components/bab8/HeroSection';
import InfoTab from '../../components/bab8/InfoTab';
import GameTab from '../../components/bab8/GameTab';
import MateriTab from '../../components/bab8/MateriTab';

import Game1 from '../../components/bab8/Game1';
import Game2 from '../../components/bab8/Game2';


/**
 * @searchdata
 * title: Bab 8 - Mengenal Diagram
 * description: Belajar memahami dan membaca berbagai jenis diagram melalui permainan seru
 * keywords: [diagram, diagram gambar, diagram batang, data, tabel, grafik]
 * type: chapter
 * chapter: Bab 8
 * path: /s2/bab8
 */

export default function IndexBab8() {
    const [activeTab, setActiveTab] = useState('game'); // 'info', 'game', 'materi'
    const [activeGame, setActiveGame] = useState(1); // Default ke Game 1

    const gameComponents = [
        {
            id: 1,
            title: "Mengelompokkan Data",
            description: "Mengelompokkan data berdasarkan informasi yang ditampilkan pada diagram gambar.",
            component : <Game1/>,
            icon: "📊",
            subMateri: "Mengelompokkan dan membaca data pada diagram gambar",
            color: "from-[#4f90c6] to-[#90b6d5]"
        },
        {
            id: 2,
            title: "Diagram Gambar (Piktogram)",
            description: "Menganalisis informasi yang disajikan dalam bentuk piktogram dan memahami maknanya.",
            component: <Game2/>,
            icon: "📈",
            subMateri: "Membaca dan menafsirkan piktogram",
            color: "from-[#355485] to-[#2a436c]"
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

                {/* Navigation Help */}
                <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-[#6b7280] text-sm">
                            📊 Pelajari cara membaca dan memahami diagram dengan cara yang menyenangkan!
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