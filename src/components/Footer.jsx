import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-[#ebe8e2] dark:bg-[#210000] border-t border-[#1c1c18]/10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-12 py-20 w-full max-w-screen-2xl mx-auto">
        <div className="lg:col-span-2">
          <div className="text-3xl font-bold font-headline text-[#4A0404] dark:text-[#fcf9f3] mb-8">Echoes of the City</div>
          <p className="text-[#4A0404]/60 dark:text-[#fcf9f3]/60 max-w-sm mb-8 leading-relaxed italic text-lg">
            A non-profit digital initiative dedicated to the preservation of urban heritage and the storytelling of the city's built environment.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">share</span>
            </div>
            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
              <span className="material-symbols-outlined text-sm">mail</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] font-bold text-primary mb-8">The Archive</h4>
          <ul className="space-y-4 font-sans text-xs uppercase tracking-widest text-[#4A0404]/60 dark:text-[#fcf9f3]/60">
            <li className="hover:underline decoration-[#4A0404]/30 cursor-pointer transition-opacity opacity-80 hover:opacity-100">Archive Access</li>
            <li className="hover:underline decoration-[#4A0404]/30 cursor-pointer transition-opacity opacity-80 hover:opacity-100">Heritage Maps</li>
            <li className="hover:underline decoration-[#4A0404]/30 cursor-pointer transition-opacity opacity-80 hover:opacity-100">Oral Histories</li>
            <li className="hover:underline decoration-[#4A0404]/30 cursor-pointer transition-opacity opacity-80 hover:opacity-100">Contribution</li>
          </ul>
        </div>
        <div>
          <h4 className="font-label text-xs uppercase tracking-[0.2em] font-bold text-primary mb-8">Legal &amp; Contact</h4>
          <ul className="space-y-4 font-sans text-xs uppercase tracking-widest text-[#4A0404]/60 dark:text-[#fcf9f3]/60">
            <li className="hover:underline decoration-[#4A0404]/30 cursor-pointer transition-opacity opacity-80 hover:opacity-100">Privacy Policy</li>
            <li className="hover:underline decoration-[#4A0404]/30 cursor-pointer transition-opacity opacity-80 hover:opacity-100">Terms of Service</li>
            <li className="hover:underline decoration-[#4A0404]/30 cursor-pointer transition-opacity opacity-80 hover:opacity-100">Cookie Archive</li>
            <li className="hover:underline decoration-[#4A0404]/30 cursor-pointer transition-opacity opacity-80 hover:opacity-100">Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="px-12 py-8 border-t border-primary/5 text-center md:text-left">
        <p className="font-sans text-[10px] uppercase tracking-widest text-[#4A0404]/40 dark:text-[#fcf9f3]/40">
          © 2024 Echoes of the City. A Living Archive of Urban Heritage. All historical materials are subject to the Heritage Protection Act.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
