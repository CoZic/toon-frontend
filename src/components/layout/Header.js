// 공통 헤더
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 헤더 전용 CSS 파일을 import 합니다.

function Header() {
    return (
        <header className="site-header">
            <div className="header-container">

                {/* 1. 로고 */}
                <div className="logo">
                    <Link to="/">ToonFlix</Link>
                </div>

                {/* 2. 메인 내비게이션 */}
                <nav className="main-nav">
                    <Link to="/webtoons/daily">요일별</Link>
                    <Link to="/webtoons/popular">인기작</Link>
                    <Link to="/webtoons/new">신작</Link>
                </nav>

                {/* 3. 검색 및 사용자 메뉴 */}
                <div className="right-menu">
                    <div className="search-bar">
                        <input type="text" placeholder="제목, 작가로 검색" />
                        <button>검색</button>
                    </div>
                    <div className="user-actions">
                        <Link to="/login">로그인</Link>
                        <Link to="/register">회원가입</Link>
                    </div>
                </div>

            </div>
        </header>
    );
}

export default Header;