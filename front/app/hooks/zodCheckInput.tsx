import { ChangeEvent, useCallback, useState } from "react";
import {
  ZodIssue,
  ZodString,
  ZodBoolean,
  ZodBigInt,
  ZodDate,
  ZodNumber,
} from "zod";

export const useZodCheckInput = (
  setNO: () => void,
  setOK: () => void,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  zodChecker: ZodString | ZodBoolean | ZodBigInt | ZodDate | ZodNumber
) => {
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const check = zodChecker.safeParse(e.currentTarget.value);
      if (!check.success) {
        setErrors(check.error.errors);
        setNO();
      } else {
        setOK();
        setErrors([]);
      }
      onChange(e);
    },
    [setOK, setNO, onChange, zodChecker]
  );
  return { errors, onChangeInput };
};

export const useZodCheckTextArea = (
  setNO: () => void,
  setOK: () => void,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  zodChecker: ZodString | ZodBoolean | ZodBigInt | ZodDate | ZodNumber
) => {
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const onChangeInput = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const check = zodChecker.safeParse(e.currentTarget.value);
      if (!check.success) {
        setErrors(check.error.errors);
        setNO();
      } else {
        setOK();
        setErrors([]);
      }
      onChange(e);
    },
    [setOK, setNO, onChange, zodChecker]
  );
  return { errors, onChangeInput };
};
