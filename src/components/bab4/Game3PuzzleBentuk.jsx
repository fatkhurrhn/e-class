// src/components/bab4/Game3PuzzleBentuk.jsx
import React, { useState, useEffect } from 'react';

const Game3PuzzleBentuk = () => {
    // Game states
    const [gamePhase, setGamePhase] = useState('start');
    const [playerName, setPlayerName] = useState('');
    const [currentLevel, setCurrentLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [moves, setMoves] = useState(0);
    const [timer, setTimer] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameHistory, setGameHistory] = useState([]);
    const [puzzleCompleted, setPuzzleCompleted] = useState(false);

    // Puzzle data
    const puzzles = [
        {
            id: 1,
            title: "Level 1: Puzzle Segitiga",
            description: "Susun potongan menjadi segitiga sempurna",
            image: '🔺',
            pieces: [
                { id: 'p1', shape: '△', correctPosition: 0, currentPosition: 2 },
                { id: 'p2', shape: '△', correctPosition: 1, currentPosition: 0 },
                { id: 'p3', shape: '△', correctPosition: 2, currentPosition: 1 },
                { id: 'p4', shape: '▽', correctPosition: 3, currentPosition: 3 }
            ],
            solution: ['△', '△', '△', '▽'],
            hint: "Semua potongan segitiga harus di atas"
        },
        {
            id: 2,
            title: "Level 2: Puzzle Rumah",
            description: "Buat rumah dari bentuk-bentuk geometri",
            image: '🏠',
            pieces: [
                { id: 'p1', shape: '◼️', correctPosition: 0, currentPosition: 1 },
                { id: 'p2', shape: '🔺', correctPosition: 1, currentPosition: 3 },
                { id: 'p3', shape: '◼️', correctPosition: 2, currentPosition: 0 },
                { id: 'p4', shape: '◼️', correctPosition: 3, currentPosition: 2 },
                { id: 'p5', shape: '◻️', correctPosition: 4, currentPosition: 4 },
                { id: 'p6', shape: '◻️', correctPosition: 5, currentPosition: 5 }
            ],
            solution: ['◼️', '🔺', '◼️', '◼️', '◻️', '◻️'],
            hint: "Atap segitiga di atas, jendela persegi di bawah"
        },
        {
            id: 3,
            title: "Level 3: Puzzle Mobil",
            description: "Susun bentuk menjadi gambar mobil",
            image: '🚗',
            pieces: [
                { id: 'p1', shape: '◼️', correctPosition: 0, currentPosition: 1 }, // Body
                { id: 'p2', shape: '🔵', correctPosition: 1, currentPosition: 3 }, // Roda 1
                { id: 'p3', shape: '🔵', correctPosition: 2, currentPosition: 5 }, // Roda 2
                { id: 'p4', shape: '◻️', correctPosition: 3, currentPosition: 0 }, // Window
                { id: 'p5', shape: '🔺', correctPosition: 4, currentPosition: 2 }, // Light
                { id: 'p6', shape: '🔺', correctPosition: 5, currentPosition: 4 }, // Light 2
                { id: 'p7', shape: '◼️', correctPosition: 6, currentPosition: 6 }, // Bumper
                { id: 'p8', shape: '◼️', correctPosition: 7, currentPosition: 7 }  // Bumper 2
            ],
            solution: ['◼️', '🔵', '🔵', '◻️', '🔺', '🔺', '◼️', '◼️'],
            hint: "Roda di bawah, lampu di depan, jendela di atas"
        },
        {
            id: 4,
            title: "Level 4: Puzzle Robot",
            description: "Buat robot dari berbagai bentuk",
            image: '🤖',
            pieces: [
                { id: 'p1', shape: '🔲', correctPosition: 0, currentPosition: 1 }, // Head
                { id: 'p2', shape: '🔵', correctPosition: 1, currentPosition: 3 }, // Eye 1
                { id: 'p3', shape: '🔵', correctPosition: 2, currentPosition: 5 }, // Eye 2
                { id: 'p4', shape: '◼️', correctPosition: 3, currentPosition: 0 }, // Body
                { id: 'p5', shape: '🔺', correctPosition: 4, currentPosition: 2 }, // Antenna
                { id: 'p6', shape: '🔺', correctPosition: 5, currentPosition: 4 }, // Antenna 2
                { id: 'p7', shape: '◻️', correctPosition: 6, currentPosition: 6 }, // Arm 1
                { id: 'p8', shape: '◻️', correctPosition: 7, currentPosition: 7 }, // Arm 2
                { id: 'p9', shape: '🟦', correctPosition: 8, currentPosition: 9 }, // Leg 1
                { id: 'p10', shape: '🟦', correctPosition: 9, currentPosition: 8 }  // Leg 2
            ],
            solution: ['🔲', '🔵', '🔵', '◼️', '🔺', '🔺', '◻️', '◻️', '🟦', '🟦'],
            hint: "Kepala di atas, badan di tengah, kaki di bawah"
        }
    ];

    // Current puzzle state
    const [currentPuzzle, setCurrentPuzzle] = useState(puzzles[0]);
    const [puzzlePieces, setPuzzlePieces] = useState([]);
    const [puzzleGrid, setPuzzleGrid] = useState([]);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [hintUsed, setHintUsed] = useState(false);

    // Load history
    useEffect(() => {
        const savedHistory = localStorage.getItem('game3_history');
        if (savedHistory) {
            setGameHistory(JSON.parse(savedHistory));
        }
    }, []);

    // Timer effect
    useEffect(() => {
        let interval;
        if (isPlaying && timer > 0 && gamePhase === 'playing' && !puzzleCompleted) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0 && gamePhase === 'playing') {
            handleLevelComplete(false);
        }
        return () => clearInterval(interval);
    }, [isPlaying, timer, gamePhase, puzzleCompleted]);

    // Initialize puzzle
    useEffect(() => {
        if (gamePhase === 'playing') {
            const puzzle = puzzles[currentLevel - 1];
            setCurrentPuzzle(puzzle);

            // Shuffle pieces for the puzzle area
            const shuffledPieces = [...puzzle.pieces]
                .sort(() => Math.random() - 0.5)
                .map(piece => ({ ...piece }));

            setPuzzlePieces(shuffledPieces);

            // Initialize empty grid
            const emptyGrid = Array(puzzle.pieces.length).fill(null);
            setPuzzleGrid(emptyGrid);

            setTimer(60);
            setMoves(0);
            setPuzzleCompleted(false);
            setHintUsed(false);
            setIsPlaying(true);
        }
    }, [currentLevel, gamePhase]);

    // Check puzzle completion
    useEffect(() => {
        if (gamePhase === 'playing' && puzzleGrid.length > 0) {
            const isComplete = puzzleGrid.every((cell, index) => {
                if (cell === null) return false;
                return cell.shape === currentPuzzle.solution[index];
            });

            if (isComplete && puzzleGrid.filter(cell => cell !== null).length === currentPuzzle.pieces.length) {
                setPuzzleCompleted(true);
                setTimeout(() => handleLevelComplete(true), 1000);
            }
        }
    }, [puzzleGrid, gamePhase]);

    const handleStartGame = () => {
        setGamePhase('name');
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        if (playerName.trim()) {
            setGamePhase('playing');
        }
    };

    const handlePieceSelect = (piece) => {
        if (!isPlaying || puzzleCompleted) return;
        setSelectedPiece(piece);
    };

    const handleGridClick = (gridIndex) => {
        if (!selectedPiece || !isPlaying || puzzleCompleted) return;

        // Place piece in grid
        const newGrid = [...puzzleGrid];
        newGrid[gridIndex] = selectedPiece;
        setPuzzleGrid(newGrid);

        // Remove from available pieces
        setPuzzlePieces(prev => prev.filter(p => p.id !== selectedPiece.id));

        // Increment moves and score
        setMoves(prev => prev + 1);

        // Check if correct position
        if (gridIndex === selectedPiece.correctPosition) {
            setScore(prev => prev + 50);
        }

        setSelectedPiece(null);
    };

    const handleGridRemove = (gridIndex) => {
        if (!isPlaying || puzzleCompleted) return;

        const piece = puzzleGrid[gridIndex];
        if (!piece) return;

        // Remove from grid
        const newGrid = [...puzzleGrid];
        newGrid[gridIndex] = null;
        setPuzzleGrid(newGrid);

        // Add back to available pieces
        setPuzzlePieces(prev => [...prev, piece]);

        setMoves(prev => prev + 1);
    };

    const handleHint = () => {
        if (hintUsed || !isPlaying) return;

        // Find first incorrect piece
        for (let i = 0; i < puzzleGrid.length; i++) {
            if (puzzleGrid[i] && puzzleGrid[i].correctPosition !== i) {
                // Highlight the correct position
                const hintElement = document.getElementById(`grid-${puzzleGrid[i].correctPosition}`);
                if (hintElement) {
                    hintElement.classList.add('animate-pulse', 'ring-2', 'ring-yellow-500');
                    setTimeout(() => {
                        hintElement.classList.remove('animate-pulse', 'ring-2', 'ring-yellow-500');
                    }, 2000);
                }
                break;
            }
        }

        setHintUsed(true);
        setScore(prev => Math.max(0, prev - 20)); // Penalty for using hint
    };

    const handleLevelComplete = (success) => {
        setIsPlaying(false);

        if (success) {
            // Bonus points for remaining time and efficiency
            const timeBonus = Math.floor(timer * 2);
            const moveBonus = Math.max(0, 100 - (moves * 5));
            const levelBonus = currentLevel * 100;

            setScore(prev => prev + timeBonus + moveBonus + levelBonus);

            if (currentLevel < puzzles.length) {
                setTimeout(() => {
                    setCurrentLevel(prev => prev + 1);
                    setPuzzleCompleted(false);
                }, 2000);
            } else {
                // Game complete
                setTimeout(() => {
                    saveGameResult();
                    setGamePhase('result');
                }, 2500);
            }
        } else {
            // Time's up or quit
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
            totalLevels: puzzles.length,
            moves,
            date: new Date().toLocaleDateString('id-ID'),
            time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        };

        const newHistory = [result, ...gameHistory.slice(0, 4)];
        setGameHistory(newHistory);
        localStorage.setItem('game3_history', JSON.stringify(newHistory));
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
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                                <span className="text-5xl">🧩</span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-4">Puzzle Bentuk Geometri</h2>
                            <p className="text-[#6b7280] text-lg max-w-md mx-auto">
                                Susun potongan bentuk menjadi gambar yang utuh dan bermakna
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-[#f9fafb] to-white rounded-2xl p-8 mb-10 border border-[#e5e7eb]">
                            <h3 className="text-xl font-semibold text-[#355485] mb-6">4 Level Puzzle Menantang</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {puzzles.map(puzzle => (
                                    <div key={puzzle.id} className="text-center">
                                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2">
                                            {puzzle.image}
                                        </div>
                                        <div className="text-sm text-[#6b7280]">Level {puzzle.id}</div>
                                        <div className="text-xs text-[#9ca3af]">{puzzle.pieces.length} potongan</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleStartGame}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                       text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 
                       hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            🧩 Mulai Puzzle
                        </button>
                    </div>
                );

            case 'name':
                return (
                    <div className="max-w-md mx-auto">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-6">
                                <span className="text-4xl">👤</span>
                            </div>
                            <h2 className="text-2xl font-bold text-[#355485] mb-3">Siapa Namamu?</h2>
                            <p className="text-[#6b7280]">Rekam prestasi puzzle-mu!</p>
                        </div>

                        <form onSubmit={handleNameSubmit} className="space-y-6">
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Masukkan nama kamu"
                                className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-[#cbdde9] focus:border-purple-500 
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30 transition-all duration-300
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
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 
                           hover:to-pink-600 text-white font-bold py-3 px-6 rounded-2xl 
                           transition-all duration-300 hover:scale-105 disabled:opacity-50 
                           disabled:cursor-not-allowed"
                                >
                                    Mulai Puzzle →
                                </button>
                            </div>
                        </form>
                    </div>
                );

            case 'playing':
                return (
                    <>
                        {/* Game Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-[#355485]">{currentPuzzle.title}</h2>
                                <p className="text-[#6b7280] text-sm">Player: {playerName}</p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-xl font-bold text-[#355485]">Level {currentLevel}</div>
                                    <div className="text-sm text-[#9ca3af]">/{puzzles.length}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-purple-500">{score}</div>
                                    <div className="text-sm text-[#9ca3af]">Skor</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold text-[#355485]">{moves}</div>
                                    <div className="text-sm text-[#9ca3af]">Langkah</div>
                                </div>
                                <div className={`text-center ${timer < 15 ? 'animate-pulse' : ''}`}>
                                    <div className={`text-xl font-bold ${timer < 15 ? 'text-red-500' : 'text-[#355485]'}`}>
                                        {timer}s
                                    </div>
                                    <div className="text-sm text-[#9ca3af]">Waktu</div>
                                </div>
                            </div>
                        </div>

                        {/* Target Image */}
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-100">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center">
                                    <div className="text-6xl mb-3">{currentPuzzle.image}</div>
                                    <div className="text-sm text-purple-600 font-medium">Target Gambar</div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-[#355485] mb-2">{currentPuzzle.description}</h3>
                                    <p className="text-[#6b7280]">Susun potongan di bawah menjadi gambar seperti ini!</p>
                                    {!hintUsed && (
                                        <button
                                            onClick={handleHint}
                                            className="mt-3 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white 
                               rounded-lg text-sm font-medium hover:from-yellow-600 hover:to-orange-600 
                               transition-all duration-300"
                                        >
                                            💡 Minta Petunjuk (-20 poin)
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Selected Piece */}
                        {selectedPiece && (
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 mb-6 text-center">
                                <p className="text-[#355485] font-medium">
                                    <span className="text-2xl mr-2">{selectedPiece.shape}</span>
                                    Potongan terpilih. Klik kotak untuk menempatkan!
                                </p>
                            </div>
                        )}

                        {/* Game Area */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                            {/* Available Pieces */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#355485] mb-4">Potongan Puzzle:</h3>
                                <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb] min-h-[200px]">
                                    {puzzlePieces.length > 0 ? (
                                        <div className="flex flex-wrap gap-4 justify-center">
                                            {puzzlePieces.map(piece => (
                                                <button
                                                    key={piece.id}
                                                    onClick={() => handlePieceSelect(piece)}
                                                    className={`text-4xl p-4 rounded-xl border-2 transition-all duration-300
                                   ${selectedPiece?.id === piece.id
                                                            ? 'border-purple-500 bg-purple-50 transform scale-110'
                                                            : 'border-[#cbdde9] bg-white hover:border-purple-400 hover:shadow-lg hover:scale-105'
                                                        }`}
                                                >
                                                    {piece.shape}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-[#9ca3af]">
                                            <div className="text-4xl mb-3">✅</div>
                                            <p>Semua potongan sudah ditempatkan!</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Puzzle Grid */}
                            <div>
                                <h3 className="text-lg font-semibold text-[#355485] mb-4">Area Puzzle:</h3>
                                <div className="bg-gradient-to-br from-[#f9fafb] to-white rounded-2xl p-6 border border-[#e5e7eb]">
                                    <div className={`grid ${currentLevel <= 2 ? 'grid-cols-2' : 'grid-cols-4'} gap-4`}>
                                        {puzzleGrid.map((piece, index) => (
                                            <div
                                                key={index}
                                                id={`grid-${index}`}
                                                onClick={() => {
                                                    if (piece) {
                                                        handleGridRemove(index);
                                                    } else if (selectedPiece) {
                                                        handleGridClick(index);
                                                    }
                                                }}
                                                className={`aspect-square rounded-xl border-2 flex items-center justify-center text-3xl
                                 transition-all duration-300 cursor-pointer
                                 ${piece
                                                        ? 'border-purple-500 bg-purple-50 hover:bg-purple-100'
                                                        : 'border-dashed border-[#cbdde9] hover:border-purple-300 hover:bg-purple-50'
                                                    }
                                 ${selectedPiece && !piece ? 'hover:scale-105' : ''}`}
                                            >
                                                {piece ? (
                                                    <div className="relative">
                                                        <span>{piece.shape}</span>
                                                        {index === piece.correctPosition && (
                                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-[#cbdde9] text-sm">Klik</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="mt-8">
                            <div className="flex justify-between text-sm text-[#6b7280] mb-2">
                                <span>Progress: {puzzleGrid.filter(cell => cell !== null).length}/{currentPuzzle.pieces.length} potongan</span>
                                <span>{Math.round((puzzleGrid.filter(cell => cell !== null).length / currentPuzzle.pieces.length) * 100)}%</span>
                            </div>
                            <div className="w-full bg-[#e5e7eb] rounded-full h-3">
                                <div
                                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${(puzzleGrid.filter(cell => cell !== null).length / currentPuzzle.pieces.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Puzzle Completed Overlay */}
                        {puzzleCompleted && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
                                <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center animate-scale-in">
                                    <div className="text-6xl mb-4">🎊</div>
                                    <h3 className="text-2xl font-bold text-[#355485] mb-3">Level Selesai!</h3>
                                    <p className="text-[#6b7280] mb-6">Selamat! Puzzle berhasil disusun!</p>
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                                </div>
                            </div>
                        )}
                    </>
                );

            case 'result':
                const progressPercentage = Math.round((currentLevel / puzzles.length) * 100);
                return (
                    <>
                        {/* Result Header */}
                        <div className="text-center mb-10">
                            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-2xl mb-6
                ${score >= 2000 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                    score >= 1500 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                                        'bg-gradient-to-r from-purple-400 to-pink-400'}`}
                            >
                                <span className="text-5xl">
                                    {score >= 2000 ? '🏆' : score >= 1500 ? '🎉' : '🧩'}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-[#355485] mb-3">
                                {score >= 2000 ? 'Puzzle Master!' : score >= 1500 ? 'Hebat!' : 'Bagus!'}
                            </h2>
                            <p className="text-[#6b7280]">Hasil puzzle {playerName}</p>
                        </div>

                        {/* Score Card */}
                        <div className="bg-gradient-to-br from-[#f9fafb] to-white rounded-2xl p-8 mb-10 border border-[#e5e7eb] shadow-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-purple-500 mb-2">{score}</div>
                                    <div className="text-sm text-[#6b7280]">Total Skor</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{currentLevel}</div>
                                    <div className="text-sm text-[#6b7280]">Level Tercapai</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{moves}</div>
                                    <div className="text-sm text-[#6b7280]">Total Langkah</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl font-bold text-[#355485] mb-2">{progressPercentage}%</div>
                                    <div className="text-sm text-[#6b7280]">Progress Game</div>
                                </div>
                            </div>
                        </div>

                        {/* Level Progress */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-[#355485] mb-4">Progress Level Puzzle:</h3>
                            <div className="space-y-4">
                                {puzzles.map(puzzle => (
                                    <div key={puzzle.id} className="flex items-center">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4
                      ${currentLevel >= puzzle.id
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                : 'bg-[#e5e7eb] text-[#9ca3af]'
                                            }`}
                                        >
                                            {currentLevel >= puzzle.id ? '✓' : puzzle.id}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-[#355485]">{puzzle.title}</div>
                                            <div className="text-sm text-[#6b7280]">{puzzle.pieces.length} potongan</div>
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
                         font-bold hover:border-purple-500 transition-all duration-300 hover:scale-105"
                            >
                                ← Game Baru
                            </button>
                            <button
                                onClick={restartGame}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 
                         hover:to-pink-600 text-white font-bold py-4 px-6 rounded-2xl 
                         transition-all duration-300 hover:scale-105"
                            >
                                🔁 Main Lagi
                            </button>
                        </div>

                        {/* History Section */}
                        {gameHistory.length > 0 && (
                            <div className="border-t border-[#e5e7eb] pt-10">
                                <h3 className="text-xl font-bold text-[#355485] mb-6 flex items-center gap-2">
                                    <span>📊</span> Riwayat Puzzle
                                </h3>
                                <div className="space-y-4">
                                    {gameHistory.slice(0, 5).map((history, index) => (
                                        <div
                                            key={history.id}
                                            className={`bg-white rounded-xl p-4 border ${index === 0 ? 'border-purple-500 shadow-md' : 'border-[#e5e7eb]'}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="font-semibold text-[#355485]">{history.playerName}</div>
                                                    <div className="text-sm text-[#9ca3af]">{history.date} • {history.time}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-purple-500">{history.score}</div>
                                                    <div className="text-sm text-[#9ca3af]">
                                                        Level {history.levelReached} • {history.moves} langkah
                                                    </div>
                                                </div>
                                            </div>
                                            {index === 0 && (
                                                <div className="mt-2 text-center">
                                                    <span className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs">
                                                        🧩 Paling Baru
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

export default Game3PuzzleBentuk;