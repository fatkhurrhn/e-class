// src/pages/bab7/IndexBab7.jsx
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from '../../components/bab7/HeroSection';
import InfoTab from '../../components/bab7/InfoTab';
import GameTab from '../../components/bab7/GameTab';
import MateriTab from '../../components/bab7/MateriTab';

import Game1BandingkanPanjang from '../../components/bab7/Game1BandingkanPanjang';
import Game2UrutkanPanjang from '../../components/bab7/Game2UrutkanPanjang';
import Game3UkurPanjang from '../../components/bab7/Game3UkurPanjang';

export default function IndexBab7() {
  const [activeTab, setActiveTab] = useState('game');
  const [activeGame, setActiveGame] = useState(1);

  const gameComponents = [
    {
      id: 1,
      title: 'Bandingkan Panjang',
      description: 'Menentukan benda lebih panjang atau lebih pendek',
      component: <Game1BandingkanPanjang />,
      icon: '📏',
      subMateri: 'Membandingkan panjang benda',
      color: 'from-[#355485] to-[#2a436c]'
    },
    {
      id: 2,
      title: 'Urutkan Panjang',
      description: 'Mengurutkan benda dari terpendek ke terpanjang',
      component: <Game2UrutkanPanjang />,
      icon: '📐',
      subMateri: 'Mengurutkan panjang benda',
      color: 'from-[#4f90c6] to-[#90b6d5]'
    },
    {
      id: 3,
      title: 'Ukur Panjang',
      description: 'Mengukur panjang benda menggunakan satuan sederhana',
      component: <Game3UkurPanjang />,
      icon: '📊',
      subMateri: 'Mengukur panjang benda',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <>
      <Navbar />
      <HeroSection />

      <div className="sticky top-0 bg-white z-40 shadow-sm">
        <div className="flex max-w-6xl mx-auto">
          {['info', 'game', 'materi'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-[#355485] text-[#355485]'
                  : 'border-transparent text-gray-400'
              }`}
            >
              {tab === 'info' && '📋 Informasi Bab'}
              {tab === 'game' && '🎮 Permainan'}
              {tab === 'materi' && '📚 Materi Pembelajaran'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'info' && <InfoTab />}
        {activeTab === 'game' && (
          <GameTab
            gameComponents={gameComponents}
            activeGame={activeGame}
            setActiveGame={setActiveGame}
          />
        )}
        {activeTab === 'materi' && <MateriTab />}
      </div>

      <Footer />
    </>
  );
}
