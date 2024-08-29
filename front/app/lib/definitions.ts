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
    | "whiteGray"
    | "noneBlue"
    | "none";
  children?: string | ReactNode;
  radius?: "medium" | "little" | "a little" | "none";
  size?: "short" | "medium" | "small" | "smallest";
  onClick?: () => void;
};
