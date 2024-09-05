import { useCallback, useState } from "react";

export const useToggleObj = (...toggleBoxs: [string, boolean][]) => {
  const toggleObj: {
    [key: string]: {
      is: boolean;
      toggle: () => void;
      close: () => void;
      open: () => void;
    };
  } = {};
  const defaultObj: { [key: string]: boolean } = {};
  for (let item of toggleBoxs) defaultObj[`isOpen_${item[0]}`] = item[1];

  const [isOpenObj, setisOpenObj] = useState<{ [key: string]: boolean }>(
    defaultObj
  );

  for (let item of toggleBoxs)
    toggleObj[`${item[0]}`] = {
      is: isOpenObj[`isOpen_${item[0]}`],
      toggle: useCallback(() => {
        setisOpenObj((value) => ({
          ...value,
          [`isOpen_${item[0]}`]: !value[`isOpen_${item[0]}`],
        }));
      }, []),
      open: useCallback(() => {
        setisOpenObj((value) => ({
          ...value,
          [`isOpen_${item[0]}`]: true,
        }));
      }, []),
      close: useCallback(() => {
        setisOpenObj((value) => ({
          ...value,
          [`isOpen_${item[0]}`]: false,
        }));
      }, []),
    };

  return { ...toggleObj };
};
