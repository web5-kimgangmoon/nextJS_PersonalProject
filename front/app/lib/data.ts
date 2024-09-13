import axios from "axios";
import {
  CmtListData,
  GetBoardList,
  GetCategoryDetail,
  GetCategoryList,
  GetCmt,
} from "./definitions";
import { cmtData } from "./placeholder-data";
import { useQuery } from "@tanstack/react-query";
import serverAxios from "./serverActionAxios";

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

export const useQuery_getCategoryDetail = (get: GetCategoryDetail) => {
  const { isLoading, data } = useQuery({
    queryKey: ["get", "category"],
    queryFn: async () => {
      return await serverAxios.get(`/category/${get.search.category}`);
    },
  });
  return { isLoading, data };
};

export const useQuery_getCategories = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get", "categories"],
    queryFn: async () => {
      return await serverAxios.get("/categories");
    },
  });
  return { isLoading, data };
};
export const useQuery_getBoardList = (get: GetBoardList) => {
  const { isLoading, data } = useQuery({
    queryKey: ["get", "board", "list"],
    queryFn: async () => {
      return await serverAxios.get("/board/list", {
        params: {
          category: get.category,
          offset: get.offset,
          limit: get.limit,
          isOwn: get.isOwn,
          isDeleted: get.isDeleted,
          search: get.search,
          searchType: get.searchType,
        },
      });
    },
  });
  return { isLoading, data };
};
export const useQuery_getUserInfo = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["get", "userInfo"],
    queryFn: async () => {
      return await serverAxios.get("/user");
    },
  });
  return { isLoading, data };
};
