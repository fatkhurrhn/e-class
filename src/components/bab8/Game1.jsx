// src/components/bab8/game1/Game1.jsx
import React, { useState, useEffect, useRef } from 'react';

const Game1 = () => {
  // State untuk form nama
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // State untuk game
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);

  const gameContainerRef = useRef(null);

  // Data soal tentang pengelompokan data untuk kelas 1 SD
  const questions = [
    {
      id: 1,
      question: "Ada 3 apel merah, 4 jeruk kuning, dan 2 pisang. Manakah diagram batang yang benar?",
      type: "diagram",
      image: "🍎🍎🍎 🍊🍊🍊🍊 🍌🍌",
      options: [
        { id: 'A', text: "Apel: 3, Jeruk: 4, Pisang: 2", correct: true },
        { id: 'B', text: "Apel: 4, Jeruk: 3, Pisang: 2", correct: false },
        { id: 'C', text: "Apel: 2, Jeruk: 4, Pisang: 3", correct: false },
        { id: 'D', text: "Apel: 3, Jeruk: 2, Pisang: 4", correct: false }
      ]
    },
    {
      id: 2,
      question: "Di kelas ada 5 anak memakai sepatu hitam, 3 anak memakai sepatu putih. Berapa total anak?",
      type: "jumlah",
      image: "👟👟👟👟👟 (hitam) 👟👟👟 (putih)",
      options: [
        { id: 'A', text: "5 anak", correct: false },
        { id: 'B', text: "3 anak", correct: false },
        { id: 'C', text: "8 anak", correct: true },
        { id: 'D', text: "7 anak", correct: false }
      ]
    },
    // ... (soal lainnya tetap sama)
  ];

  // Load game history dari localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('game1_history');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      const validHistory = parsedHistory.filter(h =>
        h && h.playerName && h.score !== undefined && h.date
      );
      setGameHistory(validHistory.slice(0, 5));
    }
  }, []);

  const handleStartGame = () => {
    setShowNameInput(true);
  };

  const handleSubmitName = () => {
    if (playerName.trim() === '') {
      alert('Masukkan nama kamu dulu ya!');
      return;
    }
    setGameStarted(true);
    enterFullscreen();
  };

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(option.id);
    const correct = option.correct;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 10);
    }

    setAnswers(prev => [...prev, {
      questionId: questions[currentQuestion].id,
      selected: option.id,
      correct: correct
    }]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        finishGame();
      }
    }, 1500);
  };

  const finishGame = () => {
    setGameFinished(true);

    const totalScore = score;
    const historyEntry = {
      playerName,
      score: totalScore,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      correctAnswers: answers.filter(a => a.correct).length,
      totalQuestions: questions.length
    };

    const newHistory = [historyEntry, ...gameHistory].slice(0, 5);
    setGameHistory(newHistory);

    const allHistory = JSON.parse(localStorage.getItem('game1_history') || '[]');
    const updatedHistory = [historyEntry, ...allHistory].slice(0, 20);
    localStorage.setItem('game1_history', JSON.stringify(updatedHistory));
  };

  // Fullscreen functions
  const enterFullscreen = () => {
    const elem = gameContainerRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

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

  const restartGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setShowNameInput(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnswers([]);
    if (isFullscreen) {
      exitFullscreen();
    }
  };

  // Tampilan input nama (popup)
  if (showNameInput && !gameStarted) {
    return (
      <div ref={gameContainerRef} className="min-h-screen bg-gradient-to-br from-[#f0f7ff] to-[#e3f2fd] p-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-2xl border border-[#e5e7eb]">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[#4f90c6] to-[#90b6d5] rounded-full flex items-center justify-center text-white text-3xl">
              👤
            </div>
            <h2 className="text-2xl font-bold text-[#355485] mb-2">Masukkan Nama Kamu</h2>
            <p className="text-[#6b7280]">Sebelum mulai bermain, kenalkan diri dulu ya!</p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Contoh: Andi, Sari, atau Budi"
              className="w-full px-6 py-4 text-lg border-2 border-[#e5e7eb] rounded-xl focus:border-[#4f90c6] focus:outline-none transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitName()}
              autoFocus
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowNameInput(false)}
              className="flex-1 px-6 py-3 bg-white border-2 border-[#e5e7eb] text-[#355485] font-semibold rounded-xl hover:border-[#4f90c6] hover:text-[#4f90c6] transition-all duration-300"
            >
              Kembali
            </button>
            <button
              onClick={handleSubmitName}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white text-lg font-semibold rounded-xl hover:from-[#3a7bb5] hover:to-[#7aa8d1] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              🎮 Mulai Bermain
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan awal - menu utama
  if (!showNameInput && !gameStarted && !gameFinished) {
    return (
      <div ref={gameContainerRef} className="min-h-screen bg-gradient-to-br from-[#f0f7ff] to-[#e3f2fd] p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Utama */}
          <div className="text-center mb-10">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#4f90c6] to-[#90b6d5] rounded-full flex items-center justify-center text-white text-5xl animate-bounce">
              📊
            </div>
            <h1 className="text-5xl font-bold text-[#355485] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#355485] to-[#4f90c6]">
              Mengelompokkan Data
            </h1>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
              Belajar membaca dan memahami diagram dengan cara yang menyenangkan!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Bagian Kiri - Aturan Permainan */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#e5e7eb] transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#4f90c6] to-[#90b6d5] rounded-xl flex items-center justify-center text-white text-2xl">
                  📝
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#355485]">Aturan Permainan</h2>
                  <p className="text-[#6b7280]">Pelajari cara bermain game ini</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f8fafc] to-[#f0f7ff] rounded-xl">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-lg flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-[#355485] mb-1">10 Soal Menantang</h3>
                    <p className="text-[#6b7280]">Jawab 10 soal tentang pengelompokan data dan diagram</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f8fafc] to-[#f0f7ff] rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-[#355485] mb-1">Sistem Poin</h3>
                    <p className="text-[#6b7280]">Dapatkan 10 poin untuk setiap jawaban benar. Total maksimal 100 poin!</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f8fafc] to-[#f0f7ff] rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-lg flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-[#355485] mb-1">Waktu Terbatas</h3>
                    <p className="text-[#6b7280]">Pilih jawaban dengan cepat dan tepat untuk mendapatkan skor tinggi</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#f8fafc] to-[#f0f7ff] rounded-xl">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-lg flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-[#355485] mb-1">Mode Fullscreen</h3>
                    <p className="text-[#6b7280]">Mainkan dalam mode layar penuh untuk pengalaman terbaik</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-[#355485] to-[#2a436c] rounded-2xl text-white">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">💡</div>
                  <div>
                    <div className="font-bold text-lg mb-1">Tips Bermain</div>
                    <div className="opacity-90">Perhatikan diagram dengan seksama dan hitung dengan teliti sebelum memilih jawaban!</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian Kanan - Riwayat Permainan */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-[#e5e7eb] transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] rounded-xl flex items-center justify-center text-white text-2xl">
                  🏆
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#355485]">Riwayat Permainan</h2>
                  <p className="text-[#6b7280]">Lihat pemain dengan skor tertinggi</p>
                </div>
              </div>

              {gameHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-full flex items-center justify-center text-[#9ca3af] text-4xl">
                    📊
                  </div>
                  <h3 className="text-xl font-bold text-[#9ca3af] mb-2">Belum Ada Riwayat</h3>
                  <p className="text-[#9ca3af]">Jadilah yang pertama mencoba game ini!</p>
                </div>
              ) : (
                <>
                  {/* Peringkat 1 */}
                  {gameHistory.length > 0 && (
                    <div className="mb-6">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-[#ffd700] to-[#ffed4e] rounded-full flex items-center justify-center text-white text-xl font-bold">
                          1
                        </div>
                        <div className="text-sm text-[#6b7280]">PEMUNCULI TOP</div>
                      </div>
                      <div className="bg-gradient-to-r from-[#fff8e1] to-[#ffecb3] rounded-2xl p-6 border border-[#ffd54f]">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] rounded-full flex items-center justify-center text-white text-xl font-bold">
                              {gameHistory[0].playerName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-[#355485] text-lg">{gameHistory[0].playerName}</div>
                              <div className="text-sm text-[#6b7280]">{gameHistory[0].date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-[#355485]">{gameHistory[0].score}</div>
                            <div className="text-sm text-[#6b7280]">Poin</div>
                          </div>
                        </div>
                        <div className="text-center text-sm text-[#6b7280]">
                          {gameHistory[0].correctAnswers} dari {gameHistory[0].totalQuestions} soal benar
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Peringkat 2-5 */}
                  <div className="space-y-3">
                    {gameHistory.slice(1, 5).map((history, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-[#f8fafc] to-white rounded-xl border border-[#e5e7eb] hover:border-[#cbdde9] hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-[#c0c0c0] text-white' : index === 1 ? 'bg-[#cd7f32] text-white' : 'bg-[#e5e7eb] text-[#6b7280]'}`}>
                            {index + 2}
                          </div>
                          <div className="w-10 h-10 bg-gradient-to-r from-[#e3f2fd] to-[#bbdefb] rounded-full flex items-center justify-center text-[#355485] font-bold">
                            {history.playerName.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-[#355485]">{history.playerName}</div>
                            <div className="text-xs text-[#9ca3af]">{history.date}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${history.score >= 80 ? 'text-green-600' : history.score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                            {history.score}
                          </div>
                          <div className="text-xs text-[#9ca3af]">Poin</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tombol Aksi */}
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={handleStartGame}
                className="group relative overflow-hidden px-8 py-6 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white text-xl font-bold rounded-2xl hover:from-[#3a7bb5] hover:to-[#7aa8d1] transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-3xl"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">🎮</span>
                  <span>MULAI PERMAINAN</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={toggleFullscreen}
                className="group relative overflow-hidden px-8 py-6 bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-white text-xl font-bold rounded-2xl hover:from-[#ff6b47] hover:to-[#fea366] transition-all duration-300 transform hover:scale-[1.02] shadow-2xl hover:shadow-3xl"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">{isFullscreen ? '📱' : '📺'}</span>
                  <span>{isFullscreen ? 'KELUAR FULLSCREEN' : 'MODE FULLSCREEN'}</span>
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>

            {/* Statistik Game */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#355485] to-[#2a436c] rounded-2xl text-white">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1">10</div>
                  <div className="text-sm opacity-90">Total Soal</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">100</div>
                  <div className="text-sm opacity-90">Maksimal Poin</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">{gameHistory.length}</div>
                  <div className="text-sm opacity-90">Pemain</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan game berjalan (tetap sama seperti sebelumnya)
  if (gameStarted && !gameFinished) {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div ref={gameContainerRef} className="min-h-screen bg-gradient-to-br from-[#f0f7ff] to-[#e3f2fd] p-4">
        <div className="max-w-4xl mx-auto">
          {/* Game Header dengan Fullscreen Button */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-xl border border-[#e5e7eb]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold text-[#355485]">📊 Mengelompokkan Data</h1>
                <div className="text-[#6b7280]">Pemain: <span className="font-semibold text-[#355485]">{playerName}</span></div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={toggleFullscreen}
                  className="px-4 py-2 bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] text-[#355485] font-semibold rounded-lg border border-[#e5e7eb] hover:border-[#4f90c6] hover:text-[#4f90c6] transition-all duration-300 flex items-center gap-2"
                >
                  {isFullscreen ? '📱 Keluar Fullscreen' : '📱 Mode Fullscreen'}
                </button>
                <div className="text-center">
                  <div className="text-sm text-[#6b7280]">Skor</div>
                  <div className="text-2xl font-bold text-[#355485]">{score}</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-[#6b7280]">Soal</div>
                  <div className="text-2xl font-bold text-[#355485]">{currentQuestion + 1}/{questions.length}</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-[#6b7280] mb-2">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#e5e7eb] mb-6">
            {/* Question Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#4f90c6] to-[#90b6d5] rounded-xl flex items-center justify-center text-white text-2xl">
                {currentQuestion + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm text-[#4f90c6] font-semibold mb-2">SOAL {currentQuestion + 1}</div>
                <h2 className="text-xl font-bold text-[#355485] mb-3">{question.question}</h2>

                {/* Visual Data */}
                <div className="bg-gradient-to-r from-[#f8fafc] to-[#f0f7ff] rounded-xl p-4 mb-4">
                  <div className="text-center text-2xl mb-2">{question.image}</div>
                  <div className="text-center text-sm text-[#6b7280]">Data visual untuk dianalisis</div>
                </div>
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option) => {
                let buttonStyle = "bg-white border-2 border-[#e5e7eb] hover:border-[#4f90c6] text-[#355485]";

                if (selectedAnswer === option.id) {
                  buttonStyle = option.correct
                    ? "bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 text-green-700"
                    : "bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-400 text-red-700";
                } else if (selectedAnswer !== null && option.correct) {
                  buttonStyle = "bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 text-green-700";
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 rounded-xl text-left transition-all duration-300 ${buttonStyle} ${selectedAnswer === null ? 'hover:scale-[1.02] hover:shadow-md' : ''
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${selectedAnswer === option.id
                        ? option.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                        : 'bg-[#f0f7ff] text-[#355485]'
                        }`}>
                        {option.id}
                      </div>
                      <span className="font-medium">{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            {selectedAnswer !== null && (
              <div className={`mt-6 p-4 rounded-xl ${isCorrect
                ? 'bg-gradient-to-r from-green-50 to-green-100 border border-green-200'
                : 'bg-gradient-to-r from-red-50 to-red-100 border border-red-200'
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isCorrect ? '✅' : '❌'}
                  </div>
                  <div>
                    <div className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? 'Jawaban Benar!' : 'Jawaban Salah'}
                    </div>
                    <div className="text-sm text-[#6b7280] mt-1">
                      {isCorrect
                        ? `Kamu mendapatkan 10 poin! (+10)`
                        : 'Jawaban yang benar adalah: ' + question.options.find(o => o.correct)?.text}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Game Tips */}
          <div className="bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-2xl p-4 border border-[#cbdde9]">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💡</div>
              <div className="text-sm text-[#6b7280]">
                <span className="font-bold text-[#355485]">Tips:</span> Perhatikan diagram dengan seksama sebelum memilih jawaban!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan game selesai (tetap sama seperti sebelumnya)
  if (gameFinished) {
    const correctCount = answers.filter(a => a.correct).length;
    const accuracy = Math.round((correctCount / questions.length) * 100);

    return (
      <div ref={gameContainerRef} className="min-h-screen bg-gradient-to-br from-[#f0f7ff] to-[#e3f2fd] p-4">
        <div className="max-w-4xl mx-auto">
          {/* Result Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#4f90c6] to-[#90b6d5] rounded-full flex items-center justify-center text-white text-4xl">
              🏆
            </div>
            <h1 className="text-4xl font-bold text-[#355485] mb-2">Permainan Selesai!</h1>
            <p className="text-lg text-[#6b7280]">Hasil permainan untuk {playerName}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Result Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#e5e7eb]">
                {/* Score Summary */}
                <div className="text-center mb-8">
                  <div className={`text-6xl font-bold mb-4 ${score >= 80 ? 'text-green-500' :
                    score >= 60 ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                    {score}/100
                  </div>
                  <div className="text-xl font-bold text-[#355485] mb-2">Total Skor</div>
                  <p className="text-[#6b7280]">
                    Kamu menjawab {correctCount} dari {questions.length} soal dengan benar
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-700 mb-1">{correctCount}</div>
                    <div className="text-sm text-green-600">Jawaban Benar</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-red-700 mb-1">{questions.length - correctCount}</div>
                    <div className="text-sm text-red-600">Jawaban Salah</div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-700 mb-1">{accuracy}%</div>
                    <div className="text-sm text-blue-600">Akurasi</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-purple-700 mb-1">{questions.length}</div>
                    <div className="text-sm text-purple-600">Total Soal</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={restartGame}
                    className="px-6 py-4 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white font-semibold rounded-xl hover:from-[#3a7bb5] hover:to-[#7aa8d1] transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    🔄 Main Lagi
                  </button>
                  <button
                    onClick={() => {
                      setGameStarted(false);
                      setGameFinished(false);
                      setShowNameInput(false);
                      setCurrentQuestion(0);
                      setScore(0);
                      setSelectedAnswer(null);
                      setIsCorrect(null);
                      setAnswers([]);
                      if (isFullscreen) {
                        exitFullscreen();
                      }
                    }}
                    className="px-6 py-4 bg-white border-2 border-[#e5e7eb] text-[#355485] font-semibold rounded-xl hover:border-[#4f90c6] hover:text-[#4f90c6] transition-all duration-300"
                  >
                    📝 Ganti Nama
                  </button>
                </div>

                {/* Score Interpretation */}
                <div className="mt-8 p-4 bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-xl">
                  <h4 className="font-bold text-[#355485] mb-3">📊 Interpretasi Skor:</h4>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className={`text-center p-2 rounded ${score >= 80 ? 'bg-green-100 text-green-700 font-bold' : 'bg-gray-100 text-gray-500'}`}>
                      80-100: Hebat!
                    </div>
                    <div className={`text-center p-2 rounded ${score >= 60 && score < 80 ? 'bg-yellow-100 text-yellow-700 font-bold' : 'bg-gray-100 text-gray-500'}`}>
                      60-79: Bagus!
                    </div>
                    <div className={`text-center p-2 rounded ${score < 60 ? 'bg-red-100 text-red-700 font-bold' : 'bg-gray-100 text-gray-500'}`}>
                      &lt;60: Coba lagi!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* History & Ranking */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#e5e7eb] h-full">
                <h3 className="text-xl font-bold text-[#355485] mb-6 flex items-center gap-2">
                  <span>🏆</span> History Permainan Terbaru
                </h3>

                {/* Current Game Result */}
                <div className="mb-6 p-4 bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-xl border border-[#cbdde9]">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-[#355485]">{playerName} (Kamu)</div>
                    <div className={`px-3 py-1 rounded-full font-bold ${score >= 80 ? 'bg-green-100 text-green-700' : score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {score}
                    </div>
                  </div>
                  <div className="text-sm text-[#6b7280]">
                    {correctCount} dari {questions.length} soal benar • Sekarang
                  </div>
                </div>

                {/* Previous Games */}
                <div className="space-y-3">
                  {gameHistory.slice(1, 5).map((history, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white rounded-lg border border-[#e5e7eb] hover:border-[#cbdde9] transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-[#355485] text-sm">{history.playerName}</div>
                          <div className="text-xs text-[#9ca3af]">{history.date}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-bold ${history.score >= 80 ? 'bg-green-100 text-green-700' : history.score >= 60 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {history.score}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-[#355485] to-[#2a436c] rounded-xl text-white">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">🎯</div>
                    <div className="text-sm">
                      <div className="font-bold">Tips untuk Bermain Lagi</div>
                      <div className="opacity-90 mt-1">Perhatikan diagram dengan teliti sebelum memilih jawaban!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Game1;