import { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { useZodCheckInput } from "@/app/hooks/zodCheckInput";
import { ZodBigInt, ZodBoolean, ZodDate, ZodNumber, ZodString } from "zod";
import { useToggle } from "../hooks/toggle";
import { ImgButton } from "./buttons";
import clsx from "clsx";

export const InputBox = ({
  title,
  value,
  placeholder,
  type = "text",
  onChange,
  setIsOK,
  setIsNO,
  checkType,
  onSubmit,
  description,
  isUpdate,
}: {
  title: string | ReactNode;
  value: string;
  placeholder: string;
  type?: "text" | "number" | "password" | "email";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setIsNO: () => void;
  setIsOK: () => void;
  checkType: ZodString | ZodBoolean | ZodBigInt | ZodDate | ZodNumber;
  onSubmit?: (e: KeyboardEvent<HTMLInputElement>) => void;
  description?: string;
  isUpdate?: boolean;
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
      <div
        className={clsx(
          "text-sm font-bold",
          isUpdate ? "text-textGray" : "text-textBlue"
        )}
      >
        {title}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
        className={clsx(
          "border-[1.5px] border-borderGray px-3 py-2 focus:border-mainBlue outline-none transition-colors",
          isUpdate ? "rounded-md" : "rounded-xl"
        )}
        onKeyDown={onSubmit}
      />
      {description && (
        <div className="text-sm text-textGray">{description}</div>
      )}
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

export const InputBox_plain = ({
  title,
  value,
  placeholder,
  type = "text",
  onChange,
  onSubmit,
  description,
  isUpdate,
}: {
  title: string | ReactNode;
  value: string;
  placeholder: string;
  type?: "text" | "number" | "password" | "email";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: KeyboardEvent<HTMLInputElement>) => void;
  description?: string;
  isUpdate?: boolean;
}) => {
  return (
    <div className="px-4 py-2 flex flex-col gap-2">
      <div
        className={clsx(
          "text-sm font-bold",
          isUpdate ? "text-textGray" : "text-textBlue"
        )}
      >
        {title}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={clsx(
          "border-[1.5px] border-borderGray px-3 py-2 focus:border-mainBlue outline-none transition-colors",
          isUpdate ? "rounded-md" : "rounded-xl"
        )}
        onKeyDown={onSubmit}
      />
      {description && (
        <div className="text-sm text-textGray">{description}</div>
      )}
    </div>
  );
};
