// src/components/CategorySelector.jsx
import React from "react";

const categories = [
  { value: "음식점", name: "전체" },
  { value: "한식", name: "한식" },
  { value: "중식", name: "중식" },
  { value: "일식", name: "일식" },
  { value: "양식", name: "양식" },
  { value: "분식", name: "분식" },
  { value: "카페", name: "카페" },
];

export default function CategorySelector({ category, setCategory, onSearch }) {
  return (
    <div className="searchBox">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="select"
      >
        {categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.name}
          </option>
        ))}
      </select>

      <button onClick={onSearch} className="button">
        주변 식당 찾기
      </button>
    </div>
  );
}
