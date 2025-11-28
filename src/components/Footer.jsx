import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-[#2a436c] text-white pt-12 pb-8 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* GRID 4 KOLOM */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    {/* BRAND */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <i className="ri-book-3-line text-white text-lg"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-xl">E-CLASS</h4>
                                <p className="text-xs text-gray-300">MI Al-Ikhlas</p>
                            </div>
                        </div>

                        <p className="text-sm text-gray-300 leading-relaxed">
                            Platform pembelajaran interaktif untuk siswa MI Al-Ikhlas
                            yang memudahkan akses materi, latihan, dan panduan belajar.
                        </p>
                    </div>

                    {/* MENU UTAMA */}
                    <div>
                        <h5 className="font-semibold mb-4 text-white">Navigasi</h5>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="text-gray-300 hover:text-white transition">Beranda</Link></li>
                            <li><Link to="/tentang" className="text-gray-300 hover:text-white transition">Tentang</Link></li>
                            <li><Link to="/panduan" className="text-gray-300 hover:text-white transition">Panduan</Link></li>
                        </ul>
                    </div>

                    {/* SEMESTER 1 */}
                    <div>
                        <h5 className="font-semibold mb-4 text-white">Semester 1</h5>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/semester/1/bab1" className="text-gray-300 hover:text-white transition">Bab 1 — Membilang 1–10</Link></li>
                            <li><Link to="/semester/1/bab2" className="text-gray-300 hover:text-white transition">Bab 2 — Penjumlahan 1–10</Link></li>
                            <li><Link to="/semester/1/bab3" className="text-gray-300 hover:text-white transition">Bab 3 — Pengurangan 1–10</Link></li>
                            <li><Link to="/semester/1/bab4" className="text-gray-300 hover:text-white transition">Bab 4 — Bentuk & Bangun</Link></li>
                        </ul>
                    </div>

                    {/* SEMESTER 2 */}
                    <div>
                        <h5 className="font-semibold mb-4 text-white">Semester 2</h5>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/semester/2/bab5" className="text-gray-300 hover:text-white transition">Bab 5 — Membilang 1–20</Link></li>
                            <li><Link to="/semester/2/bab6" className="text-gray-300 hover:text-white transition">Bab 6 — Penjumlahan & Pengurangan</Link></li>
                            <li><Link to="/semester/2/bab7" className="text-gray-300 hover:text-white transition">Bab 7 — Pengukuran Panjang</Link></li>
                            <li><Link to="/semester/2/bab8" className="text-gray-300 hover:text-white transition">Bab 8 — Diagram</Link></li>
                        </ul>
                    </div>
                </div>

                {/* COPYRIGHT */}
                <div className="pt-6 border-t border-blue-400/30 text-center">
                    <p className="text-sm text-gray-400">
                        © 2025 E-CLASS MI Al-Ikhlas. Semua Hak Dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
