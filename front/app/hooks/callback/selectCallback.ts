import { Dispatch, SetStateAction, useCallback } from "react";

export const useSelectCallback = <T>(
  set: Dispatch<SetStateAction<string & Partial<T>>>,
  name: string & Partial<T>
) => {
  return useCallback(() => {
    set(name);
  }, [name, set]);
};
