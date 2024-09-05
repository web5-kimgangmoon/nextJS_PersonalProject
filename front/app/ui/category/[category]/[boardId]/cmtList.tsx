"use client";

import clsx from "clsx";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Dots } from "@/public/dots2";
import Link from "next/link";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import {
  BellAlertIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button, ImgButton } from "@/app/ui/buttons";
import { useRouter } from "next/navigation";
import { userInfo } from "@/app/lib/placeholder-data";
import { likeCmt } from "@/app/lib/actions";
import { WriteCmt } from "./cmtWriteBox";

export const CmtList = () => {
  const cmtlist = [
    { id: 1, text: "text" },
    { id: 2, text: "text" },
    { id: 3, text: "text", replyId: 1 },
    { id: 4, text: "text", replyId: 1 },
    { id: 5, text: "text", replyId: 3 },
    { id: 6, text: "text" },
    { id: 7, text: "text", replyId: 5 },
  ];
  return (
    <>
      <CmtBox replyId={1} />
      <CmtBox replyId={1} />
      <CmtBox replyId={1} />
      {cmtlist.map(
        (item, idx) =>
          !item.replyId && (
            <CmtListTest
              key={item.id}
              id={item.id}
              cmtlist={cmtlist.slice(idx + 1)}
              text={item.text}
              isFirst={true}
            />
          )
      )}
    </>
  );
};

export const CmtBox = ({ replyId }: { replyId?: number }) => {
  const writerId = 2;
  const writer = "나는야작성자아아";
  const createdAt = new Date();
  const content =
    '<div><div style="width: 10rem; height: 10rem;"><img src="/baseBoardImg.png" style="width: 100%; height: 100%;"></div><div><span style="color: #042552;font-size: 0.75rem;">(*수정됨)</span>아아아</div></div>';
  const writerProfile = "/baseBoardImg.png";
  const cmtId = 3;
  const upCnt = 123;
  const downCnt = 456;
  const isDoLike = false;
  const isDoDisLike = false;
  const isLogin = true;
  const isWriter = true;
  const userProfile = "/facebookLogo.svg";
  const isDidReport = true;

  const imgPath = content.split('src="')[1].split('"')[0];
  const requestLike = useCallback((cmtId: number, isDisLike: boolean) => {
    likeCmt(cmtId, isDisLike);
  }, []);

  const [cleanContent, setCleanContent] = useState("");
  const router = useRouter();
  useEffect(() => {
    setCleanContent(DOMPurify.sanitize(content));
  }, [content]);
  const [isOpenCmt, setIsOpenCmt] = useState<boolean>(true);
  const toggle = useCallback(() => {
    setIsOpenCmt((value) => !value);
    router.refresh();
  }, []);
  return (
    <div className="px-2">
      <div
        className={clsx(
          "flex w-full h-full pb-4",
          isOpenCmt ? "items-start" : "items-center"
        )}
      >
        <Image
          src={writerProfile}
          alt="no image"
          className="w-16 h-16 rounded-2xl"
          width={0}
          height={0}
        />
        <div className="grow pl-2">
          <CmtBoxTop
            createdAt={createdAt}
            writerId={writerId}
            writer={writer}
            isOpenCmt={isOpenCmt}
            isLogin={isLogin}
            isDidReport={isDidReport}
            isWriter={isWriter}
            toggle={toggle}
          />
          <div hidden={!isOpenCmt}>
            <div className="text-black py-4">{parse(cleanContent)}</div>
            <CmtBoxBottom
              cmtId={cmtId}
              isDoDisLike={isDoDisLike}
              isDoLike={isDoLike}
              upCnt={upCnt}
              downCnt={downCnt}
              isLogin={isLogin}
              requestLike={(isDisLike: boolean) =>
                requestLike(cmtId, isDisLike)
              }
            />
          </div>
        </div>
      </div>

      <div className={clsx(!replyId && "pl-2")}></div>
    </div>
  );
};

