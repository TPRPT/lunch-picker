import { useState } from "react";

function App() {
  const restaurants = [
    { name: "김밥천국", menu: "돈까스정식", desc: "든든한 한 끼 정식" },
    { name: "홍콩반점", menu: "짜장면 + 탕수육", desc: "가성비 중식 세트" },
    { name: "봉추찜닭", menu: "간장찜닭", desc: "단짠의 조화" },
    { name: "도스마스", menu: "부리또", desc: "가볍고 맛있는 멕시칸" },
    { name: "이삭토스트", menu: "햄치즈토스트", desc: "간단한 브런치 스타일" },
    { name: "엽기떡볶이", menu: "국물떡볶이", desc: "매운 게 땡길 때" },
    { name: "교촌치킨", menu: "허니콤보", desc: "달콤짭짤 치킨 대표" },
    { name: "서브웨이", menu: "이탈리안 비엠티", desc: "커스텀 샌드위치" },
  ];

  const [pick, setPick] = useState(null);

  const pickRandom = () => {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    setPick(restaurants[randomIndex]);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fffbe6",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <h1>🍽️ 오늘 점심 뭐 먹지?</h1>
      <button
        onClick={pickRandom}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          fontSize: "1.1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#ffcc00",
          color: "#333",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      >
        추천받기
      </button>

      {pick && (
        <div
          style={{
            marginTop: "2rem",
            padding: "1.5rem",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            textAlign: "center",
          }}
        >
          <h2>{pick.name}</h2>
          <p style={{ fontSize: "1.2rem", margin: "0.5rem 0" }}>
            🍜 {pick.menu}
          </p>
          <p style={{ color: "#666" }}>{pick.desc}</p>
        </div>
      )}
    </div>
  );
}

export default App;
