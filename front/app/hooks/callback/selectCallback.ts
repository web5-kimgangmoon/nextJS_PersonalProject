import { Dispatch, SetStateAction, useCallback } from "react";

export const useSelectCallback = <T>(
  set: Dispatch<SetStateAction<T & string>>,
  frontName: string,
  ...options: Array<T & string>
) => {
  const callbackObj: { [key: string]: () => void } = {};
  for (let item of options) {
    callbackObj[`${frontName}${item[0].toUpperCase() + item.slice(1)}`] =
      useCallback(() => {
        set(item);
      }, []);
  }
  return callbackObj;
};
