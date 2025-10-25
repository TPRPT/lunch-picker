// src/RestaurantCard.jsx
import React from 'react';

function RestaurantCard({ restaurant }) {
  const name = restaurant.name;
  const menu = restaurant.menu || restaurant.category || '추천 메뉴';
  const desc = restaurant.desc || restaurant.address || '맛집';
  const imageUrl = restaurant.imageUrl || 'https://i.imgur.com/default-image.png';

  return (
    <div
      style={{
        marginTop: '2rem',
        /* width: '300px', */
        width: '320px', /* 조금 더 넓게 */
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
    >
      <img
        src={imageUrl}
        alt={menu}
        style={{
          width: '100%',
          /* height: '180px', */
          height: '280px', /* 180px -> 280px로 수정 */
          objectFit: 'cover',
        }}
      />
      
      <div style={{ padding: '1.5rem' }}>
        <h2 style={{ margin: '0 0 0.5rem 0' }}>{name}</h2>
        <p
          style={{ fontSize: '1.2rem', margin: '0.5rem 0', color: '#ff6b6b' }}
        >
          🍜 {menu}
        </p>
        <p style={{ color: '#555', margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

export default RestaurantCard;