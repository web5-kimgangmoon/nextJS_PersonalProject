import { useCallback, useState } from "react";

export const useInputText = (...inputItems: [string, string | undefined][]) => {
  const resultObj: {
    [key: string]: {
      value: string | undefined;
      set: (value: string) => void;
    };
  } = {};
  const [state, setState] = useState<{ [key: string]: string | undefined }>({});
  for (let item of inputItems) {
    resultObj[item[0]] = {
      value: state[item[0]],
      set: useCallback((value: string) => {
        setState((obj) => ({ ...obj, [item[0]]: value }));
      }, []),
    };
  }
  return resultObj;
};
