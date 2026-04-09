import React from 'react';
import { Link } from 'react-router-dom';

const HeritageCard = ({ imageSrc, imageAlt, title, description, isOffset }) => {
  return (
    <div className={`group relative aspect-[4/5] bg-surface-container-highest rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 ${isOffset ? 'lg:translate-y-12' : ''}`}>
      <div className="absolute inset-0 p-1">
        <img alt={imageAlt} className="w-full h-full object-cover rounded-[0.125rem] group-hover:scale-110 transition-transform duration-1000" src={imageSrc} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
      <div className="absolute inset-x-0 bottom-0 p-8 text-white z-10">
        <div className="space-y-4">
          <h3 className="font-headline text-3xl italic">{title}</h3>
          <p className="text-white/80 line-clamp-3 font-light mb-6 blur-sm group-hover:blur-none transition-all duration-500">{description}</p>
          <Link to="/signup" className="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-medium text-sm inline-flex items-center gap-2 hover:bg-secondary/90 transition-colors opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 duration-500">
            Signup
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeritageCard;
