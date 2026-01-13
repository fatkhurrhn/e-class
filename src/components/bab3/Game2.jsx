import React, { useState, useEffect, useRef } from 'react';

function Game2() {
  // State untuk game
  const [playerName, setPlayerName] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [mute, setMute] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameHistory, setGameHistory] = useState([]);
  
  const gameContainerRef = useRef(null);
  const mainContainerRef = useRef(null);
  
  // Template soal cerita yang lebih menarik dengan highlight
  const questionTemplates = [
    { 
      template: "Di kebun ada **{x}** **{object}**. **{y}** **{action}**. Berapa **{object}** yang masih ada?",
      objects: ["kupu-kupu", "burung", "semut", "capung", "lebah", "belalang", "ulat", "katak", "cicak", "jangkrik"],
      actions: ["terbang ke bunga", "hinggap di ranting", "masuk ke sarang", "berhenti di daun", "menghisap madu", "melompat jauh", "berubah menjadi kepompong", "meloncat ke kolam", "merayap di dinding", "bersembunyi di rumput"]
    },
    { 
      template: "Rina memelihara **{x}** **{object}** kecil. **{y}** **{action}**. Tinggal berapa **{object}** nya?",
      objects: ["ikan mas", "ikan cupang", "kura-kura", "hamster", "kelinci", "ayam", "bebek", "burung kicau", "kucing", "anjing"],
      actions: ["diberi makan", "dipindahkan akuarium", "berjemur sinar matahari", "lari di roda", "makan wortel", "berkokok merdu", "berenang di kolam", "berkicau riang", "mengejar bola", "menggonggong gembira"]
    },
    { 
      template: "Ibu membeli **{x}** **{object}** segar. **{y}** **{action}**. Berapa **{object}** yang belum diolah?",
      objects: ["apel merah", "jeruk manis", "pisang ambon", "anggur hijau", "stroberi", "mangga", "rambutan", "salak", "jambu", "semangka"],
      actions: ["dibuat jus sehat", "dikupas kulitnya", "digoreng jadi pisang goreng", "dibuat jelly", "dihias atas kue", "dipotong dadu", "dibagi ke tetangga", "dikupas isinya", "dicuci bersih", "dipotong segitiga"]
    },
    { 
      template: "Budi punya **{x}** **{object}** mainan. **{y}** **{action}**. Berapa **{object}** yang masih utuh?",
      objects: ["bola basket", "mobil remote", "robot-robotan", "boneka", "lego", "puzzle", "layang-layang", "gasing", "yoyo", "frisbee"],
      actions: ["ditendang ke gawang", "dikendalikan remote", "berjalan sendiri", "diganti bajunya", "disusun jadi rumah", "diselesaikan gambarnya", "diterbangkan tinggi", "diputar cepat", "dinaik-turunkan", "dilempar ke teman"]
    },
    { 
      template: "Di meja ada **{x}** **{object}** warna-warni. **{y}** **{action}**. Berapa **{object}** yang belum dipakai?",
      objects: ["pensil warna", "spidol", "krayon", "cat air", "kuas lukis", "penghapus", "penggaris", "buku gambar", "gunting", "lem stick"],
      actions: ["diasah sampai runcing", "ditutup rapat", "dipakai mewarnai", "dicampur warna baru", "dicuci bersih", "dipakai menghapus", "digaris lurus", "digambar pemandangan", "digunting kertas", "direkatkan gambar"]
    }
  ];

  // Fungsi untuk format teks dengan highlight
  const formatQuestionText = (text, x, y, object, action) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        
        // Angka {x} dan {y} - warna berbeda
        if (content === `{x}`) {
          return (
            <span 
              key={index} 
              className="font-bold px-1 rounded inline-block mx-1"
              style={{ 
                backgroundColor: '#FF6B6B',
                color: '#FFFFFF',
                padding: '2px 8px',
                fontSize: '1.2em',
                minWidth: '30px',
                textAlign: 'center'
              }}
            >
              {x}
            </span>
          );
        }
        
        if (content === `{y}`) {
          return (
            <span 
              key={index} 
              className="font-bold px-1 rounded inline-block mx-1"
              style={{ 
                backgroundColor: '#4ECDC4',
                color: '#FFFFFF',
                padding: '2px 8px',
                fontSize: '1.2em',
                minWidth: '30px',
                textAlign: 'center'
              }}
            >
              {y}
            </span>
          );
        }
        
        // Kata benda (object) - highlight dengan warna berbeda
        if (content === `{object}`) {
          return (
            <span 
              key={index} 
              className="font-bold italic px-1 rounded inline-block mx-1"
              style={{ 
                backgroundColor: '#FFD166',
                color: '#355485',
                padding: '2px 8px',
                borderBottom: '2px solid #FF9F43'
              }}
            >
              {object}
            </span>
          );
        }
        
        // Kata aksi (action)
        if (content === `{action}`) {
          return (
            <span 
              key={index} 
              className="font-semibold px-1 inline-block mx-1"
              style={{ 
                color: '#4f90c6',
                borderBottom: '2px dashed #90b6d5'
              }}
            >
              {action}
            </span>
          );
        }
        
        return content;
      }
      return part;
    });
  };
  
  // Generate soal baru
  const generateQuestion = () => {
    const template = questionTemplates[Math.floor(Math.random() * questionTemplates.length)];
    const objectIndex = Math.floor(Math.random() * template.objects.length);
    const object = template.objects[objectIndex];
    const action = template.actions[objectIndex];
    const x = Math.floor(Math.random() * 10) + 1;
    const y = Math.floor(Math.random() * x) + 1;
    const answer = x - y;
    
    // Generate pilihan jawaban
    const answers = [answer];
    while (answers.length < 4) {
      const randomAnswer = Math.floor(Math.random() * 11);
      if (!answers.includes(randomAnswer) && randomAnswer !== answer) {
        answers.push(randomAnswer);
      }
    }
    
    // Acak urutan jawaban
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
    
    return {
      question: template.template,
      answers: shuffledAnswers,
      correctAnswer: answer,
      x,
      y,
      object,
      action,
      formattedQuestion: formatQuestionText(template.template, x, y, object, action)
    };
  };
  
  // Fungsi untuk memainkan suara
  const playSound = (type) => {
    if (mute) return;
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
      // Suara untuk jawaban benar - lebih cerah
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
      
      gainNode.gain.setValueAtTime(0.8, audioContext.currentTime); // Volume tinggi
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } else if (type === 'wrong') {
      // Suara untuk jawaban salah
      oscillator.frequency.setValueAtTime(196.00, audioContext.currentTime); // G3
      oscillator.frequency.setValueAtTime(174.61, audioContext.currentTime + 0.1); // F3
      oscillator.frequency.setValueAtTime(155.56, audioContext.currentTime + 0.2); // D#3
      
      gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } else if (type === 'click') {
      // Suara untuk klik tombol
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A4
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    }
  };
  
  // Fungsi untuk toggle fullscreen
  const toggleFullscreen = () => {
    playSound('click');
    
    if (!document.fullscreenElement) {
      const elem = gameStarted ? gameContainerRef.current : mainContainerRef.current;
      if (elem && elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem && elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem && elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestfullscreen();
      } else if (elem && elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };
  
  // Inisialisasi game
  const startGame = () => {
    playSound('click');
    
    if (!playerName.trim()) {
      alert('Masukkan nama dulu ya!');
      return;
    }
    
    setGameStarted(true);
    setCurrentQuestion(generateQuestion());
    setQuestionCount(1);
  };
  
  // Handle jawaban
  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;
    
    playSound('click');
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    // Play sound
    if (!mute) {
      if (correct) {
        playSound('correct');
      } else {
        playSound('wrong');
        setShowHint(true);
      }
    }
    
    // Update score
    if (correct) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    
    // Next question setelah delay
    setTimeout(() => {
      if (questionCount >= 10) {
        finishGame();
      } else {
        nextQuestion();
      }
    }, correct ? 1500 : 2000);
  };
  
  // Soal berikutnya
  const nextQuestion = () => {
    setCurrentQuestion(generateQuestion());
    setQuestionCount(questionCount + 1);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
  };
  
  // Selesai game
  const finishGame = () => {
    playSound('correct'); // Mainkan suara kemenangan
    
    const finalScore = score;
    const historyEntry = {
      name: playerName,
      score: finalScore,
      date: new Date().toLocaleDateString('id-ID'),
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };
    
    // Simpan ke history
    const updatedHistory = [...gameHistory, historyEntry];
    setGameHistory(updatedHistory);
    localStorage.setItem('game2_history', JSON.stringify(updatedHistory));
    
    setGameFinished(true);
    
    // Keluar dari fullscreen jika di game
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };
  
  // Restart game
  const restartGame = () => {
    playSound('click');
    setScore(0);
    setStreak(0);
    setQuestionCount(0);
    setGameFinished(false);
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
  };
  
  // Load history dari localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('game2_history');
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory));
    }
    
    // Handle fullscreen change
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    // Handle key press untuk keluar fullscreen dengan ESC
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Efek confetti untuk jawaban benar
  const ConfettiEffect = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#FF9F43', '#9D4EDD'][i % 5],
            borderRadius: i % 2 ? '50%' : '0',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s'
          }}
        ></div>
      ))}
    </div>
  );

  // Visualisasi benda
  const ObjectVisualization = ({ x, y, object }) => {
    const getIcon = (obj) => {
      const icons = {
        // Hewan
        "kupu-kupu": "🦋", "burung": "🐦", "semut": "🐜", "capung": "🐞", "lebah": "🐝",
        "belalang": "🦗", "ulat": "🐛", "katak": "🐸", "cicak": "🦎", "jangkrik": "🦗",
        "ikan mas": "🐠", "ikan cupang": "🐟", "kura-kura": "🐢", "hamster": "🐹", "kelinci": "🐰",
        "ayam": "🐔", "bebek": "🦆", "burung kicau": "🐤", "kucing": "🐱", "anjing": "🐶",
        
        // Buah
        "apel merah": "🍎", "jeruk manis": "🍊", "pisang ambon": "🍌", "anggur hijau": "🍇", "stroberi": "🍓",
        "mangga": "🥭", "rambutan": "🍈", "salak": "🐍", "jambu": "🍐", "semangka": "🍉",
        
        // Mainan
        "bola basket": "🏀", "mobil remote": "🚗", "robot-robotan": "🤖", "boneka": "🧸", "lego": "🧱",
        "puzzle": "🧩", "layang-layang": "🪁", "gasing": "🪀", "yoyo": "🪀", "frisbee": "🥏",
        
        // Alat tulis
        "pensil warna": "✏️", "spidol": "🖊️", "krayon": "🖍️", "cat air": "🎨", "kuas lukis": "🖌️",
        "penghapus": "🧽", "penggaris": "📏", "buku gambar": "📒", "gunting": "✂️", "lem stick": "🧴",
      };
      
      return icons[obj] || "🔢";
    };
    
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {Array.from({ length: x }).map((_, i) => (
          <div
            key={i}
            className={`flex flex-col items-center transition-all duration-500 ${
              i < y 
                ? 'opacity-40 scale-75 transform -translate-y-2' 
                : 'opacity-100 animate-bounce'
            }`}
          >
            <div className="text-2xl md:text-3xl">
              {getIcon(object)}
            </div>
            <div 
              className={`text-xs font-bold mt-1 px-2 py-1 rounded-full ${
                i < y ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}
            >
              {i < y ? 'pergi' : 'sisa'}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Kalkulator visual
  const VisualCalculator = ({ x, y }) => (
    <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
      <div className="text-center font-bold mb-2" style={{ color: '#355485' }}>
        🧮 Hitung Bersama:
      </div>
      <div className="flex items-center justify-center gap-2 text-lg">
        <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#FF6B6B', color: 'white' }}>
          {x}
        </div>
        <div className="px-2" style={{ color: '#355485' }}>−</div>
        <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#4ECDC4', color: 'white' }}>
          {y}
        </div>
        <div className="px-2" style={{ color: '#355485' }}>=</div>
        <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#FFD166', color: '#355485', border: '2px solid #FF9F43' }}>
          {x - y}
        </div>
      </div>
    </div>
  );
  
  // Tampilan awal
  if (!gameStarted) {
    return (
      <div 
        ref={mainContainerRef}
        className="min-h-screen flex flex-col items-center justify-center p-4 relative"
        style={{ backgroundColor: '#f9fafb' }}
      >
        {/* Header dengan tombol fullscreen di kanan atas */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:scale-105 transition-transform"
            style={{ 
              backgroundColor: '#4f90c6',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(79, 144, 198, 0.3)'
            }}
          >
            <span className="text-lg">{isFullscreen ? '✕' : '⛶'}</span>
            <span className="font-medium">Fullscreen</span>
          </button>
        </div>
        
        <div className="max-w-2xl w-full relative z-10">
          <div 
            className="rounded-2xl p-8 shadow-lg"
            style={{ backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}
          >
            <h1 
              className="text-3xl font-bold text-center mb-6"
              style={{ color: '#355485' }}
            >
              Game Matematika Seru
            </h1>
            
            {/* Gambar kecil di atas input nama */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4" style={{ borderColor: '#cbdde9' }}>
                <img 
                  src="https://img.freepik.com/vektor-premium/ilustrasi-kartun-islami-tentang-pasangan-muslim-yang-memberi-salam-dengan-lambaian-tangan_207579-900.jpg?w=200" 
                  alt="Pasangan Muslim"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/128x128/f0f7ff/355485?text=👨‍👩';
                  }}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label 
                className="block text-lg mb-2 font-semibold text-center"
                style={{ color: '#355485' }}
              >
                Masukkan Nama Kamu:
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="w-full p-3 text-lg rounded-lg border-2 focus:outline-none focus:ring-2 transition-all text-center"
                style={{ 
                  borderColor: '#cbdde9',
                  backgroundColor: '#ffffff',
                  color: '#355485'
                }}
                placeholder="Tulis nama kamu di sini..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') startGame();
                }}
              />
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#355485' }}>
                Cara Bermain:
              </h3>
              <ul className="list-disc pl-5 space-y-2" style={{ color: '#6b7280' }}>
                <li>Baca <span className="font-bold text-[#FF6B6B]">soal cerita</span> dengan teliti</li>
                <li>Perhatikan <span className="font-bold text-[#4ECDC4]">angka yang dikurangi</span></li>
                <li>Perhatikan <span className="font-bold text-[#FFD166]">nama benda yang sama</span></li>
                <li>Pilih jawaban yang benar dari 4 pilihan</li>
                <li>Dapatkan skor tertinggi!</li>
                <li>Ada 10 soal seru menantang</li>
              </ul>
            </div>
            
            {/* Kontrol suara */}
            <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff', border: '2px solid #cbdde9' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🔊</span>
                  <div>
                    <div className="font-semibold" style={{ color: '#355485' }}>Efek Suara</div>
                    <div className="text-sm" style={{ color: '#6b7280' }}>Hidupkan untuk pengalaman lebih seru</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!mute}
                    onChange={(e) => {
                      playSound('click');
                      setMute(!e.target.checked);
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#4f90c6]"></div>
                </label>
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="w-full py-4 text-lg font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 mb-4"
              style={{ 
                backgroundColor: '#4f90c6',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(79, 144, 198, 0.3)'
              }}
            >
              MULAI BERMAIN
            </button>
            
            {/* History Section */}
            {gameHistory.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: '#355485' }}>
                  Riwayat Permainan
                </h3>
                <div className="max-h-48 overflow-y-auto">
                  {gameHistory.slice(-5).reverse().map((entry, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 mb-2 rounded-lg"
                      style={{ 
                        backgroundColor: '#f0f7ff',
                        border: '1px solid #cbdde9'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg" style={{ color: '#4f90c6' }}>👤</span>
                        <span style={{ color: '#355485' }}>{entry.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold" style={{ color: '#4f90c6' }}>{entry.score}/10</span>
                        <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                          {entry.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Tampilan game selesai
  if (gameFinished) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ backgroundColor: '#f9fafb' }}
      >
        {/* Tombol fullscreen di kanan atas */}
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:scale-105 transition-transform"
            style={{ 
              backgroundColor: '#4f90c6',
              color: '#ffffff'
            }}
          >
            <span className="text-lg">{isFullscreen ? '✕' : '⛶'}</span>
            <span className="font-medium">Fullscreen</span>
          </button>
        </div>
        
        <div 
          className="max-w-md w-full rounded-2xl p-8 shadow-lg text-center"
          style={{ backgroundColor: '#ffffff', border: '2px solid #e5e7eb' }}
        >
          <h1 
            className="text-3xl font-bold mb-6"
            style={{ color: '#355485' }}
          >
            Selamat {playerName}!
          </h1>
          
          <div className="text-5xl font-bold mb-2" style={{ color: '#4f90c6' }}>
            {score}/10
          </div>
          <div style={{ color: '#6b7280' }}>
            Skor Akhir
          </div>
          
          <div className="mb-8 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: '#355485' }}>
              Hasil Kamu:
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div style={{ color: '#6b7280' }}>Benar</div>
                <div className="text-2xl font-bold" style={{ color: '#4f90c6' }}>{score}</div>
              </div>
              <div>
                <div style={{ color: '#6b7280' }}>Salah</div>
                <div className="text-2xl font-bold" style={{ color: '#4f90c6' }}>{10 - score}</div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={restartGame}
              className="flex-1 py-3 font-bold rounded-lg transition-transform hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: '#4f90c6',
                color: '#ffffff'
              }}
            >
              Main Lagi
            </button>
            <button
              onClick={() => {
                playSound('click');
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                }
                setGameStarted(false);
                setGameFinished(false);
              }}
              className="flex-1 py-3 font-bold rounded-lg transition-transform hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: '#90b6d5',
                color: '#ffffff'
              }}
            >
              Menu Utama
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Tampilan game sedang berjalan
  return (
    <div 
      ref={gameContainerRef}
      className="min-h-screen p-4 relative"
      style={{ backgroundColor: '#f9fafb' }}
    >
      {/* Header dengan tombol fullscreen di kanan atas */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:scale-105 transition-transform"
          style={{ 
            backgroundColor: '#4f90c6',
            color: '#ffffff'
          }}
        >
          <span className="text-lg">{isFullscreen ? '✕' : '⛶'}</span>
          <span className="font-medium">Fullscreen</span>
        </button>
      </div>
      
      <div className="max-w-4xl mx-auto pt-12">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <button
            onClick={() => {
              playSound('click');
              if (document.fullscreenElement) {
                document.exitFullscreen();
              }
              setGameStarted(false);
            }}
            className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: '#90b6d5',
              color: '#ffffff'
            }}
          >
            ← Kembali ke Menu
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSound('click');
                setMute(!mute);
              }}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              style={{ 
                backgroundColor: mute ? '#FF6B6B' : '#4f90c6',
                color: '#ffffff'
              }}
            >
              {mute ? '🔇 Suara Mati' : '🔊 Suara Hidup'}
            </button>
          </div>
        </div>
        
        {/* Game Container - Fokus ke soal panjang */}
        <div 
          className="rounded-2xl p-6 mb-6 relative overflow-hidden"
          style={{ 
            backgroundColor: '#ffffff',
            border: '2px solid #e5e7eb',
            minHeight: 'calc(100vh - 200px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}
        >
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span style={{ color: '#355485' }}>
                Soal: {questionCount}/10
              </span>
              <span style={{ color: '#4f90c6' }}>
                Streak: {streak}
              </span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${(questionCount / 10) * 100}%`,
                  backgroundColor: '#4f90c6'
                }}
              ></div>
            </div>
          </div>
          
          {/* Score Display */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#355485' }}>
                {score}
              </div>
              <div style={{ color: '#6b7280' }}>Skor</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: '#355485' }}>
                {playerName}
              </div>
              <div style={{ color: '#6b7280' }}>Pemain</div>
            </div>
          </div>
          
          {/* Question Area - Fokus ke soal panjang */}
          <div className="mb-8">
            {/* Bubble soal yang lebih besar */}
            <div 
              className="p-6 rounded-2xl relative mb-6"
              style={{ 
                backgroundColor: '#f0f7ff',
                border: '2px solid #cbdde9',
                boxShadow: '0 4px 12px rgba(79, 144, 198, 0.1)'
              }}
            >
              <div className="text-xl md:text-2xl leading-relaxed mb-4" style={{ color: '#355485' }}>
                {currentQuestion?.formattedQuestion}
              </div>
              
              {/* Visualisasi benda */}
              {currentQuestion && (
                <ObjectVisualization 
                  x={currentQuestion.x} 
                  y={currentQuestion.y} 
                  object={currentQuestion.object} 
                />
              )}
              
              {isCorrect && <ConfettiEffect />}
            </div>
            
            {/* Kalkulator visual untuk hint */}
            {showHint && (
              <div className="mb-6 animate-fadeIn">
                <VisualCalculator x={currentQuestion?.x} y={currentQuestion?.y} />
                <div 
                  className="mt-4 p-4 rounded-lg animate-pulse"
                  style={{ 
                    backgroundColor: '#FFF3CD',
                    border: '2px solid #FFD700'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span>💡</span>
                    <span style={{ color: '#856404' }}>
                      Lihat! Ada <span className="font-bold">{currentQuestion?.x}</span> {currentQuestion?.object}, 
                      <span className="font-bold"> {currentQuestion?.y}</span> {currentQuestion?.action}.
                      Hitung sisanya!
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Answer Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion?.answers.map((answer, index) => {
                let buttonStyle = {};
                if (selectedAnswer !== null) {
                  if (answer === currentQuestion.correctAnswer) {
                    buttonStyle = {
                      backgroundColor: '#4CAF50',
                      color: '#ffffff',
                      transform: 'scale(1.05)',
                      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
                    };
                  } else if (answer === selectedAnswer && answer !== currentQuestion.correctAnswer) {
                    buttonStyle = {
                      backgroundColor: '#FF6B6B',
                      color: '#ffffff',
                      animation: 'shake 0.5s'
                    };
                  }
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer)}
                    disabled={selectedAnswer !== null}
                    className="p-6 text-2xl font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-80 relative group"
                    style={{
                      backgroundColor: selectedAnswer === null ? '#4f90c6' : buttonStyle.backgroundColor || '#cbdde9',
                      color: selectedAnswer === null ? '#ffffff' : buttonStyle.color || '#6b7280',
                      border: '3px solid',
                      borderColor: selectedAnswer === null ? '#90b6d5' : buttonStyle.backgroundColor || '#e5e7eb',
                      animation: buttonStyle.animation,
                      ...buttonStyle
                    }}
                  >
                    {answer}
                    {selectedAnswer === null && (
                      <span className="absolute top-2 right-2 text-sm opacity-50">
                        {String.fromCharCode(65 + index)}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            
            {/* Feedback */}
            {isCorrect !== null && (
              <div 
                className={`mt-6 p-4 rounded-lg text-center text-xl font-bold animate-bounce ${isCorrect ? 'animate-pulse' : ''}`}
                style={{ 
                  backgroundColor: isCorrect ? '#D4EDDA' : '#F8D7DA',
                  color: isCorrect ? '#155724' : '#721C24',
                  border: `2px solid ${isCorrect ? '#C3E6CB' : '#F5C6CB'}`,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {isCorrect ? 'Hore! Jawabanmu Benar!' : 'Belum tepat, coba lagi ya!'}
              </div>
            )}
          </div>
        </div>
        
        {/* Legend Warna */}
        <div className="flex flex-wrap justify-center gap-4 mb-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#FF6B6B' }}></div>
            <span className="text-sm font-medium" style={{ color: '#355485' }}>Angka pertama</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#4ECDC4' }}></div>
            <span className="text-sm font-medium" style={{ color: '#355485' }}>Angka kedua</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#FFD166', border: '1px solid #FF9F43' }}></div>
            <span className="text-sm font-medium" style={{ color: '#355485' }}>Nama benda</span>
          </div>
        </div>
        
        {/* Game Info */}
        <div className="text-center text-sm p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff', color: '#6b7280' }}>
          <p>Game Matematika Seru - Belajar pengurangan dengan cara yang menyenangkan!</p>
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Game2;