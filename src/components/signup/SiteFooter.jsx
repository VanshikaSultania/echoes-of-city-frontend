import React from 'react';

const SiteFooter = () => {
  return (
    <footer className="bg-[#210000] dark:bg-[#1a0000] w-full pt-16 pb-8 border-t border-[#d4af37]/20">
      <div className="flex flex-col items-center justify-center space-y-8 px-12 text-center">
        <div className="font-['Newsreader'] text-3xl text-[#d4af37] mb-4 italic">
          Echoes of the City
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <a className="font-['Work_Sans'] uppercase tracking-[0.1rem] text-xs text-[#ebe8e2]/60 hover:text-[#d4af37] transition-all duration-500 hover:underline decoration-[#d4af37]/40 underline-offset-4" href="#">Archives</a>
          <a className="font-['Work_Sans'] uppercase tracking-[0.1rem] text-xs text-[#ebe8e2]/60 hover:text-[#d4af37] transition-all duration-500 hover:underline decoration-[#d4af37]/40 underline-offset-4" href="#">Privacy</a>
          <a className="font-['Work_Sans'] uppercase tracking-[0.1rem] text-xs text-[#ebe8e2]/60 hover:text-[#d4af37] transition-all duration-500 hover:underline decoration-[#d4af37]/40 underline-offset-4" href="#">Terms</a>
          <a className="font-['Work_Sans'] uppercase tracking-[0.1rem] text-xs text-[#ebe8e2]/60 hover:text-[#d4af37] transition-all duration-500 hover:underline decoration-[#d4af37]/40 underline-offset-4" href="#">Contact</a>
          <a className="font-['Work_Sans'] uppercase tracking-[0.1rem] text-xs text-[#ebe8e2]/60 hover:text-[#d4af37] transition-all duration-500 hover:underline decoration-[#d4af37]/40 underline-offset-4" href="#">Accessibility</a>
        </div>
        <div className="max-w-md">
          <p className="font-['Work_Sans'] uppercase tracking-[0.1rem] text-[10px] text-[#ebe8e2]/40 leading-relaxed">
            © 1892-2024 Echoes of the City. All rights reserved. Part of the Royal Chronicle Collection.
          </p>
        </div>
        <div className="flex gap-6 pt-4">
          <a className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors" href="#">
            <span className="material-symbols-outlined text-xl" data-icon="book_2">book_2</span>
          </a>
          <a className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors" href="#">
            <span className="material-symbols-outlined text-xl" data-icon="share">share</span>
          </a>
          <a className="text-[#d4af37]/60 hover:text-[#d4af37] transition-colors" href="#">
            <span className="material-symbols-outlined text-xl" data-icon="mail">mail</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
