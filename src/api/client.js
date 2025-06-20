import axios from 'axios';

// 공통 설정을 가진 axios 인스턴스 생성
const apiClient = axios.create({
    // baseURL: API의 기본 URL을 설정합니다.
    // 현재는 React의 proxy를 사용하므로 '/'로 설정해도 무방합니다.
    // 나중에 실제 서버 주소가 생기면 'https://api.my-toon.com' 과 같이 변경할 수 있습니다.
    baseURL: '/', 
    // 타임아웃 등 다른 공통 설정도 추가 가능
    // timeout: 1000, 
});

export default apiClient;