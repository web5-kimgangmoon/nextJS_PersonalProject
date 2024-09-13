"use client";

import Image from "next/image";
import { BottomCmtBtn } from "../../board";
import clsx from "clsx";
import { getTimeString } from "@/app/lib/utils";
import Link from "next/link";
import { ImgButton, LinkButton } from "@/app/ui/buttons";
import { currentBoardData, userInfoData } from "@/app/lib/placeholder-data";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useToggle } from "@/app/hooks/toggle";
import { useCallback } from "react";
import { boardDelete } from "@/app/lib/actions";
import { CheckDelete } from "@/app/ui/reasonBox";

export const BoardDetail = () => {
  if (!currentBoardData)
    return (
      <div className="h-10 w-full flex justify-center items-center">
        게시글이 존재하지 않습니다.
      </div>
    );
  return (
    <BoardDetailComp
      {...currentBoardData}
      isWriter={currentBoardData.writerId === userInfoData.userInfo?.id}
    />
  );
};

export const BoardDetailComp = ({
  isWriter,
  cmtCnt,
  id,
  categoryPath,
  createdAt,
  img,
  category,
  content,
  title,
  writer,
  writerId,
}: {
  isWriter: boolean;
  cmtCnt: number;
  id: number;
  categoryPath: string;
  createdAt: Date;
  img: string;
  category: string;
  content: string;
  title: string;
  writer: string;
  writerId: number;
}) => {
  const deleteBox = useToggle(false);
  const requestDelete = useCallback(() => {
    boardDelete(id);
  }, [id]);
  return (
    <div className="flex flex-col gap-2 py-4">
      <div className="text-xl text-pink font-bold">{category}</div>
      <div className="text-2xl text-textBlue font-bold">{title}</div>
      <div className={clsx("flex gap-2 text-textBlue flex-col")}>
        <div className="text-sm flex items-center flex-wrap">
          <div className="text-textBlue">{getTimeString(createdAt)}</div>
          <div className="py-1 px-2">
            <div className="border-r border-textBlue h-4"></div>
          </div>
          <div className="text-pink">
            <Link href={`/user/${writerId}`}>{writer}</Link>
          </div>
          <BottomCmtBtn
            commentNum={cmtCnt}
            categoryPath={categoryPath}
            boardId={id}
          />
        </div>
        {isWriter && (
          <WriterRequestBtns boardId={id} modalToggle={deleteBox.toggle} />
        )}
        <div hidden={!deleteBox.is}>
          <CheckDelete
            isOpen={deleteBox.is}
            targetName="게시글"
            modalClose={deleteBox.close}
            action={requestDelete}
            destination="/category"
          />
        </div>
        <div className="drop-shadow-xl py-2 flex justify-center">
          <Image
            src={img}
            className="w-full max-w-96"
            alt="image loading failed"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="">{content}</div>
      </div>
    </div>
  );
};

export const WriterRequestBtns = ({
  boardId,
  modalToggle,
}: {
  boardId: number;
  modalToggle: () => void;
}) => {
  return (
    <div className="flex items-center gap-5">
      <LinkButton
        href={`/write/board/${boardId}`}
        isRight={true}
        size="small"
        color="blankBlue"
        icon={<PencilIcon />}
        isLessGap={true}
        radius="medium"
      >
        수정하기
      </LinkButton>
      <ImgButton
        isRight={true}
        size="small"
        color="blankRed"
        icon={<TrashIcon />}
        onClick={modalToggle}
        isLessGap={true}
        radius="medium"
      >
        삭제하기
      </ImgButton>
    </div>
  );
};
