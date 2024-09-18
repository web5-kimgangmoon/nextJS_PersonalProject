"use client";

import { useLogout } from "@/app/lib/actions";
import { useQuery_getOwnInfo } from "@/app/lib/data";
import Link from "next/link";
import { LoadingSpin } from "../loadingSpin";
import { useQueryClient } from "@tanstack/react-query";
import { useModalText } from "@/app/hooks/modal";
import { Modal_little } from "../modal";

export function Footer() {
  const userInfoData = useQuery_getOwnInfo();
  if (userInfoData.isLoading || !userInfoData.data)
    return <LoadingSpin bgColorClass="bg-categoryGray" />;
  return (
    <div className="py-8 px-8">
      <div className="border-t border-borderGray flex flex-col gap-5 py-5">
        {userInfoData.data.data.userInfo?.id ? <OnLogin /> : <OffLogin />}
        {userInfoData.data.data.userInfo?.id ? "" : <OnAdmin />}
      </div>
      <div className="w-full border-t border-borderGray flex flex-col gap-5 py-5 items-center">
        <div className="w-max">
          <Link href="/" className="text-mainBlue text-3xl font-bold">
            The board
          </Link>
        </div>
        <div className="text-sm flex items-center flex-col gap-1 text-textBlue text-center break-keep">
          <div>@2024 kim</div>
          <div>
            위 사이트는 개인 정보를 공유하거나 거래하는 행위를 금지합니다.
          </div>
        </div>
      </div>
    </div>
  );
}

export function FooterBox({
  elements,
  title,
  isExternal,
}: {
  elements: Array<{ href?: string; request?: () => void; title: string }>;
  title: string;
  isExternal?: boolean;
}) {
  return (
    <div className="text-xl text-textBlue font-bold">
      <div className="flex justify-center py-3">{title}</div>
      <ul className="flex flex-col gap-3 text-[#042552]/50">
        {isExternal
          ? elements.map((item, idx) => (
              <li className="flex justify-center" key={idx}>
                <a
                  href={item.href}
                  className="hover:text-mainBlue hover:text-mainBlue/100 transition-colors"
                  tabIndex={0}
                >
                  {item.title}
                </a>
              </li>
            ))
          : elements.map((item, idx) =>
              item.href ? (
                <li className="flex justify-center" key={idx}>
                  <Link
                    href={item.href}
                    className="hover:text-mainBlue hover:text-mainBlue/100 transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ) : (
                <li
                  className="hover:text-mainBlue hover:text-mainBlue/100 transition-colors flex justify-center"
                  key={idx}
                >
                  <button
                    onClick={() => {
                      item.request && item.request();
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              )
            )}
      </ul>
    </div>
  );
}

export function OnLogin() {
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
      <FooterBox
        title="사용자"
        elements={[
          { title: "유저정보", href: `/user` },
          {
            title: "로그아웃",
            request: async () => {
              await logout.mutate();
            },
          },
        ]}
      />

      <FooterBox
        title="게시글"
        elements={[{ title: "글작성", href: `/write` }]}
      />
    </>
  );
}
export function OffLogin() {
  return (
    <>
      <FooterBox
        title="사용자"
        elements={[
          { title: "로그인", href: `/login` },
          { title: "회원가입", href: `/login/regist` },
        ]}
      />
    </>
  );
}
export function OnAdmin() {
  return (
    <>
      {/* <FooterBox
        title="운영자"
        isExternal={true}
        elements={[
          {
            title: "운영자 페이지",
            href: `${process.env.NEXT_PUBLIC_ADMIN}`,
          },
        ]}
      /> */}
    </>
  );
}
