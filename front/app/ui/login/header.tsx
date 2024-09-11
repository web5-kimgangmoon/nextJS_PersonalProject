"use client";

import { ImgButton, LinkButton } from "../buttons";
import { usePopup } from "@/app/hooks/callback/popUp";

export function Header() {
  const google_popup = usePopup("http://localhost:3000/oauth/google", "google");
  const facebook_popup = usePopup(
    "http://localhost:3000/oauth/facebook",
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
      <div className="flex justify-center break-keep text-center text-textBlue pb-">
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
        {/* <Button></Button> */}
      </div>
      <div className="flex items-center">
        <div className="grow px-4">
          <div className="w-full pt-1 border-t border-borderGray"></div>
        </div>
        <div className="text-textGray">or</div>
        <div className="grow px-4">
          <div className="w-full pt-1 border-t border-borderGray"></div>
        </div>
      </div>
    </div>
  );
}
