import React from 'react';

const Mission = () => {
  return (
    <section className="py-24 bg-surface-container-high">
      <div className="px-8 max-w-4xl mx-auto text-center">
        <div className="mb-12 inline-block">
          <div className="w-12 h-1 bg-secondary mx-auto"></div>
        </div>
        <h2 className="font-headline text-3xl md:text-4xl text-primary mb-8 leading-relaxed">
          "We believe that a city's soul lies not in its height, but in the echoes of the feet that trod its streets centuries ago."
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-16">
          <div className="max-w-[200px]">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3">Curated Insights</h4>
            <p className="text-xs text-on-surface-variant font-body">Expert-led historical research on every landmark.</p>
          </div>
          <div className="w-px h-12 bg-outline-variant hidden md:block"></div>
          <div className="max-w-[200px]">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3">Rich Storytelling</h4>
            <p className="text-xs text-on-surface-variant font-body">Multimedia experiences that bring heritage to life.</p>
          </div>
          <div className="w-px h-12 bg-outline-variant hidden md:block"></div>
          <div className="max-w-[200px]">
            <h4 className="font-label text-[10px] uppercase tracking-widest text-secondary mb-3">Community Led</h4>
            <p className="text-xs text-on-surface-variant font-body">Preserving oral histories from city elders.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
