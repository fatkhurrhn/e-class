// src/components/bab4/GameTebakBentukEdukasi.jsx
import React, { useState, useEffect, useCallback } from 'react';

const GameTebakBentukEdukasi = () => {
    // State untuk flow game
    const [gamePhase, setGamePhase] = useState('welcome'); // 'welcome', 'playing', 'result'
    const [playerName, setPlayerName] = useState('Anak Hebat');
    const [selectedGrade, setSelectedGrade] = useState('1');

    // State untuk game
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [timeLeft, setTimeLeft] = useState(45);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);

    // Efek suara (simulasi)
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Data pertanyaan berdasarkan kelas
    const questionsByGrade = {
        '1': [
            {
                id: 1,
                image: '🔴',
                question: "Bentuk bola ini seperti apa?",
                options: ['Bulat', 'Segitiga', 'Kotak', 'Panjang'],
                correct: 'Bulat',
                hint: "Bentuknya seperti bola mainan, bundar semua sisinya",
                color: '#FF6B6B'
            },
            {
                id: 2,
                image: '📐',
                question: "Bentuk penggaris segitiga ini?",
                options: ['Bulat', 'Segitiga', 'Kotak', 'Lonjong'],
                correct: 'Segitiga',
                hint: "Mempunyai 3 sisi dan 3 sudut",
                color: '#4ECDC4'
            },
            {
                id: 3,
                image: '📦',
                question: "Kotak hadiah ini berbentuk?",
                options: ['Bulat', 'Segitiga', 'Kotak', 'Bintang'],
                correct: 'Kotak',
                hint: "Ada 4 sisi yang sama panjang",
                color: '#FFD166'
            },
            {
                id: 4,
                image: '🍫',
                question: "Coklat batangan ini berbentuk?",
                options: ['Panjang', 'Bulat', 'Segitiga', 'Bintang'],
                correct: 'Panjang',
                hint: "Bentuknya memanjang seperti persegi panjang",
                color: '#06D6A0'
            },
            {
                id: 5,
                image: '⭐',
                question: "Bentuk bintang ini?",
                options: ['Bulat', 'Segitiga', 'Kotak', 'Bintang'],
                correct: 'Bintang',
                hint: "Bentuknya seperti bintang di langit malam",
                color: '#118AB2'
            },
            {
                id: 6,
                image: '🟦',
                question: "Kertas origami ini berbentuk?",
                options: ['Bulat', 'Segitiga', 'Persegi', 'Bintang'],
                correct: 'Persegi',
                hint: "Semua sisinya sama panjang",
                color: '#EF476F'
            },
            {
                id: 7,
                image: '🍩',
                question: "Donat ini berbentuk?",
                options: ['Bulat', 'Segitiga', 'Kotak', 'Cincin'],
                correct: 'Cincin',
                hint: "Bulat dengan lubang di tengah",
                color: '#7209B7'
            },
            {
                id: 8,
                image: '🛑',
                question: "Rambu stop ini berbentuk?",
                options: ['Bulat', 'Segdelapan', 'Kotak', 'Segitiga'],
                correct: 'Segdelapan',
                hint: "Mempunyai 8 sisi",
                color: '#F3722C'
            }
        ],
        '2': [
            {
                id: 1,
                image: '🎈',
                question: "Bentuk balon ini?",
                options: ['Lingkaran', 'Oval', 'Persegi', 'Segitiga'],
                correct: 'Lingkaran',
                hint: "Bundar sempurna seperti bola",
                color: '#FF6B6B'
            },
            {
                id: 2,
                image: '📏',
                question: "Penggaris panjang ini berbentuk?",
                options: ['Persegi Panjang', 'Lingkaran', 'Segitiga', 'Jajar Genjang'],
                correct: 'Persegi Panjang',
                hint: "Memiliki panjang dan lebar yang berbeda",
                color: '#4ECDC4'
            }
        ]
    };

    const grades = [
        { id: '1', label: 'Kelas 1', emoji: '👶' },
        { id: '2', label: 'Kelas 2', emoji: '🧒' },
        { id: '3', label: 'Kelas 3', emoji: '👦' }
    ];

    const questions = questionsByGrade[selectedGrade] || questionsByGrade['1'];
    const currentQ = questions[currentQuestion];

    // Timer effect
    useEffect(() => {
        if (gamePhase === 'playing' && timeLeft > 0 && !gameCompleted) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0 && gamePhase === 'playing') {
            handleNextQuestion();
        }
    }, [timeLeft, gamePhase, gameCompleted]);

    // Initialize game
    useEffect(() => {
        if (gamePhase === 'playing') {
            setTimeLeft(45);
            setGameCompleted(false);
            setStreak(0);
        }
    }, [gamePhase]);

    const handleStartGame = () => {
        setGamePhase('playing');
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowHint(false);
    };

    const handleAnswer = useCallback((answer) => {
        if (selectedAnswer || gameCompleted) return;

        setSelectedAnswer(answer);
        const correct = answer === currentQ.correct;
        setIsCorrect(correct);

        if (correct) {
            const newStreak = streak + 1;
            setStreak(newStreak);
            if (newStreak > bestStreak) setBestStreak(newStreak);
            setScore(score + 100 + (newStreak * 10));
        } else {
            setStreak(0);
        }

        // Play sound effect (simulated)
        if (soundEnabled) {
            const audio = correct ?
                new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3') :
                new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3');
            audio.volume = 0.3;
            // audio.play().catch(e => console.log("Audio error:", e));
        }

        setTimeout(() => {
            handleNextQuestion();
        }, 2000);
    }, [currentQ, selectedAnswer, score, streak, soundEnabled, gameCompleted]);

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setIsCorrect(null);
            setShowHint(false);
            setTimeLeft(45);
        } else {
            setGameCompleted(true);
            setTimeout(() => {
                setGamePhase('result');
            }, 1500);
        }
    };

    const handleHint = () => {
        setShowHint(true);
        if (soundEnabled) {
            // new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkles-3003.mp3').play();
        }
    };

    const handleSkip = () => {
        setStreak(0);
        handleNextQuestion();
    };

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const timePercentage = (timeLeft / 45) * 100;

    const renderWelcomeScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 shadow-2xl mb-6 animate-bounce">
                        <span className="text-5xl">🎮</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        Game Tebak Bentuk
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Belajar mengenal bentuk geometri dengan cara yang menyenangkan!
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    {/* Player Info Card */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">Nama Pemain</h3>
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    className="w-full px-4 py-2 mt-2 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-lg"
                                    placeholder="Masukkan nama"
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span>🏫</span> Pilih Kelas
                            </h3>
                            <div className="grid grid-cols-3 gap-3">
                                {grades.map(grade => (
                                    <button
                                        key={grade.id}
                                        onClick={() => setSelectedGrade(grade.id)}
                                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${selectedGrade === grade.id
                                            ? 'border-blue-500 bg-blue-50 transform scale-105 shadow-lg'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="text-3xl mb-2">{grade.emoji}</div>
                                        <div className="font-semibold text-gray-700">{grade.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center">
                                    <span className="text-xl">🔊</span>
                                </div>
                                <span className="font-medium text-gray-700">Efek Suara</span>
                            </div>
                            <button
                                onClick={() => setSoundEnabled(!soundEnabled)}
                                className={`w-14 h-8 rounded-full transition-all duration-300 ${soundEnabled ? 'bg-green-400' : 'bg-gray-300'
                                    }`}
                            >
                                <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${soundEnabled ? 'translate-x-8' : 'translate-x-1'
                                    }`} />
                            </button>
                        </div>
                    </div>

                    {/* Game Info Card */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-6 text-white shadow-xl">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span>📚</span> Panduan Bermain
                        </h3>

                        <div className="space-y-5">
                            <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">🎯</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Tujuan Game</h4>
                                    <p className="text-white/90">Mengenal berbagai bentuk benda sehari-hari</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">⭐</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Cara Bermain</h4>
                                    <p className="text-white/90">Pilih jawaban yang tepat sebelum waktu habis</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">🏆</span>
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Tips Menang</h4>
                                    <p className="text-white/90">Jawab benar berurutan dapat bonus poin!</p>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-white/20">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">{questions.length}</div>
                                    <div className="text-white/90">Soal yang Akan Dijawab</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Start Button */}
                <div className="text-center">
                    <button
                        onClick={handleStartGame}
                        className="group relative bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 
                        text-white font-bold text-2xl py-6 px-16 rounded-2xl transition-all duration-300 
                        hover:scale-105 shadow-2xl hover:shadow-3xl"
                    >
                        <span className="flex items-center justify-center gap-3">
                            <span className="text-3xl">🚀</span>
                            MULAI BERMAIN
                            <span className="text-3xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </span>
                        <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10" />
                    </button>
                </div>

                {/* Footer Note */}
                <div className="mt-10 text-center text-gray-500 text-sm">
                    <p>Game ini cocok untuk anak SD kelas 1-3. Dapat dimainkan dengan bimbingan guru.</p>
                </div>
            </div>
        </div>
    );

    const renderGameScreen = () => (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <div className="max-w-6xl mx-auto">
                {/* Game Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center shadow-lg">
                                <span className="text-2xl">👤</span>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Pemain</div>
                                <div className="text-xl font-bold text-gray-800">{playerName}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-sm text-gray-500">Kelas</div>
                                <div className="text-xl font-bold text-gray-800">Kelas {selectedGrade}</div>
                            </div>
                            <div className="w—1 h-8 bg-gray-200" />
                            <button
                                onClick={() => setGamePhase('welcome')}
                                className="px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-colors duration-300"
                            >
                                <span className="flex items-center gap-2">
                                    <span>🏠</span>
                                    <span className="hidden md:inline">Menu</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Game Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Skor</div>
                            <div className="text-3xl font-bold text-blue-600">{score}</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Soal</div>
                            <div className="text-3xl font-bold text-purple-600">{currentQuestion + 1}/{questions.length}</div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Streak</div>
                            <div className="text-3xl font-bold text-green-600 flex items-center gap-2">
                                {streak} <span className="text-xl">🔥</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Waktu</div>
                            <div className={`text-3xl font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-orange-500'}`}>
                                {timeLeft}s
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Progress Game</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Game Area */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                    {/* Timer Bar */}
                    <div className="h-2 w-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500">
                        <div
                            className="h-full bg-gray-800 transition-all duration-1000 ease-linear"
                            style={{ width: `${timePercentage}%` }}
                        />
                    </div>

                    <div className="p-6 md:p-10">
                        <div className="flex flex-col lg:flex-row items-center gap-10">
                            {/* Left: Object Display */}
                            <div className="flex-1 text-center">
                                <div className="relative mb-8">
                                    <div className="text-9xl mb-4 animate-bounce" style={{ color: currentQ.color }}>
                                        {currentQ.image}
                                    </div>
                                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                                        Benda Sehari-hari
                                    </div>
                                </div>

                                {/* Hint Box */}
                                {showHint && (
                                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6 animate-fade-in">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-xl">💡</span>
                                            </div>
                                            <div>
                                                <div className="font-bold text-yellow-800 mb-1">Petunjuk</div>
                                                <div className="text-yellow-700">{currentQ.hint}</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right: Question & Options */}
                            <div className="flex-1 w-full">
                                {/* Question */}
                                <div className="mb-8">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-semibold text-sm mb-4">
                                        <span>❓</span> SOAL #{currentQ.id}
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-6">
                                        {currentQ.question}
                                    </h2>
                                </div>

                                {/* Answer Options */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {currentQ.options.map((option, index) => {
                                        const isSelected = selectedAnswer === option;
                                        const isCorrectAnswer = option === currentQ.correct;
                                        const colors = ['from-blue-400 to-cyan-400', 'from-green-400 to-emerald-400', 'from-yellow-400 to-orange-400', 'from-purple-400 to-pink-400'];

                                        return (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(option)}
                                                disabled={selectedAnswer}
                                                className={`relative p-6 rounded-2xl text-xl font-bold text-white transition-all duration-300
                                                    ${isSelected
                                                        ? isCorrect
                                                            ? 'ring-4 ring-green-300 shadow-2xl transform scale-105'
                                                            : 'ring-4 ring-red-300 shadow-2xl transform scale-105'
                                                        : 'hover:scale-105 hover:shadow-xl'
                                                    } 
                                                    bg-gradient-to-r ${colors[index]}
                                                `}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{option}</span>
                                                    {isSelected && (
                                                        <span className="text-2xl animate-bounce">
                                                            {isCorrect ? '✅' : '❌'}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Game Controls */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleHint}
                                        disabled={showHint || selectedAnswer}
                                        className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold text-lg
                                            disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            <span className="text-xl">💡</span>
                                            {showHint ? 'Petunjuk Ditampilkan' : 'Minta Petunjuk'}
                                        </span>
                                    </button>
                                    <button
                                        onClick={handleSkip}
                                        disabled={selectedAnswer}
                                        className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold text-lg
                                            disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300 shadow-lg"
                                    >
                                        <span className="flex items-center justify-center gap-3">
                                            <span className="text-xl">⏭️</span>
                                            Lewati
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Message */}
                {selectedAnswer && (
                    <div className={`mt-6 p-6 rounded-3xl text-center text-white shadow-xl animate-fade-in
                        ${isCorrect
                            ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                            : 'bg-gradient-to-r from-red-400 to-pink-500'
                        }`}
                    >
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                            <div className="text-4xl animate-bounce">
                                {isCorrect ? '🎉' : '😢'}
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">
                                    {isCorrect ? 'Hore! Jawaban Benar!' : 'Oops! Coba Lagi!'}
                                </h3>
                                <p className="text-lg opacity-90">
                                    {isCorrect
                                        ? `Kamu mendapatkan 100 poin + ${streak * 10} poin streak!`
                                        : `Jawaban yang benar adalah: ${currentQ.correct}`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Streak Indicator */}
                {streak >= 3 && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl text-center text-white font-bold text-lg animate-pulse">
                        🔥 STREAK {streak} JAWABAN BENAR! 🔥
                    </div>
                )}

                {/* Completion Overlay */}
                {gameCompleted && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
                        <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center animate-scale-in">
                            <div className="text-6xl mb-4 animate-spin">✨</div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-4">Game Selesai!</h3>
                            <p className="text-gray-600 mb-6">Mengarahkan ke hasil permainan...</p>
                            <div className="text-2xl font-bold text-blue-600">
                                Skor Akhir: {score}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    const renderResultScreen = () => {
        const correctCount = Math.round(score / 100);
        const accuracy = Math.round((correctCount / questions.length) * 100);

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Result Header */}
                    <div className="text-center mb-10">
                        <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 shadow-2xl
                            ${accuracy >= 80 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 animate-bounce' :
                                accuracy >= 60 ? 'bg-gradient-to-r from-green-400 to-blue-400' :
                                    'bg-gradient-to-r from-purple-400 to-pink-400'}`}
                        >
                            <span className="text-6xl">
                                {accuracy >= 80 ? '🏆' :
                                    accuracy >= 60 ? '🎉' :
                                        '🌟'}
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {accuracy >= 80 ? 'Luar Biasa!' :
                                accuracy >= 60 ? 'Hebat Sekali!' :
                                    'Terus Berlatih!'}
                        </h1>
                        <p className="text-xl text-gray-600">
                            Hasil permainan <span className="font-bold text-blue-600">{playerName}</span>
                        </p>
                    </div>

                    {/* Score Summary */}
                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                        <div className="bg-white rounded-3xl p-8 shadow-xl">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <span>📊</span> Statistik Game
                            </h3>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                                    <span className="text-gray-700 font-medium">Skor Total</span>
                                    <span className="text-3xl font-bold text-blue-600">{score}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                                    <span className="text-gray-700 font-medium">Jawaban Benar</span>
                                    <span className="text-3xl font-bold text-green-600">{correctCount}/{questions.length}</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
                                    <span className="text-gray-700 font-medium">Akurasi</span>
                                    <span className="text-3xl font-bold text-orange-600">{accuracy}%</span>
                                </div>
                                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                                    <span className="text-gray-700 font-medium">Streak Tertinggi</span>
                                    <span className="text-3xl font-bold text-red-600 flex items-center gap-2">
                                        {bestStreak} <span className="text-xl">🔥</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-8 text-white shadow-xl">
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span>🎯</span> Pencapaian
                            </h3>
                            <div className="space-y-4 mb-6">
                                <div className={`flex items-center gap-3 p-4 rounded-xl ${accuracy >= 80 ? 'bg-white/20' : 'bg-white/10'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${accuracy >= 80 ? 'bg-white' : 'bg-white/30'}`}>
                                        <span className="text-xl">🏆</span>
                                    </div>
                                    <div>
                                        <div className="font-bold">Master Bentuk</div>
                                        <div className="text-sm opacity-90">Dapatkan akurasi ≥80%</div>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-3 p-4 rounded-xl ${streak >= 5 ? 'bg-white/20' : 'bg-white/10'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${streak >= 5 ? 'bg-white' : 'bg-white/30'}`}>
                                        <span className="text-xl">🔥</span>
                                    </div>
                                    <div>
                                        <div className="font-bold">Streak Champion</div>
                                        <div className="text-sm opacity-90">5 jawaban benar beruntun</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/20">
                                <div className="text-center">
                                    <div className="text-sm opacity-90 mb-2">Waktu Bermain</div>
                                    <div className="text-2xl font-bold">{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <button
                            onClick={() => setGamePhase('welcome')}
                            className="p-6 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 font-bold text-lg
                                hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <span className="flex flex-col items-center gap-3">
                                <span className="text-3xl">🏠</span>
                                Menu Utama
                            </span>
                        </button>
                        <button
                            onClick={handleStartGame}
                            className="p-6 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold text-lg
                                hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <span className="flex flex-col items-center gap-3">
                                <span className="text-3xl">🔁</span>
                                Main Lagi
                            </span>
                        </button>
                        <button
                            onClick={() => setSelectedGrade(prev => prev === '1' ? '2' : '1')}
                            className="p-6 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg
                                hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            <span className="flex flex-col items-center gap-3">
                                <span className="text-3xl">📚</span>
                                Ganti Kelas
                            </span>
                        </button>
                    </div>

                    {/* Certificate */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8 text-center">
                        <div className="text-5xl mb-4">📜</div>
                        <h3 className="text-2xl font-bold text-yellow-800 mb-2">Sertifikat Prestasi</h3>
                        <p className="text-yellow-700 mb-4">
                            {playerName} telah menyelesaikan Game Tebak Bentuk dengan hasil:
                        </p>
                        <div className="text-3xl font-bold text-yellow-800">{score} Poin</div>
                        <div className="mt-4 text-sm text-yellow-600">
                            Dicapai pada {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    {/* Share Button */}
                    <div className="text-center mt-8">
                        <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                            <span className="text-xl">📤</span>
                            Bagikan Hasil ke Kelas
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render berdasarkan phase
    return (
        <>
            {gamePhase === 'welcome' && renderWelcomeScreen()}
            {gamePhase === 'playing' && renderGameScreen()}
            {gamePhase === 'result' && renderResultScreen()}
        </>
    );
};

export default GameTebakBentukEdukasi;