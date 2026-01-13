import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AutoToTop from './components/AutoToTop';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Try from './pages/Try';
import ComingSoon from './pages/ComingSoon';
import IndexBab2 from './pages/bab2/IndexBab2';
import IndexBab3 from './pages/bab3/IndexBab3';
import IndexBab4 from './pages/bab4/IndexBab4';
import IndexBab6 from './pages/bab6/IndexBab6';
import IndexBab7 from './pages/bab7/IndexBab7';
import IndexBab8 from './pages/bab8/IndexBab8';
function App() {
  return (
    <Router>
      <AutoToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/try" element={<Try />} />
        <Route path="/tentang" element={<About />} />

        {/* route semester 1 */}
        <Route path="/s1/bab2" element={<IndexBab2 />} />
        <Route path="/s1/bab3" element={<IndexBab3 />} />
        <Route path="/s1/bab4" element={<IndexBab4 />} />

        {/* route semester 2 */}
        <Route path="/s2/bab6" element={<IndexBab6 />} />
        <Route path="/s2/bab7" element={<IndexBab7 />} />
        <Route path="/s2/bab8" element={<IndexBab8 />} />
        
        {/* Catch-all untuk halaman yang tidak ada */}
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/comingsoon" replace />} />
      </Routes>
    </Router>
  );
}

export default App;