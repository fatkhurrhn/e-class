// src/components/bab8/GameTab.jsx
import React from 'react';

const GameTab = ({
    gameComponents,
    activeGame,
    setActiveGame,
    setActiveTab
}) => {
    return (
        <div className="space-y-12">
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
                        {activeGame === 1 && "Pada permainan ini, siswa berlatih mengelompokkan data berdasarkan informasi yang ditampilkan dalam diagram gambar. Kegiatan ini membantu memahami bagaimana suatu data dapat dikelompokkan dan dihitung melalui simbol-simbol yang digunakan dalam piktogram sederhana."}
                        {activeGame === 2 && "Permainan ini mengajak siswa membaca serta menafsirkan piktogram. Dengan menganalisis simbol yang mewakili jumlah tertentu, siswa belajar memahami data secara visual dan menarik."}
                    </p>

                </div>
            </div>
        </div>
    );
};

export default GameTab;