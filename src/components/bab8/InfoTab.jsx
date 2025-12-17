// src/components/bab8/InfoTab.jsx
import React from 'react';

const InfoTab = ({ gameComponents, activeGame, setActiveGame, setActiveTab }) => {
    const learningObjectives = [
        {
            icon: "📊",
            title: "Membaca Diagram",
            description: "Memahami cara membaca dan menafsirkan data dari berbagai jenis diagram"
        },
        {
            icon: "📈",
            title: "Membuat Diagram",
            description: "Mampu menyajikan data dalam bentuk diagram yang sesuai dan menarik"
        },
        {
            icon: "🔍",
            title: "Analisis Data",
            description: "Menganalisis dan membandingkan data dari diagram yang berbeda"
        },
        {
            icon: "💡",
            title: "Penyajian Visual",
            description: "Menyajikan informasi kompleks secara visual yang mudah dipahami"
        }
    ];

    return (
        <div className="space-y-12">
            {/* Learning Objectives */}
            <div>
                <h2 className="text-3xl font-bold text-[#355485] mb-8 flex items-center gap-3">
                    <span>🎯</span>
                    Tujuan Pembelajaran Bab 8
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

            {/* Game Cards Preview */}
            <div>
                <h2 className="text-3xl font-bold text-[#355485] mb-8 flex items-center gap-3">
                    <span>🎮</span>
                    Permainan Interaktif Diagram
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {gameComponents.map((game) => (
                        <div
                            key={game.id}
                            className={`rounded-2xl p-6 border-2 transition-all duration-300 group
                ${game.component
                                    ? 'border-[#e5e7eb] hover:border-[#355485] hover:shadow-xl cursor-pointer bg-white'
                                    : 'border-[#e5e7eb]/50 opacity-70 bg-white/50'
                                }
                ${game.id === activeGame
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
                                        game.id === 2 ? 'bg-gradient-to-br from-[#355485] to-[#2a436c]' : ''
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
                                                'bg-blue-100 text-[#2a436c]'
                                            : 'bg-gray-100 text-[#9ca3af]'
                                        }`}
                                    >
                                        Sub Materi {String.fromCharCode(96 + game.id)}
                                    </span>
                                    {game.component && game.id === activeGame && (
                                        <span className={`text-xs font-semibold animate-pulse
                      ${game.id === 1 ? 'text-[#4f90c6]' :
                                                'text-[#355485]'
                                            }`}
                                        >
                                            ✓ Aktif
                                        </span>
                                    )}
                                </div>

                                <div className={`flex items-center gap-2 ${game.component ? '' : 'opacity-50'}`}>
                                    {game.component ? (
                                        <button className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-all duration-300 
                      hover:scale-105 group-hover:shadow-md
                      ${game.id === 1 ? 'bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] hover:from-[#3a7bb5] hover:to-[#7aa8d1]' :
                                                'bg-gradient-to-r from-[#355485] to-[#2a436c] hover:from-[#2a436c] hover:to-[#1e2e4a]'
                                            }`}
                                        >
                                            Mulai Belajar
                                        </button>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-[#9ca3af]">Segera Hadir</span>
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
                                                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">10 Soal</span>
                                                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Diagram Batang</span>
                                                <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Analisis Data</span>
                                            </>
                                        )}
                                        {game.id === 2 && (
                                            <>
                                                <span className="text-xs px-2 py-1 bg-[#f0f7ff] text-[#355485] rounded-full">Data Visual</span>
                                                <span className="text-xs px-2 py-1 bg-[#f0f7ff] text-[#355485] rounded-full">Perbandingan</span>
                                                <span className="text-xs px-2 py-1 bg-[#f0f7ff] text-[#355485] rounded-full">Statistik Sederhana</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Stats */}
            {/* <div className="bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#355485] mb-6 text-center">📊 Bab 8 dalam Angka</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#355485] mb-2">2</div>
                        <div className="text-sm text-[#6b7280]">Game Interaktif</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#355485] mb-2">15+</div>
                        <div className="text-sm text-[#6b7280]">Contoh Data</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#355485] mb-2">3</div>
                        <div className="text-sm text-[#6b7280]">Jenis Diagram</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-[#355485] mb-2">30m</div>
                        <div className="text-sm text-[#6b7280]">Durasi Belajar</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default InfoTab;