import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import About from './components/About';
import Profile from './components/Profile';
import Features from './components/Features';
import Solution from './components/Solution';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';
import Legal from './components/Legal';
import Contest from './components/Contest';
import PublicProcurement from './components/PublicProcurement';
import AnnouncementBanner from './components/AnnouncementBanner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <AnnouncementBanner />
        <Navbar />
        <div className="pt-32">
          <Routes>
            <Route path="/legal" element={<Legal />} />
            <Route path="/commande-publique" element={
              <>
                <PublicProcurement />
                <Footer />
                <WhatsAppWidget />
              </>
            } />
            <Route path="/concours" element={
              <>
                <Contest />
                <Footer />
                <WhatsAppWidget />
              </>
            } />
            <Route path="/" element={
              <>
                <Hero />
                <Categories />
                <Profile />
                <About />
                <Features />
                <Solution />
                <Contact />
                <Footer />
                <WhatsAppWidget />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;