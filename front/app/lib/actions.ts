import { useQuery } from "@tanstack/react-query";
import { CmtListData, GetCmt } from "./definitions";
import { cmtData } from "./placeholder-data";
import serverAxios from "./serverActionAxios";

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
export const logout = () => {
  console.log("로그아웃했음");
};
export const login = (
  id: string,
  pwd: string,
  isAdminLogin: boolean,
  setLoginFail: () => void
) => {
  console.log("로그인 요청 보냄");
  setLoginFail();
};
export const regist = (
  nick: string,
  email: string,
  pwd: string,
  setRegistFail: () => void
) => {
  console.log("회원가입 보냈습니다");
  setRegistFail();
};
export const oauthLogin = (token: string, oauth: "google" | "facebook") => {
  console.log("token은 ", token);
};
