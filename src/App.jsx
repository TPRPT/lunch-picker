// src/App.jsx
import "./App.css";

import useRestaurantSearch from "./hooks/useRestaurantSearch";

import CategorySelector from "./components/CategorySelector";
import RestaurantList from "./components/RestaurantList";
import RandomPickButton from "./components/RandomPickButton";

import RestaurantCard from "./components/RestaurantCard";
import MapDisplay from "./components/MapDisplay";

function App() {
  const {
    category,
    setCategory,
    restaurants,
    pick,
    searchNearbyRestaurants,
    pickRandomRestaurant,
    handlePickRestaurant,
    isLoading,
    error,
    userLocation,
    lastSearchedCategory,
  } = useRestaurantSearch();

  return (
    <div className="container">
      <h1 className="title">🍽️ 오늘 점심 뭐 먹지?</h1>

      <p className="description">
        지금 당장 배고픈 당신을 위해!
        <br />
        현재 위치 반경 500m 내의 식당을 검색합니다.
      </p>

      {/* 카테고리 + 검색 버튼 */}
      <CategorySelector
        category={category}
        setCategory={setCategory}
        onSearch={() => searchNearbyRestaurants(category)}
      />

      <RandomPickButton onClick={pickRandomRestaurant} />

      {isLoading && <p className="message">찾는 중... 🔍</p>}
      {error && <p className="message" style={{ color: "red" }}>{error}</p>}

      {/* 검색 결과 리스트 */}
      {!pick &&
        restaurants.length > 0 &&
        category === lastSearchedCategory && (
          <RestaurantList
            restaurants={restaurants}
            onPick={handlePickRestaurant}
          />
        )}

      {/* 선택된 식당 상세 + 지도 */}
      {pick && (
        <div className="resultsContainer">
          <RestaurantCard restaurant={pick} userLocation={userLocation} />
          <MapDisplay destination={pick} />
        </div>
      )}
    </div>
  );
}

export default App;
