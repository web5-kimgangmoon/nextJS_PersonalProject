"use client";

import Link from "next/link";
import { LinkButton, ImgButton } from "../buttons";
import { useCallback, useState } from "react";
import {
  Modal,
  ModalA,
  ModalBox,
  ModalLink,
  ModalRouterBox,
} from "@/app/ui/modal";
import { categoryListData, userInfoData } from "@/app/lib/placeholder-data";
import Image from "next/image";

export function Header() {
  const categoryList = categoryListData.categories.map((item) => ({
    name: item.name,
    href: `/category/${item.path}`,
  }));
  return (
    <div className="flex justify-between items-center py-2 px-2">
      <div>
        <MenuBarBtn
          isLogin={userInfoData.userInfo?.id ? true : false}
          categoryList={categoryList}
        />
        <Link href={"/category"} className="text-xl text-mainBlue font-bold">
          The board
        </Link>
      </div>
      <div>
        {userInfoData.userInfo?.id ? (
          <OnLogin profile={userInfoData.userInfo?.profileImg} />
        ) : (
          <OffLogin />
        )}
      </div>
    </div>
  );
}

export const MenuBarBtn = ({
  isLogin,
  categoryList,
}: {
  isLogin: boolean;
  categoryList: { name: string; href: string }[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Modal modalCtl={open} closeModalCtl={closeModal}>
        <MenuModalContent
          isLogin={isLogin}
          categoryList={categoryList}
          closeModal={closeModal}
        />
      </Modal>
      <ImgButton
        icon={<img src="/menuBar.svg" />}
        color={"none"}
        size="smallest"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export function OnLogin({ profile }: { profile?: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const ctlClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Modal modalCtl={open} closeModalCtl={ctlClose} isSmallX={false}>
        <ProfileModalContent />
      </Modal>
      <div className="pr-1">
        <Image
          src={profile ? profile : "/placeholder-noavatar32.svg"}
          width={35}
          height={35}
          alt="no userImg"
          onClick={() => setOpen(!open)}
        />
      </div>
    </>
  );
}

export function OffLogin() {
  const [open, setOpen] = useState<boolean>(false);
  const ctlClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Modal modalCtl={open} closeModalCtl={ctlClose} isSmallX={false}>
        <LoginModalContent />
      </Modal>
      <div className="flex gap-1">
        <ImgButton
          color={"noneBlue"}
          img={open ? "/noLineArrowReverse.svg" : "/noLineArrow.svg"}
          isRight={true}
          size="small"
          radius="none"
          isImgSmall={true}
          isLessGap={true}
          onClick={() => setOpen(!open)}
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

export const MenuModalContent = ({
  isLogin,
  categoryList,
  closeModal,
}: {
  isLogin: boolean;
  categoryList: { name: string; href: string }[];
  closeModal: () => void;
}) => {
  const [openObj, setOpenObj] = useState<{ user: boolean; category: boolean }>({
    user: false,
    category: false,
  });

  const toggleBox = useCallback(
    (key: "user" | "category") => {
      setOpenObj({ ...openObj, [key]: !openObj[key] });
    },
    [openObj]
  );
  return (
    <div className="py-2">
      <ModalBox
        title="사용자"
        isOpen={openObj["user"]}
        setIsOpen={() => toggleBox("user")}
        linkList={
          isLogin
            ? [
                { title: "유저정보", href: "/user" },
                { title: "글작성", href: "/write" },
              ]
            : [
                { title: "로그인", href: "/login" },
                { title: "회원가입", href: "/login/regist" },

                {
                  title: "운영자 페이지로",
                  href: `${process.env.NEXT_PUBLIC_ADMIN}`,
                  isA: true,
                },
              ]
        }
      />
      <ModalRouterBox
        title="카테고리"
        isOpen={openObj["category"]}
        setIsOpen={() => toggleBox("category")}
        linkList={categoryList.map((item) => ({
          title: item.name,
          href: item.href,
        }))}
        closeModal={closeModal}
      />
      {isLogin && (
        <ModalLink href="/logout" isBorder={true}>
          로그아웃
        </ModalLink>
      )}
    </div>
  );
};

export const LoginModalContent = () => {
  return (
    <div className="py-2">
      <ModalLink href="/login">일반 로그인</ModalLink>
      <ModalA href={process.env.NEXT_PUBLIC_ADMIN as string}>
        운영자 로그인
      </ModalA>
    </div>
  );
};

export const ProfileModalContent = () => {
  return (
    <div className="py-2">
      <ModalLink href="/user">프로필 확인</ModalLink>
      <ModalLink href="/logout" isBorder={true}>
        로그아웃
      </ModalLink>
    </div>
  );
};
