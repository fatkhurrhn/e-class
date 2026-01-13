export default function InfoTab({ setActiveTab }) {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-white p-6 rounded-2xl border">
        <h2 className="text-xl font-bold mb-4">📘 Aturan Main</h2>
        <ul className="space-y-3 text-gray-600">
          <li>1️⃣ Jawab soal penjumlahan</li>
          <li>2️⃣ 10 soal setiap permainan</li>
          <li>3️⃣ Jawaban benar = 10 poin</li>
          <li>4️⃣ Isi nama sebelum bermain</li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-2xl border">
        <h2 className="text-xl font-bold mb-4">🚀 Mulai</h2>
        <button
          onClick={() => setActiveTab('game')}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
        >
          🎮 Mulai Bermain
        </button>
      </div>
    </div>
  );
}
