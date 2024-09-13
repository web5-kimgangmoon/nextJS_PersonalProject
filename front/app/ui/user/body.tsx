"use client";

import { ReactNode, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { CmtList } from "./cmtList";
import { BoardList } from "./boardList";

export function Body() {
  const query = useSearchParams();

  const selectedMenu = query.get("select");
  if (selectedMenu === "boardList")
    return (
      <UserInfoBox>
        <Header>WRITTEN BOARDS</Header>
        <BoardList />
      </UserInfoBox>
    );
  return (
    <UserInfoBox>
      <CmtList />
    </UserInfoBox>
  );
}

export function UserInfoBox({ children }: { children: ReactNode }) {
  return (
    <div className="p-3">
      <div className="p-2 bg-white rounded-xl shadow-xl">{children}</div>
    </div>
  );
}

export function Header({
  children,
  isNoBorder = false,
  colorClass,
}: {
  children: string;
  isNoBorder?: boolean;
  colorClass?: string;
}) {
  return (
    <div className="py-3">
      <div className={clsx("p-3", !isNoBorder && "border-b border-borderGray")}>
        <div
          className={clsx(
            "text-2xl font-bold",
            colorClass ? colorClass : "text-mainBlue"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
