import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HeritageSection from '../components/HeritageSection';
import MapSection from '../components/MapSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container relative min-h-screen flex flex-col">
      <div className="fixed inset-0 grain-overlay z-[60]"></div>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HeritageSection />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
