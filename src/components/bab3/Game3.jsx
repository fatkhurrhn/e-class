import React, { useState, useEffect, useRef } from 'react';

export default function Game1() {
  // State untuk game
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [gameHistory, setGameHistory] = useState(() => {
    const saved = localStorage.getItem('mathGameHistory');
    return saved ? JSON.parse(saved) : [];
  });
  
  // State untuk soal dan jawaban
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answerOptions, setAnswerOptions] = useState([]);
  const [droppedElements, setDroppedElements] = useState([]);
  const [showFeedback, setShowFeedback] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Ref untuk container
  const gameContainerRef = useRef(null);
  const dropAreaRef = useRef(null);
  
  // ==================== REF SOUND YANG BENAR ====================
  const correctSoundRef = useRef(null);
  const wrongSoundRef = useRef(null);
  
  // ==================== INISIALISASI DI USEEFFECT ====================
  useEffect(() => {
    // Inisialisasi audio
    correctSoundRef.current = new Audio('https://assets.mixkit.co/sfx/download/mixkit-winning-chimes-2015.wav');
    wrongSoundRef.current = new Audio('https://assets.mixkit.co/sfx/download/mixkit-wrong-answer-fail-notification-946.wav');
    
    // Set volume maksimal
    correctSoundRef.current.volume = 1.0;
    wrongSoundRef.current.volume = 1.0;
    
    // Preload audio
    const preloadAudio = () => {
      correctSoundRef.current.load();
      wrongSoundRef.current.load();
    };
    
    preloadAudio();
    
    return () => {
      // Cleanup
      correctSoundRef.current.pause();
      wrongSoundRef.current.pause();
    };
  }, []);
  
  // ==================== FUNGSI PLAY SOUND ====================
  const playSound = (isCorrectSound) => {
    try {
      if (isCorrectSound) {
        correctSoundRef.current.currentTime = 0;
        correctSoundRef.current.play().catch(e => {
          // Fallback jika gagal
          const fallbackAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3');
          fallbackAudio.volume = 1.0;
          fallbackAudio.play();
        });
      } else {
        wrongSoundRef.current.currentTime = 0;
        wrongSoundRef.current.play().catch(e => {
          // Fallback jika gagal
          const fallbackAudio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3');
          fallbackAudio.volume = 1.0;
          fallbackAudio.play();
        });
      }
    } catch (error) {
      console.log("Sound error:", error);
    }
  };
  
  // Palette warna
  const colors = {
    primary: '#355485',
    primaryDark: '#2a436c',
    accent: '#4f90c6',
    softBlue: '#90b6d5',
    lightBlue: '#cbdde9',
    background: '#f9fafb',
    textGray: '#6b7280',
    borderGray: '#e5e7eb',
    mutedGray: '#9ca3af',
    white: '#ffffff'
  };
  
  // Nilai hewan (SEMUA HEWAN DITAMPILKAN)
  const animalValues = {
    '🐱': { name: 'Kucing', value: 5 },
    '🐘': { name: 'Gajah', value: 2 },
    '🐢': { name: 'Kura-kura', value: 3 },
    '🐳': { name: 'Paus', value: 7 },
    '🐶': { name: 'Anjing', value: 4 },
    '🐰': { name: 'Kelinci', value: 6 },
    '🦁': { name: 'Singa', value: 8 },
    '🐵': { name: 'Monyet', value: 1 },
    '🐼': { name: 'Panda', value: 9 },
    '🐦': { name: 'Burung', value: 10 }
  };
  
  // Soal-soal matematika HANYA PENGURANGAN
  const mathProblems = [
    { 
      problem: '🐳 - 🐘 = ?', 
      answer: [7, 2, 5],
      description: 'Paus dikurangi Gajah sama dengan?'
    },
    { 
      problem: '🦁 - 🐶 = ?', 
      answer: [8, 4, 4],
      description: 'Singa dikurangi Anjing sama dengan?'
    },
    { 
      problem: '🐱 - 🐢 = ?', 
      answer: [5, 3, 2],
      description: 'Kucing dikurangi Kura-kura sama dengan?'
    },
    { 
      problem: '🐼 - 🐰 = ?', 
      answer: [9, 6, 3],
      description: 'Panda dikurangi Kelinci sama dengan?'
    },
    { 
      problem: '🐦 - 🐱 = ?', 
      answer: [10, 5, 5],
      description: 'Burung dikurangi Kucing sama dengan?'
    },
    { 
      problem: '🐳 - 🐢 = ?', 
      answer: [7, 3, 4],
      description: 'Paus dikurangi Kura-kura sama dengan?'
    },
    { 
      problem: '🦁 - 🐱 = ?', 
      answer: [8, 5, 3],
      description: 'Singa dikurangi Kucing sama dengan?'
    },
    { 
      problem: '🐼 - 🐘 = ?', 
      answer: [9, 2, 7],
      description: 'Panda dikurangi Gajah sama dengan?'
    },
    { 
      problem: '🐦 - 🐰 = ?', 
      answer: [10, 6, 4],
      description: 'Burung dikurangi Kelinci sama dengan?'
    },
    { 
      problem: '🐳 - 🐶 = ?', 
      answer: [7, 4, 3],
      description: 'Paus dikurangi Anjing sama dengan?'
    }
  ];
  
  // Inisialisasi game
  const initializeGame = () => {
    if (playerName.trim() === '') {
      setFeedbackMessage('Masukkan nama kamu terlebih dahulu!');
      setShowFeedback('incorrect');
      playSound(false);
      setTimeout(() => setShowFeedback(null), 2000);
      return;
    }
    
    setGameStarted(true);
    setScore(0);
    setCurrentLevel(1);
    setGameCompleted(false);
    generateQuestion(1);
  };
  
  // Generate soal berdasarkan level
  const generateQuestion = (level) => {
    const problemIndex = Math.min(level - 1, mathProblems.length - 1);
    const problem = mathProblems[problemIndex];
    
    setCurrentQuestion(problem);
    
    // Generate opsi jawaban: angka 1-10 BERURUTAN
    const allOptions = [];
    
    // Tambahkan angka 1-10 BERURUTAN
    for (let i = 1; i <= 10; i++) {
      allOptions.push({ type: 'number', value: i, id: `num-${i}` });
    }
    
    setAnswerOptions(allOptions);
    
    // Kosongkan area jawaban
    setDroppedElements([]);
    setShowFeedback(null);
  };
  
  // Handle drag start
  const handleDragStart = (e, element) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(element));
    e.target.style.opacity = '0.5';
  };
  
  // Handle drag end
  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };
  
  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.style.backgroundColor = colors.lightBlue;
    }
  };
  
  // Handle drag leave
  const handleDragLeave = (e) => {
    if (dropAreaRef.current) {
      dropAreaRef.current.style.backgroundColor = colors.background;
    }
  };
  
  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    if (dropAreaRef.current) {
      dropAreaRef.current.style.backgroundColor = colors.background;
    }
    
    const elementData = JSON.parse(e.dataTransfer.getData('text/plain'));
    
    // Ganti jawaban yang ada
    setDroppedElements([{
      ...elementData,
      id: `${elementData.id}-${Date.now()}`
    }]);
  };
  
  // Hapus elemen dari area jawaban
  const removeDroppedElement = () => {
    setDroppedElements([]);
  };
  
  // Cek jawaban
  const checkAnswer = () => {
    if (droppedElements.length === 0) {
      setFeedbackMessage('Seret angka ke kotak jawaban!');
      setShowFeedback('incorrect');
      playSound(false);
      setTimeout(() => setShowFeedback(null), 1500);
      return;
    }
    
    const userAnswer = droppedElements[0].value;
    const correctAnswer = currentQuestion.answer[2];
    
    if (userAnswer === correctAnswer) {
      // Jawaban benar
      const animalEmojis = currentQuestion.problem.split(' ');
      const animal1 = animalEmojis[0];
      const animal2 = animalEmojis[2];
      const val1 = animalValues[animal1]?.value;
      const val2 = animalValues[animal2]?.value;
      
      setFeedbackMessage(
        `Hebat! ${animalValues[animal1].name} (${val1}) - ${animalValues[animal2].name} (${val2}) = ${userAnswer} 🎉`
      );
      setShowFeedback('correct');
      
      // Play sound BENAR
      playSound(true);
      
      const newScore = score + 10;
      setScore(newScore);
      
      // LANGSUNG lanjut ke soal berikutnya setelah 1.5 detik
      setTimeout(() => {
        // Jika ini level terakhir
        if (currentLevel >= mathProblems.length) {
          setGameCompleted(true);
          
          // Simpan ke history
          const newHistory = [
            ...gameHistory,
            { 
              name: playerName, 
              score: newScore, 
              level: currentLevel,
              date: new Date().toLocaleDateString('id-ID'),
              time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            }
          ];
          setGameHistory(newHistory);
          localStorage.setItem('mathGameHistory', JSON.stringify(newHistory));
        } else {
          // Lanjut ke level berikutnya
          const nextLevel = currentLevel + 1;
          setCurrentLevel(nextLevel);
          generateQuestion(nextLevel);
        }
      }, 1500);
      
    } else {
      // Jawaban salah - LANGSUNG lanjut ke soal berikutnya setelah 1.5 detik
      setFeedbackMessage(`Jawaban: ${currentQuestion.answer[0]} - ${currentQuestion.answer[1]} = ${correctAnswer}`);
      setShowFeedback('incorrect');
      
      // Play sound SALAH
      playSound(false);
      
      setTimeout(() => {
        // Lanjut ke soal berikutnya
        if (currentLevel >= mathProblems.length) {
          setGameCompleted(true);
          
          const newHistory = [
            ...gameHistory,
            { 
              name: playerName, 
              score: score, 
              level: currentLevel,
              date: new Date().toLocaleDateString('id-ID'),
              time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
            }
          ];
          setGameHistory(newHistory);
          localStorage.setItem('mathGameHistory', JSON.stringify(newHistory));
        } else {
          const nextLevel = currentLevel + 1;
          setCurrentLevel(nextLevel);
          generateQuestion(nextLevel);
        }
      }, 1500);
    }
  };
  
  // Reset jawaban
  const resetAnswer = () => {
    setDroppedElements([]);
  };
  
  // Toggle fullscreen untuk seluruh halaman
  const toggleFullscreen = () => {
    if (!showFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
      setShowFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setShowFullscreen(false);
    }
  };
  
  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setGameCompleted(false);
    setScore(0);
    setCurrentLevel(1);
    setPlayerName('');
    setShowTutorial(true);
  };
  
  // Skip tutorial
  const skipTutorial = () => {
    setShowTutorial(false);
  };
  
  // Format feedback style
  const getFeedbackStyle = () => {
    if (showFeedback === 'correct') {
      return { 
        backgroundColor: '#d4edda', 
        color: '#155724', 
        borderColor: '#c3e6cb',
        animation: 'bounce 0.5s'
      };
    } else if (showFeedback === 'incorrect') {
      return { 
        backgroundColor: '#f8d7da', 
        color: '#721c24', 
        borderColor: '#f5c6cb',
        animation: 'shake 0.5s'
      };
    }
    return {};
  };
  
  // Efek untuk keluar dari fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        setShowFullscreen(false);
      }
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
  
  // Animasi CSS
  const styles = `
    @keyframes bounce {
      0%, 20%, 60%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      80% { transform: translateY(-5px); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    
    .drag-item {
      transition: transform 0.2s, opacity 0.2s;
      cursor: grab;
    }
    
    .drag-item:active {
      cursor: grabbing;
    }
    
    .drag-item:hover {
      transform: scale(1.1);
    }
    
    .pulse {
      animation: pulse 2s infinite;
    }
    
    .float {
      animation: float 3s ease-in-out infinite;
    }
    
    .arrow {
      display: inline-block;
      animation: bounce 1s infinite;
    }
    
    .btn-start {
      cursor: pointer !important;
      transition: all 0.3s ease !important;
    }
    
    .btn-start:hover {
      opacity: 0.9 !important;
      transform: scale(1.05) !important;
    }
    
    /* Font besar untuk anak-anak */
    .animal-value-large {
      font-size: 1.5rem !important;
      font-weight: bold !important;
    }
    
    .animal-emoji-large {
      font-size: 2.5rem !important;
    }
    
    .animal-name-large {
      font-size: 1.2rem !important;
      font-weight: bold !important;
    }
    
    /* Sound indicator */
    .sound-indicator {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: ${colors.accent};
      color: white;
      padding: 10px 15px;
      border-radius: 20px;
      font-size: 14px;
      z-index: 1000;
      animation: pulse 1.5s infinite;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    /* Test sound button */
    .test-sound-btn {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: ${colors.primary};
      color: white;
      padding: 10px 15px;
      border-radius: 20px;
      font-size: 14px;
      z-index: 1000;
      border: none;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
  `;

  return (
    <div style={{ 
      backgroundColor: colors.background, 
      minHeight: '100vh', 
      padding: '1rem',
      position: 'relative'
    }}>
      <style>{styles}</style>
      
      {/* Tombol Test Sound */}
      <button
        className="test-sound-btn"
        onClick={() => {
          playSound(true);
          setTimeout(() => playSound(false), 1000);
        }}
        title="Test Sound"
      >
        🔊 Test Sound
      </button>
      
      {/* Tombol Fullscreen di pojok kanan atas halaman */}
      <button
        onClick={toggleFullscreen}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 100,
          backgroundColor: colors.softBlue,
          color: colors.primaryDark,
          border: 'none',
          borderRadius: '0.5rem',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
        title="Fullscreen"
      >
        <span style={{ fontSize: '1.25rem' }}>
          {showFullscreen ? '🔲' : '🔳'}
        </span>
        <span style={{ fontWeight: 'bold' }}>
          {showFullscreen ? 'Keluar Fullscreen' : 'Fullscreen'}
        </span>
      </button>
      
      {/* Sound Indicator */}
      {gameStarted && !gameCompleted && (
        <div className="sound-indicator">
          🔊 SOUND AKTIF
        </div>
      )}
      
      <h1 
        className="text-4xl font-bold mb-2 text-center"
        style={{ color: colors.primary }}
      >
        🧮 Game Matematika Hewan 🐾
      </h1>
      
      <p 
        className="text-lg mb-8 text-center"
        style={{ color: colors.textGray }}
      >
        Seret angka untuk menjawab soal pengurangan hewan!
      </p>
      
      {!gameStarted ? (
        <>
          {/* Tutorial Drag & Drop */}
          {showTutorial && (
            <div 
              className="w-full max-w-2xl p-6 rounded-2xl shadow-lg mx-auto mb-8"
              style={{ 
                backgroundColor: colors.white, 
                border: `3px solid ${colors.accent}`,
                position: 'relative'
              }}
            >
              <button
                onClick={skipTutorial}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: colors.mutedGray,
                  color: colors.white,
                  border: 'none',
                  borderRadius: '50%',
                  width: '2rem',
                  height: '2rem',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
              
              <h2 
                className="text-2xl font-bold mb-4 text-center"
                style={{ color: colors.primaryDark }}
              >
                Cara Bermain 🎮
              </h2>
              
              <div className="flex flex-col md:flex-row items-center justify-center mb-6 gap-4">
                <div className="text-center">
                  <div 
                    className="text-4xl font-bold p-4 rounded-lg mx-auto mb-2 inline-block"
                    style={{ 
                      backgroundColor: colors.lightBlue,
                      color: colors.primary,
                      border: `2px dashed ${colors.accent}`
                    }}
                  >
                    5
                  </div>
                  <div className="arrow" style={{ color: colors.accent, fontSize: '2rem' }}>↓</div>
                  <div 
                    className="text-4xl font-bold p-4 rounded-lg mx-auto mt-2 inline-block"
                    style={{ 
                      backgroundColor: colors.accent,
                      color: colors.white
                    }}
                  >
                    🐱 = 5
                  </div>
                </div>
                
                <div className="text-2xl" style={{ color: colors.primaryDark }}>→</div>
                
                <div className="text-center">
                  <div className="flex items-center mb-2">
                    <span className="text-4xl mr-2">🐳</span>
                    <span className="text-2xl">-</span>
                    <span className="text-4xl ml-2">🐘</span>
                    <span className="text-2xl mx-2">=</span>
                    <div 
                      className="text-4xl font-bold p-4 rounded-lg"
                      style={{ 
                        backgroundColor: colors.lightBlue,
                        color: colors.primary,
                        minWidth: '80px',
                        border: `2px dashed ${colors.accent}`
                      }}
                    >
                      ?
                    </div>
                  </div>
                  <div className="text-lg" style={{ color: colors.textGray }}>
                    Seret angka 5 ke sini!
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-bold mb-2 text-center" style={{ color: colors.primaryDark, fontSize: '1.5rem' }}>
                  Nilai Semua Hewan:
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {Object.entries(animalValues).map(([emoji, data]) => (
                    <div 
                      key={emoji}
                      className="p-4 rounded-lg text-center"
                      style={{ 
                        backgroundColor: colors.lightBlue,
                        border: `2px solid ${colors.softBlue}`
                      }}
                    >
                      <div className="animal-emoji-large" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{emoji}</div>
                      <div className="animal-name-large" style={{ color: colors.primaryDark, fontSize: '1.3rem', fontWeight: 'bold' }}>
                        {data.name}
                      </div>
                      <div className="animal-value-large" style={{ color: colors.primary, fontSize: '2rem', fontWeight: 'bold' }}>
                        = {data.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={skipTutorial}
                  className="py-3 px-8 rounded-lg font-bold text-lg btn-start"
                  style={{ 
                    backgroundColor: colors.primary,
                    color: colors.white,
                    border: 'none'
                  }}
                >
                  Saya Mengerti! Lanjutkan →
                </button>
              </div>
            </div>
          )}
          
          {/* Form input nama */}
          <div 
            className="w-full max-w-md p-8 rounded-2xl shadow-lg mx-auto"
            style={{ backgroundColor: colors.white, border: `2px solid ${colors.lightBlue}` }}
          >
            <h2 
              className="text-2xl font-bold mb-6 text-center"
              style={{ color: colors.primaryDark }}
            >
              Masukkan Nama Kamu
            </h2>
            
            <div className="mb-6">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Nama kamu..."
                className="w-full p-3 text-lg rounded-lg border-2 focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: colors.softBlue,
                  color: colors.primaryDark,
                  fontSize: '1.2rem'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    initializeGame();
                  }
                }}
              />
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={initializeGame}
                className="text-xl py-3 px-8 rounded-lg font-bold pulse btn-start"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: 'none',
                  fontSize: '1.3rem'
                }}
              >
                Mulai Game! 🚀
              </button>
            </div>
            
            {/* Info nilai hewan - SEMUA HEWAN DITAMPILKAN DENGAN FONT BESAR */}
            <div className="mt-8 p-5 rounded-lg" style={{ backgroundColor: colors.lightBlue }}>
              <h3 className="font-bold mb-4 text-center" style={{ color: colors.primaryDark, fontSize: '1.5rem' }}>
                Nilai Semua Hewan:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(animalValues).map(([emoji, data]) => (
                  <div key={emoji} className="flex items-center p-2">
                    <span className="text-3xl mr-3">{emoji}</span>
                    <div>
                      <div style={{ color: colors.primaryDark, fontSize: '1.3rem', fontWeight: 'bold' }}>
                        {data.name}
                      </div>
                      <div style={{ color: colors.primary, fontSize: '1.8rem', fontWeight: 'bold' }}>
                        = {data.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : !gameCompleted ? (
        // Game sedang berjalan
        <div 
          ref={gameContainerRef}
          className="w-full max-w-4xl p-6 rounded-2xl shadow-lg mx-auto"
          style={{ 
            backgroundColor: colors.white, 
            border: `3px solid ${colors.primary}`,
            minHeight: '500px'
          }}
        >
          {/* Header game */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 
                className="text-2xl font-bold"
                style={{ color: colors.primaryDark }}
              >
                Hai, <span style={{ color: colors.accent }}>{playerName}</span>!
              </h2>
              <p style={{ color: colors.textGray, fontSize: '1.1rem' }}>Level: {currentLevel} / {mathProblems.length}</p>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold" style={{ color: colors.accent }}>{score} Poin</div>
              <p style={{ color: colors.textGray, fontSize: '1.1rem' }}>Skor Kamu</p>
            </div>
          </div>
          
          {/* Info nilai hewan di game - SEMUA HEWAN DITAMPILKAN DENGAN FONT BESAR */}
          <div className="mb-6 p-5 rounded-xl" style={{ backgroundColor: colors.lightBlue }}>
            <h3 className="font-bold mb-3 text-center" style={{ color: colors.primaryDark, fontSize: '1.5rem' }}>
              Nilai Semua Hewan:
            </h3>
            <div className="grid grid-cols-5 gap-3">
              {Object.entries(animalValues).map(([emoji, data]) => (
                <div 
                  key={emoji}
                  className="px-3 py-3 rounded-lg text-center"
                  style={{ 
                    backgroundColor: colors.white,
                    border: `2px solid ${colors.softBlue}`
                  }}
                >
                  <div className="text-3xl mb-1">{emoji}</div>
                  <div className="text-xs font-bold" style={{ color: colors.primaryDark, fontSize: '0.9rem' }}>
                    {data.name}
                  </div>
                  <div className="font-bold mt-1" style={{ color: colors.primary, fontSize: '1.5rem' }}>
                    {data.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Soal */}
          <div className="mb-8">
            <h3 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: colors.primaryDark }}
            >
              Soal {currentLevel}: {currentQuestion.description}
            </h3>
            
            {/* Display soal dengan hewan */}
            <div className="flex justify-center items-center mb-8">
              <div className="flex items-center">
                {/* Hewan pertama */}
                <div className="text-center mr-6">
                  <div className="text-7xl mb-2 float">{currentQuestion.problem?.split(' ')[0] || '🐱'}</div>
                </div>
                
                {/* Operator pengurangan */}
                <div className="text-6xl mx-6" style={{ color: colors.primaryDark }}>
                  -
                </div>
                
                {/* Hewan kedua */}
                <div className="text-center ml-6">
                  <div className="text-7xl mb-2 float">{currentQuestion.problem?.split(' ')[2] || '🐘'}</div>
                </div>
                
                {/* Tanda sama dengan */}
                <div className="text-6xl mx-8" style={{ color: colors.primaryDark }}>
                  =
                </div>
                
                {/* Kotak jawaban */}
                <div 
                  ref={dropAreaRef}
                  className="text-5xl font-bold p-6 rounded-xl border-4 border-dashed flex items-center justify-center"
                  style={{ 
                    borderColor: droppedElements.length > 0 ? colors.accent : colors.softBlue,
                    backgroundColor: droppedElements.length > 0 ? colors.lightBlue : colors.background,
                    minWidth: '140px',
                    minHeight: '140px',
                    transition: 'background-color 0.3s'
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {droppedElements.length > 0 ? (
                    <div 
                      className="text-5xl font-bold p-4 rounded-lg cursor-pointer"
                      style={{ 
                        backgroundColor: colors.accent,
                        color: colors.white
                      }}
                      onClick={removeDroppedElement}
                      title="Klik untuk menghapus"
                    >
                      {droppedElements[0].value}
                    </div>
                  ) : (
                    <span style={{ color: colors.mutedGray, fontSize: '3rem' }}>?</span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Feedback dengan INDICATOR SOUND */}
            {showFeedback && (
              <div 
                className="p-4 rounded-lg mb-6 text-center font-bold text-2xl border-2"
                style={getFeedbackStyle()}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span>{feedbackMessage}</span>
                  {showFeedback === 'correct' && (
                    <span style={{ fontSize: '1.5rem', animation: 'pulse 0.5s 3' }}>🔊🎉</span>
                  )}
                  {showFeedback === 'incorrect' && (
                    <span style={{ fontSize: '1.5rem', animation: 'pulse 0.5s 3' }}>🔊😊</span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Pilihan angka untuk drag (BERURUTAN 1-10) - DIBAWAH SOAL */}
          <div>
            <h4 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: colors.primaryDark }}
            >
              Angka untuk Drag & Drop:
            </h4>
            
            <div className="flex flex-wrap justify-center gap-4">
              {answerOptions.map((element) => (
                <div
                  key={element.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, element)}
                  onDragEnd={handleDragEnd}
                  className="text-4xl font-bold p-5 rounded-lg drag-item"
                  style={{ 
                    backgroundColor: colors.lightBlue,
                    color: colors.primary,
                    minWidth: '80px',
                    textAlign: 'center',
                    boxShadow: `0 4px 0 ${colors.accent}`,
                    cursor: 'grab',
                    fontSize: '2.5rem'
                  }}
                >
                  {element.value}
                </div>
              ))}
            </div>
          </div>
          
          {/* Tombol aksi */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={checkAnswer}
              className="py-4 px-10 rounded-lg font-bold text-xl pulse btn-start"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none'
              }}
            >
              🔊 Cek Jawaban
            </button>
            
            <button
              onClick={resetAnswer}
              className="py-4 px-10 rounded-lg font-bold text-xl btn-start"
              style={{ 
                backgroundColor: colors.mutedGray,
                color: colors.white,
                border: 'none'
              }}
            >
              🔄 Reset Jawaban
            </button>
          </div>
          
          {/* Petunjuk SOUND */}
          <div className="mt-6 p-4 rounded-lg text-center" style={{ backgroundColor: colors.lightBlue }}>
            <p className="text-lg" style={{ color: colors.primaryDark }}>
              <span className="font-bold">🎵 SOUND AKTIF:</span> Jawaban benar/salah akan mengeluarkan suara yang keras!
            </p>
          </div>
        </div>
      ) : (
        // Game selesai
        <div 
          className="w-full max-w-2xl p-8 rounded-2xl shadow-lg mx-auto text-center"
          style={{ 
            backgroundColor: colors.white, 
            border: `3px solid ${colors.accent}`
          }}
        >
          <h2 
            className="text-4xl font-bold mb-6"
            style={{ color: colors.primaryDark }}
          >
            🏆 Game Selesai, {playerName}! 🎉
          </h2>
          
          <div className="mb-8">
            <div 
              className="text-5xl font-bold p-6 rounded-full inline-block mb-4"
              style={{ 
                backgroundColor: colors.accent,
                color: colors.white,
                width: '180px',
                height: '180px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem'
              }}
            >
              {score}
            </div>
            <p className="text-3xl" style={{ color: colors.primary }}>
              Total Poin Kamu!
            </p>
            <p className="text-xl mt-2" style={{ color: colors.textGray }}>
              Kamu telah menyelesaikan {mathProblems.length} soal pengurangan!
            </p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-10">
            <button
              onClick={resetGame}
              className="py-4 px-10 rounded-lg font-bold text-xl btn-start"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.white,
                border: 'none'
              }}
            >
              Main Lagi 🔄
            </button>
          </div>
          
          {/* Riwayat permainan */}
          <div className="mt-8">
            <h3 
              className="text-3xl font-bold mb-4"
              style={{ color: colors.primaryDark }}
            >
              📜 Riwayat Permainan
            </h3>
            
            {gameHistory.length === 0 ? (
              <p style={{ color: colors.textGray, fontSize: '1.2rem' }}>Belum ada riwayat permainan</p>
            ) : (
              <div className="overflow-x-auto max-h-60 overflow-y-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ backgroundColor: colors.primary, color: colors.white }}>
                      <th className="p-3 text-left" style={{ fontSize: '1.1rem' }}>Nama</th>
                      <th className="p-3 text-left" style={{ fontSize: '1.1rem' }}>Skor</th>
                      <th className="p-3 text-left" style={{ fontSize: '1.1rem' }}>Level</th>
                      <th className="p-3 text-left" style={{ fontSize: '1.1rem' }}>Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...gameHistory].reverse().slice(0, 8).map((record, index) => (
                      <tr 
                        key={index}
                        className="border-b"
                        style={{ 
                          borderColor: colors.borderGray,
                          backgroundColor: index % 2 === 0 ? colors.white : colors.background
                        }}
                      >
                        <td className="p-3" style={{ color: colors.primaryDark, fontSize: '1.1rem' }}>{record.name}</td>
                        <td className="p-3 font-bold" style={{ color: colors.accent, fontSize: '1.2rem' }}>{record.score}</td>
                        <td className="p-3" style={{ color: colors.textGray, fontSize: '1.1rem' }}>{record.level}</td>
                        <td className="p-3" style={{ color: colors.textGray, fontSize: '1.1rem' }}>{record.date} {record.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-12 text-center" style={{ color: colors.mutedGray }}>
        <p style={{ fontSize: '1.2rem' }}>Game Matematika Hewan - Belajar pengurangan dengan hewan-hewan lucu!</p>
        <p className="mt-2" style={{ fontSize: '1.1rem' }}>🎵 Sound aktif untuk pengalaman belajar yang lebih menyenangkan!</p>
      </div>
    </div>
  );
}