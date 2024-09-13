import Score from "../models/scoreList";

export const createScore = async () => {
  const scoreData: {
    boardId: number;
    userId: number;
    score: number;
  }[] = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 6; j++) {
      Math.round(Math.random()) === 1 &&
        scoreData.push({
          boardId: i + 1,
          userId: j + 1,
          score: Math.ceil(Math.random() * 5),
        });
    }
  }
  for (let item of scoreData) {
    await Score.create(item);
  }
};
