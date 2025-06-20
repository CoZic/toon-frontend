import { useState, useEffect } from 'react';

/**
 * API 호출을 위한 범용 커스텀 훅
 * @param {function} apiFunction - 실행할 API 함수 (예: fetchWebtoonDetail)
 * @param {any} params - API 함수에 전달할 파라미터 (예: webtoonId)
 * @returns {object} { data, isLoading, error }
 */
export function useFetch(apiFunction, params = null) {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // apiFunction이나 params가 변경될 때마다 다시 실행됩니다.
    useEffect(() => {
        // API를 호출하는 내부 함수
        const fetchData = async () => {

            setIsLoading(true);
            setData(null); // 새로운 로딩 시작 전, 이전 데이터 초기화
            setError(null);  // 에러 상태도 초기화

            try {

                // 파라미터로 받은 API 함수를 실행합니다.
                const result = await apiFunction(params);
                setData(result); // 성공 시 데이터 저장
                
            } catch (err) {
                setError(err);   // 실패 시 에러 저장
            } finally {
                setIsLoading(false); // 로딩 상태 종료
            }
        };

        fetchData();
    }, [apiFunction, params]); // apiFunction과 params가 바뀔 때만 재실행

    // 최종적으로 데이터와 로딩 상태, 에러를 객체 형태로 반환합니다.
    return { data, isLoading, error };
}