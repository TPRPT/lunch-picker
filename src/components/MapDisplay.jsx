// src/MapDisplay.jsx
import React, { useEffect } from 'react';

const { kakao } = window;

function MapDisplay({ destination }) {
  useEffect(() => {
    if (!kakao || !kakao.maps || !destination) return;
    const mapContainer = document.getElementById('map');
    const destPos = new kakao.maps.LatLng(destination.lat, destination.lng);
    const mapOption = { center: destPos, level: 4 };
    const map = new kakao.maps.Map(mapContainer, mapOption);

    const destMarker = new kakao.maps.Marker({ 
      position: destPos 
    });
    
    destMarker.setMap(map);

    map.relayout();
  }, [destination]);

  return (
    <div
      id="map"
      style={{
        width: '320px',
        height: '350px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    ></div>
  );
}

export default MapDisplay;