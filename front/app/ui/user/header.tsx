"use client";

import Link from "next/link";
import { ImgButton, LinkButton } from "../buttons";
import { PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { userInfoData } from "@/app/lib/placeholder-data";
import { useEffect, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { SlideBar } from "../slideBar";
import { useSlide } from "@/app/hooks/slide";
import { UserInfoData } from "@/app/lib/definitions";
import { useToggle } from "@/app/hooks/toggle";
import { Modal } from "../modal";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { useQuery_getUserInfo } from "@/app/lib/data";
import { LoadingSpin } from "../loadingSpin";

export function Header() {
  const query = useSearchParams();
  const params = useParams();
  const { intCheck } = useTypeCheck_zod();
  const userId = intCheck.safeParse(params.userId) ? +params.userId : undefined;

  const userInfo = useQuery_getUserInfo(userId);
  const router = useRouter();
  const search = useSearchParams();

  if (userInfo.isLoading) return <LoadingSpin bgColorClass="bg-userInfoGray" />;
  const isOwn = !userId && !userInfo.data?.data?.userInfo?.id;
  if (isOwn) router.replace("/category/all");

  return (
    <div>
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(150deg, #61e7ff, rgba(97, 231, 255, 0) 45%), #2e9fff",
        }}
      >
        <div
          className="bg-white absolute top-0 left-0 h-full w-full"
          style={{ clipPath: "polygon(0 50%, 100% 25%, 100% 100%, 0% 100%)" }}
        ></div>
        <HeaderTop />
        <div className="w-full py-8 z-10 flex flex-col gap-4 justify-center items-center z-10 relative">
          <div className="w-40 h-40 rounded-full">
            <Image
              src={
                userInfo.data?.data?.userInfo?.profileImg
                  ? userInfo.data?.data?.userInfo?.profileImg
                  : "/bigBaseUserImg.svg"
              }
              width={30}
              height={30}
              objectFit="contain"
              alt="no image"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="text-center text-textBlue">
            <div className="text-2xl">
              {userInfo.data?.data?.userInfo?.nick
                ? userInfo.data?.data?.userInfo?.nick
                : "not found"}
            </div>
            <div className="text-xl">
              {userInfo.data?.data?.userInfo?.email
                ? userInfo.data?.data?.userInfo?.email
                : "not found"}
            </div>
          </div>
          <div className="flex gap-3 text-center">
            <ValueItem
              title="댓글수"
              value={
                userInfo.data?.data?.userInfo?.cmtCnt
                  ? userInfo.data?.data?.userInfo?.cmtCnt
                  : 0
              }
            />
            <ValueItem
              title="게시글수"
              value={
                userInfo.data?.data?.userInfo?.boardsCnt
                  ? userInfo.data?.data?.userInfo?.boardsCnt
                  : 0
              }
            />
            <ValueItem
              title="추천수"
              value={
                userInfo.data?.data?.userInfo?.like
                  ? userInfo.data?.data?.userInfo?.like
                  : 0
              }
            />
            <ValueItem
              title="비추천수"
              value={
                userInfo.data?.data?.userInfo?.dislike
                  ? userInfo.data?.data?.userInfo?.dislike
                  : 0
              }
            />
          </div>
          {isOwn && (
            <div>
              <LinkButton
                href="/user/"
                size="short"
                color="blue"
                className="px-6 py-4"
              >
                프로필 수정
              </LinkButton>
            </div>
          )}
        </div>
      </div>
      <SlideUserInfo
        selectedMenu={search.get("select")}
        userInfo={userInfo.data?.data}
        isOwn={isOwn}
      />
    </div>
  );
}

export function HeaderTop() {
  const write = useToggle(false);
  const menu = useToggle(false);
  return (
    <div className="flex justify-between items-center relative">
      <div className="p-2">
        <Link href={"/category"} className="text-white font-bold text-2xl">
          The Board
        </Link>
      </div>
      <div className="flex items-center">
        <div>
          <ImgButton
            size="medium"
            color="whiteBlue"
            radius="a little"
            icon={<PencilIcon strokeWidth={2} />}
            isLessGap={true}
            onClick={write.open}
          >
            글쓰기
          </ImgButton>
          <Modal
            curtainColor="white"
            closeModalCtl={write.close}
            isSmallX={true}
            isTranslucent={true}
            modalCtl={write.is}
            isShutDown={true}
          >
            <div>아아</div>
          </Modal>
        </div>
        <div className="p-2">
          <ImgButton
            size="small"
            color="none"
            img="/menuBar_user.svg"
            isImgBig={true}
            isNoString={true}
            onClick={menu.open}
          />
          <Modal
            curtainColor="white"
            closeModalCtl={menu.close}
            isSmallX={true}
            isTranslucent={true}
            modalCtl={menu.is}
            isShutDown={true}
          >
            <div></div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export function ValueItem({
  title,
  value = 0,
}: {
  title: string;
  value?: number;
}) {
  return (
    <div>
      <div className="text-fakeBlack text-xl">{value}</div>
      <div className="text-modalText">{title}</div>
    </div>
  );
}

export function SlideUserInfo({
  userInfo,
  selectedMenu,
  isOwn,
}: {
  userInfo: UserInfoData;
  selectedMenu?: string | null;
  isOwn: boolean;
}) {
  const slideList = useMemo(() => {
    const list = [
      {
        title: `댓글 ${userInfo.userInfo ? userInfo.userInfo.cmtCnt : 0}`,
        path: "cmtList",
      },

      {
        title: `게시글 ${userInfo.userInfo ? userInfo.userInfo.boardsCnt : 0}`,
        path: "boardList",
      },

      {
        title: "생성일",
        path: "createdAt",
      },

      {
        title: `소셜연동`,
        path: "connectId",
      },
    ].map((item) => ({
      path: `/user?select=${item.path}`,
      title: item.title,
      selected: item.path === selectedMenu,
    }));
    isOwn &&
      list.push({
        path: `/user?select=${"withdraw"}`,
        title: "회원탈퇴",
        selected: "withdraw" === selectedMenu,
      });
    return list;
  }, [selectedMenu, userInfo.userInfo]);
  const { touchMove, touchStart, location } = useSlide();
  return (
    <div className="py-4">
      <div className="bg-white shadow-xl">
        <SlideBar
          list={slideList}
          isUserInfo={true}
          touchMove={touchMove}
          touchStart={touchStart}
          location={location}
        />
      </div>
    </div>
  );
}
