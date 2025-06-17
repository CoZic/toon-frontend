/*
    메인 상단 배너
*/
import React from 'react';

function MainBanner() {
    return (
        <div className="mainbanner-section">
            <div className="mainbanner-content">
                <h1>이번 주 최고 인기작!</h1>
                <p>놓치면 후회할 명작을 지금 바로 만나보세요.</p>
                <button className="mainbanner-button">첫 화 보기</button>
            </div>
        </div>
    );
}

export default MainBanner;