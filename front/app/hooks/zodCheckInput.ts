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
  setBtnIsActive: (isActive: boolean) => void,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,

  zodChecker: ZodString | ZodBoolean | ZodBigInt | ZodDate | ZodNumber
) => {
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const onChangeInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const check = zodChecker.safeParse(e.currentTarget.value);
    if (!check.success) {
      setErrors(check.error.errors);
      setBtnIsActive(false);
    } else {
      onChange(e);
      setBtnIsActive(true);
    }
  }, []);
  return { errors, onChangeInput };
};

export const useZodCheckTextArea = (
  setBtnIsActive: (isActive: boolean) => void,
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  zodChecker: ZodString | ZodBoolean | ZodBigInt | ZodDate | ZodNumber
) => {
  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const onChangeInput = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    const check = zodChecker.safeParse(e.currentTarget.value);
    if (!check.success) {
      setErrors(check.error.errors);
      setBtnIsActive(false);
    } else {
      onChange(e);
      setBtnIsActive(true);
    }
  }, []);
  return { errors, onChangeInput };
};
