import React from 'react';
import TopNavBar from '../components/signup/TopNavBar';
import CinematicHero from '../components/signup/CinematicHero';
import LivingArchive from '../components/signup/LivingArchive';
import HeritageSitesGrid from '../components/signup/HeritageSitesGrid';
import InteractiveMap from '../components/signup/InteractiveMap';
import Mission from '../components/signup/Mission';
import SiteFooter from '../components/signup/SiteFooter';

const SignUp = () => {
  return (
    <div className="bg-surface font-body text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <div className="fixed inset-0 grainy-overlay z-[100]"></div>
      <TopNavBar />
      <main>
        <CinematicHero />
        <LivingArchive />
        <HeritageSitesGrid />
        <InteractiveMap />
        <Mission />
      </main>
      <SiteFooter />
    </div>
  );
};

export default SignUp;
