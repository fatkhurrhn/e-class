import React, { useState, useEffect, useRef } from 'react';

export default function Game1() {
  // State untuk game
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  
  // Data soal pengurangan (10 soal dengan item yang sama per soal)
  const questions = [
    { 
      id: 1, 
      num1: 10, 
      num2: 3, 
      correctAnswer: 7, 
      theme: 'fruit', 
      item: '🍎', 
      name: 'Apel' 
    },
    { 
      id: 2, 
      num1: 9, 
      num2: 4, 
      correctAnswer: 5, 
      theme: 'animal', 
      item: '🐱', 
      name: 'Kucing' 
    },
    { 
      id: 3, 
      num1: 8, 
      num2: 2, 
      correctAnswer: 6, 
      theme: 'fruit', 
      item: '🍌', 
      name: 'Pisang' 
    },
    { 
      id: 4, 
      num1: 7, 
      num2: 5, 
      correctAnswer: 2, 
      theme: 'animal', 
      item: '🐶', 
      name: 'Anjing' 
    },
    { 
      id: 5, 
      num1: 10, 
      num2: 7, 
      correctAnswer: 3, 
      theme: 'fruit', 
      item: '🍇', 
      name: 'Anggur' 
    },
    { 
      id: 6, 
      num1: 9, 
      num2: 6, 
      correctAnswer: 3, 
      theme: 'animal', 
      item: '🐰', 
      name: 'Kelinci' 
    },
    { 
      id: 7, 
      num1: 8, 
      num2: 8, 
      correctAnswer: 0, 
      theme: 'fruit', 
      item: '🍓', 
      name: 'Stroberi' 
    },
    { 
      id: 8, 
      num1: 10, 
      num2: 1, 
      correctAnswer: 9, 
      theme: 'animal', 
      item: '🐵', 
      name: 'Monyet' 
    },
    { 
      id: 9, 
      num1: 6, 
      num2: 3, 
      correctAnswer: 3, 
      theme: 'fruit', 
      item: '🍊', 
      name: 'Jeruk' 
    },
    { 
      id: 10, 
      num1: 7, 
      num2: 2, 
      correctAnswer: 5, 
      theme: 'animal', 
      item: '🐻', 
      name: 'Beruang' 
    }
  ];
  
  // Generate pilihan jawaban untuk setiap soal
  const generateAnswers = (correctAnswer) => {
    const answers = [correctAnswer];
    
    while (answers.length < 4) {
      let wrongAnswer;
      do {
        wrongAnswer = Math.floor(Math.random() * 11);
      } while (answers.includes(wrongAnswer) || wrongAnswer < 0);
      
      answers.push(wrongAnswer);
    }
    
    return answers.sort(() => Math.random() - 0.5);
  };
  
  // State untuk jawaban setiap soal
  const [answers, setAnswers] = useState(
    questions.map(q => generateAnswers(q.correctAnswer))
  );
  
  // Audio untuk benar dan salah
  const playCorrectSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Nada naik untuk benar
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(659.25, audioContext.currentTime + 0.3); // E5
    
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };
  
  const playWrongSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Nada turun untuk salah
    oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime); // G4
    oscillator.frequency.exponentialRampToValueAtTime(293.66, audioContext.currentTime + 0.3); // D4
    
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  };
  
  // Fungsi untuk memulai game
  const startGame = () => {
    if (!playerName.trim()) {
      alert('Silakan masukkan nama Anda terlebih dahulu!');
      return;
    }
    setGameStarted(true);
  };
  
  // Fungsi untuk animasi pengurangan
  const animateSubtraction = (numToSubtract) => {
    const newAnimatedItems = [];
    for (let i = 0; i < numToSubtract; i++) {
      newAnimatedItems.push({
        id: i,
        item: questions[currentQuestion].item,
        startX: 50 + (i % 5) * 60,
        startY: 100,
        endX: Math.random() * 100 - 50,
        endY: -100,
        scale: 1
      });
    }
    setAnimatedItems(newAnimatedItems);
    
    // Hapus animasi setelah selesai
    setTimeout(() => {
      setAnimatedItems([]);
    }, 1000);
  };
  
  // Fungsi untuk memilih jawaban
  const handleAnswerSelect = (answer) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    
    const isAnswerCorrect = answer === questions[currentQuestion].correctAnswer;
    setIsCorrect(isAnswerCorrect);
    
    // Tampilkan jawaban yang benar setelah delay singkat
    setTimeout(() => {
      setShowCorrectAnswer(true);
    }, 500);
    
    // Animasi pengurangan jika jawaban benar
    if (isAnswerCorrect) {
      setScore(score + 10);
      playCorrectSound();
      animateSubtraction(questions[currentQuestion].num2);
    } else {
      playWrongSound();
    }
    
    // Lanjut ke soal berikutnya setelah delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowCorrectAnswer(false);
      } else {
        finishGame();
      }
    }, 2000);
  };
  
  // Fungsi untuk menyelesaikan game dan menyimpan history
  const finishGame = () => {
    setGameFinished(true);
    
    const history = JSON.parse(localStorage.getItem('subtractionGameHistory')) || [];
    
    const gameResult = {
      name: playerName,
      score: score,
      date: new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    const newHistory = [gameResult, ...history].slice(0, 10);
    localStorage.setItem('subtractionGameHistory', JSON.stringify(newHistory));
  };
  
  // Fungsi untuk mengulang game
  const restartGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setAnimatedItems([]);
    setShowCorrectAnswer(false);
    setAnswers(questions.map(q => generateAnswers(q.correctAnswer)));
  };
  
  // Ref untuk game container (untuk fullscreen)
  const gameContainerRef = useRef(null);
  
  // Fungsi untuk toggle fullscreen hanya untuk game container
  const toggleFullscreen = () => {
    const element = gameContainerRef.current;
    
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
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
  
  // Ambil history untuk ditampilkan
  const gameHistory = JSON.parse(localStorage.getItem('subtractionGameHistory')) || [];
  
  // Render visual soal dengan item yang sama
  const renderQuestionVisual = (question) => {
    const { num1, num2, item, name, theme } = question;
    
    return (
      <div className="relative">
        {/* Area Animasi */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          {animatedItems.map((anim) => (
            <div
              key={anim.id}
              className="absolute text-4xl transition-all duration-1000 ease-out"
              style={{
                left: `${anim.startX}%`,
                top: `${anim.startY}px`,
                transform: `translate(${anim.endX}px, ${anim.endY}px) scale(${anim.scale})`,
                opacity: 0.7
              }}
            >
              {anim.item}
            </div>
          ))}
        </div>
        
        {/* Question Container */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#2a436c' }}>
              {name} ada {num1}, dikurangi {num2}
            </h3>
            <p className="text-lg mb-4" style={{ color: '#6b7280' }}>
              Berapa sisa {theme === 'fruit' ? 'buah' : 'hewan'} {name.toLowerCase()}?
            </p>
          </div>
          
          {/* Visual Items */}
          <div className="mb-8">
            {/* Semua Item */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {Array.from({ length: num1 }).map((_, index) => {
                const isSubtracted = index < num2;
                return (
                  <div
                    key={index}
                    className={`text-5xl transform transition-all duration-500 ${
                      isSubtracted ? 'opacity-40 scale-75' : 'hover:scale-110'
                    } ${selectedAnswer === questions[currentQuestion].correctAnswer && isSubtracted ? 'animate-fly-away' : ''}`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                  >
                    {item}
                    {isSubtracted && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl text-red-500">✕</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Equation */}
            <div className="text-4xl font-bold my-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 inline-block">
              <span style={{ color: '#355485' }}>{num1}</span>
              <span className="mx-4" style={{ color: '#ef4444' }}>−</span>
              <span style={{ color: '#355485' }}>{num2}</span>
              <span className="mx-4" style={{ color: '#4f90c6' }}>=</span>
              <span className="px-4 py-2 rounded-lg" style={{ 
                backgroundColor: '#cbdde9',
                color: '#2a436c'
              }}>
                ?
              </span>
            </div>
            
            {/* Counter */}
            <div className="flex justify-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#4f90c6' }}>{num1}</div>
                <div className="text-sm" style={{ color: '#6b7280' }}>Awal</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>{num2}</div>
                <div className="text-sm" style={{ color: '#6b7280' }}>Dikurangi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: '#10b981' }}>
                  {showCorrectAnswer ? (num1 - num2) : '?'}
                </div>
                <div className="text-sm" style={{ color: '#6b7280' }}>Sisa</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Animasi CSS
  const styleSheet = `
    @keyframes flyAway {
      0% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      50% {
        transform: translateY(-20px) scale(1.2);
        opacity: 0.7;
      }
      100% {
        transform: translateY(-100px) scale(0.5);
        opacity: 0;
      }
    }
    
    @keyframes bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-20px);
      }
    }
    
    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-10px);
      }
      75% {
        transform: translateX(10px);
      }
    }
    
    @keyframes pulse-glow {
      0%, 100% {
        box-shadow: 0 0 5px rgba(79, 144, 198, 0.5);
      }
      50% {
        box-shadow: 0 0 20px rgba(79, 144, 198, 0.8);
      }
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-10px) rotate(5deg);
      }
    }
    
    @keyframes reveal {
      0% {
        opacity: 0;
        transform: scale(0.5);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    
    .animate-fly-away {
      animation: flyAway 1s ease-out forwards;
    }
    
    .animate-bounce {
      animation: bounce 0.5s ease infinite;
    }
    
    .animate-shake {
      animation: shake 0.5s ease-in-out;
    }
    
    .animate-pulse-glow {
      animation: pulse-glow 2s ease-in-out infinite;
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-reveal {
      animation: reveal 0.5s ease-out forwards;
    }
  `;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-300 relative"
      style={{ backgroundColor: '#f9fafb' }}
    >
      {/* CSS Animations */}
      <style>{styleSheet}</style>
      
      {/* Header */}
      <div className="w-full max-w-4xl mb-8 text-center">
        <h1 
          className="text-4xl font-bold mb-2 animate-float"
          style={{ color: '#355485' }}
        >
          🧮 Game Pengurangan sampai 10
        </h1>
        <p className="text-lg" style={{ color: '#6b7280' }}>
          Belajar pengurangan dengan {questions[currentQuestion]?.theme === 'fruit' ? 'buah' : 'hewan'} yang sama per soal!
        </p>
      </div>
      
      {/* Game Container (untuk fullscreen) */}
      <div 
        ref={gameContainerRef}
        className="w-full max-w-4xl rounded-2xl shadow-xl p-6 mb-8 transition-all duration-300 relative"
        style={{ 
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          minHeight: '600px'
        }}
      >
        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="absolute top-4 right-4 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 z-10 flex items-center gap-2"
          style={{ 
            backgroundColor: '#4f90c6',
            color: '#ffffff',
            border: '2px solid #2a436c'
          }}
        >
          {isFullscreen ? '⤢ Keluar Fullscreen' : '⤢ Fullscreen'}
        </button>
        
        {!gameStarted ? (
          // Input Nama dan Start Screen
          <div className="text-center py-10">
            <div className="mb-8">
              <div className="flex justify-center gap-6 mb-6">
                {['🍎', '🐱', '🍌', '🐶', '🍇'].map((emoji, idx) => (
                  <div 
                    key={idx}
                    className="text-6xl animate-float"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              
              <h2 
                className="text-3xl font-bold mb-6"
                style={{ color: '#2a436c' }}
              >
                Selamat Datang! 🎪
              </h2>
              
              <p className="text-xl mb-8" style={{ color: '#6b7280' }}>
                Siap untuk petualangan matematika yang seru?
              </p>
            </div>
            
            <div className="max-w-md mx-auto">
              <div className="relative mb-8">
                <div className="text-left mb-2" style={{ color: '#4f90c6' }}>
                  💬 Masukkan nama kamu:
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Nama pemain..."
                    className="w-full px-6 py-4 text-xl rounded-xl pl-12 focus:outline-none focus:ring-3 transition-all animate-pulse-glow"
                    style={{ 
                      border: '3px solid #cbdde9',
                      color: '#2a436c',
                      backgroundColor: '#f9fafb'
                    }}
                  />
                  <span 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl"
                    style={{ color: '#4f90c6' }}
                  >
                    ✏️
                  </span>
                </div>
              </div>
              
              <button
                onClick={startGame}
                className="px-10 py-5 text-xl font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden group mb-8"
                style={{ 
                  backgroundColor: '#355485',
                  color: '#ffffff',
                  boxShadow: '0 4px 15px rgba(53, 84, 133, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🚀 Mulai Petualangan!
                </span>
                <div 
                  className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                  }}
                />
              </button>
              
              {/* Game Rules */}
              <div 
                className="p-5 rounded-xl border-2 border-dashed mb-6"
                style={{ 
                  backgroundColor: '#f0f7ff',
                  borderColor: '#90b6d5'
                }}
              >
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: '#2a436c' }}>
                  📘 Aturan Permainan
                </h3>
                <div className="space-y-2 text-left">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span style={{ color: '#6b7280' }}>Setiap soal punya {questions[0].theme === 'fruit' ? 'buah' : 'hewan'} yang sama</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span style={{ color: '#6b7280' }}>Jawab benar = +10 poin</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span style={{ color: '#6b7280' }}>Lihat {questions[0].theme === 'fruit' ? 'buah' : 'hewan'} terbang saat jawaban benar!</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    <span style={{ color: '#6b7280' }}>Total 10 soal yang menyenangkan</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* History Section */}
            {gameHistory.length > 0 && (
              <div className="mt-12">
                <h3 
                  className="text-2xl font-bold mb-6 flex items-center justify-center gap-2"
                  style={{ color: '#2a436c' }}
                >
                  🏆 Hall of Fame
                </h3>
                <div className="max-w-2xl mx-auto">
                  {gameHistory.slice(0, 5).map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl mb-3 transition-all duration-300 hover:scale-[1.02]"
                      style={{ 
                        backgroundColor: index === 0 ? '#ffd700' : 
                                       index === 1 ? '#c0c0c0' : 
                                       index === 2 ? '#cd7f32' : '#ffffff',
                        border: '2px solid',
                        borderColor: index === 0 ? '#ffd700' : 
                                   index === 1 ? '#c0c0c0' : 
                                   index === 2 ? '#cd7f32' : '#cbdde9',
                        transform: index < 3 ? 'translateY(0)' : 'none'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-2xl">
                          {index === 0 ? '🥇' : 
                           index === 1 ? '🥈' : 
                           index === 2 ? '🥉' : 
                           `#${index + 1}`}
                        </div>
                        <div>
                          <div className="font-bold text-lg" style={{ 
                            color: index < 3 ? '#2a436c' : '#4f90c6' 
                          }}>
                            {item.name}
                          </div>
                          <div className="text-sm" style={{ 
                            color: index < 3 ? 'rgba(42, 67, 108, 0.8)' : '#6b7280' 
                          }}>
                            {item.date}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold" style={{ 
                        color: index < 3 ? '#2a436c' : '#355485' 
                      }}>
                        {item.score}
                        <span className="text-sm ml-1" style={{ 
                          color: index < 3 ? 'rgba(42, 67, 108, 0.6)' : '#9ca3af' 
                        }}>
                          poin
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : !gameFinished ? (
          // Game Screen
          <div>
            {/* Game Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <div 
                    className="text-3xl animate-bounce"
                    style={{ animationDuration: '2s' }}
                  >
                    {questions[currentQuestion].item}
                  </div>
                  <div>
                    <h2 
                      className="text-2xl font-bold"
                      style={{ color: '#2a436c' }}
                    >
                      Hai, <span style={{ color: '#4f90c6' }}>{playerName}</span>!
                    </h2>
                    <div className="flex items-center gap-3 mt-1">
                      <div 
                        className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                        style={{ 
                          backgroundColor: questions[currentQuestion].theme === 'fruit' ? '#fee2e2' : '#dcfce7',
                          color: questions[currentQuestion].theme === 'fruit' ? '#dc2626' : '#16a34a'
                        }}
                      >
                        <span>
                          {questions[currentQuestion].theme === 'fruit' ? '🍎' : '🐾'}
                        </span>
                        {questions[currentQuestion].name}
                      </div>
                      <span style={{ color: '#6b7280' }}>
                        Soal {currentQuestion + 1}/{questions.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end gap-3">
                  <div className="text-right">
                    <div className="text-sm" style={{ color: '#6b7280' }}>Skor Kamu</div>
                    <div 
                      className="text-4xl font-bold px-4 py-2 rounded-lg animate-pulse-glow"
                      style={{ 
                        backgroundColor: '#355485',
                        color: '#ffffff',
                        boxShadow: '0 4px 15px rgba(53, 84, 133, 0.3)'
                      }}
                    >
                      {score}
                    </div>
                  </div>
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
                    style={{ 
                      backgroundColor: '#cbdde9',
                      color: '#355485'
                    }}
                  >
                    {Math.round((score / (questions.length * 10)) * 100)}%
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#4f90c6' }} />
                  <span style={{ color: '#6b7280' }}>Progres Petualangan</span>
                </div>
                <span className="font-bold" style={{ color: '#4f90c6' }}>
                  {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                </span>
              </div>
              <div className="relative h-6 rounded-full overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
                <div 
                  className="h-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                    background: `linear-gradient(90deg, #4f90c6, #90b6d5)`,
                    position: 'relative'
                  }}
                >
                  <div 
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full"
                    style={{ 
                      backgroundColor: '#ffffff',
                      border: '3px solid #4f90c6'
                    }}
                  />
                </div>
                {/* Progress Markers */}
                <div className="absolute inset-0 flex">
                  {[...Array(questions.length + 1)].map((_, i) => (
                    <div 
                      key={i}
                      className="h-full flex items-center justify-center"
                      style={{ width: `${100/questions.length}%` }}
                    >
                      {i <= currentQuestion && i > 0 && (
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: '#ffffff' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Question */}
            <div className="mb-10">
              {/* Question Visual dengan Animasi */}
              {renderQuestionVisual(questions[currentQuestion])}
              
              {/* Feedback dengan Animasi */}
              {isCorrect !== null && (
                <div 
                  className={`text-2xl font-bold mb-8 p-5 rounded-xl text-center transition-all duration-500 ${
                    isCorrect ? 'animate-bounce' : 'animate-shake'
                  }`}
                  style={{ 
                    backgroundColor: isCorrect ? 'rgba(220, 252, 231, 0.9)' : 'rgba(254, 226, 226, 0.9)',
                    color: isCorrect ? '#16a34a' : '#dc2626',
                    border: `3px solid ${isCorrect ? '#86efac' : '#fca5a5'}`,
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                  }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">
                      {isCorrect ? '🎉' : '😢'}
                    </span>
                    <div>
                      {isCorrect ? (
                        <>
                          <div className="font-bold">BENAR SEKALI!</div>
                          <div className="text-lg mt-1">+10 poin • Total: {score} poin</div>
                        </>
                      ) : (
                        <>
                          <div className="font-bold">COBA LAGI!</div>
                          <div className="text-lg mt-1">
                            Jawaban yang benar adalah {questions[currentQuestion].correctAnswer}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Answer Options dengan Animasi */}
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {answers[currentQuestion].map((answer, index) => {
                  const letters = ['A', 'B', 'C', 'D'];
                  const isCorrectAnswer = answer === questions[currentQuestion].correctAnswer;
                  const isSelected = selectedAnswer === answer;
                  
                  let bgColor = '#f9fafb';
                  let textColor = '#2a436c';
                  let borderColor = '#cbdde9';
                  let letterBgColor = '#4f90c6';
                  
                  if (selectedAnswer !== null) {
                    if (isSelected) {
                      if (isCorrectAnswer) {
                        bgColor = '#dcfce7';
                        textColor = '#16a34a';
                        borderColor = '#86efac';
                        letterBgColor = '#16a34a';
                      } else {
                        bgColor = '#fee2e2';
                        textColor = '#dc2626';
                        borderColor = '#fca5a5';
                        letterBgColor = '#dc2626';
                      }
                    } else if (isCorrectAnswer && showCorrectAnswer) {
                      bgColor = '#dcfce7';
                      textColor = '#16a34a';
                      borderColor = '#86efac';
                      letterBgColor = '#16a34a';
                    }
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(answer)}
                      disabled={selectedAnswer !== null}
                      className={`py-5 rounded-xl text-2xl font-bold transition-all duration-300 ${
                        selectedAnswer === null ? 'hover:scale-105 hover:shadow-lg' : ''
                      } relative overflow-hidden group`}
                      style={{
                        backgroundColor: bgColor,
                        color: textColor,
                        border: `3px solid ${borderColor}`,
                        transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                      {/* Glow effect for correct answer after selection */}
                      {selectedAnswer !== null && isCorrectAnswer && showCorrectAnswer && (
                        <div 
                          className="absolute inset-0 rounded-xl animate-pulse-glow"
                          style={{ 
                            boxShadow: '0 0 20px rgba(22, 163, 74, 0.5)',
                            zIndex: 1
                          }}
                        />
                      )}
                      
                      <div className="relative z-10 flex items-center">
                        <div 
                          className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold mr-4 transition-all duration-300"
                          style={{ 
                            backgroundColor: letterBgColor,
                            color: '#ffffff',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                          }}
                        >
                          {letters[index]}
                        </div>
                        
                        <div className="text-left">
                          <div className="text-3xl font-bold">{answer}</div>
                          {selectedAnswer === answer && (
                            <div className="text-sm mt-1">
                              {isCorrectAnswer ? '✓ Jawaban benar!' : '✗ Jawaban salah'}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Selection Indicator */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 text-2xl">
                          {isCorrectAnswer ? '✅' : '❌'}
                        </div>
                      )}
                      
                      {/* Correct Answer Indicator (shown after reveal) */}
                      {!isSelected && isCorrectAnswer && showCorrectAnswer && (
                        <div className="absolute top-2 right-2 text-2xl animate-reveal">
                          ✅
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              
              {/* Hint dengan Animasi */}
              <div className="mt-8 text-center">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full animate-float"
                  style={{ 
                    backgroundColor: '#f0f7ff',
                    color: '#4f90c6'
                  }}
                >
                  <span className="text-xl">💡</span>
                  <span>Hitung {questions[currentQuestion].name} yang tersisa!</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Game Finished Screen
          <div className="text-center py-10">
            {/* Confetti Effect Simulation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-2xl animate-bounce"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                >
                  {['🎉', '🎊', '⭐', '🏆', '🎈'][i % 5]}
                </div>
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="mb-8">
                <div className="text-8xl mb-6 animate-bounce" style={{ animationDuration: '1s' }}>
                  {score === 100 ? '🏆' : 
                   score >= 80 ? '🎖️' : 
                   score >= 60 ? '🎉' : 
                   score >= 40 ? '🌟' : '👍'}
                </div>
                
                <h2 
                  className="text-4xl font-bold mb-4"
                  style={{ color: '#2a436c' }}
                >
                  {score === 100 ? 'LUAR BIASA!' : 
                   score >= 80 ? 'HEBAT SEKALI!' : 
                   score >= 60 ? 'KEREN!' : 
                   score >= 40 ? 'BAIK!' : 'TERUS SEMANGAT!'}
                </h2>
                
                <p className="text-xl mb-6" style={{ color: '#6b7280' }}>
                  Petualangan matematika {playerName} telah selesai!
                </p>
              </div>
              
              {/* Score Card dengan Animasi */}
              <div 
                className="max-w-md mx-auto rounded-2xl p-8 mb-10 relative overflow-hidden animate-pulse-glow"
                style={{ 
                  backgroundColor: '#ffffff',
                  border: '4px solid #90b6d5',
                  boxShadow: '0 15px 35px rgba(47, 85, 133, 0.2)'
                }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute w-32 h-32 rounded-full"
                    style={{
                      top: '-50px',
                      right: '-50px',
                      backgroundColor: 'rgba(79, 144, 198, 0.1)'
                    }}
                  />
                  <div 
                    className="absolute w-40 h-40 rounded-full"
                    style={{
                      bottom: '-80px',
                      left: '-80px',
                      backgroundColor: 'rgba(144, 182, 213, 0.1)'
                    }}
                  />
                </div>
                
                <div className="relative z-10">
                  <h3 
                    className="text-2xl font-bold mb-6 flex items-center justify-center gap-3"
                    style={{ color: '#2a436c' }}
                  >
                    <span className="text-3xl">📊</span>
                    HASIL AKHIR
                  </h3>
                  
                  <div className="mb-8">
                    <div className="text-7xl font-bold mb-4" style={{ color: '#355485' }}>
                      {score}
                      <span className="text-3xl ml-2" style={{ color: '#6b7280' }}>
                        / {questions.length * 10}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-center mb-6">
                      <div 
                        className="px-6 py-3 rounded-full text-lg font-medium inline-flex items-center gap-2"
                        style={{ 
                          backgroundColor: score === 100 ? '#fef3c7' : 
                                         score >= 80 ? '#dcfce7' : 
                                         score >= 60 ? '#dbeafe' : 
                                         score >= 40 ? '#f3e8ff' : '#fee2e2',
                          color: score === 100 ? '#d97706' : 
                                score >= 80 ? '#16a34a' : 
                                score >= 60 ? '#2563eb' : 
                                score >= 40 ? '#7c3aed' : '#dc2626'
                        }}
                      >
                        <span className="text-xl">
                          {score === 100 ? '🏆' : 
                           score >= 80 ? '⭐' : 
                           score >= 60 ? '✨' : 
                           score >= 40 ? '🌟' : '💪'}
                        </span>
                        {playerName} berhasil menjawab {score / 10} dari {questions.length} soal
                      </div>
                    </div>
                    
                    {/* Score Circle dengan Animasi */}
                    <div className="flex justify-center mb-8">
                      <div className="relative w-56 h-56">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="4"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="48"
                            fill="none"
                            stroke="#4f90c6"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray={`${(score / (questions.length * 10)) * 301.6} 301.6`}
                            transform="rotate(-90 50 50)"
                            className="transition-all duration-2000"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-4xl font-bold mb-2" style={{ color: '#355485' }}>
                            {Math.round((score / (questions.length * 10)) * 100)}%
                          </div>
                          <div className="text-sm" style={{ color: '#6b7280' }}>Pencapaian</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                        <div className="text-2xl font-bold" style={{ color: '#4f90c6' }}>{questions.length}</div>
                        <div className="text-sm" style={{ color: '#6b7280' }}>Total Soal</div>
                      </div>
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                        <div className="text-2xl font-bold" style={{ color: '#10b981' }}>{score / 10}</div>
                        <div className="text-sm" style={{ color: '#6b7280' }}>Benar</div>
                      </div>
                      <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f9fafb' }}>
                        <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>{questions.length - (score / 10)}</div>
                        <div className="text-sm" style={{ color: '#6b7280' }}>Salah</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={restartGame}
                  className="px-10 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 group"
                  style={{ 
                    backgroundColor: '#355485',
                    color: '#ffffff',
                    boxShadow: '0 8px 20px rgba(53, 84, 133, 0.3)'
                  }}
                >
                  <span className="text-2xl group-hover:rotate-180 transition-transform duration-500">🔄</span>
                  <span>Main Lagi</span>
                </button>
                
                <button
                  onClick={() => {
                    setGameStarted(false);
                    setGameFinished(false);
                    setCurrentQuestion(0);
                    setScore(0);
                    setSelectedAnswer(null);
                    setIsCorrect(null);
                    setAnimatedItems([]);
                    setShowCorrectAnswer(false);
                  }}
                  className="px-10 py-4 text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3"
                  style={{ 
                    backgroundColor: '#ffffff',
                    color: '#355485',
                    border: '3px solid #90b6d5'
                  }}
                >
                  <span className="text-2xl">👥</span>
                  <span>Pemain Baru</span>
                </button>
              </div>
              
              {/* Share Section */}
              <div className="mt-10 p-5 rounded-xl max-w-md mx-auto" style={{ backgroundColor: '#f0f7ff' }}>
                <p className="mb-4 text-lg" style={{ color: '#2a436c' }}>
                  Bagikan prestasimu! 🎯
                </p>
                <div className="flex justify-center gap-6">
                  <button className="text-3xl hover:scale-125 transition-transform">📱</button>
                  <button className="text-3xl hover:scale-125 transition-transform">📧</button>
                  <button className="text-3xl hover:scale-125 transition-transform">📤</button>
                  <button className="text-3xl hover:scale-125 transition-transform">🖨️</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="text-center mt-8 p-5 rounded-xl w-full max-w-4xl" style={{ backgroundColor: '#cbdde9' }}>
        <p className="font-bold text-lg mb-2 flex items-center justify-center gap-2" style={{ color: '#2a436c' }}>
          <span>🧠</span>
          Matematika Itu Menyenangkan!
        </p>
        <p className="text-sm" style={{ color: '#6b7280' }}>
          Game edukasi untuk belajar pengurangan dasar dengan cara yang seru dan interaktif
        </p>
      </div>
    </div>
  );
}