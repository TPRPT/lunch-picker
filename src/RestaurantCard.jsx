import React from 'react';

// 추천 결과를 보여줄 카드 컴포넌트
function RestaurantCard({ restaurant }) {
  // naver.maps.services.Places.PlaceResult 객체와
  // 기존 하드코딩된 객체 형식을 모두 처리
  const name = restaurant.name;
  const menu = restaurant.menu || restaurant.category || '추천 메뉴';
  const desc = restaurant.desc || restaurant.address || '맛집';

  return (
    <div
      style={{
        marginTop: '2rem',
        padding: '1.5rem',
        width: '300px',
        borderRadius: '12px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textAlign: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      <h2 style={{ margin: '0 0 0.5rem 0' }}>{name}</h2>
      <p style={{ fontSize: '1.2rem', margin: '0.5rem 0', color: '#ff6b6b' }}>
        🍜 {menu}
      </p>
      <p style={{ color: '#555', margin: 0 }}>{desc}</p>
    </div>
  );
}

export default RestaurantCard;