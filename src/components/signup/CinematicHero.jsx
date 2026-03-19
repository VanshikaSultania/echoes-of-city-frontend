import React from 'react';

const CinematicHero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img alt="Heritage Architecture of Bangalore" className="w-full h-full object-cover brightness-[0.4] scale-105" data-alt="Cinematic wide shot of ornate heritage architecture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfQJBbu0p6yg0ovcC2zdAG0VeQa4-AAkniXxJ90ZsJTYv9PjmtzhXEyXJMZ-hngy9eMAlnbxAonR9nrrQGpvC0Chzv_8AiscH5bDaANo8aof1_vBn2h61aUdl9EQD2uxIjrW4c0JvHrALOWUybeT_MuineEYMZZjixhCFcRbw4u9ILhzWSIQmf1cClGqiiRIlhuGzUutP5Hyj-RWg5BZ4yxKHbbsulInzPFIudxZin7eEAQAt_Oyx-qWLqOqi1tCjg1Ab_SM6LzX-e"/>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-surface"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <span className="inline-block font-label text-secondary tracking-[0.3em] uppercase text-xs mb-6 block" style={{ letterSpacing: '0.5em' }}>Est. 1892 — Bangalore</span>
        <h1 className="font-headline text-5xl md:text-8xl text-surface leading-tight mb-8 text-shadow-sm italic">
          Echoes of the City
        </h1>
        <p className="font-body text-surface/80 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Uncover the timeless narrative of Bangalore’s royal palaces, sacred temples, and sprawling botanical gardens through a lens of preserved history.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-surface/20 pt-12">
          <div className="flex flex-col items-center">
            <span className="font-headline text-3xl text-secondary mb-1">12</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-surface/60">Heritage Sites</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-headline text-3xl text-secondary mb-1">500+</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-surface/60">Years of History</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-headline text-3xl text-secondary mb-1">Interactive</span>
            <span className="font-label text-[10px] uppercase tracking-widest text-surface/60">Discovery</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <span className="material-symbols-outlined text-surface/40">expand_more</span>
      </div>
    </section>
  );
};

export default CinematicHero;
