// src/components/RandomPickButton.jsx
export default function RandomPickButton({ onClick }) {
  return (
    <button className="button randomButton" onClick={onClick}>
      이 중에서 랜덤 추천!
    </button>
  );
}
