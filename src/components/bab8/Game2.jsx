import React, { useState, useEffect } from 'react';

function Game2() {
  // State untuk game
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [history, setHistory] = useState([]);

  // Data piktogram untuk game
  const pictogramData = [
    {
      id: 1,
      title: "Buah Favorit di Kelas",
      description: "Diagram ini menunjukkan buah favorit siswa kelas 1",
      data: [
        { fruit: "🍎", count: 4, label: "Apel" },
        { fruit: "🍌", count: 5, label: "Pisang" },
        { fruit: "🍇", count: 3, label: "Anggur" },
        { fruit: "🍓", count: 6, label: "Strawberry" }
      ],
      questions: [
        {
          question: "Buah apa yang paling disukai?",
          options: ["Apel", "Pisang", "Anggur", "Strawberry"],
          correctAnswer: 3
        },
        {
          question: "Berapa banyak siswa yang menyukai apel?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1
        },
        {
          question: "Buah apa yang paling sedikit disukai?",
          options: ["Apel", "Pisang", "Anggur", "Strawberry"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 2,
      title: "Hewan Peliharaan Siswa",
      description: "Diagram ini menunjukkan hewan peliharaan siswa kelas 1",
      data: [
        { animal: "🐱", count: 2, label: "Kucing" },
        { animal: "🐶", count: 7, label: "Anjing" },
        { animal: "🐰", count: 4, label: "Kelinci" },
        { animal: "🐢", count: 1, label: "Kura-kura" }
      ],
      questions: [
        {
          question: "Hewan peliharaan apa yang paling banyak?",
          options: ["Kucing", "Anjing", "Kelinci", "Kura-kura"],
          correctAnswer: 1
        },
        {
          question: "Berapa jumlah siswa yang memelihara kura-kura?",
          options: ["1", "2", "3", "4"],
          correctAnswer: 0
        },
        {
          question: "Berapa total hewan peliharaan yang ada?",
          options: ["12", "13", "14", "15"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 3,
      title: "Warna Kesukaan",
      description: "Diagram ini menunjukkan warna favorit siswa kelas 1",
      data: [
        { color: "🔴", count: 5, label: "Merah" },
        { color: "🔵", count: 3, label: "Biru" },
        { color: "🟢", count: 4, label: "Hijau" },
        { color: "🟡", count: 6, label: "Kuning" }
      ],
      questions: [
        {
          question: "Warna apa yang paling sedikit disukai?",
          options: ["Merah", "Biru", "Hijau", "Kuning"],
          correctAnswer: 1
        },
        {
          question: "Berapa selisih antara warna kuning dan biru?",
          options: ["2", "3", "4", "5"],
          correctAnswer: 1
        },
        {
          question: "Jika digabung, berapa siswa yang suka merah dan hijau?",
          options: ["7", "8", "9", "10"],
          correctAnswer: 2
        }
      ]
    }
  ];

  // Load history dari localStorage saat komponen dimount
  useEffect(() => {
    const savedHistory = localStorage.getItem('pictogramGameHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Simpan history ke localStorage
  const saveToHistory = () => {
    const newEntry = {
      name: playerName,
      score: score,
      totalQuestions: pictogramData.reduce((total, pictogram) => total + pictogram.questions.length, 0),
      date: new Date().toLocaleDateString('id-ID'),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedHistory = [newEntry, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('pictogramGameHistory', JSON.stringify(updatedHistory));
  };

  // Memulai game
  const startGame = () => {
    if (playerName.trim() === '') {
      alert('Silakan masukkan nama kamu dulu!');
      return;
    }
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setGameCompleted(false);
  };

  // Memilih jawaban
  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback || gameCompleted) return;

    setSelectedAnswer(answerIndex);

    let questionCounter = 0;
    let currentPictogram = null;
    let currentQuestionData = null;

    for (const pictogram of pictogramData) {
      for (let i = 0; i < pictogram.questions.length; i++) {
        if (questionCounter === currentQuestion) {
          currentPictogram = pictogram;
          currentQuestionData = pictogram.questions[i];
          break;
        }
        questionCounter++;
      }
      if (currentPictogram) break;
    }

    const correct = answerIndex === currentQuestionData.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 10);
    }

    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setSelectedAnswer(null);

      const totalQuestions = pictogramData.reduce((total, pictogram) => total + pictogram.questions.length, 0);

      if (currentQuestion + 1 < totalQuestions) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameCompleted(true);
        saveToHistory();
      }
    }, 1500);
  };

  // Render pictogram
  const renderPictogram = () => {
    let questionCounter = 0;
    let currentPictogram = null;

    for (const pictogram of pictogramData) {
      for (let i = 0; i < pictogram.questions.length; i++) {
        if (questionCounter === currentQuestion) {
          currentPictogram = pictogram;
          break;
        }
        questionCounter++;
      }
      if (currentPictogram) break;
    }

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e5e7eb]">
        <h3 className="text-2xl font-bold text-[#355485] mb-3">{currentPictogram.title}</h3>
        <p className="text-[#6b7280] italic mb-6">{currentPictogram.description}</p>

        <div className="space-y-4">
          {currentPictogram.data.map((item, index) => (
            <div key={index} className="flex items-center bg-[#f9fafb] p-4 rounded-xl border-l-4 border-[#4f90c6]">
              <div className="flex items-center w-40">
                <span className="text-3xl mr-3">{item.fruit || item.animal || item.color}</span>
                <span className="font-semibold text-lg text-[#355485]">{item.label}</span>
              </div>

              <div className="flex flex-wrap gap-2 flex-1">
                {Array.from({ length: item.count }).map((_, i) => (
                  <div key={i} className="text-2xl animate-[pop-in_0.5s_ease-out]" style={{ animationDelay: `${i * 0.1}s` }}>
                    {item.fruit || item.animal || item.color}
                  </div>
                ))}
              </div>

              <div className="text-3xl font-bold text-[#355485] ml-4 min-w-10 text-center">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render pertanyaan
  const renderQuestion = () => {
    let questionCounter = 0;
    let currentPictogram = null;
    let currentQuestionData = null;

    for (const pictogram of pictogramData) {
      for (let i = 0; i < pictogram.questions.length; i++) {
        if (questionCounter === currentQuestion) {
          currentPictogram = pictogram;
          currentQuestionData = pictogram.questions[i];
          break;
        }
        questionCounter++;
      }
      if (currentPictogram) break;
    }

    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e5e7eb]">
        <h3 className="text-xl font-bold text-[#355485] mb-4">
          Pertanyaan {currentQuestion + 1}
        </h3>

        <p className="text-lg font-semibold text-gray-800 mb-6">
          {currentQuestionData.question}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {currentQuestionData.options.map((option, index) => (
            <button
              key={index}
              className={`
                p-4 text-lg font-semibold rounded-xl transition-all duration-300
                ${selectedAnswer === index
                  ? isCorrect
                    ? 'bg-green-100 border-2 border-green-500 text-green-800 transform scale-105'
                    : 'bg-red-100 border-2 border-red-500 text-red-800 transform scale-105'
                  : 'bg-[#f9fafb] border-2 border-[#cbdde9] text-[#355485] hover:bg-[#e6f2ff] hover:border-[#4f90c6] hover:transform hover:scale-[1.02]'
                }
              `}
              onClick={() => handleAnswerSelect(index)}
              disabled={showFeedback || gameCompleted}
            >
              {option}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-xl text-center font-bold text-lg animate-[fade-in_0.5s] ${isCorrect
              ? 'bg-green-100 border-2 border-green-500 text-green-800'
              : 'bg-red-100 border-2 border-red-500 text-red-800'
            }`}>
            {isCorrect ? "🎉 Benar! Kamu hebat!" : "😞 Jawaban salah, coba lagi!"}
          </div>
        )}
      </div>
    );
  };

  // Render layar awal
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-[#f9fafb] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#355485] mb-3">
              🎮 Game Membaca Piktogram
            </h1>
            <p className="text-lg text-[#6b7280]">
              Belajar membaca diagram gambar untuk siswa kelas 1
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Instruksi dan input nama */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#e5e7eb]">
                <h2 className="text-2xl font-bold text-[#355485] mb-6 pb-3 border-b-2 border-[#4f90c6]">
                  Cara Bermain:
                </h2>

                <ol className="space-y-3 mb-8">
                  {[
                    "Lihat diagram piktogram yang ditampilkan",
                    "Baca pertanyaan dengan teliti",
                    "Pilih jawaban yang benar berdasarkan diagram",
                    "Dapatkan skor untuk setiap jawaban benar",
                    "Selesaikan semua pertanyaan untuk melihat hasil akhir"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-[#4f90c6] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ol>

                <div className="mb-8">
                  <label htmlFor="playerName" className="block text-lg font-semibold text-[#355485] mb-3">
                    Masukkan Nama Kamu:
                  </label>
                  <input
                    type="text"
                    id="playerName"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Contoh: Budi"
                    className="w-full p-4 border-3 border-[#4f90c6] rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-[#4f90c6] focus:border-transparent"
                  />
                </div>

                <button
                  onClick={startGame}
                  className="w-full py-4 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white text-xl font-bold rounded-xl hover:from-[#355485] hover:to-[#4f90c6] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                >
                  Mulai Game 🚀
                </button>
              </div>
            </div>

            {/* Riwayat skor */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e5e7eb]">
                <h3 className="text-xl font-bold text-[#355485] mb-6 text-center">
                  🏆 5 Skor Terbaru
                </h3>

                {history.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#355485] text-white">
                          <th className="p-3 text-left rounded-tl-lg">Nama</th>
                          <th className="p-3 text-left">Skor</th>
                          <th className="p-3 text-left rounded-tr-lg">Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((entry, index) => (
                          <tr
                            key={index}
                            className={`border-b border-[#e5e7eb] ${index % 2 === 0 ? 'bg-[#f9fafb]' : 'bg-white'}`}
                          >
                            <td className="p-3 font-medium text-[#355485]">{entry.name}</td>
                            <td className="p-3 font-bold text-[#4f90c6]">
                              {entry.score}/{entry.totalQuestions * 10}
                            </td>
                            <td className="p-3 text-sm text-[#6b7280]">
                              {entry.date} {entry.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#9ca3af]">
                    Belum ada riwayat skor
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render game
  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header game */}
        <div className="bg-gradient-to-r from-[#355485] to-[#4f90c6] rounded-2xl p-6 mb-8 text-white shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            🎮 Game Membaca Piktogram
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-center bg-white/20 p-4 rounded-xl">
            <div className="mb-3 md:mb-0">
              <span className="font-semibold">Pemain: </span>
              <span className="bg-white text-[#355485] px-3 py-1 rounded-full font-bold">
                {playerName}
              </span>
            </div>

            <div className="mb-3 md:mb-0">
              <span className="font-semibold">Skor: </span>
              <span className="bg-white text-[#355485] px-3 py-1 rounded-full font-bold">
                {score}
              </span>
            </div>

            <div>
              <span className="font-semibold">Pertanyaan: </span>
              <span className="bg-white text-[#355485] px-3 py-1 rounded-full font-bold">
                {currentQuestion + 1} / {pictogramData.reduce((total, pictogram) => total + pictogram.questions.length, 0)}
              </span>
            </div>
          </div>
        </div>

        {!gameCompleted ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Panel kiri: Piktogram */}
            <div className="lg:w-1/2">
              {renderPictogram()}
            </div>

            {/* Panel kanan: Pertanyaan */}
            <div className="lg:w-1/2">
              {renderQuestion()}

              {/* Tips */}
              <div className="mt-6 bg-gradient-to-r from-[#fff9db] to-[#fef3c7] border-2 border-dashed border-[#fbbf24] p-4 rounded-xl">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💡</span>
                  <div>
                    <p className="font-bold text-[#92400e] mb-1">Tips:</p>
                    <p className="text-[#92400e]">
                      Hitung jumlah simbol di diagram untuk menjawab pertanyaan!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Hasil akhir */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#e5e7eb] text-center">
                <h2 className="text-3xl font-bold text-[#355485] mb-4">
                  Selamat {playerName}! 🎉
                </h2>

                <p className="text-lg text-[#6b7280] mb-8">
                  Kamu telah menyelesaikan game membaca piktogram
                </p>

                <div className="text-4xl font-bold text-[#4f90c6] mb-8">
                  <span className="text-5xl text-[#355485]">{score}</span> / {pictogramData.reduce((total, pictogram) => total + pictogram.questions.length, 0) * 10}
                </div>

                <div className={`p-6 rounded-xl text-xl font-bold mb-8 ${score >= 70
                    ? 'bg-green-100 text-green-800 border-2 border-green-500'
                    : score >= 50
                      ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-500'
                      : 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                  }`}>
                  {score >= 70
                    ? "Kamu sangat hebat dalam membaca diagram! 🏆"
                    : score >= 50
                      ? "Kamu sudah cukup baik, tetap berlatih ya! 👍"
                      : "Terus berlatih, pasti bisa lebih baik! 💪"
                  }
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setGameStarted(false);
                      setPlayerName('');
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white text-lg font-bold rounded-xl hover:from-[#355485] hover:to-[#4f90c6] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Main Lagi 🔄
                  </button>

                  <button
                    onClick={() => {
                      setGameStarted(false);
                    }}
                    className="px-8 py-4 bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] text-white text-lg font-bold rounded-xl hover:from-[#e53e3e] hover:to-[#fbb6b9] transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Ke Menu Utama 🏠
                  </button>
                </div>
              </div>
            </div>

            {/* Riwayat skor */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e5e7eb]">
                <h3 className="text-xl font-bold text-[#355485] mb-6 text-center">
                  🏆 5 Skor Terbaru
                </h3>

                {history.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#355485] text-white">
                          <th className="p-3 text-left rounded-tl-lg">Nama</th>
                          <th className="p-3 text-left">Skor</th>
                          <th className="p-3 text-left rounded-tr-lg">Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history.map((entry, index) => (
                          <tr
                            key={index}
                            className={`border-b border-[#e5e7eb] ${index % 2 === 0 ? 'bg-[#f9fafb]' : 'bg-white'}`}
                          >
                            <td className="p-3 font-medium text-[#355485]">{entry.name}</td>
                            <td className="p-3 font-bold text-[#4f90c6]">
                              {entry.score}/{entry.totalQuestions * 10}
                            </td>
                            <td className="p-3 text-sm text-[#6b7280]">
                              {entry.date} {entry.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#9ca3af]">
                    Belum ada riwayat skor
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS inline untuk animasi */}
      <style jsx>{`
        @keyframes pop-in {
          0% { transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Game2;