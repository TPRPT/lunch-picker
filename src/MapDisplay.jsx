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

    // --- 👇 여기가 수정된 부분입니다 ---

    // 1. 마커를 생성합니다. (이때 'map: map' 옵션을 뺍니다)
    const destMarker = new kakao.maps.Marker({ 
      position: destPos 
    });
    
    // 2. 'destMarker' 변수를 "사용해서" 지도에 마커를 추가합니다.
    destMarker.setMap(map);

    // --- 👆 여기까지 ---
    
    map.relayout();
  }, [destination]);

  // ... (return 문은 동일) ...
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