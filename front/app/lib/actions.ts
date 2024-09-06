import { GetCmt } from "./definitions";

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
  formData: FormData,
  boardId?: number,
  replyId?: number
) => {
  console.log(formData.get("content"));
  console.log(formData.get("img"));
  console.log(boardId);
  console.log(replyId);
};
export const updateCmt = (cmtId: number, formData: FormData) => {
  console.log(formData.get("content"));
  console.log(formData.get("img"));
  console.log(cmtId);
};
export const deleteCmt = (cmtId: number) => {};
export const likeCmt = (cmtId: number, isDisLike: boolean) => {
  console.log(isDisLike);
  console.log(cmtId);
};
export const useMutation_getCmt = (data: GetCmt) => {
  return {
    mutate: async () => {
      console.log(data);
    },
    isPending: false,
    isSuccess: true,
    status: "success",
    data: [],
  };
};
