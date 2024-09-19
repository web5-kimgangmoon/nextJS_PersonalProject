import { ReactNode } from "react";

export type ButtonColors =
  | "pink"
  | "blue"
  | "blankBlue"
  | "blankRed"
  | "red"
  | "gray"
  | "whiteBlue"
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

export interface ILocation {
  current: number;
  dif: number;
  translate: number;
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
  cmtPlaceholder: string;
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
  id: number;
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
  boardCnt: number;
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
  replyId?: number | null;
  replyUserId?: number | null;
  replyUser?: string | null;
  containCmt?: Array<CmtItem> | null;
  isDeleted: boolean;
}
export interface CmtListData {
  cmtList: Array<CmtItem>;
  cmtCnt: number;
}

export interface UserInfoData {
  userInfo?: {
    id: number;
    profileImg: string | null;
    nick: string;
    email: string;
    cmtCnt: number;
    boardsCnt: number;
    like: number;
    dislike: number;
    createdAt: Date;
  } | null;
}

export interface Reason {
  id: number;
  title: string;
  description?: string | null;
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
    isFlat?: boolean;
    writerId?: number;
  };
}

export interface GetCategoryDetail {
  search: { category: string | "inform" };
}
export interface GetBoardList {
  category: string | "inform" | null;
  offset: string | null;
  limit: string | null;
  isOwn: string | null;
  writerId?: string;
  isDeleted: string | null;
  search: string | null;
  searchType: string | "content" | "title" | "contentTitle" | "writer" | null;
  onlyDeleted?: boolean;
}
export interface GetUserInfo {}
export interface GetCategoryList {}
