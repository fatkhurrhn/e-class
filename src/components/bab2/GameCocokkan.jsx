import { useState, useEffect } from 'react';

const generatePairs = () =>
  Array.from({ length: 10 }, () => {
    const a = Math.floor(Math.random() * 6);
    const b = Math.floor(Math.random() * 6);
    return { soal: `${a} + ${b}`, hasil: a + b };
  });

export default function GameCocokkan() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [pairs, setPairs] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem('cocokkan_history')) || [];
    setHistory(saved);
  }, []);

  const startGame = () => {
    if (!name) return alert('Masukkan nama terlebih dahulu');
    setPairs(generatePairs());
    setIndex(0);
    setScore(0);
    setStarted(true);
  };

  const submit = () => {
    let newScore = score;
    if (Number(input) === pairs[index].hasil) {
      newScore += 10;
      setScore(newScore);
    }
    setInput('');

    if (index === 9) {
      const result = { name, score: newScore };
      const newHistory = [result, ...history];
      setHistory(newHistory);
      localStorage.setItem(
        'cocokkan_history',
        JSON.stringify(newHistory)
      );
      setStarted(false);
    } else {
      setIndex(index + 1);
    }
  };

  if (!started)
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border">
          <input
            placeholder="Nama kamu"
            className="border w-full p-3 rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={startGame}
            className="bg-blue-600 text-white w-full py-3 rounded"
          >
            ▶ Mulai
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold mb-4">📊 Riwayat Skor</h3>
          {history.map((h, i) => (
            <div key={i} className="flex justify-between">
              <span>{h.name}</span>
              <span className="font-bold">{h.score}</span>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="bg-white p-10 text-center rounded-xl border">
      <h3 className="font-bold mb-4">
        Cocokkan Hasil ({index + 1}/10)
      </h3>

      <div className="text-4xl mb-6">
        {pairs[index].soal}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border p-3 text-xl text-center w-32"
        placeholder="?"
      />

      <div className="mt-6">
        <button
          onClick={submit}
          className="bg-green-600 text-white px-6 py-3 rounded"
        >
          Cocokkan
        </button>
      </div>

      <p className="mt-4">Skor: {score}</p>
    </div>
  );
}
