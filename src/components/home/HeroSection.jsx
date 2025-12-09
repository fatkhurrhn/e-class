import React from 'react';
import LocalSearch from '../LocalSearch';

export default function HeroSection({ stats }) {
    return (
        <div
            className="relative min-h-[80vh] flex items-center justify-center text-white overflow-hidden"
            style={{
                backgroundImage: 'url("https://web-assets.esetstatic.com/tn/-x700/blog/sko/infographics/03.jpeg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#355485]/90 via-[#2a436c]/80 to-[#1e2e4a]/90"></div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-conic from-transparent via-[#4f90c6]/20 to-transparent animate-spin-slow"></div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
                {/* School Badge */}
                <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mt-3 mb-4 border border-white/30 shadow-lg">
                    <span className="text-sm font-semibold">MI Al-Ikhlas Depokk - Media Pembelajaran Berbasis Game</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    <span className="block">Jadikan Matematika</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#90b6d5] via-[#4f90c6] to-[#2a436c] drop-shadow-2xl">
                        Petualangan Seru!
                    </span>
                </h1>

                <p className="text-xl md:text-2xl opacity-95 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
                    Platform <span className="font-bold text-yellow-300">game-based learning</span> eksklusif untuk siswa MI Al-Ikhlas.
                    Belajar sambil bermain dengan ratusan game edukatif yang menyenangkan!
                </p>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12">
                    <LocalSearch />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-yellow-300 drop-shadow-lg">{stat.number}</div>
                            <div className="text-white/80 text-sm font-medium mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
                </div>
            </div>
        </div>
    );
}