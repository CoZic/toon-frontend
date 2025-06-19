import React from 'react';
import './CommonSkeleton.css'; // 반짝이는 애니메이션은 공통 CSS 재사용
import '../WebtoonDetailPage.css'; // 레이아웃은 상세 페이지 CSS 재사용

function WebtoonDetailPageSkeleton() {
  return (
    <div className="detail-page-container">
      <header className="detail-header">
        {/* 상세 정보 헤더 스켈레톤 */}
        <div className="skeleton-image detail-thumbnail"></div>
        <div className="detail-info">
          <div className="skeleton-text skeleton-long-title"></div>
          <div className="skeleton-text skeleton-author-name"></div>
          <div className="skeleton-text skeleton-desc-line"></div>
          <div className="skeleton-text skeleton-desc-line"></div>
          <div className="skeleton-text skeleton-desc-line short"></div>
        </div>
      </header>

      {/* 에피소드 목록 스켈레톤 */}
      <div className="episode-list-header">
        <div className="skeleton-text skeleton-total-ep"></div>
        <div className="skeleton-text skeleton-sort-btn"></div>
      </div>
      <ul className="episode-list">
        {/* 10개의 스켈레톤 에피소드 아이템을 렌더링 */}
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index} className="episode-item">
            <div className="skeleton-image episode-thumbnail"></div>
            <div className="episode-details">
                <div className="skeleton-text skeleton-ep-title"></div>
                <div className="skeleton-text skeleton-ep-date"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WebtoonDetailPageSkeleton;