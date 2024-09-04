import { ChangeEvent, useCallback, useState } from "react";
import { useOnChangeResizeH } from "../callback/onChangeResizeH";
export const useFormDataImg = (...keys: string[]) => {
  const [formData, setFormData] = useState<FormData>(new FormData());
  const resize = useOnChangeResizeH();
  const uploadImg = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.item(0);
      setFormData((target) => {
        if (file && file instanceof File) {
          const formData = new FormData();
          let temp;
          for (let item of keys) {
            temp = target.get(item);
            temp && formData.set(item, temp);
          }
          temp = target.get("text");
          temp && formData.set("text", temp);
          formData.set("img", file);
          return formData;
        }
        return target;
      });
    },
    [formData]
  );
  const onChangeText = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    resize(e);
    formData.set("text", e.currentTarget.value);
    setFormData(formData);
    console.log(formData.get("text"));
    console.log(formData.get("img"));
  };
  return { uploadImg, formData, setFormData, onChangeText };
};
