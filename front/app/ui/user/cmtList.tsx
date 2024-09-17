import { useStretchBtn } from "@/app/hooks/strechBtn";
import { useLikeCmt } from "@/app/lib/actions";
import { mycmtData } from "@/app/lib/placeholder-data";
import { getTimeString, useTypeCheck_zod } from "@/app/lib/utils";
import { Button, ImgButton } from "@/app/ui/buttons";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Image from "next/image";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import parse from "html-react-parser";
import {
  useQuery_getCmt,
  useQuery_getOwnInfo,
  useQuery_getUserInfo,
} from "@/app/lib/data";
import { LoadingSpin } from "../loadingSpin";
import { useParams } from "next/navigation";
import { useModalText } from "@/app/hooks/modal";
import { Modal_little } from "../modal";

export function CmtList() {
  const { limit, stretchLimit } = useStretchBtn(5);
  const { intCheck } = useTypeCheck_zod();
  const params = useParams();
  const userId = intCheck.safeParse(params.userId) ? +params.userId : undefined;
  const ownInfo = useQuery_getOwnInfo();
  const cmtData = useQuery_getCmt({
    searh: {
      isDeleted: false,
      isOwn: !userId ? true : false,
      limit: limit,
      onlyDeleted: false,
      search: "",
      searchType: null,
      writerId: userId,
      boardId: null,
      isFlat: true,
      sort: "recently",
    },
  });

  useEffect(() => {
    cmtData.refetch();
  }, [limit]);
  const modalText = useModalText();
  const likeRequest = useLikeCmt(cmtData.refetch, modalText.openText);
  if (cmtData.isLoading || ownInfo.isLoading)
    return <LoadingSpin bgColorClass="bg-white" />;
  return (
    <>
      <Modal_little modalCtl={modalText.is} closeModalCtl={modalText.close}>
        {modalText.text}
      </Modal_little>
      <div>
        {cmtData.data?.data.cmtList.map(
          (item: {
            id: number;
            category: string;
            categoryPath: string;
            boardTitle: string;
            writerProfile: string;
            writer: string;
            createdAt: Date;
            content: string;
            isDoLike: boolean;
            isDoDislike: boolean;
            like: number;
            dislike: number;
            boardId: number;
            boardCmtCnt: number;
          }) => (
            <MyCmt
              key={item.id}
              {...item}
              createdAt={getTimeString(item.createdAt)}
              requestLike={async () =>
                await likeRequest.mutate({
                  cmtId: item.id,
                  isDislike: false,
                })
              }
              requestDislike={async () =>
                await likeRequest.mutate({
                  cmtId: item.id,
                  isDislike: true,
                })
              }
              isLogin={ownInfo.data?.data.userInfo ? true : false}
            />
          )
        )}
        {cmtData.data?.data.cmtCnt > limit && (
          <Button color="blankBlue" radius="medium" onClick={stretchLimit}>
            댓글들 더보기
          </Button>
        )}
        {!cmtData.data?.data.cmtCnt && (
          <div className="flex justify-center items-center font-bold text-2xl">
            댓글이 존재하지 않습니다
          </div>
        )}
      </div>
    </>
  );
}

export const MyCmt = ({
  category,
  categoryPath,
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
  isLogin,
  boardCmtCnt,
}: {
  category: string;
  categoryPath: string;
  boardCmtCnt: number;
  boardTitle: string;
  writerProfile: string;
  writer: string;
  createdAt: string;
  content: string;
  isDoLike: boolean;
  isDoDislike: boolean;
  like: number;
  dislike: number;
  isLogin: boolean;
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
        <div>{`댓글 ${boardCmtCnt}`}</div>
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
                onClick={isLogin ? requestLike : undefined}
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
                onClick={isLogin ? requestDislike : undefined}
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
