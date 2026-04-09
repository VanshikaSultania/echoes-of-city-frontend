import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-[921px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img alt="Heritage Architecture of Bangalore" className="w-full h-full object-cover brightness-[0.4] scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfQJBbu0p6yg0ovcC2zdAG0VeQa4-AAkniXxJ90ZsJTYv9PjmtzhXEyXJMZ-hngy9eMAlnbxAonR9nrrQGpvC0Chzv_8AiscH5bDaANo8aof1_vBn2h61aUdl9EQD2uxIjrW4c0JvHrALOWUybeT_MuineEYMZZjixhCFcRbw4u9ILhzWSIQmf1cClGqiiRIlhuGzUutP5Hyj-RWg5BZ4yxKHbbsulInzPFIudxZin7eEAQAt_Oyx-qWLqOqi1tCjg1Ab_SM6LzX-e" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-surface"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <span className="inline-block py-1 px-4 mb-6 rounded-full bg-secondary-container/20 text-secondary font-label text-xs uppercase tracking-[0.2em] backdrop-blur-md">Established 1537</span>
          <h1 className="font-headline text-5xl md:text-8xl text-white font-bold leading-[0.9] tracking-tighter mb-8 italic">
            Echoes of the <br />City
          </h1>
          <p className="font-body text-xl md:text-2xl text-white/80 leading-relaxed font-light mb-12 max-w-2xl">
            Uncovering Bangalore’s hidden history through a living digital archive. Experience the architectural whispers of the Garden City’s royal past.
          </p>
          <div className="flex flex-wrap gap-8 items-center">
            <Link to="/signup" className="bg-secondary text-on-secondary px-8 py-4 rounded-lg font-medium text-lg flex items-center gap-3 hover:shadow-xl hover:shadow-secondary/20 transition-all">
              Explore the Archive
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <a className="text-white font-label text-sm uppercase tracking-widest border-b border-secondary/50 pb-1 hover:border-secondary transition-colors" href="#map">View Map</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
