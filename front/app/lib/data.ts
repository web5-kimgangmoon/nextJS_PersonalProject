import {
  CmtListData,
  GetBoardList,
  GetCategoryDetail,
  GetCategoryList,
  GetCmt,
} from "./definitions";
import { useQuery } from "@tanstack/react-query";
import serverAxios from "./serverActionAxios";

export const useQuery_getCmt = (get: GetCmt) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get", "cmt", "list"],
    queryFn: async () => {
      return await serverAxios.get(`/cmt/cmtList`, {
        params: {
          limit: get.searh.limit,
          onlyDeleted: get.searh.onlyDeleted,
          isOwn: get.searh.isOwn,
          isDeleted: get.searh.isDeleted,
          search: get.searh.search,
          boardId: get.searh.boardId,
          searchType: get.searh.searchType,
          sort: get.searh.sort,
        },
      });
    },
  });
  return { isLoading, data, refetch };
};

export const useQuery_getBoardReason = () =>
  // reasonType:
  // | "BAN"
  // | "CMT_REPORT"
  // | "CMT_DELETE"
  // | "BOARD_DELETE"
  // | "BOARD_REPORT"
  {
    const { isLoading, data } = useQuery({
      queryKey: ["get", "reason", "list", "BOARD_REPORT"],
      queryFn: async () => {
        return await serverAxios.get(`/reason/list`, {
          params: { reasonType: "BOARD_REPORT" },
        });
      },
    });
    return { isLoading, data };
  };
export const useQuery_getCmtReason = () =>
  // reasonType:
  //   | "BAN"
  //   | "CMT_REPORT"
  //   | "CMT_DELETE"
  //   | "BOARD_DELETE"
  //   | "BOARD_REPORT"
  {
    const { isLoading, data } = useQuery({
      queryKey: ["get", "reason", "list", "CMT_REPORT"],
      queryFn: async () => {
        return await serverAxios.get(`/reason/list`, {
          params: { reasonType: "CMT_REPORT" },
        });
      },
    });
    return { isLoading, data };
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

export const useQuery_getBoardDetail = (boardId: number) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["get", "board"],
    queryFn: async () => {
      return await serverAxios.get(`/board/${boardId}`);
    },
  });
  return { isLoading, data, refetch };
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
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["get", "board", "list", get.offset],
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
  return { isLoading, data, refetch };
};
export const useQuery_getUserInfo = (userId?: number) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["get", "userInfo"],
    queryFn: async () => {
      return await serverAxios.get(`/user${userId ? "/" + userId : ""}`);
    },
  });
  return { isLoading, data, refetch };
};
