"use client";

import { boardGiveScore } from "@/app/lib/actions";
import {
  currentBoardData as currentBoardHolder,
  userInfoData,
} from "@/app/lib/placeholder-data";
import { Button, ImgButton } from "@/app/ui/buttons";
import { Star } from "@/public/star";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const GiveScoreBox = () => {
  const currentBoard = currentBoardHolder;

  const [score, setScore] = useState<number>();
  const router = useRouter();
  const giveScore = useCallback((score: number) => {
    setScore(score);
  }, []);
  const submit = useCallback(
    (score: number) => {
      boardGiveScore(score);
      router.refresh();
    },
    [router]
  );
  return (
    <GiveScoreBoxComp
      {...currentBoard}
      isLogin={userInfoData.userInfo?.id ? true : false}
      score={score}
      giveScore={giveScore}
      submit={submit}
      defaultScore={currentBoard.score}
    />
  );
};

export const GiveScoreBoxComp = ({
  scoreUserCnt,
  score,
  giveScore,
  defaultScore,
  submit,
  isGiveScore,
  isLogin,
}: {
  scoreUserCnt: number;
  score: number | undefined;
  defaultScore: number;
  giveScore: (num: number) => void;
  submit: (score: number) => void;
  isGiveScore: boolean;
  isLogin: boolean;
}) => {
  return (
    <div className="border-t border-borderGray">
      <div className="w-full py-2 text-center text-fakeBlack">{`${scoreUserCnt}명이 평가했습니다`}</div>
      <div className="w-full flex justify-center">
        <StarBox
          score={score}
          giveScore={isGiveScore || !isLogin ? undefined : giveScore}
          defaultScore={defaultScore}
        />
      </div>
      {isLogin && (
        <SubmitBtn onClick={submit} isGiveScore={isGiveScore} score={score} />
      )}
    </div>
  );
};

export const StarBox = ({
  score,
  defaultScore,
  giveScore,
}: {
  score: number | undefined;
  defaultScore: number;
  giveScore?: (num: number) => void;
}) => {
  return (
    <div className="relative">
      <Stars isInactive={true} giveScore={giveScore} />
      <div
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${score ? score * 20 : defaultScore * 20}%` }}
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
  giveScore?: (num: number) => void;
}) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push({ isInactive, score: i + 1 });
  }
  return (
    <div className="flex">
      {stars.map((item, idx) => (
        <StarBtn
          key={idx}
          isInActive={item.isInactive}
          onClick={giveScore ? () => giveScore(item.score) : undefined}
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

export const SubmitBtn = ({
  isGiveScore,
  score,
  onClick,
}: {
  isGiveScore?: boolean;
  score?: number;
  onClick?: (score: number) => void;
}) => {
  return (
    <div className="p-2">
      <Button
        color={isGiveScore || !score ? "inactiveGray" : "blue"}
        onClick={
          score === undefined || !onClick || isGiveScore
            ? undefined
            : () => onClick(score)
        }
        radius="a little"
      >
        {!isGiveScore ? (score ? "평가하기" : "별점선택") : "평가완료"}
      </Button>
    </div>
  );
};
