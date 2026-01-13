import { useState } from 'react';

import GamePenjumlahan from './GamePenjumlahan';
import GamePilihanGanda from './GamePilihanGanda';
import GameCocokkan from './GameCocokkan';

export default function GameTab() {
  const [activeGame, setActiveGame] = useState(null);

  return (
    <div className="mt-8">

      {/* PILIH GAME */}
      {!activeGame && (
        <>
          <h2 className="text-2xl font-bold mb-6">🎮 Pilih Permainan</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <GameCard
              title="Penjumlahan Acak"
              desc="Menjawab soal penjumlahan secara acak"
              onClick={() => setActiveGame('game1')}
            />
            <GameCard
              title="Pilihan Ganda"
              desc="Pilih jawaban yang benar"
              onClick={() => setActiveGame('game2')}
            />
            <GameCard
              title="Cocokkan Hasil"
              desc="Mengetik hasil penjumlahan"
              onClick={() => setActiveGame('game3')}
            />
          </div>
        </>
      )}

      {/* GAME 1 */}
      {activeGame === 'game1' && (
        <GameWrapper title="Penjumlahan Acak" back={() => setActiveGame(null)}>
          <GamePenjumlahan />
        </GameWrapper>
      )}

      {/* GAME 2 */}
      {activeGame === 'game2' && (
        <GameWrapper title="Pilihan Ganda" back={() => setActiveGame(null)}>
          <GamePilihanGanda />
        </GameWrapper>
      )}

      {/* GAME 3 */}
      {activeGame === 'game3' && (
        <GameWrapper title="Cocokkan Hasil" back={() => setActiveGame(null)}>
          <GameCocokkan />
        </GameWrapper>
      )}
    </div>
  );
}

/* ===== COMPONENT BANTUAN ===== */

function GameCard({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border rounded-xl p-6 hover:shadow-lg transition"
    >
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function GameWrapper({ title, back, children }) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <button
        onClick={back}
        className="mb-4 text-blue-600 underline"
      >
        ← Kembali ke daftar game
      </button>

      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}