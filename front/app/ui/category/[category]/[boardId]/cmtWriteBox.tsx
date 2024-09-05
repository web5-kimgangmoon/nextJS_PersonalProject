"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/buttons";
import { useFormDataImg } from "@/app/hooks/formDataImg";
import { usePreview } from "@/app/hooks/preview";
import { useDeleteImg } from "@/app/hooks/callback/deleteImg";
import { newCopyFormData, pushedFormData } from "@/app/lib/utils";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { categoryInfo as categoryInfoHolder } from "@/app/lib/placeholder-data";
import { addCmt, updateCmt } from "@/app/lib/actions";
// import { Blob } from "buffer";

export const WriteCmt = ({
  boardId,
  replyId,
  isOpen,
  cmtId,
  isUpdate,
  baseText,
  img,
  modalToggle,
}: {
  boardId?: number;
  replyId?: number;
  isOpen: boolean;
  cmtId?: number;
  isUpdate?: boolean;
  baseText?: string;
  img?: string;
  modalToggle?: () => void;
}) => {
  const categoryInfo = categoryInfoHolder;
  const imgBtnId = `cmtWrite${
    replyId ? `Reply${replyId}` : cmtId ? cmtId : "Plain"
  }`;
  const request = useCallback((formData: FormData) => {
    isUpdate && cmtId
      ? updateCmt(cmtId, formData)
      : boardId
      ? addCmt(formData, boardId)
      : addCmt(formData, replyId);
  }, []);
  return (
    <WriteCmtComp
      isOpen={isOpen}
      placeholder={categoryInfo.cmtPlacholder}
      imgBtnId={imgBtnId}
      request={request}
      modalToggle={modalToggle}
      baseText={baseText}
      img={img}
    />
  );
};

export const WriteCmtComp = ({
  request,
  isOpen,
  placeholder,
  imgBtnId,
  baseText,
  img,
  modalToggle,
}: {
  request: (formData: FormData) => void;
  isOpen: boolean;
  placeholder: string;
  imgBtnId: string;
  baseText?: string;
  img?: string;
  modalToggle?: () => void;
}) => {
  const router = useRouter();
  const { uploadImg, formData, setFormData, onChangeText, text } = img
    ? useFormDataImg(baseText ? baseText : "", "isDeleteImg")
    : useFormDataImg(baseText ? baseText : "");
  const { preview, setPreview } = usePreview(formData);
  const deleteImg = useDeleteImg(
    setPreview,
    setFormData,
    imgBtnId,
    "isDeleteImg"
  );
  const submit = useCallback(() => {
    request(pushedFormData(formData, [{ name: "content", value: text }]));
    modalToggle && modalToggle();

    router.refresh();
  }, [formData, text]);
  return (
    <div hidden={!isOpen} className="w-full h-full">
      <div className="border-4 border-borderGray rounded-t-[2.5rem] p-5 text-base bg-white">
        {preview && (
          <div className="w-40 h-40 relative">
            <img src={preview} alt="no image" className="w-full h-full" />
            <div
              className="w-6 h-6 absolute top-2 right-2 border rounded-full border-black bg-white"
              onClick={deleteImg}
            >
              <XMarkIcon className="w-full h-full" strokeWidth={4} />
            </div>
          </div>
        )}
        {!preview && img && formData.get("isDeleteImg") !== "true" && (
          <div className="w-40 h-40 relative">
            <img src={img} alt="no image" className="w-full h-full" />
            <div
              className="w-6 h-6 absolute top-2 right-2 border rounded-full border-black bg-white"
              onClick={() => {
                let temp = newCopyFormData(formData, ["img", "isDeleteImg"]);
                temp.set("isDeleteImg", "true");
                setFormData(temp);
              }}
            >
              <XMarkIcon className="w-full h-full" strokeWidth={4} />
            </div>
          </div>
        )}
        <textarea
          rows={3}
          placeholder={placeholder}
          name={"text"}
          className="w-full h-full outline-none"
          onChange={onChangeText}
          defaultValue={baseText}
        />
      </div>
      <div className="border-4 border-t-0 border-borderGray rounded-b-[2.5rem] px-5 py-2 flex justify-between bg-white items-center">
        <div className="flex">
          <input
            type={"file"}
            multiple={false}
            name={"img"}
            onChange={uploadImg}
            id={imgBtnId}
            hidden
          />
          <div className="text-[#7F919E]/60 hover:text-mainBlue">
            <label htmlFor={imgBtnId}>
              <div className="w-12 h-12">
                <PhotoIcon />
              </div>
            </label>
          </div>
          <div className="p-2 border-r-2"></div>
        </div>
        <div className="">
          <Button
            color={
              formData.get("img") ||
              text ||
              (formData.get("isDeleteImg") !== "true" && img)
                ? "blue"
                : "inactiveGray"
            }
            size="medium"
            onClick={
              formData.get("img") ||
              text ||
              (formData.get("isDeleteImg") !== "true" && img)
                ? submit
                : undefined
            }
            className="py-2"
          >
            작성완료
          </Button>
        </div>
      </div>
    </div>
  );
};
