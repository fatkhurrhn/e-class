// src/components/bab4/GameTebakBentukKelas1.jsx
import React, { useState, useEffect, useRef } from 'react';

const GameTebakBentukKelas1 = () => {
    // State game
    const [gameStatus, setGameStatus] = useState('start'); // 'start', 'name', 'playing', 'end'
    const [playerName, setPlayerName] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameHistory, setGameHistory] = useState([]);

    const gameContainerRef = useRef(null);
    const audioBenarRef = useRef(null);
    const audioSalahRef = useRef(null);
    const audioBerhasilRef = useRef(null);
    const audioGagalRef = useRef(null);

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
    useEffect(() => {
        if (gameStatus === 'playing' && shuffledQuestions.length === 0) {
            const shuffled = [...soalBank]
                .sort(() => Math.random() - 0.5)
                .slice(0, 10);
            setShuffledQuestions(shuffled);
            setTimeLeft(30);
        }
    }, [gameStatus]);

    // Timer
    useEffect(() => {
        if (gameStatus === 'playing' && timeLeft > 0 && !showFeedback) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && gameStatus === 'playing') {
            handleNextQuestion();
        }
    }, [timeLeft, gameStatus, showFeedback]);

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

            // Force light mode saat fullscreen
            if (document.fullscreenElement) {
                document.documentElement.classList.remove('dark');
                document.body.classList.remove('dark');
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

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            setGameStatus('playing');
        }
    };

    const startGame = () => {
        setGameStatus('name');
    };

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
            }
        } catch (err) {
            console.log('Audio error:', err);
        }
    };

    const handleAnswer = (jawaban) => {
        if (showFeedback) return;

        setSelectedAnswer(jawaban);
        setShowFeedback(true);

        const benar = jawaban === shuffledQuestions[currentQuestion].jawaban;

        // Play sound effect
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
                setTimeLeft(30);
            } else {
                saveGameResult();
                setGameStatus('end');
            }
        }, 1500);
    };

    const saveGameResult = () => {
        const result = {
            id: Date.now(),
            playerName,
            score,
            correctAnswers: score / 10,
            totalQuestions: 10,
            date: new Date().toLocaleDateString('id-ID'),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
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

    const handleNextQuestion = () => {
        if (currentQuestion < 9) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
            setTimeLeft(30);
        } else {
            saveGameResult();
            setGameStatus('end');
        }
    };

    const restartGame = () => {
        setGameStatus('name');
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShuffledQuestions([]);
    };

    const resetHistory = () => {
        setGameHistory([]);
        localStorage.removeItem('game_tebak_bentuk_history');
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

                <div
                    ref={gameContainerRef}
                    className={`min-h-[600px] bg-[#f9fafb] ${isFullscreen ? 'flex items-center justify-center p-4' : ''}`}
                >
                    <div className={`w-full ${isFullscreen ? 'max-w-[1400px] mx-auto' : ''}`}>
                        <div className="text-center mb-8">
                            <div className="w-24 h-24 rounded-full bg-[#cbdde9] flex items-center justify-center mx-auto mb-6">
                                <span className="text-5xl">🎮</span>
                            </div>
                            <h1 className="text-3xl font-bold text-[#355485] mb-3">
                                Game Tebak Bentuk
                            </h1>
                            <p className="text-[#6b7280] max-w-md mx-auto">
                                Untuk siswa kelas 1 SD. Tebak bentuk dari benda sehari-hari!
                            </p>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Left Column - Aturan Main */}
                            <div className="bg-white rounded-xl p-6 border border-[#e5e7eb]">
                                <h3 className="font-bold text-[#355485] mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📝</span>
                                    <span className="text-xl">Aturan Main</span>
                                </h3>
                                <ul className="space-y-4 text-[#6b7280]">
                                    <li className="flex items-start gap-4 p-3 bg-[#f9fafb] rounded-lg">
                                        <div className="w-8 h-8 bg-[#cbdde9] rounded-full flex items-center justify-center text-[#355485] font-bold text-sm flex-shrink-0">1</div>
                                        <div>
                                            <div className="font-medium text-[#355485] mb-1">Tebak Bentuk</div>
                                            <div className="text-sm">Tebak bentuk dari gambar benda sehari-hari</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-3 bg-[#f9fafb] rounded-lg">
                                        <div className="w-8 h-8 bg-[#cbdde9] rounded-full flex items-center justify-center text-[#355485] font-bold text-sm flex-shrink-0">2</div>
                                        <div>
                                            <div className="font-medium text-[#355485] mb-1">Sistem Poin</div>
                                            <div className="text-sm">Jawaban benar = 10 poin, maksimal 100 poin</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-3 bg-[#f9fafb] rounded-lg">
                                        <div className="w-8 h-8 bg-[#cbdde9] rounded-full flex items-center justify-center text-[#355485] font-bold text-sm flex-shrink-0">3</div>
                                        <div>
                                            <div className="font-medium text-[#355485] mb-1">Jumlah Soal</div>
                                            <div className="text-sm">10 soal acak tiap kali bermain</div>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-4 p-3 bg-[#f9fafb] rounded-lg">
                                        <div className="w-8 h-8 bg-[#cbdde9] rounded-full flex items-center justify-center text-[#355485] font-bold text-sm flex-shrink-0">4</div>
                                        <div>
                                            <div className="font-medium text-[#355485] mb-1">Batas Waktu</div>
                                            <div className="text-sm">30 detik per soal, jawab sebelum waktu habis</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Right Column - Riwayat */}
                            <div className="bg-white rounded-xl p-6 border border-[#e5e7eb]">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-[#355485] flex items-center gap-2">
                                        <span className="text-2xl">📊</span>
                                        <span className="text-xl">Riwayat Permainan</span>
                                    </h3>
                                    {gameHistory.length > 0 && (
                                        <button
                                            onClick={resetHistory}
                                            className="text-sm text-[#6b7280] hover:text-[#4f90c6] hover:underline"
                                        >
                                            Hapus Semua
                                        </button>
                                    )}
                                </div>

                                {gameHistory.length > 0 ? (
                                    <div className="space-y-3">
                                        {gameHistory.slice(0, 5).map((history, index) => (
                                            <div
                                                key={history.id}
                                                className={`p-4 rounded-lg border ${index === 0 ? 'border-[#4f90c6] bg-[#f0f7ff]' : 'border-[#e5e7eb] bg-[#f9fafb]'} transition-all hover:shadow-sm`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <div className="w-8 h-8 rounded-full bg-[#cbdde9] flex items-center justify-center text-[#355485] font-bold text-sm">
                                                                {index + 1}
                                                            </div>
                                                            <div className="font-medium text-[#355485]">{history.playerName}</div>
                                                        </div>
                                                        <div className="text-xs text-[#9ca3af] ml-10">
                                                            {history.date} • {history.time}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`text-xl font-bold ${history.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {history.score}
                                                        </div>
                                                        <div className="text-xs text-[#9ca3af]">
                                                            {history.correctAnswers}/10 soal
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl text-[#cbdde9] mb-3">📝</div>
                                        <p className="text-[#6b7280] font-medium">Belum ada riwayat permainan</p>
                                        <p className="text-sm text-[#9ca3af] mt-1">Mulai permainan untuk melihat riwayat di sini</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={startGame}
                                className="flex-1 bg-[#4f90c6] hover:bg-[#3a7bb5] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <span className="flex items-center justify-center gap-2 text-lg">
                                    <span className="text-xl">🚀</span>
                                    Mulai Bermain
                                </span>
                            </button>
                            <button
                                onClick={toggleFullscreen}
                                className="flex-1 border-2 border-[#e5e7eb] hover:border-[#9ca3af] text-[#6b7280] py-4 px-4 rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-xl">{isFullscreen ? '📱' : '🖥️'}</span>
                                    {isFullscreen ? 'Keluar Fullscreen' : 'Mode Fullscreen'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // Render Name Input Screen
    if (gameStatus === 'name') {
        return (
            <>
                <audio ref={audioBenarRef} src="/audio/sound-benar.mp3" preload="auto" />
                <audio ref={audioSalahRef} src="/audio/sound-salah.mp3" preload="auto" />
                <audio ref={audioBerhasilRef} src="/audio/sound-berhasil.mp3" preload="auto" />
                <audio ref={audioGagalRef} src="/audio/sound-gagal.mp3" preload="auto" />

                <div
                    ref={gameContainerRef}
                    className={`min-h-[600px] bg-[#f9fafb] ${isFullscreen ? 'flex items-center justify-center p-4' : ''}`}
                >
                    <div className={`w-full ${isFullscreen ? 'max-w-[800px] mx-auto' : ''}`}>
                        <div className="text-center mb-8 max-w-md mx-auto">
                            <div className="w-20 h-20 rounded-full bg-[#cbdde9] flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">👤</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#355485] mb-3">
                                Masukkan Nama
                            </h2>
                            <p className="text-[#6b7280] mb-6">
                                Masukkan nama untuk memulai permainan
                            </p>

                            <form onSubmit={handleNameSubmit} className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        value={playerName}
                                        onChange={(e) => setPlayerName(e.target.value)}
                                        placeholder="Nama siswa atau kelompok"
                                        className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] focus:border-[#4f90c6] focus:outline-none bg-white text-[#355485] text-lg"
                                        autoFocus
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setGameStatus('start')}
                                        className="flex-1 border border-[#e5e7eb] hover:border-[#9ca3af] text-[#6b7280] py-3 rounded-xl transition-all duration-300 hover:scale-105"
                                    >
                                        Kembali
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!playerName.trim()}
                                        className="flex-1 bg-[#4f90c6] hover:bg-[#3a7bb5] disabled:bg-[#cbdde9] disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-300 hover:scale-105"
                                    >
                                        Lanjutkan
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="text-center mt-8">
                            <button
                                onClick={toggleFullscreen}
                                className="border border-[#e5e7eb] hover:border-[#9ca3af] text-[#6b7280] py-2 px-4 rounded-lg transition-colors text-sm"
                            >
                                {isFullscreen ? '📱 Keluar Fullscreen' : '🖥️ Mode Fullscreen'}
                            </button>
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

                <div
                    ref={gameContainerRef}
                    className={`min-h-[600px] bg-[#f9fafb] ${isFullscreen ? 'flex items-center justify-center p-4' : ''}`}
                >
                    <div className={`w-full ${isFullscreen ? 'max-w-[1200px] mx-auto' : ''}`}>
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-[#355485]">Tebak Bentuk</h2>
                                <p className="text-[#6b7280] text-sm">Pemain: <span className="font-semibold text-[#4f90c6]">{playerName}</span></p>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-[#e5e7eb] shadow-sm">
                                    <div className="text-center">
                                        <div className="font-bold text-[#4f90c6]">{score}</div>
                                        <div className="text-xs text-[#9ca3af]">Poin</div>
                                    </div>
                                    <div className="w-px h-8 bg-[#e5e7eb]" />
                                    <div className="text-center">
                                        <div className="font-bold text-[#4f90c6]">{currentQuestion + 1}/10</div>
                                        <div className="text-xs text-[#9ca3af]">Soal</div>
                                    </div>
                                    <div className="w-px h-8 bg-[#e5e7eb]" />
                                    <div className={`text-center ${timeLeft < 10 && 'animate-pulse'}`}>
                                        <div className={`font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-[#4f90c6]'}`}>
                                            {timeLeft}s
                                        </div>
                                        <div className="text-xs text-[#9ca3af]">Waktu</div>
                                    </div>
                                </div>

                                <button
                                    onClick={toggleFullscreen}
                                    className="p-3 rounded-lg border border-[#e5e7eb] hover:border-[#9ca3af] text-[#6b7280] hover:bg-white transition-all duration-300"
                                    title={isFullscreen ? "Keluar Fullscreen" : "Mode Fullscreen"}
                                >
                                    {isFullscreen ? '📱' : '🖥️'}
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-[#6b7280] mb-1">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="bg-white rounded-xl p-6 border border-[#e5e7eb] shadow-sm">
                            <div className="flex flex-col lg:flex-row items-center gap-8">
                                {/* Emoji Display */}
                                <div className="flex-1 text-center">
                                    <div className="text-8xl mb-4 animate-bounce">{soal.emoji}</div>
                                    <div className="inline-block bg-gradient-to-r from-[#f9fafb] to-white px-4 py-2 rounded-lg border border-[#e5e7eb] text-[#6b7280] text-sm">
                                        Benda Sehari-hari
                                    </div>
                                </div>

                                {/* Question & Options */}
                                <div className="flex-1 w-full">
                                    <div className="mb-6">
                                        <div className="text-sm text-[#4f90c6] font-medium mb-2">SOAL #{soal.id}</div>
                                        <h3 className="text-xl font-bold text-[#355485]">{soal.pertanyaan}</h3>
                                    </div>

                                    <div className="space-y-3">
                                        {soal.pilihan.map((pilihan, idx) => {
                                            const terpilih = selectedAnswer === pilihan;
                                            const benar = pilihan === soal.jawaban;

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswer(pilihan)}
                                                    disabled={showFeedback}
                                                    className={`w-full p-4 rounded-lg text-left transition-all duration-200
                                                        ${terpilih
                                                            ? benar
                                                                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 transform scale-105'
                                                                : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-800 transform scale-105'
                                                            : 'bg-gradient-to-r from-[#f9fafb] to-white border border-[#e5e7eb] hover:border-[#cbdde9] hover:shadow-sm text-[#355485]'
                                                        }
                                                        ${showFeedback && benar && !terpilih ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800' : ''}
                                                    `}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-medium">{pilihan}</span>
                                                        {terpilih && (
                                                            <span className="text-xl animate-pulse">
                                                                {benar ? '✅' : '❌'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        {/* {showFeedback && (
                            <div className={`mt-6 p-4 rounded-lg text-center animate-fade-in ${selectedAnswer === soal.jawaban ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800' : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800'
                                }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl">
                                        {selectedAnswer === soal.jawaban ? '🎉' : '❌'}
                                    </span>
                                    <span className="font-medium text-lg">
                                        {selectedAnswer === soal.jawaban ? 'Benar!' : 'Salah!'}
                                    </span>
                                </div>
                                <p className="text-sm mt-1">{soal.hint}</p>
                                {selectedAnswer !== soal.jawaban && (
                                    <p className="text-sm mt-1">
                                        Jawaban benar: <span className="font-bold">{soal.jawaban}</span>
                                    </p>
                                )}
                            </div>
                        )} */}
                    </div>
                </div>
            </>
        );
    }

    // Render End Screen
    if (gameStatus === 'end') {
        const nilai = score;
        const pesan = nilai === 100 ? 'Luar Biasa!' : nilai >= 70 ? 'Hebat!' : 'Coba Lagi!';
        const status = nilai >= 70 ? 'berhasil' : 'gagal';

        return (
            <>
                <audio ref={audioBenarRef} src="/audio/sound-benar.mp3" preload="auto" />
                <audio ref={audioSalahRef} src="/audio/sound-salah.mp3" preload="auto" />
                <audio ref={audioBerhasilRef} src="/audio/sound-berhasil.mp3" preload="auto" />
                <audio ref={audioGagalRef} src="/audio/sound-gagal.mp3" preload="auto" />

                <div
                    ref={gameContainerRef}
                    className={`min-h-[600px] bg-[#f9fafb] ${isFullscreen ? 'flex items-center justify-center p-4' : ''}`}
                >
                    <div className={`w-full ${isFullscreen ? 'max-w-[1200px] mx-auto' : ''}`}>
                        <div className="text-center mb-8">
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6
                                ${nilai === 100 ? 'bg-gradient-to-r from-yellow-100 to-orange-100' :
                                    nilai >= 70 ? 'bg-gradient-to-r from-green-100 to-emerald-100' :
                                        'bg-gradient-to-r from-red-100 to-pink-100'}`}
                            >
                                <span className="text-5xl">
                                    {nilai === 100 ? '🏆' : nilai >= 70 ? '🎉' : '📝'}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-[#355485] mb-2">{pesan}</h1>
                            <p className="text-[#6b7280] mb-1">Hasil Game Tebak Bentuk</p>
                            <p className="text-[#4f90c6] font-semibold">Pemain: {playerName}</p>
                        </div>

                        {/* Two Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Left Column - Score Summary */}
                            <div className="bg-white rounded-xl p-6 border border-[#e5e7eb]">
                                <h3 className="font-bold text-[#355485] mb-6 flex items-center gap-2">
                                    <span className="text-2xl">📋</span>
                                    <span className="text-xl">Hasil Permainan</span>
                                </h3>

                                <div className="text-center mb-6">
                                    <div className={`text-5xl font-bold mb-2 ${nilai >= 70 ? 'text-green-600' : 'text-red-600'}`}>{nilai}</div>
                                    <div className="text-[#6b7280]">Nilai Akhir</div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#f9fafb] to-white rounded-lg border border-[#e5e7eb]">
                                        <span className="text-[#6b7280]">Jawaban Benar</span>
                                        <span className="font-bold text-[#355485]">{score / 10} dari 10</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#f9fafb] to-white rounded-lg border border-[#e5e7eb]">
                                        <span className="text-[#6b7280]">Persentase</span>
                                        <span className="font-bold text-[#355485]">{nilai}%</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#f9fafb] to-white rounded-lg border border-[#e5e7eb]">
                                        <span className="text-[#6b7280]">Status</span>
                                        <span className={`font-bold ${nilai >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                            {nilai >= 70 ? '✅ Berhasil' : '❌ Perlu Latihan'}
                                        </span>
                                    </div>
                                </div>

                                <div className={`mt-6 p-4 rounded-lg text-center ${nilai >= 70 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800' : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800'}`}>
                                    <p className="font-medium">
                                        {nilai >= 70 ? '🎉 Selamat! Kamu sudah menguasai materi bentuk!' : '💪 Ayo coba lagi untuk meningkatkan nilaimu!'}
                                    </p>
                                </div>
                            </div>

                            {/* Right Column - History */}
                            <div className="bg-white rounded-xl p-6 border border-[#e5e7eb]">
                                <h3 className="font-bold text-[#355485] mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📊</span>
                                    <span className="text-xl">Riwayat Permainan</span>
                                </h3>
                                <div className="space-y-3">
                                    {gameHistory.slice(0, 5).map((history, index) => (
                                        <div
                                            key={history.id}
                                            className={`p-3 rounded-lg border transition-all hover:shadow-sm ${index === 0 ? 'border-[#4f90c6] bg-gradient-to-r from-[#f0f7ff] to-white' : 'border-[#e5e7eb] bg-[#f9fafb]'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-[#4f90c6] text-white' : 'bg-[#cbdde9] text-[#355485]'}`}>
                                                            {index + 1}
                                                        </div>
                                                        <div className="font-medium text-[#355485]">{history.playerName}</div>
                                                        {index === 0 && (
                                                            <span className="text-xs bg-[#4f90c6] text-white px-2 py-1 rounded-full">TERBARU</span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-[#9ca3af] ml-8">
                                                        {history.date} • {history.time}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-lg font-bold ${history.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                                                        {history.score}
                                                    </div>
                                                    <div className="text-xs text-[#9ca3af]">
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
                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <button
                                onClick={restartGame}
                                className="flex-1 bg-[#4f90c6] hover:bg-[#3a7bb5] text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-xl">🔄</span>
                                    Main Lagi
                                </span>
                            </button>
                            <button
                                onClick={() => setGameStatus('start')}
                                className="flex-1 border-2 border-[#e5e7eb] hover:border-[#9ca3af] text-[#6b7280] py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-xl">🏠</span>
                                    Menu Utama
                                </span>
                            </button>
                        </div>

                        <div className="text-center">
                            <button
                                onClick={toggleFullscreen}
                                className="border border-[#e5e7eb] hover:border-[#9ca3af] text-[#6b7280] py-2 px-4 rounded-lg transition-colors text-sm hover:bg-white"
                            >
                                {isFullscreen ? '📱 Keluar Fullscreen' : '🖥️ Mode Fullscreen'}
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

            <div
                ref={gameContainerRef}
                className={`min-h-[600px] bg-[#f9fafb] flex items-center justify-center ${isFullscreen ? 'p-4' : ''}`}
            >
                <div className={`text-center ${isFullscreen ? 'max-w-[800px] w-full' : ''}`}>
                    <div className="w-16 h-16 border-4 border-[#cbdde9] border-t-[#4f90c6] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#6b7280]">Menyiapkan soal...</p>
                </div>
            </div>
        </>
    );
};

export default GameTebakBentukKelas1;