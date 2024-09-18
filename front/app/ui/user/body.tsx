"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { CmtList } from "./cmtList";
import { BoardList } from "./boardList";
import { useRouter } from "next/navigation";
import { CreatedAt } from "./createdAt";
import { SocialConnect } from "./socialConnect";
import { useQuery_getOwnInfo } from "@/app/lib/data";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { LoadingSpin } from "../loadingSpin";
import { Modal_little } from "../modal";
import { Withdraw } from "./withdraw";

export function Body() {
  const query = useSearchParams();
  const params = useParams();
  const { intCheck } = useTypeCheck_zod();
  const userId = intCheck.safeParse(params.userId) ? +params.userId : undefined;

  const userInfo = useQuery_getOwnInfo();
  const selectedMenu = query.get("select");

  if (userInfo.isLoading) return <LoadingSpin bgColorClass="bg-userInfoGray" />;
  if (!userInfo.data?.data.userInfo && !userId) return <Redirect />;
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
  // if (
  //   selectedMenu === "connectId" &&
  //   (!userId || userId === userInfo.data?.data?.userInfo?.id)
  // )
  //   return (
  //     <UserInfoBox>
  //       <SocialConnect />
  //     </UserInfoBox>
  //   );
  if (
    selectedMenu === "withdraw" &&
    (!userId || userId === userInfo.data?.data?.userInfo?.id)
  )
    return (
      <UserInfoBox>
        <Withdraw />
      </UserInfoBox>
    );
  return (
    <UserInfoBox>
      <CmtList />
    </UserInfoBox>
  );
}

const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/category/all");
  }, []);
  return (
    <Modal_little modalCtl={true} closeModalCtl={() => {}}>
      유저정보가 존재하지 않습니다.
    </Modal_little>
  );
};

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
