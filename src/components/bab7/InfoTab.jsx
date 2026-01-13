export default function InfoTab() {
  return (
    <div className="bg-white p-8 rounded-2xl border space-y-6">
      <h2 className="text-2xl font-bold text-[#355485]">
        📋 Informasi Bab 7
      </h2>

      <div>
        <h3 className="font-semibold mb-2">🎯 Tujuan Pembelajaran</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Membandingkan panjang dua benda</li>
          <li>Mengurutkan panjang benda</li>
          <li>Mengukur panjang benda dengan satuan sederhana</li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold mb-2">🎮 Aktivitas Pembelajaran</h3>
        <p>
          Siswa belajar melalui permainan interaktif yang menyenangkan
          untuk meningkatkan pemahaman konsep panjang benda.
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">👦 Sasaran</h3>
        <p>Siswa Sekolah Dasar Kelas 1</p>
      </div>
    </div>
  );
}
