"use client";

import {
  boardReportReasonListData as boardReportListHolder,
  currentBoardData as currentBoardHolder,
  userInfoData,
} from "@/app/lib/placeholder-data";

import { ImgButton } from "@/app/ui/buttons";
import { FlagIcon } from "@heroicons/react/24/outline";
import { ReportBox } from "@/app/ui/reasonBox";
import { WriteCmt } from "./cmtWriteBox";
import { useToggle } from "@/app/hooks/toggle";

export const CommentTop = () => {
  const boardReportList = boardReportListHolder;
  const currentBoard = currentBoardHolder;
  const box = useToggle(false);
  return (
    <div className="p-2">
      <div className="pb-4 border-b border-borderGray">
        <div className="py-2 flex items-center justify-between">
          <div className="text-sm text-fakeBlack">
            {currentBoard.cmtCnt} Comments
          </div>
          {userInfoData.userInfo?.id && (
            <div>
              <ReportBtn
                openModal={box.toggle}
                isDidReport={currentBoard.isDidReport}
              />
            </div>
          )}
        </div>

        {userInfoData.userInfo?.id && !currentBoard.isDidReport && (
          <ReportBox
            id={currentBoard.id}
            isBoard={true}
            reasonList={boardReportList.reasonList}
            isOpen={box.is}
            modalClose={box.close}
          />
        )}
      </div>
      <div className="pb-5 pt-10">
        {userInfoData.userInfo?.id &&
          userInfoData.userInfo?.id !== currentBoard.writerId && (
            <WriteCmt boardId={currentBoard.id} isOpen={true} />
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
    {isDidReport ? "신고완료" : "신고하기"}
  </ImgButton>
);
