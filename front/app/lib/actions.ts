import { CmtListData, GetCmt } from "./definitions";
import { cmtData } from "./placeholder-data";

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
export const useQuery_getCmt = (
  data: GetCmt
): {
  isLoading: boolean;
  isSuccess: boolean;
  status: string;
  data: CmtListData;
} => {
  return {
    isLoading: false,
    isSuccess: true,
    status: "success",
    data: {
      cmtCnt: cmtData.cmtCnt,
      cmtList:
        data.searh.sort === "like"
          ? cmtData.cmtList
              .sort((a, b) => {
                return b.like - a.like;
              })
              .slice(0, data.searh.limit)
          : data.searh.sort === "recently"
          ? cmtData.cmtList
              .sort((a, b) => {
                return a.createdAt.getTime() - b.createdAt.getTime();
              })
              .slice(0, data.searh.limit)
          : cmtData.cmtList
              .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
              .slice(0, data.searh.limit),
    },
  };
};
