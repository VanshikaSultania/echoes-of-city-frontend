import React from 'react';
import SiteCard from './SiteCard';

const mockSites = [
  {
    id: 1,
    typeTag: "PALACE",
    title: "Bangalore Palace",
    description: "Modeled after Windsor Castle, this Tudor-style marvel features fortified towers, battlements, and turrets that whisper stories of the Wodeyar dynasty.",
    imageSrc: "https://images.pexels.com/photos/23973679/pexels-photo-23973679.jpeg",
    imageAlt: "Bangalore Palace",
    url: "/site-details"
  },
  {
    id: 2,
    typeTag: "PALACE",
    title: "Tipu Sultan's Palace",
    description: "A summer retreat known as 'Rash-e-Jannat' (Envy of Heaven). Built entirely of teakwood with magnificent pillars and floral motifs.",
    imageSrc: "https://media.istockphoto.com/id/178845414/photo/tipu-sultans-summer-palace.jpg?s=612x612&w=0&k=20&c=QCVIS7GrgLfh8MaBmdjrQFNeQ71BgP-K322BJVkGTmo=",
    imageAlt: "Tipu Sultan Palace"
  },
  {
    id: 3,
    typeTag: "CIVIC",
    title: "Vidhana Soudha",
    description: "The seat of the state legislature, this Neo-Dravidian masterpiece stands as a colossal testament to independent India's architectural ambition.",
    imageSrc: "https://t4.ftcdn.net/jpg/07/52/84/27/240_F_752842748_TMfPQUmG4kffW5uaZTdjj9yVLYDeRSm2.jpg",
    imageAlt: "Vidhana Soudha"
  },
  {
    id: 4,
    typeTag: "TEMPLE",
    title: "Bull Temple",
    description: "Home to a massive 16th-century monolith of Nandi, the celestial bull. A sacred site that anchors the ancient neighborhood of Basavanagudi.",
    imageSrc: "https://temple.yatradham.org/public/Product/temple/temple_hzOxj2OQ_202408171754050.jpeg",
    imageAlt: "Bull Temple Nandi"
  },
  {
    id: 5,
    typeTag: "PARK",
    title: "Cubbon Park",
    description: "The 'Lung of the City' featuring 300 acres of botanical diversity, statues of luminaries, and red-stone colonial libraries.",
    imageSrc: "https://karnatakatourism.org/_next/image/?url=https%3A%2F%2Fweb-cms.karnatakatourism.org%2Fwp-content%2Fuploads%2F2025%2F06%2FIMG_3526-1-scaled-e1750679261602.jpg&w=3840&q=75",
    imageAlt: "Cubbon Park Library"
  },
  {
    id: 6,
    typeTag: "PARK",
    title: "Lalbagh Glass House",
    description: "Commissioned by Hyder Ali in 1760, this botanical garden features a spectacular iron-framed glass conservatory inspired by London's Crystal Palace.",
    imageSrc: "https://media.gettyimages.com/id/516572685/photo/glasshouse-at-lalbagh-gardens-bangalore-india.jpg?s=612x612&w=gi&k=20&c=0x2ImAR3de8zrMZq4Hs4oYYJqfeyMqge2Prk1LZIjp8=",
    imageAlt: "Lalbagh Glass House"
  },
  {
    id: 7,
    typeTag: "FORT",
    title: "Begur Fort",
    description: "An ancient mud fort dating back to the 8th century, home to the Panchalingeswara temple and rare stone inscriptions that chart the city's earliest history.",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHkkjBQXcXJUuK4r92v0uYkPp2_5HGes71iA&s",
    imageAlt: "Begur Fort Ruins"
  },
  {
    id: 8,
    typeTag: "LAKE",
    title: "Ulsoor Lake",
    description: "One of the oldest lakes in the city, commissioned by Kempe Gowda II. A sprawling expanse of water dotted with islands and rimmed by historic vistas.",
    imageSrc: "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcTFkT2n5JNpJFxkakGFgCYm1ryki7gvA21Fgpcukzb35xM0z6u4o77aBqNDDSItHJz-gLr0LGWdtrVVf1XScMdfXI8&s=19",
    imageAlt: "Ulsoor Lake Water"
  },
  {
    id: 9,
    typeTag: "FORT",
    title: "Kempegowda Fort",
    description: "The original 1537 mud fortress rebuilt in stone by Hyder Ali. Its heavy granite gates stand as silent guardians of the city's foundation stories.",
    imageSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa8CLgYGoKyHqFl5p-j1n7h_GX5kBTsum8iA&s",
    imageAlt: "Kempegowda Fort Wall"
  },
  {
    id: 10,
    typeTag: "LAKE",
    title: "Agara Lake",
    description: "A natural heritage site offering a serene escape. Its waters have witnessed the city's transformation from a sleepy town to a tech metropolis.",
    imageSrc: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Agara_Lake_%2825279546271%29.jpg",
    imageAlt: "Agara Lake"
  },
  {
    id: 11,
    typeTag: "TEMPLE",
    title: "Someshwara Temple",
    description: "An architectural gem of the Chola era in Halasuru. Its intricate carvings and soaring gopuram are masterpieces of medieval craftsmanship.",
    imageSrc: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/2e/24/45/the-temple.jpg?w=900&h=-1&s=1",
    imageAlt: "Someshwara Temple"
  }
];

const SiteGrid = () => {
  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
        {mockSites.map(site => (
          <SiteCard key={site.id} {...site} />
        ))}
      </div>
    </div>
  );
};

export default SiteGrid;
