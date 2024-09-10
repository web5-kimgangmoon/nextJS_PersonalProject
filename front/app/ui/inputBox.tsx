import { ChangeEvent } from "react";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { useZodCheckInput } from "@/app/hooks/zodCheckInput";

export const InputBox = ({
  title,
  value,
  placeholder,
  onChange,
  setBtnIsActive,
}: {
  title: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setBtnIsActive: (isActive: boolean) => void;
}) => {
  const { nickCheck } = useTypeCheck_zod();
  const { errors, onChangeInput } = useZodCheckInput(
    setBtnIsActive,
    onChange,
    nickCheck
  );
  return (
    <div className="px-2 py-4 flex flex-col gap-2">
      <div className="text-textBlue">{title}</div>
      <input
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
      ></input>
      <div className="text-alert">
        {errors.map((item, idx) => (
          <div key={idx}>{item.message}</div>
        ))}
      </div>
    </div>
  );
};
