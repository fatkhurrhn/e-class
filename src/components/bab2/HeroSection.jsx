export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
            Bab 2 · Kelas 1 Semester 1
          </span>
          <h1 className="text-5xl font-bold mt-6">
            Penjumlahan Sampai <span className="text-yellow-300">10</span>
          </h1>
          <p className="mt-6 text-lg opacity-90">
            Belajar penjumlahan bilangan kecil melalui permainan interaktif yang seru.
          </p>
          <div className="flex gap-4 mt-8">
            <span className="bg-white/20 px-4 py-2 rounded-full">🎮 Game</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">📚 Materi</span>
            <span className="bg-white/20 px-4 py-2 rounded-full">🏆 Skor</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-3xl p-10 text-center text-6xl">
          ➕ 3 + 4 = ?
        </div>
      </div>
    </section>
  );
}
