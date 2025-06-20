// 메인페이지 상단 배너 스켈레톤 컴포넌트
import React from 'react';
import 'styles/Skeleton.css'; // 스켈레톤 전용 CSS import
import './MainBannerSkeleton.css'; // 메인 배너 스켈레톤 전용 CSS import

function MainBannerSkeleton() {
    return (
        <div className="mainbanner-skeleton skeleton-pulse"></div>
    );
}

export default MainBannerSkeleton;
