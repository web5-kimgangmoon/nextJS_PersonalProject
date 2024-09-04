"use client";

import clsx from "clsx";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Dots } from "@/public/dots";
import Link from "next/link";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
export const CmtList = () => {
  return <CmtBox replyId={1} />;
};

export const CmtBox = ({ replyId }: { replyId?: number }) => {
  const [isOpenCmt, setIsOpenCmt] = useState<boolean>(true);
  const writerId = 2;
  const writer = "나는야작성자";
  const createdAt = new Date();
  const content = `<div>
<div style='
    width: 10rem;
    height: 10rem;
'>
<img style='
    width: 100%;
    height: 100%;
'
src='/baseBoardImg.png'
>
</div>
<div>
</div>아아아아</div>`;
  const [cleanContent, setCleanContent] = useState("");
  useEffect(() => {
    setCleanContent(DOMPurify.sanitize(content));
  }, [content]);
  return (
    <div className="px-2">
      <div
        className={clsx(
          "flex w-full h-full",
          isOpenCmt ? "items-start" : "items-center"
        )}
      >
        <Image
          src="/baseBoardImg.png"
          alt="no image"
          className="w-20 h-20 rounded-3xl"
          width={0}
          height={0}
        />

        <div className="grow pl-2 py-2">
          <div className="flex justify-between">
            <div className="text-xl text-mainBlue font-bold hover:text-textBlue">
              <Link href={`/user/${writerId}`}>{writer}</Link>
            </div>
            <div className="text-[#656C7A] w-10 h-10">
              <Dots />
            </div>
          </div>
          <div className="text-sm text-modalText">{`${createdAt.getFullYear()}-${String(
            createdAt.getMonth() + 1
          ).padStart(2, "0")}-${String(createdAt.getDate()).padStart(
            2,
            "0"
          )} ${String(createdAt.getHours()).padStart(2, "0")}:${String(
            createdAt.getMinutes()
          ).padStart(2, "0")}`}</div>
          <div></div>
          {/* <DOMpurifyContent content={content} /> */}
          <div className="text-black">{parse(cleanContent)}</div>
          <div></div>
        </div>
      </div>
      <div className={clsx(!replyId && "pl-2")}></div>
    </div>
  );
};

{
  /* <WriteCmt
idx={1}
boardId={1}
cmtId={2}
isOpen={true}
isUpdate={true}
baseText="ddd"
img="/baseBoardImg.png"
modalToggle={function ss() {}}
/> */
}
