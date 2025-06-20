import apiClient from './client'; // 방금 만든 공통 axios 인스턴스를 가져옵니다.

// ==================== 메인페이지(HomePage.js) 관련 API 함수 ===========================================================================================================================

// 메인 배너 (추천) 웹툰 데이터를 가져오는 API 함수
export const fetchFeaturedWebtoon = async () => {
    // try-catch는 이 함수를 호출하는 컴포넌트에서 처리하도록, 여기서는 순수한 데이터 요청만 합니다.
    const response = await apiClient.get('/api/webtoons?category=featured');
    return response.data; // 컴포넌트에서는 response 객체 전체가 아닌, 실제 데이터(data)만 받도록 처리
};

// 오늘의 업데이트 웹툰 데이터를 가져오는 API 함수
export const fetchTodayWebtoons = async () => {
    const response = await apiClient.get('/api/webtoons?category=today');
    return response.data;
};

// 인기 TOP 5 웹툰 데이터를 가져오는 API 함수
export const fetchPopularWebtoons = async () => {
    const response = await apiClient.get('/api/webtoons?category=popular');
    return response.data;
};


// ==================== 웹툰 상세 페이지(WebtoonDetailPage.js) 관련 API 함수 =============================================================================================================

export const fetchWebtoonDetail = async (webtoonId) => {
    const response = await apiClient.get(`/api/webtoons/${webtoonId}`);
    return response.data;
};

// ==================== 웹툰 뷰 페이지(EpisodeViewerPage.js) 관련 API 함수 ===============================================================================================================

export const fetchEpisodeData = async (episodeId) => {
    const response = await apiClient.get(`/api/episodes/${episodeId}`);
    return response.data;
};

// =====================================================================================================================================================================================