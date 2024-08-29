export const getTimeString = (ta: Date) => {
  const now = new Date();
  const dif = now.getTime() - ta.getTime();

  if (dif > 604800000) {
    return `${ta.getMonth() + 1}월 ${ta.getDate()}일, ${ta.getFullYear()}`;
  } else if (dif > 86400000) {
    return `${Math.ceil(dif / 86400000)}일 전`;
  } else if (dif > 3600000) {
    return `${Math.ceil(dif / 3600000)}시간 전`;
  } else {
    return `${Math.ceil(dif / 60000)}분 전`;
  }
};
