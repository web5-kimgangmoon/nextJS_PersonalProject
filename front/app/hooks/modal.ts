import { useCallback, useState } from "react";
import { useToggle } from "./toggle";

export const useModalText = () => {
  const toggle = useToggle(false);
  const [text, setText] = useState<string>("");
  const openText = useCallback((text: string) => {
    toggle.open();
    setText(text);
  }, []);
  return { ...toggle, text, setText, openText };
};
