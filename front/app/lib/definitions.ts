import { ReactNode } from "react";

export type Button = {
  isNobold?: boolean;
  color:
    | "pink"
    | "blue"
    | "blankBlue"
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

export type CategoryBoard = {
  isTop?: boolean;
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
};
export type setLocationTy = (value: {
  current: number;
  dif: number;
  translate: number;
}) => { current: number; dif: number; translate: number };
//"/baseBoardImg.png"
