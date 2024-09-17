"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useModalText } from "../hooks/modal";
import { useToggle } from "../hooks/toggle";
import { useLogout } from "../lib/actions";
import Link from "next/link";
import clsx from "clsx";
import { Button, ImgButton, LinkButton } from "./buttons";
import { HomeIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Modal, Modal_little } from "./modal";
import { useQuery_getOwnInfo } from "../lib/data";
import { LoadingSpin } from "./loadingSpin";
import { MenuBar_user } from "@/public/menuBar_user";

export function HeaderTop({ isColorWhite }: { isColorWhite?: boolean }) {
  const write = useToggle(false);
  const menu = useToggle(false);
  const modalText = useModalText();
  const queryClient = useQueryClient();
  const userInfo = useQuery_getOwnInfo();
  const logout = useLogout(
    () => queryClient.refetchQueries({ queryKey: ["get", "userInfo", "own"] }),
    modalText.openText
  );

  if (userInfo.isLoading)
    return (
      <LoadingSpin
        bgColorClass={isColorWhite ? "bg-white" : "bg-userInfoGray"}
      />
    );
  const isLogin = userInfo.data?.data?.userInfo?.id ? true : false;
  return (
    <div className="flex justify-between items-center relative">
      <div className="p-2">
        <Link
          href={"/category"}
          className={clsx(
            isColorWhite ? "text-mainBlue" : "text-white",
            "font-bold text-2xl"
          )}
        >
          The Board
        </Link>
      </div>
      <div className="flex items-center">
        <div>
          {isLogin && (
            <ImgButton
              size="medium"
              color={"whiteBlue"}
              radius="a little"
              icon={<PencilIcon strokeWidth={2} />}
              isLessGap={true}
              onClick={write.open}
            >
              글쓰기
            </ImgButton>
          )}
          <Modal
            curtainColor={"white"}
            closeModalCtl={write.close}
            isSmallX={true}
            isTranslucent={true}
            modalCtl={write.is}
            isShutDown={true}
          >
            <div>
              <div></div>
              <div></div>
            </div>
          </Modal>
        </div>
        <div className="p-2">
          <div className="h-12 w-12">
            <ImgButton
              size="small"
              color="none"
              icon={
                <MenuBar_user
                  className={isColorWhite ? "text-mainBlue" : "text-white"}
                />
              }
              isImgBig={true}
              isNoString={true}
              onClick={menu.open}
            />
          </div>
          <Modal
            curtainColor={"white"}
            closeModalCtl={menu.close}
            isSmallX={true}
            isTranslucent={true}
            modalCtl={menu.is}
            isShutDown={true}
          >
            <div>
              <div>
                <LinkButton
                  color="onlyTextBlue"
                  size="short"
                  href="/category/all"
                  icon={<HomeIcon className="text-textGray" />}
                  isImgBig={true}
                  className="p-4"
                >
                  메인으로
                </LinkButton>
              </div>
              <div className="p-4">
                {isLogin && (
                  <Button
                    color="none"
                    size="short"
                    className="p-4 text-textBlue"
                    onClick={logout.mutate}
                  >
                    로그아웃
                  </Button>
                )}
                <Modal_little
                  closeModalCtl={modalText.close}
                  modalCtl={modalText.is}
                >
                  {modalText.text}
                </Modal_little>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
