import React from 'react'

function HeroSection() {
  return (
    <>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-[#355485] via-[#2a436c] to-[#1e2e4a] text-white py-16 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-10 left-10 w-20 h-20 bg-[#4f90c6]/20 rounded-full blur-xl"></div>
                  <div className="absolute bottom-10 right-10 w-16 h-16 bg-[#90b6d5]/30 rounded-full blur-lg"></div>
                  <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white/10 rounded-full"></div>
              </div>

              <div className="max-w-6xl mx-auto px-4 relative z-10">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                      {/* Text Content */}
                      <div className="lg:w-2/3">
                          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                              <span className="text-sm font-medium">Bab 4 • Kelas 1 Semester 1</span>
                          </div>

                          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                              Mengenal <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#90b6d5] to-[#4f90c6]">Bentuk</span>
                          </h1>

                          <p className="text-xl opacity-90 mb-6 max-w-2xl">
                              Jelajahi dunia geometri melalui permainan seru yang membantu memahami
                              berbagai bentuk dalam kehidupan sehari-hari.
                          </p>

                          <div className="flex flex-wrap gap-3">
                              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                  <span className="text-sm">🎮 Game Interaktif</span>
                              </div>
                              {/* <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                  <span className="text-sm">📚 3 Sub Materi</span>
                              </div> */}
                              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                                  <span className="text-sm">🏆 Sistem Skor</span>
                              </div>
                          </div>
                      </div>

                      {/* Hero Illustration */}
                      <div className="lg:w-1/3 flex justify-center">
                          <div className="relative">
                              <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-[#4f90c6]/20 to-[#90b6d5]/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                                  <div className="text-center">
                                      <div className="text-6xl md:text-8xl mb-4">🔺🔵◼️</div>
                                      <div className="text-white/80 text-sm">Bentuk Geometri</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </>
  )
}

export default HeroSection
