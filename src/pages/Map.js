import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const mapRef = useRef(null);
  const layerGroup1Ref = useRef(null);
  const layerGroup2Ref = useRef(null);
  const hurricaneMarkers = [];
  const earthquakeMarkers = [];
  const hurricane = L.icon({
    iconUrl: '/hurricane.png',  // Path to your custom image
    iconSize: [40, 40],                // Size of the icon
    iconAnchor: [15, 40],              // Point of the icon that corresponds to marker's location
    popupAnchor: [0, -40],             // Offset the popup to appear above the icon
  });

  const earthquake = L.icon({
    iconUrl: '/earthquake.png',  // Path to your custom image
    iconSize: [50, 50],                // Size of the icon
    iconAnchor: [15, 40],              // Point of the icon that corresponds to marker's location
    popupAnchor: [0, -40],             // Offset the popup to appear above the icon
  });

  
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map", {
        center: [20, -80], // Centralized on the Atlantic
        zoom: 4,
      });

      // Google Maps Layer
      L.tileLayer("https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
        maxZoom: 18,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }).addTo(mapRef.current);

      
      //const marker1 = L.marker([29.6520, -82.3250], { icon: hurricane });
      //const marker2 = L.marker([37.6819, -121.7685], { icon: hurricane });
      //const layerGroup = L.layerGroup([marker1, marker2]);
      //layerGroup.addTo(mapRef.current);

      // Initialize layer group and add it to the map
      if (!layerGroup1Ref.current) {
        layerGroup1Ref.current = L.layerGroup().addTo(mapRef.current);
      }

      if (!layerGroup2Ref.current) {
        layerGroup2Ref.current = L.layerGroup().addTo(mapRef.current);
      }


      // Add initial markers
      addHurricaneMarker(29.6520, -82.3250);
      addHurricaneMarker(37.6819, -121.7685);

      addEarthquakeMarker(40.6520, -100.3250);

      addDisasterMarkers();
    }

    async function fetchDisasterData() {
      try {
        const response = await fetch(
          "https://api.weather.gov/alerts/active?event=Hurricane"
        );
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

        // Create a marker and add to map
        L.marker([latitude, longitude])
          .addTo(mapRef.current)
          .bindPopup(popupContent);
      });
    }
  }, []);


  // Async function to add a hurricane marker
  async function addHurricaneMarker(latitude, longitude, popupContent = "") {
    if (!mapRef.current || !layerGroup1Ref.current) {
      console.error("Map or layer group not initialized yet.");
      return;
    }
    const marker = L.marker([latitude, longitude], { icon: hurricane });
    if (popupContent) {
      marker.bindPopup(popupContent);
    }
    hurricaneMarkers.push(marker);
    layerGroup1Ref.current.addLayer(marker);
  }

   // Async function to add a hurricane marker
   async function addEarthquakeMarker(latitude, longitude, popupContent = "") {
    if (!mapRef.current || !layerGroup2Ref.current) {
      console.error("Map or layer group not initialized yet.");
      return;
    }
    const marker = L.marker([latitude, longitude], { icon: earthquake });
    if (popupContent) {
      marker.bindPopup(popupContent);
    }
    earthquakeMarkers.push(marker);
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
