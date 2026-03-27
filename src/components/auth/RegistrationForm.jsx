import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationForm = () => {
  return (
    <div className="lg:col-span-3">
      <div className="relative bg-surface-container-lowest border-[0.5px] border-outline-variant/30 lg:rounded-r-lg lg:rounded-l-none rounded-b-lg p-8 md:p-12 shadow-[0_24px_48px_-12px_rgba(28,28,24,0.08)] h-full">
        {/* Card Header */}
        <div className="mb-10">
          <h1 className="font-headline text-4xl md:text-5xl text-primary leading-tight mb-4">Create Your Account</h1>
          <p className="text-on-surface-variant font-body text-lg max-w-sm">Join our community of urban historians and cultural explorers.</p>
        </div>

        {/* Registration Form */}
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block font-label text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-medium" htmlFor="full_name">Full Name</label>
              <input className="w-full bg-transparent border-0 border-b border-outline-variant py-2.5 focus:ring-0 focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface/30 px-1 outline-none" id="full_name" name="full_name" placeholder="Sir Ronald Ross" type="text"/>
            </div>
            <div className="space-y-1">
              <label className="block font-label text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-medium" htmlFor="phone">Phone (Optional)</label>
              <input className="w-full bg-transparent border-0 border-b border-outline-variant py-2.5 focus:ring-0 focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface/30 px-1 outline-none" id="phone" name="phone" placeholder="+91 000 000 0000" type="tel"/>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-label text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-medium" htmlFor="email">Email Address</label>
            <input className="w-full bg-transparent border-0 border-b border-outline-variant py-2.5 focus:ring-0 focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface/30 px-1 outline-none" id="email" name="email" placeholder="explorer@heritage.in" type="email"/>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block font-label text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-medium" htmlFor="password">Password</label>
              <input className="w-full bg-transparent border-0 border-b border-outline-variant py-2.5 focus:ring-0 focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface/30 px-1 outline-none" id="password" name="password" placeholder="••••••••" type="password"/>
            </div>
            <div className="space-y-1">
              <label className="block font-label text-[0.7rem] uppercase tracking-widest text-on-surface-variant font-medium" htmlFor="confirm_password">Confirm Password</label>
              <input className="w-full bg-transparent border-0 border-b border-outline-variant py-2.5 focus:ring-0 focus:border-secondary transition-colors text-on-surface placeholder:text-on-surface/30 px-1 outline-none" id="confirm_password" name="confirm_password" placeholder="••••••••" type="password"/>
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <button className="w-full bg-primary-container text-on-primary font-label text-sm uppercase tracking-widest py-4 rounded-lg shadow-lg shadow-primary-container/20 hover:bg-primary transition-all active:scale-[0.98]" type="submit">
              Begin Exploration
            </button>
          </div>
        </form>

        <div className="mt-10 text-center">
          <p className="font-body text-sm text-on-surface-variant">
            Already have an account? 
            <Link to="/signin" className="text-primary-container font-bold hover:text-secondary transition-colors underline underline-offset-8 decoration-secondary/30 ml-1">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
