import { newCopyFormData } from "@/app/lib/utils";
import { Dispatch, SetStateAction, useCallback } from "react";

export const useDeleteImg = (
  setPreview: Dispatch<SetStateAction<string>>,
  setFormData: Dispatch<SetStateAction<FormData>>,
  targetId: string,
  ...keys: string[]
) =>
  useCallback(() => {
    setPreview((value) => {
      if (value) URL.revokeObjectURL(value);
      return "";
    });
    setFormData((value) => {
      // value.delete("img");
      // return value;
      return newCopyFormData(value, keys);
    });
    const target = document.getElementById(targetId);
    if (target instanceof HTMLInputElement) target.value = "";
  }, [keys, setFormData, setPreview, targetId]);
