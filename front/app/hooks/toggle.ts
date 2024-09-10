import { useCallback, useState } from "react";

export const useToggle = (toggleSet: [string, boolean]) => {
  const defaultObj: { [key: string]: boolean } = {};
  defaultObj[`isOpen_${toggleSet[0]}`] = toggleSet[1];

  const [isOpen, setIsOpen] = useState<boolean>(toggleSet[1]);

  return {
    is: isOpen,
    toggle: useCallback(() => {
      setIsOpen((value) => !value);
    }, []),
    open: useCallback(() => {
      setIsOpen(true);
    }, []),
    close: useCallback(() => {
      setIsOpen(false);
    }, []),
  };
};
