export const boardDelete = (boardId: number) => {
  return "";
};

export const boardGiveScore = (score: number) => {
  console.log("게시글 평가 작동중");
  console.log(score);
  return "";
};

export const boardReport = (boardId: number, reasonId: number) => {};
export const cmtReport = (cmtId: number, reasonId: number) => {};
export const addCmt = (
  boardId: number,
  formData: FormData,
  replyId?: number
) => {};
