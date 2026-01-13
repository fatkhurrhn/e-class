import { useState, useEffect } from 'react';

const generateQuestions = () =>
  Array.from({ length: 10 }, () => {
    const a = Math.floor(Math.random() * 6);
    const b = Math.floor(Math.random() * 6);
    return { a, b, answer: a + b };
  });

export default function GamePenjumlahan() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('penjumlahan_history')) || [];
    setHistory(saved);
  }, []);

  const startGame = () => {
    setQuestions(generateQuestions());
    setIndex(0);
    setScore(0);
    setStarted(true);
  };

  const submit = () => {
    if (Number(input) === questions[index].answer) {
      setScore(score + 10);
    }
    setInput('');

    if (index === 9) {
      const result = { name, score: score + 10 };
      const newHistory = [result, ...history];
      setHistory(newHistory);
      localStorage.setItem('penjumlahan_history', JSON.stringify(newHistory));
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
            onChange={e => setName(e.target.value)}
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
    <div className="bg-white p-10 rounded-2xl text-center border">
      <h3 className="text-2xl font-bold mb-4">
        Soal {index + 1} / 10
      </h3>
      <div className="text-5xl mb-6">
        {q.a} + {q.b} = ?
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        className="border text-xl p-3 w-32 text-center"
      />
      <div className="mt-6">
        <button
          onClick={submit}
          className="bg-green-500 text-white px-8 py-3 rounded"
        >
          Jawab
        </button>
      </div>
      <p className="mt-4">Skor: {score}</p>
    </div>
  );
}
