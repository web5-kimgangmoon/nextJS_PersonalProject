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
  radius?: "medium" | "little" | "a little" | "none";
  size?: "bigFont" | "short" | "medium" | "small" | "smallest";
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

//"/baseBoardImg.png"
