/*
    메인 상단 배너
*/
import React from 'react';

// props로 bannerData를 받도록 수정
function MainBanner({ bannerData }) {
    /*
    return (
        <div className="mainbanner-section">
            <div className="mainbanner-content">
                <h1>이번 주 최고 인기작!</h1>
                <p>놓치면 후회할 명작을 지금 바로 만나보세요.</p>
                <button className="mainbanner-button">첫 화 보기</button>
            </div>
        </div>
    );
    */

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
                <button className="mainbanner-button">첫 화 보기</button>
            </div>
        </div>
    );


}

export default MainBanner;