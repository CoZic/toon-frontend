/*
    메인 상단 배너
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';

// props로 bannerData를 받도록 수정
function MainBanner({ bannerData }) {

    // useNavigate 훅을 호출하여 페이지 이동 함수를 준비
    const navigate = useNavigate();

    // 버튼 클릭 시 실행될 핸들러 함수
    const handleFirstEpisodeClick = () => {
        // bannerData에 있는 id를 사용하여 상세 페이지 경로로 이동합니다.
        navigate(`/webtoon/${bannerData.id}`);
    };

    // 데이터가 없으면 아무것도 렌더링하지 않음 (오류 방지)
    if (!bannerData) {
        return null;
    }
    
    // 동적인 배경 이미지를 위한 스타일 객체
    const bannerStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bannerData.thumbnailUrl})`
    };

    return (
        // style 속성을 사용해 동적으로 배경 이미지 설정
        <div className="mainbanner-section" style={bannerStyle}>
            <div className="mainbanner-content">
                {/* h1과 p 태그의 내용도 props로 받은 데이터로 채움 */}
                <h1>{bannerData.title}</h1>
                <p>{bannerData.author} 작가의 인기작을 지금 바로 만나보세요.</p>
                <button className="mainbanner-button" onClick={handleFirstEpisodeClick}>첫 화 보기</button>
            </div>
        </div>
    );


}

export default MainBanner;