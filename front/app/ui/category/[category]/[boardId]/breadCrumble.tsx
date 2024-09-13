"use client";

import { RightArrow } from "@/public/right-arrow";
import Link from "next/link";
import { useQuery_getBoardDetail } from "@/app/lib/data";
import { useParams } from "next/navigation";
import { LoadingSpin } from "@/app/ui/loadingSpin";

export const BreadCrumble = () => {
  const params = useParams();
  const currentBoard = useQuery_getBoardDetail(+params.boardId);
  if (currentBoard.isLoading)
    return <LoadingSpin bgColorClass="bg-categoryGray" />;
  return (
    <div className="flex py-2">
      <div className="font-bold text-pink hover:text-red-800">
        <Link
          href={`/category${
            currentBoard.data?.data.categoryPath
              ? "/" + currentBoard.data?.data.categoryPath
              : ""
          }`}
        >
          {currentBoard.data?.data.category
            ? currentBoard.data?.data.category
            : "unknown"}
        </Link>
      </div>
      <div className="w-6 h-6">
        <Link
          href={`/category${
            currentBoard.data?.data.categoryPath
              ? "/" + currentBoard.data?.data.categoryPath
              : ""
          }`}
          className="w-full h-full"
        >
          <RightArrow />
        </Link>
      </div>
      <div>
        {currentBoard.data?.data.title
          ? currentBoard.data?.data.title
          : "unknown"}
      </div>
    </div>
  );
};
