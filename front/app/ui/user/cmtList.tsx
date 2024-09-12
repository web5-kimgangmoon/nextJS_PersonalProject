import { useStretchBtn } from "@/app/hooks/strechBtn";
import { likeCmt } from "@/app/lib/actions";
import { mycmtData } from "@/app/lib/placeholder-data";
import { getTimeString } from "@/app/lib/utils";
import { Button, ImgButton } from "@/app/ui/buttons";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Image from "next/image";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import parse from "html-react-parser";

export function CmtList() {
  const { limit, stretchLimit } = useStretchBtn();
  const mycmt = {
    cmtList: mycmtData.cmtList.slice(0, limit),
    cmtCnt: mycmtData.cmtCnt,
  };
  const refetch = () => {};
  return (
    <div>
      {mycmt.cmtList.map((item) => (
        <MyCmt
          key={item.id}
          {...item}
          createdAt={getTimeString(item.createdAt)}
          requestLike={async () => {
            await likeCmt(item.id, false);
            refetch();
          }}
          requestDislike={async () => {
            await likeCmt(item.id, true);
            refetch();
          }}
          cmtCnt={mycmt.cmtCnt}
        />
      ))}
      {mycmt.cmtCnt > limit && (
        <Button color="blankBlue" radius="medium" onClick={stretchLimit}>
          댓글들 더보기
        </Button>
      )}
    </div>
  );
}

export const MyCmt = ({
  category,
  categoryPath,
  cmtCnt,
  boardTitle,
  writerProfile,
  writer,
  createdAt,
  content,
  isDoLike,
  isDoDislike,
  like,
  dislike,
  requestLike,
  requestDislike,
  boardId,
}: {
  category: string;
  categoryPath: string;
  cmtCnt: number;
  boardTitle: string;
  writerProfile: string;
  writer: string;
  createdAt: string;
  content: string;
  isDoLike: boolean;
  isDoDislike: boolean;
  like: number;
  dislike: number;
  requestLike: () => void;
  requestDislike: () => void;
  boardId: number;
}) => {
  const [cleanContent, setCleanContent] = useState("");
  useEffect(() => {
    setCleanContent(DOMPurify.sanitize(content));
  }, [content]);

  return (
    <div className="py-2 flex flex-col gap-2">
      <div className="flex text-bgGray gap-4">
        <div className="text-textStrongGray font-bold">{category}</div>
        <div>•</div>
        <div>{`댓글 ${cmtCnt}`}</div>
      </div>
      <div className="text-textStrongGray font-bold text-2xl">{boardTitle}</div>
      <div className="flex gap-2">
        <Image
          src={writerProfile ? writerProfile : "/placeholder-noavatar32.svg"}
          alt="no image"
          width={30}
          height={30}
          className="rounded-full w-14 h-14"
        />

        <div className="flex flex-col gap-3">
          <div className="flex text-bgGray gap-4">
            <div className="text-mainBlue font-bold">{writer}</div>
            <div>•</div>
            <div>{createdAt}</div>
          </div>
          <div>{parse(cleanContent)}</div>
          <div className="flex items-center">
            <div>
              <ImgButton
                icon={<ArrowUpIcon strokeWidth={4} />}
                size="small"
                color={isDoLike ? "onlyTextBlue" : "onlyTextInactive"}
                isRight={true}
                className="text-sm"
                onClick={requestLike}
              >
                {like}
              </ImgButton>
            </div>
            <div>
              <ImgButton
                icon={<ArrowDownIcon strokeWidth={4} />}
                size="small"
                color={isDoDislike ? "onlyTextRed" : "onlyTextInactive"}
                isRight={true}
                className="text-sm"
                onClick={requestDislike}
              >
                {dislike}
              </ImgButton>
            </div>
            <div className="pl-3 text-sm text-bgGray hover:text-mainBlue">
              <Link href={`/category/${categoryPath}/${boardId}`}>
                해당 게시글로
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
