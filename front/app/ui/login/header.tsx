"use client";

import { usePathname } from "next/navigation";
import { ImgButton, LinkButton } from "../buttons";
import { usePopup } from "@/app/hooks/callback/popUp";

export function Header() {
  const pathname = usePathname();
  const google_popup = usePopup(
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_OAUTH as string,
    "google"
  );
  const facebook_popup = usePopup(
    process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_OAUTH as string,
    "facebook"
  );
  return (
    <div className="">
      <div className="flex justify-center">
        <div className="w-max">
          <LinkButton href="/category" size="bigFont" color="onlyTextBlue">
            The board
          </LinkButton>
        </div>
      </div>
      {/* <div className="flex justify-center break-keep text-center text-textBlue">
        The board를 다른 소셜사이트의 계정으로 이용하세요!
      </div>
      <div className="flex gap-4 justify-center p-20">
        <ImgButton
          color="logoBtn"
          size="none"
          radius="a little"
          isNobold={true}
          img="/googleLogo.svg"
          className="p-2"
          onClick={google_popup}
        >
          google
        </ImgButton>
        <ImgButton
          color="logoBtn"
          size="none"
          radius="a little"
          isNobold={true}
          img="/facebookLogo.svg"
          className="p-2"
          onClick={facebook_popup}
        >
          facebook
        </ImgButton>
      </div> */}
      <div className="flex items-center">
        <div className="grow px-4">
          <div className="w-full pt-1 border-t border-borderGray"></div>
        </div>
        <div className="text-textGray">
          {pathname.split("/login")[1].length === 0 ? "login" : "regist"}
        </div>
        <div className="grow px-4">
          <div className="w-full pt-1 border-t border-borderGray"></div>
        </div>
      </div>
    </div>
  );
}
