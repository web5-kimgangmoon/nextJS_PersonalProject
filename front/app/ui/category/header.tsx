"use client";

import Link from "next/link";
import { LinkButton, MenuBarBtn, ImgButton } from "../buttons";
import { useCallback, useState } from "react";
import { Modal } from "@/app/ui/modal";

export function Header({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="flex justify-between items-center py-1 px-1">
      <div>
        <MenuBarBtn />
        <Link href={"/category"} className="text-2xl text-mainBlue font-bold">
          The board
        </Link>
      </div>
      <div>{isLogin ? <div></div> : <OnLogin />}</div>
    </div>
  );
}

export function OnLogin() {
  const [open, setOpen] = useState<boolean>(false);
  const ctlModal = useCallback(() => {
    setOpen(!open);
  }, []);
  return (
    <>
      <Modal modalCtl={open} closeModalCtl={ctlModal} />
      <div className="flex gap-1">
        <ImgButton
          color={"noneBlue"}
          img={"/noLineArrow.svg"}
          isRight={true}
          size="small"
          radius="none"
          isImgSmall={true}
          isLessGap={true}
          onClick={ctlModal}
        >
          로그인
        </ImgButton>
        <LinkButton
          href="/login/regist"
          color="blue"
          size="small"
          radius="little"
        >
          회원가입
        </LinkButton>
      </div>
    </>
  );
}
