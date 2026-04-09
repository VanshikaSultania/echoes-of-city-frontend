import React, { useState, useEffect } from 'react';
import SiteCard from './SiteCard';
import { mockSites } from '../../data/mockSites';
import { calculateDistance } from '../../utils/distance';

const SiteGrid = () => {
  const [sites, setSites] = useState([...mockSites]);
  const [filter, setFilter] = useState('');

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

  const filteredSites = sites.filter(site => {
    if (!filter) return true;
    
    if (filter.startsWith('distance-')) {
      const maxDistance = parseInt(filter.split('-')[1], 10);
      return site.distance !== undefined && site.distance <= maxDistance;
    }
    
    if (filter.startsWith('place-')) {
      const placeType = filter.split('-')[1];
      return site.typeTag === placeType;
    }
    
    return true;
  });

  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-16">
      <div className="flex justify-end mb-8">
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="border border-stone-300 rounded px-4 py-2 bg-white text-stone-700 focus:outline-none focus:border-stone-500 shadow-sm"
        >
          <option value="">Filter By...</option>
          <optgroup label="Distance">
            <option value="distance-5">5 km</option>
            <option value="distance-10">10 km</option>
            <option value="distance-15">15 km</option>
          </optgroup>
          <optgroup label="Places">
            <option value="place-TEMPLE">Temple</option>
            <option value="place-PALACE">Palace</option>
            <option value="place-PARK">Park</option>
            <option value="place-FORT">Fort</option>
            <option value="place-LAKE">Lake</option>
            <option value="place-CIVIC">Civic</option>
          </optgroup>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
        {filteredSites.map(site => (
          <SiteCard key={site.id} {...site} />
        ))}
      </div>
      
      {filteredSites.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          No sites found matching the selected filter.
        </div>
      )}
    </div>
  );
};

export default SiteGrid;
