// src/components/bab4/GameTebakBentukKelas1.jsx
import React, { useState, useEffect, useRef } from 'react';

const GameTebakBentukKelas1 = () => {
    // State game
    const [gameStatus, setGameStatus] = useState('start'); // 'start', 'playing', 'end'
    const [playerName, setPlayerName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
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

    // Data soal
    const soalBank = [
        {
            id: 1,
            emoji: '🍕',
            pertanyaan: "Bentuk pizza ini adalah?",
            pilihan: ['Bulat', 'Segitiga', 'Kotak', 'Persegi Panjang'],
            jawaban: 'Bulat',
            hint: "Pizza biasanya bulat seperti roda"
        },
        {
            id: 2,
            emoji: '📐',
            pertanyaan: "Bentuk penggaris segitiga ini?",
            pilihan: ['Bulat', 'Segitiga', 'Kotak', 'Persegi Panjang'],
            jawaban: 'Segitiga',
            hint: "Mempunyai 3 sisi dan 3 sudut"
        },
        {
            id: 3,
            emoji: '🪟',
            pertanyaan: "Bentuk jendela ini adalah?",
            pilihan: ['Segitiga', 'Bulat', 'Kotak', 'Persegi Panjang'],
            jawaban: 'Kotak',
            hint: "Mempunyai 4 sisi sama panjang"
        },
        {
            id: 4,
            emoji: '📦',
            pertanyaan: "Bentuk kotak hadiah ini?",
            pilihan: ['Kotak', 'Bulat', 'Segitiga', 'Persegi Panjang'],
            jawaban: 'Kotak',
            hint: "Bentuk seperti kubus dengan 6 sisi"
        },
        {
            id: 5,
            emoji: '⚽',
            pertanyaan: "Bentuk bola ini adalah?",
            pilihan: ['Bulat', 'Kotak', 'Segitiga', 'Persegi Panjang'],
            jawaban: 'Bulat',
            hint: "Bentuknya bundar seperti buah jeruk"
        },
        {
            id: 6,
            emoji: '🍫',
            pertanyaan: "Bentuk coklat batangan ini?",
            pilihan: ['Persegi Panjang', 'Segitiga', 'Bulat', 'Kotak'],
            jawaban: 'Persegi Panjang',
            hint: "Bentuknya panjang dengan 4 sisi"
        },
        {
            id: 7,
            emoji: '🛑',
            pertanyaan: "Bentuk rambu stop ini?",
            pilihan: ['Segi Delapan', 'Bulat', 'Kotak', 'Segitiga'],
            jawaban: 'Segi Delapan',
            hint: "Mempunyai 8 sisi yang sama"
        },
        {
            id: 8,
            emoji: '🍩',
            pertanyaan: "Bentuk donat ini adalah?",
            pilihan: ['Bulat', 'Segitiga', 'Kotak', 'Persegi Panjang'],
            jawaban: 'Bulat',
            hint: "Bulat dengan lubang di tengah"
        },
        {
            id: 9,
            emoji: '📏',
            pertanyaan: "Bentuk penggaris panjang ini?",
            pilihan: ['Persegi Panjang', 'Segitiga', 'Bulat', 'Kotak'],
            jawaban: 'Persegi Panjang',
            hint: "Bentuknya panjang dengan sisi sejajar"
        },
        {
            id: 10,
            emoji: '🟦',
            pertanyaan: "Bentuk kertas origami ini?",
            pilihan: ['Kotak', 'Segitiga', 'Bulat', 'Persegi Panjang'],
            jawaban: 'Kotak',
            hint: "Semua sisinya sama panjang"
        }
    ];

    // Load history dari localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('game_tebak_bentuk_history');
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
    };

    useEffect(() => {
        if (gameStatus === 'playing' && shuffledQuestions.length === 0) {
            acakSoal();
        }
    }, [gameStatus]);

    // Fullscreen handler khusus untuk komponen
    const toggleFullscreen = async () => {
        try {
            if (!isFullscreen) {
                if (gameContainerRef.current.requestFullscreen) {
                    await gameContainerRef.current.requestFullscreen();
                } else if (gameContainerRef.current.webkitRequestFullscreen) { /* Safari */
                    await gameContainerRef.current.webkitRequestFullscreen();
                } else if (gameContainerRef.current.msRequestFullscreen) { /* IE11 */
                    await gameContainerRef.current.msRequestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    await document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
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

    const handleAnswer = (jawaban) => {
        if (showFeedback) return;

        playSound('klik');
        setSelectedAnswer(jawaban);
        setShowFeedback(true);

        const benar = jawaban === shuffledQuestions[currentQuestion].jawaban;

        if (benar) {
            playSound('benar');
            setScore(score + 10);
        } else {
            playSound('salah');
        }

        setTimeout(() => {
            if (currentQuestion < 9) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
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
        localStorage.setItem('game_tebak_bentuk_history', JSON.stringify(newHistory));

        // Play hasil sound
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
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowHint(false);
        acakSoal();
    };

    const resetHistory = () => {
        setGameHistory([]);
        localStorage.removeItem('game_tebak_bentuk_history');
    };

    const printResult = (history) => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Hasil Game Tebak Bentuk</title>
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
                        <h1>🎮 Hasil Game Tebak Bentuk</h1>
                        <h3>Untuk Siswa Kelas 1 SD</h3>
                    </div>
                    
                    <div class="result-card">
                        <h2>Pemain: ${history.playerName}</h2>
                        <div class="score">${history.score}</div>
                        <p style="text-align: center; font-size: 18px;">
                            ${history.score >= 70 ? '🎉 Selamat! Kamu hebat!' : '💪 Ayo coba lagi!'}
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
                    </div>
                    
                    <div class="footer">
                        <p>Game Tebak Bentuk - Materi Pembelajaran Kelas 1 SD</p>
                        <p>Kenali bentuk geometri dari benda-benda sehari-hari</p>
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

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
                        {/* <div className="text-center mb-8">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4f90c6] to-[#355485] flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                                <span className="text-6xl">🎯</span>
                            </div>
                            <h1 className="text-4xl font-bold text-[#355485] mb-3">
                                Game Tebak Bentuk
                            </h1>
                            <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
                                Untuk siswa kelas 1 SD. Kenali bentuk geometri dari benda-benda sehari-hari!
                            </p>
                        </div> */}

                        {/* Main Content - Two Columns */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Left Column - Game Options */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                                    <h2 className="text-2xl font-bold text-[#355485] mb-6 flex items-center gap-3">
                                        <span className="text-3xl">🎮</span>
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
                                            className="w-full bg-gradient-to-r from-[#4f90c6] to-[#355485] hover:from-[#3a7bb5] hover:to-[#2a436c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                                        >
                                            <span className="flex items-center justify-center gap-3 text-lg">
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
                                            className="w-full border-2 border-[#4f90c6] hover:border-[#355485] text-[#4f90c6] hover:text-[#355485] font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                                        >
                                            <span className="flex items-center justify-center gap-3 text-lg">
                                                Main Tanpa Nama
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
                                            className="text-sm text-[#6b7280] hover:text-[#4f90c6] hover:underline px-3 py-1 rounded-lg hover:bg-[#f9fafb] transition-colors"
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
                                                className={`p-4 rounded-xl border transition-all hover:shadow-md ${index === 0 ? 'border-[#4f90c6] bg-gradient-to-r from-[#f0f7ff] to-white' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === 0 ? 'bg-gradient-to-br from-[#4f90c6] to-[#355485] text-white' : 'bg-[#cbdde9] text-[#355485]'}`}>
                                                                <span className="font-bold">{index + 1}</span>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-[#355485]">{history.playerName}</div>
                                                                <div className="text-sm text-[#9ca3af]">
                                                                    {history.date} • {history.time}
                                                                </div>
                                                            </div>
                                                            {index === 0 && (
                                                                <span className="text-xs bg-[#4f90c6] text-white px-3 py-1 rounded-full animate-pulse">
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
                        <div className="bg-gradient-to-r from-[#355485] to-[#4f90c6] rounded-2xl p-8 text-white shadow-lg">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-bold mb-3">📚 Materi Pembelajaran</h3>
                                    <p className="opacity-90 max-w-2xl">
                                        Game ini membantu siswa kelas 1 SD mengenal bentuk geometri melalui benda-benda
                                        sehari-hari. Cocok untuk melatih pengenalan bentuk dan observasi visual.
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <div className="text-3xl">🎯</div>
                                        <div className="text-sm">Tebak Bentuk</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl">🧠</div>
                                        <div className="text-sm">Asah Otak</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-3xl">⭐</div>
                                        <div className="text-sm">Menyenangkan</div>
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
                                        Tebak Bentuk dari Benda
                                    </h2>
                                    <p className="text-[#6b7280]">
                                        Pemain: <span className="font-semibold text-[#4f90c6]">{playerName}</span>
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-xl border-2 border-[#e5e7eb] shadow-sm">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#4f90c6]">{score}</div>
                                            <div className="text-xs text-[#9ca3af]">Poin</div>
                                        </div>
                                        <div className="w-px h-8 bg-[#e5e7eb]" />
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#4f90c6]">{currentQuestion + 1}/10</div>
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
                                    <span className="text-sm font-medium text-[#4f90c6]">
                                        Soal {currentQuestion + 1} dari 10
                                    </span>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    {Array.from({ length: 10 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${index === currentQuestion
                                                ? 'bg-gradient-to-br from-[#4f90c6] to-[#355485] text-white transform scale-105 shadow-lg'
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column - Question */}
                            <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4f90c6] to-[#355485] flex items-center justify-center">
                                        <span className="text-2xl text-white">❓</span>
                                    </div>
                                    <div>
                                        <div className="text-sm text-[#4f90c6] font-bold">SOAL #{soal.id}</div>
                                        <h3 className="text-2xl font-bold text-[#355485]">{soal.pertanyaan}</h3>
                                    </div>
                                </div>

                                {/* Emoji Display */}
                                <div className="text-center mb-8">
                                    <div className="text-9xl mb-6 animate-pulse">{soal.emoji}</div>
                                    <div className="inline-block bg-gradient-to-r from-[#f9fafb] to-white px-6 py-3 rounded-xl border-2 border-[#e5e7eb] text-[#6b7280] text-lg font-medium">
                                        Benda Sehari-hari
                                    </div>
                                </div>

                                {/* Hint Button */}
                                {!showFeedback && (
                                    <button
                                        onClick={() => setShowHint(!showHint)}
                                        className="w-full py-3 bg-gradient-to-r from-[#cbdde9] to-[#90b6d5] hover:from-[#90b6d5] hover:to-[#4f90c6] text-[#355485] font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] mb-6"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            <span className="text-xl">💡</span>
                                            {showHint ? 'Sembunyikan Petunjuk' : 'Tampilkan Petunjuk'}
                                        </span>
                                    </button>
                                )}

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

                            {/* Right Column - Answer Options */}
                            <div className="bg-white rounded-2xl p-8 border-2 border-[#e5e7eb] shadow-lg">
                                <h3 className="text-xl font-bold text-[#355485] mb-6 flex items-center gap-3">
                                    <span className="text-2xl">🎯</span>
                                    Pilih Jawaban yang Benar!
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {soal.pilihan.map((pilihan, idx) => {
                                        const terpilih = selectedAnswer === pilihan;
                                        const benar = pilihan === soal.jawaban;
                                        const letters = ['A', 'B', 'C', 'D'];

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleAnswer(pilihan)}
                                                disabled={showFeedback}
                                                className={`w-full p-6 rounded-xl text-left transition-all duration-300 transform hover:scale-[1.02]
                                                    ${terpilih
                                                        ? benar
                                                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-400 text-green-900 shadow-lg'
                                                            : 'bg-gradient-to-r from-red-100 to-pink-100 border-4 border-red-400 text-red-900 shadow-lg'
                                                        : 'bg-gradient-to-r from-[#f9fafb] to-white border-2 border-[#e5e7eb] hover:border-[#90b6d5] hover:shadow-md text-[#355485]'
                                                    }
                                                    ${showFeedback && benar && !terpilih
                                                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-4 border-green-400 text-green-900 shadow-lg'
                                                        : ''
                                                    }
                                                `}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg
                                                        ${terpilih
                                                            ? benar
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-red-500 text-white'
                                                            : 'bg-[#cbdde9] text-[#355485]'
                                                        }
                                                        ${showFeedback && benar && !terpilih
                                                            ? 'bg-green-500 text-white'
                                                            : ''
                                                        }
                                                    `}>
                                                        {letters[idx]}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-xl font-bold">{pilihan}</div>
                                                        {terpilih && (
                                                            <div className="text-sm mt-1 animate-pulse">
                                                                {benar ? '🎉 Jawaban Benar!' : '❌ Jawaban Salah'}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {terpilih && (
                                                        <span className="text-3xl animate-bounce">
                                                            {benar ? '✅' : '❌'}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Feedback Section */}
                                {/* {showFeedback && (
                                    <div className={`mt-6 p-6 rounded-xl text-center animate-fade-in shadow-lg
                                        ${selectedAnswer === soal.jawaban
                                            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-4 border-green-300'
                                            : 'bg-gradient-to-r from-red-50 to-pink-50 border-4 border-red-300'
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-3">
                                            <span className="text-4xl">
                                                {selectedAnswer === soal.jawaban ? '🎉' : '💪'}
                                            </span>
                                            <div>
                                                <div className={`text-2xl font-bold mb-2 ${selectedAnswer === soal.jawaban ? 'text-green-700' : 'text-red-700'}`}>
                                                    {selectedAnswer === soal.jawaban ? 'HOREEE! BENAR!' : 'AYO COBA LAGI!'}
                                                </div>
                                                <p className="text-[#6b7280] text-lg">
                                                    {selectedAnswer === soal.jawaban
                                                        ? `Kamu mendapat 10 poin!`
                                                        : `Jawaban yang benar adalah: ${soal.jawaban}`
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 text-sm text-[#9ca3af]">
                                            Soal berikutnya akan dimulai otomatis...
                                        </div>
                                    </div>
                                )} */}
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
        const status = nilai >= 70 ? 'berhasil' : 'gagal';

        return (
            <>
                <audio ref={audioBenarRef} src="/audio/sound-benar.mp3" preload="auto" />
                <audio ref={audioSalahRef} src="/audio/sound-salah.mp3" preload="auto" />
                <audio ref={audioBerhasilRef} src="/audio/sound-berhasil.mp3" preload="auto" />
                <audio ref={audioGagalRef} src="/audio/sound-gagal.mp3" preload="auto" />
                <audio ref={audioKlikRef} src="/audio/klik.mp3" preload="auto" />

                <div
                    ref={gameContainerRef}
                    className={`min-h-screen bg-gradient-to-b from-[#cbdde9] to-[#f9fafb] ${isFullscreen ? 'flex items-center justify-center p-3' : 'p-4 md:p-6'
                        }`}
                >
                    <div className={`w-full ${isFullscreen ? 'max-w-[1000px]' : 'max-w-[1100px]'} mx-auto`}>

                        {/* HEADER */}
                        <div className="text-center mb-6">
                            <div
                                className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl
        ${nilai === 100
                                        ? 'bg-gradient-to-br from-yellow-300 to-orange-400'
                                        : nilai >= 70
                                            ? 'bg-gradient-to-br from-green-300 to-emerald-400'
                                            : 'bg-gradient-to-br from-blue-300 to-indigo-400'
                                    }`}
                            >
                                <span className="text-4xl">
                                    {nilai === 100 ? '🏆' : nilai >= 70 ? '🎉' : '📚'}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold text-[#355485] mb-2">{pesan}</h1>
                            <p className="text-base text-[#6b7280]">Selesai! Inilah hasil permainanmu</p>
                            <p className="text-[#4f90c6] font-semibold">Pemain: {playerName}</p>
                        </div>

                        {/* CONTENT */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

                            {/* SCORE */}
                            <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-lg">

                                <h3 className="font-bold text-[#355485] mb-5 flex items-center gap-2">
                                    <span className="text-xl">📋</span>
                                    <span className="text-lg">Hasil Permainan</span>
                                </h3>

                                <div className="relative w-40 h-40 mx-auto mb-6">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`text-4xl font-bold ${nilai >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                            {nilai}
                                        </div>
                                    </div>

                                    <svg className="w-full h-full -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                                        <circle
                                            cx="80"
                                            cy="80"
                                            r="70"
                                            stroke={nilai >= 70 ? "#4f90c6" : "#355485"}
                                            strokeWidth="12"
                                            fill="none"
                                            strokeDasharray={`${nilai * 4.4} 440`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>

                                <div className="space-y-3">
                                    {[
                                        { label: 'Jawaban Benar', value: `${score / 10} dari 10` },
                                        { label: 'Total Poin', value: score },
                                        { label: 'Persentase', value: `${nilai}%` },
                                        { label: 'Status', value: nilai >= 70 ? 'BERHASIL' : 'PERLU LATIHAN', color: nilai >= 70 ? 'text-green-600' : 'text-red-600' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center p-3 bg-[#f9fafb] rounded-xl border">
                                            <span className="text-sm text-[#6b7280]">{item.label}</span>
                                            <span className={`font-semibold ${item.color || 'text-[#355485]'}`}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className={`mt-5 p-4 rounded-xl text-center text-sm font-semibold ${nilai >= 70
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                                        }`}
                                >
                                    {nilai >= 70
                                        ? '🎉 Selamat! Kamu sudah menguasai materi.'
                                        : '💪 Tetap semangat! Ayo coba lagi.'}
                                </div>
                            </div>

                            {/* HISTORY */}
                            <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] shadow-lg">

                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-[#355485] flex items-center gap-2">
                                        <span className="text-xl">📊</span>
                                        <span className="text-lg">Riwayat Permainan</span>
                                    </h3>

                                    <button
                                        onClick={() => printResult(gameHistory[0])}
                                        className="bg-gradient-to-r from-[#4f90c6] to-[#355485] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90"
                                    >
                                        🖨️ Print
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {gameHistory.slice(0, 5).map((history, index) => (
                                        <div
                                            key={history.id}
                                            className={`p-3 rounded-xl border ${index === 0 ? 'border-[#4f90c6] bg-[#f0f7ff]' : 'border-[#e5e7eb] bg-[#f9fafb]'
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${index === 0 ? 'bg-[#4f90c6] text-white' : 'bg-[#cbdde9] text-[#355485]'
                                                            }`}
                                                    >
                                                        {index + 1}
                                                    </div>

                                                    <div>
                                                        <div className="font-semibold text-[#355485]">{history.playerName}</div>
                                                        <div className="text-xs text-[#9ca3af]">{history.date} • {history.time}</div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className={`text-xl font-bold ${history.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {history.score}
                                                    </div>
                                                    <div className="text-xs text-[#9ca3af]">{history.correctAnswers}/10</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                            <button
                                onClick={restartGame}
                                className="flex-1 bg-gradient-to-r from-[#4f90c6] to-[#355485] text-white py-3.5 rounded-xl font-semibold hover:opacity-90"
                            >
                                🔄 Main Lagi
                            </button>

                            <button
                                onClick={() => setGameStatus('start')}
                                className="flex-1 border border-[#4f90c6] text-[#4f90c6] py-3.5 rounded-xl font-semibold hover:bg-[#f0f7ff]"
                            >
                                🏠 Menu Utama
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={toggleFullscreen}
                                className="text-sm text-[#6b7280] border px-4 py-2 rounded-lg hover:bg-white"
                            >
                                {isFullscreen ? '📱 Keluar Fullscreen' : '🖥️ Mode Layar Penuh'}
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
                        <div className="w-24 h-24 border-4 border-[#cbdde9] border-t-[#4f90c6] rounded-full animate-spin mx-auto mb-4" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-3xl">🎮</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#355485] mb-2">Menyiapkan Permainan...</h3>
                    <p className="text-[#6b7280]">Soal sedang diacak untukmu</p>
                </div>
            </div>
        </>
    );
};

export default GameTebakBentukKelas1;