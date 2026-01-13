import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import HeroSection from '../../components/bab2/HeroSection';
import InfoTab from '../../components/bab2/InfoTab';
import GameTab from '../../components/bab2/GameTab';
import MateriTab from '../../components/bab2/MateriTab';

import GamePenjumlahan from '../../components/bab2/GamePenjumlahan';
import GamePilihanGanda from '../../components/bab2/GamePilihanGanda';
import GameCocokkan from '../../components/bab2/GameCocokkan';

export default function IndexBab2() {
  const [activeTab, setActiveTab] = useState('game');
  const [activeGame, setActiveGame] = useState(1);

  const gameComponents = [
  {
    id: 1,
    title: 'Penjumlahan Acak',
    component: <GamePenjumlahan />,
  },
  {
    id: 2,
    title: 'Pilihan Ganda',
    component: <GamePilihanGanda />,
  },
  {
    id: 3,
    title: 'Cocokkan Hasil',
    component: <GameCocokkan />,
  },
];

  return (
    <>
      <Navbar />
      <HeroSection />

      {/* TAB NAVIGATION */}
      <div className="sticky top-0 bg-white z-40 border-b">
        <div className="max-w-6xl mx-auto flex">
          {['info', 'game', 'materi'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 border-b-2 font-medium ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab === 'info' && '📋 Informasi Bab'}
              {tab === 'game' && '🎮 Permainan'}
              {tab === 'materi' && '📚 Materi Pembelajaran'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'info' && (
          <InfoTab
            gameComponents={gameComponents}
            setActiveGame={setActiveGame}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'game' && (
          <GameTab
            gameComponents={gameComponents}
            activeGame={activeGame}
          />
        )}

        {activeTab === 'materi' && <MateriTab />}
      </div>

      <Footer />
    </>
  );
}
