import { ChangeEvent, useCallback, useState } from "react";
import { useOnChangeResizeH } from "./callback/onChangeResizeH";
import { newCopyFormData } from "@/app/lib/utils";

export const useFormDataImg = (
  defaultText: string,
  resizeHeight: number,
  ...keys: string[]
) => {
  const fileType = ["image/jpeg", "image/png", "image/gif", "image/webp"];

  const [formData, setFormData] = useState<FormData>(new FormData());
  const [text, setText] = useState<string>(defaultText);
  const resize = useOnChangeResizeH(resizeHeight);
  const uploadImg = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.item(0);
      setFormData((target) => {
        if (
          file &&
          file instanceof File &&
          fileType.find((item) => item === file.type)
        ) {
          const formData = newCopyFormData(target, keys);
          formData.set("img", file);
          return formData;
        }
        return target;
      });
    },
    [keys]
  );
  const onChangeText = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      resize(e);
      setText(e.currentTarget.value);
    },
    []
  );
  return { uploadImg, formData, setFormData, onChangeText, setText, text };
};
