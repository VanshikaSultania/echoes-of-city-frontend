import React from 'react';
import HeroSection from '../components/auth/HeroSection';
import LoginForm from '../components/auth/LoginForm'; // The form component is still named LoginForm for now

const SigninPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-stone-50">
      {/* Left side: Hero/Image Section */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen">
        <HeroSection />
      </div>
      
      {/* Right side: Login Form Section */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex items-center bg-[#fbf9f6]">
        <LoginForm />
      </div>
    </div>
  );
};

export default SigninPage;
