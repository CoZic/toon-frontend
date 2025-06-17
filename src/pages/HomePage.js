// 메인페이지 조립
/*
    흐름
        1. App.js에서 <Route path="/" element={<HomePage />} /> 로 HomePage.js를 불러옵니다.
        2. HomePage.js의 HomePage() 함수로 
              - HeroSection 컴포넌트를 불러와서 상단 배너를 표시합니다.
              - webtoons 변수에 값을 넣어 전달해 WebtoonSection 컴포넌트를 조립
        3. WebtoonSection 컴포넌트는 title과 webtoons 배열을 받아서
                제목을 표시하고, .map() 함수로 webtoons 배열을 순회하며 각 웹툰 정보를 WebtoonCard 컴포넌트로 전달합니다.
        4. WebtoonCard 컴포넌트는 각 웹툰의 썸네일, 제목, 작가 정보를 카드 형태로 표시합니다.
*/

import React, { useState, useEffect } from 'react'; // useState와 useEffect를 import
import axios from 'axios'; // axios import

import MainBanner from '../components/MainBanner';
import WebtoonSection from '../components/WebtoonSection';
import './HomePage.css';

// 실제로는 백엔드 API로부터 받아올 임시 데이터
/*
const todaysWebtoons = [
    { id: 1, title: '나 혼자만 레벨업', author: '추공', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+1' },
    { id: 2, title: '전지적 독자 시점', author: '싱숑', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+2' },
    { id: 3, title: '화산귀환', author: '비가', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+3' },
    { id: 4, title: '세이렌', author: '설레다', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+4' },
    { id: 5, title: '입학용병', author: 'YC', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+5' },
];
*/

const popularWebtoons = [
    { id: 6, title: '알고있지만', author: '정서', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+6' },
    { id: 7, title: '유미의 세포들', author: '이동건', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+7' },
    { id: 8, title: '신의 탑', author: 'SIU', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+8' },
    { id: 9, title: '외모지상주의', author: '박태준', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+9' },
    { id: 10, title: '더 복서', author: '정지훈', thumbnailUrl: 'https://via.placeholder.com/200x250.png?text=Webtoon+10' },
];


function HomePage() {

    // 1. API로부터 받아온 웹툰 데이터를 저장할 state를 만듭니다. 초기값은 빈 배열.
    const [todaysWebtoons, setTodaysWebtoons] = useState([]);
    // 2. 데이터를 불러오는 중인지 상태를 관리할 state를 만듭니다.
    const [isLoading, setIsLoading] = useState(true);
    // 3. 에러 상태를 관리할 state를 만듭니다.
    const [error, setError] = useState(null);

    // 4. 컴포넌트가 처음 렌더링될 때 API를 호출합니다.
    useEffect(() => {
        const fetchTodaysWebtoons = async () => {
        try {
            // 백엔드 API 호출 (Proxy 설정 덕분에 전체 주소를 적지 않아도 됩니다)
            const response = await axios.get('/api/webtoons/today');
            // 성공적으로 데이터를 받아오면 state를 업데이트합니다.
            setTodaysWebtoons(response.data);
        } catch (err) {
            // 에러가 발생하면 에러 상태를 업데이트합니다.
            console.error("오늘의 웹툰 데이터 로딩 실패:", err);
            setError(err);
        } finally {
            // 성공하든 실패하든 로딩 상태를 false로 변경합니다.
            setIsLoading(false);
        }
        };

        fetchTodaysWebtoons();
    }, []); // 빈 배열을 전달하여 최초 1회만 실행되도록 합니다.

    // 5. 로딩 중일 때 보여줄 화면
    if (isLoading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    // 6. 에러가 발생했을 때 보여줄 화면
    if (error) {
        return <div>데이터를 불러오는 중 에러가 발생했습니다.</div>;
    }

    // 7. 성공적으로 데이터를 불러왔을 때 보여줄 화면
    return (
        <div className="homepage-container">
            <MainBanner />

            <WebtoonSection title="🚀 오늘의 업데이트" webtoons={ todaysWebtoons } />

            <WebtoonSection title="🔥 인기 TOP 10" webtoons={ popularWebtoons } />
        </div>
    );
}

export default HomePage;