import { useEffect, useState } from 'react';

// 커스텀 Hook으로 함수 이름 변경
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 브라우저 환경에서만 실행되도록 확인
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize); // 리사이즈 이벤트 리스너 추가
      handleResize(); // 초기 실행 시 한 번 호출하여 현재 크기 설정

      return () => window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 클린업
    }
  }, []);

  return windowSize; // 현재 윈도우 크기 반환
};