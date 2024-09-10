import { useCallback, useState } from "react";

export const useToggle = (defaultValue: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultValue);

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
