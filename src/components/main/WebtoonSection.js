// 오늘의 업데이트 같은 섹션을 보여주는 컴포넌트
import React from 'react';
import WebtoonCard from './WebtoonCard';

// '오늘의 업데이트' 같은 섹션 제목과 웹툰 목록을 받아서 전체 섹션을 보여주는 컴포넌트
function WebtoonSection({ title, webtoons }) {
    return (
        <section className="webtoon-section">
            <h2 className="section-title">
                {title}
            </h2>
            <div className="webtoon-list">
                {webtoons.map( webtoon => ( // webtoons 배열을 순회하면서 각 웹툰 정보를 WebtoonCard로 전달
                    <WebtoonCard
                        key={ webtoon.id } // key는 React가 목록을 효율적으로 관리하기 위해 필수
                        id={ webtoon.id }
                        title={ webtoon.title }
                        author={ webtoon.author }
                        thumbnailUrl={ webtoon.thumbnailUrl }
                    />
                ))}
            </div>
        </section>
    );
}

export default WebtoonSection;