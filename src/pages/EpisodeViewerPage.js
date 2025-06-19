import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EpisodeViewerPage.css';
import LoadingPage from './common/LoadingPage';
import ErrorPage from './common/ErrorPage';
import FloatingNavButtons from '../components/viewer/FloatingNavButtons';

const ViewerNav = ({ isVisible, title, webtoonId, prevEpisodeId, nextEpisodeId, onNavClick }) => (
    <div className={`viewer-nav top ${!isVisible ? 'hidden' : ''}`}>
        <div className="viewer-nav-container">
            <h2 className="episode-title-nav">{title}</h2>
            <div className="nav-buttons">
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
    const [lastScrollY, setLastScrollY] = useState(0);

    // [수정 1] 데이터 로딩 전용 useEffect
    // 이 useEffect는 오직 episodeId가 변경될 때만 실행됩니다.
    useEffect(() => {
        const fetchEpisodeData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/episodes/${episodeId}`);
                setViewerData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchEpisodeData();
        window.scrollTo(0, 0);
    }, [episodeId]);

    // 스크롤 이벤트 핸들러는 useCallback으로 감싸서 불필요한 재생성을 방지합니다.
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;
        if (lastScrollY > currentScrollY || currentScrollY < 100) {
            setIsNavVisible(true);
        } else {
            setIsNavVisible(false);
        }
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    // [수정 2] 스크롤 이벤트 리스너 전용 useEffect
    // 이 useEffect는 handleScroll 함수가 변경될 때만 실행됩니다.
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        // 컴포넌트가 사라질 때 이벤트 리스너를 깨끗하게 정리합니다.
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleNavClick = (targetEpisodeId) => {
        if (targetEpisodeId) {
            navigate(`/webtoon/${webtoonId}/episode/${targetEpisodeId}`);
        }
    };

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
