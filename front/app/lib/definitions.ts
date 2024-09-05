import { ReactNode } from "react";

export type ButtonColors =
  | "pink"
  | "blue"
  | "blankBlue"
  | "blankRed"
  | "whiteRed"
  | "gray"
  | "whiteGray"
  | "inactiveGray"
  | "noneBlue"
  | "none"
  | "blankInactive"
  | "onlyTextBlue"
  | "onlyTextRed"
  | "onlyTextInactive";
export type Button = {
  isNobold?: boolean;
  color: ButtonColors;
  children?: string | ReactNode;
  radius?: "medium" | "little" | "a little" | "none" | "full";
  size?:
    | "bigFont"
    | "short"
    | "medium"
    | "small"
    | "smallest"
    | "pageImgBtn"
    | "pageBtn"
    | "none";
  className?: string;
  onClick?: () => void;
};

export interface Board {
  commentNum: number;
  boardId: number;
  categoryPath: string;
  createdAt: Date;
  img: string;
  category: string;
  content: string;
  title: string;
  writer: string;
  writerId: number;
}

export interface CategoryBoard extends Board {
  isTop?: boolean;
}

export interface BoardDetail extends Board {
  isLogin: boolean;
  isWriter: boolean;
  score: number;
  scoreUserCnt: number;
  isGiveScore: boolean;
}
//"/baseBoardImg.png"

export interface Cmt {
  id: number;
  writer: string;
  writerId: number;
  writerProfile: string;
  createdAt: Date;
  content: string;
  like: number;
  dislike: number;
  isDoLike: boolean;
  isDoDislike: boolean;
  isDidReport: boolean;
  boardId: number;
  categoryPath: string;
  category: string;
  boardTitle: string;
  replyId?: number;
  replyUserId?: number;
  replyUser?: string;
}
export interface CmtData {
  cmtList: Array<Cmt>;
  cmtCnt: number;
}

export interface UserInfoData {
  id: number;
  profileImg: string;
  nick: string;
  email: string;
  cmtCnt: number;
  boardsCnt: number;
  like: number;
  dislike: number;
  createdAt: Date;
}
export interface Reason {
  id: number;
  title: string;
  description?: string;
}
export interface ReasonListData {
  reasonList: Reason[];
}
