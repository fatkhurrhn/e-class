import React from "react";
import { NavLink } from "react-router-dom";
import LocalSearch from "./LocalSearch";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* LOGO */}
                    <NavLink to="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#355485] rounded-lg flex items-center justify-center">
                            <i className="ri-book-3-line text-white text-lg"></i>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-[#2a436c]">E-CLASS</h1>
                            <p className="text-xs text-gray-500 -mt-1">MI Al-Ikhlas</p>
                        </div>
                    </NavLink>

                    {/* SEARCH + MENU */}
                    <div className="hidden md:flex items-center gap-10 ml-auto">

                        {/* Search Box */}
                        {/* <div className="w-64">
                            <LocalSearch />
                        </div> */}

                        {/* Navigation Links */}
                        <div className="flex items-center gap-6">

                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-[#355485] font-semibold"
                                        : "text-[#2a436c] hover:text-[#355485] transition"
                                }
                            >
                                Beranda
                            </NavLink>

                            <NavLink
                                to="/tentang"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-[#355485] font-semibold"
                                        : "text-[#2a436c] hover:text-[#355485] transition"
                                }
                            >
                                Tentang
                            </NavLink>

                            {/* SEMESTER 1 DROPDOWN */}
                            <div className="relative group">
                                <button
                                    className="text-gray-600 hover:text-[#355485] transition font-medium group-hover:text-[#355485]"
                                >
                                    Semester 1
                                </button>

                                {/* Dropdown Box */}
                                <div
                                    className="
            pointer-events-none
            absolute top-full left-0
            opacity-0 translate-y-1
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
            bg-white shadow-lg border rounded-md w-64 transition-all duration-200
        "
                                >
                                    <DropdownItem to="/s1/bab1" text="Bab 1 — Ayo Membilang sampai 10" />
                                    <DropdownItem to="/s1/bab2" text="Bab 2 — Penjumlahan sampai 10" />
                                    <DropdownItem to="/s1/bab3" text="Bab 3 — Pengurangan sampai 10" />
                                    <DropdownItem to="/s1/bab4" text="Bab 4 — Mengenal Bentuk" />
                                </div>
                            </div>

                            {/* SEMESTER 2 DROPDOWN */}
                            <div className="relative group">
                                <button
                                    className="text-gray-600 hover:text-[#355485] transition font-medium group-hover:text-[#355485]"
                                >
                                    Semester 2
                                </button>

                                <div
                                    className="
            pointer-events-none
            absolute top-full left-0
            opacity-0 translate-y-1
            group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
            bg-white shadow-lg border rounded-md w-64 transition-all duration-200
        "
                                >
                                    <DropdownItem to="/s2/bab5" text="Bab 5 — Membilang sampai 20" />
                                    <DropdownItem to="/s2/bab6" text="Bab 6 — Penjumlahan & Pengurangan" />
                                    <DropdownItem to="/s2/bab7" text="Bab 7 — Pengukuran Panjang Benda" />
                                    <DropdownItem to="/s2/bab8" text="Bab 8 — Mengenal Diagram" />
                                </div>
                            </div>


                            <NavLink
                                to="/panduan"
                                className={({ isActive }) =>
                                    isActive
                                        ? "text-[#355485] font-semibold"
                                        : "text-gray-600 hover:text-[#2a436c] transition"
                                }
                            >
                                Panduan
                            </NavLink>

                        </div>

                    </div>

                </div>
            </div>
        </nav>
    );
}

function DropdownItem({ to, text }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                block px-4 py-2 text-sm transition
                ${isActive
                    ? "bg-[#355485] text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#355485]"
                }
                `
            }
        >
            {text}
        </NavLink>
    );
}

