import React from 'react';

const MapSection = () => {
  return (
    <section className="py-24 bg-surface-container-high overflow-hidden" id="map">
      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5">
          <h2 className="font-headline text-4xl md:text-6xl text-primary font-bold mb-8">The Navigator's Map</h2>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-8">Trace the historical ley lines of the city. Our interactive cartography reveals the architectural evolution from the 16th century to the present day.</p>
          <ul className="space-y-6">
            <li className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary">explore</span>
              <span className="font-medium">124 Documented Heritage Sites</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary">history_edu</span>
              <span className="font-medium">15 Historical Map Layers</span>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-7 relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
          <img alt="Vintage Style Map of Bangalore" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwNcJtAVw0APydYmoTug3tGTPWMoNwV8tTBtw43RjfFs4E5m01ARA9_ZTosJ1VKSKsDk0eLiyb4QtyYHGOIkDtApDoUSCX2GAi6IBb_M_z6yfQSzn8Vbzg-F2U1vJllrCIPq6SpqP3jJbdzSwxh-5Ub-V2pTzjGeiL6hV9wackO5iM-DE6Mmn7I75Fes7gV3A4afcv7EKQyL_foGbuXdlDD3mtx9OAYU7MPhhXc7JCN_7UJCLeKCogb-9_ejYjivauhaUlPZNMT-Fh"/>
          <div className="absolute inset-0 bg-secondary/10 pointer-events-none"></div>
          <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-xl max-w-[240px]">
            <p className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-2">Current Location</p>
            <p className="font-headline text-xl text-primary font-bold">The Cubbon Park Precinct</p>
            <div className="mt-4 h-1 w-full bg-secondary-container rounded-full overflow-hidden">
              <div className="h-full bg-secondary w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
