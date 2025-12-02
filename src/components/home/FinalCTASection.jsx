import React from 'react';

export default function FinalCTASection() {
    return (
        <div className="py-20 bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-[#355485] mb-6">
                    Siap Jadi Juara Matematika?
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Bergabung dengan siswa MI Al-Ikhlas lainnya dan buktikan bahwa belajar matematika bisa sangat menyenangkan!
                </p>
                <button
                    className="bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] hover:from-[#3a7bb5] hover:to-[#7aa8d1] text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                >
                    🎮 Mulai Sekarang - Gratis!
                </button>
            </div>
        </div>
    );
}