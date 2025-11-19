// src/RestaurantCard.jsx
import React from 'react';
import './RestaurantCard.css';

function RestaurantCard({ restaurant, userLocation }) {
  const name = restaurant.name || '이름 없는 맛집';
  const rawMenu = restaurant.menu || restaurant.category || '추천 메뉴';
  const menu = rawMenu.replace('음식점 > ', '');
  const desc = restaurant.desc || restaurant.address || '맛집';
  const { placeUrl, lat, lng } = restaurant;

  let directionsUrl = '';
  if (userLocation && lat && lng) {
    directionsUrl = `https://map.kakao.com/link/to/${name},${lat},${lng}/from/내 위치,${userLocation.lat},${userLocation.lng}`;
  }
  
  return (
    <div className="cardContainer">
      <div className="cardContent">
        <h2 className="cardTitle">{name}</h2>
        <p className="cardMenu">
          🏷️ {menu}
        </p>
        <p className="cardDesc">
          📍 {desc}
        </p>
        <div className="cardLinks">
          <a
            href={placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cardLink"
          >
            상세보기
          </a>
          {directionsUrl && (
            <>
              <span className="cardLinkSeparator">|</span>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cardLink directions"
              >
                길찾기
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;