import React from 'react';
import SiteCard from './SiteCard';
import { mockSites } from '../../data/mockSites';

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
