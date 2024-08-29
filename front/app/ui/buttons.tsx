"use client";

import clsx from "clsx";
import Link from "next/link";
import type { Button as ButtonTy } from "@/app/lib/definitions";
import { ReactNode } from "react";

export function Button({
  nobold,
  color,
  children,
  radius = undefined,
  size,
  onClick,
}: ButtonTy) {
  return (
    <button
      className={clsx(
        "transition-colors",
        { "font-bold": !nobold },
        {
          "w-full text-xl py-2": !size,
          "text-xl py-2 px-4": size === "short",
          "text-base py-1 px-4": size === "medium",
          "text-base py-1 px-2": size === "small",
          "text-base py-1 px-1": size === "smallest",
        },
        {
          "bg-gradient-to-br from-[#D81159] to-[#FF4966] text-white focus:bg-[#d81159]":
            color === "pink",
          "bg-mainBlue text-white focus:bg-darkBlue": color === "blue",
          "border-2 border-mainBlue text-mainBlue": color === "blankBlue",
          "text-textBlue focus:text-mainBlue": color === "noneBlue",
          "bg-alert text-white": color === "whiteRed",
          "bg-bgGray text-white": color === "gray",
          "bg-mainBlue text-textGray": color === "blueGray",
          "border-2 border-borderGray bg-white text-black":
            color === "whiteGray",
        },
        {
          "rounded-[1.6rem]": !radius,
          "rounded-[1rem]": radius === "medium",
          "rounded-[0.5rem]": radius === "a little",
          "rounded-[0.25rem]": radius === "little",
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ImgButton(
  button: ButtonTy & {
    img?: string;
    icon?: ReactNode;
    isLessGap?: boolean;
    isRight?: boolean;
    isImgSmall?: boolean;
  }
) {
  const Icon = button.icon;
  return (
    <Button {...button}>
      <div
        className={clsx(
          "flex justify-center items-center",
          {
            "gap-1": button.isLessGap,
            "gap-2": !button.isLessGap,
          },
          { "flex-row-reverse": button.isRight }
        )}
      >
        <div
          className={`${
            button.isImgSmall ? "min-h-2 min-w-2" : "min-h-4 min-w-4"
          } flex justify-center items-center`}
        >
          {button.img && (
            <img src={button.img} alt="no image" className="w-full h-full" />
          )}
          {Icon}
        </div>
        <div className="flex items-center">{button.children}</div>
      </div>
    </Button>
  );
}

export function LinkButton(
  button: ButtonTy & {
    href: string;
    isLessGap?: boolean;
    img?: string;
    icon?: ReactNode;
    isRight?: boolean;
    isImgSmall?: boolean;
  }
) {
  return (
    <Link href={button.href}>
      {button.img !== undefined || button.icon !== undefined ? (
        <ImgButton {...button}>{button.children}</ImgButton>
      ) : (
        <Button {...button}>{button.children}</Button>
      )}
    </Link>
  );
}

export const MenuBarBtn = () => (
  <ImgButton icon={<img src="/menuBar.svg" />} color={"none"} size="smallest" />
);
