// src/components/bab4/GameKelompokkanBentuk.jsx
import React, { useState, useEffect, useRef } from 'react';

const GameKelompokkanBentuk = () => {
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

    // Data soal kelompokkan bentuk
    const soalBank = [
        {
            id: 1,
            title: "Kelompokkan Berdasarkan Warna",
            emoji: "🎨",
            pertanyaan: "Manakah yang termasuk kelompok warna BIRU?",
            hint: "Lihatlah warna setiap benda!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '🔴 Apple', warna: '#EF4444', benar: false },
                { id: 'B', nama: '🔵 Bola', warna: '#3B82F6', benar: true },
                { id: 'C', nama: '🟡 Pisang', warna: '#F59E0B', benar: false },
                { id: 'D', nama: '🟢 Daun', warna: '#10B981', benar: false },
            ],
            jawaban: ['B']
        },
        {
            id: 2,
            title: "Kelompokkan Bentuk Geometri",
            emoji: "🔺",
            pertanyaan: "Manakah bentuk yang memiliki 4 SISI?",
            hint: "Hitung jumlah sisi setiap bentuk!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '🔺 Segitiga', sisi: 3, benar: false },
                { id: 'B', nama: '🟦 Kotak', sisi: 4, benar: true },
                { id: 'C', nama: '⭕ Lingkaran', sisi: 0, benar: false },
                { id: 'D', nama: '⭐ Bintang', sisi: 5, benar: false },
            ],
            jawaban: ['B']
        },
        {
            id: 3,
            title: "Kelompokkan Benda Bulat",
            emoji: "⚽",
            pertanyaan: "Pilih SEMUA benda yang berbentuk BULAT!",
            hint: "Benda bulat tidak memiliki sudut!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '🍕 Pizza', bentuk: 'bulat', benar: true },
                { id: 'B', nama: '📦 Kotak', bentuk: 'kotak', benar: false },
                { id: 'C', nama: '⚽ Bola', bentuk: 'bulat', benar: true },
                { id: 'D', nama: '🍩 Donat', bentuk: 'bulat', benar: true },
            ],
            jawaban: ['A', 'C', 'D']
        },
        {
            id: 4,
            title: "Kelompokkan Ukuran",
            emoji: "📏",
            pertanyaan: "Manakah benda yang berukuran KECIL?",
            hint: "Bandingkan ukuran benda-benda ini!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '🏠 Rumah', ukuran: 'besar', benar: false },
                { id: 'B', nama: '🐜 Semut', ukuran: 'kecil', benar: true },
                { id: 'C', nama: '🐘 Gajah', ukuran: 'besar', benar: false },
                { id: 'D', nama: '📌 Pin', ukuran: 'kecil', benar: true },
            ],
            jawaban: ['B', 'D']
        },
        {
            id: 5,
            title: "Kelompokkan Hewan",
            emoji: "🐶",
            pertanyaan: "Pilih hewan yang hidup di AIR!",
            hint: "Beberapa hewan berenang di air!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '🐟 Ikan', habitat: 'air', benar: true },
                { id: 'B', nama: '🐦 Burung', habitat: 'udara', benar: false },
                { id: 'C', nama: '🐬 Lumba-lumba', habitat: 'air', benar: true },
                { id: 'D', nama: '🐈 Kucing', habitat: 'darat', benar: false },
            ],
            jawaban: ['A', 'C']
        },
        {
            id: 6,
            title: "Kelompokkan Buah",
            emoji: "🍎",
            pertanyaan: "Manakah buah yang berwarna MERAH?",
            hint: "Perhatikan warna kulit buahnya!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '🍎 Apel', warna: 'merah', benar: true },
                { id: 'B', nama: '🍌 Pisang', warna: 'kuning', benar: false },
                { id: 'C', nama: '🍓 Stroberi', warna: 'merah', benar: true },
                { id: 'D', nama: '🍊 Jeruk', warna: 'oranye', benar: false },
            ],
            jawaban: ['A', 'C']
        },
        {
            id: 7,
            title: "Kelompokkan Transportasi",
            emoji: "🚗",
            pertanyaan: "Pilih kendaraan yang berjalan di DARAT!",
            hint: "Kendaraan darat punya roda!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '✈️ Pesawat', jenis: 'udara', benar: false },
                { id: 'B', nama: '🚗 Mobil', jenis: 'darat', benar: true },
                { id: 'C', nama: '🚢 Kapal', jenis: 'laut', benar: false },
                { id: 'D', nama: '🚂 Kereta', jenis: 'darat', benar: true },
            ],
            jawaban: ['B', 'D']
        },
        {
            id: 8,
            title: "Kelompokkan Bentuk Segitiga",
            emoji: "🔺",
            pertanyaan: "Manakah benda yang berbentuk SEGITIGA?",
            hint: "Segitiga memiliki 3 sisi dan 3 sudut!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '📐 Penggaris Segitiga', bentuk: 'segitiga', benar: true },
                { id: 'B', nama: '🔺 Segitiga', bentuk: 'segitiga', benar: true },
                { id: 'C', nama: '⛺ Tenda', bentuk: 'segitiga', benar: true },
                { id: 'D', nama: '🟦 Kertas', bentuk: 'persegi', benar: false },
            ],
            jawaban: ['A', 'B', 'C']
        },
        {
            id: 9,
            title: "Kelompokkan Alat Tulis",
            emoji: "✏️",
            pertanyaan: "Pilih alat yang digunakan untuk MENULIS!",
            hint: "Alat tulis membantu kita belajar!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '✏️ Pensil', fungsi: 'menulis', benar: true },
                { id: 'B', nama: '📏 Penggaris', fungsi: 'mengukur', benar: false },
                { id: 'C', nama: '🖍️ Krayon', fungsi: 'mewarnai', benar: false },
                { id: 'D', nama: '🖊️ Pulpen', fungsi: 'menulis', benar: true },
            ],
            jawaban: ['A', 'D']
        },
        {
            id: 10,
            title: "Kelompokkan Makanan",
            emoji: "🍽️",
            pertanyaan: "Manakah makanan yang TERMASUK SAYURAN?",
            hint: "Sayuran berasal dari tanaman!",
            tipe: "pilihan_ganda",
            gambar: null,
            kelompok: [
                { id: 'A', nama: '🥕 Wortel', jenis: 'sayur', benar: true },
                { id: 'B', nama: '🍗 Ayam', jenis: 'daging', benar: false },
                { id: 'C', nama: '🍎 Apel', jenis: 'buah', benar: false },
                { id: 'D', nama: '🥦 Brokoli', jenis: 'sayur', benar: true },
            ],
            jawaban: ['A', 'D']
        }
    ];

    // Load history dari localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('game_kelompokkan_history');
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

    const toggleAnswer = (questionId, answerId) => {
        if (showFeedback) return;

        playSound('klik');
        setSelectedAnswers(prev => {
            const current = prev[questionId] || [];
            if (current.includes(answerId)) {
                return {
                    ...prev,
                    [questionId]: current.filter(id => id !== answerId)
                };
            } else {
                return {
                    ...prev,
                    [questionId]: [...current, answerId]
                };
            }
        });
    };

    const checkAnswer = () => {
        if (showFeedback) return;

        const currentSoal = shuffledQuestions[currentQuestion];
        const userAnswers = selectedAnswers[currentSoal.id] || [];
        const correctAnswers = currentSoal.jawaban;

        // Sort untuk perbandingan
        const sortedUser = [...userAnswers].sort();
        const sortedCorrect = [...correctAnswers].sort();

        const isCorrect = JSON.stringify(sortedUser) === JSON.stringify(sortedCorrect);

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
            mode: playerMode
        };

        const newHistory = [result, ...gameHistory.slice(0, 4)];
        setGameHistory(newHistory);
        localStorage.setItem('game_kelompokkan_history', JSON.stringify(newHistory));

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
        localStorage.removeItem('game_kelompokkan_history');
    };

    const printResult = (history) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Hasil Game Kelompokkan Bentuk</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            color: #355485;
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                            border-bottom: 3px solid #4f90c6;
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
                            background: #e8f4ff;
                            border-radius: 10px;
                            border: 1px solid #90b6d5;
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
                        <h1>🎮 Hasil Game Kelompokkan Bentuk</h1>
                        <h3>Untuk Siswa Kelas 1 SD</h3>
                    </div>
                    
                    <div class="result-card">
                        <h2>Pemain: ${history.playerName}</h2>
                        <div class="score">${history.score}</div>
                        <p style="text-align: center; font-size: 18px;">
                            ${history.score >= 70 ? '🎉 Hebat! Kamu jago mengelompokkan!' : '💪 Terus berlatih mengelompokkan!'}
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
                            <h4>💡 Kemampuan yang Dilatih:</h4>
                            <ul>
                                <li>Mengelompokkan berdasarkan kriteria</li>
                                <li>Mengklasifikasikan bentuk</li>
                                <li>Mengenali pola dan karakteristik</li>
                                <li>Mengamati dengan teliti</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer">
                        <p>Game Kelompokkan Bentuk - Materi Pembelajaran Kelas 1 SD</p>
                        <p>Melatih kemampuan mengelompokkan dan mengklasifikasikan bentuk</p>
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
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#10B981] to-[#355485] flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                                <span className="text-6xl">🧩</span>
                            </div>
                            <h1 className="text-4xl font-bold text-[#355485] mb-3">
                                Game Kelompokkan Bentuk
                            </h1>
                            <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
                                Untuk siswa kelas 1 SD. Latih kemampuan mengelompokkan dan mengklasifikasikan bentuk!
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
                                                className="w-full px-4 py-3 rounded-xl border-2 border-[#cbdde9] focus:border-[#4f90c6] focus:outline-none bg-white text-[#355485] text-lg transition-all"
                                            />
                                        </div>

                                        <button
                                            onClick={startGameWithName}
                                            disabled={!playerName.trim()}
                                            className="w-full bg-gradient-to-r from-[#10B981] to-[#355485] hover:from-[#0DA271] hover:to-[#2a436c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
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
                                            className="w-full border-2 border-[#10B981] hover:border-[#355485] text-[#10B981] hover:text-[#355485] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
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
                                            className="text-sm text-[#6b7280] hover:text-[#10B981] hover:underline px-3 py-1 rounded-lg hover:bg-[#f9fafb] transition-colors"
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
                                                className={`p-4 rounded-xl border transition-all hover:shadow-md ${index === 0 ? 'border-[#10B981] bg-gradient-to-r from-[#f0fff4] to-white' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-gradient-to-br from-[#10B981] to-[#355485] text-white' : 'bg-[#cbdde9] text-[#355485]'}`}>
                                                                <span className="font-bold">{index + 1}</span>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-[#355485]">{history.playerName}</div>
                                                                <div className="text-sm text-[#9ca3af]">
                                                                    {history.date} • {history.time}
                                                                </div>
                                                            </div>
                                                            {index === 0 && (
                                                                <span className="text-xs bg-[#10B981] text-white px-3 py-1 rounded-full animate-pulse">
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
                        <div className="bg-gradient-to-r from-[#355485] to-[#10B981] rounded-2xl p-8 text-white shadow-lg">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-3">🎯 Tujuan Pembelajaran</h3>
                                    <p className="opacity-90 max-w-2xl">
                                        Game ini melatih kemampuan mengelompokkan dan mengklasifikasikan bentuk berdasarkan
                                        berbagai kriteria seperti warna, jenis, jumlah sisi, dan kategori.
                                        Siswa belajar mengenali pola dan karakteristik setiap bentuk geometri.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl">🧩</div>
                                        <div className="text-sm">Kelompokkan</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl">🔍</div>
                                        <div className="text-sm">Amati</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl">🧠</div>
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
        const currentAnswers = selectedAnswers[soal.id] || [];

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
                                        Kelompokkan Bentuk
                                    </h2>
                                    <p className="text-[#6b7280]">
                                        Pemain: <span className="font-semibold text-[#10B981]">{playerName}</span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-xl border-2 border-[#e5e7eb] shadow-sm">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#10B981]">{score}</div>
                                            <div className="text-xs text-[#9ca3af]">Poin</div>
                                        </div>
                                        <div className="w-px h-8 bg-[#e5e7eb]" />
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#10B981]">{currentQuestion + 1}/10</div>
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
                                    <span className="text-sm font-medium text-[#10B981]">
                                        Soal {currentQuestion + 1} dari 10
                                    </span>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${index === currentQuestion
                                                ? 'bg-gradient-to-br from-[#10B981] to-[#355485] text-white transform scale-105 shadow-lg'
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column - Question */}
                            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#10B981] to-[#355485] flex items-center justify-center">
                                        <span className="text-4xl">{soal.emoji}</span>
                                    </div>
                                    <div>
                                        <div className="text-sm text-[#10B981] font-bold mb-1">{soal.title}</div>
                                        <h3 className="text-2xl font-bold text-[#355485]">{soal.pertanyaan}</h3>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <p className="text-[#6b7280] text-lg mb-4">
                                        Pilih <span className="font-bold text-[#10B981]">SEMUA JAWABAN YANG BENAR</span>!
                                    </p>

                                    {/* Hint Button */}
                                    <button
                                        onClick={() => setShowHint(!showHint)}
                                        className="w-full py-3 bg-gradient-to-r from-[#cbdde9] to-[#90b6d5] hover:from-[#90b6d5] hover:to-[#10B981] text-[#355485] font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] mb-6"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            <span className="text-xl">💡</span>
                                            {showHint ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk'}
                                        </span>
                                    </button>

                                    {/* Hint Display */}
                                    {showHint && !showFeedback && (
                                        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl mb-6 animate-fade-in">
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

                                {/* Answer Options */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {soal.kelompok.map((item) => {
                                        const isSelected = currentAnswers.includes(item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => toggleAnswer(soal.id, item.id)}
                                                disabled={showFeedback}
                                                className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${isSelected
                                                    ? 'bg-gradient-to-r from-[#10B981] to-[#355485] border-[#10B981] text-white shadow-lg'
                                                    : 'bg-gradient-to-r from-[#f9fafb] to-white border-[#e5e7eb] hover:border-[#cbdde9] text-[#355485]'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${isSelected ? 'bg-white/20' : 'bg-[#cbdde9]'}`}>
                                                        {item.emoji || item.nama.charAt(0)}
                                                    </div>
                                                    <div className="flex-1 text-left">
                                                        <div className="font-bold text-lg">{item.nama}</div>
                                                        {item.warna && (
                                                            <div className="text-sm opacity-80">Warna: {item.warna}</div>
                                                        )}
                                                        {item.sisi !== undefined && (
                                                            <div className="text-sm opacity-80">Sisi: {item.sisi}</div>
                                                        )}
                                                    </div>
                                                    {isSelected && (
                                                        <span className="text-2xl animate-pulse">✓</span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Right Column - Controls & Feedback */}
                            <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                                <div className="sticky top-8">
                                    {/* Instructions */}
                                    <div className="mb-8">
                                        <h4 className="font-bold text-[#355485] mb-3 flex items-center gap-2">
                                            <span className="text-xl">📝</span>
                                            Petunjuk Bermain
                                        </h4>
                                        <ul className="space-y-2 text-sm text-[#6b7280]">
                                            <li className="flex items-start gap-2">
                                                <span>1.</span>
                                                <span>Baca pertanyaan dengan teliti</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span>2.</span>
                                                <span>Pilih SEMUA jawaban yang benar</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span>3.</span>
                                                <span>Klik "Periksa Jawaban" saat selesai</span>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Selected Answers */}
                                    <div className="mb-8">
                                        <h4 className="font-bold text-[#355485] mb-3 flex items-center gap-2">
                                            <span className="text-xl">✅</span>
                                            Jawaban Terpilih
                                        </h4>
                                        <div className="min-h-[100px] p-4 bg-[#f9fafb] rounded-xl border-2 border-[#e5e7eb]">
                                            {currentAnswers.length > 0 ? (
                                                <div className="flex flex-wrap gap-2">
                                                    {currentAnswers.map(answerId => {
                                                        const item = soal.kelompok.find(k => k.id === answerId);
                                                        return (
                                                            <div
                                                                key={answerId}
                                                                className="px-3 py-2 bg-gradient-to-r from-[#10B981] to-[#355485] text-white rounded-lg flex items-center gap-2"
                                                            >
                                                                <span>{item.emoji || item.nama.charAt(0)}</span>
                                                                <span>{item.nama}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            ) : (
                                                <p className="text-[#9ca3af] text-center py-4">Belum ada jawaban terpilih</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Check Button */}
                                    <button
                                        onClick={checkAnswer}
                                        disabled={currentAnswers.length === 0 || showFeedback}
                                        className="w-full bg-gradient-to-r from-[#10B981] to-[#355485] hover:from-[#0DA271] hover:to-[#2a436c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg mb-4"
                                    >
                                        <span className="flex items-center justify-center gap-3 text-lg">
                                            <span className="text-xl">🔍</span>
                                            Periksa Jawaban
                                        </span>
                                    </button>

                                    {/* Feedback */}
                                    {showFeedback && (
                                        <div className={`p-4 rounded-xl text-center animate-fade-in shadow-lg ${currentAnswers.sort().join(',') === soal.jawaban.sort().join(',')
                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
                                            : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300'
                                            }`}
                                        >
                                            <div className="flex flex-col items-center gap-2">
                                                <span className="text-3xl">
                                                    {currentAnswers.sort().join(',') === soal.jawaban.sort().join(',') ? '🎉' : '💪'}
                                                </span>
                                                <div className={`text-lg font-bold ${currentAnswers.sort().join(',') === soal.jawaban.sort().join(',') ? 'text-green-700' : 'text-red-700'}`}>
                                                    {currentAnswers.sort().join(',') === soal.jawaban.sort().join(',')
                                                        ? 'BENAR SEMUA!'
                                                        : 'AYO COBA LAGI!'
                                                    }
                                                </div>
                                                {currentAnswers.sort().join(',') !== soal.jawaban.sort().join(',') && (
                                                    <div className="text-sm text-[#6b7280]">
                                                        Jawaban benar: {soal.jawaban.map(j => {
                                                            const item = soal.kelompok.find(k => k.id === j);
                                                            return item.nama;
                                                        }).join(', ')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
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
                                    {nilai === 100 ? '🏆' : nilai >= 70 ? '🎉' : '📚'}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-[#355485] mb-3">{pesan}</h1>
                            <p className="text-[#6b7280] text-lg mb-1">Selesai! Inilah Hasil Permainanmu</p>
                            <p className="text-[#10B981] font-bold text-xl">Pemain: {playerName}</p>
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
                                            stroke={nilai >= 70 ? "#10B981" : "#355485"}
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
                                <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-[#f0fff4] to-white border-2 border-[#10B981]">
                                    <h4 className="font-bold text-[#355485] mb-3 flex items-center gap-2">
                                        <span className="text-xl">🎯</span>
                                        Kemampuan yang Dilatih
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['Mengelompokkan', 'Mengklasifikasi', 'Mengamati', 'Menganalisis'].map((skill, idx) => (
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
                                        className="bg-gradient-to-r from-[#10B981] to-[#355485] hover:from-[#0DA271] hover:to-[#2a436c] text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2"
                                    >
                                        <span>🖨️</span>
                                        Print Hasil Ini
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {gameHistory.slice(0, 5).map((history, index) => (
                                        <div
                                            key={history.id}
                                            className={`p-4 rounded-xl border-2 transition-all hover:shadow-md ${index === 0 ? 'border-[#10B981] bg-gradient-to-r from-[#f0fff4] to-white' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${index === 0 ? 'bg-gradient-to-br from-[#10B981] to-[#355485] text-white' : 'bg-[#cbdde9] text-[#355485]'}`}>
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-[#355485]">{history.playerName}</div>
                                                        <div className="text-sm text-[#9ca3af]">
                                                            {history.date} • {history.time}
                                                        </div>
                                                    </div>
                                                    {index === 0 && (
                                                        <span className="text-xs bg-[#10B981] text-white px-3 py-1 rounded-full animate-pulse">
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
                                className="flex-1 bg-gradient-to-r from-[#10B981] to-[#355485] hover:from-[#0DA271] hover:to-[#2a436c] text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl"
                            >
                                <span className="flex items-center justify-center gap-3 text-lg">
                                    <span className="text-2xl">🔄</span>
                                    MAIN LAGI
                                </span>
                            </button>
                            <button
                                onClick={() => setGameStatus('start')}
                                className="flex-1 border-2 border-[#10B981] hover:border-[#355485] text-[#10B981] hover:text-[#355485] font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
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
                        <div className="w-24 h-24 border-4 border-[#cbdde9] border-t-[#10B981] rounded-full animate-spin mx-auto mb-4" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl">🧩</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#355485] mb-2">Menyiapkan Permainan...</h3>
                    <p className="text-[#6b7280]">Soal sedang diacak untukmu</p>
                </div>
            </div>
        </>
    );
};

export default GameKelompokkanBentuk;