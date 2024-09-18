"use client";

import Link from "next/link";
import { LinkButton, ImgButton } from "../buttons";
import { useCallback, useState } from "react";
import {
  Modal,
  Modal_little,
  ModalA,
  ModalBox,
  ModalLink,
  ModalRequest,
  ModalRouterBox,
} from "@/app/ui/modal";
import Image from "next/image";
import { useLogout } from "@/app/lib/actions";
import { useQuery_getCategories, useQuery_getOwnInfo } from "@/app/lib/data";
import { LoadingSpin } from "../loadingSpin";
import { useQueryClient } from "@tanstack/react-query";
import { useModalText } from "@/app/hooks/modal";

export function Header() {
  const categoryListData = useQuery_getCategories();
  const userInfoData = useQuery_getOwnInfo();
  if (
    categoryListData.isLoading ||
    userInfoData.isLoading ||
    !categoryListData.data ||
    !userInfoData.data
  )
    return <LoadingSpin bgColorClass="bg-categoryGray" />;
  const categoryList = [{ name: "전체", href: "/category/all" }];
  for (let item of categoryListData.data.data.categories)
    categoryList.push({
      name: item.name,
      href: `/category/${item.path}`,
    });
  return (
    <div className="flex justify-between items-center py-2 px-2">
      <div>
        <MenuBarBtn
          isLogin={userInfoData.data.data.userInfo?.id ? true : false}
          categoryList={categoryList}
        />
        <Link href={"/category"} className="text-xl text-mainBlue font-bold">
          The board
        </Link>
      </div>
      <div>
        {userInfoData.data.data.userInfo?.id ? (
          <OnLogin profile={userInfoData.data.data.userInfo?.profileImg} />
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
        img="/menuBar.svg"
        // icon={<Image src=  width={0}/>}
        color={"none"}
        size="smallest"
        onClick={() => setOpen(!open)}
      />
    </>
  );
};

export function OnLogin({ profile }: { profile?: null | string }) {
  const [open, setOpen] = useState<boolean>(false);
  const ctlClose = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Modal modalCtl={open} closeModalCtl={ctlClose} isSmallX={false}>
        <ProfileModalContent closeModal={ctlClose} />
      </Modal>
      <div className="pr-1">
        <div className="w-12 h-12">
          <Image
            src={profile ? profile : "/placeholder-noavatar32.svg"}
            width={35}
            height={35}
            alt="no userImg"
            onClick={() => setOpen(!open)}
            className="w-full h-full"
          />
        </div>
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

  const queryClient = useQueryClient();
  const modalText = useModalText();
  const logout = useLogout(
    () => queryClient.refetchQueries({ queryKey: ["get", "userInfo"] }),
    modalText.openText
  );
  const toggleBox = useCallback(
    (key: "user" | "category") => {
      setOpenObj({ ...openObj, [key]: !openObj[key] });
    },
    [openObj]
  );
  return (
    <>
      <Modal_little closeModalCtl={modalText.close} modalCtl={modalText.is}>
        {modalText.text}
      </Modal_little>
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

                  // {
                  //   title: "운영자 페이지로",
                  //   href: `${process.env.NEXT_PUBLIC_ADMIN}`,
                  //   isA: true,
                  // },
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
          <ModalRequest
            request={() => {
              logout.mutate();
            }}
            closeModal={closeModal}
            isBorder={true}
          >
            로그아웃
          </ModalRequest>
        )}
      </div>
    </>
  );
};

export const LoginModalContent = () => {
  return (
    <div className="py-2">
      <ModalLink href="/login">일반 로그인</ModalLink>
      {/* <ModalA href={process.env.NEXT_PUBLIC_ADMIN as string}>
        운영자 로그인
      </ModalA> */}
    </div>
  );
};

export const ProfileModalContent = ({
  closeModal,
}: {
  closeModal: () => void;
}) => {
  const queryClient = useQueryClient();
  const modalText = useModalText();
  const logout = useLogout(
    () => queryClient.refetchQueries({ queryKey: ["get", "userInfo"] }),
    modalText.openText
  );
  return (
    <>
      <Modal_little closeModalCtl={modalText.close} modalCtl={modalText.is}>
        {modalText.text}
      </Modal_little>
      <div className="py-2">
        <ModalLink href="/user">프로필 확인</ModalLink>
        <ModalRequest
          request={() => {
            logout.mutate();
          }}
          closeModal={closeModal}
          isBorder={true}
        >
          로그아웃
        </ModalRequest>
      </div>
    </>
  );
};
