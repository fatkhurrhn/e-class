import React, { useState, useEffect, useRef } from 'react';

export default function Game1() {
  const [playerName, setPlayerName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [gameMode, setGameMode] = useState('addition'); // 'addition' or 'subtraction'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameHistory, setGameHistory] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const gameContainerRef = useRef(null);

  // Emoji untuk buah dan hewan
  const fruitEmojis = ['🍎', '🍌', '🍊', '🍇', '🍓', '🍉', '🥭', '🍍', '🥝', '🍒'];
  const animalEmojis = ['🐱', '🐶', '🐰', '🐦', '🦋', '🐠', '🐼', '🦁', '🐯', '🐸'];
  const allEmojis = [...fruitEmojis, ...animalEmojis];

  // Sound effects yang hidup
  const playSound = (type) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    
    try {
      if (type === 'correct') {
        // Sound effect untuk jawaban benar - suara ceria
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Dua nada harmonis untuk efek lebih kaya
        oscillator1.frequency.value = 523.25; // C5
        oscillator2.frequency.value = 659.25; // E5
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
        
        oscillator1.start();
        oscillator2.start();
        oscillator1.stop(audioContext.currentTime + 0.6);
        oscillator2.stop(audioContext.currentTime + 0.6);
        
      } else if (type === 'wrong') {
        // Sound effect untuk jawaban salah - suara lembut
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Nada rendah yang tidak terlalu keras
        oscillator.frequency.value = 220; // A3
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4);
        
      } else if (type === 'click') {
        // Sound effect untuk klik biasa
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 440; // A4
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1);
      }
      
    } catch (e) {
      // Fallback silent jika audio tidak didukung
    }
  };

  // Fullscreen functionality
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (gameContainerRef.current?.requestFullscreen) {
        gameContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Generate questions
  useEffect(() => {
    const generateQuestions = () => {
      const newQuestions = [];
      
      for (let i = 0; i < 10; i++) {
        let num1, num2, correctAnswer;
        const emoji = allEmojis[i % allEmojis.length];
        
        if (gameMode === 'addition') {
          // PENJUMLAHAN: 11-20
          num1 = Math.floor(Math.random() * 10) + 11; // 11-20
          num2 = Math.floor(Math.random() * (20 - num1)) + 1; // 1 sampai (20-num1)
          correctAnswer = num1 + num2;
        } else {
          // PENGURANGAN: 11-20
          num1 = Math.floor(Math.random() * 10) + 11; // 11-20
          num2 = Math.floor(Math.random() * (num1 - 10)) + 1; // 1 sampai (num1-10)
          correctAnswer = num1 - num2;
        }
        
        // Generate wrong answers
        const wrongAnswers = [];
        while (wrongAnswers.length < 3) {
          let wrong;
          if (gameMode === 'addition') {
            wrong = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
          } else {
            wrong = correctAnswer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
          }
          
          if (wrong !== correctAnswer && !wrongAnswers.includes(wrong) && wrong >= 11 && wrong <= 20) {
            wrongAnswers.push(wrong);
          }
        }
        
        // Shuffle answers
        const allAnswers = [...wrongAnswers, correctAnswer]
          .sort(() => Math.random() - 0.5)
          .map((answer, index) => ({
            value: answer,
            letter: ['A', 'B', 'C', 'D'][index],
            isCorrect: answer === correctAnswer
          }));
        
        newQuestions.push({
          id: i + 1,
          num1,
          num2,
          correctAnswer,
          emoji,
          answers: allAnswers,
          userAnswer: null,
          isCorrect: false,
          mode: gameMode
        });
      }
      
      setQuestions(newQuestions);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setGameCompleted(false);
    };
    
    if (nameSubmitted) {
      generateQuestions();
    }
    
    // Load history
    const savedHistory = localStorage.getItem('mathGameHistory');
    if (savedHistory) {
      try {
        setGameHistory(JSON.parse(savedHistory));
      } catch (e) {}
    }
  }, [nameSubmitted, gameMode]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      playSound('click');
      setNameSubmitted(true);
    }
  };

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null || gameCompleted) return;
    
    playSound('click');
    setSelectedAnswer(answer);
    
    const updatedQuestions = [...questions];
    const currentQ = updatedQuestions[currentQuestion];
    currentQ.userAnswer = answer.value;
    currentQ.isCorrect = answer.isCorrect;
    
    if (answer.isCorrect) {
      // Play cheerful correct sound
      setTimeout(() => playSound('correct'), 100);
      setScore(prev => prev + 10);
    } else {
      // Play gentle wrong sound
      setTimeout(() => playSound('wrong'), 100);
    }
    
    setQuestions(updatedQuestions);
    
    setTimeout(() => {
      if (currentQuestion < 9) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setGameCompleted(true);
        const gameResult = {
          date: new Date().toISOString(),
          playerName,
          gameMode,
          score: answer.isCorrect ? score + 10 : score,
          totalQuestions: 10,
          questions: updatedQuestions
        };
        
        const updatedHistory = [gameResult, ...gameHistory.slice(0, 9)];
        setGameHistory(updatedHistory);
        try {
          localStorage.setItem('mathGameHistory', JSON.stringify(updatedHistory));
        } catch (e) {}
      }
    }, 1500);
  };

  const restartGame = () => {
    playSound('click');
    setNameSubmitted(false);
    setCurrentQuestion(0);
    setScore(0);
    setGameCompleted(false);
    setSelectedAnswer(null);
  };

  const switchMode = (mode) => {
    playSound('click');
    setGameMode(mode);
  };

  // Render visualization
  const renderVisualization = (question) => {
    const { num1, num2, emoji, mode } = question;
    
    if (mode === 'addition') {
      return (
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-[#2a436c] mb-4">
            Hitung total {emoji}:
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
            {/* First group */}
            <div className="flex flex-col items-center">
              <div className="text-sm text-[#4f90c6] mb-2">Kelompok 1</div>
              <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                {Array.from({ length: Math.min(num1, 10) }).map((_, i) => (
                  <div
                    key={i}
                    className="text-3xl animate-bounce"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {emoji}
                  </div>
                ))}
                {num1 > 10 && (
                  <div className="flex items-center justify-center text-sm font-bold text-[#355485]">
                    +{num1 - 10} lagi
                  </div>
                )}
              </div>
              <div className="mt-2 text-lg font-bold text-[#2a436c]">{num1} buah</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-[#355485] animate-pulse">
                +
              </div>
              <div className="text-sm text-[#6b7280] mt-1">tambah</div>
            </div>
            
            {/* Second group */}
            <div className="flex flex-col items-center">
              <div className="text-sm text-[#4f90c6] mb-2">Kelompok 2</div>
              <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                {Array.from({ length: Math.min(num2, 10) }).map((_, i) => (
                  <div
                    key={i}
                    className="text-3xl animate-bounce"
                    style={{ animationDelay: `${i * 0.05 + 0.2}s` }}
                  >
                    {emoji}
                  </div>
                ))}
                {num2 > 10 && (
                  <div className="flex items-center justify-center text-sm font-bold text-[#355485]">
                    +{num2 - 10} lagi
                  </div>
                )}
              </div>
              <div className="mt-2 text-lg font-bold text-[#4f90c6]">{num2} buah</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <div className="text-xl font-bold text-[#2a436c] mb-4">
            Hitung sisa {emoji}:
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
            {/* All items */}
            <div className="flex flex-col items-center">
              <div className="text-sm text-[#4f90c6] mb-2">Semua ada</div>
              <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                {Array.from({ length: Math.min(num1, 10) }).map((_, i) => (
                  <div
                    key={i}
                    className="text-3xl"
                  >
                    {emoji}
                  </div>
                ))}
                {num1 > 10 && (
                  <div className="flex items-center justify-center text-sm font-bold text-[#355485]">
                    +{num1 - 10} lagi
                  </div>
                )}
              </div>
              <div className="mt-2 text-lg font-bold text-[#2a436c]">{num1} buah</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-bold text-[#355485] animate-pulse">
                −
              </div>
              <div className="text-sm text-[#6b7280] mt-1">kurangi</div>
            </div>
            
            {/* Taken items */}
            <div className="flex flex-col items-center">
              <div className="text-sm text-[#4f90c6] mb-2">Diambil</div>
              <div className="flex flex-wrap justify-center gap-2 max-w-xs relative">
                {Array.from({ length: Math.min(num2, 10) }).map((_, i) => (
                  <div key={i} className="relative">
                    <div className="text-3xl opacity-50">
                      {emoji}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-red-500 text-lg">✕</div>
                    </div>
                  </div>
                ))}
                {num2 > 10 && (
                  <div className="flex items-center justify-center text-sm font-bold text-red-500">
                    -{num2 - 10} lagi
                  </div>
                )}
              </div>
              <div className="mt-2 text-lg font-bold text-red-500">{num2} buah</div>
            </div>
          </div>
        </div>
      );
    }
  };

  // Name Input Screen
  if (!nameSubmitted) {
    return (
      <div 
        ref={gameContainerRef}
        className="min-h-screen bg-gradient-to-br from-[#cbdde9] via-[#90b6d5] to-[#4f90c6] flex items-center justify-center p-4 relative"
      >
        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm border border-white/30 transition-all hover:scale-110"
          title={isFullscreen ? "Keluar Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? "⤢" : "⤡"}
        </button>

        {/* Sound Button */}
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            playSound('click');
          }}
          className="absolute top-4 left-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm border border-white/30 transition-all hover:scale-110"
          title={soundEnabled ? "Matikan Suara" : "Nyalakan Suara"}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full border-2 border-white/20">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-br from-[#4f90c6] to-[#355485] rounded-3xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="text-4xl">🍎</div>
                      <div className="text-4xl font-bold text-white">+</div>
                      <div className="text-4xl">🍌</div>
                      <div className="text-4xl font-bold text-white">=</div>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">?</span>
                      </div>
                    </div>
                    <div className="text-white/80 text-lg">Matematika Seru</div>
                  </div>
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-[#355485] mb-2">
              Game Matematika
            </h1>
            <p className="text-[#6b7280]">
              Belajar penjumlahan & pengurangan 11-20
            </p>
          </div>
          
          <form onSubmit={handleNameSubmit} className="space-y-6">
            <div>
              <label className="block text-[#355485] font-bold mb-2">
                👤 Nama Kamu
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#e5e7eb] focus:border-[#4f90c6] focus:outline-none transition-colors text-[#2a436c]"
                placeholder="Masukkan nama..."
                required
                maxLength={20}
              />
            </div>
            
            <div>
              <label className="block text-[#355485] font-bold mb-2">
                🎮 Pilih Mode
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setGameMode('addition')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${gameMode === 'addition' ? 'border-[#4f90c6] bg-[#cbdde9]' : 'border-[#e5e7eb] bg-white hover:bg-[#f9fafb]'}`}
                >
                  <div className="text-3xl mb-2">➕</div>
                  <div className="font-bold text-[#355485]">Penjumlahan</div>
                  <div className="text-xs text-[#6b7280] mt-1">11-20</div>
                </button>
                <button
                  type="button"
                  onClick={() => setGameMode('subtraction')}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center ${gameMode === 'subtraction' ? 'border-[#4f90c6] bg-[#cbdde9]' : 'border-[#e5e7eb] bg-white hover:bg-[#f9fafb]'}`}
                >
                  <div className="text-3xl mb-2">➖</div>
                  <div className="font-bold text-[#355485]">Pengurangan</div>
                  <div className="text-xs text-[#6b7280] mt-1">11-20</div>
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!playerName.trim()}
              onClick={() => playSound('click')}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center space-x-2 ${playerName.trim()
                ? 'bg-gradient-to-r from-[#4f90c6] to-[#355485] text-white hover:shadow-lg hover:scale-105 active:scale-95'
                : 'bg-[#e5e7eb] text-[#9ca3af] cursor-not-allowed'}`}
            >
              <span>🚀</span>
              <span>Mulai Bermain</span>
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-[#e5e7eb]/50">
            <h3 className="text-[#355485] font-bold mb-3">🎵 Fitur Game:</h3>
            <ul className="space-y-2 text-[#6b7280]">
              <li className="flex items-center">
                <span className="text-[#4f90c6] mr-2">•</span>
                <span>Suara ceria untuk jawaban benar</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#4f90c6] mr-2">•</span>
                <span>Suara lembut untuk jawaban salah</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#4f90c6] mr-2">•</span>
                <span>Dapat matikan suara kapan saja</span>
              </li>
              <li className="flex items-center">
                <span className="text-[#4f90c6] mr-2">•</span>
                <span>10 soal dengan animasi emoji</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-[#355485] text-xl animate-pulse">Menyiapkan soal... ⏳</div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer?.isCorrect;

  return (
    <div 
      ref={gameContainerRef}
      className="min-h-screen bg-[#f9fafb] p-4 md:p-8 relative"
    >
      {/* Control Buttons */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={toggleFullscreen}
          className="bg-[#4f90c6] hover:bg-[#355485] text-white p-3 rounded-full transition-all hover:scale-110 shadow-md"
          title={isFullscreen ? "Keluar Fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? "⤢" : "⤡"}
        </button>
        
        <button
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            playSound('click');
          }}
          className={`p-3 rounded-full transition-all hover:scale-110 shadow-md ${soundEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
          title={soundEnabled ? "Matikan Suara" : "Nyalakan Suara"}
        >
          {soundEnabled ? "🔊" : "🔇"}
        </button>
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md border border-[#e5e7eb] p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-left mb-4 md:mb-0">
              <div className="text-sm text-[#6b7280]">👤 Pemain</div>
              <div className="text-xl font-bold text-[#355485]">{playerName}</div>
            </div>
            
            <div className="text-center mb-4 md:mb-0">
              <div className="text-xl font-bold text-[#355485]">
                {gameMode === 'addition' ? '➕ Penjumlahan 11-20' : '➖ Pengurangan 11-20'}
              </div>
              <div className="text-[#6b7280]">Soal {currentQuestion + 1} dari 10</div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-[#6b7280]">🏆 Skor</div>
              <div className="text-3xl font-bold text-[#4f90c6]">{score}</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="h-2 bg-[#e5e7eb] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#4f90c6] to-[#355485] transition-all duration-500"
                style={{ width: `${((currentQuestion + (selectedAnswer ? 1 : 0)) / 10) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-[#6b7280] mt-1">
              <span>Soal {currentQuestion + 1}</span>
              <span>{score} poin</span>
            </div>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl p-1 border border-[#e5e7eb] inline-flex">
            <button
              onClick={() => {
                switchMode('addition');
                playSound('click');
              }}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${gameMode === 'addition' ? 'bg-[#4f90c6] text-white' : 'text-[#6b7280] hover:bg-[#f9fafb]'}`}
            >
              <span>➕</span>
              <span>Penjumlahan</span>
            </button>
            <button
              onClick={() => {
                switchMode('subtraction');
                playSound('click');
              }}
              className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${gameMode === 'subtraction' ? 'bg-[#4f90c6] text-white' : 'text-[#6b7280] hover:bg-[#f9fafb]'}`}
            >
              <span>➖</span>
              <span>Pengurangan</span>
            </button>
          </div>
        </div>

        {/* Game Area */}
        <div className={`bg-white rounded-3xl border border-[#e5e7eb] p-6 md:p-8 mb-8 shadow-lg transition-all duration-300 ${isCorrect ? 'border-green-400' : selectedAnswer && !isCorrect ? 'border-red-400' : ''}`}>
          
          {/* Question Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-[#cbdde9] to-[#90b6d5] px-6 py-2 rounded-full mb-4">
              <span className="text-white font-bold text-sm">
                Soal {currentQuestion + 1}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#355485] mb-2">
              {currentQ.mode === 'addition' 
                ? `Berapa totalnya?` 
                : `Berapa sisanya?`}
            </h2>
            <div className="text-5xl mb-4 animate-bounce">{currentQ.emoji}</div>
          </div>
          
          {/* Visualization */}
          <div className="bg-gradient-to-r from-[#f9fafb] to-[#cbdde9] rounded-2xl p-6 md:p-8 mb-8">
            {renderVisualization(currentQ)}
            
            {/* Math Expression */}
            <div className="text-center mt-8">
              <div className="inline-flex items-center justify-center space-x-4 bg-white/80 p-4 rounded-xl">
                <div className="text-4xl md:text-5xl font-bold text-[#2a436c]">
                  {currentQ.num1}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#355485] animate-pulse">
                  {currentQ.mode === 'addition' ? '+' : '−'}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#2a436c]">
                  {currentQ.num2}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#355485]">
                  =
                </div>
                <div className={`text-4xl md:text-5xl font-bold min-w-[60px] ${selectedAnswer ? 'text-[#4f90c6]' : 'text-[#2a436c]'}`}>
                  {selectedAnswer ? currentQ.correctAnswer : '?'}
                </div>
              </div>
              
              {/* Sound Indicator */}
              <div className="mt-4 text-sm text-[#6b7280] flex items-center justify-center">
                <span className="mr-2">{soundEnabled ? '🔊' : '🔇'}</span>
                <span>Suara {soundEnabled ? 'aktif' : 'nonaktif'}</span>
              </div>
            </div>
          </div>
          
          {/* Answer Options */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {currentQ.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                disabled={selectedAnswer !== null}
                className={`
                  p-4 rounded-xl text-left transition-all duration-300 border-2 transform
                  ${selectedAnswer === answer 
                    ? answer.isCorrect 
                      ? 'border-green-500 bg-green-50 scale-105 shadow-lg' 
                      : 'border-red-500 bg-red-50 scale-105 shadow-lg'
                    : 'border-[#e5e7eb] bg-white hover:border-[#4f90c6] hover:scale-102 hover:shadow-md'
                  }
                  ${!selectedAnswer ? 'active:scale-95' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold mr-3
                      ${selectedAnswer === answer 
                        ? answer.isCorrect 
                          ? 'bg-green-500 text-white animate-bounce' 
                          : 'bg-red-500 text-white animate-shake'
                        : 'bg-[#355485] text-white'
                      }
                    `}>
                      {answer.letter}
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#2a436c]">
                        {answer.value}
                      </div>
                      {selectedAnswer === answer && (
                        <div className={`text-xs font-bold ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {answer.isCorrect ? '✓ Benar!' : '✗ Salah'}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-2xl">
                    {currentQ.emoji}
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {/* Feedback */}
          {selectedAnswer && (
            <div className={`text-center p-4 rounded-2xl mb-6 border ${isCorrect 
              ? 'bg-green-50 border-green-200' 
              : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center justify-center space-x-4">
                <div className={`text-3xl ${isCorrect ? 'animate-bounce' : 'animate-pulse'}`}>
                  {isCorrect ? '🎉' : '😊'}
                </div>
                <div>
                  <div className={`text-xl font-bold mb-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                    {isCorrect 
                      ? `Hore! Benar!` 
                      : 'Coba lagi!'}
                  </div>
                  <p className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                    {currentQ.num1} {currentQ.mode === 'addition' ? '+' : '−'} {currentQ.num2} = {currentQ.correctAnswer}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        {gameHistory.length > 0 && !gameCompleted && (
          <div className="bg-white rounded-3xl border border-[#e5e7eb] p-6 mb-8 shadow-lg">
            <h3 className="text-xl font-bold text-[#355485] mb-4 flex items-center">
              <span className="mr-2">🏆</span>
              Papan Skor
            </h3>
            <div className="space-y-3">
              {gameHistory.slice(0, 3).map((game, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-xl border ${game.playerName === playerName && game.gameMode === gameMode 
                    ? 'border-[#4f90c6] bg-[#f0f7ff]' 
                    : 'border-[#e5e7eb] bg-[#f9fafb]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      'bg-orange-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-[#355485]">{game.playerName}</div>
                      <div className="text-xs text-[#6b7280]">
                        {game.gameMode === 'addition' ? '➕' : '➖'} • {new Date(game.date).toLocaleDateString('id-ID')}
                      </div>
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${
                    game.score >= 80 ? 'text-green-600' : 
                    game.score >= 60 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {game.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Game Completed Modal */}
        {gameCompleted && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full border-4 border-[#4f90c6] shadow-2xl">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  {score === 100 ? '👑' : score >= 80 ? '🏆' : score >= 60 ? '🎉' : '🌟'}
                </div>
                
                <h2 className="text-3xl font-bold text-[#355485] mb-2">
                  Permainan Selesai!
                </h2>
                <p className="text-[#6b7280] mb-6">
                  Hasil game {playerName}
                </p>
                
                <div className="bg-gradient-to-r from-[#cbdde9] to-[#90b6d5] rounded-2xl p-6 mb-6">
                  <div className="text-5xl font-bold text-[#355485] mb-1">
                    {score}/100
                  </div>
                  <div className="text-lg text-[#2a436c]">
                    {score === 100 ? '💯 Sempurna!' : 
                     score >= 80 ? '👍 Hebat!' :
                     score >= 60 ? '😊 Bagus!' :
                     '💪 Sudah bagus!'}
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={restartGame}
                    className="bg-gradient-to-r from-[#4f90c6] to-[#355485] text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all"
                  >
                    🔄 Main Lagi
                  </button>
                  <button
                    onClick={() => {
                      setNameSubmitted(false);
                      setGameCompleted(false);
                    }}
                    className="bg-white border-2 border-[#4f90c6] text-[#355485] font-bold py-3 px-6 rounded-xl hover:bg-[#f9fafb] transition-all"
                  >
                    👤 Ganti Nama
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}