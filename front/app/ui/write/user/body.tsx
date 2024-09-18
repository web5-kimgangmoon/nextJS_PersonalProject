"use client";

import { pushedFormData, useTypeCheck_zod } from "@/app/lib/utils";
import { Button } from "../../buttons";
import { InputBox } from "../../inputBox";
import { useQuery_getOwnInfo, useQuery_getUserInfo } from "@/app/lib/data";
import { Modal_little } from "../../modal";
import { LoadingSpin } from "../../loadingSpin";
import { useModalText } from "@/app/hooks/modal";
import { useFormDataImg } from "@/app/hooks/formDataImg";
import { usePreview } from "@/app/hooks/preview";
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useProfileUpdate } from "@/app/lib/actions";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToggle } from "@/app/hooks/toggle";
import clsx from "clsx";

export const Body = () => {
  const userInfo = useQuery_getOwnInfo();
  if (userInfo.isLoading) return <LoadingSpin bgColorClass="bg-white" />;
  if (!userInfo.data?.data?.userInfo?.id) return <Redirect />;
  return (
    <>
      {userInfo.data?.data.userInfo?.id && (
        <div>
          <div className="p-4 border-b border-t border-borderGray text-sm  text-bgGray">
            유저 정보는 다른 사람과 공유할 수 없으며, 거래할 수도 없습니다. 이를
            어길 경우, 발생하는 문제는 책임지지 않습니다.
          </div>
          <WriteBox
            nick={userInfo.data?.data.userInfo?.nick as string}
            img={userInfo.data?.data.userInfo?.profileImg}
          />
        </div>
      )}
    </>
  );
};
const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/category/all");
  }, []);
  return (
    <Modal_little modalCtl={true} closeModalCtl={() => {}}>
      유저정보가 존재하지 않습니다.
    </Modal_little>
  );
};

const WriteBox = ({ nick, img }: { nick: string; img: string }) => {
  const { nickCheck } = useTypeCheck_zod();
  const isOknick = useToggle(true);
  const queryClient = useQueryClient();
  const router = useRouter();
  const modalText = useModalText();
  const [imgChange, setImgChange] = useState<string>("changeImg");
  const imgBtnId = "imgBox";

  const updateOwn = useProfileUpdate(() => {
    queryClient.refetchQueries({ queryKey: ["get", "userInfo", "own"] });
    router.replace("/user");
  }, modalText.openText);
  const { uploadImg, formData, onChangeText, text, setText } = useFormDataImg(
    nick,
    24
  );

  const request = useCallback(
    async (formData: FormData) => {
      await updateOwn.mutate(formData);
    },
    [queryClient, updateOwn]
  );
  const { preview } = usePreview(formData);

  const submit = useCallback(() => {
    if (imgChange !== "changeImg") {
      const noImgData = new FormData();
      noImgData.set("nick", text);
      request(noImgData);
      return;
    }
    request(pushedFormData(formData, [{ name: "nick", value: text }]));
    setText(nick);
  }, [formData, text, nick, request, router, setText, imgChange]);
  const pressEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") submit();
    },
    [submit]
  );
  const file = useMemo(() => {
    return formData.get("img") as null | File;
  }, [formData]);
  return (
    <div className="flex flex-col">
      <div className={"text-sm font-bold text-textGray px-4 py-4"}>
        {"프로필 사진"}
      </div>
      <div className="pb-5 px-4 text-base bg-white">
        <div className="relative p-2">
          <select
            value={imgChange}
            onChange={(e) => {
              setImgChange(e.currentTarget.value);
            }}
            className="w-full p-2 pr-6 outline-none border border-borderGray hover:border-border-mainBlue appearance-none bg-white"
          >
            <option value={"changeImg"}>이미지 교체</option>
            <option value={"originalImg"}>원 이미지</option>
          </select>
          <div className="absolute w-3 h-3 top-5 right-5">
            <img src="/noLineArrow_gray.svg" className="w-full h-full" />
          </div>
        </div>
        <div className="flex">
          <div className="w-32 h-32 relative">
            <Image
              src={preview && imgChange === "changeImg" ? preview : img}
              width={30}
              height={30}
              alt="no image"
              className="w-full h-full"
            />
          </div>
          <div>
            <input
              type={"file"}
              multiple={false}
              name={"img"}
              onChange={uploadImg}
              id={imgBtnId}
              hidden
            />
            <div
              className={clsx(
                "text-[#7F919E]/60",
                imgChange === "changeImg" && "hover:text-mainBlue"
              )}
            >
              <div className="p-2">
                <label htmlFor={imgChange === "changeImg" ? imgBtnId : ""}>
                  <div
                    className={clsx(
                      "p-2 border border-borderGray rounded-md",
                      imgChange === "changeImg" && "hover:border-mainBlue"
                    )}
                  >
                    파일업로드
                  </div>
                </label>
              </div>
            </div>
            <div>
              <div className="p-2 text-sm">
                {file && imgChange === "changeImg" ? file.name : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <InputBox
        setIsNO={isOknick.close}
        setIsOK={isOknick.open}
        onChange={onChangeText}
        value={text}
        title="닉네임"
        checkType={nickCheck}
        placeholder=""
        type="text"
        isUpdate={true}
        description="미풍양속을 해지지 않는 닉네임을 부탁합니다"
        onSubmit={pressEnter}
      />

      <div className="p-4 border-t  border-borderGray grow flex items-start">
        <Button
          size="none"
          color="blue"
          className="px-6 py-1 text-sm"
          radius="little"
          onClick={submit}
        >
          저장
        </Button>
      </div>
      <Modal_little closeModalCtl={modalText.close} modalCtl={modalText.is}>
        {modalText.text}
      </Modal_little>
    </div>
  );
};
