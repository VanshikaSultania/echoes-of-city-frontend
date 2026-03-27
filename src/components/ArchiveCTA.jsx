import React from 'react';
import { Link } from 'react-router-dom';

const ArchiveCTA = () => {
  return (
    <div className="mt-32 bg-surface-container-low rounded-xl p-12 md:p-24 text-center border-t border-outline-variant/15">
      <h3 className="font-headline text-4xl md:text-5xl text-primary font-bold mb-8 italic">Become a Guardian of History</h3>
      <p className="max-w-2xl mx-auto text-on-surface-variant text-lg mb-12">Register today to gain full access to high-resolution blueprints, oral histories, and exclusive virtual tours of the city's private estates.</p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        <Link to="/signup" className="bg-primary-container text-on-primary-container px-10 py-4 rounded-lg font-medium text-lg scale-100 hover:scale-105 active:scale-95 transition-transform text-center cursor-pointer">Sign Up for Access</Link>
        <Link to="/signin" className="border border-outline text-primary px-10 py-4 rounded-lg font-medium text-lg hover:bg-surface-container-high transition-colors scale-100 hover:scale-105 active:scale-95 transition-transform text-center cursor-pointer">Sign In</Link>
      </div>
    </div>
  );
};

export default ArchiveCTA;
