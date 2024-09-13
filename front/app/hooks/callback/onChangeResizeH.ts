import { ChangeEvent, useCallback } from "react";

export const useOnChangeResizeH = () =>
  useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight)
        e.currentTarget.style.height =
          String(e.currentTarget.scrollHeight) + "px";
    },
    []
  );
