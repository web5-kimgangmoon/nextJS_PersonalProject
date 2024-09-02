"use client";

import clsx from "clsx";
import { LinkButton } from "@/app/ui/buttons";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { getTimeString } from "@/app/lib/utils";
import Link from "next/link";
import { CategoryBoard } from "@/app/lib/definitions";
import Image from "next/image";
import {
  boardList as boardListHolder,
  categoryInformBoard as categoryInformBoardHolder,
} from "@/app/lib/placeholder-data";
import { NoBoard } from "./noBoard";

export const InformBoard = () => {
  const categoryInformBoard = categoryInformBoardHolder;
  return <BoardItem {...categoryInformBoard} />;
};

export const BoardList = () => {
  const boardList = boardListHolder;
  if (boardList.length === 0) return <NoBoard />;
  return (
    <div>
      {boardList.map((item, idx) => (
        <BoardItem {...item} key={idx} />
      ))}
    </div>
  );
};

export const BoardItem = ({
  isTop,
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
}: CategoryBoard) => {
  return (
    <div className="flex flex-col gap-2 py-4">
      {!isTop && (
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
      )}
      <div className={clsx(!isTop && "flex justify-between items-center")}>
        <div className="text-xl text-pink font-bold">{category}</div>
        {!isTop && (
          <CommentBtn
            categoryPath={categoryPath}
            boardId={boardId}
            commentNum={commentNum}
          />
        )}
      </div>
      <div className="text-2xl text-textBlue font-bold">{title}</div>
      <div
        className={clsx(
          "flex gap-2 text-textBlue",
          isTop ? "flex-col" : "flex-col-reverse"
        )}
      >
        <div className="">{content}</div>
        <div className="text-sm flex items-center">
          <div className="text-textBlue">{getTimeString(createdAt)}</div>
          <div className="py-1 px-2">
            <div className="border-r border-textBlue h-4"></div>
          </div>
          <div className="text-pink">
            <Link href={`/user/${writerId}`}>{writer}</Link>
          </div>
          {isTop && (
            <BottomCmtBtn
              commentNum={commentNum}
              categoryPath={categoryPath}
              boardId={boardId}
            />
          )}
        </div>
      </div>
      {isTop ? (
        <LinkButton
          href={`/category/${categoryPath}/${boardId}`}
          color="pink"
          radius="a little"
        >
          전체읽기
        </LinkButton>
      ) : (
        <Link
          href={`/category/${categoryPath}/${boardId}`}
          className="text-xl text-pink font-bold"
        >
          전체글 보러가기 »
        </Link>
      )}
      {isTop && (
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
      )}
    </div>
  );
};

export const CommentBtn = ({
  categoryPath,
  boardId,
  commentNum,
}: {
  categoryPath: string;
  boardId: number;
  commentNum: number;
}) => {
  return (
    <LinkButton
      href={`/category/${categoryPath}/${boardId}`}
      color="noneBlue"
      isNobold={true}
      size="small"
      icon={
        <ChatBubbleLeftRightIcon
          color="pink"
          width={22}
          strokeWidth={"0.15rem"}
        />
      }
      isLessGap={true}
    >
      {commentNum === 0 ? `${commentNum} 댓글들` : "댓글작성"}
    </LinkButton>
  );
};

export const BottomCmtBtn = ({
  categoryPath,
  boardId,
  commentNum,
}: {
  categoryPath: string;
  boardId: number;
  commentNum: number;
}) => {
  return (
    <div className="flex items-center">
      <div className="pl-3 pr-1">
        <div className="border-b border-textBlue w-4"></div>
      </div>
      <CommentBtn
        commentNum={commentNum}
        boardId={boardId}
        categoryPath={categoryPath}
      />
    </div>
  );
};
