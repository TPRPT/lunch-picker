// src/hooks/useRestaurantSearch.js
import { useState, useCallback } from "react";
import { searchKakaoPlaces } from "../api/kakaoService";

export default function useRestaurantSearch() {
  const [category, setCategory] = useState("음식점");
  const [restaurants, setRestaurants] = useState([]);
  const [pick, setPick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCategory, setLastSearchedCategory] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // GPS 위치 받아오기
  const getUserLocation = () =>
    new Promise((resolve, reject) => {
      let resolved = false;

      // 안전장치: 5초 안에 GPS 콜백이 안 오면 강제 실패
      const timer = setTimeout(() => {
        if (!resolved) {
          reject("GPS 응답 없음 (timeout)");
        }
      }, 5000);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolved = true;
          clearTimeout(timer);

          if (!window.kakao || !window.kakao.maps) {
            reject("카카오 지도 API가 아직 로드되지 않았습니다.");
            return;
          }

          const { latitude, longitude } = pos.coords;
          const loc = new window.kakao.maps.LatLng(latitude, longitude);

          setUserLocation({ lat: latitude, lng: longitude });
          resolve(loc);
        },
        () => {
          resolved = true;
          clearTimeout(timer);
          reject("위치 정보를 가져올 수 없습니다."); // 🔥 err.message 제거
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });

  // 검색 함수
  const searchNearbyRestaurants = useCallback(
    async (query, onSearchComplete) => {
      try {
        setIsLoading(true);
        setError(null);
        
        

        const location = await getUserLocation();
        const result = await searchKakaoPlaces(query, location);

        const formatted = result.map((p) => ({
          name: p.place_name,
          menu: p.category_name,
          desc: p.address_name,
          placeUrl: p.place_url,
          lat: p.y,
          lng: p.x,
        }));

        setRestaurants(formatted);
        setLastSearchedCategory(query);

        if (onSearchComplete) onSearchComplete(formatted);
      } catch (err) {
        setError(err);
        if (onSearchComplete) onSearchComplete(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // 랜덤 추천
  const pickRandomRestaurant = () => {
    if (restaurants.length === 0 || category !== lastSearchedCategory) {
      setError(null);
      setIsLoading(true);

      searchNearbyRestaurants(category, (list) => {
        setIsLoading(false);
        if (list && list.length > 0) {
          const random = list[Math.floor(Math.random() * list.length)];
          setPick(random);
        }
      });
    } else {
      const random = restaurants[Math.floor(Math.random() * restaurants.length)];
      setPick(random);
    }
  };

  const handlePickRestaurant = (restaurant) => setPick(restaurant);

  return {
    category,
    setCategory,
    restaurants,
    pick,
    isLoading,
    error,
    userLocation,
    lastSearchedCategory,

    searchNearbyRestaurants,
    pickRandomRestaurant,
    handlePickRestaurant,
  };
}
