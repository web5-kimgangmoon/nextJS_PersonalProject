import { myBoardListData } from "@/app/lib/placeholder-data";
import { Header } from "./body";
import { useStretchBtn } from "@/app/hooks/strechBtn";
import Image from "next/image";
import { Button, ImgButton } from "@/app/ui/buttons";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Star } from "@/public/star";

export function BoardList() {
  const { limit, stretchLimit } = useStretchBtn();
  const myBoardList = {
    boardList: myBoardListData.boardList.slice(0, limit),
    boardCnt: myBoardListData.boardCnt,
  };
  const refetch = () => {};
  return (
    <div className="">
      <MyBoard />
      {myBoardList.boardCnt > limit && (
        <Button color="blankBlue" radius="medium" onClick={stretchLimit}>
          게시글들 더보기
        </Button>
      )}
    </div>
  );
}

export function MyBoard() {
  return (
    <div className="py-2">
      <div className="flex border border-bgGray rounded-2xl w-full h-full">
        <div className="min-h-32 min-w-32 rounded-l-2xl">
          <Image
            src={"/avatarBase.png"}
            alt={"no image"}
            className="h-full w-full rounded-l-2xl"
            width={20}
            height={20}
            layout={"responsive"}
          ></Image>
        </div>
        <div className="w-full p-2 h-32 flex flex-col gap-1 p-1">
          <div className="flex w-full items-center justify-between">
            <div className="text-sm">공지</div>
            <div className="flex">
              <div>
                <ImgButton
                  color="none"
                  isNobold={true}
                  size="smallest"
                  icon={
                    <ChatBubbleLeftRightIcon
                      className="text-borderGray"
                      width={15}
                      strokeWidth={"0.15rem"}
                    />
                  }
                  isLessGap={true}
                  className="text-textBlue text-xs"
                >
                  300
                </ImgButton>
              </div>
              <div>
                <ImgButton
                  color="none"
                  isNobold={true}
                  size="smallest"
                  icon={
                    <Star className="text-borderGray w-[15px]" isFill={true} />
                  }
                  isLessGap={true}
                  className="text-textBlue text-xs"
                >
                  4.4
                </ImgButton>
              </div>
            </div>
          </div>
          <div>ddd</div>
          <div className="text-sm relative">
            <div className="absolute top-0 left-0 w-full h-full text-ellipsis">
              ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇddd
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
