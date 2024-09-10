import { ChangeEvent } from "react";
import { useZodCheckInput } from "@/app/hooks/zodCheckInput";
import { ZodBigInt, ZodBoolean, ZodDate, ZodNumber, ZodString } from "zod";
import { useToggle } from "../hooks/toggle";
import { ImgButton } from "./buttons";

export const InputBox = ({
  title,
  value,
  placeholder,
  type = "text",
  onChange,
  setIsOK,
  setIsNO,
  checkType,
}: {
  title: string;
  value: string;
  placeholder: string;
  type?: "text" | "number" | "password" | "email";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setIsNO: () => void;
  setIsOK: () => void;
  checkType: ZodString | ZodBoolean | ZodBigInt | ZodDate | ZodNumber;
}) => {
  const { errors, onChangeInput } = useZodCheckInput(
    setIsNO,
    setIsOK,
    onChange,
    checkType
  );
  const stretchError = useToggle(false);
  return (
    <div className="px-4 py-2 flex flex-col gap-2">
      <div className="text-textBlue text-sm">{title}</div>
      <input
        type={type}
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
        className="border-2 border-borderGray p-3 rounded-xl focus:border-mainBlue outline-none transition-colors"
      />
      <div className="text-alert">
        <div className="flex items-center gap-2">
          <div>{errors.length > 0 && errors[0].message}</div>
          {errors.length > 1 && (
            <ImgButton
              img={
                stretchError.is
                  ? "/noLineArrowReverse_red.svg"
                  : "/noLineArrow_red.svg"
              }
              size="small"
              color={"blankRed"}
              onClick={stretchError.toggle}
            >
              more
            </ImgButton>
          )}
        </div>
        <div className="flex flex-col gap-1">
          {stretchError.is &&
            errors
              .slice(1)
              .map((item, idx) => <div key={idx}>{item.message}</div>)}
        </div>
      </div>
    </div>
  );
};
