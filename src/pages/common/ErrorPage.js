import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

function ErrorPage({ message }) {
  return (
    <div className="error-container">
      <h2>오류가 발생했습니다</h2>
      <p>{message || '페이지를 표시할 수 없습니다. 잠시 후 다시 시도해주세요.'}</p>
      <Link to="/" className="home-button">
        홈으로 돌아가기
      </Link>
    </div>
  );
}

export default ErrorPage;