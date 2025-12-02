// src/components/LocalSearch.jsx - Updated Version
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LocalSearch() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    // Popular searches
    const popularSearches = [
        "penjumlahan", "pengurangan", "bangun datar", "pengukuran",
        "diagram", "bilangan", "geometri", "hitung cepat"
    ];

    // Helper function untuk menentukan type dari path
    function getTypeFromPath(path) {
        if (path.includes('/bab') || path.includes('/s1/bab')) return 'chapter';
        if (path === '/' || path === '/beranda') return 'home';
        if (path === '/tentang' || path.includes('about')) return 'about';
        if (path.includes('/game') || path.includes('/play')) return 'game';
        if (path.includes('/percobaan') || path.includes('/p')) return 'experiment';
        return 'page';
    }

    // Helper function untuk menentukan icon berdasarkan type
    function getIconByType(type) {
        switch (type) {
            case 'chapter': return '📚';
            case 'game': return '🎮';
            case 'home': return '🏠';
            case 'about': return '🏫';
            case 'experiment': return '🔬';
            default: return '📄';
        }
    }

    // Helper function untuk menentukan color berdasarkan type
    function getColorByType(type) {
        switch (type) {
            case 'chapter': return 'from-blue-500 to-cyan-500';
            case 'game': return 'from-green-500 to-emerald-500';
            case 'home': return 'from-purple-500 to-pink-500';
            case 'about': return 'from-orange-500 to-red-500';
            case 'experiment': return 'from-indigo-500 to-purple-500';
            default: return 'from-gray-500 to-gray-600';
        }
    }

    // Hybrid load function untuk development dan production
    const loadSearchData = async () => {
        setIsLoading(true);
        try {
            let data = [];
            let loaded = false;

            // Coba load dari beberapa lokasi (production first)
            const possiblePaths = [
                '/data/searchData.json',          // Public folder (production)
                '/src/data/searchData.json',      // Source folder (development)
                './data/searchData.json',         // Relative path
            ];

            for (const path of possiblePaths) {
                try {
                    const response = await fetch(path);
                    if (response.ok) {
                        data = await response.json();
                        console.log(`✅ Loaded search data from: ${path}`);
                        loaded = true;
                        break;
                    }
                } catch (err) {
                    console.log(`⚠️ Cannot load from ${path}:`, err.message);
                    continue;
                }
            }

            // Jika fetch gagal semua, coba import langsung (development with Vite)
            if (!loaded) {
                try {
                    console.log('🔄 Trying to import search data directly...');
                    const searchDataModule = await import('../data/searchData.json');
                    data = searchDataModule.default || searchDataModule;
                    loaded = true;
                } catch (importError) {
                    console.error('❌ Failed to import search data:', importError);
                }
            }

            // Fallback ke data default jika semua gagal
            if (!loaded || !data || data.length === 0) {
                console.warn('⚠️ Using fallback search data');
                data = [
                    { title: "Beranda", path: "/", type: "home", description: "Halaman utama" },
                    { title: "Tentang", path: "/tentang", type: "about", description: "Informasi tentang platform" },
                    { title: "Bab 4 - Mengenal Bentuk", path: "/s1/bab4", type: "chapter", description: "Belajar mengenal bentuk geometri" },
                ];
            }

            // Enhance data dengan type, icon, dll
            const enhancedData = data.map(item => ({
                ...item,
                type: item.type || getTypeFromPath(item.path),
                icon: getIconByType(item.type || getTypeFromPath(item.path))
            }));

            setAllData(enhancedData);
            console.log(`📊 Loaded ${enhancedData.length} search items`);

        } catch (error) {
            console.error('❌ Error loading search data:', error);
            // Set empty array sebagai fallback
            setAllData([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Load data saat komponen mount
    useEffect(() => {
        loadSearchData();
    }, []);

    // Filter realtime dengan pencarian di semua field
    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const searchTerm = query.toLowerCase();
        const filtered = allData.filter((item) => {
            // Search in title
            if (item.title && item.title.toLowerCase().includes(searchTerm)) return true;

            // Search in description
            if (item.description && item.description.toLowerCase().includes(searchTerm)) return true;

            // Search in keywords (array)
            if (item.keywords && Array.isArray(item.keywords)) {
                if (item.keywords.some(keyword =>
                    keyword.toLowerCase().includes(searchTerm)
                )) return true;
            }

            // Search in chapter
            if (item.chapter && item.chapter.toLowerCase().includes(searchTerm)) return true;

            // Search in type
            if (item.type && item.type.toLowerCase().includes(searchTerm)) return true;

            // Search in path (as last resort)
            if (item.path && item.path.toLowerCase().includes(searchTerm)) return true;

            return false;
        }).slice(0, 10);

        // Sort results: exact matches first, then by type priority
        filtered.sort((a, b) => {
            const aTitleMatch = a.title.toLowerCase().includes(searchTerm);
            const bTitleMatch = b.title.toLowerCase().includes(searchTerm);

            if (aTitleMatch && !bTitleMatch) return -1;
            if (!aTitleMatch && bTitleMatch) return 1;

            const typePriority = {
                chapter: 1,
                game: 2,
                home: 3,
                about: 4,
                experiment: 5,
                page: 6
            };
            return (typePriority[a.type] || 99) - (typePriority[b.type] || 99);
        });

        setResults(filtered);
    }, [query, allData]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setShowPopup(false);
            setQuery("");
        }
    };

    const handleResultClick = (item) => {
        navigate(item.path);
        setShowPopup(false);
        setQuery("");
    };

    const handlePopularSearch = (searchTerm) => {
        setQuery(searchTerm);
    };

    const openSearchPopup = () => {
        setShowPopup(true);
    };

    const closeSearchPopup = () => {
        setShowPopup(false);
        setQuery("");
    };

    // Close popup when pressing Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeSearchPopup();
            }
        };

        if (showPopup) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [showPopup]);

    return (
        <>
            {/* Search Trigger Button */}
            <div className="relative w-full max-w-2xl mx-auto">
                <div
                    onClick={openSearchPopup}
                    className="w-full px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 
                             text-white placeholder-white/70 text-lg shadow-2xl cursor-text
                             hover:bg-white/25 hover:border-white/40 transition-all duration-300
                             flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span className="text-white/70">Cari materi atau game...</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <kbd className="px-2 py-1 text-xs bg-white/20 rounded-lg text-white/70">⌘K</kbd>
                    </div>
                </div>

                <p className="text-white/70 text-sm mt-3 text-center">
                    💡 Coba cari: "penjumlahan", "pengurangan", "bangun datar", "diagram"
                </p>
            </div>

            {/* Search Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={closeSearchPopup}
                    />

                    {/* Popup Content */}
                    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                        {/* Search Header */}
                        <div className="p-6 border-b border-gray-100">
                            <form onSubmit={handleSearchSubmit}>
                                <div className="relative">
                                    <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Cari materi, game, atau bab pembelajaran..."
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        autoFocus
                                        className="w-full pl-12 pr-20 py-4 text-gray-800 placeholder-gray-500 
                                                 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none 
                                                 focus:ring-2 focus:ring-[#4f90c6] focus:border-transparent text-lg"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 
                                                 bg-gradient-to-r from-[#4f90c6] to-[#90b6d5] text-white 
                                                 px-4 py-2 rounded-lg font-medium hover:from-[#3a7bb5] 
                                                 hover:to-[#7aa8d1] transition-all duration-200"
                                    >
                                        Cari
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Popup Body */}
                        <div className="max-h-[60vh] overflow-y-auto">
                            {/* Loading State */}
                            {isLoading && (
                                <div className="p-8 text-center text-gray-600">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4f90c6] mx-auto mb-3"></div>
                                    <p>Memuat data pembelajaran...</p>
                                    <p className="text-sm text-gray-500 mt-2">Mencari data di semua lokasi...</p>
                                </div>
                            )}

                            {/* Search Results */}
                            {!isLoading && query.trim() && (
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-800 mb-4 px-2 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        Hasil untuk "{query}"
                                        <span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {results.length} hasil ditemukan
                                        </span>
                                    </h3>

                                    {results.length > 0 ? (
                                        <div className="space-y-2">
                                            {results.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 
                                                             cursor-pointer transition-all duration-200 group border border-transparent hover:border-gray-200"
                                                    onClick={() => handleResultClick(item)}
                                                >
                                                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center 
                                                                  text-white text-lg bg-gradient-to-r ${getColorByType(item.type)}`}>
                                                        {item.icon || '📄'}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-left font-semibold text-gray-800 text-base group-hover:text-[#2a436c] 
                                                                    transition-colors">
                                                            {item.title}
                                                        </p>
                                                        {item.description && (
                                                            <p className="text-sm text-gray-500 mt-1 line-clamp-1 text-left">
                                                                {item.description}
                                                            </p>
                                                        )}
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">
                                                                {item.type}
                                                            </span>
                                                            {item.chapter && (
                                                                <span className="text-xs text-gray-500">
                                                                    • {item.chapter}
                                                                </span>
                                                            )}
                                                            {item.keywords && item.keywords.length > 0 && (
                                                                <span className="text-xs text-gray-400">
                                                                    • {item.keywords.slice(0, 2).join(', ')}
                                                                    {item.keywords.length > 2 && '...'}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#4f90c6] 
                                                                 transform group-hover:translate-x-1 transition-all"
                                                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8 text-gray-500">
                                            <div className="text-5xl mb-3">🔍</div>
                                            <p className="font-medium text-lg">Tidak ada hasil ditemukan</p>
                                            <p className="text-sm mt-2">Coba kata kunci lain atau lihat pencarian populer di bawah</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Popular Searches - Tampilkan ketika tidak ada query atau hasil */}
                            {!isLoading && (!query.trim() || results.length === 0) && (
                                <div className="p-6">
                                    <h3 className="font-semibold text-gray-800 mb-4 px-2 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                        Pencarian Populer
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {popularSearches.map((search, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handlePopularSearch(search)}
                                                className="px-4 py-3 bg-gray-100 hover:bg-gradient-to-r hover:from-[#4f90c6] 
                                                         hover:to-[#90b6d5] hover:text-white rounded-xl text-sm font-medium 
                                                         text-gray-600 hover:shadow-lg transition-all duration-200 flex items-center gap-2 group"
                                            >
                                                <span className="group-hover:scale-110 transition-transform duration-200">🔍</span>
                                                {search}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quick Access */}
                            <div className="p-6 bg-gray-50 border-t border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-gray-800 px-2">Akses Cepat</h3>
                                    <span className="text-xs text-gray-500">Pilihan terpopuler</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {/* Chapter Access */}
                                    <button
                                        onClick={() => {
                                            const chapterItem = allData.find(item => item.type === 'chapter');
                                            if (chapterItem) {
                                                navigate(chapterItem.path);
                                            } else {
                                                navigate('/s1/bab4');
                                            }
                                            closeSearchPopup();
                                        }}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gray-100 
                                                 text-gray-700 font-medium transition-all duration-200 border border-gray-200 hover:border-[#4f90c6] group"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                                            📚
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold">Bab Pembelajaran</p>
                                            <p className="text-xs text-gray-500">Materi interaktif</p>
                                        </div>
                                    </button>

                                    {/* Game Access */}
                                    <button
                                        onClick={() => {
                                            const gameItem = allData.find(item => item.type === 'game');
                                            if (gameItem) {
                                                navigate(gameItem.path);
                                            } else {
                                                navigate('/s1/bab4');
                                            }
                                            closeSearchPopup();
                                        }}
                                        className="flex items-center gap-3 p-4 rounded-xl bg-white hover:bg-gray-100 
                                                 text-gray-700 font-medium transition-all duration-200 border border-gray-200 hover:border-[#4f90c6] group"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                                            🎮
                                        </div>
                                        <div className="text-left">
                                            <p className="font-semibold">Game Edukatif</p>
                                            <p className="text-xs text-gray-500">Belajar sambil bermain</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-100 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                                <span>Tekan <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">ESC</kbd> untuk tutup</span>
                                <span className="hidden md:inline">•</span>
                                <span className="hidden md:inline">Tekan <kbd className="px-2 py-1 bg-gray-200 rounded text-xs">↵ Enter</kbd> untuk search</span>
                            </div>
                            <button
                                onClick={closeSearchPopup}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors hover:bg-gray-200 rounded-lg"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}