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
import { fetchFeaturedWebtoon, fetchTodayWebtoons, fetchPopularWebtoons } from 'api/webtoonApi'; 

import ErrorPage from 'components/feedback/ErrorPage'; // 공통 에러 페이지 import

import MainBanner from 'components/webtoon/MainBanner';
import MainBannerSkeleton from 'components/webtoon/skeleton/MainBannerSkeleton';
import WebtoonSection from 'components/webtoon/WebtoonSection';
import WebtoonCardSkeleton from 'components/webtoon/skeleton/WebtoonCardSkeleton'; // 오늘의, Top10 웹툰 - 스켈레톤 컴포넌트
import './HomePage.css';

function HomePage() {

    // 1. API로부터 받아온 웹툰 데이터를 저장할 state를 만듭니다. 초기값은 빈 배열.
    const [mainBannerData, setMainBannerData] = useState(null);
    const [todaysWebtoons, setTodaysWebtoons] = useState([]);   // 오늘의 업데이트 웹툰 데이터
    const [popularWebtoons, setPopularWebtoons] = useState([]); // 인기 TOP 10 웹툰 데이터

    // 2. 데이터를 불러오는 중인지 상태를 관리할 state를 만듭니다.
    const [isLoading, setIsLoading] = useState(true);
    
    // 3. 에러 상태를 관리할 state를 만듭니다.
    const [error, setError] = useState(null);

    // 4. 컴포넌트가 처음 렌더링될 때 API를 호출합니다.
    useEffect(() => {
        const fetchAllData = async () => {
            setIsLoading(true);
            try {

                // Promise.all 안에서 서버와 동시에 여러 API를 호출합니다.
                // 각 API 함수는 비동기적으로 데이터를 가져오고, 모든 요청이 완료되면 결과를 배열로 반환합니다.
                const [bannerData, todayData, popularData] = await Promise.all([
                    fetchFeaturedWebtoon(),
                    fetchTodayWebtoons(),
                    fetchPopularWebtoons()
                ]);

                // 1. 메인배너 데이터 세팅
                if (bannerData && bannerData.length > 0) {
                    setMainBannerData(bannerData[0]);
                }
                // 2. 인기 TOP 5 웹툰 데이터 세팅
                setPopularWebtoons(popularData);
                // 3. 오늘의 업데이트 웹툰 데이터 세팅
                setTodaysWebtoons(todayData);
                
            } catch (err) {
                console.error("웹툰 데이터 로딩 실패:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllData();
    }, []);


// ====================================================================================================================================================================================

    // 5. 로딩 중일 때 보여줄 화면 > 스켈레톤 로더를 사용으로 대체됨
    /*
    if (isLoading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }
    */

    // 6. 에러가 발생했을 때 보여줄 화면
    if (error) {
        return <ErrorPage message="데이터를 불러오는 중 에러가 발생했습니다." />;
    }

    // 7. 성공적으로 데이터를 불러왔을 때 보여줄 화면
    return (
        <div className="homepage-container">

            {/* 로딩 상태에 따라 MainBanner에 데이터를 전달하거나, 스켈레톤을 보여줌 */}
            {isLoading ? (
                <MainBannerSkeleton /> // 배너용 스켈레톤
            ) : (
                <MainBanner bannerData={mainBannerData} />
            )}
            
        
        {/* 
            isLoading이 true이면 스켈레톤 UI를, false이면 실제 데이터를 보여줍니다. 
            isLoading ? ( ... ) : ( ... ) 사용 시 각 부분은 그 자체로 완결된 하나의 값을 반환해야 하기 때문에 
            유령 부모 세팅해야 함
                <></> : React.Fragment
        */}
            { isLoading ? (
                <>
                    {/* 
                        임시 배열을 만들어 5개의 스켈레톤 카드를 렌더링 
                        
                        1. Array.from(...) : 빈 배열을 생성
                        2. length: 5 : 5개의 요소를 가진 배열을 생성
                            * Array.from({ length: 5 }) : 5개의 비어있는(undefined) 칸을 가진 배열 생성([undefined, undefined, undefined, undefined, undefined])
                        
                        3. .map() : 배열의 각 항목을 순회하며 새로운 값으로 변환하여 새 배열을 생성
                        
                        4. (_, index): .map() 함수는 각 항목을 순회할 때 두 가지 정보, 즉 (값, 인덱스)를 제공
                            _ : 현재 값(value)
                                지금 배열의 모든 값은 undefined이므로 우리는 이 값이 필요 없습니다. 프로그래밍에서는 "이 파라미터는 존재하지만 사용하지 않겠다"는 의미로 관례상 언더스코어(_)를 사용
                            index : 현재 항목의 순번(0, 1, 2, 3, 4)을 의미
                    */}
                    <section className="webtoon-section">
                        <h2 className="section-title">🔥 인기 TOP 5</h2>
                        <div className="webtoon-list">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <WebtoonCardSkeleton key={index} />
                            ))}
                        </div>
                    </section>
                    <section className="webtoon-section">
                        <h2 className="section-title">🚀 오늘의 업데이트</h2>
                        <div className="webtoon-list">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <WebtoonCardSkeleton key={index} />
                            ))}
                        </div>
                    </section>
                </>
            ) : (
                <>
                    <WebtoonSection title="🔥 인기 TOP 5" webtoons={popularWebtoons} />
                    <WebtoonSection title="🚀 오늘의 업데이트" webtoons={todaysWebtoons} />
                </>
            )}


        </div>
    );
}

export default HomePage;