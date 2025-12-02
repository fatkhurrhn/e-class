import React from 'react';

export default function HowItWorksSection() {
    return (
        <div className="py-16 bg-gradient-to-br from-[#355485] to-[#2a436c] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        Cara Belajar di E-Class
                    </h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        3 Langkah mudah mulai petualangan belajar matematikamu
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                            1
                        </div>
                        <h3 className="text-xl font-bold mb-3">Pilih Bab</h3>
                        <p className="opacity-90">Pilih materi yang ingin dipelajari dari daftar bab yang tersedia</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                            2
                        </div>
                        <h3 className="text-xl font-bold mb-3">Mainkan Game</h3>
                        <p className="opacity-90">Selesaikan berbagai game edukatif yang menyenangkan</p>
                    </div>
                    <div className="text-center">
                        <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                            3
                        </div>
                        <h3 className="text-xl font-bold mb-3">Raih Prestasi</h3>
                        <p className="opacity-90">Kumpulkan bintang dan naik level untuk jadi juara matematika</p>
                    </div>
                </div>
            </div>
        </div>
    );
}