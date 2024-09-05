"use client";

import { userInfoData } from "@/app/lib/placeholder-data";
import Link from "next/link";

export function Footer() {
  const userInfo = userInfoData;
  return (
    <div className="py-8 px-8">
      <div className="border-t border-borderGray flex flex-col gap-5 py-5">
        {userInfo.id ? <OnLogin /> : <OffLogin />}
        {userInfo.id ? "" : <OnAdmin />};
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

export function LinkBox({
  elements,
  title,
  isExternal,
}: {
  elements: Array<{ href: string; title: string }>;
  title: string;
  isExternal?: boolean;
}) {
  return (
    <div className="text-xl text-textBlue font-bold">
      <div className="flex justify-center py-3">{title}</div>
      <ul className="flex flex-col gap-3 text-[#042552]/50">
        {isExternal
          ? elements.map((item, idx) => (
              <div className="flex justify-center" key={idx}>
                <a
                  href={item.href}
                  className="w-max hover:text-mainBlue hover:text-mainBlue/100 transition-colors"
                  tabIndex={0}
                >
                  <li>{item.title}</li>
                </a>
              </div>
            ))
          : elements.map((item, idx) => (
              <div className="flex justify-center" key={idx}>
                <Link
                  href={item.href}
                  className="w-max hover:text-mainBlue hover:text-mainBlue/100 transition-colors"
                >
                  <li>{item.title}</li>
                </Link>
              </div>
            ))}
      </ul>
    </div>
  );
}

export function OnLogin() {
  return (
    <>
      <LinkBox
        title="사용자"
        elements={[
          { title: "유저정보", href: `/user` },
          { title: "로그아웃", href: `/logout` },
        ]}
      />

      <LinkBox
        title="게시글"
        elements={[{ title: "글작성", href: `/write` }]}
      />
    </>
  );
}
export function OffLogin() {
  return (
    <>
      <LinkBox
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
      <LinkBox
        title="운영자"
        isExternal={true}
        elements={[
          {
            title: "운영자 페이지",
            href: `${process.env.NEXT_PUBLIC_ADMIN}`,
          },
        ]}
      />
    </>
  );
}
