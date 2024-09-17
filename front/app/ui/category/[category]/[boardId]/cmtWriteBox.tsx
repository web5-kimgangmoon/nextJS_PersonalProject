"use client";

import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/buttons";
import { useFormDataImg } from "@/app/hooks/formDataImg";
import { usePreview } from "@/app/hooks/preview";
import { useDeleteImg } from "@/app/hooks/callback/deleteImg";
import { newCopyFormData, pushedFormData } from "@/app/lib/utils";
import { KeyboardEvent, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAddCmt, useUpdateCmt } from "@/app/lib/actions";
import Image from "next/image";
import { useQuery_getCategoryDetail } from "@/app/lib/data";
import { LoadingSpin } from "@/app/ui/loadingSpin";
import { useQueryClient } from "@tanstack/react-query";
import { useModalText } from "@/app/hooks/modal";
import { Modal_little } from "@/app/ui/modal";
// import { Blob } from "buffer";

export const WriteCmt = ({
  boardId,
  replyId,
  isOpen,
  cmtId,
  isUpdate,
  baseText,
  img,
  modalClose,
}: {
  boardId?: number;
  replyId?: number;
  isOpen: boolean;
  cmtId?: number;
  isUpdate?: boolean;
  baseText?: string;
  img?: string;
  modalClose?: () => void;
}) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const categoryInfo = useQuery_getCategoryDetail({
    search: { category: String(params.category) },
  });
  const imgBtnId = `cmtWrite${
    replyId ? `Reply${replyId}` : cmtId ? cmtId : "Plain"
  }`;
  const modalText = useModalText();
  const updateCmt = useUpdateCmt(
    () => queryClient.refetchQueries({ queryKey: ["get", "cmt", "list"] }),
    modalText.openText
  );
  const addCmt = useAddCmt(() => {
    queryClient.refetchQueries({ queryKey: ["get", "cmt", "list"] });
    queryClient.refetchQueries({ queryKey: ["get", "board"] });
  }, modalText.openText);
  const request = useCallback(
    async (formData: FormData) => {
      isUpdate && cmtId
        ? await updateCmt.mutate({ formData, cmtId })
        : boardId
        ? await addCmt.mutate({ formData, boardId })
        : await addCmt.mutate({ formData, replyId });
    },
    [boardId, cmtId, isUpdate, replyId, addCmt, queryClient, updateCmt]
  );
  if (categoryInfo.isLoading)
    return <LoadingSpin bgColorClass="bg-categoryGray" />;
  return (
    <>
      <Modal_little closeModalCtl={modalText.close} modalCtl={modalText.is}>
        {modalText.text}
      </Modal_little>
      <WriteCmtComp
        isOpen={isOpen}
        placeholder={categoryInfo.data?.data.cmtPlaceholder}
        imgBtnId={imgBtnId}
        request={request}
        modalClose={modalClose}
        baseText={baseText}
        img={img}
      />
    </>
  );
};

export const WriteCmtComp = ({
  request,
  isOpen,
  placeholder,
  imgBtnId,
  baseText,
  img,
  modalClose,
}: {
  request: (formData: FormData) => void;
  isOpen: boolean;
  placeholder: string;
  imgBtnId: string;
  baseText?: string;
  img?: string;
  modalClose?: () => void;
}) => {
  // const router = useRouter();
  const { uploadImg, formData, setFormData, onChangeText, text, setText } =
    useFormDataImg(baseText ? baseText : "", 72, "isDeleteImg");

  const { preview, setPreview } = usePreview(formData);
  const deleteImg = useDeleteImg(
    setPreview,
    setFormData,
    imgBtnId,
    "isDeleteImg"
  );
  const resetForm = useDeleteImg(setPreview, setFormData, imgBtnId);

  const submit = useCallback(() => {
    request(pushedFormData(formData, [{ name: "content", value: text }]));
    modalClose && modalClose();
    resetForm();
    // router.refresh();
    setText(baseText ? baseText : "");
  }, [
    formData,
    text,
    baseText,
    modalClose,
    request,
    resetForm,
    // router,
    setText,
  ]);
  const pressEnter = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.code === "Enter") submit();
    },
    [submit]
  );
  return (
    <div hidden={!isOpen} className="w-full h-full pb-4">
      <div className="border-4 border-borderGray rounded-t-[2.5rem] p-5 text-base bg-white">
        {preview && (
          <div className="w-40 h-40 relative">
            <Image
              src={preview}
              width={30}
              height={30}
              alt="no image"
              className="w-full h-full"
            />
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
            <Image
              src={img}
              alt="no image"
              width={30}
              height={30}
              className="w-full h-full"
            />
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
          value={text}
          onKeyDown={
            formData.get("img") ||
            text ||
            (formData.get("isDeleteImg") !== "true" && img)
              ? pressEnter
              : undefined
          }
          // defaultValue={baseText}
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
