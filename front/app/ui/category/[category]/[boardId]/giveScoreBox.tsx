"use client";

import { currentBoard as currentBoardHolder } from "@/app/lib/placeholder-data";
import { ImgButton } from "@/app/ui/buttons";
import { Star } from "@/public/star";
import clsx from "clsx";
import { useCallback, useState } from "react";

export const GiveScoreBox = () => {
  const currentBoard = currentBoardHolder;
  const [score, setScore] = useState<number>(currentBoard.score);
  const giveScore = useCallback(
    (score: number) => {
      setScore(score);
    },
    [score]
  );
  return (
    <GiveScoreBoxComp {...currentBoard} score={score} giveScore={giveScore} />
  );
};

export const GiveScoreBoxComp = ({
  scoreUserCnt,
  score,
  giveScore,
}: {
  scoreUserCnt: number;
  score: number;
  giveScore: (num: number) => void;
}) => {
  return (
    <div className="border-t border-borderGray">
      <div className="w-full py-2 text-center text-fakeBlack">{`${scoreUserCnt}명이 평가했습니다`}</div>
      <div className="w-full flex justify-center">
        <StarBox score={score} giveScore={giveScore} />
      </div>
    </div>
  );
};

export const StarBox = ({
  score,
  giveScore,
}: {
  score: number;
  giveScore: (num: number) => void;
}) => {
  return (
    <div className="relative">
      <Stars isInactive={true} giveScore={giveScore} />
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${score * 20}%` }}
      >
        <Stars giveScore={giveScore} />
      </div>
    </div>
  );
};

export const Stars = ({
  isInactive,
  giveScore,
}: {
  isInactive?: boolean;
  giveScore: (num: number) => void;
}) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push({ isInactive, score: i + 1 });
  }
  return (
    <div className="flex">
      {stars.map((item) => (
        <StarBtn
          isInActive={item.isInactive}
          onClick={() => giveScore(item.score)}
        />
      ))}
    </div>
  );
};

export const StarBtn = ({
  isInActive,
  onClick,
}: {
  isInActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <ImgButton
      size="pageBtn"
      isNoString={true}
      icon={
        <Star className={clsx(isInActive ? "text-blankStar" : "text-star")} />
      }
      color="none"
      isImgBig={true}
      onClick={onClick}
    />
  );
};
