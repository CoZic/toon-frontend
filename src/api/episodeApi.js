import apiClient from './client';

/**
 * 특정 에피소드의 뷰어 정보를 가져오는 API 함수
 * @param {string | number} episodeId
 */
export const fetchEpisodeViewer = async (episodeId) => {
    const response = await apiClient.get(`/api/episodes/${episodeId}`);
    return response.data;
};

/**
 * 특정 에피소드의 '좋아요' 상태를 토글하는 API 함수
 * @param {string | number} episodeId
 */
export const toggleLikeForEpisode = async (episodeId) => {
    // POST 요청으로 변경하고, 인증이 필요한 API이므로 나중에 헤더에 토큰을 추가해야 합니다.
    const response = await apiClient.post(`/api/episodes/${episodeId}/like`);
    return response.data;
};