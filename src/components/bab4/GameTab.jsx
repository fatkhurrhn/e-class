// src/components/bab4/GameTab.jsx
import React from 'react';

const GameTab = ({
    gameComponents,
    activeGame,
    setActiveGame,
    setActiveTab
}) => {
    return (
        <div className="space-y-12">
            {/* Game Selection */}
            {/* <div>
                <h2 className="text-3xl font-bold text-[#355485] mb-6 flex items-center gap-3">
                    <span>🕹️</span>
                    Pilih Permainan
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {gameComponents.map((game) => (
                        <button
                            key={game.id}
                            onClick={() => {
                                setActiveGame(game.id);
                                if (game.component) {
                                    setActiveTab('game');
                                }
                            }}
                            className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 
                ${game.component
                                    ? 'border-[#4f90c6] bg-gradient-to-br from-[#f0f7ff] to-white hover:shadow-xl hover:border-[#355485]'
                                    : 'border-[#e5e7eb] bg-white opacity-60 cursor-not-allowed'
                                } 
                ${activeGame === game.id ? 'ring-2 ring-[#4f90c6]' : ''}`}
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
                                <span className={`text-xs font-medium px-2 py-1 rounded-full 
                  ${game.component
                                        ? 'bg-[#f9fafb] text-[#355485]'
                                        : 'bg-[#e5e7eb] text-[#9ca3af]'
                                    }`}
                                >
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
            </div> */}

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
    );
};

export default GameTab;