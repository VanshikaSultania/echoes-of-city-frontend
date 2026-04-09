import React from 'react';
import HeritageCard from './HeritageCard';

const HeritageCollection = () => {
  const collections = [
    {
      id: 1,
      imageSrc: "https://images.pexels.com/photos/23973679/pexels-photo-23973679.jpeg",
      imageAlt: "Bangalore Palace Exterior",
      title: "Bangalore Palace",
      description: "The Rev. J. Garrett, the first Principal of the Central High School, now known as Central College, started constructing this palace in 1862...",
      isOffset: false
    },
    {
      id: 2,
      imageSrc: "https://media.istockphoto.com/id/178845414/photo/tipu-sultans-summer-palace.jpg?s=612x612&w=0&k=20&c=QCVIS7GrgLfh8MaBmdjrQFNeQ71BgP-K322BJVkGTmo=",
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
