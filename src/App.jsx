// App.jsx
import { useState, useCallback } from 'react';
import RestaurantCard from './RestaurantCard.jsx';
import MapDisplay from './MapDisplay.jsx';
import './App.css';

const categories = [
  { value: '음식점', name: '전체' },
  { value: '한식', name: '한식' },
  { value: '중식', name: '중식' },
  { value: '일식', name: '일식' },
  { value: '양식', name: '양식' },
  { value: '분식', name: '분식' },
  { value: '카페', name: '카페' },
];

function App() {
  // --- State 정의 ---
  const [category, setCategory] = useState('음식점');
  const [restaurants, setRestaurants] = useState([]);
  const [pick, setPick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCategory, setLastSearchedCategory] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // --- 카카오 지도 API 관련 변수 ---
  const { kakao } = window;

  // --- 함수 정의 ---
  const searchNearbyRestaurants = useCallback(
    (query, onSearchComplete) => {
      if (!kakao || !kakao.maps || !kakao.maps.services) {
        setError(
          '카카오 지도 API가 로드되지 않았습니다. 잠시 후 다시 시도해주세요.'
        );
        setIsLoading(false);
        if (onSearchComplete) onSearchComplete(null);
        return;
      }
      setIsLoading(true);
      setError(null);
      setPick(null);
      setRestaurants([]);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = new kakao.maps.LatLng(latitude, longitude);
          setUserLocation({ lat: latitude, lng: longitude });
          const places = new kakao.maps.services.Places();
          const callback = (result, status) => {
            setIsLoading(false);
            if (status === kakao.maps.services.Status.OK) {
              if (result.length === 0) {
                setError(`주변 500m 내에 '${query}' 결과가 없습니다.`);
                setRestaurants([]);
                if (onSearchComplete) onSearchComplete(null);
              } else {
                const formattedRestaurants = result.map((place) => ({
                  name: place.place_name,
                  menu: place.category_name,
                  desc: place.address_name,
                  placeUrl: place.place_url,
                  lat: place.y,
                  lng: place.x,
                }));
                setRestaurants(formattedRestaurants);
                setLastSearchedCategory(query);
                if (onSearchComplete) onSearchComplete(formattedRestaurants);
              }
            } else {
              setError('주변 식당을 찾는 데 실패했습니다.');
              if (onSearchComplete) onSearchComplete(null);
            }
          };
          places.keywordSearch(query, callback, {
            location: userLocation,
            radius: 500,
            sort: kakao.maps.services.SortBy.DISTANCE,
          });
        },
        (err) => {
          setIsLoading(false);
          setError(err, '위치 정보를 가져올 수 없습니다.');
          if (onSearchComplete) onSearchComplete(null);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    },
    [kakao]
  );
  const pickRandomRestaurant = () => {
    if (restaurants.length === 0 || category !== lastSearchedCategory) {
      setError(null);
      setIsLoading(true);
      const pickAfterSearch = (newList) => {
        setIsLoading(false);
        if (newList && newList.length > 0) {
          const randomIndex = Math.floor(Math.random() * newList.length);
          setPick(newList[randomIndex]);
        }
      };
      searchNearbyRestaurants(category, pickAfterSearch);
    } else {
      const randomIndex = Math.floor(Math.random() * restaurants.length);
      setPick(restaurants[randomIndex]);
    }
  };
  const handleSearchClick = () => {
    searchNearbyRestaurants(category);
  };
  const handlePickRestaurant = (restaurant) => {
    setPick(restaurant);
  };
  
  // --- UI (JSX) ---
  return (
    <div className="container"> 
      <h1 className="title">🍽️ 오늘 점심 뭐 먹지?</h1>

      <p className="description">
        지금 당장 배고픈 당신을 위해!
        <br></br>
        현재 위치 반경 500m 내의 식당을 검색합니다
      </p>

      <div className="searchBox">
        <label htmlFor="category-select" className="hiddenLabel">
          음식 카테고리
        </label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="select"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={handleSearchClick} className="button">
          주변 식당 찾기
        </button>
      </div>

      <button
        onClick={pickRandomRestaurant}
        className="button randomButton"
      >
        이 중에서 랜덤 추천!
      </button>

      {isLoading && <p className="message">찾는 중... 🔍</p>}
      {error && <p className="message" style={{ color: 'red' }}>{error}</p>}

      {!pick && restaurants.length > 0 && category === lastSearchedCategory && (
        <div className="listContainer">
          <h3 className="listTitle">검색 결과 {restaurants.length}건</h3>
          {restaurants.map((restaurant, index) => (
            <div 
              key={index} 
              className="listItem"
              onClick={() => handlePickRestaurant(restaurant)}
            >
              <h4 className="listItemH4">{restaurant.name}</h4>
              <p className="listItemP">{restaurant.menu.replace('음식점 > ', '')}</p>
            </div>
          ))}
        </div>
      )}

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