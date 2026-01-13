import { useState, useEffect } from "react";

export default function Game3UkurPanjang() {
  const TOTAL = 10;

  const [nama, setNama] = useState("");
  const [mulai, setMulai] = useState(false);
  const [soal, setSoal] = useState(0);
  const [panjang, setPanjang] = useState(0);
  const [jawaban, setJawaban] = useState("");
  const [skor, setSkor] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem("ukur_panjang_history")) || [];
    setHistory(saved);
  }, []);

  const soundBenar = () => new Audio("/audio/sound-benar.mp3").play();
  const soundSalah = () => new Audio("/audio/sound-salah.mp3").play();

  const buatSoal = () => {
    const nilai = Math.floor(Math.random() * 10) + 1;
    setPanjang(nilai);
    setJawaban("");
  };

  const mulaiGame = () => {
    if (!nama) return alert("Masukkan nama terlebih dahulu");
    setMulai(true);
    setSoal(1);
    setSkor(0);
    buatSoal();
  };

  const cekJawaban = () => {
    if (Number(jawaban) === panjang) {
      setSkor((s) => s + 10);
      soundBenar();
    } else {
      soundSalah();
    }

    if (soal === TOTAL) {
      const result = { name: nama, score: skor + 10 };
      const newHistory = [result, ...history];

      setHistory(newHistory);
      localStorage.setItem(
        "ukur_panjang_history",
        JSON.stringify(newHistory)
      );
      setMulai(false);
    } else {
      setSoal((s) => s + 1);
      buatSoal();
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* GAME */}
      <div className="bg-white p-6 rounded-xl border text-center">
        <h2 className="text-xl font-bold mb-4">
          Game 3: Mengukur Panjang Benda
        </h2>

        {!mulai && (
          <>
            <input
              placeholder="Nama siswa"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <button
              onClick={mulaiGame}
              className="bg-blue-800 text-white py-2 w-full rounded"
            >
              Mulai
            </button>
          </>
        )}

        {mulai && (
          <>
            <p className="mb-2">Soal {soal} / {TOTAL}</p>

            {/* PENGGARIS */}
            <div className="w-[440px] mx-auto mb-4">
              <div className="flex border-b-2 border-black">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-10 text-xs text-center ${
                      i !== 0 ? "border-l-2 border-black" : ""
                    }`}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div
                className="bg-blue-800 h-6 mt-2 rounded"
                style={{ width: `${panjang * 40}px` }}
              />
            </div>

            <p>Panjang benda adalah ... cm</p>

            <input
              type="number"
              value={jawaban}
              onChange={(e) => setJawaban(e.target.value)}
              className="border p-2 w-24 text-center my-3"
            />

            <button
              onClick={cekJawaban}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Jawab
            </button>

            <p className="mt-3 font-bold">Skor: {skor}</p>
          </>
        )}
      </div>

      {/* HISTORY */}
      <div className="bg-white p-6 rounded-xl border">
        <h3 className="font-bold mb-3">📊 Riwayat Skor</h3>
        {history.map((h, i) => (
          <div key={i} className="flex justify-between">
            <span>{h.name}</span>
            <span className="font-bold">{h.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
