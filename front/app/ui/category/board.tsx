"use client";

import clsx from "clsx";
import { LinkButton } from "@/app/ui/buttons";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { getTimeString, useTypeCheck_zod } from "@/app/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { NoBoard } from "./noBoard";
import {
  useQuery_getBoardList,
  useQuery_getCategoryDetail,
} from "@/app/lib/data";
import { useParams, useSearchParams } from "next/navigation";
import { LoadingSpin } from "../loadingSpin";
import { useEffect } from "react";

export const InformBoard = () => {
  const params = useParams();

  const categoryDetailData = useQuery_getCategoryDetail({
    search: {
      category: params["category"] ? (params["category"] as string) : "all",
    },
  });
  if (categoryDetailData.isLoading && !categoryDetailData.data?.data)
    return <LoadingSpin bgColorClass="bg-categoryGray" />;
  return (
    <BoardItem
      {...categoryDetailData.data?.data.informBoard}
      isTop={true}
      category={"공지"}
      categoryPath={"inform"}
    />
  );
};

export const BoardList = () => {
  const params = useParams();
  const query = useSearchParams();
  const { intCheck } = useTypeCheck_zod();
  const page = query.get("page");
  const search = query.get("search");
  const searchType = query.get("searchType");
  let { data, refetch, isLoading } = useQuery_getBoardList({
    category: params["category"] ? (params["category"] as string) : "all",
    isDeleted: "false",
    search: search,
    searchType: searchType,
    isOwn: "false",
    limit: "10",
    offset: intCheck.safeParse(page).success
      ? String((Number(page) - 1) * 10)
      : null,
  });
  useEffect(() => {
    refetch();
  }, [page, search, searchType, refetch]);
  if (isLoading && !data) return <LoadingSpin bgColorClass="bg-categoryGray" />;
  if (data?.data.boardList.length === 0) return <NoBoard />;
  return (
    <div>
      {data?.data.boardList.map(
        (item: {
          isTop?: boolean;
          cmtCnt: number;
          id: number;
          categoryPath: string;
          createdAt: Date;
          img: string;
          category: string;
          description: string;
          title: string;
          writer: string;
          writerId: number;
        }) => (
          <BoardItem {...item} key={item.id} />
        )
      )}
    </div>
  );
};

export const BoardItem = ({
  isTop,
  cmtCnt,
  id,
  categoryPath,
  createdAt,
  img,
  category,
  description,
  title,
  writer,
  writerId,
}: {
  isTop?: boolean;
  cmtCnt: number;
  id: number;
  categoryPath: string;
  createdAt: Date;
  img: string;
  category: string;
  description: string;
  title: string;
  writer: string;
  writerId: number;
}) => {
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
            boardId={id}
            commentNum={cmtCnt}
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
        <div className="text-ellipsis whitespace-pre-wrap break-all overflow-y-hidden">
          {description}
        </div>
        <div className="text-sm flex items-center flex-wrap">
          <div className="text-textBlue">{getTimeString(createdAt)}</div>
          <div className="py-1 px-2">
            <div className="border-r border-textBlue h-4"></div>
          </div>
          <div className="text-pink">
            <Link href={`/user/${writerId}`}>{writer}</Link>
          </div>
          {isTop && (
            <BottomCmtBtn
              commentNum={cmtCnt}
              categoryPath={categoryPath}
              boardId={id}
            />
          )}
        </div>
      </div>
      {isTop ? (
        <LinkButton
          href={`/category/${categoryPath}/${id}`}
          color="pink"
          radius="a little"
        >
          전체읽기
        </LinkButton>
      ) : (
        <Link
          href={`/category/${categoryPath}/${id}`}
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
      {commentNum !== 0 ? `${commentNum} 댓글들` : "댓글작성"}
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