export const CmtBoxTop = ({
  createdAt,
  writerId,
  writer,
  replyUser,
  replyUserId,
  isOpenCmt,
  isLogin,
  isDidReport,
  isWriter,
  toggle,
}: {
  createdAt: Date;
  writerId: number;
  writer: string;
  replyUser?: string;
  replyUserId?: number;
  isLogin: boolean;
  isOpenCmt: boolean;
  isDidReport: boolean;
  isWriter: boolean;
  toggle: () => void;
}) => {
  const [isOpenMenuList, setIsOpenMenuList] = useState<boolean>(false);
  const toggleModalMenu = useCallback(() => {
    setIsOpenMenuList((value) => {
      return !value;
    });
  }, []);
  return (
    <div className="flex">
      <div className="grow">
        <div className="py-2">
          <div
            className={`text-[1.1rem] text-mainBlue font-bold hover:text-textBlue`}
          >
            <Link href={`/user/${writerId}`}>{writer}</Link>
          </div>
          {replyUser && replyUserId && (
            <div className={`text-xs text-textGray font-bold`}>
              <Link href={`/user/${replyUserId}`}>
                to
                <span className="text-sm text-alert hover:text-red-800">
                  {replyUser}
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className="text-sm text-modalText">{`${createdAt.getFullYear()}-${String(
          createdAt.getMonth() + 1
        ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(
          2,
          "0"
        )} ${String(createdAt.getHours()).padStart(2, "0")}:${String(
          createdAt.getMinutes()
        ).padStart(2, "0")}`}</div>
      </div>
      <div className={clsx("flex gap-2", !isOpenCmt && "items-center")}>
        <div className="text-[#656C7A] w-8 h-8" onClick={toggle}>
          {isOpenCmt ? (
            <MinusIcon strokeWidth={3} />
          ) : (
            <PlusIcon strokeWidth={3} className="p-1" />
          )}
        </div>
        {isLogin && (
          <CmtBoxTopMenuList
            isDidReport={isDidReport}
            isLogin={isLogin}
            isOpen={isOpenMenuList}
            modalToggle={toggleModalMenu}
            isWriter={isWriter}
            deleteRequest={() => {}}
            remakeModalToggle={() => {}}
          />
          // <div className="text-[#656C7A] w-8 h-8 hover:text-mainBlue relative">
          //   <Dots />
          // </div>
        )}
      </div>
    </div>
  );
};

const CmtBoxBottom = ({
  upCnt,
  downCnt,
  isDoLike,
  isDoDisLike,
  isLogin,
  cmtId,
  requestLike,
}: {
  upCnt: number;
  downCnt: number;
  isDoLike: boolean;
  isDoDisLike: boolean;
  isLogin: boolean;
  cmtId: number;
  requestLike: (isDisLike: boolean) => void;
}) => {
  const [isOpenReply, setIsOpenReply] = useState<boolean>(false);
  const toggle = useCallback(() => {
    setIsOpenReply((value) => !value);
  }, []);
  return (
    <>
      <div className="flex gap-2">
        <div>
          <ImgButton
            icon={
              <HandThumbUpIcon
                className={clsx(isDoLike ? "text-mainBlue" : "text-textGray")}
              />
            }
            color={"none"}
            size="smallest"
            className={"text-fakeBlack"}
            isLessGap={true}
            onClick={isLogin ? () => requestLike(false) : undefined}
          >
            {upCnt}
          </ImgButton>
        </div>
        <div>
          <ImgButton
            icon={
              <HandThumbDownIcon
                className={clsx(
                  isDoDisLike ? "text-mainBlue" : "text-textGray"
                )}
              />
            }
            color={"none"}
            size="smallest"
            className={"text-fakeBlack"}
            isLessGap={true}
            onClick={isLogin ? () => requestLike(true) : undefined}
          >
            {downCnt}
          </ImgButton>
        </div>
        <div>
          {isLogin && (
            <Button size="smallest" color="onlyTextBlue" onClick={toggle}>
              reply
            </Button>
          )}
        </div>
      </div>
      <WriteCmt replyId={cmtId} isOpen={isOpenReply} modalToggle={toggle} />
    </>
  );
};
const CmtBoxTopMenuList = ({
  isOpen,
  isWriter,
  isLogin,
  isDidReport,
  modalToggle,
  deleteRequest,
  remakeModalToggle,
}: {
  isOpen: boolean;
  isWriter: boolean;
  isDidReport: boolean;
  isLogin: boolean;
  modalToggle: () => void;
  deleteRequest: () => void;
  remakeModalToggle: () => void;
}) => {
  return (
    <div className="text-[#656C7A] w-8 h-8 hover:text-mainBlue relative">
      <div onClick={modalToggle} className="h-full">
        <Dots />
      </div>
      <div
        className="absolute top-10 right-2 min-w-max min-h-max bg-white border-2 border-textGray rounded-3xl rounded-tr-none p-2"
        hidden={!isOpen}
      >
        <div>
          {isWriter && isLogin && (
            <ImgButton
              // isImgBig={false}
              icon={<PencilIcon />}
              size="small"
              color="onlyTextBlue"
              isRight={true}
              // isNobold={true}
              isLessGap={true}
            >
              댓글수정
            </ImgButton>
          )}
        </div>
        <div>
          {isWriter && isLogin && (
            <ImgButton
              // isImgBig={true}
              icon={<TrashIcon />}
              size="small"
              color="onlyTextRed"
              isRight={true}
              // isNobold={true}
              isLessGap={true}
            >
              댓글삭제
            </ImgButton>
          )}
        </div>
        <div>
          {!isWriter && isLogin && (
            <ImgButton
              isImgBig={true}
              icon={<BellAlertIcon />}
              size="small"
              color="onlyTextRed"
              isRight={true}
              // isNobold={true}
              isLessGap={true}
            >
              {isDidReport ? "신고완료" : "댓글신고"}
            </ImgButton>
          )}
        </div>
      </div>
    </div>
  );
};

export const CmtListTest = ({
  id,
  cmtlist,
  text,
  isFirst,
}: {
  id: number;
  cmtlist: { id: number; replyId?: number; text: string }[];
  text: string;
  isFirst?: boolean;
}) => {
  return (
    <div className="flex">
      <div className={clsx(isFirst && "bg-yellow-200")}>{text}</div>
      <div className="bg-green-200">
        {cmtlist.map(
          (item, idx) =>
            item.replyId === id && (
              <CmtListTest
                id={item.id}
                key={item.id}
                text={item.text}
                cmtlist={cmtlist.slice(idx + 1)}
              />
            )
        )}
      </div>
    </div>
  );
};
