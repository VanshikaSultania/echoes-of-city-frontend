import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { heritageSites } from '../data/heritageSites';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Haversine formula for straight-line distance
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
};

const SiteDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const siteData = heritageSites[id];

  const galleryRef = useRef(null);
  const [distanceData, setDistanceData] = useState(null);
  const [placeData, setPlaceData] = useState(null);
  const [mapsError, setMapsError] = useState(null);
  const [isMapsLoading, setIsMapsLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState({ restaurant: null, hotel: null, hospital: null });
  const [isNearbyLoading, setIsNearbyLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // If invalid ID is accessed directly, bounce them back to sites
    if (!siteData) {
      navigate('/sites');
      return;
    }

    let isMounted = true;
    const fetchMapsData = async () => {
      try {
        setIsMapsLoading(true);
        setMapsError(null);

        // 1. Fetch Place Details (Rating & Reviews)
        const placeUrl = `/google-maps-api/maps/api/place/details/json?place_id=${siteData.placeId}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`;
        const placeRes = await axios.get(placeUrl);

        if (placeRes.data.status !== "OK") {
          // We'll optionally ignore it rather than crash if we just want basic layout testing without API
          console.warn(`Places API Warning: ${placeRes.data.status}`);
        } else if (isMounted) {
          setPlaceData(placeRes.data.result);
        }

        // 1.5 Fetch Nearby Places (Restaurant, Hotel, Hospital)
        setIsNearbyLoading(true);
        const types = ['restaurant', 'lodging', 'hospital'];
        const nearbyPromises = types.map(type =>
          axios.get(`/google-maps-api/maps/api/place/nearbysearch/json?location=${siteData.latLng}&radius=3000&type=${type}&key=${API_KEY}`)
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
              const distUrl = `/google-maps-api/maps/api/distancematrix/json?origins=${originLatLng}&destinations=${siteData.latLng}&key=${API_KEY}`;

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
  }, [id, navigate, siteData]);

  if (!siteData) return null; // Prevent flash before redirect

  const getDistanceText = (place) => {
    if (!place || !place.geometry || !place.geometry.location) return "Nearby";
    const [destLat, destLng] = siteData.latLng.split(',').map(Number);
    const dist = calculateDistance(
      destLat, destLng,
      place.geometry.location.lat,
      place.geometry.location.lng
    );
    return `${dist} km away`;
  };

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 424 : window.innerWidth * 0.8;
      galleryRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const themeText = siteData.theme.textRoot;
  const themeBorder = siteData.theme.borderLight;

  return (
    <div className="font-body text-on-surface bg-surface min-h-screen">
      {/* Navbar */}
      <nav className="absolute top-0 w-full z-50 px-8 py-6 flex items-center justify-between text-on-tertiary-fixed-variant font-bold">
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] w-full flex items-center pt-32 pb-24 px-8 md:px-16 overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img src={siteData.heroImage} alt={siteData.title.join(' ')} className="w-full h-full object-cover object-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/40 to-transparent w-full md:w-2/3"></div>
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-surface via-surface/90 to-transparent"></div>
          <div className="absolute inset-0 grain-overlay opacity-30"></div>
        </div>

        <div className={`relative z-10 w-full max-w-7xl mx-auto flex flex-col drop-shadow-sm`}>
          <div className="max-w-3xl">
            <h1 className={`font-headline text-6xl md:text-8xl lg:text-[130px] italic leading-tight md:leading-none mb-6 drop-shadow-lg ${siteData.heroTitleWeight || 'font-bold'} ${siteData.heroTitleColor || themeText}`}>
              {siteData.title[0]} <br /> {siteData.title[1]}
            </h1>
            <p className={`text-xl md:text-2xl font-light opacity-100 max-w-2xl mb-16 tracking-wide drop-shadow-md ${themeText}`}>
              {siteData.subtitle}
            </p>

            {siteData.metrics.length > 0 && (
              <div className={`grid grid-cols-2 md:grid-cols-${siteData.metrics.length > 3 ? '4' : '3'} gap-8 md:gap-12 pt-10 border-t ${themeBorder}`}>
                {siteData.metrics.map((metric, idx) => (
                  <div key={idx} className={metric.span ? "col-span-2 md:col-span-1 border-t md:border-transparent pt-6 md:pt-0" : ""}>
                    <p className={`text-[10px] tracking-widest uppercase opacity-90 mb-2 font-bold ${themeText}`}>{metric.label}</p>
                    <p className={`font-headline italic text-3xl font-medium drop-shadow-sm ${themeText}`}>{metric.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Primary History Framework */}
      <section className="py-24 md:py-40 px-8 md:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center bg-surface relative">
        <div className="absolute inset-0 noise-grain"></div>
        <div className="relative h-[500px] md:h-[600px] w-full mt-10 md:mt-0 order-2 md:order-1">
          <img src={siteData.history.image1} alt="Primary History" className="absolute top-0 left-0 w-3/4 h-[85%] object-cover shadow-2xl z-10 p-2 bg-surface" />
          <img src={siteData.history.image2} alt="Secondary Detail" className="absolute bottom-0 right-0 w-3/5 h-2/3 object-cover shadow-xl z-20 p-2 bg-surface" />
        </div>

        <div className="flex flex-col justify-center order-1 md:order-2">
          <h2 className="font-headline text-4xl md:text-6xl italic leading-tight text-on-surface mb-8 whitespace-pre-wrap">
            {siteData.history.title}
          </h2>
          {siteData.history.paragraphs.map((p, idx) => (
            <p key={idx} className="text-on-surface-variant font-light leading-relaxed mb-6">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Cinematic Frame */}
      <section className="bg-surface-container-low py-24 md:py-32 px-8 overflow-hidden relative">
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="font-headline text-4xl md:text-5xl italic text-on-surface mb-4 text-center">{siteData.video.title}</h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant mb-12 text-center">{siteData.video.subtitle}</p>

          <div className="w-full aspect-video bg-surface shadow-2xl p-2 pb-6 relative rounded">
            <div className="w-full h-full bg-black rounded overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${siteData.video.youtubeId}?si=ZqFfyFWKDUxPZRdA`}
                title="Cinematic Tour"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* The Visual Archive */}
      <section className="py-24 md:py-32 px-8 md:px-16 max-w-7xl mx-auto relative overflow-hidden">
        <div className="flex flex-col mb-12">
          <h2 className="font-headline text-4xl md:text-5xl italic text-on-surface mb-4">{siteData.galleryTitle}</h2>
          <p className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">{siteData.gallerySubtitle}</p>
        </div>

        <div className="relative group -mx-4 md:mx-0 px-4 md:px-0">
          <button onClick={() => scrollGallery('left')} className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-surface border border-outline hover:bg-surface-variant transition-colors rounded-full shadow-lg opacity-0 md:opacity-100 group-hover:opacity-100">
            <span className="material-symbols-outlined text-[20px] -translate-x-0.5">arrow_back</span>
          </button>
          <button onClick={() => scrollGallery('right')} className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center bg-surface border border-outline hover:bg-surface-variant transition-colors rounded-full shadow-lg opacity-0 md:opacity-100 group-hover:opacity-100">
            <span className="material-symbols-outlined text-[20px] translate-x-0.5">arrow_forward</span>
          </button>

          <div ref={galleryRef} className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {siteData.gallery.map((url, idx) => (
              <div key={idx} className="min-w-[85vw] md:min-w-[400px] h-[500px] p-2 bg-surface shadow-md snap-center shrink-0">
                <img src={url} alt={`Archive ${idx}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Geolocation */}
      <section className="bg-surface-container-high py-24 md:py-32 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/3">
            <h2 className="font-headline text-4xl md:text-5xl italic text-on-surface mb-12">Navigating History</h2>

            <div className="flex items-start gap-4 mb-10 border-l border-on-surface-variant pl-6">
              <span className="material-symbols-outlined mt-1">location_on</span>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-on-surface-variant mb-1">
                  {distanceData ? "FROM YOUR LOCATION" : "FROM CITY CENTER"}
                </p>
                <p className="font-headline text-2xl italic text-on-surface mb-2">
                  {distanceData ? `${distanceData.distance.text} (${distanceData.duration.text})` : "Approx. 3.5 km"}
                </p>
                <p className="text-sm font-light text-on-surface-variant">{siteData.address}</p>
              </div>
            </div>
            {mapsError && (
              <div className="text-xs text-error mb-6 bg-error-container p-3 rounded">
                Map API Notice: Using Static Map View
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 h-[400px] md:h-[500px] bg-surface-variant overflow-hidden p-3 bg-surface shadow-xl">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'sepia(0.6) grayscale(0.5) contrast(1.1) opacity(0.9)', transition: 'filter 0.5s ease' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={
                userLocation
                  ? `https://www.google.com/maps/embed/v1/directions?key=${API_KEY}&origin=${userLocation}&destination=${siteData.latLng}`
                  : `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${siteData.latLng}`
              }
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'sepia(0) grayscale(0) opacity(1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'sepia(0.6) grayscale(0.5) contrast(1.1) opacity(0.9)'; }}
            ></iframe>
          </div>
        </div>
      </section>

      {/* Refining the Experience */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl italic text-on-surface mb-2">Refining the Experience</h2>
        <p className="text-[10px] tracking-widest uppercase text-on-surface-variant mb-12">LIVE NEARBY RECOMMENDATIONS</p>

        {isNearbyLoading ? (
          <div className="py-12 flex justify-center items-center text-on-surface-variant text-sm">
            <span className="material-symbols-outlined animate-spin mr-3">progress_activity</span>
            Extracting Local Insights...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Restaurant */}
            <div className="bg-surface-container-low p-8 border border-transparent hover:border-outline-variant transition-colors group cursor-pointer flex flex-col relative overflow-hidden">
              <span className="material-symbols-outlined mb-8 text-on-surface-variant group-hover:text-primary transition-colors relative z-10">restaurant_menu</span>
              <h3 className="font-headline text-2xl italic mb-3 relative z-10">{nearbyPlaces.restaurant ? nearbyPlaces.restaurant.name : "Local Dining"}</h3>
              <p className="text-sm font-light text-on-surface-variant leading-relaxed mb-4 relative z-10">Top rated local dining spot located nearby.</p>
              {nearbyPlaces.restaurant && (
                <div className="flex items-center justify-between mt-auto relative z-10 w-full">
                  {nearbyPlaces.restaurant.rating && (
                    <div className="flex items-center text-xs font-bold tracking-widest text-secondary"><span className="material-symbols-outlined text-[14px] mr-1">star</span>{nearbyPlaces.restaurant.rating}</div>
                  )}
                  <div className="flex items-center text-[10px] font-bold tracking-widest text-on-surface-variant opacity-80 uppercase ml-auto"><span className="material-symbols-outlined text-[12px] mr-1">location_on</span>{getDistanceText(nearbyPlaces.restaurant)}</div>
                </div>
              )}
            </div>
            {/* Hotel */}
            <div className="bg-surface-container-low p-8 border border-transparent hover:border-outline-variant transition-colors group cursor-pointer flex flex-col relative overflow-hidden">
              <span className="material-symbols-outlined mb-8 text-on-surface-variant group-hover:text-primary transition-colors relative z-10">bed</span>
              <h3 className="font-headline text-2xl italic mb-3 relative z-10">{nearbyPlaces.hotel ? nearbyPlaces.hotel.name : "Local Lodging"}</h3>
              {nearbyPlaces.hotel && (
                <div className="flex items-center justify-between mt-auto relative z-10 w-full">
                  {nearbyPlaces.hotel.rating && (
                    <div className="flex items-center text-xs font-bold tracking-widest text-secondary"><span className="material-symbols-outlined text-[14px] mr-1">star</span>{nearbyPlaces.hotel.rating}</div>
                  )}
                  <div className="flex items-center text-[10px] font-bold tracking-widest text-on-surface-variant opacity-80 uppercase ml-auto"><span className="material-symbols-outlined text-[12px] mr-1">location_on</span>{getDistanceText(nearbyPlaces.hotel)}</div>
                </div>
              )}
            </div>
            {/* Hospital */}
            <div className="bg-surface-container-low p-8 border border-transparent hover:border-outline-variant transition-colors group cursor-pointer flex flex-col relative overflow-hidden">
              <span className="material-symbols-outlined mb-8 text-on-surface-variant group-hover:text-primary transition-colors relative z-10">local_hospital</span>
              <h3 className="font-headline text-2xl italic mb-3 relative z-10">{nearbyPlaces.hospital ? nearbyPlaces.hospital.name : "Local Hospital"}</h3>
              {nearbyPlaces.hospital && (
                <div className="flex items-center justify-between mt-auto relative z-10 w-full">
                  {nearbyPlaces.hospital.rating && (
                    <div className="flex items-center text-xs font-bold tracking-widest text-secondary"><span className="material-symbols-outlined text-[14px] mr-1">star</span>{nearbyPlaces.hospital.rating}</div>
                  )}
                  <div className="flex items-center text-[10px] font-bold tracking-widest text-on-surface-variant opacity-80 uppercase ml-auto"><span className="material-symbols-outlined text-[12px] mr-1">location_on</span>{getDistanceText(nearbyPlaces.hospital)}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Voices of History */}
      <section className="pb-32 px-8 md:px-16 max-w-7xl mx-auto border-t border-outline-variant pt-24">
        <div className="flex flex-col md:flex-row justify-between mb-12 md:items-end">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl italic text-on-surface mb-4">Voices of History</h2>
            <div className="flex items-center gap-3">
              <div className="flex text-secondary opacity-90 text-sm">
                {[1, 2, 3, 4, 5].map(star => (
                  <span key={star} className="material-symbols-outlined text-[18px]">
                    {placeData?.rating >= star ? 'star' : placeData?.rating >= star - 0.5 ? 'star_half' : 'star_outline'}
                  </span>
                ))}
              </div>
              <span className="font-headline italic text-xl">{placeData ? placeData.rating : siteData.metrics.find(m => m.label === "RATING")?.value || "4.8"} / 5</span>
              <span className="text-[10px] tracking-widest uppercase text-on-surface-variant ml-2 border-l border-outline-variant pl-4">({placeData ? placeData.user_ratings_total : "24k"} REVIEWS)</span>
            </div>
          </div>
          <button onClick={() => setShowAllReviews(!showAllReviews)} className="hidden md:inline-flex text-[10px] tracking-widest font-medium uppercase text-on-surface-variant hover:text-primary transition-colors pb-1 border-b border-outline-variant hover:border-primary mt-6 md:mt-0">
            {showAllReviews ? "SHOW LESS REVIEWS" : "READ ALL REVIEWS"}
          </button>
        </div>

        {isMapsLoading ? (
          <div className="py-12 flex justify-center items-center text-on-surface-variant text-sm"><span className="material-symbols-outlined animate-spin mr-3">progress_activity</span>Loading Live Google Maps Reviews...</div>
        ) : placeData && placeData.reviews ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {placeData.reviews.slice(0, showAllReviews ? placeData.reviews.length : 2).map((review, idx) => (
              <div key={idx} className="bg-surface-container-lowest border border-outline-variant p-8 relative">
                <span className="material-symbols-outlined absolute top-6 right-6 text-4xl text-surface-dim opacity-30">format_quote</span>
                <p className="font-light text-on-surface-variant leading-relaxed mb-8 pr-8 line-clamp-4">"{review.text}"</p>
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
        <div className="font-headline text-3xl italic tracking-wide text-on-surface mb-10 cursor-pointer" onClick={() => navigate('/')}>The Living Archive</div>
        <div className="flex flex-wrap justify-center gap-8 text-[10px] tracking-[0.2em] uppercase font-medium text-on-surface-variant mb-12">
          <a href="/" className="hover:text-primary transition-colors">ARCHIVE</a>
          <a href="#" className="hover:text-primary transition-colors">PRESS KIT</a>
          <a href="#" className="hover:text-primary transition-colors">PRIVACY POLICY</a>
          <a href="#" className="hover:text-primary transition-colors">CONTACT</a>
        </div>
        <p className="text-xs font-light text-on-surface-variant/70">© 2026 THE LIVING ARCHIVE. ALL RIGHTS RESERVED. HERITAGE OF KARNATAKA.</p>
      </footer>
    </div>
  );
};

export default SiteDetailsPage;
