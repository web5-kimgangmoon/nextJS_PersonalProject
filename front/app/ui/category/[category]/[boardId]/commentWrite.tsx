"use client";

import {
  boardReportList as boardReportListHolder,
  currentBoard as currentBoardHolder,
} from "@/app/lib/placeholder-data";

import { useCallback, useState } from "react";
import { ImgButton } from "@/app/ui/buttons";
import { FlagIcon } from "@heroicons/react/24/outline";
import { ReportBox } from "@/app/ui/reasonBox";

export const CommentTop = () => {
  const boardReportList = boardReportListHolder;
  const currentBoard = currentBoardHolder;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalToggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  return (
    <div className="p-2">
      <div className="pb-4 border-b border-borderGray">
        <div className="py-2 flex items-center justify-between">
          <div className="text-sm text-fakeBlack">
            {currentBoard.commentNum} Comments
          </div>
          {currentBoard.isLogin && (
            <div>
              <ReportBtn
                openModal={modalToggle}
                isDidReport={currentBoard.isDidReport}
              />
            </div>
          )}
        </div>

        {currentBoard.isLogin && !currentBoard.isDidReport && (
          <ReportBox
            id={String(currentBoard.boardId)}
            isBoard={true}
            reasonList={boardReportList}
            isOpen={isOpen}
            modalToggle={modalToggle}
          />
        )}
      </div>
    </div>
  );
};

export const ReportBtn = ({
  openModal,
  isDidReport,
}: {
  openModal: () => void;
  isDidReport: boolean;
}) => (
  <ImgButton
    isRight={true}
    size="small"
    color={isDidReport ? "blankInactive" : "blankRed"}
    icon={<FlagIcon />}
    isLessGap={true}
    radius="medium"
    onClick={isDidReport ? undefined : openModal}
  >
    {isDidReport ? "신고완료" : "신고"}
  </ImgButton>
);
