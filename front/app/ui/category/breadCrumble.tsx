"use client";

import { RightArrow } from "@/public/right-arrow";
import Link from "next/link";
import { currentBoard as currentBoardHolder } from "@/app/lib/placeholder-data";

export const BreadCrumble = () => {
  const currentBoard = currentBoardHolder;
  return (
    <div className="flex">
      <div className="font-bold">
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
