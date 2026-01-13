import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AutoToTop from './components/AutoToTop';
import HomePage from './pages/HomePage';
import Try from './pages/Try';
import ComingSoon from './pages/ComingSoon';

import Percobaan1 from './pages/percobaan/Percobaan1';
import Percobaan2 from './pages/percobaan/Percobaan2';
import Percobaan3 from './pages/percobaan/Percobaan3';
import Percobaan4 from './pages/percobaan/Percobaan4';
import Percobaan5 from './pages/percobaan/Percobaan5';
import Percobaan6 from './pages/percobaan/Percobaan6';
import Percobaan7 from './pages/percobaan/Percobaan7';
import Percobaan8 from './pages/percobaan/Percobaan8';
import Percobaan9 from './pages/percobaan/Percobaan9';
import Percobaan10 from './pages/percobaan/Percobaan10';
import About from './pages/About';
import IndexBab2 from './pages/bab2/IndexBab2';
import IndexBab4 from './pages/bab4/IndexBab4';
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

        {/* route semester 1 */}
        <Route path="/s1/bab4" element={<IndexBab4 />} />

        {/* route semester 2 */}
        <Route path="/s2/bab7" element={<IndexBab7 />} />

        {/* route semester 2 */}
        <Route path="/s2/bab8" element={<IndexBab8 />} />
        
        <Route path="/p1" element={<Percobaan1 />} />
        <Route path="/p2" element={<Percobaan2 />} />
        <Route path="/p3" element={<Percobaan3 />} />
        <Route path="/p4" element={<Percobaan4 />} />
        <Route path="/p5" element={<Percobaan5 />} />
        <Route path="/p6" element={<Percobaan6 />} />
        <Route path="/p7" element={<Percobaan7 />} />
        <Route path="/p8" element={<Percobaan8 />} />
        <Route path="/p9" element={<Percobaan9 />} />
        <Route path="/p10" element={<Percobaan10 />} />

        {/* Catch-all untuk halaman yang tidak ada */}
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/comingsoon" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
