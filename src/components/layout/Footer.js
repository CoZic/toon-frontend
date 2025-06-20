// 공통 푸터
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // 푸터 전용 CSS 파일을 import 합니다.

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/about">서비스 소개</Link>
          <Link to="/terms">이용약관</Link>
          <Link to="/privacy">개인정보처리방침</Link>
          <Link to="/contact">고객센터</Link>
        </div>
        <div className="footer-info">
          <p>(주)툰플릭스 | 대표: 김형진, 박성호 | 사업자등록번호: 123-45-67890</p>
          <p>주소: 서울특별시 강남구 테헤란로 123, 45층</p>
        </div>
        <div className="footer-copyright">
          {/* 현재 연도를 동적으로 표시합니다. */}
          &copy; {new Date().getFullYear()} ToonFlix. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;