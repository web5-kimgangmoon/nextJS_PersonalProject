"use client";

import { RightArrow } from "@/public/right-arrow";
import Link from "next/link";
import { currentBoardData as currentBoardHolder } from "@/app/lib/placeholder-data";

export const BreadCrumble = () => {
  const currentBoard = currentBoardHolder;
  return (
    <div className="flex py-2">
      <div className="font-bold text-pink hover:text-red-800">
        <Link href={`/category/${currentBoard.categoryPath}`}>
          {currentBoard.category}
        </Link>
      </div>
      <div className="w-6 h-6">
        <Link
          href={`/category/${currentBoard.categoryPath}`}
          className="w-full h-full"
        >
          <RightArrow />
        </Link>
      </div>
      <div>{currentBoard.title}</div>
    </div>
  );
};
