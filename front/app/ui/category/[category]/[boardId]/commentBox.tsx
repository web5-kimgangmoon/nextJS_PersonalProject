"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/buttons";

export const WriteCmt = ({}: //   id,
//   isBoard,
//   isOpen,
//   modalToggle,
{
  //   id: string;
  //   isBoard?: boolean;
  //   isOpen: boolean;
  //   modalToggle: () => void;
}) => {
  //   const router = useRouter();
  //   new FormData();
  //   const [reason, setReason] = useState<string>();
  //   const selectReason = useCallback((str: string) => {
  //     setReason(str);
  //   }, []);

  return (
    <WriteCmtComp
    //   setReason={selectReason}
    //   reason={reason}
    //   modalClose={modalToggle}
    //   isOpen={isOpen}
    />
  );
};

export const WriteCmtComp = () => {
  let isEnable = true;
  const placeholder = "아아아아아아";
  const heightChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.scrollHeight > e.currentTarget.clientHeight)
      e.currentTarget.style.height =
        String(e.currentTarget.scrollHeight) + "px";
  }, []);
  const id = 2;
  const writeId = `cmtWrite${id}`;
  return (
    <div>
      <div className="border-4 border-borderGray rounded-t-lg p-2 text-base bg-white">
        <textarea
          rows={3}
          placeholder={placeholder}
          className="w-full h-full outline-none"
          onChange={heightChange}
        />
      </div>
      <div className="border-4 border-t-0 border-borderGray rounded-b-lg p-2 flex justify-between bg-white items-center">
        <div className="flex">
          <input
            type={"file"}
            multiple={false}
            onChange={(e) => {
              console.log(e.currentTarget.value);
            }}
          />
          <div className="text-[#7F919E]/60 w-12 h-12">
            <PhotoIcon />
          </div>
          <div className="p-2 border-r-2"></div>
        </div>
        <div className="">
          <Button color={isEnable ? "blue" : "inactiveGray"} size="short">
            작성완료
          </Button>
        </div>
      </div>
    </div>
  );
};
