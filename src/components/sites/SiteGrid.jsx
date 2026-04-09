import React, { useState, useEffect } from 'react';
import SiteCard from './SiteCard';
import { mockSites } from '../../data/mockSites';
import { calculateDistance } from '../../utils/distance';

const SiteGrid = () => {
  const [sites, setSites] = useState([...mockSites]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          
          const sitesWithDist = mockSites.map(site => {
            if (site.lat && site.lng) {
              const dist = parseFloat(calculateDistance(loc.lat, loc.lng, site.lat, site.lng));
              return { ...site, distance: dist };
            }
            return site;
          });
          
          setSites(sitesWithDist);
        },
        (err) => {
          console.warn("Geolocation Error:", err);
        }
      );
    }
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
        {sites.map(site => (
          <SiteCard key={site.id} {...site} />
        ))}
      </div>
    </div>
  );
};

export default SiteGrid;
