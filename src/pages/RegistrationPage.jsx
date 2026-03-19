import React from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import BrandIdentity from '../components/auth/BrandIdentity';
import BenefitsPanel from '../components/auth/BenefitsPanel';
import RegistrationForm from '../components/auth/RegistrationForm';
import FooterMeta from '../components/auth/FooterMeta';

const RegistrationPage = () => {
  return (
    <AuthLayout>
      <BrandIdentity />
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-0 items-stretch">
        <BenefitsPanel />
        <RegistrationForm />
      </div>
      <FooterMeta />
    </AuthLayout>
  );
};

export default RegistrationPage;
