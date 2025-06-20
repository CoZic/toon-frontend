/*
    스켈레톤 로더(Skeleton Loader)란?
        실제 데이터가 채워지기 전에, 데이터가 들어갈 자리의 **'뼈대'나 '윤곽'**을 먼저 회색 상자 등으로 보여주는 기법입니다. 
        유튜브나 페이스북에서 콘텐츠가 로딩될 때 회색 박스들이 먼저 뜨는 것을 보셨을 텐데, 바로 그것입니다.


    장점:
        사용자 안정감: 사용자는 무엇이 어디에 나타날지 미리 예측할 수 있어 안정감을 느낍니다.
        체감 로딩 속도 향상: 아무것도 없는 흰 화면보다 로딩이 더 빠르다고 느끼게 만듭니다.
        레이아웃 쉬프트(Layout Shift) 방지: 콘텐츠가 로딩된 후에도 화면 레이아웃이 갑자기 변하지 않아 눈이 편안합니다.
*/
import React from 'react';
import './WebtoonCardSkeleton.css';
import 'styles/Skeleton.css';

function WebtoonCardSkeleton() {
    return (
        <div className="skeleton-card">
            <div className="skeleton-image skeleton-pulse"></div>
            <div className="skeleton-info">
                <div className="skeleton-text skeleton-title skeleton-pulse"></div>
                <div className="skeleton-text skeleton-author skeleton-pulse"></div>
            </div>
        </div>
    );
}

export default WebtoonCardSkeleton;
