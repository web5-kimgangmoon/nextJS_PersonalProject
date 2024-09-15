"use client";

import { ReactNode, useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { CmtList } from "./cmtList";
import { BoardList } from "./boardList";
import { useRouter } from "next/navigation";
import { CreatedAt } from "./createdAt";
import { SocialConnect } from "./socialConnect";
import { useQuery_getUserInfo } from "@/app/lib/data";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { LoadingSpin } from "../loadingSpin";

export function Body() {
  const query = useSearchParams();
  const params = useParams();
  const { intCheck } = useTypeCheck_zod();
  const userId = intCheck.safeParse(params.userId) ? +params.userId : undefined;

  const userInfo = useQuery_getUserInfo(userId);
  const selectedMenu = query.get("select");
  const router = useRouter();

  if (userInfo.isLoading) return <LoadingSpin bgColorClass="bg-userInfoGray" />;
  if (!userId && !userInfo.data?.data?.userInfo?.id)
    router.replace("/category/all");
  if (selectedMenu === "boardList")
    return (
      <UserInfoBox>
        <Header>WRITTEN BOARDS</Header>
        <BoardList />
      </UserInfoBox>
    );
  if (selectedMenu === "createdAt")
    return (
      <UserInfoBox>
        <Header colorClass="text-textStrongGray" isNoBorder={true}>
          CREATEAT
        </Header>
        <CreatedAt />
      </UserInfoBox>
    );
  if (selectedMenu === "connectId")
    return (
      <UserInfoBox>
        <SocialConnect />
      </UserInfoBox>
    );
  if (selectedMenu === "withdraw" && !params.userId)
    return (
      <UserInfoBox>
        <SocialConnect />
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
