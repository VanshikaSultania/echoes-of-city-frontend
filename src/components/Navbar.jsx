import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ showLinks = false }) => {
  const location = useLocation();
  const path = location.pathname;

  const activeClass = "text-[#4A0404] dark:text-[#f6f3ed] border-b-2 border-[#4A0404] pb-1 transition-colors duration-300";
  const inactiveClass = "text-[#4A0404]/70 dark:text-[#f6f3ed]/70 hover:text-[#4A0404] dark:hover:text-white transition-colors duration-300";

  return (
    <nav className="w-full top-0 z-50 bg-[#f6f3ed] dark:bg-[#210000] border-none shadow-[0_24px_32px_rgba(28,28,24,0.06)] sticky">
      <div className="flex justify-between items-center px-8 py-6 max-w-screen-2xl mx-auto">
        <div className="text-2xl font-bold tracking-tighter text-[#4A0404] dark:text-[#f6f3ed] font-headline">Echoes of the City</div>
        {showLinks && (
          <div className="hidden md:flex items-center gap-10 font-serif italic text-lg tracking-tight">
            <Link className={path === '/sites' ? activeClass : inactiveClass} to="/sites">Sites</Link>
            <Link className={path === '/map' ? activeClass : inactiveClass} to="/map">Map</Link>
            <a className={inactiveClass} href="#">About</a>
          </div>
        )}
        <div className="flex items-center gap-6">
          <Link to="/signin" className="font-label text-xs uppercase tracking-widest text-[#4A0404]/70 hover:text-[#4A0404] transition-colors">Sign In</Link>
          <Link to="/signup" className="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg text-sm font-medium scale-95 active:scale-90 transition-transform">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
