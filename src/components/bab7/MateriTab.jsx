export default function MateriTab() {
  const materi = [
    'Mengenal konsep panjang dan pendek',
    'Membandingkan panjang dua benda',
    'Mengurutkan benda dari terpendek ke terpanjang',
    'Mengukur panjang benda dengan satuan tidak baku (pensil, jengkal)'
  ];

  return (
    <div className="bg-white p-8 rounded-2xl border">
      <h2 className="text-2xl font-bold text-[#355485] mb-6">
        📚 Materi Pembelajaran
      </h2>
      <ul className="space-y-3">
        {materi.map((m, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-bold text-[#355485]">{i + 1}.</span>
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
