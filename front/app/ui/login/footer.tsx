"use client";

import Link from "next/link";

export function Footer() {
  return (
    <div className="text-sm flex items-center flex-col gap-1 text-textBlue text-center break-keep bg-white">
      <div>@2024 kim</div>
      <div>위 사이트는 개인 정보를 공유하거나 거래하는 행위를 금지합니다.</div>
    </div>
  );
}

export function BottomLink({ isLoginPage }: { isLoginPage: boolean }) {
  return (
    <div className="p-10 break-keep text-center text-textBlue bg-white">
      {isLoginPage ? (
        <div>
          {`혹시 아이디가 없으신가요? `}
          <Link
            href={"/login/regist"}
            className="underline-offset-2 underline decoration-2 text-mainBlue hover:text-textBlue"
            // style={{ textDecoration: "" }}
          >
            회원가입
          </Link>
          {` 해보세요!`}
        </div>
      ) : (
        <div>
          {`이미 아이디가 있으신가요? `}
          <Link
            href={"/login"}
            className="underline-offset-2 underline decoration-2 text-mainBlue hover:text-textBlue"
          >
            로그인
          </Link>
          {` 하러가요!`}
        </div>
      )}
    </div>
  );
}
