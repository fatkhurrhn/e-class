// src/components/bab4/Game2KelompokkanBentuk.jsx
import React, { useState, useEffect } from 'react';

const Game2KelompokkanBentuk = () => {
    // Game states
    const [gamePhase, setGamePhase] = useState('start');
    const [playerName, setPlayerName] = useState('');
    const [currentLevel, setCurrentLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(45);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);

    // Level data
    const levels = [
        {
            id: 1,
            title: "Level 1: Kelompokkan Berdasarkan Warna",
            description: "Masukkan bentuk ke kelompok warna yang sesuai",
            shapes: [
                { id: 1, type: 'segitiga', color: 'blue', emoji: '🔺', category: 'warna' },
                { id: 2, type: 'lingkaran', color: 'red', emoji: '🔴', category: 'warna' },
                { id: 3, type: 'persegi', color: 'blue', emoji: '◼️', category: 'warna' },
                { id: 4, type: 'segitiga', color: 'red', emoji: '🔺', category: 'warna' },
                { id: 5, type: 'lingkaran', color: 'blue', emoji: '🔵', category: 'warna' },
                { id: 6, type: 'persegi', color: 'red', emoji: '🟥', category: 'warna' },
            ],
            categories: [
                { id: 'blue', title: 'Warna Biru', correctCount: 3 },
                { id: 'red', title: 'Warna Merah', correctCount: 3 },
            ],
            instruction: "Drag bentuk ke kelompok warna yang sesuai!"
        },
        {
            id: 2,
            title: "Level 2: Kelompokkan Berdasarkan Bentuk",
            description: "Kelompokkan bentuk yang sama",
            shapes: [
                { id: 1, type: 'segitiga', color: 'yellow', emoji: '🔺', category: 'type' },
                { id: 2, type: 'lingkaran', color: 'green', emoji: '🔵', category: 'type' },
                { id: 3, type: 'persegi', color: 'orange', emoji: '◼️', category: 'type' },
                { id: 4, type: 'segitiga', color: 'purple', emoji: '🔺', category: 'type' },
                { id: 5, type: 'lingkaran', color: 'pink', emoji: '🔴', category: 'type' },
                { id: 6, type: 'persegi', color: 'brown', emoji: '🟫', category: 'type' },
            ],
            categories: [
                { id: 'segitiga', title: 'Segitiga', correctCount: 2 },
                { id: 'lingkaran', title: 'Lingkaran', correctCount: 2 },
                { id: 'persegi', title: 'Persegi', correctCount: 2 },
            ],
            instruction: "Kelompokkan berdasarkan jenis bentuk!"
        },
        {
            id: 3,
            title: "Level 3: Kelompokkan Berdasarkan Sisi",
            description: "Kelompokkan berdasarkan jumlah sisi",
            shapes: [
                { id: 1, type: 'segitiga', sides: 3, emoji: '🔺', category: 'sides' },
                { id: 2, type: 'lingkaran', sides: 0, emoji: '🔵', category: 'sides' },
                { id: 3, type: 'persegi', sides: 4, emoji: '◼️', category: 'sides' },
                { id: 4, type: 'segitiga', sides: 3, emoji: '🔺', category: 'sides' },
                { id: 5, type: 'lingkaran', sides: 0, emoji: '🔴', category: 'sides' },
                { id: 6, type: 'persegipanjang', sides: 4, emoji: '🟦', category: 'sides' },
            ],
            categories: [
                { id: '3sisi', title: '3 Sisi', correctCount: 2 },
                { id: '4sisi', title: '4 Sisi', correctCount: 2 },
                { id: '0sisi', title: 'Tidak Bersisi', correctCount: 2 },
            ],
            instruction: "Perhatikan jumlah sisi setiap bentuk!"
        },
        {
            id: 4,
            title: "Level 4: Bangun Datar vs Bangun Ruang",
            description: "Beda kan bangun datar dan bangun ruang",
            shapes: [
                { id: 1, type: 'segitiga', is3D: false, emoji: '🔺', category: 'dimension' },
                { id: 2, type: 'kubus', is3D: true, emoji: '🎲', category: 'dimension' },
                { id: 3, type: 'lingkaran', is3D: false, emoji: '🔵', category: 'dimension' },
                { id: 4, type: 'bola', is3D: true, emoji: '⚽', category: 'dimension' },
                { id: 5, type: 'persegi', is3D: false, emoji: '◼️', category: 'dimension' },
                { id: 6, type: 'tabung', is3D: true, emoji: '🥫', category: 'dimension' },
            ],
            categories: [
                { id: 'datar', title: 'Bangun Datar', correctCount: 3 },
                { id: 'ruang', title: 'Bangun Ruang', correctCount: 3 },
            ],
            instruction: "Manakah yang bangun datar? Manakah yang bangun ruang?"
        }
    ];

    // Game state untuk level
    const [availableShapes, setAvailableShapes] = useState([]);
    const [categorySlots, setCategorySlots] = useState({});
    const [correctCount, setCorrectCount] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [feedback, setFeedback] = useState('');

    // Load history
    useEffect(() => {
        const savedHistory = localStorage.getItem('game2_history');
        if (savedHistory) {
            setGameHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Timer effect
    useEffect(() => {
        let interval;
        if (isPlaying && timer > 0 && gamePhase === 'playing') {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0 && gamePhase === 'playing') {
            handleLevelComplete(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timer, gamePhase]);

    // Initialize level
    useEffect(() => {
        if (gamePhase === 'playing' && currentLevel <= levels.length) {
            const level = levels[currentLevel - 1];
            setAvailableShapes([...level.shapes]);

            const initialSlots = {};
            level.categories.forEach(cat => {
                initialSlots[cat.id] = [];
            });
            setCategorySlots(initialSlots);

            setTotalCorrect(level.shapes.length);
            setCorrectCount(0);
            setTimer(45);
            setIsPlaying(true);
        }
    }, [currentLevel, gamePhase]);

    const handleStartGame = () => {
        setGamePhase('name');
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            setGamePhase('playing');
        }
    };

    const handleShapeDrop = (shapeId, categoryId) => {
        if (!isPlaying) return;

        const level = levels[currentLevel - 1];
        const shape = level.shapes.find(s => s.id === shapeId);

        // Check if correct category based on level type
        let isCorrect = false;
        switch (level.id) {
            case 1: // Warna
                isCorrect = shape.color === categoryId;
                break;
            case 2: // Type
                isCorrect = shape.type === categoryId;
                break;
            case 3: // Sisi
                if (categoryId === '3sisi') isCorrect = shape.sides === 3;
                else if (categoryId === '4sisi') isCorrect = shape.sides === 4;
                else if (categoryId === '0sisi') isCorrect = shape.sides === 0;
                break;
            case 4: // Dimension
                if (categoryId === 'datar') isCorrect = !shape.is3D;
                else if (categoryId === 'ruang') isCorrect = shape.is3D;
                break;
        }

        // Update UI
        setAvailableShapes(prev => prev.filter(s => s.id !== shapeId));
        setCategorySlots(prev => ({
            ...prev,
            [categoryId]: [...prev[categoryId], { ...shape, isCorrect }]
        }));

        // Feedback
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setFeedback('🎉 Benar!');
            setScore(prev => prev + 50);
        } else {
            setFeedback('❌ Coba lagi!');
        }

        // Check level completion
        if (correctCount + 1 === totalCorrect) {
            setTimeout(() => handleLevelComplete(true), 500);
        }

        setTimeout(() => setFeedback(''), 1500);
    };

    const handleLevelComplete = (success) => {
        setIsPlaying(false);

        if (success) {
            setScore(prev => prev + (timer * 10)); // Bonus waktu tersisa

            if (currentLevel < levels.length) {
                setTimeout(() => {
                    setCurrentLevel(prev => prev + 1);
                    setFeedback(`🎊 Level ${currentLevel} selesai!`);
                }, 1500);
            } else {
                // Game complete
                setTimeout(() => {
                    saveGameResult();
                    setGamePhase('result');
                }, 2000);
            }
        } else {
            // Time's up
            saveGameResult();
            setGamePhase('result');
        }
    };

    const saveGameResult = () => {
        const result = {
            id: Date.now(),
            playerName,
            score,
            levelReached: currentLevel,
            totalLevels: levels.length,
            date: new Date().toLocaleDateString('id-ID'),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };

        const newHistory = [result, ...gameHistory.slice(0, 4)];
        setGameHistory(newHistory);
        localStorage.setItem('game2_history', JSON.stringify(newHistory));
    };

    const restartGame = () => {
        setCurrentLevel(1);
        setScore(0);
        setGamePhase('playing');
    };

    const renderContent = () => {
        switch (gamePhase) {
            case 'start':
                return (
                    <div className="text-center">
                        <div className="mb-10">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-r from-[#355485] to-[#2a436c] mb-6">
                                <span className="text-5xl">🔄</span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-4">Kelompokkan Bentuk</h2>
                            <p className="text-[#6b7280] text-lg max-w-md mx-auto">
                                Latih kemampuan mengelompokkan bentuk berdasarkan berbagai kriteria
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-[#f9fafb] to-white rounded-2xl p-8 mb-10 border border-[#e5e7eb]">
                            <h3 className="text-xl font-semibold text-[#355485] mb-6">4 Level Menantang</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {levels.map(level => (
                                    <div key={level.id} className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#4f90c6] to-[#90b6d5] rounded-xl flex items-center justify-center text-white text-xl mx-auto mb-2">
                                            {level.id}
                                        </div>
                                        <div className="text-sm text-[#6b7280]">{level.title.split(':')[0]}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleStartGame}
                            className="bg-gradient-to-r from-[#355485] to-[#2a436c] hover:from-[#2a436c] hover:to-[#1e2e4a] 
                       text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 
                       hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            🚀 Mulai Petualangan
                        </button>
                    </div>
                );

            case 'name':
                return (
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-[#355485] to-[#2a436c] mb-6">
                                <span className="text-4xl">👤</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#355485] mb-3">Siapa Namamu?</h2>
                            <p className="text-[#6b7280">Rekam prestasimu di game ini!</p>
                        </div>

                        <form onSubmit={handleNameSubmit} className="space-y-6">
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Masukkan nama kamu"
                                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-[#cbdde9] focus:border-[#355485] 
                         focus:outline-none focus:ring-2 focus:ring-[#355485]/30 transition-all duration-300
                         bg-white placeholder-[#9ca3af]"
                                autoFocus
                            />
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setGamePhase('start')}
                                    className="flex-1 py-3 px-6 rounded-2xl border-2 border-[#cbdde9] text-[#6b7280] 
                           font-medium hover:border-[#9ca3af] transition-all duration-300"
                                >
                                    ← Kembali
                                </button>
                                <button
                                    type="submit"
                                    disabled={!playerName.trim()}
                                    className="flex-1 bg-gradient-to-r from-[#355485] to-[#2a436c] hover:from-[#2a436c] 
                           hover:to-[#1e2e4a] text-white font-bold py-3 px-6 rounded-2xl 
                           transition-all duration-300 hover:scale-105 disabled:opacity-50 
                           disabled:cursor-not-allowed"
                                >
                                    Mulai Game →
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case 'playing':
                const currentLevelData = levels[currentLevel - 1];
                return (
                    <>
                        {/* Game Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-[#355485]">{currentLevelData.title}</h2>
                                <p className="text-[#6b7280] text-sm">Player: {playerName}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-[#355485]">Level {currentLevel}</div>
                                    <div className="text-sm text-[#9ca3af]">/{levels.length}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-[#4f90c6]">{score}</div>
                                    <div className="text-sm text-[#9ca3af]">Skor</div>
                                </div>
                                <div className={`text-center ${timer < 10 ? 'animate-pulse' : ''}`}>
                                    <div className={`text-xl font-bold ${timer < 10 ? 'text-red-500' : 'text-[#355485]'}`}>
                                        {timer}s
                                    </div>
                                    <div className="text-sm text-[#9ca3af]">Waktu</div>
                                </div>
                            </div>
                        </div>

                        {/* Instruction */}
                        <div className="bg-gradient-to-r from-[#f0f7ff] to-[#e3f2fd] rounded-xl p-4 mb-8 text-center">
                            <p className="text-[#355485] font-medium">{currentLevelData.instruction}</p>
                        </div>

                        {/* Feedback */}
                        {feedback && (
                            <div className={`p-4 rounded-xl mb-6 text-center text-lg font-medium animate-fade-in
                ${feedback.includes('🎉')
                                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800'
                                    : 'bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800'
                                }`}
                            >
                                {feedback}
                            </div>
                        )}

                        {/* Game Area */}
                        <div className="space-y-8">
                            {/* Available Shapes */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#355485] mb-4">Pilih Bentuk:</h3>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    {availableShapes.map(shape => (
                                        <button
                                            key={shape.id}
                                            onClick={() => {
                                                // For simplicity, we'll use a category selection modal
                                                // In real implementation, use drag & drop or category buttons
                                                // For now, just drop to first correct category
                                                const correctCategory = currentLevelData.categories.find(cat => {
                                                    if (currentLevel === 1) return cat.id === shape.color;
                                                    if (currentLevel === 2) return cat.id === shape.type;
                                                    if (currentLevel === 3) {
                                                        if (cat.id === '3sisi') return shape.sides === 3;
                                                        if (cat.id === '4sisi') return shape.sides === 4;
                                                        if (cat.id === '0sisi') return shape.sides === 0;
                                                    }
                                                    if (currentLevel === 4) {
                                                        if (cat.id === 'datar') return !shape.is3D;
                                                        if (cat.id === 'ruang') return shape.is3D;
                                                    }
                                                    return false;
                                                })?.id;

                                                if (correctCategory) {
                                                    handleShapeDrop(shape.id, correctCategory);
                                                }
                                            }}
                                            className="text-4xl p-4 bg-white rounded-2xl border-2 border-[#cbdde9] 
                               hover:border-[#4f90c6] hover:shadow-lg transition-all duration-300 
                               hover:scale-110 active:scale-95"
                                            title="Klik untuk mengelompokkan"
                                        >
                                            {shape.emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#355485] mb-4">Kelompok:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {currentLevelData.categories.map(category => (
                                        <div
                                            key={category.id}
                                            className="bg-gradient-to-br from-[#f9fafb] to-white rounded-2xl p-4 border-2 
                               border-[#e5e7eb] min-h-[120px]"
                                        >
                                            <div className="text-center mb-3">
                                                <div className="font-bold text-[#355485] text-sm">{category.title}</div>
                                                <div className="text-xs text-[#9ca3af]">
                                                    {categorySlots[category.id]?.length || 0}/{category.correctCount}
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 justify-center">
                                                {categorySlots[category.id]?.map((shape, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`text-2xl ${shape.isCorrect ? 'opacity-100' : 'opacity-50'}`}
                                                    >
                                                        {shape.emoji}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-8">
                            <div className="flex justify-between text-sm text-[#6b7280] mb-2">
                                <span>Progress: {correctCount}/{totalCorrect}</span>
                                <span>{Math.round((correctCount / totalCorrect) * 100)}%</span>
                            </div>
                            <div className="w-full bg-[#e5e7eb] rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${(correctCount / totalCorrect) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </>
                );

            case 'result':
                return (
                    <>
                        {/* Result Header */}
                        <div className="text-center mb-10">
                            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6
                ${score >= 2000 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                    score >= 1500 ? 'bg-gradient-to-r from-[#4f90c6] to-[#90b6d5]' :
                                        'bg-gradient-to-r from-[#355485] to-[#2a436c]'}`}
                            >
                                <span className="text-5xl">
                                    {score >= 2000 ? '🏆' : score >= 1500 ? '🎉' : '🌟'}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-3">
                                {score >= 2000 ? 'Jenius!' : score >= 1500 ? 'Hebat!' : 'Lumayan!'}
                            </h2>
                            <p className="text-[#6b7280]">Kamu mencapai level {currentLevel}</p>
                        </div>

                        {/* Score Card */}
                        <div className="bg-gradient-to-br from-[#f9fafb] to-white rounded-2xl p-8 mb-10 border border-[#e5e7eb]">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{score}</div>
                                    <div className="text-sm text-[#6b7280]">Total Skor</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{currentLevel}</div>
                                    <div className="text-sm text-[#6b7280]">Level Tercapai</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{levels.length}</div>
                                    <div className="text-sm text-[#6b7280]">Total Level</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">
                                        {Math.round((currentLevel / levels.length) * 100)}%
                                    </div>
                                    <div className="text-sm text-[#6b7280]">Progress</div>
                                </div>
                            </div>
                        </div>

                        {/* Level Progress */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-[#355485] mb-4">Progress Level:</h3>
                            <div className="space-y-4">
                                {levels.map(level => (
                                    <div key={level.id} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4
                      ${currentLevel >= level.id
                                                ? 'bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white'
                                                : 'bg-[#e5e7eb] text-[#9ca3af]'
                                            }`}
                                        >
                                            {currentLevel >= level.id ? '✓' : level.id}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-[#355485]">{level.title}</div>
                                            <div className="text-sm text-[#6b7280]">{level.description}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-12">
                            <button
                                onClick={() => {
                                    setGamePhase('start');
                                    setPlayerName('');
                                }}
                                className="flex-1 py-4 px-6 rounded-2xl border-2 border-[#cbdde9] text-[#355485] 
                         font-bold hover:border-[#4f90c6] transition-all duration-300 hover:scale-105"
                            >
                                ← Game Baru
                            </button>
                            <button
                                onClick={restartGame}
                                className="flex-1 bg-gradient-to-r from-[#355485] to-[#2a436c] hover:from-[#2a436c] 
                         hover:to-[#1e2e4a] text-white font-bold py-4 px-6 rounded-2xl 
                         transition-all duration-300 hover:scale-105"
                            >
                                🔁 Main Lagi
                            </button>
                        </div>

                        {/* History Section */}
                        {gameHistory.length > 0 && (
                            <div className="border-t border-[#e5e7eb] pt-10">
                                <h3 className="text-xl font-bold text-[#355485] mb-6 flex items-center gap-2">
                                    <span>📊</span> Riwayat Permainan
                                </h3>
                                <div className="space-y-4">
                                    {gameHistory.slice(0, 5).map((history, index) => (
                                        <div
                                            key={history.id}
                                            className={`bg-white rounded-xl p-4 border ${index === 0 ? 'border-[#355485] shadow-md' : 'border-[#e5e7eb]'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-semibold text-[#355485]">{history.playerName}</div>
                                                    <div className="text-sm text-[#9ca3af]">{history.date} • {history.time}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-[#355485]">{history.score}</div>
                                                    <div className="text-sm text-[#9ca3af]">
                                                        Level {history.levelReached}
                                                    </div>
                                                </div>
                                            </div>
                                            {index === 0 && (
                                                <div className="mt-2 text-center">
                                                    <span className="inline-block bg-gradient-to-r from-[#355485] to-[#2a436c] text-white px-3 py-1 rounded-full text-xs">
                                                        🔥 Paling Baru
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="bg-gradient-to-br from-[#f9fafb] to-white rounded-3xl shadow-2xl p-8">
            {renderContent()}
        </div>
    );
};

export default Game2KelompokkanBentuk;