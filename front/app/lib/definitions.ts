import { ReactNode } from "react";

export type Button = {
  nobold?: boolean;
  color:
    | "pink"
    | "blue"
    | "blankBlue"
    | "whiteRed"
    | "gray"
    | "blueGray"
    | "whiteGray";
  children: string | ReactNode;
  radius?: "medium" | "little";
  size?: "short" | "medium" | "small" | "smallest";
  onClick?: () => void;
};
