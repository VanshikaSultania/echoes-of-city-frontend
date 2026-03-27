import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative h-full w-full flex flex-col justify-end p-8 lg:p-16 bg-stone-900 overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-60 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1625026993132-020fd4dcfffc?q=80&w=2000&auto=format&fit=crop")',
        }}
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#2a1005] via-stone-900/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-xl left-0 lg:left-8">
        <h3 className="text-stone-300 text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          The Royal Chronicle
        </h3>
        
        <h1 className="text-white text-5xl lg:text-7xl font-serif italic leading-tight mb-8 drop-shadow-lg">
          The whispers of<br />
          Bangalore's past<br />
          are calling.
        </h1>
        
        <div className="border-l-2 border-stone-500/50 pl-6 space-y-6 text-stone-200/90 max-w-md font-sans leading-relaxed">
          <p>
            Heritage Explorer Bangalore is a storytelling platform
            dedicated to preserving and exploring the city's rich history.
          </p>
          <p className="text-sm">
            Join an exclusive collective dedicated to uncovering the royal
            narratives and architectural marvels of our storied city, from the
            Kempe Gowda era to the colonial whispers of the Cantonment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
