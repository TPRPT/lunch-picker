// src/api/kakaoService.js
export const searchKakaoPlaces = (query, userLocation) => {
  const { kakao } = window;

  return new Promise((resolve, reject) => {
    if (!kakao || !kakao.maps || !kakao.maps.services) {
      reject("카카오 지도 API가 준비되지 않았습니다.");
      return;
    }

    const places = new kakao.maps.services.Places();

    places.keywordSearch(
      query,
      (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve(result);
        } else {
          reject("검색 실패 또는 결과 없음");
        }
      },
      {
        location: userLocation,
        radius: 500,
        sort: kakao.maps.services.SortBy.DISTANCE,
      }
    );
  });
};
