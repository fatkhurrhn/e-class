import { useState, useEffect } from "react";

const soalData = Array.from({ length: 10 }, () => {
  const a = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;
  return {
    a,
    b,
    benar: a > b ? "A" : "B"
  };
});

export default function Game1BandingkanPanjang() {
  const soundBenar = new Audio("/audio/sound-benar.mp3");
  const soundSalah = new Audio("/audio/sound-salah.mp3");

  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("bab7_game1")) || []);
  }, []);

  const jawab = (pilihan) => {
    if (pilihan === soalData[index].benar) {
      soundBenar.play();
      setScore(score + 10);
    } else {
      soundSalah.play();
    }

    if (index === 9) {
      const data = [{ name, score: score + 10 }, ...history];
      localStorage.setItem("bab7_game1", JSON.stringify(data));
      setHistory(data);
      setStarted(false);
    } else {
      setIndex(index + 1);
    }
  };

  if (!started) {
    return (
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border">
          <input
            placeholder="Nama kamu"
            className="border p-3 w-full rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={() => {
              setIndex(0);
              setScore(0);
              setStarted(true);
            }}
            className="w-full py-3 bg-[#355485] text-white rounded"
          >
            ▶ Mulai
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <h3 className="font-bold mb-4">📊 Riwayat Skor</h3>
          {history.map((h, i) => (
            <div key={i} className="flex justify-between">
              <span>{h.name}</span>
              <b>{h.score}</b>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = soalData[index];

  return (
    <div className="bg-white p-10 rounded-xl border text-center">
      <h3 className="font-bold mb-4">
        Soal {index + 1} / 10
      </h3>
      <p className="mb-6">Mana yang lebih panjang?</p>

      <div className="flex justify-center gap-6">
        <button
          onClick={() => jawab("A")}
          className="px-6 py-3 bg-[#355485] text-white rounded"
        >
          A ({q.a} cm)
        </button>
        <button
          onClick={() => jawab("B")}
          className="px-6 py-3 bg-[#6b7280] text-white rounded"
        >
          B ({q.b} cm)
        </button>
      </div>

      <p className="mt-6 font-bold">Skor: {score}</p>
    </div>
  );
}
