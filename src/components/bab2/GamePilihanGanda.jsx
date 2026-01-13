import { useState, useEffect } from 'react';

const generateQuestions = () =>
  Array.from({ length: 10 }, () => {
    const a = Math.floor(Math.random() * 6);
    const b = Math.floor(Math.random() * 6);
    const answer = a + b;

    const options = [
      answer,
      answer + 1,
      answer - 1,
    ].sort(() => Math.random() - 0.5);

    return { a, b, answer, options };
  });

export default function GamePilihanGanda() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem('pilihan_ganda_history')) || [];
    setHistory(saved);
  }, []);

  const startGame = () => {
    if (!name) return alert('Masukkan nama terlebih dahulu');
    setQuestions(generateQuestions());
    setIndex(0);
    setScore(0);
    setStarted(true);
  };

  const choose = (value) => {
    let newScore = score;
    if (value === questions[index].answer) {
      newScore += 10;
      setScore(newScore);
    }

    if (index === 9) {
      const result = { name, score: newScore };
      const newHistory = [result, ...history];
      setHistory(newHistory);
      localStorage.setItem(
        'pilihan_ganda_history',
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

  const q = questions[index];

  return (
    <div className="bg-white p-10 rounded-xl border text-center">
      <h3 className="mb-4 font-bold">
        Soal {index + 1} / 10
      </h3>
      <div className="text-4xl mb-6">
        {q.a} + {q.b} = ?
      </div>

      <div className="grid grid-cols-2 gap-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => choose(opt)}
            className="bg-blue-500 text-white py-3 rounded"
          >
            {opt}
          </button>
        ))}
      </div>

      <p className="mt-4">Skor: {score}</p>
    </div>
  );
}