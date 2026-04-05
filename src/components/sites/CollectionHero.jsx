import React from 'react';

const CollectionHero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-[#a65628] py-24 md:py-32 flex flex-col items-center justify-center text-center">
      {/* Background illustration/gradient overlay */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-multiply bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2000&auto=format&fit=crop")' }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#fbf9f6] via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-2xl px-6">
        <h4 className="text-white/80 font-semibold tracking-widest text-xs uppercase mb-4">Archives of Bangalore</h4>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">The Heritage Collection</h1>
        <p className="text-white/90 text-lg font-light leading-relaxed">
          A curated pilgrimage through the architectural soul of the Garden City.
        </p>
      </div>
    </div>
  );
};

export default CollectionHero;
