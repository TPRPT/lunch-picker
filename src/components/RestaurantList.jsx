// src/components/RestaurantList.jsx
import React from "react";

export default function RestaurantList({ restaurants, onPick }) {
  return (
    <div className="listContainer">
      <h3 className="listTitle">검색 결과 {restaurants.length}건</h3>
      {restaurants.map((r, i) => (
        <div key={i} className="listItem" onClick={() => onPick(r)}>
          <h4 className="listItemH4">{r.name}</h4>
          <p className="listItemP">{r.menu.replace("음식점 > ", "")}</p>
        </div>
      ))}
    </div>
  );
}
