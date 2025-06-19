import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './EpisodeViewerPage.css';
import LoadingPage from './common/LoadingPage';
import ErrorPage from './common/ErrorPage';

function EpisodeViewerPage() {
    const { webtoonId, episodeId } = useParams();
    const navigate = useNavigate();

    const [viewerData, setViewerData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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
        // 페이지 이동 시 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
    }, [episodeId]); // episodeId가 바뀔 때마다 (이전/다음화 이동 시) 다시 데이터를 가져옴

    const handleNavClick = (targetEpisodeId) => {
        if (targetEpisodeId) {
            navigate(`/webtoon/${webtoonId}/episode/${targetEpisodeId}`);
        }
    };

    if (isLoading) return <LoadingPage />;
    if (error || !viewerData) return <ErrorPage message="해당 회차를 불러올 수 없습니다." />;

    // 내비게이션 바 UI를 별도 컴포넌트로 분리
    const ViewerNav = () => (
        <div className="viewer-nav">
            <h2 className="episode-title-nav">{viewerData.episodeTitle}</h2>
            <div className="nav-buttons">
                <button 
                    onClick={() => handleNavClick(viewerData.prevEpisodeId)} 
                    disabled={!viewerData.prevEpisodeId}
                >
                    이전화
                </button>
                <button 
                    onClick={() => handleNavClick(viewerData.nextEpisodeId)} 
                    disabled={!viewerData.nextEpisodeId}
                >
                    다음화
                </button>
                <Link to={`/webtoon/${webtoonId}`}>목록으로</Link>
            </div>
        </div>
    );

    return (
        <div className="viewer-container">
            <ViewerNav />
            <div className="viewer-webtoon">
                {viewerData.imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`Episode page ${index + 1}`} className="viewer-image" />
                ))}
            </div>
            <ViewerNav /> {/* 하단에도 내비게이션 바 추가 */}
        </div>
    );
}

export default EpisodeViewerPage;