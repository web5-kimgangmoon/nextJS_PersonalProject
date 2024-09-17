import { myBoardListData } from "@/app/lib/placeholder-data";
import { Header } from "./body";
import { useStretchBtn } from "@/app/hooks/strechBtn";
import Image from "next/image";
import { Button, ImgButton } from "@/app/ui/buttons";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { Star } from "@/public/star";
import { useQuery_getBoardList } from "@/app/lib/data";
import { useParams, useSearchParams } from "next/navigation";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { useEffect } from "react";
import Link from "next/link";

export function BoardList() {
  const { limit, stretchLimit } = useStretchBtn(5);
  const params = useParams();
  const { intCheck } = useTypeCheck_zod();
  const userId = intCheck.safeParse(params.userId)
    ? String(params.userId)
    : undefined;
  const boardList = useQuery_getBoardList({
    isOwn: !userId ? "false" : "true",
    limit: String(limit),
    category: "all",
    isDeleted: "false",
    offset: "0",
    search: null,
    searchType: null,
    writerId: userId ? userId : undefined,
  });
  useEffect(() => {
    boardList.refetch();
  }, [limit]);
  return (
    <div>
      {boardList.data?.data?.boardList.map(
        (item: {
          title: string;
          category: string;
          categoryPath: string;
          id: number;
          cmtCnt: number;
          score: number;
          description: string;
          img: string;
        }) => (
          <BoardItem {...item} key={item.id} />
        )
      )}
      {boardList.data?.data?.boardCnt > limit && (
        <Button color="blankBlue" radius="medium" onClick={stretchLimit}>
          게시글들 더보기
        </Button>
      )}
    </div>
  );
}

export function BoardItem({
  title,
  categoryPath,
  category,
  id,
  cmtCnt,
  score,
  description,
  img,
}: {
  title: string;
  category: string;
  categoryPath: string;
  id: number;
  cmtCnt: number;
  score: number;
  description: string;
  img: string;
}) {
  return (
    <Link href={`/category/${categoryPath}/${id}`}>
      <div className="py-2">
        <div className="flex border border-bgGray rounded-2xl w-full h-full">
          <div className="h-32 min-w-32 rounded-l-2xl object-cover">
            <Image
              src={img}
              alt={"no image"}
              className="h-full w-full rounded-l-2xl"
              width={20}
              height={20}
            ></Image>
          </div>
          <div className="w-full p-2 h-32 flex flex-col gap-1">
            <div className="flex w-full items-center justify-between flex-wrap">
              <div className="text-sm font-bold text-mainBlue">{category}</div>
              <div className="flex flex-wrap">
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
                    {cmtCnt}
                  </ImgButton>
                </div>
                <div>
                  <ImgButton
                    color="none"
                    isNobold={true}
                    size="smallest"
                    icon={
                      <Star
                        className="text-borderGray w-[15px]"
                        isFill={true}
                      />
                    }
                    isLessGap={true}
                    className="text-textBlue text-xs"
                  >
                    {score}
                  </ImgButton>
                </div>
              </div>
            </div>
            <div className="text-sm text-textStrongGray font-bold">{title}</div>
            <div className="text-xs w-full break-all pre-wrap overflow-hidden text-fakeBlack">
              {description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
