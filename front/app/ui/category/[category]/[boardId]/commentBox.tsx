"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

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
  return (
    <div className="bg-white">
      <div className="border border-borderGray rounded-t-lg p-2 text-sm">
        <input placeholder="아아아아아아" />
      </div>
      <div className="border border-t-0 border-borderGray rounded-b-lg p-2">
        <div>아아아</div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
