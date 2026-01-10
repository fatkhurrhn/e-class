// src/components/bab4/GamePiktogram.jsx
import React, { useState, useEffect, useRef } from 'react';

const GamePiktogram = () => {
  // State game
  const [gameStatus, setGameStatus] = useState('start'); // 'start', 'playing', 'end'
  const [playerName, setPlayerName] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  const [playerMode, setPlayerMode] = useState(null); // 'named', 'anonymous'
  const [showHint, setShowHint] = useState(false);

  const gameContainerRef = useRef(null);
  const audioBenarRef = useRef(null);
  const audioSalahRef = useRef(null);
  const audioBerhasilRef = useRef(null);
  const audioGagalRef = useRef(null);
  const audioKlikRef = useRef(null);

  // Data soal piktogram
  const soalBank = [
    {
      id: 1,
      title: "Piktogram Buah Favorit",
      emoji: "🍎",
      pertanyaan: "Berapa siswa yang suka buah PISANG?",
      hint: "Setiap ikon pisang mewakili 1 siswa",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "🍎", label: "Apel", count: 6, color: "#EF4444" },
        { icon: "🍌", label: "Pisang", count: 4, color: "#F59E0B" },
        { icon: "🍊", label: "Jeruk", count: 5, color: "#F97316" },
        { icon: "🍓", label: "Stroberi", count: 3, color: "#EC4899" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan buah favorit siswa:",
      pilihan: [
        { id: 'A', text: '3 siswa', benar: false },
        { id: 'B', text: '4 siswa', benar: true },
        { id: 'C', text: '5 siswa', benar: false },
        { id: 'D', text: '6 siswa', benar: false }
      ],
      jawaban: 'B'
    },
    {
      id: 2,
      title: "Piktogram Hewan Peliharaan",
      emoji: "🐶",
      pertanyaan: "Hewan apa yang paling banyak dipelihara?",
      hint: "Cari baris dengan ikon terbanyak",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "🐶", label: "Anjing", count: 7, color: "#8B5CF6" },
        { icon: "🐱", label: "Kucing", count: 5, color: "#EC4899" },
        { icon: "🐰", label: "Kelinci", count: 3, color: "#F97316" },
        { icon: "🐦", label: "Burung", count: 4, color: "#06B6D4" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan hewan peliharaan:",
      pilihan: [
        { id: 'A', text: 'Anjing', benar: true },
        { id: 'B', text: 'Kucing', benar: false },
        { id: 'C', text: 'Kelinci', benar: false },
        { id: 'D', text: 'Burung', benar: false }
      ],
      jawaban: 'A'
    },
    {
      id: 3,
      title: "Piktogram Warna Seragam",
      emoji: "👕",
      pertanyaan: "Berapa total siswa yang memakai seragam?",
      hint: "Jumlahkan semua ikon siswa",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "🔴", label: "Merah", count: 8, color: "#EF4444" },
        { icon: "🔵", label: "Biru", count: 6, color: "#3B82F6" },
        { icon: "🟢", label: "Hijau", count: 5, color: "#10B981" },
        { icon: "🟡", label: "Kuning", count: 7, color: "#F59E0B" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan warna seragam:",
      pilihan: [
        { id: 'A', text: '24 siswa', benar: false },
        { id: 'B', text: '25 siswa', benar: false },
        { id: 'C', text: '26 siswa', benar: true },
        { id: 'D', text: '27 siswa', benar: false }
      ],
      jawaban: 'C'
    },
    {
      id: 4,
      title: "Piktogram Transportasi Sekolah",
      emoji: "🚌",
      pertanyaan: "Berapa selisih siswa naik motor dan sepeda?",
      hint: "Kurangi jumlah sepeda dari motor",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "🚗", label: "Mobil", count: 4, color: "#3B82F6" },
        { icon: "🛵", label: "Motor", count: 9, color: "#F59E0B" },
        { icon: "🚲", label: "Sepeda", count: 6, color: "#10B981" },
        { icon: "🚶", label: "Jalan", count: 5, color: "#6B7280" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan transportasi ke sekolah:",
      pilihan: [
        { id: 'A', text: '2 siswa', benar: false },
        { id: 'B', text: '3 siswa', benar: true },
        { id: 'C', text: '4 siswa', benar: false },
        { id: 'D', text: '5 siswa', benar: false }
      ],
      jawaban: 'B'
    },
    {
      id: 5,
      title: "Piktogram Olahraga Favorit",
      emoji: "⚽",
      pertanyaan: "Olahraga apa yang dipilih 5 siswa?",
      hint: "Cari baris dengan 5 ikon",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "⚽", label: "Sepak Bola", count: 8, color: "#10B981" },
        { icon: "🏀", label: "Basket", count: 6, color: "#EF4444" },
        { icon: "🏸", label: "Badminton", count: 5, color: "#3B82F6" },
        { icon: "🏊", label: "Renang", count: 7, color: "#06B6D4" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan olahraga favorit:",
      pilihan: [
        { id: 'A', text: 'Sepak Bola', benar: false },
        { id: 'B', text: 'Basket', benar: false },
        { id: 'C', text: 'Badminton', benar: true },
        { id: 'D', text: 'Renang', benar: false }
      ],
      jawaban: 'C'
    },
    {
      id: 6,
      title: "Piktogram Alat Tulis",
      emoji: "✏️",
      pertanyaan: "Berapa jumlah alat tulis yang kurang dari 7?",
      hint: "Hitung alat tulis dengan ikon kurang dari 7",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "✏️", label: "Pensil", count: 8, color: "#8B5CF6" },
        { icon: "🖍️", label: "Krayon", count: 5, color: "#EC4899" },
        { icon: "📏", label: "Penggaris", count: 3, color: "#06B6D4" },
        { icon: "✂️", label: "Gunting", count: 4, color: "#10B981" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan alat tulis di kelas:",
      pilihan: [
        { id: 'A', text: '1 jenis', benar: false },
        { id: 'B', text: '2 jenis', benar: false },
        { id: 'C', text: '3 jenis', benar: true },
        { id: 'D', text: '4 jenis', benar: false }
      ],
      jawaban: 'C'
    },
    {
      id: 7,
      title: "Piktogram Makanan Siang",
      emoji: "🍱",
      pertanyaan: "Makanan apa yang PALING SEDIKIT dipilih?",
      hint: "Cari baris dengan ikon tersedikit",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "🍚", label: "Nasi", count: 9, color: "#F97316" },
        { icon: "🍗", label: "Ayam", count: 7, color: "#92400E" },
        { icon: "🐟", label: "Ikan", count: 4, color: "#3B82F6" },
        { icon: "🥦", label: "Sayur", count: 6, color: "#10B981" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan makanan siang siswa:",
      pilihan: [
        { id: 'A', text: 'Nasi', benar: false },
        { id: 'B', text: 'Ayam', benar: false },
        { id: 'C', text: 'Ikan', benar: true },
        { id: 'D', text: 'Sayur', benar: false }
      ],
      jawaban: 'C'
    },
    {
      id: 8,
      title: "Piktogram Kegiatan Luar",
      emoji: "🌳",
      pertanyaan: "Berapa siswa yang suka BERMAIN?",
      hint: "Lihat baris dengan ikon bermain",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "📚", label: "Membaca", count: 5, color: "#8B5CF6" },
        { icon: "🎨", label: "Menggambar", count: 6, color: "#EC4899" },
        { icon: "⚽", label: "Bermain", count: 8, color: "#10B981" },
        { icon: "🎵", label: "Menyanyi", count: 4, color: "#06B6D4" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan kegiatan luar kelas:",
      pilihan: [
        { id: 'A', text: '5 siswa', benar: false },
        { id: 'B', text: '6 siswa', benar: false },
        { id: 'C', text: '7 siswa', benar: false },
        { id: 'D', text: '8 siswa', benar: true }
      ],
      jawaban: 'D'
    },
    {
      id: 9,
      title: "Piktogram Minuman",
      emoji: "🥤",
      pertanyaan: "Berapa total ikon minuman?",
      hint: "Jumlahkan semua ikon di piktogram",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "🥛", label: "Susu", count: 7, color: "#F9FAFB" },
        { icon: "🧃", label: "Jus", count: 5, color: "#F59E0B" },
        { icon: "💧", label: "Air", count: 9, color: "#3B82F6" },
        { icon: "🍵", label: "Teh", count: 4, color: "#10B981" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan minuman favorit:",
      pilihan: [
        { id: 'A', text: '23 ikon', benar: false },
        { id: 'B', text: '24 ikon', benar: false },
        { id: 'C', text: '25 ikon', benar: true },
        { id: 'D', text: '26 ikon', benar: false }
      ],
      jawaban: 'C'
    },
    {
      id: 10,
      title: "Piktogram Cuaca",
      emoji: "☀️",
      pertanyaan: "Hari apa yang paling banyak CERAH?",
      hint: "Cari baris dengan ikon terbanyak",
      tipe: "piktogram_sederhana",
      pictoData: [
        { icon: "☀️", label: "Cerah", count: 8, color: "#F59E0B" },
        { icon: "☔", label: "Hujan", count: 3, color: "#3B82F6" },
        { icon: "⛅", label: "Berawan", count: 5, color: "#6B7280" },
        { icon: "💨", label: "Angin", count: 2, color: "#06B6D4" }
      ],
      pertanyaanDetail: "Piktogram menunjukkan cuaca minggu lalu:",
      pilihan: [
        { id: 'A', text: 'Cerah', benar: true },
        { id: 'B', text: 'Hujan', benar: false },
        { id: 'C', text: 'Berawan', benar: false },
        { id: 'D', text: 'Angin', benar: false }
      ],
      jawaban: 'A'
    }
  ];

  // Load history dari localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('game_piktogram_history');
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Acak soal saat mulai
  const acakSoal = () => {
    const shuffled = [...soalBank]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setShuffledQuestions(shuffled);
    setSelectedAnswers({});
  };

  useEffect(() => {
    if (gameStatus === 'playing' && shuffledQuestions.length === 0) {
      acakSoal();
    }
  }, [gameStatus]);

  // Fullscreen handler
  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (gameContainerRef.current.requestFullscreen) {
          await gameContainerRef.current.requestFullscreen();
        } else if (gameContainerRef.current.webkitRequestFullscreen) {
          await gameContainerRef.current.webkitRequestFullscreen();
        } else if (gameContainerRef.current.msRequestFullscreen) {
          await gameContainerRef.current.msRequestFullscreen();
        }
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          await document.msExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (err) {
      console.log('Fullscreen error:', err);
    }
  };

  // Listen untuk fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const playSound = (soundType) => {
    try {
      switch (soundType) {
        case 'benar':
          audioBenarRef.current.currentTime = 0;
          audioBenarRef.current.play();
          break;
        case 'salah':
          audioSalahRef.current.currentTime = 0;
          audioSalahRef.current.play();
          break;
        case 'berhasil':
          audioBerhasilRef.current.currentTime = 0;
          audioBerhasilRef.current.play();
          break;
        case 'gagal':
          audioGagalRef.current.currentTime = 0;
          audioGagalRef.current.play();
          break;
        case 'klik':
          audioKlikRef.current.currentTime = 0;
          audioKlikRef.current.play();
          break;
      }
    } catch (err) {
      console.log('Audio error:', err);
    }
  };

  const handleAnswer = (answerId) => {
    if (showFeedback) return;

    playSound('klik');
    const currentSoal = shuffledQuestions[currentQuestion];
    const isCorrect = answerId === currentSoal.jawaban;

    setSelectedAnswers(prev => ({
      ...prev,
      [currentSoal.id]: answerId
    }));

    setShowFeedback(true);

    if (isCorrect) {
      playSound('benar');
      setScore(score + 10);
    } else {
      playSound('salah');
    }

    setTimeout(() => {
      if (currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1);
        setShowFeedback(false);
        setShowHint(false);
      } else {
        saveGameResult();
        setGameStatus('end');
      }
    }, 2000);
  };

  const saveGameResult = () => {
    const finalName = playerMode === 'named' ? playerName : 'Tamu';
    const result = {
      id: Date.now(),
      playerName: finalName,
      score,
      correctAnswers: score / 10,
      totalQuestions: 10,
      date: new Date().toLocaleDateString('id-ID'),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      mode: playerMode,
      gameType: 'Membaca Piktogram'
    };

    const newHistory = [result, ...gameHistory.slice(0, 4)];
    setGameHistory(newHistory);
    localStorage.setItem('game_piktogram_history', JSON.stringify(newHistory));

    if (score >= 70) {
      playSound('berhasil');
    } else {
      playSound('gagal');
    }
  };

  const startGameWithName = () => {
    if (playerName.trim()) {
      setPlayerMode('named');
      setGameStatus('playing');
      acakSoal();
    }
  };

  const startGameAnonymous = () => {
    setPlayerMode('anonymous');
    setPlayerName('Tamu');
    setGameStatus('playing');
    acakSoal();
  };

  const restartGame = () => {
    setGameStatus('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setShowHint(false);
    acakSoal();
  };

  const resetHistory = () => {
    setGameHistory([]);
    localStorage.removeItem('game_piktogram_history');
  };

  const printResult = (history) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
            <html>
                <head>
                    <title>Hasil Game Membaca Piktogram</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            color: #355485;
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                            border-bottom: 3px solid #EC4899;
                            padding-bottom: 20px;
                        }
                        .result-card {
                            border: 2px solid #90b6d5;
                            border-radius: 15px;
                            padding: 20px;
                            margin: 20px 0;
                            background: #f9fafb;
                        }
                        .score {
                            font-size: 48px;
                            font-weight: bold;
                            color: #355485;
                            text-align: center;
                            margin: 20px 0;
                        }
                        .details {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 15px;
                            margin-top: 20px;
                        }
                        .detail-item {
                            padding: 10px;
                            background: white;
                            border-radius: 10px;
                            border: 1px solid #cbdde9;
                        }
                        .skill-list {
                            margin-top: 30px;
                            padding: 15px;
                            background: #fdf2f8;
                            border-radius: 10px;
                            border: 1px solid #fbcfe8;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 40px;
                            color: #6b7280;
                            font-size: 12px;
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>📊 Hasil Game Membaca Piktogram</h1>
                        <h3>Untuk Siswa Kelas 1 SD</h3>
                    </div>
                    
                    <div class="result-card">
                        <h2>Pemain: ${history.playerName}</h2>
                        <div class="score">${history.score}</div>
                        <p style="text-align: center; font-size: 18px;">
                            ${history.score >= 70 ? '🎉 Hebat! Kamu jago membaca piktogram!' : '📝 Terus berlatih membaca simbol visual!'}
                        </p>
                        
                        <div class="details">
                            <div class="detail-item">
                                <strong>Tanggal:</strong><br>
                                ${history.date}
                            </div>
                            <div class="detail-item">
                                <strong>Waktu:</strong><br>
                                ${history.time}
                            </div>
                            <div class="detail-item">
                                <strong>Jawaban Benar:</strong><br>
                                ${history.correctAnswers} dari 10 soal
                            </div>
                            <div class="detail-item">
                                <strong>Persentase:</strong><br>
                                ${history.score}%
                            </div>
                        </div>
                        
                        <div class="skill-list">
                            <h4>📈 Kemampuan yang Dilatih:</h4>
                            <ul>
                                <li>Membaca dan memahami piktogram</li>
                                <li>Menafsirkan simbol visual</li>
                                <li>Menganalisis data grafis</li>
                                <li>Membandingkan jumlah ikon</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Game Membaca Piktogram - Materi Pembelajaran Kelas 1 SD</p>
                        <p>Melatih kemampuan membaca serta menafsirkan piktogram secara visual</p>
                    </div>
                </body>
            </html>
        `);
    printWindow.document.close();
    printWindow.print();
  };

  const progress = ((currentQuestion + 1) / 10) * 100;

  // Render Start Screen
  if (gameStatus === 'start') {
    return (
      <>
        {/* Audio elements */}
        <audio ref={audioBenarRef} src="/audio/sound-benar.mp3" preload="auto" />
        <audio ref={audioSalahRef} src="/audio/sound-salah.mp3" preload="auto" />
        <audio ref={audioBerhasilRef} src="/audio/sound-berhasil.mp3" preload="auto" />
        <audio ref={audioGagalRef} src="/audio/sound-gagal.mp3" preload="auto" />
        <audio ref={audioKlikRef} src="/audio/klik.mp3" preload="auto" />

        <div
          ref={gameContainerRef}
          className={`min-h-screen bg-gradient-to-b from-[#cbdde9] to-[#f9fafb] ${isFullscreen ? 'flex items-center justify-center p-4' : 'p-4 md:p-8'}`}
        >
          <div className={`w-full ${isFullscreen ? 'max-w-[1400px] mx-auto' : ''}`}>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#EC4899] to-[#355485] flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                <span className="text-6xl">📊</span>
              </div>
              <h1 className="text-4xl font-bold text-[#355485] mb-3">
                Game Membaca Piktogram
              </h1>
              <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
                Untuk siswa kelas 1 SD. Latih kemampuan membaca dan menafsirkan piktogram!
              </p>
            </div>

            {/* Main Content - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Game Options */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                  <h2 className="text-2xl font-bold text-[#355485] mb-6 flex items-center gap-3">
                    <span className="text-3xl">🎯</span>
                    Pilih Cara Bermain
                  </h2>

                  {/* Named Player Option */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#cbdde9] flex items-center justify-center">
                        <span className="text-xl">👤</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#355485]">Bermain dengan Nama</h3>
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Masukkan nama kamu"
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#cbdde9] focus:border-[#EC4899] focus:outline-none bg-white text-[#355485] text-lg transition-all"
                      />
                    </div>

                    <button
                      onClick={startGameWithName}
                      disabled={!playerName.trim()}
                      className="w-full bg-gradient-to-r from-[#EC4899] to-[#355485] hover:from-[#DB2777] hover:to-[#2a436c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-3 text-lg">
                        <span className="text-xl">🚀</span>
                        Mulai dengan Nama
                      </span>
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-[#e5e7eb]"></div>
                    <span className="px-4 text-[#9ca3af]">ATAU</span>
                    <div className="flex-1 h-px bg-[#e5e7eb]"></div>
                  </div>

                  {/* Anonymous Option */}
                  <div>
                    <button
                      onClick={startGameAnonymous}
                      className="w-full border-2 border-[#EC4899] hover:border-[#355485] text-[#EC4899] hover:text-[#355485] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <span className="flex items-center justify-center gap-3 text-lg">
                        <span className="text-xl">🎪</span>
                        Main sebagai Tamu
                      </span>
                    </button>
                    <p className="text-sm text-[#9ca3af] text-center mt-3">
                      Hasil tidak akan disimpan dengan nama
                    </p>
                  </div>
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="w-full border-2 border-[#e5e7eb] hover:border-[#9ca3af] hover:bg-white text-[#6b7280] py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-2xl">{isFullscreen ? '📱' : '🖥️'}</span>
                    <span className="text-lg">{isFullscreen ? 'Keluar Fullscreen' : 'Mode Layar Penuh'}</span>
                  </span>
                </button>
              </div>

              {/* Right Column - History */}
              <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#355485] flex items-center gap-3">
                    <span className="text-3xl">🏆</span>
                    <span>Riwayat Permainan</span>
                  </h3>
                  {gameHistory.length > 0 && (
                    <button
                      onClick={resetHistory}
                      className="text-sm text-[#6b7280] hover:text-[#EC4899] hover:underline px-3 py-1 rounded-lg hover:bg-[#f9fafb] transition-colors"
                    >
                      Hapus Semua
                    </button>
                  )}
                </div>

                {gameHistory.length > 0 ? (
                  <div className="space-y-4">
                    {gameHistory.slice(0, 5).map((history, index) => (
                      <div
                        key={history.id}
                        className={`p-4 rounded-xl border transition-all hover:shadow-md ${index === 0 ? 'border-[#EC4899] bg-gradient-to-r from-[#fdf2f8] to-white' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-gradient-to-br from-[#EC4899] to-[#355485] text-white' : 'bg-[#cbdde9] text-[#355485]'}`}>
                                <span className="font-bold">{index + 1}</span>
                              </div>
                              <div>
                                <div className="font-bold text-[#355485]">{history.playerName}</div>
                                <div className="text-sm text-[#9ca3af]">
                                  {history.date} • {history.time}
                                </div>
                              </div>
                              {index === 0 && (
                                <span className="text-xs bg-[#EC4899] text-white px-3 py-1 rounded-full animate-pulse">
                                  TERBARU
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className={`text-2xl font-bold mb-1 ${history.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                              {history.score}
                            </div>
                            <div className="text-sm text-[#9ca3af]">
                              {history.correctAnswers}/10 soal
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => printResult(history)}
                            className="text-sm bg-[#cbdde9] hover:bg-[#90b6d5] text-[#355485] font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                          >
                            <span>🖨️</span>
                            Print Hasil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-5xl text-[#cbdde9] mb-4">📝</div>
                    <p className="text-[#6b7280] font-medium text-lg">Belum ada riwayat permainan</p>
                    <p className="text-sm text-[#9ca3af] mt-2">Mulai permainan untuk melihat riwayat di sini</p>
                  </div>
                )}
              </div>
            </div>

            {/* Game Description */}
            <div className="bg-gradient-to-r from-[#355485] to-[#EC4899] rounded-2xl p-8 text-white shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-3">📊 Tujuan Pembelajaran</h3>
                  <p className="opacity-90 max-w-2xl">
                    Permainan ini mengajak siswa membaca serta menafsirkan piktogram.
                    Dengan menganalisis simbol yang mewakili jumlah tertentu,
                    siswa belajar memahami data secara visual dan menarik.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl">📈</div>
                    <div className="text-sm">Piktogram</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl">👁️</div>
                    <div className="text-sm">Visual</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl">🧮</div>
                    <div className="text-sm">Analisis</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Render Game Screen
  if (gameStatus === 'playing' && shuffledQuestions.length > 0) {
    const soal = shuffledQuestions[currentQuestion];
    const selectedAnswer = selectedAnswers[soal.id];
    const maxCount = Math.max(...soal.pictoData.map(d => d.count));

    return (
      <>
        <audio ref={audioBenarRef} src="/audio/sound-benar.mp3" preload="auto" />
        <audio ref={audioSalahRef} src="/audio/sound-salah.mp3" preload="auto" />
        <audio ref={audioBerhasilRef} src="/audio/sound-berhasil.mp3" preload="auto" />
        <audio ref={audioGagalRef} src="/audio/sound-gagal.mp3" preload="auto" />
        <audio ref={audioKlikRef} src="/audio/klik.mp3" preload="auto" />

        <div
          ref={gameContainerRef}
          className={`min-h-screen bg-gradient-to-b from-[#cbdde9] to-[#f9fafb] ${isFullscreen ? 'flex items-center justify-center p-4' : 'p-4 md:p-8'}`}
        >
          <div className={`w-full ${isFullscreen ? 'max-w-[1200px] mx-auto' : ''}`}>
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#355485] flex items-center gap-3">
                    <span className="text-3xl">📊</span>
                    Membaca Piktogram
                  </h2>
                  <p className="text-[#6b7280]">
                    Pemain: <span className="font-semibold text-[#EC4899]">{playerName}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-xl border-2 border-[#e5e7eb] shadow-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#EC4899]">{score}</div>
                      <div className="text-xs text-[#9ca3af]">Poin</div>
                    </div>
                    <div className="w-px h-8 bg-[#e5e7eb]" />
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#EC4899]">{currentQuestion + 1}/10</div>
                      <div className="text-xs text-[#9ca3af]">Soal</div>
                    </div>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="p-3 rounded-xl border-2 border-[#e5e7eb] hover:border-[#9ca3af] hover:bg-white text-[#6b7280] hover:text-[#355485] transition-all duration-300"
                    title={isFullscreen ? "Keluar Fullscreen" : "Mode Fullscreen"}
                  >
                    <span className="text-2xl">{isFullscreen ? '📱' : '🖥️'}</span>
                  </button>
                </div>
              </div>

              {/* Progress Numbers */}
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <span className="text-sm font-medium text-[#355485]">Progress Pengerjaan</span>
                  <span className="text-sm font-medium text-[#EC4899]">
                    Soal {currentQuestion + 1} dari 10
                  </span>
                </div>
                <div className="flex justify-between items-center gap-2">
                  {Array.from({ length: 10 }).map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${index === currentQuestion
                        ? 'bg-gradient-to-br from-[#EC4899] to-[#355485] text-white transform scale-105 shadow-lg'
                        : index < currentQuestion
                          ? 'bg-[#90b6d5] text-white'
                          : 'bg-white border-2 border-[#cbdde9] text-[#9ca3af]'
                        }`}
                    >
                      <span className="font-bold">{index + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Piktogram */}
              <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#355485] flex items-center justify-center">
                      <span className="text-4xl">{soal.emoji}</span>
                    </div>
                    <div>
                      <div className="text-sm text-[#EC4899] font-bold mb-1">SOAL #{soal.id}</div>
                      <h3 className="text-2xl font-bold text-[#355485]">{soal.title}</h3>
                      <p className="text-[#6b7280] mt-1">{soal.pertanyaanDetail}</p>
                    </div>
                  </div>

                  {/* Piktogram Visualization */}
                  <div className="mb-8">
                    <div className="text-center mb-6">
                      <div className="text-sm text-[#6b7280] font-medium mb-2">PIKTOGRAM</div>
                      <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#fdf2f8] to-white border-2 border-[#fbcfe8] rounded-xl">
                        <span className="text-sm text-[#EC4899] font-medium">📊 Setiap ikon mewakili 1 data</span>
                      </div>
                    </div>

                    {/* Piktogram Grid */}
                    <div className="space-y-6">
                      {soal.pictoData.map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.icon}</span>
                              <span className="font-bold text-[#355485]">{item.label}</span>
                            </div>
                            <div className="text-sm text-[#6b7280]">
                              <span className="font-bold text-[#EC4899]">{item.count}</span> data
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {[...Array(item.count)].map((_, i) => (
                              <div
                                key={i}
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl animate-fade-in"
                                style={{
                                  backgroundColor: `${item.color}20`,
                                  border: `2px solid ${item.color}`,
                                  animationDelay: `${i * 50}ms`
                                }}
                              >
                                {item.icon}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hint Button */}
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="w-full py-3 bg-gradient-to-r from-[#cbdde9] to-[#90b6d5] hover:from-[#90b6d5] hover:to-[#EC4899] text-[#355485] font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <span className="flex items-center justify-center gap-3">
                    <span className="text-xl">💡</span>
                    {showHint ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk'}
                  </span>
                </button>

                {/* Hint Display */}
                {showHint && !showFeedback && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl animate-fade-in">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">💡</span>
                      <div>
                        <div className="font-bold text-[#355485] mb-1">Petunjuk:</div>
                        <p className="text-[#6b7280]">{soal.hint}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Question & Answers */}
              <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                <div className="sticky top-8">
                  {/* Question */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#355485] flex items-center justify-center">
                        <span className="text-2xl text-white">❓</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-[#355485]">Pertanyaan</h4>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-[#fdf2f8] to-white rounded-xl border-2 border-[#fbcfe8]">
                      <h3 className="text-xl font-bold text-[#355485] mb-2">{soal.pertanyaan}</h3>
                      <p className="text-[#6b7280]">Pilih satu jawaban yang benar berdasarkan piktogram!</p>
                    </div>
                  </div>

                  {/* Answer Options */}
                  <div className="mb-8">
                    <h4 className="font-bold text-[#355485] mb-4 flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      <span>Pilihan Jawaban</span>
                    </h4>

                    <div className="space-y-3">
                      {soal.pilihan.map((option) => {
                        const isSelected = selectedAnswer === option.id;
                        const isCorrectAnswer = option.id === soal.jawaban;
                        return (
                          <button
                            key={option.id}
                            onClick={() => handleAnswer(option.id)}
                            disabled={showFeedback}
                            className={`w-full p-4 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02]
                                                            ${isSelected
                                ? showFeedback
                                  ? isCorrectAnswer
                                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-400 text-green-900 shadow-lg'
                                    : 'bg-gradient-to-r from-red-100 to-pink-100 border-4 border-red-400 text-red-900 shadow-lg'
                                  : 'bg-gradient-to-r from-[#EC4899] to-[#355485] border-4 border-[#EC4899] text-white shadow-lg'
                                : 'bg-gradient-to-r from-[#f9fafb] to-white border-2 border-[#e5e7eb] hover:border-[#cbdde9] hover:shadow-md text-[#355485]'
                              }
                                                            ${showFeedback && isCorrectAnswer && !isSelected
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-400 text-green-900 shadow-lg'
                                : ''
                              }
                                                        `}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg
                                                                ${isSelected
                                  ? showFeedback
                                    ? isCorrectAnswer
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                    : 'bg-white text-[#EC4899]'
                                  : 'bg-[#cbdde9] text-[#355485]'
                                }
                                                                ${showFeedback && isCorrectAnswer && !isSelected
                                  ? 'bg-green-500 text-white'
                                  : ''
                                }
                                                            `}>
                                {option.id}
                              </div>
                              <div className="flex-1">
                                <div className="text-lg font-bold">{option.text}</div>
                              </div>
                              {isSelected && showFeedback && (
                                <span className="text-2xl animate-bounce">
                                  {isCorrectAnswer ? '✅' : '❌'}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback */}
                  {showFeedback && (
                    <div className={`p-6 rounded-xl text-center animate-fade-in shadow-lg
                                            ${selectedAnswer === soal.jawaban
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
                        : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-3xl">
                          {selectedAnswer === soal.jawaban ? '📊' : '📉'}
                        </span>
                        <div className={`text-xl font-bold mb-1 ${selectedAnswer === soal.jawaban ? 'text-green-700' : 'text-red-700'}`}>
                          {selectedAnswer === soal.jawaban
                            ? 'BENAR!'
                            : 'SALAH!'
                          }
                        </div>
                        <p className="text-[#6b7280]">
                          {selectedAnswer === soal.jawaban
                            ? `Kamu mendapat 10 poin!`
                            : `Jawaban yang benar adalah: ${soal.pilihan.find(p => p.id === soal.jawaban)?.text}`
                          }
                        </p>
                      </div>
                      <div className="mt-4 text-sm text-[#9ca3af]">
                        Soal berikutnya akan dimulai otomatis...
                      </div>
                    </div>
                  )}

                  {/* Piktogram Statistics */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-[#fdf2f8] to-white border-2 border-[#fbcfe8] rounded-xl">
                    <h4 className="font-bold text-[#355485] mb-3 flex items-center gap-2">
                      <span className="text-xl">📈</span>
                      <span>Statistik Piktogram</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-white rounded-lg border border-[#e5e7eb]">
                        <div className="text-lg font-bold text-[#EC4899]">{soal.pictoData.length}</div>
                        <div className="text-xs text-[#6b7280]">Kategori</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg border border-[#e5e7eb]">
                        <div className="text-lg font-bold text-[#EC4899]">{maxCount}</div>
                        <div className="text-xs text-[#6b7280]">Tertinggi</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg border border-[#e5e7eb]">
                        <div className="text-lg font-bold text-[#EC4899]">
                          {Math.min(...soal.pictoData.map(d => d.count))}
                        </div>
                        <div className="text-xs text-[#6b7280]">Terendah</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded-lg border border-[#e5e7eb]">
                        <div className="text-lg font-bold text-[#EC4899]">
                          {soal.pictoData.reduce((sum, d) => sum + d.count, 0)}
                        </div>
                        <div className="text-xs text-[#6b7280]">Total Ikon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Render End Screen
  if (gameStatus === 'end') {
    const nilai = score;
    const pesan = nilai === 100 ? 'LUAR BIASA!' : nilai >= 70 ? 'HEBAT!' : 'AYO LATIHAN LAGI!';

    return (
      <>
        <audio ref={audioBenarRef} src="/audio/sound-benar.mp3" preload="auto" />
        <audio ref={audioSalahRef} src="/audio/sound-salah.mp3" preload="auto" />
        <audio ref={audioBerhasilRef} src="/audio/sound-berhasil.mp3" preload="auto" />
        <audio ref={audioGagalRef} src="/audio/sound-gagal.mp3" preload="auto" />
        <audio ref={audioKlikRef} src="/audio/klik.mp3" preload="auto" />

        <div
          ref={gameContainerRef}
          className={`min-h-screen bg-gradient-to-b from-[#cbdde9] to-[#f9fafb] ${isFullscreen ? 'flex items-center justify-center p-4' : 'p-4 md:p-8'}`}
        >
          <div className={`w-full ${isFullscreen ? 'max-w-[1200px] mx-auto' : ''}`}>
            <div className="text-center mb-8">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce
                                ${nilai === 100 ? 'bg-gradient-to-br from-yellow-300 to-orange-400' :
                  nilai >= 70 ? 'bg-gradient-to-br from-green-300 to-emerald-400' :
                    'bg-gradient-to-br from-blue-300 to-indigo-400'}`}
              >
                <span className="text-6xl">
                  {nilai === 100 ? '🏆' : nilai >= 70 ? '📊' : '📈'}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-[#355485] mb-3">{pesan}</h1>
              <p className="text-[#6b7280] text-lg mb-1">Selesai! Inilah Hasil Permainanmu</p>
              <p className="text-[#EC4899] font-bold text-xl">Pemain: {playerName}</p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Left Column - Score Summary */}
              <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                <h3 className="font-bold text-[#355485] mb-8 flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  <span className="text-2xl">Hasil Permainan</span>
                </h3>

                {/* Score Circle */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-5xl font-bold ${nilai >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                      {nilai}
                    </div>
                  </div>
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#e5e7eb"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke={nilai >= 70 ? "#EC4899" : "#355485"}
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${nilai * 5.5} 550`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Jawaban Benar', value: `${score / 10} dari 10` },
                    { label: 'Total Poin', value: score },
                    { label: 'Persentase', value: `${nilai}%` },
                    { label: 'Status', value: nilai >= 70 ? '✅ BERHASIL' : '💪 PERLU LATIHAN', color: nilai >= 70 ? 'text-green-600' : 'text-red-600' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-gradient-to-r from-[#f9fafb] to-white rounded-xl border-2 border-[#e5e7eb]">
                      <span className="text-[#6b7280] font-medium">{item.label}</span>
                      <span className={`font-bold text-lg ${item.color || 'text-[#355485]'}`}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Skills Developed */}
                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#fdf2f8] to-white border-2 border-[#EC4899]">
                  <h4 className="font-bold text-[#355485] mb-3 flex items-center gap-2">
                    <span className="text-xl">📈</span>
                    Kemampuan yang Dilatih
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Membaca Piktogram', 'Interpretasi Visual', 'Analisis Data', 'Kesimpulan'].map((skill, idx) => (
                      <div key={idx} className="px-3 py-2 bg-[#cbdde9] rounded-lg text-center text-sm font-medium text-[#355485]">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - History */}
              <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-[#355485] flex items-center gap-3">
                    <span className="text-3xl">📊</span>
                    <span className="text-2xl">Riwayat Permainan</span>
                  </h3>
                  <button
                    onClick={() => printResult(gameHistory[0])}
                    className="bg-gradient-to-r from-[#EC4899] to-[#355485] hover:from-[#DB2777] hover:to-[#2a436c] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <span>🖨️</span>
                    Print Hasil Ini
                  </button>
                </div>

                <div className="space-y-4">
                  {gameHistory.slice(0, 5).map((history, index) => (
                    <div
                      key={history.id}
                      className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${index === 0 ? 'border-[#EC4899] bg-gradient-to-r from-[#fdf2f8] to-white' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-gradient-to-br from-[#EC4899] to-[#355485] text-white' : 'bg-[#cbdde9] text-[#355485]'}`}>
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-bold text-[#355485]">{history.playerName}</div>
                            <div className="text-sm text-[#9ca3af]">
                              {history.date} • {history.time}
                            </div>
                          </div>
                          {index === 0 && (
                            <span className="text-xs bg-[#EC4899] text-white px-3 py-1 rounded-full animate-pulse">
                              TERBARU
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${history.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                            {history.score}
                          </div>
                          <div className="text-sm text-[#9ca3af]">
                            {history.correctAnswers}/10
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={restartGame}
                className="flex-1 bg-gradient-to-r from-[#EC4899] to-[#355485] hover:from-[#DB2777] hover:to-[#2a436c] text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl"
              >
                <span className="flex items-center justify-center gap-3 text-lg">
                  <span className="text-2xl">🔄</span>
                  MAIN LAGI
                </span>
              </button>
              <button
                onClick={() => setGameStatus('start')}
                className="flex-1 border-2 border-[#EC4899] hover:border-[#355485] text-[#EC4899] hover:text-[#355485] font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center gap-3 text-lg">
                  <span className="text-2xl">🏠</span>
                  MENU UTAMA
                </span>
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={toggleFullscreen}
                className="border-2 border-[#e5e7eb] hover:border-[#9ca3af] hover:bg-white text-[#6b7280] py-3 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center gap-2 mx-auto"
              >
                <span className="text-xl">{isFullscreen ? '📱' : '🖥️'}</span>
                {isFullscreen ? 'Keluar Fullscreen' : 'Mode Layar Penuh'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Loading state
  return (
    <>
      <audio ref={audioBenarRef} src="/audio/sound-benar.mp3" preload="auto" />
      <audio ref={audioSalahRef} src="/audio/sound-salah.mp3" preload="auto" />
      <audio ref={audioBerhasilRef} src="/audio/sound-berhasil.mp3" preload="auto" />
      <audio ref={audioGagalRef} src="/audio/sound-gagal.mp3" preload="auto" />
      <audio ref={audioKlikRef} src="/audio/klik.mp3" preload="auto" />

      <div
        ref={gameContainerRef}
        className={`min-h-screen bg-gradient-to-b from-[#cbdde9] to-[#f9fafb] flex items-center justify-center ${isFullscreen ? 'p-4' : ''}`}
      >
        <div className={`text-center ${isFullscreen ? 'max-w-[800px] w-full' : ''}`}>
          <div className="relative">
            <div className="w-24 h-24 border-4 border-[#cbdde9] border-t-[#EC4899] rounded-full animate-spin mx-auto mb-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl">📊</span>
            </div>
          </div>
          <h3 className="text-xl font-bold text-[#355485] mb-2">Menyiapkan Piktogram...</h3>
          <p className="text-[#6b7280]">Data piktogram sedang diolah untukmu</p>
        </div>
      </div>
    </>
  );
};

export default GamePiktogram;