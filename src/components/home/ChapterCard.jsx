import React from 'react';
import { Link } from 'react-router-dom'; // Jika menggunakan React Router
// Jika tidak menggunakan React Router, kita bisa gunakan anchor tag biasa

export default function ChapterCard({ chapter, onClick }) {
    return (
        <div
            className="group bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-[#4f90c6]"
            onClick={onClick}
        >
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
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${chapter.level === 'Pemula' ? 'bg-green-100 text-green-800' :
                        chapter.level === 'Dasar' ? 'bg-blue-100 text-blue-800' :
                            chapter.level === 'Menengah' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-purple-100 text-purple-800'
                        }`}>
                        {chapter.level}
                    </span>
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

                {/* CTA Button - Hanya "Mulai Belajar" */}
                <button className="w-full bg-gradient-to-r from-gray-100 to-gray-50 hover:from-[#4f90c6] hover:to-[#90b6d5] text-gray-600 hover:text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg border border-gray-200 group-hover:border-transparent">
                    🚀 Mulai Belajar
                </button>
            </div>
        </div>
    );
}