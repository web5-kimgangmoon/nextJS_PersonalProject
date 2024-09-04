"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/buttons";
import { useOnChangeResizeH } from "@/app/hooks/callback/onChangeResizeH";
import { useFormDataImg } from "@/app/hooks/state/formDataImg";
import { usePreview } from "@/app/hooks/effect/preview";
import { useDeleteImg } from "@/app/hooks/callback/deleteImg";
import Dompurity from "dompurify";
// import { Blob } from "buffer";

export const WriteCmt = ({}: //   id,
//   isBoard,
//   isOpen,
//   modalToggle,
{
  //   id: string;
  //   isBoard?: boolean;
  //   isOpen: boolean;
  //   modalToggle: () => void;
}) => {
  //   const router = useRouter();
  //   new FormData();
  //   const [reason, setReason] = useState<string>();
  //   const selectReason = useCallback((str: string) => {
  //     setReason(str);
  //   }, []);

  return (
    <WriteCmtComp
    //   setReason={selectReason}
    //   reason={reason}
    //   modalClose={modalToggle}
    //   isOpen={isOpen}
    />
  );
};

export const WriteCmtComp = () => {
  let isEnable = true;
  const placeholder = "아아아아아아";
  const idx = 2;
  const replyId = 3;
  const writeId = `cmtWrite${idx}`;
  const submit = () => {};

  const { uploadImg, formData, setFormData, onChangeText } = useFormDataImg();
  const { preview, setPreview } = usePreview(formData);
  const deleteImg = useDeleteImg(setPreview, setFormData, writeId);
  return (
    <div>
      <div className="border-4 border-borderGray rounded-t-lg p-2 text-base bg-white">
        {preview && (
          <div className="w-40 h-40 relative">
            <img src={preview} alt="no image" className="w-full h-full" />
            <div
              className="w-6 h-6 absolute top-2 right-2 border rounded-full border-black background-white"
              onClick={deleteImg}
            >
              <XMarkIcon className="w-full h-full" />
            </div>
          </div>
        )}
        <textarea
          rows={3}
          placeholder={placeholder}
          name={"text"}
          className="w-full h-full outline-none"
          onChange={onChangeText}
        />
      </div>
      <div className="border-4 border-t-0 border-borderGray rounded-b-lg p-2 flex justify-between bg-white items-center">
        <div className="flex">
          <input
            type={"file"}
            multiple={false}
            name={"img"}
            onChange={uploadImg}
            id={writeId}
            hidden
          />
          <div className="text-[#7F919E]/60 hover:text-mainBlue">
            <label htmlFor={writeId}>
              <div className="w-12 h-12">
                <PhotoIcon />
              </div>
            </label>
          </div>
          <div className="p-2 border-r-2"></div>
        </div>
        <div className="">
          <Button
            color={isEnable ? "blue" : "inactiveGray"}
            size="short"
            onClick={submit}
          >
            작성완료
          </Button>
        </div>
      </div>
    </div>
  );
};
