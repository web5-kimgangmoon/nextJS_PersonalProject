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

export const pageGetter = ({
  count,
  current,
  limit,
}: {
  count: number;
  current: number;
  limit: number;
}) => {
  if(count<6){
    if(current===count){
      if(count===1)
        else if(count>1)
    }
  }
  if(count>5){

  }
  "•••";
  return {pages:["1", "2","3"], selected:"4", isLeftArrow:true, isRightArrow:true}
};
