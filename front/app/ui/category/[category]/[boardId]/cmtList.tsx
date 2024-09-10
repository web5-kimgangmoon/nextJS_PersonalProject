"use client";

import clsx from "clsx";

import {
  cmtReportReasonListData as cmtReportListHolder,
  userInfoData,
} from "@/app/lib/placeholder-data";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Dots } from "@/public/dots";
import Link from "next/link";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import {
  FlagIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  MinusIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Button, ImgButton } from "@/app/ui/buttons";
import { deleteCmt, likeCmt } from "@/app/lib/actions";
import { WriteCmt } from "./cmtWriteBox";
import { useToggle } from "@/app/hooks/toggle";
import { useRouter } from "next/navigation";
import { getTimeString } from "@/app/lib/utils";
import { CheckDelete, ReportBox } from "@/app/ui/reasonBox";
import { CmtItem, Reason } from "@/app/lib/definitions";
import { LoadingSpin } from "@/app/ui/loadingSpin";
import { useSelectCallback } from "@/app/hooks/callback/selectCallback";
import { useQuery_getCmt } from "@/app/lib/data";

export const CmtList = ({ boardId }: { boardId: number }) => {
  const cmtReportList = cmtReportListHolder;

  const [limit, setLimit] = useState<number>(2);
  const [sortState, setSortState] =
    useState<Partial<"like" | "recently" | "old">>("like");
  const cmtData = useQuery_getCmt({
    searh: {
      boardId: boardId,
      isDeleted: false,
      isOwn: false,
      limit: limit,
      onlyDeleted: false,
      search: "",
      searchType: null,
      sort: sortState,
    },
  });
  const stretchLimit = useCallback(() => {
    setLimit((value) => value + 2);
  }, []);
  const { setSortRecently, setSortOld, setSortLike } = {
    setSortLike: useSelectCallback(setSortState, "like"),
    setSortRecently: useSelectCallback(setSortState, "recently"),
    setSortOld: useSelectCallback(setSortState, "old"),
  };
  if (cmtData.isLoading) return <LoadingSpin bgColorClass="bg-categoryGray" />;
  return (
    <div className="px-2">
      <div className="flex gap-2 pb-10 font-bold">
        <div
          onClick={() => {
            console.log(sortState);
            setSortLike();
          }}
          className={clsx(
            "p-1",
            sortState === "like" && "border-b-4 border-mainBlue text-mainBlue"
          )}
        >
          추천댓글
        </div>
        <div
          onClick={setSortRecently}
          className={clsx(
            "p-1",
            sortState === "recently" &&
              "border-b-4 border-mainBlue text-mainBlue"
          )}
        >
          최신순
        </div>
        <div
          onClick={setSortOld}
          className={clsx(
            "p-1",
            sortState === "old" && "border-b-4 border-mainBlue text-mainBlue"
          )}
        >
          과거순
        </div>
      </div>
      {cmtData.data.cmtList.map(
        (item, idx) =>
          !item.replyId && (
            <CmtBox
              isDidReport={item.isDidReport}
              isDoDislike={item.isDoDislike}
              isDoLike={item.isDoLike}
              isFirst={true}
              isWriter={item.writerId === userInfoData.userInfo?.id}
              cmtId={item.id}
              userId={userInfoData.userInfo?.id}
              writerId={item.writerId}
              replyUserId={item.replyUserId}
              userProfile={userInfoData.userInfo?.profileImg}
              replyUser={item.replyUser}
              writer={item.writer}
              writerProfile={item.writerProfile}
              cmtReportList={cmtReportList.reasonList}
              dislike={item.dislike}
              key={item.id}
              like={item.like}
              containCmt={item.containCmt}
              content={item.content}
              createdAt={item.createdAt}
            />
          )
      )}
      <div>
        {cmtData.data.cmtCnt > limit && (
          <Button color="blankBlue" radius="medium" onClick={stretchLimit}>
            댓글들 더보기
          </Button>
        )}
      </div>
    </div>
  );
};

