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
import { useQuery_getCategories, useQuery_getOwnInfo } from "../lib/data";
import { LoadingSpin } from "./loadingSpin";
import { MenuBar_user } from "@/public/menuBar_user";
import Image from "next/image";

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
            <CategoryList close={write.close} />
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

export const CategoryList = ({ close }: { close: () => void }) => {
  const categoryInfo = useQuery_getCategories();
  if (categoryInfo.isLoading) return <LoadingSpin bgColorClass={"bg-white"} />;
  let count = 0;
  let temp: { path: string; img: string; description: string; id: number }[] =
    [];
  const inputList: Array<
    { path: string; img: string; description: string; id: number }[]
  > = [];
  if (categoryInfo.data?.data?.categories) {
    const categories = categoryInfo.data?.data.categories.slice(1);
    for (let item of categories) {
      count++;
      temp.push({
        path: `/write?category=${item.path}`,
        description: item.description,
        img: item.img,
        id: item.id,
      });
      if (count % 2 == 0) {
        inputList.push(temp);
        temp = [];
      }
    }
    if (temp.length > 0) inputList.push(temp);
  }
  return (
    <div>
      <div className="px-4">
        <div className="text-center text-xl font-bold">
          게시글을 작성해보세요!
        </div>
        <div className="text-sm text-bgGray text-center">
          원하는 카테고리를 선택하시면 게시글 작성 페이지로 이동합니다!
        </div>
      </div>
      {inputList.map((item) => (
        <CategoryBox list={item} key={item[0].id} close={close} />
      ))}
    </div>
  );
};

export const CategoryBox = ({
  list,
  close,
}: {
  list: { path: string; img: string; description: string }[];
  close: () => void;
}) => {
  return (
    <div className="py-4">
      <div className="flex justify-between w-full px-4">
        <Link href={list[0].path} onClick={close}>
          <CategoryTop img={list[0].img} />
        </Link>
        {list[1]?.path ? (
          <Link href={list[1].path} onClick={close}>
            <CategoryTop img={list[1]?.img} />
          </Link>
        ) : (
          <CategoryTop />
        )}
      </div>
      <div className="flex justify-between w-full px-4">
        <Link href={list[0].path} onClick={close}>
          <CategoryBottom description={list[0].description} />
        </Link>
        {list[1]?.path ? (
          <Link href={list[1].path} onClick={close}>
            <CategoryBottom description={list[1].description} />
          </Link>
        ) : (
          <CategoryBottom />
        )}
      </div>
    </div>
  );
};

export const CategoryTop = ({ img }: { img?: string }) => {
  return img ? (
    <div className="border-x border-t border-borderGray w-32 h-10">
      <Image
        src={img}
        width={20}
        height={20}
        alt="no image"
        className="w-full h-full"
      />
    </div>
  ) : (
    <div hidden className="border-x border-t border-borderGray w-32 h-10"></div>
  );
};
export const CategoryBottom = ({ description }: { description?: string }) => {
  return (
    <div
      hidden={description ? false : true}
      className="border border-borderGray w-32 p-4 pre-wrap h-full text-sm text-bgGray"
    >
      {description ? description : ""}
    </div>
  );
};
