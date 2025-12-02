import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
    HeroSection,
    GameTypesSection,
    ChaptersSection,
    HowItWorksSection,
    FinalCTASection
} from '../components/home';

export default function HomePage() {
    const [searchQuery] = useState('');

    const stats = [
        { number: "50+", label: "Game Edukatif" },
        { number: "8", label: "Bab Materi" },
        { number: "4", label: "Tipe Permainan" },
        { number: "100%", label: "Sesuai Kurikulum" }
    ];

    return (
        <>
            <Navbar />
            <HeroSection stats={stats} />
            <GameTypesSection />
            <ChaptersSection searchQuery={searchQuery} />
            <HowItWorksSection />
            <FinalCTASection />

            <Footer />
        </>
    );
}