export const CmtBox = ({
  cmtId,
  writerId,
  writer,
  createdAt,
  content,
  writerProfile,
  like,
  containCmt,
  dislike,
  isDoLike,
  isDoDislike,
  isWriter,
  userProfile = "/placeholder-noavatar32.svg",
  isDidReport,
  userId,
  replyUser,
  replyUserId,
  cmtReportList,
  isFirst,
}: {
  cmtId: number;
  writerId: number;
  writer: string;
  createdAt: Date;
  content: string;
  writerProfile: string;
  like: number;
  dislike: number;
  isDoLike: boolean;
  isDoDislike: boolean;
  isWriter: boolean;
  userProfile?: string;
  isDidReport: boolean;
  userId?: number;
  replyUser?: string;
  replyUserId?: number;
  cmtReportList: Reason[];
  isFirst?: boolean;
  containCmt?: CmtItem[];
}) => {
  const imgPath = content.split('src="')[1]?.split('"')[0];

  const contentText = content
    .split('<span class="cmtTextContent">')[1]
    .split("</span>")[0];

  const [cleanContent, setCleanContent] = useState("");
  useEffect(() => {
    setCleanContent(DOMPurify.sanitize(content));
  }, [content]);

  const cmt = useToggle(["cmt", true]);
  const reply = useToggle(["reply", false]);
  const report = useToggle(["report", false]);
  const remake = useToggle(["remake", false]);
  const deleteBox = useToggle(["deleteBox", false]);
  const router = useRouter();
  const requestLike = useCallback((isDisLike: boolean) => {
    likeCmt(cmtId, isDisLike);
    router.refresh();
  }, []);
  const requestDelete = useCallback(() => {
    deleteCmt(cmtId);
    router.refresh();
  }, []);
  return (
    <div>
      <div
        className={clsx(
          "flex w-full h-full pb-4",
          cmt.is ? "items-start" : "items-center"
        )}
      >
        <Image
          src={writerProfile}
          alt="no image"
          className={`w-14 h-14 rounded-2xl`}
          width={0}
          height={0}
        />
        <div className="grow pl-2">
          <CmtBoxTop
            createdAt={createdAt}
            writerId={writerId}
            writer={writer}
            isOpenCmt={cmt.is}
            isLogin={userId ? true : false}
            isDidReport={isDidReport}
            isWriter={isWriter}
            toggle={cmt.toggle}
            remakeToggle={remake.toggle}
            replyUser={replyUser}
            replyUserId={replyUserId}
            deleteToggle={deleteBox.toggle}
            reportToggle={report.toggle}
          />
          <div hidden={!cmt.is}>
            <div className="text-black py-4" hidden={remake.is}>
              {parse(cleanContent)}
            </div>
            <div className="py-4" hidden={!remake.is || !cmt.is}>
              <WriteCmt
                cmtId={cmtId}
                isOpen={remake.is && cmt.is}
                modalClose={remake.close}
                img={imgPath}
                baseText={contentText}
                isUpdate={true}
              />
            </div>
            <CmtBoxBottom
              requestLike={requestLike}
              isDoDislike={isDoDislike}
              isDoLike={isDoLike}
              like={like}
              dislike={dislike}
              isLogin={userId ? true : false}
              replyToggle={reply.toggle}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2" hidden={!reply.is}>
        <Image
          hidden={!reply.is}
          src={userProfile}
          alt="no image"
          className="w-14 h-14 rounded-2xl"
          width={0}
          height={0}
        />
        <WriteCmt replyId={cmtId} isOpen={reply.is} modalClose={reply.close} />
      </div>
      <div className="flex pl-16" hidden={!deleteBox.is}>
        <CheckDelete
          isOpen={deleteBox.is}
          modalClose={deleteBox.close}
          targetName={"댓글"}
          action={requestDelete}
        />
      </div>
      <div className="flex pl-16" hidden={!report.is}>
        <ReportBox
          id={cmtId}
          isOpen={report.is}
          modalClose={report.close}
          isBoard={false}
          reasonList={cmtReportList}
        />
      </div>
      <div className={clsx(isFirst && "pl-2")}>
        {containCmt &&
          containCmt.map(
            (item, idx) =>
              item.replyId === cmtId && (
                <CmtBox
                  isDidReport={item.isDidReport}
                  isDoDislike={item.isDoDislike}
                  isDoLike={item.isDoLike}
                  isFirst={false}
                  isWriter={item.writerId === userId}
                  cmtId={item.id}
                  userId={userId}
                  writerId={item.writerId}
                  replyUserId={item.replyUserId}
                  userProfile={userProfile}
                  replyUser={item.replyUser}
                  writer={item.writer}
                  writerProfile={item.writerProfile}
                  cmtReportList={cmtReportList}
                  dislike={item.dislike}
                  key={item.id}
                  like={item.like}
                  containCmt={item.containCmt}
                  content={item.content}
                  createdAt={item.createdAt}
                />
              )
          )}
      </div>
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
  remakeToggle,
  deleteToggle,
  reportToggle,
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
  remakeToggle: () => void;
  deleteToggle: () => void;
  reportToggle: () => void;
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
          <div className={`text-[1.1rem] text-mainBlue font-bold`}>
            <Link href={`/user/${writerId}`} className="hover:text-textBlue">
              {writer}
            </Link>
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
        <div className="text-sm text-modalText">
          {getTimeString(createdAt, "cmt")}
        </div>
      </div>
      <div
        className={clsx(
          "flex gap-2",
          isOpenCmt ? "items-start" : "items-center"
        )}
      >
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
            deleteToggle={deleteToggle}
            remakeToggle={remakeToggle}
            reportToggle={reportToggle}
          />
        )}
      </div>
    </div>
  );
};

