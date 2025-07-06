import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        window.location.reload(); // 로그아웃 후 전체 리렌더링
    };

    return (
        <header className="site-header">
            <div className="header-container">

                {/* 로고 */}
                <div className="logo">
                    <Link to="/">ToonFlix</Link>
                </div>

                {/* 내비게이션 */}
                <nav className="main-nav">
                    <Link to="/webtoons/daily">요일별</Link>
                    <Link to="/webtoons/popular">인기작</Link>
                    <Link to="/webtoons/new">신작</Link>
                </nav>

                {/* 오른쪽 메뉴 */}
                <div className="right-menu">
                    <div className="search-bar">
                        <input type="text" placeholder="제목, 작가로 검색" />
                        <button>검색</button>
                    </div>

                    <div className="user-actions">
                        {isLoggedIn ? (
                            <>
                                <Link to="/mypage">마이페이지</Link> {/* ✅ 추가 */}
                                <button onClick={handleLogout}>로그아웃</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">로그인</Link>
                                <Link to="/register">회원가입</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
