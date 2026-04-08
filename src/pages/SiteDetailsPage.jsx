import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const PLACE_ID = "ChIJN1ZKKUkWrjsRzxIVM363-LE"; // Bangalore Palace
const DESTINATION_LAT_LNG = "12.9988,77.5921"; // Bangalore Palace

// Haversine formula for straight-line distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (R * c).toFixed(1);
};

const SiteDetailsPage = () => {
  const galleryRef = useRef(null);
  const [distanceData, setDistanceData] = useState(null);
  const [placeData, setPlaceData] = useState(null);
  const [mapsError, setMapsError] = useState(null);
  const [isMapsLoading, setIsMapsLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState({ restaurant: null, hotel: null, hospital: null });
  const [isNearbyLoading, setIsNearbyLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const getDistanceText = (place) => {
    if (!place || !place.geometry || !place.geometry.location) return "Nearby";
    const dist = calculateDistance(
      12.9988, 77.5921, 
      place.geometry.location.lat, 
      place.geometry.location.lng
    );
    return `${dist} km away`;
  };

  useEffect(() => {
    let isMounted = true;
    const fetchMapsData = async () => {
      try {
        setIsMapsLoading(true);
        setMapsError(null);

        // 1. Fetch Place Details (Rating & Reviews)
        const placeUrl = `/google-maps-api/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;
        const placeRes = await axios.get(placeUrl);
        
        if (placeRes.data.status !== "OK") {
           throw new Error(placeRes.data.error_message || `Places API Error: ${placeRes.data.status}`);
        }
        
        if (isMounted) {
            setPlaceData(placeRes.data.result);
        }

        // 1.5 Fetch Nearby Places (Restaurant, Hotel, Hospital)
        setIsNearbyLoading(true);
        const types = ['restaurant', 'lodging', 'hospital'];
        const nearbyPromises = types.map(type => 
          axios.get(`/google-maps-api/maps/api/place/nearbysearch/json?location=${DESTINATION_LAT_LNG}&radius=3000&type=${type}&key=${API_KEY}`)
            .then(res => res.data.status === "OK" ? res.data.results[0] : null)
            .catch(() => null)
        );
        const [restaurant, hotel, hospital] = await Promise.all(nearbyPromises);
        if (isMounted) {
          setNearbyPlaces({ restaurant, hotel, hospital });
        }

        // 2. Fetch Distance Matrix (if geolocation available)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const originLatLng = `${position.coords.latitude},${position.coords.longitude}`;
              if (isMounted) setUserLocation(originLatLng);
              const distUrl = `/google-maps-api/maps/api/distancematrix/json?origins=${originLatLng}&destinations=${DESTINATION_LAT_LNG}&key=${API_KEY}`;
              
              try {
                const distRes = await axios.get(distUrl);
                if (distRes.data.status !== "OK") {
                    console.error("Distance API Error:", distRes.data.error_message);
                } else if (distRes.data.rows[0].elements[0].status === "OK") {
                    if (isMounted) setDistanceData(distRes.data.rows[0].elements[0]);
                }
              } catch (err) {
                 console.error("Failed to fetch distance", err);
              }
            },
            (error) => {
              console.warn("Geolocation denied or unavailable:", error.message);
            }
          );
        }

      } catch (err) {
        if (isMounted) setMapsError(err.message);
      } finally {
        if (isMounted) {
          setIsMapsLoading(false);
          setIsNearbyLoading(false);
        }
      }
    };

    fetchMapsData();

    return () => { isMounted = false; };
  }, []);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 424 : window.innerWidth * 0.8; // 400px card + 24px gap
      galleryRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="font-body text-on-surface bg-surface min-h-screen">

      {/* Navbar - Transparent over Hero */}
      <nav className="absolute top-0 w-full z-50 px-8 py-6 flex items-center justify-between text-on-tertiary-fixed-variant font-bold">
        <div className="font-headline text-2xl italic tracking-wide">The Living Archive</div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center pt-32 pb-24 px-8 md:px-16 overflow-hidden">
        {/* Background Image with Blended Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1738694054579-de87e2590048?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJhbmdhbG9yZSUyMHBhbGFjZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Bangalore Palace"
            className="w-full h-full object-cover object-center"
          />
          {/* Side gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/70 to-transparent w-full md:w-2/3"></div>
          {/* Bottom gradient to blend into main section */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-surface via-surface/90 to-transparent"></div>
          {/* Overlay grain for cinematic feel */}
          <div className="absolute inset-0 grain-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col text-on-tertiary-fixed-variant drop-shadow-sm">
          <div className="max-w-3xl">
            {/* <span className="inline-block text-xs md:text-sm tracking-[0.4em] font-bold uppercase mb-6 opacity-90 text-on-tertiary-container border-b border-on-tertiary-container/30 pb-2">
              A r c h i v e
            </span> */}
            <h1 className="font-headline text-6xl md:text-8xl lg:text-[130px] italic leading-tight md:leading-none mb-6 drop-shadow-sm font-bold text-[#434b18]">
              Bangalore <br /> Palace
            </h1>
            <p className="text-xl md:text-2xl font-light opacity-90 max-w-2xl mb-16 tracking-wide drop-shadow-sm text-[#434b18]">
              The Tudor Jewel of the Royal City.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 pt-10 border-t border-[#434b18]/20">
              <div>
                <p className="text-[10px] tracking-widest uppercase opacity-80 mb-2 font-bold text-on-tertiary-container">YEAR BUILT</p>
                <p className="font-headline italic text-3xl font-medium text-[#434b18]">1887</p>
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase opacity-80 mb-2 font-bold text-on-tertiary-container">STYLE</p>
                <p className="font-headline italic text-3xl font-medium text-[#434b18]">Tudor Revival</p>
              </div>
              <div className="col-span-2 md:col-span-1 border-t md:border-transparent border-[#434b18]/20 pt-6 md:pt-0">
                <p className="text-[10px] tracking-widest uppercase opacity-80 mb-2 font-bold text-on-tertiary-container">STATUS</p>
                <p className="font-headline italic text-3xl font-medium text-[#434b18]">Open to Public</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Wodeyar Dynasty */}
      <section className="py-24 md:py-40 px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center bg-surface relative">
        <div className="absolute inset-0 noise-grain"></div>
        <div className="relative h-[500px] md:h-[600px] w-full mt-10 md:mt-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/7b/HH_Sri_Chamarajendra_Wadiyar_X.jpg"
            alt="Wadiyar King Portrait"
            className="absolute top-0 left-0 w-3/4 h-[85%] object-cover shadow-2xl z-10 p-2 bg-surface"
          />
          <img
            src="https://www.electronic-city.in/images/places/palace-200.jpg"
            alt="Palace Door Detail"
            className="absolute bottom-0 right-0 w-3/5 h-2/3 object-cover shadow-xl z-20 p-2 bg-surface"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h2 className="font-headline text-4xl md:text-5xl italic leading-tight text-on-surface mb-8">
            The Wodeyar Dynasty & <br />The Windsor Inspiration
          </h2>
          <p className="text-on-surface-variant font-light leading-relaxed mb-6">
            Purchased in 1873 by King Chamarajendra Wadiyar X from the Rev. J. Garrett, the grounds of what is now Bangalore Palace became the canvas for a royal dream. Influenced by the architectural grandeur of England's Windsor Castle, the construction began in 1874.
          </p>
          <p className="text-on-surface-variant font-light leading-relaxed mb-10">
            The palace is renowned for its fortified towers, battlements, and turrets. The interiors are a masterclass in elegant craftsmanship, featuring floral motifs, cornices, and wood carvings. The ballroom, where the Maharaja hosted legendary banquets, still resonates with the whispers of Bangalore's aristocratic past. Every stone of this palace tells a story of the Wodeyars' patronage of the arts and their vision for a modernized yet traditionally rooted Mysore State.
          </p>
          {/* <a href="#" className="inline-flex items-center text-xs tracking-widest font-medium uppercase text-primary border-b border-primary pb-1 w-max hover:opacity-70 transition-opacity">
            Explore the lineage <span className="material-symbols-outlined ml-2 text-sm">arrow_right_alt</span>
          </a> */}
        </div>
      </section>

      {/* Section: Watch and Discover */}
      <section className="bg-surface-container-low py-24 md:py-32 px-8 overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="font-headline text-4xl md:text-5xl italic text-on-surface mb-4 text-center">Watch and Discover</h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant mb-12 text-center">A CINEMATIC GLIMPSE INTO THE PALACE</p>

          <div className="w-full aspect-video bg-surface shadow-2xl p-2 pb-6 relative rounded">
            <div className="w-full h-full bg-black rounded overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/vDg7xO7Odvg?si=ZqFfyFWKDUxPZRdA"
                title="Bangalore Palace Tour"
                frameborder="0"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Visual Archive (Images Grid) */}
      <section className="py-24 md:py-32 px-8 md:px-16 max-w-7xl mx-auto relative overflow-hidden">
        <div className="flex flex-col mb-12">
          <h2 className="font-headline text-4xl md:text-5xl italic text-on-surface mb-4">The Visual Archive</h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">A CURATED COLLECTION OF HERITAGE MOMENTS</p>
        </div>

        {/* Carousel Wrapper with Side Arrows */}
        <div className="relative group -mx-4 md:mx-0 px-4 md:px-0">

          {/* Left Arrow */}
          <button
            onClick={() => scrollGallery('left')}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-surface border border-outline hover:bg-surface-variant transition-colors rounded-full shadow-lg opacity-0 md:opacity-100 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-[20px] -translate-x-0.5">arrow_back</span>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollGallery('right')}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-surface border border-outline hover:bg-surface-variant transition-colors rounded-full shadow-lg opacity-0 md:opacity-100 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-[20px] translate-x-0.5">arrow_forward</span>
          </button>

          <div
            ref={galleryRef}
            className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Hide scrollbar for webkit (Chrome, Safari) using inline styles or Tailwind utilities if configured, fallback to standard CSS above */}
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <div className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 bg-surface shadow-md snap-center shrink-0">
              <img src="https://images.unsplash.com/photo-1738694054579-de87e2590048?w=800&auto=format&fit=crop&q=80" alt="Bangalore Palace Exterior" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 bg-surface shadow-md snap-center shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/BANGALORE_PALACE_INTERIOR_VIEW.jpg/960px-BANGALORE_PALACE_INTERIOR_VIEW.jpg?_=20210924150140" alt="Palace Interior Royal Hall" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 shadow-md bg-surface snap-center shrink-0">
              <img src="https://images.pexels.com/photos/17744269/pexels-photo-17744269.jpeg?cs=srgb&dl=pexels-abdullah-k-636252979-17744269.jpg&fm=jpg" alt="Chandelier Detail" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 shadow-md bg-surface snap-center shrink-0">
              <img src="https://media.istockphoto.com/id/2198322007/photo/iconic-bangalore-palace-built-in-1887-scottish-gothic-architecture-victorian-style-intricate.jpg?s=612x612&w=0&k=20&c=AlxZOVFot_VZ0l5jAbnFYKZwfpTWoZYu4Mjfzyr5niI=" alt="Wood Carvings and Staircase" className="w-full h-full object-cover" />
            </div>

            {/* Newly added photos */}
            <div className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 bg-surface shadow-md snap-center shrink-0">
              <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/sites/2/2016/10/BangalorePalace-i.jpg?fm=webp&w=750&h=500&dpr=2" alt="Corridor Detail" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 shadow-md bg-surface snap-center shrink-0">
              <img src="https://www.holidify.com/images/cmsuploads/compressed/BangalorePalace6_20190919124025.jpg" alt="Vintage Stained Glass" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 bg-surface shadow-md snap-center shrink-0">
              <img src="https://www.holidify.com/images/cmsuploads/compressed/BangalorePalace7_20190920111051.jpg" alt="Palace Gardens" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 shadow-md bg-surface snap-center shrink-0">
              <img src="https://www.holidify.com/images/cmsuploads/compressed/BangalorePalace4_20190920110715.jpg" alt="Royal Crest Carving" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Path to Heritage */}
      <section className="bg-surface-container-high py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/3">
            <h2 className="font-headline text-4xl md:text-5xl italic text-on-surface mb-12">The Path to Heritage</h2>

            <div className="flex items-start gap-4 mb-10 border-l border-on-surface-variant pl-6">
              <span className="material-symbols-outlined mt-1">location_on</span>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-on-surface-variant mb-1">
                  {distanceData ? "FROM YOUR LOCATION" : "FROM CITY CENTER"}
                </p>
                <p className="font-headline text-2xl italic text-on-surface mb-2">
                  {distanceData ? `${distanceData.distance.text} (${distanceData.duration.text})` : "Approx. 5.2 km"}
                </p>
                <p className="text-sm font-light text-on-surface-variant">Vasanth Nagar, Bengaluru, 560052</p>
              </div>
            </div>
            {mapsError && (
              <div className="text-xs text-error mb-6 bg-error-container p-3 rounded">
                Map API Error: {mapsError}
              </div>
            )}


          </div>

          <div className="w-full md:w-2/3 h-[400px] md:h-[500px] bg-surface-variant overflow-hidden p-3 bg-surface shadow-xl">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(0.6) opacity(0.9)', transition: 'filter 0.5s ease' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={
                userLocation
                  ? `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${userLocation}&destination=${DESTINATION_LAT_LNG}`
                  : `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${DESTINATION_LAT_LNG}`
              }
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0) opacity(1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(0.6) opacity(0.9)'; }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Section: Refining the Experience */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl italic text-on-surface mb-2">Refining the Experience</h2>
        <p className="text-[10px] tracking-widest uppercase text-on-surface-variant mb-12">LIVE NEARBY RECOMMENDATIONS</p>

        {isNearbyLoading ? (
            <div className="py-12 flex justify-center items-center text-on-surface-variant text-sm">
                <span className="material-symbols-outlined animate-spin mr-3">progress_activity</span>
                Extracting Local Insights...
            </div>
        ) : mapsError ? (
            <div className="py-12 flex justify-center items-center text-error text-sm border border-error-container p-6 rounded bg-surface">
                <span className="material-symbols-outlined mr-3 text-2xl">error</span>
                Could not load recommendations.
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Restaurant */}
              <div className="bg-surface-container-low p-8 border border-transparent hover:border-outline-variant transition-colors group cursor-pointer flex flex-col relative overflow-hidden">
                <span className="material-symbols-outlined mb-8 text-on-surface-variant group-hover:text-primary transition-colors relative z-10">restaurant_menu</span>
                <h3 className="font-headline text-2xl italic mb-3 relative z-10">
                  {nearbyPlaces.restaurant ? nearbyPlaces.restaurant.name : "Windsor Pub"}
                </h3>
                <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-4 relative z-10">
                  {nearbyPlaces.restaurant ? `Top rated local dining spot located nearby. ${nearbyPlaces.restaurant.rating ? `Earned ${nearbyPlaces.restaurant.rating} stars.` : ''}` : "Historic dining spot nearby, serving traditional Bangalore fare."}
                </p>
                {nearbyPlaces.restaurant && (
                  <div className="flex items-center justify-between mt-auto relative z-10 w-full">
                    {nearbyPlaces.restaurant.rating && (
                      <div className="flex items-center text-xs font-bold tracking-widest text-secondary">
                        <span className="material-symbols-outlined text-[14px] mr-1">star</span>
                        {nearbyPlaces.restaurant.rating} RATING
                      </div>
                    )}
                    <div className="flex items-center text-[10px] font-bold tracking-widest text-on-surface-variant opacity-80 uppercase ml-auto">
                       <span className="material-symbols-outlined text-[12px] mr-1">location_on</span>
                       {getDistanceText(nearbyPlaces.restaurant)}
                    </div>
                  </div>
                )}
              </div>

              {/* Hotel */}
              <div className="bg-surface-container-low p-8 border border-transparent hover:border-outline-variant transition-colors group cursor-pointer flex flex-col relative overflow-hidden">
                <span className="material-symbols-outlined mb-8 text-on-surface-variant group-hover:text-primary transition-colors relative z-10">bed</span>
                <h3 className="font-headline text-2xl italic mb-3 relative z-10">
                  {nearbyPlaces.hotel ? nearbyPlaces.hotel.name : "Shangri-La Hotel"}
                </h3>
                <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-4 relative z-10">
                  {nearbyPlaces.hotel ? `Premium accommodation in the vicinity to rest during your visit. ${nearbyPlaces.hotel.rating ? `Currently seated at a ${nearbyPlaces.hotel.rating} star average.` : ''}` : "Luxury accommodation within 1km, offering panoramic views."}
                </p>
                {nearbyPlaces.hotel && (
                  <div className="flex items-center justify-between mt-auto relative z-10 w-full">
                    {nearbyPlaces.hotel.rating && (
                      <div className="flex items-center text-xs font-bold tracking-widest text-secondary">
                        <span className="material-symbols-outlined text-[14px] mr-1">star</span>
                        {nearbyPlaces.hotel.rating} RATING
                      </div>
                    )}
                    <div className="flex items-center text-[10px] font-bold tracking-widest text-on-surface-variant opacity-80 uppercase ml-auto">
                       <span className="material-symbols-outlined text-[12px] mr-1">location_on</span>
                       {getDistanceText(nearbyPlaces.hotel)}
                    </div>
                  </div>
                )}
              </div>

              {/* Hospital */}
              <div className="bg-surface-container-low p-8 border border-transparent hover:border-outline-variant transition-colors group cursor-pointer flex flex-col relative overflow-hidden">
                <span className="material-symbols-outlined mb-8 text-on-surface-variant group-hover:text-primary transition-colors relative z-10">local_hospital</span>
                <h3 className="font-headline text-2xl italic mb-3 relative z-10">
                  {nearbyPlaces.hospital ? nearbyPlaces.hospital.name : "Fortis Hospital"}
                </h3>
                <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-4 relative z-10">
                  {nearbyPlaces.hospital ? `Trusted medical facility located nearby for peace of mind during your travels.` : "Reliable medical facility located nearby for emergencies."}
                </p>
                {nearbyPlaces.hospital && (
                  <div className="flex items-center justify-between mt-auto relative z-10 w-full">
                    {nearbyPlaces.hospital.rating && (
                      <div className="flex items-center text-xs font-bold tracking-widest text-secondary">
                        <span className="material-symbols-outlined text-[14px] mr-1">star</span>
                        {nearbyPlaces.hospital.rating} RATING
                      </div>
                    )}
                    <div className="flex items-center text-[10px] font-bold tracking-widest text-on-surface-variant opacity-80 uppercase ml-auto">
                       <span className="material-symbols-outlined text-[12px] mr-1">location_on</span>
                       {getDistanceText(nearbyPlaces.hospital)}
                    </div>
                  </div>
                )}
              </div>
            </div>
        )}
      </section>

      {/* Section: Voices of History */}
      <section className="pb-32 px-8 md:px-16 max-w-7xl mx-auto border-t border-outline-variant pt-24">
        <div className="flex flex-col md:flex-row justify-between mb-12 md:items-end">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl italic text-on-surface mb-4">Voices of History</h2>
            <div className="flex items-center gap-3">
              <div className="flex text-secondary opacity-90 text-sm">
                 {[1,2,3,4,5].map(star => (
                   <span key={star} className="material-symbols-outlined text-[18px]">
                     {placeData?.rating >= star ? 'star' : placeData?.rating >= star - 0.5 ? 'star_half' : 'star_outline'}
                   </span>
                 ))}
              </div>
              <span className="font-headline italic text-xl">{placeData ? placeData.rating : "4.8"} / 5</span>
              <span className="text-[10px] tracking-widest uppercase text-on-surface-variant ml-2 border-l border-outline-variant pl-4">
                ({placeData ? placeData.user_ratings_total : "424"} REVIEWS)
              </span>
            </div>
          </div>
          <button 
            onClick={(e) => { e.preventDefault(); setShowAllReviews(!showAllReviews); }}
            className="hidden md:inline-flex text-[10px] tracking-widest font-medium uppercase text-on-surface-variant hover:text-primary transition-colors pb-1 border-b border-outline-variant hover:border-primary mt-6 md:mt-0"
          >
            {showAllReviews ? "SHOW LESS REVIEWS" : "READ ALL REVIEWS"}
          </button>
        </div>

        {isMapsLoading ? (
            <div className="py-12 flex justify-center items-center text-on-surface-variant text-sm">
                <span className="material-symbols-outlined animate-spin mr-3">progress_activity</span>
                Loading Live Google Maps Reviews...
            </div>
        ) : mapsError ? (
            <div className="py-12 flex justify-center items-center text-error text-sm border border-error-container p-6 rounded bg-surface">
                <span className="material-symbols-outlined mr-3 text-2xl">error</span>
                Could not load live reviews: {mapsError}
            </div>
        ) : placeData && placeData.reviews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {placeData.reviews.slice(0, showAllReviews ? placeData.reviews.length : 2).map((review, idx) => (
               <div key={idx} className="bg-surface-container-lowest border border-outline-variant p-8 relative">
                 <span className="material-symbols-outlined absolute top-6 right-6 text-4xl text-surface-dim opacity-30">format_quote</span>
                 <p className="font-light text-on-surface-variant leading-relaxed mb-8 pr-8 line-clamp-4">
                   "{review.text}"
                 </p>
                 <div className="flex items-center gap-4">
                   <img src={review.profile_photo_url || "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/150px-Portrait_Placeholder.png"} alt="Reviewer" className="w-12 h-12 rounded-full object-cover" />
                   <div>
                     <p className="font-headline italic text-lg text-on-surface">{review.author_name}</p>
                     <p className="text-[10px] tracking-widest uppercase text-on-surface-variant">{review.relative_time_description}</p>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="py-8 text-on-surface-variant text-sm">No reviews available.</div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant py-20 px-8 text-center flex flex-col items-center">
        <div className="font-headline text-3xl italic tracking-wide text-on-surface mb-10">The Living Archive</div>
        <div className="flex flex-wrap justify-center gap-8 text-[10px] tracking-[0.2em] uppercase font-medium text-on-surface-variant mb-12">
          <a href="#" className="hover:text-primary transition-colors">ARCHIVE</a>
          <a href="#" className="hover:text-primary transition-colors">PRESS KIT</a>
          <a href="#" className="hover:text-primary transition-colors">PRIVACY POLICY</a>
          <a href="#" className="hover:text-primary transition-colors">CONTACT</a>
        </div>
        <p className="text-xs font-light text-on-surface-variant/70">
          © 2026 THE LIVING ARCHIVE. ALL RIGHTS RESERVED. HERITAGE OF KARNATAKA.
        </p>
      </footer>

    </div>
  );
};

export default SiteDetailsPage;
