// src/components/bab4/GamePuzzleBentukMudah.jsx
import React, { useState, useEffect, useRef } from 'react';

const GamePuzzleBentukMudah = () => {
    // State game
    const [gameStatus, setGameStatus] = useState('start'); // 'start', 'playing', 'end'
    const [playerName, setPlayerName] = useState('');
    const [currentPuzzle, setCurrentPuzzle] = useState(0);
    const [score, setScore] = useState(0);
    const [shuffledPuzzles, setShuffledPuzzles] = useState([]);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);
    const [playerMode, setPlayerMode] = useState(null); // 'named', 'anonymous'
    const [showHint, setShowHint] = useState(false);
    const [selectedPieces, setSelectedPieces] = useState({});
    const [correctPieces, setCorrectPieces] = useState({});
    const [isChecking, setIsChecking] = useState(false);

    const gameContainerRef = useRef(null);
    const audioBenarRef = useRef(null);
    const audioSalahRef = useRef(null);
    const audioBerhasilRef = useRef(null);
    const audioGagalRef = useRef(null);
    const audioKlikRef = useRef(null);

    // Data puzzle versi mudah
    const puzzleBank = [
        {
            id: 1,
            title: "Bentuk Segitiga",
            emoji: "🔺",
            description: "Pilih bagian yang membentuk segitiga",
            hint: "Segitiga punya 3 sisi dan 3 sudut",
            correctPieces: ['A', 'C'],
            pieces: [
                { id: 'A', emoji: '🔺', label: 'Segitiga', isCorrect: true },
                { id: 'B', emoji: '🟦', label: 'Kotak', isCorrect: false },
                { id: 'C', emoji: '🔺', label: 'Segitiga', isCorrect: true },
                { id: 'D', emoji: '⭕', label: 'Lingkaran', isCorrect: false }
            ]
        },
        {
            id: 2,
            title: "Bentuk Bulat",
            emoji: "⭕",
            description: "Pilih semua bentuk yang BULAT",
            hint: "Bentuk bulat tidak punya sudut",
            correctPieces: ['B', 'D'],
            pieces: [
                { id: 'A', emoji: '🔺', label: 'Segitiga', isCorrect: false },
                { id: 'B', emoji: '⭕', label: 'Lingkaran', isCorrect: true },
                { id: 'C', emoji: '🟦', label: 'Kotak', isCorrect: false },
                { id: 'D', emoji: '⚽', label: 'Bola', isCorrect: true }
            ]
        },
        {
            id: 3,
            title: "Bentuk Kotak",
            emoji: "🟦",
            description: "Pilih bentuk-bentuk KOTAK",
            hint: "Kotak punya 4 sisi sama panjang",
            correctPieces: ['A', 'C'],
            pieces: [
                { id: 'A', emoji: '🟦', label: 'Kotak', isCorrect: true },
                { id: 'B', emoji: '🔺', label: 'Segitiga', isCorrect: false },
                { id: 'C', emoji: '📦', label: 'Kotak', isCorrect: true },
                { id: 'D', emoji: '⭕', label: 'Lingkaran', isCorrect: false }
            ]
        },
        {
            id: 4,
            title: "Bentuk Bintang",
            emoji: "⭐",
            description: "Pilih potongan bintang",
            hint: "Bintang punya 5 sudut yang runcing",
            correctPieces: ['B', 'D'],
            pieces: [
                { id: 'A', emoji: '🔺', label: 'Segitiga', isCorrect: false },
                { id: 'B', emoji: '⭐', label: 'Bintang', isCorrect: true },
                { id: 'C', emoji: '🟦', label: 'Kotak', isCorrect: false },
                { id: 'D', emoji: '⭐', label: 'Bintang', isCorrect: true }
            ]
        },
        {
            id: 5,
            title: "Bentuk Hati",
            emoji: "❤️",
            description: "Pilih potongan hati",
            hint: "Hati punya dua lengkungan di atas",
            correctPieces: ['A', 'C'],
            pieces: [
                { id: 'A', emoji: '❤️', label: 'Hati', isCorrect: true },
                { id: 'B', emoji: '🔺', label: 'Segitiga', isCorrect: false },
                { id: 'C', emoji: '❤️', label: 'Hati', isCorrect: true },
                { id: 'D', emoji: '🟦', label: 'Kotak', isCorrect: false }
            ]
        },
        {
            id: 6,
            title: "Bentuk Persegi Panjang",
            emoji: "📏",
            description: "Pilih bentuk persegi panjang",
            hint: "Persegi panjang lebih panjang daripada lebar",
            correctPieces: ['B', 'D'],
            pieces: [
                { id: 'A', emoji: '⭕', label: 'Lingkaran', isCorrect: false },
                { id: 'B', emoji: '📏', label: 'Penggaris', isCorrect: true },
                { id: 'C', emoji: '🔺', label: 'Segitiga', isCorrect: false },
                { id: 'D', emoji: '📱', label: 'HP', isCorrect: true }
            ]
        },
        {
            id: 7,
            title: "Bentuk Segitiga dan Kotak",
            emoji: "🔷",
            description: "Pilih segitiga DAN kotak",
            hint: "Pilih dua jenis bentuk yang berbeda",
            correctPieces: ['A', 'C'],
            pieces: [
                { id: 'A', emoji: '🔺', label: 'Segitiga', isCorrect: true },
                { id: 'B', emoji: '⭕', label: 'Lingkaran', isCorrect: false },
                { id: 'C', emoji: '🟦', label: 'Kotak', isCorrect: true },
                { id: 'D', emoji: '❤️', label: 'Hati', isCorrect: false }
            ]
        },
        {
            id: 8,
            title: "Bentuk Lingkaran dan Bintang",
            emoji: "✨",
            description: "Pilih lingkaran DAN bintang",
            hint: "Cari bentuk bulat dan bentuk runcing",
            correctPieces: ['B', 'D'],
            pieces: [
                { id: 'A', emoji: '🔺', label: 'Segitiga', isCorrect: false },
                { id: 'B', emoji: '⭕', label: 'Lingkaran', isCorrect: true },
                { id: 'C', emoji: '🟦', label: 'Kotak', isCorrect: false },
                { id: 'D', emoji: '⭐', label: 'Bintang', isCorrect: true }
            ]
        },
        {
            id: 9,
            title: "Bentuk Warna Merah",
            emoji: "🔴",
            description: "Pilih semua bentuk berwarna MERAH",
            hint: "Lihat warna bentuknya, bukan jenisnya",
            correctPieces: ['A', 'C'],
            pieces: [
                { id: 'A', emoji: '🔴', label: 'Merah', isCorrect: true },
                { id: 'B', emoji: '🔵', label: 'Biru', isCorrect: false },
                { id: 'C', emoji: '🍎', label: 'Apel', isCorrect: true },
                { id: 'D', emoji: '🟢', label: 'Hijau', isCorrect: false }
            ]
        },
        {
            id: 10,
            title: "Bentuk Benda Sehari-hari",
            emoji: "🏠",
            description: "Pilih benda yang berbentuk KOTAK",
            hint: "Pilih benda dengan sudut-sudut siku",
            correctPieces: ['B', 'C'],
            pieces: [
                { id: 'A', emoji: '⚽', label: 'Bola', isCorrect: false },
                { id: 'B', emoji: '📦', label: 'Kotak', isCorrect: true },
                { id: 'C', emoji: '📱', label: 'HP', isCorrect: true },
                { id: 'D', emoji: '🍕', label: 'Pizza', isCorrect: false }
            ]
        }
    ];

    // Load history dari localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('game_puzzle_mudah_history');
        if (savedHistory) {
            setGameHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Acak puzzle saat mulai
    const acakPuzzle = () => {
        const shuffled = [...puzzleBank]
            .sort(() => Math.random() - 0.5)
            .slice(0, 10);
        setShuffledPuzzles(shuffled);
        setSelectedPieces({});
        setCorrectPieces({});
    };

    useEffect(() => {
        if (gameStatus === 'playing' && shuffledPuzzles.length === 0) {
            acakPuzzle();
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

    const togglePieceSelection = (puzzleId, pieceId) => {
        if (isChecking) return;
        
        playSound('klik');
        setSelectedPieces(prev => {
            const current = prev[puzzleId] || [];
            if (current.includes(pieceId)) {
                return {
                    ...prev,
                    [puzzleId]: current.filter(id => id !== pieceId)
                };
            } else {
                // Maksimal 2 pilihan
                if (current.length < 2) {
                    return {
                        ...prev,
                        [puzzleId]: [...current, pieceId]
                    };
                }
                return prev;
            }
        });
    };

    const checkAnswer = () => {
        if (isChecking) return;
        
        playSound('klik');
        setIsChecking(true);
        
        const currentPuzzleData = shuffledPuzzles[currentPuzzle];
        const selected = selectedPieces[currentPuzzleData.id] || [];
        const correct = currentPuzzleData.correctPieces;
        
        // Sort untuk perbandingan
        const sortedSelected = [...selected].sort();
        const sortedCorrect = [...correct].sort();
        
        const isCorrect = JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect);
        
        // Tampilkan potongan yang benar
        const correctMap = {};
        currentPuzzleData.pieces.forEach(piece => {
            if (piece.isCorrect) {
                correctMap[piece.id] = true;
            }
        });
        setCorrectPieces(prev => ({
            ...prev,
            [currentPuzzleData.id]: correctMap
        }));

        if (isCorrect) {
            playSound('benar');
            setScore(score + 10);
        } else {
            playSound('salah');
        }

        setTimeout(() => {
            if (currentPuzzle < 9) {
                setCurrentPuzzle(currentPuzzle + 1);
                setIsChecking(false);
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
            gameType: 'Puzzle Bentuk Mudah'
        };

        const newHistory = [result, ...gameHistory.slice(0, 4)];
        setGameHistory(newHistory);
        localStorage.setItem('game_puzzle_mudah_history', JSON.stringify(newHistory));

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
            acakPuzzle();
        }
    };

    const startGameAnonymous = () => {
        setPlayerMode('anonymous');
        setPlayerName('Tamu');
        setGameStatus('playing');
        acakPuzzle();
    };

    const restartGame = () => {
        setGameStatus('playing');
        setCurrentPuzzle(0);
        setScore(0);
        setSelectedPieces({});
        setCorrectPieces({});
        setIsChecking(false);
        setShowHint(false);
        acakPuzzle();
    };

    const resetHistory = () => {
        setGameHistory([]);
        localStorage.removeItem('game_puzzle_mudah_history');
    };

    const printResult = (history) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Hasil Game Puzzle Bentuk Mudah</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            color: #355485;
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                            border-bottom: 3px solid #F59E0B;
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
                            background: #fef3c7;
                            border-radius: 10px;
                            border: 1px solid #fcd34d;
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
                        <h1>🧩 Hasil Game Puzzle Bentuk Mudah</h1>
                        <h3>Untuk Siswa Kelas 1 SD</h3>
                    </div>
                    
                    <div class="result-card">
                        <h2>Pemain: ${history.playerName}</h2>
                        <div class="score">${history.score}</div>
                        <p style="text-align: center; font-size: 18px;">
                            ${history.score >= 70 ? '🎉 Hebat! Kamu jago mengenal bentuk!' : '💪 Terus berlatih mengenal bentuk!'}
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
                                <strong>Puzzle Benar:</strong><br>
                                ${history.correctAnswers} dari 10 puzzle
                            </div>
                            <div class="detail-item">
                                <strong>Persentase:</strong><br>
                                ${history.score}%
                            </div>
                        </div>
                        
                        <div class="skill-list">
                            <h4>🧠 Kemampuan yang Dilatih:</h4>
                            <ul>
                                <li>Mengenal bentuk-bentuk dasar</li>
                                <li>Mengelompokkan bentuk serupa</li>
                                <li>Memahami karakteristik bentuk</li>
                                <li>Observasi visual sederhana</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Game Puzzle Bentuk Mudah - Materi Pembelajaran Kelas 1 SD</p>
                        <p>Melatih kemampuan mengenal bentuk dengan cara yang menyenangkan</p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    const progress = ((currentPuzzle + 1) / 10) * 100;

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
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#355485] flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                                <span className="text-6xl">🧩</span>
                            </div>
                            <h1 className="text-4xl font-bold text-[#355485] mb-3">
                                Game Puzzle Bentuk Mudah
                            </h1>
                            <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
                                Untuk siswa kelas 1 SD. Kenali bentuk-bentuk dasar dengan cara yang mudah dan menyenangkan!
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
                                                className="w-full px-4 py-3 rounded-xl border-2 border-[#cbdde9] focus:border-[#F59E0B] focus:outline-none bg-white text-[#355485] text-lg transition-all"
                                            />
                                        </div>
                                        
                                        <button
                                            onClick={startGameWithName}
                                            disabled={!playerName.trim()}
                                            className="w-full bg-gradient-to-r from-[#F59E0B] to-[#355485] hover:from-[#D97706] hover:to-[#2a436c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
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
                                            className="w-full border-2 border-[#F59E0B] hover:border-[#355485] text-[#F59E0B] hover:text-[#355485] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
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
                                            className="text-sm text-[#6b7280] hover:text-[#F59E0B] hover:underline px-3 py-1 rounded-lg hover:bg-[#f9fafb] transition-colors"
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
                                                className={`p-4 rounded-xl border transition-all hover:shadow-md ${index === 0 ? 'border-[#F59E0B] bg-gradient-to-r from-[#fef3c7] to-white' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-gradient-to-br from-[#F59E0B] to-[#355485] text-white' : 'bg-[#cbdde9] text-[#355485]'}`}>
                                                                <span className="font-bold">{index + 1}</span>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-[#355485]">{history.playerName}</div>
                                                                <div className="text-sm text-[#9ca3af]">
                                                                    {history.date} • {history.time}
                                                                </div>
                                                            </div>
                                                            {index === 0 && (
                                                                <span className="text-xs bg-[#F59E0B] text-white px-3 py-1 rounded-full animate-pulse">
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
                                                            {history.correctAnswers}/10 puzzle
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
                        <div className="bg-gradient-to-r from-[#355485] to-[#F59E0B] rounded-2xl p-8 text-white shadow-lg">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-3">🧩 Cara Bermain Mudah</h3>
                                    <p className="opacity-90 max-w-2xl">
                                        1. Baca petunjuk puzzle<br/>
                                        2. Pilih <strong>2 potongan</strong> yang benar<br/>
                                        3. Klik "Periksa Jawaban"<br/>
                                        4. Lanjut ke puzzle berikutnya!
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl">🔺</div>
                                        <div className="text-sm">Pilih 2</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl">✅</div>
                                        <div className="text-sm">Cek Jawaban</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl">🎯</div>
                                        <div className="text-sm">Mudah</div>
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
    if (gameStatus === 'playing' && shuffledPuzzles.length > 0) {
        const puzzle = shuffledPuzzles[currentPuzzle];
        const selected = selectedPieces[puzzle.id] || [];
        const correct = correctPieces[puzzle.id] || {};

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
                                        <span className="text-3xl">🧩</span>
                                        Puzzle Bentuk Mudah
                                    </h2>
                                    <p className="text-[#6b7280]">
                                        Pemain: <span className="font-semibold text-[#F59E0B]">{playerName}</span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-xl border-2 border-[#e5e7eb] shadow-sm">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#F59E0B]">{score}</div>
                                            <div className="text-xs text-[#9ca3af]">Poin</div>
                                        </div>
                                        <div className="w-px h-8 bg-[#e5e7eb]" />
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#F59E0B]">{currentPuzzle + 1}/10</div>
                                            <div className="text-xs text-[#9ca3af]">Puzzle</div>
                                        </div>
                                        <div className="w-px h-8 bg-[#e5e7eb]" />
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#F59E0B]">{selected.length}/2</div>
                                            <div className="text-xs text-[#9ca3af]">Dipilih</div>
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
                                    <span className="text-sm font-medium text-[#355485]">Progress Penyelesaian</span>
                                    <span className="text-sm font-medium text-[#F59E0B]">
                                        Puzzle {currentPuzzle + 1} dari 10
                                    </span>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${index === currentPuzzle
                                                    ? 'bg-gradient-to-br from-[#F59E0B] to-[#355485] text-white transform scale-105 shadow-lg'
                                                    : index < currentPuzzle
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
                            {/* Left Column - Puzzle Info & Pieces */}
                            <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                                <div className="mb-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#355485] flex items-center justify-center">
                                            <span className="text-4xl">{puzzle.emoji}</span>
                                        </div>
                                        <div>
                                            <div className="text-sm text-[#F59E0B] font-bold mb-1">PUZZLE #{puzzle.id}</div>
                                            <h3 className="text-2xl font-bold text-[#355485]">{puzzle.title}</h3>
                                            <p className="text-[#6b7280] mt-1">{puzzle.description}</p>
                                        </div>
                                    </div>

                                    {/* Instructions */}
                                    <div className="mb-6 p-4 bg-gradient-to-r from-[#fef3c7] to-white border-2 border-[#fcd34d] rounded-xl">
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-2xl">🎯</span>
                                            <h4 className="font-bold text-[#355485]">Petunjuk</h4>
                                        </div>
                                        <p className="text-[#6b7280]">
                                            <strong>Pilih 2 potongan yang benar</strong> sesuai dengan deskripsi di atas!
                                        </p>
                                    </div>

                                    {/* Puzzle Pieces */}
                                    <div className="mb-8">
                                        <h4 className="font-bold text-[#355485] mb-4 text-center">
                                            Pilih 2 Potongan yang Benar
                                        </h4>
                                        
                                        <div className="grid grid-cols-2 gap-4">
                                            {puzzle.pieces.map((piece) => {
                                                const isSelected = selected.includes(piece.id);
                                                const isCorrect = correct[piece.id];
                                                const showAsCorrect = isChecking && piece.isCorrect;
                                                
                                                return (
                                                    <button
                                                        key={piece.id}
                                                        onClick={() => togglePieceSelection(puzzle.id, piece.id)}
                                                        disabled={isChecking}
                                                        className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02]
                                                            ${isSelected
                                                                ? 'bg-gradient-to-br from-[#F59E0B] to-[#355485] border-[#F59E0B] text-white shadow-lg'
                                                                : showAsCorrect
                                                                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-400'
                                                                    : 'bg-gradient-to-r from-[#f9fafb] to-white border-2 border-[#e5e7eb] hover:border-[#cbdde9] hover:shadow-md text-[#355485]'
                                                            }
                                                            ${isChecking && !isSelected && !showAsCorrect && !piece.isCorrect
                                                                ? 'opacity-50'
                                                                : ''
                                                            }
                                                        `}
                                                    >
                                                        <div className="flex flex-col items-center gap-3">
                                                            <div className={`text-5xl ${isSelected ? 'animate-bounce' : ''}`}>
                                                                {piece.emoji}
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="font-bold text-lg">{piece.label}</div>
                                                                <div className="text-sm text-[#6b7280] mt-1">
                                                                    Potongan {piece.id}
                                                                </div>
                                                            </div>
                                                            {isSelected && (
                                                                <div className="text-sm bg-white/20 px-3 py-1 rounded-full">
                                                                    ✅ Terpilih
                                                                </div>
                                                            )}
                                                            {showAsCorrect && !isSelected && (
                                                                <div className="text-sm bg-green-500 text-white px-3 py-1 rounded-full animate-pulse">
                                                                    ✓ Benar
                                                                </div>
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setShowHint(!showHint)}
                                        className="flex-1 py-3 bg-gradient-to-r from-[#cbdde9] to-[#90b6d5] hover:from-[#90b6d5] hover:to-[#F59E0B] text-[#355485] font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="text-xl">💡</span>
                                            {showHint ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk'}
                                        </span>
                                    </button>
                                    
                                    <button
                                        onClick={checkAnswer}
                                        disabled={selected.length !== 2 || isChecking}
                                        className="flex-1 bg-gradient-to-r from-[#F59E0B] to-[#355485] hover:from-[#D97706] hover:to-[#2a436c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            <span className="text-xl">🔍</span>
                                            Periksa Jawaban
                                        </span>
                                    </button>
                                </div>

                                {/* Hint Display */}
                                {showHint && (
                                    <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl animate-fade-in">
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl">💡</span>
                                            <div>
                                                <div className="font-bold text-[#355485] mb-1">Petunjuk:</div>
                                                <p className="text-[#6b7280]">{puzzle.hint}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Selected Pieces Info */}
                                {selected.length > 0 && !isChecking && (
                                    <div className="mt-4 p-4 bg-gradient-to-r from-[#f0f7ff] to-white border-2 border-[#cbdde9] rounded-xl">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xl">✅</span>
                                                <span className="font-medium text-[#355485]">
                                                    Dipilih: {selected.length}/2
                                                </span>
                                            </div>
                                            <div className="text-sm text-[#9ca3af]">
                                                {selected.map(id => `Potongan ${id}`).join(', ')}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column - Feedback & Next Steps */}
                            <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                                <div className="sticky top-8">
                                    {/* How to Play */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-[#355485] mb-6 flex items-center gap-3">
                                            <span className="text-2xl">📝</span>
                                            <span>Cara Bermain</span>
                                        </h3>

                                        <div className="space-y-4">
                                            <div className="p-4 bg-gradient-to-r from-[#fef3c7] to-white border-2 border-[#fcd34d] rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold">
                                                        1
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-[#355485] mb-1">Baca Petunjuk</div>
                                                        <p className="text-sm text-[#6b7280]">
                                                            Perhatikan deskripsi puzzle dengan teliti
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-gradient-to-r from-[#fef3c7] to-white border-2 border-[#fcd34d] rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold">
                                                        2
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-[#355485] mb-1">Pilih 2 Potongan</div>
                                                        <p className="text-sm text-[#6b7280]">
                                                            Klik 2 potongan yang menurutmu benar
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-gradient-to-r from-[#fef3c7] to-white border-2 border-[#fcd34d] rounded-xl">
                                                <div className="flex items-start gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-bold">
                                                        3
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-[#355485] mb-1">Periksa Jawaban</div>
                                                        <p className="text-sm text-[#6b7280]">
                                                            Klik tombol untuk memeriksa jawabanmu
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Feedback Area */}
                                    <div className="mb-8">
                                        <h4 className="font-bold text-[#355485] mb-4 flex items-center gap-2">
                                            <span className="text-xl">💬</span>
                                            <span>Hasil Pemeriksaan</span>
                                        </h4>
                                        
                                        {isChecking ? (
                                            <div className={`p-6 rounded-xl text-center animate-fade-in shadow-lg
                                                ${JSON.stringify([...selected].sort()) === JSON.stringify([...puzzle.correctPieces].sort())
                                                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
                                                    : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300'
                                                }`}
                                            >
                                                <div className="flex flex-col items-center gap-3">
                                                    <span className="text-4xl">
                                                        {JSON.stringify([...selected].sort()) === JSON.stringify([...puzzle.correctPieces].sort()) 
                                                            ? '🎉' 
                                                            : '💪'
                                                        }
                                                    </span>
                                                    <div>
                                                        <div className={`text-xl font-bold mb-1 ${JSON.stringify([...selected].sort()) === JSON.stringify([...puzzle.correctPieces].sort()) 
                                                            ? 'text-green-700' 
                                                            : 'text-red-700'
                                                        }`}>
                                                            {JSON.stringify([...selected].sort()) === JSON.stringify([...puzzle.correctPieces].sort()) 
                                                                ? 'BENAR!' 
                                                                : 'SALAH!'
                                                            }
                                                        </div>
                                                        <p className="text-[#6b7280]">
                                                            {JSON.stringify([...selected].sort()) === JSON.stringify([...puzzle.correctPieces].sort()) 
                                                                ? 'Kamu mendapat 10 poin!' 
                                                                : 'Coba lagi di puzzle berikutnya!'
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 text-sm text-[#9ca3af]">
                                                    Puzzle berikutnya akan dimulai otomatis...
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-6 bg-gradient-to-r from-[#f9fafb] to-white border-2 border-[#e5e7eb] rounded-xl text-center">
                                                <div className="text-3xl mb-3">🤔</div>
                                                <p className="text-[#6b7280]">
                                                    Pilih 2 potongan terlebih dahulu, lalu periksa jawabanmu!
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Puzzle Progress */}
                                    <div className="p-4 bg-gradient-to-r from-[#f0f7ff] to-white border-2 border-[#cbdde9] rounded-xl">
                                        <h4 className="font-bold text-[#355485] mb-3 flex items-center gap-2">
                                            <span className="text-xl">📊</span>
                                            <span>Progress Puzzle</span>
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <div className="flex justify-between text-sm text-[#6b7280] mb-1">
                                                    <span>Pilihan terpilih</span>
                                                    <span>{selected.length} / 2</span>
                                                </div>
                                                <div className="w-full h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-[#F59E0B] to-[#90b6d5] rounded-full transition-all duration-500"
                                                        style={{ width: `${(selected.length / 2) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm text-[#9ca3af]">
                                                    {selected.length === 0 ? 'Belum ada pilihan' :
                                                     selected.length === 1 ? 'Pilih 1 lagi!' :
                                                     'Sudah siap untuk diperiksa!'}
                                                </div>
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
                                    {nilai === 100 ? '🏆' : nilai >= 70 ? '🎉' : '🧩'}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-[#355485] mb-3">{pesan}</h1>
                            <p className="text-[#6b7280] text-lg mb-1">Selesai! Inilah Hasil Permainanmu</p>
                            <p className="text-[#F59E0B] font-bold text-xl">Pemain: {playerName}</p>
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
                                            stroke={nilai >= 70 ? "#F59E0B" : "#355485"}
                                            strokeWidth="16"
                                            fill="none"
                                            strokeDasharray={`${nilai * 5.5} 550`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { label: 'Puzzle Benar', value: `${score / 10} dari 10` },
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
                                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#fef3c7] to-white border-2 border-[#F59E0B]">
                                    <h4 className="font-bold text-[#355485] mb-3 flex items-center gap-2">
                                        <span className="text-xl">🧠</span>
                                        Kemampuan yang Dilatih
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Mengenal Bentuk', 'Pengamatan', 'Klasifikasi', 'Pemilihan'].map((skill, idx) => (
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
                                        className="bg-gradient-to-r from-[#F59E0B] to-[#355485] hover:from-[#D97706] hover:to-[#2a436c] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
                                    >
                                        <span>🖨️</span>
                                        Print Hasil Ini
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    {gameHistory.slice(0, 5).map((history, index) => (
                                        <div
                                            key={history.id}
                                            className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${index === 0 ? 'border-[#F59E0B] bg-gradient-to-r from-[#fef3c7] to-white' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-gradient-to-br from-[#F59E0B] to-[#355485] text-white' : 'bg-[#cbdde9] text-[#355485]'}`}>
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-[#355485]">{history.playerName}</div>
                                                        <div className="text-sm text-[#9ca3af]">
                                                            {history.date} • {history.time}
                                                        </div>
                                                    </div>
                                                    {index === 0 && (
                                                        <span className="text-xs bg-[#F59E0B] text-white px-3 py-1 rounded-full animate-pulse">
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
                                className="flex-1 bg-gradient-to-r from-[#F59E0B] to-[#355485] hover:from-[#D97706] hover:to-[#2a436c] text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl"
                            >
                                <span className="flex items-center justify-center gap-3 text-lg">
                                    <span className="text-2xl">🔄</span>
                                    MAIN LAGI
                                </span>
                            </button>
                            <button
                                onClick={() => setGameStatus('start')}
                                className="flex-1 border-2 border-[#F59E0B] hover:border-[#355485] text-[#F59E0B] hover:text-[#355485] font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
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
                        <div className="w-24 h-24 border-4 border-[#cbdde9] border-t-[#F59E0B] rounded-full animate-spin mx-auto mb-4" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl">🧩</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#355485] mb-2">Menyiapkan Puzzle...</h3>
                    <p className="text-[#6b7280]">Puzzle mudah sedang diacak untukmu</p>
                </div>
            </div>
        </>
    );
};

export default GamePuzzleBentukMudah;