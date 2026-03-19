import React from 'react';

const HeritageSitesGrid = () => {
  const sites = [
    {
      id: 1,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnkVKeQSEe1YHALgNz32I83tKpAS-AUrnNrZJXaloBN7rXdpHXGBK_uCvGnEvMYDeKW_o0neS-wwUQdvoGgmVQPL9pRZjLBo3VWV3ZWqhUhxOKMjXoPulkaaPT-C-ev3e7EJVlZRjRBaCjW3Fn6sydQ_9jiaxeZeHcnRYH4ezEdBnb6I3UWM5TajInWa7FhJI5fwvFxc-1lSEBRtKydPT-sfwuTiXUXqkp6u1EZqcD27uSXnQ_ekZhGPzEPQ2KjFCTPA-EqsxXhcOc",
      badge: "Royal Residence",
      title: "Bangalore Palace",
      description: "Tudor-style architecture meets Indian heritage in this iconic wood-carved masterpiece."
    },
    {
      id: 2,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFu2FDXPEzPOc2Frfv_pRtC-FQIWSpieo81370hwUP-95W6TUO4FnTI8l6jmJcbG4RkjEQwDkBKyJkBYRzFvMBeyXvAO9FbIppo1FSed8UpvNEXqghg6vKFjR-cGzDP3T43Qw7KfeZwRS7iha_7Tu8L34qtpKci1ah8Osg-pPEJYu9EnwZnaFvXgMTaSzYexTOIlPbbNXaSS95oIURuNcxvo3GC4ncaS24L5__fuHkvF2uEAZLo0UXjDfslLPf7JgySSrBBhehYEKA",
      badge: "Indo-Islamic",
      title: "Tipu Sultan's Palace",
      description: "A summer retreat crafted entirely from teakwood, echoing with tales of the Tiger of Mysore."
    },
    {
      id: 3,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuClU81UVJCVkQQAJn8KwFM884Zb9kS8BLLr1vavXxrP054XUJwtq2yTmgJFsKloWkAKyEF3prlBaqiJ19yQu-bftJBr9P7kcr3Yzksv-boibx55OHvNzzr_M7tcrYCU4BTH8vliohgHY5o1Xa0_6iY7rFXYAvJNdVuL5gZ559wAj-yz1I-hE3RBf_-QBbepXT2b1XdVNU-rtUhY4XLuKu1OR11WH__EXLB2Tgkxic2JzCGRorR7mReX9UPC0sPoEoHkVZ-2a2FNN4YF",
      badge: "Civic Landmark",
      title: "Vidhana Soudha",
      description: "The majestic seat of the state legislature, a symbol of Neo-Dravidian grandeur."
    }
  ];

  return (
    <section className="py-24 bg-surface">
      <div className="px-8 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="font-headline text-4xl text-primary mb-4">Pillars of the Past</h2>
            <p className="text-on-surface-variant font-body">Select a destination to begin your immersive journey into the architectural heart of the city.</p>
          </div>
          <div className="flex gap-4">
            <span className="px-4 py-1.5 rounded-full border border-primary/10 text-xs font-label uppercase tracking-widest text-primary bg-surface-container">All Sites</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-widest text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer">Palaces</span>
            <span className="px-4 py-1.5 rounded-full text-xs font-label uppercase tracking-widest text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer">Gardens</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {sites.map(site => (
            <div key={site.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-surface-container-high p-2 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                <img alt={site.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={site.imageSrc}/>
                <div className="absolute top-6 left-6">
                  <span className="bg-secondary/90 text-surface text-[10px] font-label uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-sm">{site.badge}</span>
                </div>
              </div>
              <h4 className="font-headline text-2xl text-primary mb-2">{site.title}</h4>
              <p className="text-on-surface-variant text-sm mb-6 font-light leading-relaxed">{site.description}</p>
              <button className="w-full border border-primary/10 py-3 font-label text-[10px] uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-surface transition-all duration-300">
                Explore Site
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeritageSitesGrid;
