import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchEpisodeData } from 'api/webtoonApi';
import { toggleLikeForEpisode } from 'api/episodeApi';

import './EpisodeViewerPage.css';
import LoadingPage from 'components/feedback/LoadingPage';
import ErrorPage from 'components/feedback/ErrorPage';
import FloatingNavButtons from 'components/common/FloatingNavButtons';

// ViewerNav 컴포넌트는 에피소드 제목과 이전/다음 화로 이동하는 버튼을 포함합니다.
const ViewerNav = ({ isVisible, title, webtoonId, prevEpisodeId, nextEpisodeId, onNavClick, isLiked, likeCount, onLikeClick }) => (
    <div className={`viewer-nav top ${!isVisible ? 'hidden' : ''}`}>
        <div className="viewer-nav-container">
            <h2 className="episode-title-nav">{title}</h2>
            <div className="nav-buttons">
                {/* 좋아요 버튼과 카운트 추가 */}
                <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={onLikeClick}>
                    ♥ <span>{likeCount}</span>
                </button>

                <button onClick={() => onNavClick(prevEpisodeId)} disabled={!prevEpisodeId}>이전화</button>
                <button onClick={() => onNavClick(nextEpisodeId)} disabled={!nextEpisodeId}>다음화</button>
                <Link to={`/webtoon/${webtoonId}`}>목록으로</Link>
            </div>
        </div>
    </div>
);

function EpisodeViewerPage() {
    const { webtoonId, episodeId } = useParams();
    const navigate = useNavigate();

    const [viewerData, setViewerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [isNavVisible, setIsNavVisible] = useState(true);

    // 데이터 로딩용 useEffect
    useEffect(() => {
        const loadEpisodeData = async () => {

            setIsLoading(true);
            setViewerData(null); // 데이터 초기화

            try {

                const data = await fetchEpisodeData(episodeId);
                setViewerData(data);

            } catch (err) {
                console.error("콘텐츠 상세 정보 로딩 실패:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        loadEpisodeData();
        window.scrollTo(0, 0); // 이전/다음 화로 이동했을 때, 스크롤 위치가 그대로인 것을 방지하고 항상 페이지 맨 위에서 시작하도록 설정
    }, [episodeId]); // episodeId가 변경될 때(다음화'나 '이전화' 버튼을 눌러 URL의 episodeId가 바뀔 때) useEffect가 다시 실행
    
    
    // 스크롤 핸들러 로직을 '최상단' 여부만 체크하도록 단순화합니다.
    const handleScroll = useCallback(() => {
        // 스크롤 위치가 50px 미만일 때만 상단 바를 표시
        if (window.scrollY < 50) {
            setIsNavVisible(true);
        } else {
            setIsNavVisible(false);
        }
    }, []);

    // 스크롤 이벤트 리스너 전용 useEffect : 최상단일 경우에만 네비게이션 바를 표시
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        /*
            뒷정리 함수 (Cleanup 함수)
            useEffect 안에서 return하는 함수는 '뒷정리'를 담당
                useEffect가 다시 실행되기 직전에 실행되거나,
                컴포넌트가 화면에서 사라질 때 실행하여 이벤트 리스너 제거
       */
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]); // handleScroll은 useCallback으로 인해 재생성되지 않으므로, 이 effect도 최초 1회만 실행됨

    const handleNavClick = (targetEpisodeId) => {
        if (targetEpisodeId) {
            navigate(`/webtoon/${webtoonId}/episode/${targetEpisodeId}`);
        }
    };

    // '좋아요' 버튼 클릭 핸들러 (낙관적 업데이트 적용)
    const handleLikeClick = async () => {
        // 현재 상태를 미리 복사 (API 실패 시 롤백을 위해)
        const originalViewerData = viewerData;
        
        // 1. UI를 즉시 업데이트 (사용자는 바로 결과를 본다)
        setViewerData(prevData => ({
            ...prevData,
            liked: !prevData.liked,
            likeCount: prevData.liked ? prevData.likeCount - 1 : prevData.likeCount + 1
        }));

        try {
            // 2. 백그라운드에서 실제 API 호출
            await toggleLikeForEpisode(episodeId);
            // 성공 시 아무것도 안 함 (이미 UI는 바뀌어 있으므로)
        } catch (err) {
            // 3. 만약 API 호출이 실패하면, UI를 원래 상태로 되돌림
            console.error("좋아요 처리 실패:", err);
            alert("좋아요 처리에 실패했습니다. 다시 시도해주세요.");
            setViewerData(originalViewerData);
        }
    };

// ====================================================================================================================================================================================

    if (isLoading) return <LoadingPage />;
    if (error || !viewerData) return <ErrorPage message="해당 회차를 불러올 수 없습니다." />;

    return (
        <div className="viewer-page-wrapper">
            <ViewerNav
                isVisible={isNavVisible}
                title={viewerData.episodeTitle}
                webtoonId={webtoonId}
                prevEpisodeId={viewerData.prevEpisodeId}
                nextEpisodeId={viewerData.nextEpisodeId}
                onNavClick={handleNavClick}

                // 좋아요 관련 상태와 핸들러를 props로 전달
                isLiked={viewerData.liked}
                likeCount={viewerData.likeCount}
                onLikeClick={handleLikeClick}
            />

            <div className="viewer-webtoon-content">
                {viewerData.imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Episode page ${index + 1}`} className="viewer-image" />
                ))}
            </div>
            
            <FloatingNavButtons />
        </div>
    );
}

export default EpisodeViewerPage;
