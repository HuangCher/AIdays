import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const mapRef = useRef(null);
  const layerGroup1Ref = useRef(null); // For hurricane markers
  const layerGroup2Ref = useRef(null); // For earthquake markers
  const safeZoneLayerRef = useRef(null); // For safe zone markers
  const [mapsLoaded, setMapsLoaded] = useState(false); // State to track if Maps API is loaded

  const hurricane = L.icon({
    iconUrl: '/hurricane.png',  // Path to your custom image
    iconSize: [40, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });

  const earthquake = L.icon({
    iconUrl: '/earthquake.png',  // Path to your custom image
    iconSize: [50, 50],
    iconAnchor: [15, 40],
    popupAnchor: [0, -40],
  });

  useEffect(() => {
    // Load Google Maps JavaScript API
    const loadGoogleMapsApi = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.getElementById('google-maps-script');
        if (!existingScript) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDWilgnVo9JhK8Bu55Q9sCzYfjoi4_eMC4&libraries=places`;
          script.id = 'google-maps-script';
          script.async = true; // Load asynchronously
          script.defer = true; // Defer execution until the document has been parsed
          script.onload = () => {
            setMapsLoaded(true); // Update state when loaded
            resolve();
          };
          script.onerror = () => {
            reject(new Error("Failed to load Google Maps API"));
          };
          document.body.appendChild(script);
        } else {
          setMapsLoaded(true); // Update state if script already exists
          resolve();
        }
      });
    };

    loadGoogleMapsApi()
      .then(() => {
        // Initialize the Leaflet map after Google Maps API is loaded
        if (!mapRef.current) {
          mapRef.current = L.map("map", {
            center: [29.6520, -82.3250], // Centralized on the Atlantic
            zoom: 6,
          });

          L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
            maxZoom: 18,
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
          }).addTo(mapRef.current);

          // Initialize layer groups and add them to the map
          layerGroup1Ref.current = L.layerGroup().addTo(mapRef.current);
          layerGroup2Ref.current = L.layerGroup().addTo(mapRef.current);
          safeZoneLayerRef.current = L.layerGroup().addTo(mapRef.current);

          // Add initial markers
          addHurricaneMarker(29.6520, -82.3250);
          addHurricaneMarker(37.6819, -121.7685);
          addEarthquakeMarker(40.6520, -100.3250);
          addDisasterMarkers();
        }
      })
      .catch((error) => {
        console.error("Error loading Google Maps API:", error);
      });

    // Cleanup function to remove script when component unmounts
    return () => {
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []); // Load only on component mount

  useEffect(() => {
    if (mapsLoaded) {
      findSafeZones(29.6520, -82.3250); // Call only when the API is loaded
    }
  }, [mapsLoaded]); // Call when mapsLoaded changes

  async function fetchDisasterData() {
    try {
      const response = await fetch("https://api.weather.gov/alerts/active?event=Hurricane");
      const data = await response.json();
      return data.features;
    } catch (error) {
      console.error("Error fetching disaster data:", error);
      return [];
    }
  }

  async function addDisasterMarkers() {
    const disasters = await fetchDisasterData();
    disasters.forEach((disaster) => {
      const coords = disaster.geometry.coordinates;
      const [longitude, latitude] = coords;
      const popupContent = `<h3>${disaster.properties.headline}</h3><p>${disaster.properties.description}</p>`;
      L.marker([latitude, longitude])
        .addTo(mapRef.current)
        .bindPopup(popupContent);
    });
  }

  async function findSafeZones(lat, lng) {
    console.log("finding safe zones...");
    if (!window.google) {
      console.error('Google Maps API is not loaded yet.');
      return;
    }

    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    const request = {
      location: new window.google.maps.LatLng(lat, lng),
      radius: '5000', // Search within a 5km radius
      type: ['hospital', 'school', 'police', 'fire_station', 'community_center'], // Types of safe zones
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        results.forEach((place) => {
          const coords = place.geometry.location;
          addSafeZoneMarker(coords.lat(), coords.lng(), place.name);
        });
      } else {
        console.error('Places API error:', status);
      }
    });
  }

  function addSafeZoneMarker(lat, lng, name) {
    const safeZoneIcon = L.icon({
      iconUrl: '/safe-zone.png',  // Path to your safe zone icon
      iconSize: [20, 20],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    const safeZoneMarker = L.marker([lat, lng], { icon: safeZoneIcon })
      .bindPopup(name);
    safeZoneMarker.addTo(safeZoneLayerRef.current);
  }

  async function addHurricaneMarker(latitude, longitude, popupContent = "") {
    if (!mapRef.current || !layerGroup1Ref.current) {
      console.error("Map or layer group not initialized yet.");
      return;
    }
    const marker = L.marker([latitude, longitude], { icon: hurricane });
    if (popupContent) {
      marker.bindPopup(popupContent);
    }
    layerGroup1Ref.current.addLayer(marker);
  }

  async function addEarthquakeMarker(latitude, longitude, popupContent = "") {
    if (!mapRef.current || !layerGroup2Ref.current) {
      console.error("Map or layer group not initialized yet.");
      return;
    }
    const marker = L.marker([latitude, longitude], { icon: earthquake });
    if (popupContent) {
      marker.bindPopup(popupContent);
    }
    layerGroup2Ref.current.addLayer(marker);
  }

  return (
    <div
      id="map"
      style={{
        height: "100vh",
        width: "100%",
      }}
    ></div>
  );
}

export default Map;
