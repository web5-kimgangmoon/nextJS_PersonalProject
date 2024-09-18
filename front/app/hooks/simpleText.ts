import { ChangeEvent, useCallback, useState } from "react";

export const useSimpleText = (defaultValue: string) => {
  const [text, setText] = useState<string>(defaultValue);
  return {
    text,
    setText: useCallback(
      (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.currentTarget.value);
      },
      []
    ),
    plainSet: setText,
  };
};
