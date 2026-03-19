import React from 'react';

const FooterMeta = () => {
  return (
    <div className="mt-8 flex justify-center items-center gap-6 relative z-10 w-full">
      <div className="flex items-center gap-2 opacity-40">
        <span className="material-symbols-outlined text-sm">verified_user</span>
        <span className="font-label text-[0.65rem] uppercase tracking-widest">Secure Registry</span>
      </div>
      <div className="flex items-center gap-2 opacity-40">
        <span className="material-symbols-outlined text-sm">history_edu</span>
        <span className="font-label text-[0.65rem] uppercase tracking-widest">Heritage Grade</span>
      </div>
    </div>
  );
};

export default FooterMeta;
