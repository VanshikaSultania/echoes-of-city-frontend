import React from 'react';

const LivingArchive = () => {
  return (
    <section className="py-24 px-8 md:px-16 bg-surface-container-low">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-[4/5] bg-surface-container-high overflow-hidden shadow-2xl p-3">
            <img alt="Bangalore Heritage" className="w-full h-full object-cover" data-alt="Monochrome photograph of an ancient stone archway" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDToFmGq7t0rbgk_OyUoNAzslLeWGrhzUvYSjDTI35acb5zwmPbiy4he9VbdCkBiZaXmo-XPi4GjS8txRWBu0GV0CTSL70mm15KyZ-lEKcGAB8jFdqRZDvBKMJGVwprbgqBhsICD7B4zWIqHvXn5a5xwuD2zDwCie8-_BoGU2jjJ4cPkpeecJVsMA0tqdIewGxciFhjWksS05udyvCcLMG05z190WQROTYn87xJHEJRyliAEQkqhgiH1sOTZpcEe-4oPYL32mceuLv"/>
          </div>
          <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square bg-surface-container-highest p-3 shadow-xl hidden lg:block">
            <img alt="Detailed architecture" className="w-full h-full object-cover" data-alt="Close up of ornate wooden carvings on a palace door" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZqUeAvp035K6u0JiEIk1DoTkSnAUby977y55D97B2PzP5cbvpz4fqYh2lHpYCmlfSManuPu28C5q2ce4RBO_oBM6ew_ztaULqf83OigWGLNtPhgUyuhlzKg9-mEJTp_OU-cnw2mZg587vLsHF0OknJCwK__OkikveJT4fKggBedKI_AgAGwl7HjFCkeH5ne59BtgvGZYlXTYS7WZ2_KGmmo5UsQbTf7Y5BkazPoniQyRDR4avnlfp0VZ1h6sBJrkfHoBrub_qWQw2"/>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:pl-12">
          <h2 className="font-label text-secondary text-sm tracking-widest uppercase mb-6">The Living Archive</h2>
          <h3 className="font-headline text-4xl md:text-5xl text-primary leading-tight mb-8">A Journey Through the Pores of the City.</h3>
          <div className="space-y-6 text-on-surface-variant font-body leading-relaxed text-lg">
            <p>Bangalore is not just a hub of technology; it is a tapestry of dynastic rule, botanical experimentation, and architectural brilliance. "Echoes of the City" serves as your digital companion to this silent narrative.</p>
            <p>From the stone-carved stories of Tipu Sultan’s summer palace to the Victorian grandeur of the Vidhana Soudha, we curate moments where the past breathes through the present.</p>
          </div>
          <div className="mt-12 pt-8 border-t border-outline-variant/30">
            <a className="inline-flex items-center gap-4 group" href="#">
              <span className="font-label text-xs uppercase tracking-widest text-primary font-bold">Explore the Archives</span>
              <div className="h-[1px] w-12 bg-secondary group-hover:w-20 transition-all duration-500"></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivingArchive;
