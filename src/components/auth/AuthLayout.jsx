import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-surface font-body text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <div className="fixed inset-0 noise-grain z-50"></div>
      
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-secondary rounded-full blur-[100px]"></div>
      </div>

      <main className="relative z-10 w-full flex flex-col items-center">
        {children}
      </main>

      {/* Aesthetic Section Divider (Subtle Bottom Shadow) */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-20"></div>
    </div>
  );
};

export default AuthLayout;
