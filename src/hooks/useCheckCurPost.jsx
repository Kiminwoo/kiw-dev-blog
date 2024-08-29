import { useEffect, useState } from 'react';

/**
 * 포스팅된 날짜와 현재 날짜를 비교하여 최신 포스트인지 여부를 판단합니다.
 * @param {string} dataPublished - 포스팅된 날짜 (형식: "YYYY-MM-DD")
 * @return {boolean} - true : 최신 포스트, false : 최신이 아닌 포스트
 */
const useCheckCurPost = (dataPublished) => {
  const [isRecent, setIsRecent] = useState(false); // 기본값을 false로 설정

  useEffect(() => {
    const today = new Date();
    const publishedDay = dataPublished.split('-');

    if (
      String(today.getFullYear()) === publishedDay[0] &&
      String(today.getMonth() + 1) === publishedDay[1] &&
      Number(today.getDate()) - Number(publishedDay[2]) < 4
    ) {
      setIsRecent(true);
    } else {
      setIsRecent(false);
    }
  }, [dataPublished]); // dataPublished에 대한 의존성 추가

  return isRecent;
};

export default useCheckCurPost;
