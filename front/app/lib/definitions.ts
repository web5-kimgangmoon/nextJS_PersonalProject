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
  | "onlyTextInactive"
  | "logoBtn";
export interface Button {
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
}
export interface CategoryInformBoard {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  writer: string;
  writerId: number;
  cmtCnt: number;
  img: string;
}
export interface CategoryDetailData {
  path: string;
  name: string;
  img: string;
  description: string;
  cmtPlacholder: string;
  titlePlaceholder: string;
  descriptionPlaceholder: string;
  contentPlaceholder: string;
  boardCnt: number;
  rules: Array<string>;
  informBoard: CategoryInformBoard;
}
export interface CategoryInfo {
  path: string;
  name: string;
  img: string;
  description: string;
}

export interface CategoryListData {
  categories: Array<CategoryInfo>;
}

export interface BoardItem {
  id: number;
  title: string;
  createdAt: Date;
  isUpdated: boolean;
  writer: string;
  writerId: number;
  cmtCnt: number;
  img: string;
  score: number;
  scoreUserCnt: number;
  categoryPath: string;
  category: string;
  description: string;
}

export interface BoardListData {
  boardList: BoardItem[];
}

export interface BoardDetailData {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  isUpdated: boolean;
  writer: string;
  writerId: number;
  cmtCnt: number;
  img: string;
  score: number;
  scoreUserCnt: number;
  isGiveScore: boolean;
  isDidReport: boolean;
  description: string;
  category: string;
  categoryPath: string;
}
//"/baseBoardImg.png"

export interface CmtItem {
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
  containCmt?: Array<CmtItem>;
}
export interface CmtListData {
  cmtList: Array<CmtItem>;
  cmtCnt: number;
}

export interface UserInfoData {
  userInfo?: {
    id: number;
    profileImg: string;
    nick: string;
    email: string;
    cmtCnt: number;
    boardsCnt: number;
    like: number;
    dislike: number;
    createdAt: Date;
  };
}

export interface Reason {
  id: number;
  title: string;
  description?: string;
}
export interface ReasonListData {
  reasonList: Reason[];
}

export interface GetCmt {
  searh: {
    limit: number;
    onlyDeleted: boolean;
    isOwn: boolean;
    isDeleted: boolean;
    search: string | null;
    boardId: number | null;
    searchType: "content" | "writer" | "contentWriter" | null;
    sort: "like" | "recently" | "old" | null;
  };
}