const CmtBoxBottom = ({
  like,
  dislike,
  isDoLike,
  isDoDislike,
  isLogin,
  replyToggle,
  requestLike,
}: {
  like: number;
  dislike: number;
  isDoLike: boolean;
  isDoDislike: boolean;
  isLogin: boolean;
  replyToggle: () => void;
  requestLike: (isDisLike: boolean) => void;
}) => {
  return (
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
          {like}
        </ImgButton>
      </div>
      <div>
        <ImgButton
          icon={
            <HandThumbDownIcon
              className={clsx(isDoDislike ? "text-alert" : "text-textGray")}
            />
          }
          color={"none"}
          size="smallest"
          className={"text-fakeBlack"}
          isLessGap={true}
          onClick={isLogin ? () => requestLike(true) : undefined}
        >
          {dislike}
        </ImgButton>
      </div>
      <div>
        {isLogin && (
          <Button size="smallest" color="onlyTextBlue" onClick={replyToggle}>
            reply
          </Button>
        )}
      </div>
    </div>
  );
};
const CmtBoxTopMenuList = ({
  isOpen,
  isWriter,
  isLogin,
  isDidReport,
  modalToggle,
  deleteToggle,
  remakeToggle,
  reportToggle,
}: {
  isOpen: boolean;
  isWriter: boolean;
  isDidReport: boolean;
  isLogin: boolean;
  modalToggle: () => void;
  deleteToggle: () => void;
  remakeToggle: () => void;
  reportToggle: () => void;
}) => {
  return (
    <div
      className={clsx(
        "text-[#656C7A] hover:text-mainBlue relative flex flex-col"
      )}
    >
      {isWriter && isLogin && (
        <div onClick={modalToggle} className="w-8 h-8">
          <Dots />
        </div>
      )}
      <div
        className="absolute top-10 right-2 min-w-max min-h-max bg-white border-2 border-textGray rounded-3xl rounded-tr-none p-2 z-20"
        hidden={!isOpen}
      >
        <div>
          {isWriter && isLogin && (
            <ImgButton
              icon={<PencilIcon />}
              size="small"
              color="onlyTextBlue"
              isRight={true}
              isLessGap={true}
              onClick={remakeToggle}
            >
              댓글수정
            </ImgButton>
          )}
        </div>
        <div>
          {isWriter && isLogin && (
            <ImgButton
              icon={<TrashIcon />}
              size="small"
              color="onlyTextRed"
              isRight={true}
              isLessGap={true}
              onClick={deleteToggle}
            >
              댓글삭제
            </ImgButton>
          )}
        </div>
      </div>
      {!isWriter && isLogin && (
        <ImgButton
          isImgBig={true}
          icon={<FlagIcon strokeWidth={2} />}
          size="none"
          color={isDidReport ? "onlyTextInactive" : "onlyTextRed"}
          isRight={true}
          isNoString={true}
          onClick={reportToggle}
        />
      )}
    </div>
  );
};
