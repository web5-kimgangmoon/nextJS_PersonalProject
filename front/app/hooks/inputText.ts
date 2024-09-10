import { useCallback, useState } from "react";

export const useInputText = <T>(
  ...inputItems: [Exclude<(string & T) | "all", "all">, string | undefined][]
) => {
  const resultObj: {
    [key: string]: {
      value: string | undefined;
      set: (value: string) => void;
    };
  } = {};
  const valueObj: { [key: string]: string | undefined } = {};
  for (let item of inputItems) {
    valueObj[item[0]] = item[1];
  }

  const [state, setState] = useState<{ [key: string]: string | undefined }>(
    valueObj
  );
  for (let item of inputItems) {
    resultObj[item[0]] = {
      value: state[item[0]],
      set: useCallback((value: string) => {
        setState((obj) => ({ ...obj, [item[0]]: value }));
      }, []),
    };
  }
  return {
    ...resultObj,
    all: {
      value: state,
      set: useCallback((target: { [key: string]: string | undefined }) => {
        setState(target);
      }, []),
    },
  };
};
