import { ChangeEvent, useCallback } from "react";

export const InputBox = ({}: {
  title: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onchange(e);
  }, []);
  return (
    <div>
      <div>{title}</div>
      <input value={value}></input>
    </div>
  );
};
