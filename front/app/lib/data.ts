import { CmtListData, GetCmt } from "./definitions";
import { cmtData } from "./placeholder-data";
import { useQuery } from "@tanstack/react-query";

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
