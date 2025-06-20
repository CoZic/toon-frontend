// 웹툰 뷰어 네이게이션

import React from 'react';
import './FloatingNavButtons.css';

function FloatingNavButtons() {

    // 맨 위로 스크롤하는 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 스크롤
        });
    };

    // 맨 아래로 스크롤하는 함수
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <div className="floating-buttons-container">
            <button onClick={scrollToTop} title="맨 위로">
                <span>↑</span>
            </button>
            <button onClick={scrollToBottom} title="맨 아래로">
                <span>↓</span>
            </button>
        </div>
    );
}

export default FloatingNavButtons;