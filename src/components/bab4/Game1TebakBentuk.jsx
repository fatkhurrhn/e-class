// src/components/bab4/Game1TebakBentuk.jsx
import React, { useState, useEffect } from 'react';

const Game1TebakBentuk = () => {
    // State untuk flow game
    const [gamePhase, setGamePhase] = useState('start'); // 'start', 'name', 'playing', 'result'
    const [playerName, setPlayerName] = useState('');

    // State untuk game
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);

    // Data pertanyaan
    const questions = [
        {
            id: 1,
            image: '🍕',
            question: "Bentuk utama pizza ini adalah?",
            options: ['Segitiga', 'Persegi', 'Lingkaran', 'Persegi Panjang'],
            correct: 'Lingkaran',
            hint: "Pizza biasanya bulat seperti roda"
        },
        {
            id: 2,
            image: '📐',
            question: "Bentuk penggaris ini adalah?",
            options: ['Lingkaran', 'Segitiga', 'Persegi', 'Bintang'],
            correct: 'Segitiga',
            hint: "Mempunyai 3 sisi dan 3 sudut"
        },
        {
            id: 3,
            image: '🪟',
            question: "Bentuk jendela ini adalah?",
            options: ['Segitiga', 'Lingkaran', 'Persegi', 'Oval'],
            correct: 'Persegi',
            hint: "Mempunyai 4 sisi sama panjang"
        },
        {
            id: 4,
            image: '📦',
            question: "Bentuk kotak ini adalah?",
            options: ['Kubus', 'Bola', 'Kerucut', 'Tabung'],
            correct: 'Kubus',
            hint: "Bangun ruang dengan 6 sisi persegi"
        },
        {
            id: 5,
            image: '⚽',
            question: "Bentuk bola ini adalah?",
            options: ['Kubus', 'Tabung', 'Bola', 'Piramida'],
            correct: 'Bola',
            hint: "Bentuk bulat sempurna seperti buah jeruk"
        },
        {
            id: 6,
            image: '🍫',
            question: "Bentuk coklat ini adalah?",
            options: ['Persegi Panjang', 'Segitiga', 'Lingkaran', 'Jajar Genjang'],
            correct: 'Persegi Panjang',
            hint: "Panjang dan memiliki 4 sudut siku-siku"
        },
        {
            id: 7,
            image: '🛑',
            question: "Bentuk rambu lalu lintas ini adalah?",
            options: ['Segitiga', 'Persegi', 'Segi Delapan', 'Lingkaran'],
            correct: 'Segi Delapan',
            hint: "Mempunyai 8 sisi yang sama"
        },
        {
            id: 8,
            image: '🍩',
            question: "Bentuk donat ini adalah?",
            options: ['Lingkaran', 'Oval', 'Persegi', 'Segitiga'],
            correct: 'Lingkaran',
            hint: "Bulat dengan lubang di tengah"
        }
    ];

    // Load history dari localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('game1_history');
        if (savedHistory) {
            setGameHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Timer effect
    useEffect(() => {
        if (gamePhase === 'playing' && timeLeft > 0 && !gameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && gamePhase === 'playing') {
            handleGameOver();
        }
    }, [timeLeft, gamePhase, gameOver]);

    // Fullscreen effect
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const handleStartGame = () => {
        setGamePhase('name');
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            setGamePhase('playing');
        }
    };

    const handleAnswer = (answer) => {
        if (selectedAnswer || gameOver) return;

        setSelectedAnswer(answer);
        const isCorrect = answer === questions[currentQuestion].correct;

        if (isCorrect) {
            setScore(score + 100);
            setFeedback('🎉 Benar! ' + questions[currentQuestion].hint);
        } else {
            setFeedback('❌ Salah! ' + questions[currentQuestion].hint);
        }

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setFeedback('');
                setTimeLeft(30); // Reset timer untuk soal berikutnya
            } else {
                handleGameOver();
            }
        }, 1500);
    };

    const handleGameOver = () => {
        setGameOver(true);

        // Simpan hasil game ke history
        const result = {
            id: Date.now(),
            playerName,
            score,
            totalQuestions: questions.length,
            correctAnswers: Math.round(score / 100),
            date: new Date().toLocaleDateString('id-ID'),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };

        const newHistory = [result, ...gameHistory.slice(0, 4)];
        setGameHistory(newHistory);
        localStorage.setItem('game1_history', JSON.stringify(newHistory));

        setTimeout(() => {
            setGamePhase('result');
        }, 2000);
    };

    const restartGame = () => {
        setCurrentQuestion(0);
        setScore(0);
        setGameOver(false);
        setSelectedAnswer(null);
        setFeedback('');
        setTimeLeft(30);
        setGamePhase('playing');
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;

    // Render berdasarkan game phase
    const renderContent = () => {
        switch (gamePhase) {
            case 'start':
                return (
                    <div className="text-center">
                        {/* Header dengan Fullscreen Button */}
                        <div className="flex justify-between items-center mb-10">
                            <div></div>
                            <button
                                onClick={toggleFullscreen}
                                className="p-3 rounded-xl bg-[#f9fafb] hover:bg-[#e5e7eb] transition-colors duration-300 border border-[#e5e7eb]"
                                title={isFullscreen ? "Keluar Fullscreen" : "Mode Fullscreen"}
                            >
                                {isFullscreen ? '📱 Keluar Fullscreen' : '🖥️ Fullscreen'}
                            </button>
                        </div>

                        <div className="mb-10">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] mb-6">
                                <span className="text-5xl">🎮</span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-4">Game Tebak Bentuk</h2>
                            <p className="text-[#6b7280] text-lg max-w-md mx-auto">
                                Kenali bentuk geometri dari benda-benda sehari-hari
                            </p>
                        </div>

                        {/* <div className="bg-gradient-to-br from-[#f9fafb] to-white rounded-2xl p-8 mb-10 border border-[#e5e7eb]">
                            <h3 className="text-xl font-semibold text-[#355485] mb-4 flex items-center justify-center gap-2">
                                <span>🎯</span> Tujuan Game
                            </h3>
                            <ul className="text-[#6b7280] space-y-3 text-left max-w-sm mx-auto">
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-[#cbdde9] rounded-full flex items-center justify-center text-[#355485] text-sm mt-0.5">1</div>
                                    <span>Kenali bentuk dari benda sekitar</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-[#cbdde9] rounded-full flex items-center justify-center text-[#355485] text-sm mt-0.5">2</div>
                                    <span>Latihan pengamatan visual</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-[#cbdde9] rounded-full flex items-center justify-center text-[#355485] text-sm mt-0.5">3</div>
                                    <span>Kumpulkan skor tertinggi</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-[#cbdde9] rounded-full flex items-center justify-center text-[#355485] text-sm mt-0.5">4</div>
                                    <span>Jawab sebelum waktu habis</span>
                                </li>
                            </ul>
                        </div> */}


                        <button
                            onClick={handleStartGame}
                            className="bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] hover:from-[#3a7bb5] hover:to-[#7aa8d1] 
                       text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 
                       hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto"
                        >
                            <span>🚀</span> Siap Mulai!
                        </button>
                    </div>
                );

            case 'name':
                return (
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] mb-6">
                                <span className="text-4xl">👤</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#355485] mb-3">Siapa Namamu?</h2>
                            <p className="text-[#6b7280]">Masukkan nama untuk menyimpan hasil permainan</p>
                        </div>

                        <form onSubmit={handleNameSubmit} className="space-y-6">
                            <div>
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    placeholder="Masukkan nama kamu"
                                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-[#cbdde9] focus:border-[#4f90c6] 
                           focus:outline-none focus:ring-2 focus:ring-[#4f90c6]/30 transition-all duration-300
                           bg-white placeholder-[#9ca3af]"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setGamePhase('start')}
                                    className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#cbdde9] text-[#6b7280] 
                           font-medium hover:border-[#9ca3af] transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <span>←</span> Kembali
                                </button>
                                <button
                                    type="submit"
                                    disabled={!playerName.trim()}
                                    className="flex-1 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] hover:from-[#3a7bb5] 
                           hover:to-[#7aa8d1] text-white font-bold py-3 px-6 rounded-2xl 
                           transition-all duration-300 hover:scale-105 disabled:opacity-50 
                           disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    Mulai Game <span>→</span>
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case 'playing':
                const currentQ = questions[currentQuestion];
                return (
                    <>
                        {/* Game Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-[#355485]">Tebak Bentuk</h2>
                                <p className="text-[#6b7280]">Player: <span className="font-semibold text-[#355485]">{playerName}</span></p>
                            </div>

                            {/* Game Stats */}
                            <div className="flex items-center gap-4 flex-wrap">
                                <div className="flex items-center gap-6 bg-white p-4 rounded-xl border border-[#e5e7eb]">
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-[#4f90c6]">{currentQuestion + 1}/{questions.length}</div>
                                        <div className="text-sm text-[#9ca3af]">Soal</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xl font-bold text-[#4f90c6]">{score}</div>
                                        <div className="text-sm text-[#9ca3af]">Skor</div>
                                    </div>
                                    <div className={`text-center ${timeLeft < 10 ? 'animate-pulse' : ''}`}>
                                        <div className={`text-xl font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-[#4f90c6]'}`}>
                                            {timeLeft}s
                                        </div>
                                        <div className="text-sm text-[#9ca3af]">Waktu</div>
                                    </div>
                                </div>
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-3 rounded-xl bg-[#f9fafb] hover:bg-[#e5e7eb] transition-colors duration-300 border border-[#e5e7eb]"
                                    title={isFullscreen ? "Keluar Fullscreen" : "Mode Fullscreen"}
                                >
                                    {isFullscreen ? '📱' : '🖥️'}
                                </button>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm text-[#6b7280] mb-2">
                                <span>Soal {currentQuestion + 1} dari {questions.length}</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="w-full bg-[#e5e7eb] rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Question Area */}
                        <div className="bg-white rounded-2xl p-8 mb-8 shadow-lg border border-[#e5e7eb]">
                            <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
                                {/* Object Image */}
                                <div className="text-center flex-1">
                                    <div className="relative mb-8">
                                        <div className="text-9xl mb-4 animate-bounce">{currentQ.image}</div>
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white px-4 py-2 rounded-full text-sm font-medium">
                                            Benda Sehari-hari
                                        </div>
                                    </div>
                                    <div className="text-lg text-[#6b7280] max-w-md">
                                        Perhatikan baik-baik bentuk dari benda di atas!
                                    </div>
                                </div>

                                {/* Question */}
                                <div className="flex-1 w-full">
                                    <div className="mb-8">
                                        <div className="text-sm text-[#4f90c6] font-semibold mb-2">SOAL #{currentQ.id}</div>
                                        <h3 className="text-2xl lg:text-3xl font-bold text-[#355485] leading-relaxed">
                                            {currentQ.question}
                                        </h3>
                                    </div>

                                    {/* Options */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {currentQ.options.map((option, index) => {
                                            const isSelected = selectedAnswer === option;
                                            const isCorrect = option === currentQ.correct;

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswer(option)}
                                                    disabled={selectedAnswer}
                                                    className={`p-5 rounded-xl text-lg font-medium transition-all duration-300 relative overflow-hidden
                                                        ${isSelected
                                                            ? isCorrect
                                                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white transform scale-105 shadow-lg'
                                                                : 'bg-gradient-to-r from-red-500 to-pink-500 text-white transform scale-105 shadow-lg'
                                                            : 'bg-gradient-to-br from-[#f9fafb] to-white border-2 border-[#e5e7eb] hover:border-[#4f90c6] text-[#355485] hover:scale-105 hover:shadow-md'
                                                        }
                                                        ${selectedAnswer && isCorrect ? 'ring-4 ring-green-500/30' : ''}
                                                    `}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span>{option}</span>
                                                        {isSelected && (
                                                            <span className="text-xl">
                                                                {isCorrect ? '✓' : '✗'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {isSelected && isCorrect && (
                                                        <div className="absolute top-0 right-0 w-8 h-8 bg-green-500 rounded-bl-full flex items-start justify-end p-2">
                                                            <span className="text-white text-sm">✓</span>
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        {feedback && (
                            <div className={`p-5 rounded-2xl mb-6 text-center text-lg font-medium animate-fade-in
                ${feedback.includes('🎉')
                                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800'
                                    : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800'
                                }`}
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <span className="text-2xl">
                                        {feedback.includes('🎉') ? '🎉' : '❌'}
                                    </span>
                                    <span>{feedback}</span>
                                </div>
                                {!feedback.includes('🎉') && (
                                    <div className="mt-2 text-sm text-red-600">
                                        Jawaban yang benar: <span className="font-bold">{currentQ.correct}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Hint untuk soal pertama */}
                        {currentQuestion === 0 && !selectedAnswer && (
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-4 mb-6 text-center">
                                <div className="flex items-center justify-center gap-2 text-blue-700">
                                    <span>💡</span>
                                    <span className="text-sm">Pilih salah satu jawaban dengan mengklik tombol di atas</span>
                                </div>
                            </div>
                        )}

                        {/* Game Over Overlay */}
                        {gameOver && (
                            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
                                <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
                                    <div className="text-6xl mb-4 animate-spin">⏳</div>
                                    <h3 className="text-2xl font-bold text-[#355485] mb-3">Waktu Habis!</h3>
                                    <p className="text-[#6b7280] mb-6">Menyimpan hasil permainan...</p>
                                    <div className="text-sm text-[#9ca3af]">
                                        Skor sementara: <span className="font-bold text-[#4f90c6]">{score}</span> poin
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'result':
                const correctCount = Math.round(score / 100);
                const accuracy = Math.round((correctCount / questions.length) * 100);

                return (
                    <>
                        {/* Header dengan Fullscreen Button */}
                        <div className="flex justify-between items-center mb-10">
                            <div></div>
                            <button
                                onClick={toggleFullscreen}
                                className="p-3 rounded-xl bg-[#f9fafb] hover:bg-[#e5e7eb] transition-colors duration-300 border border-[#e5e7eb]"
                                title={isFullscreen ? "Keluar Fullscreen" : "Mode Fullscreen"}
                            >
                                {isFullscreen ? '📱 Keluar Fullscreen' : '🖥️ Fullscreen'}
                            </button>
                        </div>

                        {/* Result Header */}
                        <div className="text-center mb-10">
                            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6
                ${score >= 600 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg' :
                                    score >= 400 ? 'bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg' :
                                        'bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] shadow-lg'}`}
                            >
                                <span className="text-5xl">
                                    {score >= 600 ? '🏆' : score >= 400 ? '🎉' : '🌟'}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-3">
                                {score >= 600 ? 'Luar Biasa!' :
                                    score >= 400 ? 'Hebat!' :
                                        accuracy >= 50 ? 'Bagus!' : 'Coba Lagi!'}
                            </h2>
                            <p className="text-[#6b7280]">Hasil permainan <span className="font-semibold text-[#355485]">{playerName}</span></p>
                        </div>

                        {/* Score Card */}
                        <div className="bg-gradient-to-br from-white to-[#f9fafb] rounded-2xl p-8 mb-10 border border-[#e5e7eb] shadow-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center p-4 bg-white rounded-xl border border-[#e5e7eb]">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{score}</div>
                                    <div className="text-sm text-[#6b7280]">Total Skor</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl border border-[#e5e7eb]">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{questions.length}</div>
                                    <div className="text-sm text-[#6b7280]">Total Soal</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl border border-[#e5e7eb]">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{correctCount}</div>
                                    <div className="text-sm text-[#6b7280]">Jawaban Benar</div>
                                </div>
                                <div className="text-center p-4 bg-white rounded-xl border border-[#e5e7eb]">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{accuracy}%</div>
                                    <div className="text-sm text-[#6b7280]">Ketepatan</div>
                                </div>
                            </div>

                            {/* Performance Message */}
                            <div className={`mt-6 p-4 rounded-xl text-center ${accuracy >= 80 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' :
                                    accuracy >= 60 ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200' :
                                        'bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200'
                                }`}>
                                <p className="font-medium text-[#355485]">
                                    {accuracy >= 80 ? 'Kamu sangat jago mengenali bentuk!' :
                                        accuracy >= 60 ? 'Kemampuan observasimu cukup baik!' :
                                            'Tingkatkan lagi kemampuan observasimu!'}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <button
                                onClick={() => {
                                    setGamePhase('start');
                                    setPlayerName('');
                                }}
                                className="flex-1 py-4 px-6 rounded-2xl border-2 border-[#cbdde9] text-[#355485] 
                         font-bold hover:border-[#4f90c6] transition-all duration-300 hover:scale-105
                         flex items-center justify-center gap-2"
                            >
                                <span>🆕</span> Game Baru
                            </button>
                            <button
                                onClick={restartGame}
                                className="flex-1 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] hover:from-[#3a7bb5] 
                         hover:to-[#7aa8d1] text-white font-bold py-4 px-6 rounded-2xl 
                         transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                            >
                                <span>🔁</span> Main Lagi
                            </button>
                        </div>

                        {/* History Section */}
                        <div className="border-t border-[#e5e7eb] pt-10">
                            <h3 className="text-xl font-bold text-[#355485] mb-6 flex items-center gap-2">
                                <span>📊</span> Riwayat Permainan
                            </h3>

                            {gameHistory.length > 0 ? (
                                <div className="space-y-4">
                                    {gameHistory.slice(0, 5).map((history, index) => {
                                        const histAccuracy = Math.round((history.correctAnswers / history.totalQuestions) * 100);
                                        return (
                                            <div
                                                key={history.id}
                                                className={`bg-white rounded-xl p-5 border transition-all duration-300 hover:shadow-md
                                                    ${index === 0
                                                        ? 'border-[#4f90c6] shadow-md ring-2 ring-[#4f90c6]/20'
                                                        : 'border-[#e5e7eb]'
                                                    }`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className="font-semibold text-[#355485]">{history.playerName}</span>
                                                            {index === 0 && (
                                                                <span className="inline-block bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white px-2 py-1 rounded-full text-xs font-bold">
                                                                    TERBARU
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-[#9ca3af]">
                                                            {history.date} • {history.time}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-[#4f90c6]">{history.score}</div>
                                                        <div className="text-sm text-[#9ca3af]">
                                                            {history.correctAnswers}/{history.totalQuestions} • {histAccuracy}%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="text-5xl mb-4 text-[#cbdde9]">📝</div>
                                    <p className="text-[#9ca3af] font-medium">Belum ada riwayat permainan</p>
                                    <p className="text-sm text-[#9ca3af] mt-2">Mulai permainan untuk melihat riwayat di sini</p>
                                </div>
                            )}
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className={`bg-gradient-to-br from-[#f9fafb] to-white rounded-3xl shadow-2xl p-6 md:p-8 transition-all duration-300
      ${isFullscreen ? 'fixed inset-0 z-50 m-0 rounded-none overflow-auto' : ''}`}
        >
            {renderContent()}
        </div>
    );
};

export default Game1TebakBentuk;