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
  const [gameMode, setGameMode] = useState(null); // 'penjumlahan' atau 'pengurangan'
  
  const gameContainerRef = useRef(null);
  const mainContainerRef = useRef(null);
  
  // Template soal cerita penjumlahan (angka 11-20)
  const additionTemplates = [
    { 
      template: "Di toko ada **{x}** **{object}**. Kemudian datang **{y}** **{object}** lagi. Berapa total **{object}** sekarang?",
      objects: ["apel merah", "jeruk manis", "pisang ambon", "anggur hijau", "stroberi", "mangga", "rambutan", "salak", "jambu", "semangka"],
      variations: ["dibeli pelanggan", "dikirim dari gudang", "ditambahkan ke rak", "datang dari supplier", "diproduksi hari ini", "disimpan di etalase", "dibawa dari kebun", "diambil dari pohon", "dikemas dalam box", "ditumpuk di meja"]
    },
    { 
      template: "Rina memiliki **{x}** **{object}**. Ibu memberinya **{y}** **{object}** lagi. Berapa **{object}** Rina sekarang?",
      objects: ["buku cerita", "pensil warna", "boneka kecil", "mobil mainan", "bola plastik", "puzzle", "lego", "balon", "stiker", "permen"],
      variations: ["dibelikan ayah", "diberikan kakak", "di dapat dari sekolah", "diberikan teman", "diberikan nenek", "diberikan paman", "diberikan bibi", "diberikan saudara", "diberikan guru", "diberikan tetangga"]
    },
    { 
      template: "Di kebun binatang ada **{x}** **{object}**. Datang **{y}** **{object}** baru. Berapa **{object}** semuanya?",
      objects: ["kelinci putih", "burung kenari", "kucing anggora", "anjing kecil", "hamster lucu", "kura-kura", "ayam hutan", "bebek kuning", "monyet kecil", "tupai coklat"],
      variations: ["dikirim dari peternakan", "dibeli pengelola", "diadopsi dari penampungan", "diternakkan sendiri", "diberikan pengunjung", "ditemukan di hutan", "dilahirkan di kebun", "ditukar dengan kebun lain", "dibawa dari pasar", "diambil dari alam"]
    },
    { 
      template: "Di kelas ada **{x}** **{object}**. Guru membawa **{y}** **{object}** tambahan. Berapa jumlah **{object}** di kelas?",
      objects: ["meja belajar", "kursi plastik", "buku gambar", "papan tulis kecil", "lemari buku", "vas bunga", "jam dinding", "lampu belajar", "kipas angin", "AC portable"],
      variations: ["dibeli sekolah", "dikirim dinas pendidikan", "diberikan donatur", "dibawa dari gudang", "dipinjam dari kelas lain", "dibeli dari iuran", "diberikan orang tua murid", "dibeli dengan dana BOS", "dibawa dari rumah guru", "dibuat siswa"]
    },
    { 
      template: "Di taman ada **{x}** **{object}**. Ditanam lagi **{y}** **{object}**. Berapa **{object}** di taman sekarang?",
      objects: ["bunga mawar", "bunga matahari", "bunga anggrek", "bunga tulip", "bunga melati", "bunga lavender", "bunga kamboja", "bunga sepatu", "bunga kertas", "bunga teratai"],
      variations: ["oleh tukang kebun", "oleh siswa SD", "oleh ibu-ibu PKK", "oleh petugas dinas", "oleh sukarelawan", "oleh warga sekitar", "oleh anak-anak", "oleh penghobi tanaman", "oleh penjaga taman", "oleh pengunjung"]
    }
  ];

  // Template soal cerita pengurangan (angka 11-20)
  const subtractionTemplates = [
    { 
      template: "Di keranjang ada **{x}** **{object}**. **{y}** **{object}** **{action}**. Berapa **{object}** yang tersisa?",
      objects: ["apel merah", "jeruk manis", "pisang ambon", "anggur hijau", "stroberi", "mangga", "rambutan", "salak", "jambu", "semangka"],
      actions: ["dibeli ibu rumah tangga", "dibeli anak sekolah", "dibeli karyawan kantor", "dibeli pedagang kecil", "dibeli turis", "dibeli tamu", "dibeli tetangga", "dibeli sopir", "dibeli satpam", "dibeli guru"]
    },
    { 
      template: "Budi memiliki **{x}** **{object}**. **{y}** **{object}** **{action}**. Berapa **{object}** Budi sekarang?",
      objects: ["kelereng", "gasing", "yoyo", "layang-layang", "frisbee", "bola basket", "sepeda mini", "skuter", "skateboard", "roller blade"],
      actions: ["dipinjam teman sekolah", "dipinjam adik", "dipinjam tetangga", "dipinjam sepupu", "dipinjam anak pamannya", "dipinjam teman bermain", "dipinjam anak komplek", "dipinjam keponakan", "dipinjam murid bimbel", "dipinjam anak pengasuh"]
    },
    { 
      template: "Di kolam ada **{x}** **{object}**. **{y}** **{object}** **{action}**. Berapa **{object}** yang masih berenang?",
      objects: ["ikan mas", "ikan koi", "ikan cupang", "ikan guppy", "ikan nila", "ikan lele", "ikan bawal", "ikan patin", "ikan mujair", "ikan tawes"],
      actions: ["ditangkap untuk dimakan", "ditangkap untuk dijual", "ditangkap untuk koleksi", "ditangkap untuk lomba", "ditangkap untuk dipindah", "ditangkap untuk obat", "ditangkap untuk hadiah", "ditangkap untuk penelitian", "ditangkap untuk museum", "ditangkap untuk peliharaan baru"]
    },
    { 
      template: "Di perpustakaan ada **{x}** **{object}**. **{y}** **{object}** **{action}**. Berapa **{object}** yang masih tersedia?",
      objects: ["buku cerita", "buku ensiklopedia", "buku pelajaran", "buku komik", "buku novel", "buku resep", "buku mewarnai", "buku puzzle", "buku pop-up", "buku bersuara"],
      actions: ["dipinjam siswa kelas 1", "dipinjam siswa kelas 2", "dipinjam siswa kelas 3", "dipinjam siswa kelas 4", "dipinjam siswa kelas 5", "dipinjam siswa kelas 6", "dipinjam guru", "dipinjam kepala sekolah", "dipinjam staf TU", "dipinjam petugas perpustakaan"]
    },
    { 
      template: "Di pabrik dibuat **{x}** **{object}**. **{y}** **{object}** **{action}**. Berapa **{object}** yang belum dikirim?",
      objects: ["mainan robot", "boneka barbie", "mobil remote", "puzzle kayu", "balon gas", "layang-layang", "gasing elektronik", "yoyo cahaya", "frisbee glow", "skuter listrik"],
      actions: ["dikirim ke toko A", "dikirim ke toko B", "dikirim ke mall C", "dikirim ke supermarket D", "dikirim ke distributor E", "dikirim ke eksportir", "dikirim ke pusat grosir", "dikirim ke pasar tradisional", "dikirim ke sekolah", "dikirim ke yayasan"]
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
        if (content === `{action}` || content === `{variation}`) {
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
  
  // Generate soal penjumlahan (angka 11-20)
  const generateAdditionQuestion = () => {
    const template = additionTemplates[Math.floor(Math.random() * additionTemplates.length)];
    const objectIndex = Math.floor(Math.random() * template.objects.length);
    const object = template.objects[objectIndex];
    const variation = template.variations[objectIndex];
    
    // Angka 11-20 untuk penjumlahan
    const firstNum = Math.floor(Math.random() * 10) + 6; // 6-15
    const secondNum = Math.floor(Math.random() * 10) + 6; // 6-15
    const x = firstNum;
    const y = secondNum;
    const answer = x + y; // Hasil 12-30
    
    // Pastikan hasil tidak melebihi 30 untuk kesulitan wajar
    const adjustedAnswer = answer <= 30 ? answer : 30;
    const adjustedY = adjustedAnswer - x;
    
    // Generate pilihan jawaban
    const answers = [adjustedAnswer];
    while (answers.length < 4) {
      const randomAnswer = Math.floor(Math.random() * 19) + 12; // 12-30
      if (!answers.includes(randomAnswer) && randomAnswer !== adjustedAnswer) {
        answers.push(randomAnswer);
      }
    }
    
    // Acak urutan jawaban
    const shuffledAnswers = [...answers].sort(() => Math.random() - 0.5);
    
    return {
      question: template.template,
      answers: shuffledAnswers,
      correctAnswer: adjustedAnswer,
      x,
      y: adjustedY,
      object,
      action: variation,
      operation: '+',
      formattedQuestion: formatQuestionText(template.template, x, adjustedY, object, variation)
    };
  };
  
  // Generate soal pengurangan (angka 11-20)
  const generateSubtractionQuestion = () => {
    const template = subtractionTemplates[Math.floor(Math.random() * subtractionTemplates.length)];
    const objectIndex = Math.floor(Math.random() * template.objects.length);
    const object = template.objects[objectIndex];
    const action = template.actions[objectIndex];
    
    // Angka 11-20 untuk pengurangan
    const x = Math.floor(Math.random() * 10) + 11; // 11-20
    const y = Math.floor(Math.random() * (x - 5)) + 5; // 5 sampai x-1
    const answer = x - y; // Hasil minimal 1
    
    // Generate pilihan jawaban
    const answers = [answer];
    while (answers.length < 4) {
      const randomAnswer = Math.floor(Math.random() * 15) + 1; // 1-15
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
      operation: '-',
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
        elem.webkitRequestFullscreen();
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
  
  // Pilih mode game
  const selectGameMode = (mode) => {
    playSound('click');
    setGameMode(mode);
  };
  
  // Inisialisasi game
  const startGame = () => {
    playSound('click');
    
    if (!playerName.trim()) {
      alert('Masukkan nama dulu ya!');
      return;
    }
    
    if (!gameMode) {
      alert('Pilih mode game dulu! Penjumlahan atau Pengurangan');
      return;
    }
    
    // Generate soal pertama berdasarkan mode
    let firstQuestion;
    if (gameMode === 'penjumlahan') {
      firstQuestion = generateAdditionQuestion();
    } else {
      firstQuestion = generateSubtractionQuestion();
    }
    
    setGameStarted(true);
    setCurrentQuestion(firstQuestion);
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
    let newQuestion;
    if (gameMode === 'penjumlahan') {
      newQuestion = generateAdditionQuestion();
    } else {
      newQuestion = generateSubtractionQuestion();
    }
    
    setCurrentQuestion(newQuestion);
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
      mode: gameMode,
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
    
    // Generate soal baru berdasarkan mode yang sama
    let newQuestion;
    if (gameMode === 'penjumlahan') {
      newQuestion = generateAdditionQuestion();
    } else {
      newQuestion = generateSubtractionQuestion();
    }
    
    setCurrentQuestion(newQuestion);
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
  
  // Visualisasi benda
  const ObjectVisualization = ({ x, y, operation }) => {
    const totalItems = operation === '+' ? x + y : x;
    const removedItems = operation === '-' ? y : 0;
    
    return (
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {Array.from({ length: totalItems }).map((_, i) => {
          let bgColor = '#4f90c6'; // default warna
          let status = '';
          
          if (operation === '+') {
            // Penjumlahan: x warna merah, y warna hijau
            bgColor = i < x ? '#FF6B6B' : '#4ECDC4';
            status = i < x ? 'pertama' : 'ditambahkan';
          } else {
            // Pengurangan: item yang diambil transparan
            const isRemoved = i < removedItems;
            bgColor = isRemoved ? '#FF6B6B' : '#4ECDC4';
            status = isRemoved ? 'dikurangi' : 'tersisa';
          }
          
          return (
            <div
              key={i}
              className={`flex flex-col items-center transition-all duration-500 ${
                operation === '-' && i < removedItems 
                  ? 'opacity-40 scale-75 transform -translate-y-2' 
                  : 'opacity-100 animate-bounce'
              }`}
            >
              <div 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: bgColor }}
              >
                {operation === '+' ? (i < x ? x : y) : ''}
              </div>
              <div 
                className="text-xs font-bold mt-1 px-2 py-1 rounded-full"
                style={{ 
                  backgroundColor: bgColor === '#FF6B6B' ? '#FFE5E5' : '#E5F7F5',
                  color: bgColor === '#FF6B6B' ? '#FF6B6B' : '#4ECDC4'
                }}
              >
                {status}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Kalkulator visual
  const VisualCalculator = ({ x, y, operation }) => {
    const result = operation === '+' ? x + y : x - y;
    const symbol = operation === '+' ? '+' : '−';
    
    return (
      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
        <div className="text-center font-bold mb-2" style={{ color: '#355485' }}>
          🧮 Hitung Bersama:
        </div>
        <div className="flex items-center justify-center gap-2 text-xl">
          <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#FF6B6B', color: 'white' }}>
            {x}
          </div>
          <div className="px-2" style={{ color: '#355485' }}>{symbol}</div>
          <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#4ECDC4', color: 'white' }}>
            {y}
          </div>
          <div className="px-2" style={{ color: '#355485' }}>=</div>
          <div className="px-4 py-2 rounded-lg" style={{ backgroundColor: '#FFD166', color: '#355485', border: '2px solid #FF9F43' }}>
            {result}
          </div>
        </div>
        <div className="text-center text-sm mt-2" style={{ color: '#6b7280' }}>
          {operation === '+' ? 'Penjumlahan' : 'Pengurangan'} tingkat lanjut!
        </div>
      </div>
    );
  };

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
  
  // Tampilan awal - pilih mode
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
              className="text-3xl font-bold text-center mb-2"
              style={{ color: '#355485' }}
            >
              Game Matematika Level 2
            </h1>
            <p className="text-center mb-6" style={{ color: '#6b7280' }}>
              Angka 11-20 • Untuk anak usia 7-9 tahun
            </p>
            
            {/* Gambar kecil di atas input nama */}
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4" style={{ borderColor: '#cbdde9' }}>
                <img 
                  src="https://img.freepik.com/vektor-premium/ilustrasi-kartun-islami-tentang-pasangan-muslim-yang-memberi-salam-dengan-lambaian-tangan_207579-900.jpg?w=200" 
                  alt="Pasangan Muslim"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/96x96/f0f7ff/355485?text=👨‍👩';
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
                  if (e.key === 'Enter' && gameMode) startGame();
                }}
              />
            </div>
            
            {/* Pilih Mode Game */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-center" style={{ color: '#355485' }}>
                Pilih Mode Game:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tombol Penjumlahan */}
                <button
                  onClick={() => selectGameMode('penjumlahan')}
                  className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center ${
                    gameMode === 'penjumlahan' ? 'ring-4 ring-[#4ECDC4]' : ''
                  }`}
                  style={{ 
                    backgroundColor: gameMode === 'penjumlahan' ? '#E5F7F5' : '#f0f7ff',
                    border: '2px solid',
                    borderColor: gameMode === 'penjumlahan' ? '#4ECDC4' : '#cbdde9'
                  }}
                >
                  <div className="text-4xl mb-2">➕</div>
                  <div className="text-xl font-bold" style={{ color: '#355485' }}>Penjumlahan</div>
                  <div className="text-sm mt-1" style={{ color: '#6b7280' }}>Angka 11-20</div>
                  <div className="text-xs mt-2" style={{ color: '#9ca3af' }}>Tingkat Sedang</div>
                </button>
                
                {/* Tombol Pengurangan */}
                <button
                  onClick={() => selectGameMode('pengurangan')}
                  className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center ${
                    gameMode === 'pengurangan' ? 'ring-4 ring-[#FF6B6B]' : ''
                  }`}
                  style={{ 
                    backgroundColor: gameMode === 'pengurangan' ? '#FFE5E5' : '#f0f7ff',
                    border: '2px solid',
                    borderColor: gameMode === 'pengurangan' ? '#FF6B6B' : '#cbdde9'
                  }}
                >
                  <div className="text-4xl mb-2">➖</div>
                  <div className="text-xl font-bold" style={{ color: '#355485' }}>Pengurangan</div>
                  <div className="text-sm mt-1" style={{ color: '#6b7280' }}>Angka 11-20</div>
                  <div className="text-xs mt-2" style={{ color: '#9ca3af' }}>Tingkat Sedang</div>
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: '#355485' }}>
                Cara Bermain:
              </h3>
              <ul className="list-disc pl-5 space-y-2" style={{ color: '#6b7280' }}>
                <li>Pilih mode <span className="font-bold text-[#4ECDC4]">Penjumlahan</span> atau <span className="font-bold text-[#FF6B6B]">Pengurangan</span></li>
                <li>Baca soal cerita dengan teliti</li>
                <li>Angka yang digunakan 11 sampai 20</li>
                <li>Pilih jawaban yang benar dari 4 pilihan</li>
                <li>Dapatkan skor tertinggi!</li>
                <li>Ada 10 soal menantang</li>
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
              disabled={!gameMode}
              className={`w-full py-4 text-lg font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 mb-4 ${
                !gameMode ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              style={{ 
                backgroundColor: '#4f90c6',
                color: '#ffffff',
                boxShadow: '0 4px 12px rgba(79, 144, 198, 0.3)'
              }}
            >
              {gameMode ? `MULAI ${gameMode.toUpperCase()}` : 'PILIH MODE DULU'}
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
                        backgroundColor: entry.mode === 'penjumlahan' ? '#E5F7F5' : '#FFE5E5',
                        border: '1px solid',
                        borderColor: entry.mode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {entry.mode === 'penjumlahan' ? '➕' : '➖'}
                        </span>
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
            className="text-3xl font-bold mb-2"
            style={{ color: '#355485' }}
          >
            Selamat {playerName}!
          </h1>
          <div className="mb-6" style={{ color: gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B' }}>
            Mode: {gameMode === 'penjumlahan' ? 'Penjumlahan' : 'Pengurangan'} • Level Lanjut
          </div>
          
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
            <div className="mt-4 p-3 rounded-lg" style={{ 
              backgroundColor: gameMode === 'penjumlahan' ? '#E5F7F5' : '#FFE5E5',
              border: `1px solid ${gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B'}`
            }}>
              <span style={{ color: '#355485' }}>Mode: </span>
              <span className="font-bold" style={{ color: gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B' }}>
                {gameMode === 'penjumlahan' ? 'Penjumlahan' : 'Pengurangan'}
              </span>
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
                setGameMode(null);
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
              setGameMode(null);
            }}
            className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: '#90b6d5',
              color: '#ffffff'
            }}
          >
            ← Ganti Mode
          </button>
          
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg font-bold" style={{ 
              backgroundColor: gameMode === 'penjumlahan' ? '#E5F7F5' : '#FFE5E5',
              color: gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B',
              border: `2px solid ${gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B'}`
            }}>
              {gameMode === 'penjumlahan' ? '➕ Penjumlahan' : '➖ Pengurangan'}
            </div>
            
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
        
        {/* Game Container */}
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
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ 
                color: gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B'
              }}>
                {gameMode === 'penjumlahan' ? '11-20' : '11-20'}
              </div>
              <div style={{ color: '#6b7280' }}>Level</div>
            </div>
          </div>
          
          {/* Question Area */}
          <div className="mb-8">
            {/* Bubble soal */}
            <div 
              className="p-6 rounded-2xl relative mb-6"
              style={{ 
                backgroundColor: gameMode === 'penjumlahan' ? '#E5F7F5' : '#FFE5E5',
                border: `2px solid ${gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B'}`,
                boxShadow: '0 4px 12px rgba(79, 144, 198, 0.1)'
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="px-4 py-2 rounded-lg font-bold" style={{ 
                  backgroundColor: gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B',
                  color: '#ffffff'
                }}>
                  {gameMode === 'penjumlahan' ? 'SOAL PENJUMLAHAN' : 'SOAL PENGURANGAN'}
                </div>
              </div>
              
              <div className="text-xl md:text-2xl leading-relaxed mb-4" style={{ color: '#355485' }}>
                {currentQuestion?.formattedQuestion}
              </div>
              
              {/* Visualisasi benda */}
              {currentQuestion && (
                <ObjectVisualization 
                  x={currentQuestion.x} 
                  y={currentQuestion.y} 
                  operation={currentQuestion.operation}
                />
              )}
              
              {isCorrect && <ConfettiEffect />}
            </div>
            
            {/* Kalkulator visual untuk hint */}
            {showHint && (
              <div className="mb-6 animate-fadeIn">
                <VisualCalculator 
                  x={currentQuestion?.x} 
                  y={currentQuestion?.y} 
                  operation={currentQuestion?.operation} 
                />
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
                      {currentQuestion?.operation === '+' 
                        ? `Penjumlahan: ${currentQuestion?.x} + ${currentQuestion?.y} = ?`
                        : `Pengurangan: ${currentQuestion?.x} - ${currentQuestion?.y} = ?`
                      }
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
          
          {/* Visual decorations */}
          <div className="absolute bottom-4 right-4 text-4xl opacity-20 animate-pulse">
            {gameMode === 'penjumlahan' ? '➕' : '➖'}
          </div>
        </div>
        
        {/* Legend Warna */}
        <div className="flex flex-wrap justify-center gap-4 mb-4 p-4 rounded-lg" style={{ backgroundColor: '#f0f7ff' }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#FF6B6B' }}></div>
            <span className="text-sm font-medium" style={{ color: '#355485' }}>
              {gameMode === 'penjumlahan' ? 'Angka pertama' : 'Angka yang dikurangi'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#4ECDC4' }}></div>
            <span className="text-sm font-medium" style={{ color: '#355485' }}>
              {gameMode === 'penjumlahan' ? 'Angka kedua' : 'Pengurang'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded" style={{ backgroundColor: '#FFD166', border: '1px solid #FF9F43' }}></div>
            <span className="text-sm font-medium" style={{ color: '#355485' }}>Nama benda</span>
          </div>
        </div>
        
        {/* Game Info */}
        <div className="text-center text-sm p-4 rounded-lg" style={{ 
          backgroundColor: gameMode === 'penjumlahan' ? '#E5F7F5' : '#FFE5E5',
          color: '#6b7280',
          border: `1px solid ${gameMode === 'penjumlahan' ? '#4ECDC4' : '#FF6B6B'}`
        }}>
          <p>
            Game Matematika Level Lanjut • Mode {gameMode === 'penjumlahan' ? 'Penjumlahan' : 'Pengurangan'} • Angka 11-20
          </p>
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