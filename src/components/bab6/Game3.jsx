import React, { useState, useEffect } from 'react';

export default function Game1() {
  // State untuk game
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // State untuk perbandingan
  const [leftItems, setLeftItems] = useState([]);
  const [rightItems, setRightItems] = useState([]);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [scaleTilt, setScaleTilt] = useState('balanced');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [itemsType, setItemsType] = useState('animals');
  
  // Daftar hewan dan buah yang lucu
  const animals = ['🐶', '🐱', '🐰', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤'];
  const fruits = ['🍎', '🍌', '🍇', '🍓', '🍊', '🍋', '🍉', '🍑', '🍒', '🥭', '🍍', '🥥', '🥝', '🍐', '🍈'];
  
  // Inisialisasi round baru
  const initializeRound = () => {
    const newItemsType = Math.random() > 0.5 ? 'animals' : 'fruits';
    setItemsType(newItemsType);
    
    const leftCount = Math.floor(Math.random() * 10) + 11;
    const rightCount = Math.floor(Math.random() * 10) + 11;
    
    const itemsList = newItemsType === 'animals' ? animals : fruits;
    
    const leftItems = [];
    const rightItems = [];
    
    for (let i = 0; i < leftCount; i++) {
      leftItems.push(itemsList[Math.floor(Math.random() * itemsList.length)]);
    }
    
    for (let i = 0; i < rightCount; i++) {
      rightItems.push(itemsList[Math.floor(Math.random() * itemsList.length)]);
    }
    
    setLeftItems(leftItems);
    setRightItems(rightItems);
    setLeftCount(leftCount);
    setRightCount(rightCount);
    setSelectedAnswer('');
    setScaleTilt('balanced');
    setShowResult(false);
    setIsCorrect(null);
  };
  
  // Memulai game
  const startGame = () => {
    if (!playerName.trim()) {
      alert('Masukkan nama kamu dulu ya!');
      return;
    }
    setGameStarted(true);
    setScore(0);
    setCurrentRound(1);
    setGameHistory([]);
    initializeRound();
  };
  
  // Fungsi untuk memutar suara - SANGAT SEDERHANA
  const playSound = (soundType) => {
    try {
      // Buat audio element baru setiap kali
      const audio = new Audio();
      
      if (soundType === 'correct') {
        // Suara benar - bell sound
        audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
        audio.play();
        
        // Juga coba Web Audio API sebagai fallback
        playBeep(800, 300, 0.3);
      } else {
        // Suara salah - buzz sound
        audio.src = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
        audio.play();
        
        // Juga coba Web Audio API sebagai fallback
        playBeep(300, 500, 0.3);
      }
    } catch (error) {
      console.log("Sound error:", error);
      // Gunakan Web Audio API saja
      if (soundType === 'correct') {
        playBeep(800, 300, 0.3);
      } else {
        playBeep(300, 500, 0.3);
      }
    }
  };
  
  // Fungsi untuk memutar beep menggunakan Web Audio API
  const playBeep = (frequency, duration, volume = 0.3) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      gainNode.gain.value = volume;
      
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
      }, duration);
    } catch (e) {
      console.log("Web Audio API not supported");
    }
  };
  
  // Memilih jawaban - SEMUA DALAM SATU FUNGSI
  const handleAnswer = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    
    // Tentukan jawaban yang benar
    let correctAnswer = '';
    if (leftCount > rightCount) correctAnswer = '>';
    else if (leftCount < rightCount) correctAnswer = '<';
    else correctAnswer = '=';
    
    // Cek apakah benar
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    
    // Update skor
    if (correct) {
      setScore(prev => prev + 10);
    }
    
    // PUTAR SUARA DI SINI - langsung setelah cek jawaban
    if (correct) {
      playSound('correct');
    } else {
      playSound('wrong');
    }
    
    // Animasi timbangan
    if (correct) {
      if (answer === '>') {
        setScaleTilt('left-down');
      } else if (answer === '<') {
        setScaleTilt('right-down');
      } else {
        setScaleTilt('balanced');
      }
    } else {
      if (answer === '>') {
        setScaleTilt('left-up-wrong');
      } else if (answer === '<') {
        setScaleTilt('right-up-wrong');
      } else {
        setScaleTilt('balanced-wrong');
      }
    }
    
    setShowResult(true);
    
    // Simpan ke history
    const historyEntry = {
      round: currentRound,
      leftCount,
      rightCount,
      answer,
      correct,
      itemsType,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setGameHistory(prev => [...prev, historyEntry]);
  };
  
  // Lanjut ke round berikutnya
  const nextRound = () => {
    if (currentRound >= 10) {
      endGame();
      return;
    }
    
    setCurrentRound(prev => prev + 1);
    initializeRound();
  };
  
  // Mengakhiri game
  const endGame = () => {
    const finalEntry = {
      playerName,
      score,
      date: new Date().toLocaleDateString('id-ID'),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    const allHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    allHistory.push(finalEntry);
    localStorage.setItem('gameHistory', JSON.stringify(allHistory));
    
    setGameStarted(false);
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    const element = document.documentElement;
    
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestfullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  
  // Effect untuk fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Load history dari localStorage
  const loadHistory = () => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
      return savedHistory.slice(-5);
    } catch {
      return [];
    }
  };
  
  const history = loadHistory();
  
  // Render layar awal
  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f9fafb' }}>
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8" style={{ borderColor: '#e5e7eb', borderWidth: 2 }}>
          <h1 className="text-4xl font-bold mb-6 text-center" style={{ color: '#355485' }}>
            🎮 Game Timbangan Hewan & Buah 🎮
          </h1>
          
          <div className="mb-8 p-6 rounded-xl" style={{ backgroundColor: '#cbdde9' }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2a436c' }}>📋 Aturan Game:</h2>
            <ul className="space-y-3 text-lg" style={{ color: '#6b7280' }}>
              <li className="flex items-start">
                <span className="mr-2">🎯</span>
                <span>Ada <strong>10 level</strong> yang harus kamu selesaikan</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚖️</span>
                <span>Perhatikan jumlah hewan/buah di kedua sisi timbangan</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span><strong>Sisi yang lebih banyak akan TURUN</strong>, yang lebih sedikit NAIK</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🤔</span>
                <span>Pilih tanda yang tepat: <strong>Lebih Banyak (&gt;)</strong>, <strong>Lebih Sedikit (&lt;)</strong>, atau <strong>Sama Dengan (=)</strong></span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⭐</span>
                <span>Dapatkan <strong>10 poin</strong> untuk setiap jawaban benar</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔊</span>
                <span>Dengarkan suara untuk tahu jawaban benar atau salah</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏆</span>
                <span>Raih skor tertinggi dan masuk ke papan sejarah!</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-8">
            <label className="block text-lg font-medium mb-3" style={{ color: '#355485' }}>
              👶 Masukkan Nama Kamu:
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 text-lg rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                borderColor: '#90b6d5',
                backgroundColor: '#ffffff',
                color: '#2a436c'
              }}
              placeholder="Nama panggilan kamu..."
              maxLength={20}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={startGame}
              disabled={!playerName.trim()}
              className="px-8 py-4 text-xl font-bold rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                backgroundColor: playerName.trim() ? '#4f90c6' : '#9ca3af',
                color: '#ffffff'
              }}
            >
              🚀 Mulai Bermain!
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="px-8 py-4 text-xl font-bold rounded-xl border-2 transition-all transform hover:scale-105 active:scale-95"
              style={{ 
                borderColor: '#4f90c6',
                color: '#4f90c6',
                backgroundColor: '#ffffff'
              }}
            >
              {isFullscreen ? '📱 Keluar Fullscreen' : '🖥️ Main Fullscreen'}
            </button>
          </div>
          
          {history.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-4 text-center" style={{ color: '#2a436c' }}>🏆 Sejarah Pemenang:</h3>
              <div className="overflow-x-auto rounded-xl" style={{ borderColor: '#e5e7eb', borderWidth: 2 }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ backgroundColor: '#90b6d5' }}>
                      <th className="p-3 text-left rounded-tl-xl" style={{ color: '#2a436c' }}>Nama</th>
                      <th className="p-3 text-left" style={{ color: '#2a436c' }}>Skor</th>
                      <th className="p-3 text-left rounded-tr-xl" style={{ color: '#2a436c' }}>Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((entry, index) => (
                      <tr 
                        key={index} 
                        style={{ 
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                          color: '#6b7280'
                        }}
                      >
                        <td className="p-3">{entry.playerName}</td>
                        <td className="p-3 font-bold" style={{ color: '#4f90c6' }}>{entry.score}</td>
                        <td className="p-3">{entry.date} {entry.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center" style={{ color: '#9ca3af' }}>
          <p>Game ini dibuat untuk melatih kemampuan matematika anak-anak</p>
          <p className="text-sm mt-2">🌟 Selamat Bermain dan Belajar! 🌟</p>
        </div>
      </div>
    );
  }
  
  // Render game screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f9fafb' }}>
      {/* Header Info */}
      <div className="w-full max-w-4xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#cbdde9' }}>
            <span className="font-bold text-lg" style={{ color: '#2a436c' }}>👤 {playerName}</span>
          </div>
          <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#cbdde9' }}>
            <span className="font-bold text-lg" style={{ color: '#2a436c' }}>⭐ Skor: {score}</span>
          </div>
          <div className="px-4 py-2 rounded-xl" style={{ backgroundColor: '#cbdde9' }}>
            <span className="font-bold text-lg" style={{ color: '#2a436c' }}>🎯 Level: {currentRound}/10</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={toggleFullscreen}
            className="px-4 py-2 rounded-xl border-2 transition-all hover:scale-105"
            style={{ 
              borderColor: '#4f90c6',
              color: '#4f90c6',
              backgroundColor: '#ffffff'
            }}
          >
            {isFullscreen ? '📱 Normal' : '🖥️ Fullscreen'}
          </button>
          
          <button
            onClick={endGame}
            className="px-4 py-2 rounded-xl transition-all hover:scale-105"
            style={{ 
              backgroundColor: '#355485',
              color: '#ffffff'
            }}
          >
            Selesai
          </button>
        </div>
      </div>
      
      {/* Tipe Item */}
      <div className="mb-4">
        <div className="px-6 py-2 rounded-full" style={{ backgroundColor: '#4f90c6' }}>
          <span className="text-xl font-bold text-white">
            {itemsType === 'animals' ? '🐾 Hewan Lucu 🐾' : '🍎 Buah Segar 🍎'}
          </span>
        </div>
      </div>
      
      {/* Game Container */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-6" style={{ borderColor: '#e5e7eb', borderWidth: 2 }}>
        {/* Timbangan */}
        <div className="relative h-96 mb-12">
          {/* Base Timbangan */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-6 rounded-full" style={{ backgroundColor: '#9ca3af' }}></div>
          
          {/* Stand Timbangan */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-3 h-40" style={{ backgroundColor: '#6b7280' }}></div>
          
          {/* Beam Timbangan */}
          <div 
            className={`absolute top-32 left-1/2 transform -translate-x-1/2 w-96 h-6 transition-all duration-700 ${
              scaleTilt === 'left-down' ? 'rotate-3' : 
              scaleTilt === 'right-down' ? '-rotate-3' : 
              scaleTilt === 'left-up-wrong' ? '-rotate-3' : 
              scaleTilt === 'right-up-wrong' ? 'rotate-3' : 
              scaleTilt === 'balanced-wrong' ? 'shake' : 
              ''
            }`}
            style={{ backgroundColor: '#2a436c' }}
          >
            {/* Left Scale Pan */}
            <div className={`absolute -left-56 w-56 h-56 rounded-full border-4 flex flex-wrap justify-center items-center p-4 overflow-hidden transition-all duration-500 ${
              scaleTilt === 'left-down' ? 'scale-pan-down' : 
              scaleTilt === 'right-down' ? 'scale-pan-up' : 
              scaleTilt === 'left-up-wrong' ? 'scale-pan-up' : 
              scaleTilt === 'right-up-wrong' ? 'scale-pan-down' : 
              'scale-pan-balanced'
            }`}
              style={{ 
                borderColor: '#4f90c6',
                backgroundColor: '#cbdde9'
              }}>
              {leftItems.map((item, index) => (
                <span 
                  key={index} 
                  className="text-2xl m-1"
                  style={{ 
                    animation: `bounce ${1.5 + index * 0.1}s infinite alternate`,
                    display: 'inline-block'
                  }}
                >
                  {item}
                </span>
              ))}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full" style={{ backgroundColor: '#4f90c6' }}>
                <span className="font-bold text-white text-lg">{leftCount}</span>
              </div>
            </div>
            
            {/* Right Scale Pan */}
            <div className={`absolute -right-56 w-56 h-56 rounded-full border-4 flex flex-wrap justify-center items-center p-4 overflow-hidden transition-all duration-500 ${
              scaleTilt === 'right-down' ? 'scale-pan-down' : 
              scaleTilt === 'left-down' ? 'scale-pan-up' : 
              scaleTilt === 'right-up-wrong' ? 'scale-pan-up' : 
              scaleTilt === 'left-up-wrong' ? 'scale-pan-down' : 
              'scale-pan-balanced'
            }`}
              style={{ 
                borderColor: '#4f90c6',
                backgroundColor: '#cbdde9'
              }}>
              {rightItems.map((item, index) => (
                <span 
                  key={index} 
                  className="text-2xl m-1"
                  style={{ 
                    animation: `bounce ${1.5 + index * 0.1}s infinite alternate`,
                    display: 'inline-block'
                  }}
                >
                  {item}
                </span>
              ))}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full" style={{ backgroundColor: '#4f90c6' }}>
                <span className="font-bold text-white text-lg">{rightCount}</span>
              </div>
            </div>
          </div>
          
          {/* Pivot Point */}
          <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full" style={{ backgroundColor: '#355485' }}></div>
        </div>
        
        {/* Pertanyaan */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#2a436c' }}>
            Mana yang lebih banyak?
          </h2>
          <p className="text-xl" style={{ color: '#6b7280' }}>
            Sisi dengan jumlah lebih banyak akan turun
          </p>
        </div>
        
        {/* Pilihan Jawaban - TRIGGER SOUND LANGSUNG DI BUTTON */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
          {[
            { symbol: '>', label: 'Kiri Lebih Banyak', color: '#4f90c6' },
            { symbol: '<', label: 'Kanan Lebih Banyak', color: '#4f90c6' },
            { symbol: '=', label: 'Sama Dengan', color: '#4f90c6' }
          ].map((option) => (
            <button
              key={option.symbol}
              onClick={() => handleAnswer(option.symbol)} // Semua dalam satu fungsi
              disabled={showResult}
              className={`flex flex-col items-center p-6 rounded-2xl transition-all w-full sm:w-auto min-w-[180px] ${
                selectedAnswer === option.symbol ? 'ring-4 ring-offset-2 scale-105' : 'hover:scale-105'
              } ${showResult && selectedAnswer === option.symbol ? (isCorrect ? 'animate-pulse' : 'animate-shake') : ''}`}
              style={{ 
                backgroundColor: selectedAnswer === option.symbol ? option.color : '#90b6d5',
                color: '#ffffff',
                borderColor: option.color,
                borderWidth: 3,
                ringColor: option.color
              }}
            >
              <span className="text-6xl mb-3">{option.symbol}</span>
              <span className="text-lg font-bold text-center">{option.label}</span>
            </button>
          ))}
        </div>
        
        {/* Hasil */}
        {showResult && (
          <div className={`mt-8 p-6 rounded-2xl text-center ${
            isCorrect ? 'animate-bounce-slow' : 'animate-shake'
          }`}
            style={{ 
              backgroundColor: isCorrect ? '#cbdde9' : '#f9fafb',
              borderColor: isCorrect ? '#4f90c6' : '#9ca3af',
              borderWidth: 3
            }}>
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-4">
                {isCorrect ? '🎉' : '😅'}
              </span>
              <h3 className="text-3xl font-bold mb-2" style={{ color: isCorrect ? '#2a436c' : '#6b7280' }}>
                {isCorrect ? 'Horee! Benar!' : 'Ups, coba lagi!'}
              </h3>
              <p className="text-xl mb-4" style={{ color: '#6b7280' }}>
                Kiri: {leftCount} | Kanan: {rightCount}
                <br />
                {isCorrect ? 
                  'Jawaban kamu benar!' : 
                  `Jawaban yang benar adalah: ${leftCount > rightCount ? '>' : leftCount < rightCount ? '<' : '='}`
                }
              </p>
              
              <button
                onClick={nextRound}
                className="px-8 py-3 text-xl font-bold rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{ 
                  backgroundColor: '#4f90c6',
                  color: '#ffffff'
                }}
              >
                {currentRound < 10 ? 'Lanjut Level Berikutnya →' : 'Lihat Hasil Akhir'}
              </button>
            </div>
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="mt-8">
          <div className="flex justify-between mb-2">
            <span className="font-bold" style={{ color: '#2a436c' }}>Progress Game</span>
            <span className="font-bold" style={{ color: '#4f90c6' }}>{Math.round((currentRound / 10) * 100)}%</span>
          </div>
          <div className="w-full h-4 rounded-full overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${(currentRound / 10) * 100}%`,
                backgroundColor: '#4f90c6'
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Petunjuk */}
      <div className="mt-6 text-center" style={{ color: '#9ca3af' }}>
        <p>⚖️ <strong>PENTING:</strong> Sisi yang LEBIH BANYAK akan TURUN!</p>
        <p className="text-sm mt-1">Perhatikan baik-baik pergerakan timbangan!</p>
      </div>
      
      {/* History Round */}
      {gameHistory.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <h3 className="text-xl font-bold mb-3" style={{ color: '#2a436c' }}>📝 History Jawaban:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {gameHistory.slice(-5).map((round, index) => (
              <div 
                key={index} 
                className="p-3 rounded-lg text-center"
                style={{ 
                  backgroundColor: round.correct ? '#cbdde9' : '#f9fafb',
                  borderColor: round.correct ? '#4f90c6' : '#9ca3af',
                  borderWidth: 2,
                  color: '#6b7280'
                }}
              >
                <div className="font-bold">Level {round.round}</div>
                <div className="text-sm">{round.leftCount} {round.answer} {round.rightCount}</div>
                <div className="text-lg">{round.correct ? '✅' : '❌'}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Styling untuk animasi */}
      <style jsx>{`
        /* Animasi umum */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        /* Animasi piringan timbangan */
        .scale-pan-down {
          top: 24px !important;
          animation: panDown 0.7s ease-out;
        }
        
        .scale-pan-up {
          top: 8px !important;
          animation: panUp 0.7s ease-out;
        }
        
        .scale-pan-balanced {
          top: 16px !important;
        }
        
        /* Keyframes untuk animasi spesifik */
        @keyframes panDown {
          0% { top: 16px; }
          50% { top: 28px; }
          100% { top: 24px; }
        }
        
        @keyframes panUp {
          0% { top: 16px; }
          50% { top: 4px; }
          100% { top: 8px; }
        }
        
        /* Class utility untuk animasi */
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-bounce-slow {
          animation: bounceSlow 1s ease-in-out infinite;
        }
        
        /* Style untuk hover effects */
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}