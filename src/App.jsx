// App.jsx
import { useState, useCallback } from 'react';
import RestaurantCard from './RestaurantCard.jsx'; // .jsx로 수정 (파일이름이 .jsx이므로)

function App() {
  // --- State 정의 ---
  const [category, setCategory] = useState('음식점');
  const [restaurants, setRestaurants] = useState([]);
  const [pick, setPick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- 네이버 지도 API 관련 변수 ---
  const { naver } = window;

  // --- 함수 정의 ---

  /**
   * 현재 위치 기반으로 주변 장소 검색 (useCallback으로 최적화)
   * @param {string} query - 검색할 카테고리 (예: '음식점', '돈까스')
   */
  const searchNearbyRestaurants = useCallback(
    (query) => {
      // naver 객체가 로드되었는지 확인
      if (!naver || !naver.maps || !naver.maps.services) {
        setError(
          '지도 API가 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.'
        );
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);
      setPick(null);
      setRestaurants([]);

      // 1. Geolocation API로 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = new naver.maps.LatLng(latitude, longitude);

          // 2. Places Service 초기화
          const places = new naver.maps.services.Places();

          // 3. 장소 검색
          places.search(
            {
              query: query, // 인자로 받은 query 사용
              location: userLocation,
              radius: 500, // 500m 반경
              sort: 'distance', // 거리순 정렬
            },
            (status, response) => {
              setIsLoading(false);
              if (status === naver.maps.services.Status.OK) {
                if (response.result.list.length === 0) {
                  setError(`주변 500m 내에 '${query}' 결과가 없습니다. 😅`);
                  setRestaurants([]);
                } else {
                  console.log('검색 결과:', response.result.list);
                  setRestaurants(response.result.list);
                }
              } else {
                setError('주변 식당을 찾는 데 실패했습니다. 😥');
              }
            }
          );
        },
        (err) => {
          setIsLoading(false);
          setError('위치 정보를 가져올 수 없습니다. 📍');
          console.warn('ERROR(' + err.code + '): ' + err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    },
    [naver] // naver 객체에만 의존
  );

  /** 식당 목록에서 랜덤으로 하나 선택 */
  const pickRandomRestaurant = () => {
    if (restaurants.length === 0) {
      setError('먼저 주변 식당을 검색해 주세요!');
      return;
    }
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    setPick(restaurants[randomIndex]);
  };

  /** 검색 버튼 클릭 핸들러 */
  const handleSearchClick = () => {
    searchNearbyRestaurants(category);
  };

  // ***** 🚀 useEffect 주석 처리! *****
  // 페이지 로드 시 자동 검색은 스크립트 로딩과 충돌(Race Condition)을
  // 일으킬 수 있으므로, 사용자 클릭으로 대체하는 것이 더 안정적입니다.
  /*
  useEffect(() => {
    searchNearbyRestaurants('음식점');
  }, [searchNearbyRestaurants]); 
  */

  // --- UI (JSX) ---
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ 오늘 점심 뭐 먹지?</h1>

      <div style={styles.searchBox}>
        {/* 접근성 경고(Warning) 수정을 위해 label과 id, name 추가 */}
        <label htmlFor="category-input" style={styles.hiddenLabel}>
          음식 카테고리
        </label>
        <input
          type="text"
          id="category-input"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="예: 돈까스, 쌀국수, 백반"
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()} // 엔터키로도 검색
        />
        <button onClick={handleSearchClick} style={styles.button}>
          주변 식당 찾기
        </button>
      </div>

      {restaurants.length > 0 && (
        <button
          onClick={pickRandomRestaurant}
          style={{ ...styles.button, ...styles.randomButton }}
        >
          이 중에서 랜덤 추천!
        </button>
      )}

      {/* 로딩 및 에러 메시지 표시 */}
      {isLoading && <p style={styles.message}>찾는 중... 🔍</p>}
      {error && <p style={{ ...styles.message, color: 'red' }}>{error}</p>}

      {/* 추천 결과 표시 */}
      {pick && <RestaurantCard restaurant={pick} />}
    </div>
  );
}

// --- 스타일 객체 ---
const styles = {
  // (기존 styles 객체와 동일)
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffbe6',
    fontFamily: 'PretendM-ard, sans-serif',
    padding: '1rem',
    boxSizing: 'border-box',
  },
  title: {
    margin: '0 0 1.5rem 0',
    color: '#333',
  },
  searchBox: {
    display: 'flex',
    gap: '0.5rem',
  },
  // 스크린 리더용 숨김 레이블
  hiddenLabel: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    border: 0,
  },
  input: {
    padding: '10px 14px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#ffcc00',
    color: '#333',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.2s',
  },
  randomButton: {
    marginTop: '1rem',
    backgroundColor: '#ff6b6b',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
  },
  message: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    color: '#555',
  },
};

export default App;