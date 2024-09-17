"use client";

import { ImgButton } from "@/app/ui/buttons";
import { FlagIcon } from "@heroicons/react/24/outline";
import { ReportBox } from "@/app/ui/reasonBox";
import { WriteCmt } from "./cmtWriteBox";
import { useToggle } from "@/app/hooks/toggle";
import {
  useQuery_getBoardDetail,
  useQuery_getBoardReason,
  useQuery_getOwnInfo,
} from "@/app/lib/data";
import { useParams } from "next/navigation";
import { LoadingSpin } from "@/app/ui/loadingSpin";

export const CommentTop = () => {
  const params = useParams();
  const boardReportList = useQuery_getBoardReason();
  const currentBoard = useQuery_getBoardDetail(+params.boardId);
  const userInfoData = useQuery_getOwnInfo();
  const box = useToggle(false);
  if (
    currentBoard.isLoading ||
    boardReportList.isLoading ||
    userInfoData.isLoading
  )
    <LoadingSpin bgColorClass="bg-categoryGray" />;
  return (
    <div className="p-2">
      <div className="pb-4 border-b border-borderGray">
        <div className="py-2 flex items-center justify-between">
          <div className="text-sm text-fakeBlack">
            {currentBoard.data?.data.cmtCnt
              ? currentBoard.data?.data.cmtCnt
              : 0}
            Comments
          </div>
          {userInfoData.data?.data.userInfo?.id && (
            <div>
              <ReportBtn
                openModal={box.toggle}
                isDidReport={currentBoard.data?.data.isDidReport}
              />
            </div>
          )}
        </div>

        {userInfoData.data?.data.userInfo?.id &&
          !currentBoard.data?.data.isDidReport && (
            <ReportBox
              id={currentBoard.data?.data.id ? currentBoard.data?.data.id : 0}
              isBoard={true}
              reasonList={
                boardReportList.data?.data.reasonList
                  ? boardReportList.data?.data.reasonList
                  : []
              }
              isOpen={box.is}
              modalClose={box.close}
            />
          )}
      </div>
      <div className="pb-5 pt-10">
        {userInfoData.data?.data.userInfo?.id && (
          <WriteCmt
            boardId={
              currentBoard.data?.data.id ? currentBoard.data?.data.id : 0
            }
            isOpen={true}
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
    {isDidReport ? "신고완료" : "신고하기"}
  </ImgButton>
);
