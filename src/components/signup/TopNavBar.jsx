import React from 'react';

const TopNavBar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#fcf9f3]/90 dark:bg-stone-950/90 backdrop-blur-md shadow-sm dark:shadow-none bg-gradient-to-b from-[#4A0404]/5 to-transparent">
      <div className="flex justify-between items-center px-8 py-4 max-w-full mx-auto">
        <div className="font-['Newsreader'] font-bold text-2xl italic text-[#4A0404] dark:text-[#ebe8e2]">
          Echoes of the City
        </div>
        <div className="hidden md:flex items-center space-x-12">
          <a className="font-['Newsreader'] tracking-tight text-lg text-[#4A0404] dark:text-[#ebe8e2] border-b-2 border-[#d4af37] pb-1" href="#">Home</a>
          <a className="font-['Newsreader'] tracking-tight text-lg text-stone-600 dark:text-stone-400 hover:text-[#4A0404] dark:hover:text-[#fcf9f3] transition-colors hover:opacity-80" href="#">Sites</a>
          <a className="font-['Newsreader'] tracking-tight text-lg text-stone-600 dark:text-stone-400 hover:text-[#4A0404] dark:hover:text-[#fcf9f3] transition-colors hover:opacity-80" href="#">Map</a>
          <a className="font-['Newsreader'] tracking-tight text-lg text-stone-600 dark:text-stone-400 hover:text-[#4A0404] dark:hover:text-[#fcf9f3] transition-colors hover:opacity-80" href="#">About</a>
        </div>
        <div className="flex items-center gap-6">
          <button className="material-symbols-outlined text-stone-600 hover:opacity-80 transition-opacity" data-icon="search">search</button>
          <button className="bg-primary-container text-on-primary text-sm font-label uppercase tracking-widest px-6 py-2.5 rounded-md scale-95 active:scale-100 transition-transform hover:opacity-90">
            Book Tour
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
