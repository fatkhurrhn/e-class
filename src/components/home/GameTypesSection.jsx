import React from 'react';

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

export default function GameTypesSection() {
    return (
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
    );
}