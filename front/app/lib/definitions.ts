import { ReactNode } from "react";

export type Button = {
  isNobold?: boolean;
  color:
    | "pink"
    | "blue"
    | "blankBlue"
    | "blankRed"
    | "whiteRed"
    | "gray"
    | "blueGray"
    | "whiteGray"
    | "noneBlue"
    | "none";
  children?: string | ReactNode;
  radius?: "medium" | "little" | "a little" | "none" | "full";
  size?:
    | "bigFont"
    | "short"
    | "medium"
    | "small"
    | "smallest"
    | "pageImgBtn"
    | "pageBtn";
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
  isWriter: boolean;
  score: number;
  scoreUserCnt: number;
}
//"/baseBoardImg.png"
