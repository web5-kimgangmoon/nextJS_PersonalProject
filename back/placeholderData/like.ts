import Like from "../models/likeList";

export const createLike = async () => {
  const likeData: {
    cmtId: number;
    userId: number;
    isLike: boolean;
    isDislike: boolean;
  }[] = [];
  for (let i = 0; i < 10; i++) {
    // const random = Math.ceil(Math.random() * 6);
    for (let j = 0; j < 6; j++) {
      likeData.push({
        cmtId: i + 1,
        userId: j + 1,
        isLike: Math.round(Math.random()) === 1 ? true : false,
        isDislike: Math.round(Math.random()) === 1 ? true : false,
      });
    }
  }
  for (let item of likeData) {
    await Like.create(item);
  }
};
