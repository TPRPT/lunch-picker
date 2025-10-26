# 🍽️ 오늘 점심 뭐 먹지? (Lunch Picker)

React 연습용으로 간단히 만든 점심 메뉴 및 식당 추천 웹 애프리케이션입니다.
Kakao Maps API를 사용하여 현재 위치 기반으로 주변 식당을 추천하고 위치를 확인할 수 있습니다.

배포 URL: https://lunch-picker-ten.vercel.app/

## ✨ 주요 기능

* **현재 위치 기반 식당 검색:** 사용자의 현재 위치 반경 500m 내의 식당을 검색합니다.
* **카테고리 필터:** 한식, 중식, 일식 등 카테고리별로 식당 리스트를 필터링할 수 있습니다.
* **검색 결과 목록:** 검색된 식당 리스트를 거리순으로 최대 15개까지 보여줍니다.
* **랜덤 추천:** 검색된 리스트 중에서 메뉴를 랜덤으로 하나 추천받을 수 있습니다.
* **상세 정보 표시:** 선택된 식당의 상세 정보 카드와 위치 지도를 함께 보여줍니다.
* **카카오맵 연동:** 식당 카드의 (상세보기) 및 (길찾기) 링크를 통해 카카오맵으로 바로 이동할 수 있습니다.

## 🛠️ 기술 스택

* **Frontend:** React (Vite)
* **API:** Kakao Maps API (장소 검색)
* **Deployment:** Vercel

## 📂 파일 구조

* `index.html`: 앱의 메인 HTML 파일. React 앱이 마운트될 `<div id="root">`를 제공하고, 카카오 API 스크립트와 Pretendard 폰트를 로드.
* `src/main.jsx`: React 앱을 `index.html`의 `root` DOM에 렌더링하는 진입점. `App.jsx`와 `index.css`를 로드.
* `src/App.jsx`: 앱의 핵심 컴포넌트. 모든 상태(카테고리, 식당 목록, 로딩, 현재 선택 등)와 로직(API 호출, 랜덤 뽑기, 이벤트 핸들러)을 관리.
* `src/RestaurantCard.jsx`: 선택된 식당 1개의 상세 정보(이름, 카테고리, 주소, 링크)를 표시하는 UI 컴포넌트.
* `src/MapDisplay.jsx`: 선택된 식당의 좌표(`destination`)를 받아 카카오 지도를 렌더링하는 UI 컴포넌트.
* `src/*.css`: 각 컴포넌트의 스타일을 정의하는 CSS 파일입니다. (`App.css`, `RestaurantCard.css`, `MapDisplay.css`, `index.css`)

## 🚀 로컬에서 실행하기

1.  이 저장소를 클론(Clone)합니다.
    ```bash
    git clone (저장소 URL)
    cd lunch-picker
    ```

2.  필요한 패키지를 설치합니다.
    ```bash
    npm install
    ```

3.  `index.html` 파일을 수정하여 Vercel 환경 변수 대신 로컬 API 키를 넣거나, `.env` 파일을 생성합니다.
    * 프로젝트 루트에 `.env` 파일을 만들고 Vercel에 등록한 환경 변수를 입력합니다.
        ```
        VITE_KAKAO_APP_KEY=카카오_JavaScript_키
        ```

4.  개발 서버를 실행합니다.
    ```bash
    npm run dev
    ```

5.  브라우저에서 `http://localhost:5173`으로 접속합니다.
