import { useEffect, useState } from "react";
export const usePreview = (formData: FormData | undefined) => {
  const [preview, setPreview] = useState<string>("");
  useEffect(() => {
    setPreview((value) => {
      let file;
      if (formData && (file = formData.get("img")) && file instanceof File) {
        URL.revokeObjectURL(value);
        return URL.createObjectURL(file);
      }
      return value;
    });
  }, [formData]);
  return { preview, setPreview };
};
