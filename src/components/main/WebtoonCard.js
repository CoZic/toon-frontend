/*
    썸네일과 제목, 작가 정보를 보여주는 웹툰 카드 컴포넌트
*/
import React from 'react';
import { Link } from 'react-router-dom'; // 클릭 시 페이지 이동을 위해 import

// 웹툰 하나의 정보를 받아서 카드 형태로 보여주는 컴포넌트
function WebtoonCard({ id, title, author, thumbnailUrl }) {
    return (
        // Link 컴포넌트로 감싸서 클릭 시 상세 페이지로 이동하도록 함
        <Link to={`/webtoon/${id}`} className="webtoon-card-link">
            <div className="webtoon-card">
                <img src={thumbnailUrl} alt={title} className="webtoon-thumbnail" />
                <div className="webtoon-info">
                    <h4 className="webtoon-title">{title}</h4>
                    <p className="webtoon-author">{author}</p>
                </div>
            </div>
        </Link>
    );
}

export default WebtoonCard;