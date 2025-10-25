import { useState } from 'react';
import RestaurantCard from './RestaurantCard.jsx';

function App() {
  // 1. imageUrl 속성 추가
  const restaurants = [
    {
      name: '김밥천국',
      menu: '돈까스정식',
      desc: '든든한 한 끼 정식',
      imageUrl: 'https://www.ghostfreshmart.com/wp-content/uploads/2020/08/%EB%8F%88%EA%B9%8C%EC%8A%A4.jpg',
    },
    {
      name: '홍콩반점',
      menu: '짜장면 + 탕수육',
      desc: '가성비 중식 세트',
      imageUrl: 'https://media.sodagift.com/img/image/1742369550207.jpg',
    },
    {
      name: '봉추찜닭',
      menu: '간장찜닭',
      desc: '단짠의 조화',
      imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyNDA3MTJfMTg4/MDAxNzIwNzg2NjQyNjYy.h6j6rDXZVAzA8V9j1r8gVaOJ3M4NhIOxAYwWdpR6vPYg.QlVXS6NUX4EIaRlG2aRLbh8NAsa8zqniVRNQi6qfUCAg.JPEG/SE-25cefb2a-4044-11ef-8755-c3f7065e5427.jpg?type=w800',
    },
    {
      name: '도스마스',
      menu: '부리또',
      desc: '가볍고 맛있는 멕시칸',
      imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAyMzA0MDZfMzgg/MDAxNjgwNzM5Nzk5MzM5.TicCZB9imo_2fjLdph0Sz9rC1CvhFVgm9wU5VZOEAx0g.OzomloAezH2JBPiyYZhJpwTaaprrein_AIJRIIqIdvYg.JPEG.crispynote/717A9965.jpg?type=w800',
    },
    {
      name: '이삭토스트',
      menu: '햄치즈토스트',
      desc: '간단한 브런치 스타일',
      imageUrl: 'https://d3i25w97yl4le9.cloudfront.net/thumb/products/Joc7h3uhAdp8V7fwLEmOmbHEqWnCUKRTAzg8WwXB.png',
    },
    {
      name: '엽기떡볶이',
      menu: '국물떡볶이',
      desc: '매운 게 땡길 때',
      imageUrl: 'https://s3-ap-northeast-1.amazonaws.com/agreable-shoplink/item/templates/bc4e642e579445eabc05d05a2ba07097-w970-v2.jpg',
    },
    {
      name: '교촌치킨',
      menu: '허니콤보',
      desc: '달콤짭짤 치킨 대표',
      imageUrl: 'https://img1.kakaocdn.net/thumb/C320x320@2x.fwebp.q82/?fname=https%3A%2F%2Fst.kakaocdn.net%2Fproduct%2Fgift%2Fproduct%2F20230420141214_e6319192399544e5a7f5f1948be9e028.jpg',
    },
    {
      name: '서브웨이',
      menu: '이탈리안 비엠티',
      desc: '커스텀 샌드위치',
      imageUrl: 'https://menu.mt.co.kr/moneyweek/thumb/2022/07/06/06/2022070616210656364_1.jpg',
    },
    {
      name: '쌀국수집',
      menu: '소고기 쌀국수',
      desc: '따뜻한 국물이 땡길 때',
      imageUrl: 'https://recipe1.ezmember.co.kr/cache/recipe/2020/09/06/ee00d6e59def943bc0eb0354fb58a00d1.jpg',
    },
    {
      name: '백반집',
      menu: '제육볶음',
      desc: '집밥이 그리울 때',
      imageUrl: 'https://recipe1.ezmember.co.kr/cache/recipe/2015/05/27/38013d1dfd8fa46a871b9cda074b26341.jpg',
    },
  ];

  const [pick, setPick] = useState(null);

  const pickRandom = () => {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    setPick(restaurants[randomIndex]);
  };

  // --- UI (JSX) ---
  // 이 부분은 수정할 필요 없습니다. (기존과 동일)
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🍽️ 오늘 점심 뭐 먹지?</h1>
      <button
        onClick={pickRandom}
        style={{ ...styles.button, ...styles.randomButton }}
      >
        오늘의 메뉴 추천!
      </button>
      {pick && <RestaurantCard restaurant={pick} />}
    </div>
  );
}

// --- 스타일 객체 (기존과 동일) ---
const styles = {
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
    fontSize: '1.2rem',
    fontWeight: 'bold',
    padding: '12px 24px',
  },
};

export default App;