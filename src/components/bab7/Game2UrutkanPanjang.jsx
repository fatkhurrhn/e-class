import { useState, useEffect } from "react";

const generateSoal = () =>
  Array.from({ length: 10 }, () => {
    const arr = [
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1,
      Math.floor(Math.random() * 20) + 1
    ];
    return {
      soal: arr,
      jawaban: [...arr].sort((a, b) => a - b).join(",")
    };
  });

export default function Game2UrutkanPanjang() {
  const soundBenar = new Audio("/audio/sound-benar.mp3");
  const soundSalah = new Audio("/audio/sound-salah.mp3");

  const [name, setName] = useState("");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [soal] = useState(generateSoal());
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("bab7_game2")) || []);
  }, []);

  const submit = () => {
    if (input === soal[index].jawaban) {
      soundBenar.play();
      setScore(score + 10);
    } else {
      soundSalah.play();
    }

    if (index === 9) {
      const data = [{ name, score: score + 10 }, ...history];
      localStorage.setItem("bab7_game2", JSON.stringify(data));
      setHistory(data);
      setStarted(false);
    } else {
      setIndex(index + 1);
      setInput("");
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

  return (
    <div className="bg-white p-8 rounded-xl border text-center">
      <h3 className="font-bold mb-4">
        Soal {index + 1} / 10
      </h3>
      <p className="mb-4">
        Urutkan dari terpendek (cm)
      </p>
      <p className="mb-4 font-semibold">
        {soal[index].soal.join(" , ")}
      </p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="contoh: 3,5,8"
        className="border p-3 rounded text-center"
      />

      <div className="mt-4">
        <button
          onClick={submit}
          className="px-6 py-3 bg-[#355485] text-white rounded"
        >
          Jawab
        </button>
      </div>

      <p className="mt-4 font-bold">Skor: {score}</p>
    </div>
  );
}
