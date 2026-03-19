import React from 'react';
import HeritageCard from './HeritageCard';

const HeritageCollection = () => {
  const collections = [
    {
      id: 1,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuA2sJTlqAyEX0qTd9Q6EwRoXg1O4Y-9BcDkaE9rZILpTCFrQEtiPd39b6wAHjpTYXLCYT2q9z70tBWu6lwZwOtGJBH-rqVLA4XgCsAyMKwCQ-wdVmnHveAKtq6DNtG6bu9gQEkUMuGv2URoSGOQegNlsuKvcX4MdeG7ua_F8xNqrSk00-JYyQJXDIYtdmR0ZxECwk-cFWMDkkSZS2mHMgPWcvie97tRj5X-MIM9sNXAKvn8moIAww5yFqiiJenLtCfz2sezJ9vN55D1",
      imageAlt: "Bangalore Palace Exterior",
      title: "The Tudor Echo: Bangalore Palace",
      description: "The Rev. J. Garrett, the first Principal of the Central High School, now known as Central College, started constructing this palace in 1862...",
      isOffset: false
    },
    {
      id: 2,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBh3z_iYvmQcY90zsAgRaRAbbnGgqSgsLkhjbH3arIU9aXJ7QVWvtQMWZf0pdPJckPSbvptOrL2U84IDHlSxwdUyMK_85FkGojBB3Npw8K8cm3PAN_dPRhkY-6EAWw8EyfY4gkMruVtAY7kqcfR1SG0KyNi5Mf-Q_7mQFQOwyMmnjn7lCFtqp3Lpmdlg2E6oIZ4kS2aELtzfoAyE__dsAp2h20Z4NA4bXVZrCGkKijPSZL6JmKxzHFLBCRCQCbhwmjXbdKL1byb0qJd",
      imageAlt: "Tipu Sultan Summer Palace",
      title: "Abode of Happiness",
      description: "A masterpiece of Indo-Islamic architecture, this teakwood structure served as the summer residence of the Mysore ruler...",
      isOffset: true
    },
    {
      id: 3,
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuC6fYbKwyMveb69XhO2JVs-IxiiyDZlN5d5Cmnf0uQrZoyHyxoiLalsOrDRZUWSDD7LpX2xwk7Soo-Y_k3jsKVmBwzoOV8cHnrXGktjQTKSp83PXc2lLL3xoEh72ZwJv__aNvfQI420qp3_oQ0bVt-nmdlvxsRkHN5ZUM6QsV7JeA0iQvcqQCya5nf2YfqDuGqPRjXU7mMe_65pMSEWKma4JBmyCERzNqTOj4JBl-b-R5Y7BpE2exQQSO0JYrkYafNWhTP1VP0uOTnG",
      imageAlt: "Heritage Stone Building",
      title: "The Colonial Stone: Mayo Hall",
      description: "Constructed in memory of Lord Mayo, this building stands as an example of neoclassical architecture in the heart of the city...",
      isOffset: false
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {collections.map(site => (
        <HeritageCard 
          key={site.id}
          imageSrc={site.imageSrc}
          imageAlt={site.imageAlt}
          title={site.title}
          description={site.description}
          isOffset={site.isOffset}
        />
      ))}
    </div>
  );
};

export default HeritageCollection;
