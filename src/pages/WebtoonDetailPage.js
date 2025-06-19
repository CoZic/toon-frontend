/* 웹툰 상세 페이지 */

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // useParams 훅 import
import axios from 'axios';
import './WebtoonDetailPage.css'; // 상세 페이지 CSS import
import WebtoonDetailPageSkeleton from './skeleton/WebtoonDetailPageSkeleton'; // 상세 페이지 스켈레톤 import
import ErrorPage from './common/ErrorPage'; // 공통 에러 페이지 import


function WebtoonDetailPage() {

    // 1. URL 파라미터에서 webtoonId 값을 가져옵니다. (App.js의 :webtoonId와 이름 일치)
    const { webtoonId } = useParams();
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
    console.log("WebtoonDetailPage - webtoonId:", webtoonId);

    const [webtoonDetail, setWebtoonDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 에피소드가 존재하는지 여부를 boolean 값으로 저장하여 재사용합니다.
    const hasEpisodes = webtoonDetail && webtoonDetail.episodes && webtoonDetail.episodes.length > 0;



    // 정렬 순서를 관리할 state 추가 ('desc'가 최신순)
    const [sortOrder, setSortOrder] = useState('desc'); 

    // 2. 컴포넌트가 마운트되거나 webtoonId가 변경될 때 API 호출
    useEffect(() => {
        const fetchWebtoonDetail = async () => {

            setIsLoading(true);

            // API 호출 직전에 이전 데이터를 초기화하여 깜빡임 현상을 최소화
            setWebtoonDetail(null)

            try {
                const response = await axios.get(`/api/webtoons/${webtoonId}`);
                setWebtoonDetail(response.data);

            } catch (err) {
                console.error("콘텐츠 상세 정보 로딩 실패:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchWebtoonDetail();
    }, [webtoonId]); // webtoonId가 바뀔 때마다 다시 데이터를 가져옴

    // 정렬된 에피소드 목록을 계산하기 위해 useMemo 사용
    // sortOrder나 원본 에피소드 목록이 바뀔 때만 재정렬을 수행하여 성능 최적화
    const sortedEpisodes = useMemo(() => {
        if (!webtoonDetail?.episodes) {
            return [];
        }
        // 원본 배열을 훼손하지 않기 위해 복사본을 만들어 정렬
        const episodesCopy = [...webtoonDetail.episodes];
        episodesCopy.sort((a, b) => {
            if (sortOrder === 'desc') {
                return b.episodeNumber - a.episodeNumber; // 내림차순 (최신순)
            } else {
                return a.episodeNumber - b.episodeNumber; // 오름차순 (첫화부터)
            }
        });
        return episodesCopy;
    }, [webtoonDetail?.episodes, sortOrder]);

    // 첫 화 보기 버튼 클릭 핸들러
    const handleFirstEpisodeClick = () => {

        // 1. hasEpisodes가 false면 함수를 바로 종료
        if (!hasEpisodes) return;

        // 1화 찾기 (또는 가장 낮은 번호의 에피소드) - 에피소드 목록을 복사해서 'episodeNumber' 오름차순으로 정렬
        const firstEpisode = [...webtoonDetail.episodes].sort((a,b) => a.episodeNumber - b.episodeNumber)[0];

        // 정렬된 목록의 첫 번째 에피소드(firstEpisode)가 존재하면(첫 화가 있다면) 해당 에피소드로 이동
        if (firstEpisode) {
            navigate(`/webtoon/${webtoonId}/episode/${firstEpisode.id}`);
        }
    };


    if (isLoading) {
        return <WebtoonDetailPageSkeleton />;
    }

    // 2. 에러가 발생했거나, 로딩이 끝났는데 데이터가 없을 때 공통 에러 페이지를 보여줍니다.
    if (error || !webtoonDetail) {
        return <ErrorPage message="해당 작품을 찾을 수 없습니다." />;
    }

    return (
        <div className="detail-page-container">
            <header className="detail-header">
                <img src={webtoonDetail.thumbnailUrl} alt={webtoonDetail.title} className="detail-thumbnail" />
                <div className="detail-info">
                    <h1>{webtoonDetail.title}</h1>
                    <p className="author">{webtoonDetail.author}</p>
                    <p className="description">
                        {webtoonDetail.description}
                    </p>

                    {/* 4. 첫 화 보기 버튼 추가 */}
                    <div className="detail-actions">

                        {/* 에피소드가 있을 때만 "첫 화 보기" 버튼이 보이도록 조건부 렌더링 */}
                        {hasEpisodes && (
                            <button className="first-episode-btn" onClick={handleFirstEpisodeClick}>
                                첫 화 보기
                            </button>
                        )}

                    </div>

                </div>
            </header>

            <div className="episode-list-header">
                {/* 5. 총 회차 수 및 정렬 버튼 추가 */}

                {/* 총 회차 수도 에피소드가 있을 때만 보이도록 설정 */}
                <span className="total-episodes">
                    {hasEpisodes ? `전체 (${webtoonDetail.totalEpisodes}화)` : '전체 (0화)'}
                </span>
                
                {/* 정렬 버튼도 에피소드가 있을 때만 보이도록 설정 */}
                {hasEpisodes && (
                    <button 
                        className="sort-button"
                        onClick={() => setSortOrder(prevOrder => prevOrder === 'desc' ? 'asc' : 'desc')}
                    >
                        {sortOrder === 'desc' ? '첫화부터' : '최신순'}
                    </button>
                )}

            </div>

            {/* 3. 에피소드 목록을 보여주기 전에 데이터가 있는지 확인 */}
            {hasEpisodes ? (
                <ul className="episode-list">
                    {sortedEpisodes.map(episode => (
                        <li key={episode.id} className="episode-item">
                            <Link to={`/webtoon/${webtoonId}/episode/${episode.id}`}>
                                <img src={episode.thumbnailUrl} alt={episode.title} className="episode-thumbnail" />
                                <div className="episode-details">
                                    <span className="title">{episode.episodeNumber}화. {episode.title}</span>
                                    <span className="date">
                                        {new Date(episode.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                // 4. 에피소드가 없으면, 목록 대신 안내 문구를 보여줍니다.
                <div className="no-episodes-message">
                    첫 번째 에피소드를 곧 만나보실 수 있습니다! 조금만 기다려주세요.
                </div>
            )}


        </div>
    );
}

export default WebtoonDetailPage;