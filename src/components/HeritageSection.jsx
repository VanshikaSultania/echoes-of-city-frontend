import React from 'react';
import HeritageCollection from './HeritageCollection';
import ArchiveCTA from './ArchiveCTA';

const HeritageSection = () => {
  return (
    <section className="py-32 px-8 bg-surface">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-headline text-4xl md:text-6xl text-primary font-bold mb-6">The Heritage Collection</h2>
            <p className="text-on-surface-variant text-lg">Curated artifacts and architectural blueprints from the Mysore Kingdom era. Each story is a fragment of the city's soul.</p>
          </div>
          <div className="flex items-center gap-4 bg-surface-container-low p-2 rounded-xl">
            <span className="px-6 py-2 bg-white rounded-lg shadow-sm font-label text-xs uppercase font-bold text-primary tracking-widest cursor-pointer">All Sites</span>
            <span className="px-6 py-2 font-label text-xs uppercase text-on-surface-variant tracking-widest cursor-pointer hover:text-primary transition-colors">Palaces</span>
            <span className="px-6 py-2 font-label text-xs uppercase text-on-surface-variant tracking-widest cursor-pointer hover:text-primary transition-colors">Gardens</span>
          </div>
        </div>
        
        <HeritageCollection />
        <ArchiveCTA />
      </div>
    </section>
  );
};

export default HeritageSection;
