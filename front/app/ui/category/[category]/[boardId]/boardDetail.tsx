"use client";

import type { BoardDetail as IBoardDetail } from "@/app/lib/definitions";
import Image from "next/image";
import { BottomCmtBtn } from "../../board";
import clsx from "clsx";
import { getTimeString } from "@/app/lib/utils";
import Link from "next/link";
import { ImgButton, LinkButton } from "@/app/ui/buttons";
import { currentBoard as currentBoardHolder } from "@/app/lib/placeholder-data";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { boardDelete } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export const BoardDetail = () => {
  const router = useRouter();
  const currentBoard = currentBoardHolder;
  return (
    <BoardDetailComp
      {...currentBoard}
      boardDelete={async () => {
        await boardDelete(currentBoard.boardId);
        router.replace(`/category`);
        router.refresh();
      }}
    />
  );
};

export const BoardDetailComp = ({
  isWriter,
  commentNum,
  boardId,
  categoryPath,
  createdAt,
  img,
  category,
  content,
  title,
  writer,
  writerId,
  boardDelete,
}: IBoardDetail & { boardDelete: () => void }) => {
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
            commentNum={commentNum}
            categoryPath={categoryPath}
            boardId={boardId}
          />
        </div>
        {isWriter && (
          <WriterRequestBtns boardId={boardId} requestDelete={boardDelete} />
        )}
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
  requestDelete,
}: {
  boardId: number;
  requestDelete: () => void;
}) => {
  return (
    <div className="flex items-center gap-5">
      <LinkButton
        href={`write/${boardId}`}
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
        onClick={requestDelete}
        isLessGap={true}
        radius="medium"
      >
        삭제하기
      </ImgButton>
    </div>
  );
};
