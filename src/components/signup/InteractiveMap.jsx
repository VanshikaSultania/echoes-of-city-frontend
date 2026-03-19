import React from 'react';

const InteractiveMap = () => {
  return (
    <section className="py-24 bg-primary text-surface relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img alt="Map background" className="w-full h-full object-cover" data-alt="Abstract vintage map texture with faint lines" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYvq3E8AABh9DYSq1Pcy-SazYD_lDbonm-RhClMHzZ_e_2dULGJ2ZCt-GQfzcOcvZkwRGALiunCTovr6hRDDdIInlZ0H5UgPLxPh86BvDeQm2cym8NzCfYLFmOIExHqfq5RVLrJs3lmtxMWVLTQdv2yuZpPPEBTVPq-Xtm1ZXTb0Wwb-cGklf7dUyUqLn3zUi1yyLaHvdtaoQEm0IPR8K6ub_QFdYCQD__iIiJI_5kvpcMYMYM2tp52UWUwftCg-j307JrBbjHB3Sb"/>
      </div>
      <div className="px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative z-10 order-2 lg:order-1">
          <div className="aspect-square bg-surface-container/5 rounded-full border border-surface/10 p-12 relative flex items-center justify-center">
            <div className="w-full h-full rounded-full overflow-hidden grayscale contrast-125 border border-secondary/30 relative">
              <img alt="Map View" className="w-full h-full object-cover opacity-50" data-location="Bangalore" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmdSOtIFaTMXnowiNV-whMdY7iKh2L4z72DGnbC1hB23XsLJZbG4_a-oGPs_fqsJQlY-oZh1SwiXN6ghynF972mpfo-a7o0j0InNyCMyzIxSagSmX-PYGMOprkKWUFInIT5UZuZFkV4yXyxiJQeWgkAc-XIWeg0e2XIQVCRqMC2OdBq7uieYjXsTsdI47FgQ5NimkZbnMFG7SxfjcvhhS975Mhyqn8FbxV-8T4nMBUGK-vO4jt2mLEiuw4ybNej3ddLviCWyA2pMZ4"/>
              {/* Pins */}
              <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-secondary rounded-full animate-pulse shadow-[0_0_15px_rgba(119,90,25,1)]"></div>
              <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_rgba(119,90,25,1)]"></div>
              <div className="absolute top-1/2 right-1/2 w-3 h-3 bg-secondary rounded-full shadow-[0_0_10px_rgba(119,90,25,1)]"></div>
            </div>
            <div className="absolute -bottom-6 right-0 bg-surface text-primary p-6 shadow-2xl max-w-xs rounded-md">
              <span className="font-label text-[10px] uppercase tracking-widest text-secondary block mb-2">Live Insight</span>
              <p className="text-sm italic font-headline">"The Cubbon Park walk is currently bathed in the golden light of the setting sun."</p>
            </div>
          </div>
        </div>
        <div className="relative z-10 order-1 lg:order-2">
          <h2 className="font-label text-secondary text-sm tracking-widest uppercase mb-6">Interactive Cartography</h2>
          <h3 className="font-headline text-4xl md:text-5xl mb-8 leading-tight">Chart Your Heritage Trail.</h3>
          <p className="text-surface/70 font-body text-lg leading-relaxed mb-12">
            Our interactive map uses curated pins and storytelling trails to guide you through the city's layers. Track your progress, unlock historical anecdotes, and find hidden gems tucked away in modern alleys.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-6 group cursor-pointer">
              <span className="material-symbols-outlined text-secondary text-3xl">location_on</span>
              <div>
                <h4 className="font-headline text-xl text-surface">Curated Trails</h4>
                <p className="text-surface/50 text-xs font-label uppercase tracking-widest">3 Historic routes available</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group cursor-pointer">
              <span className="material-symbols-outlined text-secondary text-3xl">history_edu</span>
              <div>
                <h4 className="font-headline text-xl text-surface">Digital Archive</h4>
                <p className="text-surface/50 text-xs font-label uppercase tracking-widest">Access exclusive manuscripts</p>
              </div>
            </div>
          </div>
          <button className="mt-16 bg-secondary text-surface px-10 py-4 font-label text-xs uppercase tracking-[0.2em] rounded-md hover:bg-secondary/90 transition-colors">
            Open Global Map
          </button>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
