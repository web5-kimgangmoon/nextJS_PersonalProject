"use client";

import clsx from "clsx";
import Link from "next/link";
import type { Button as ButtonTy } from "@/app/lib/definitions";
import { ReactNode } from "react";
import Image from "next/image";

export function Button({
  isNobold,
  color,
  children,
  radius = undefined,
  size,
  className,
  onClick,
}: ButtonTy) {
  return (
    <button
      className={clsx(
        "transition-colors",
        { "font-bold": !isNobold },
        {
          "w-full text-xl py-2": !size,
          "w-full text-3xl py-4 px-8 transition-[font]": size === "bigFont",
          "text-xl py-2 px-4": size === "short",
          "py-1 px-4": size === "medium",
          "py-1 px-2": size === "small",
          "py-1 px-1": size === "smallest",
          "w-8 h-8": size == "pageBtn",
        },
        {
          "bg-gradient-to-br from-[#D81159] to-[#FF4966] text-white focus:bg-[#D81159]":
            color === "pink",
          "bg-mainBlue text-white focus:bg-darkBlue": color === "blue",
          "border-2 border-mainBlue text-mainBlue": color === "blankBlue",
          "border-2 border-alert text-alert": color === "blankRed",
          "text-textBlue focus:text-mainBlue": color === "noneBlue",
          "bg-alert text-white": color === "whiteRed",
          "bg-bgGray text-white": color === "gray",
          "bg-mainBlue text-textGray": color === "blueGray",
          "border-2 border-borderGray bg-white text-black":
            color === "whiteGray",
          "bg-bgGray opacity-40 text-white": color === "inactiveGray",
        },
        {
          "rounded-[1.6rem]": !radius,
          "rounded-[1rem]": radius === "medium",
          "rounded-[0.5rem]": radius === "a little",
          "rounded-[0.25rem]": radius === "little",
          "rounded-full": radius === "full",
        },
        className
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
    isImgBig?: boolean;
    isNoString?: boolean;
  }
) {
  const Icon = button.icon;
  return (
    <Button {...button}>
      <div
        className={clsx(
          "flex justify-center items-center",
          {
            "gap-1": !button.isNoString && button.isLessGap,
            "gap-2": !button.isNoString && !button.isLessGap,
          },
          { "flex-row-reverse": button.isRight }
        )}
      >
        <div
          className={clsx("flex justify-center items-center", {
            "min-h-2 min-w-2": button.isImgSmall,
            "min-h-4 min-w-4": !button.isImgSmall && !button.isImgBig,
            "min-h-8 min-w-8": button.isImgBig,
          })}
        >
          {button.img && (
            <Image
              src={button.img}
              alt="no image"
              className="w-full h-full"
              width={100}
              height={100}
            />
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
    isImgBig?: boolean;
    isNoString?: boolean;
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

export function AButton(
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
    <a href={button.href}>
      {button.img !== undefined || button.icon !== undefined ? (
        <ImgButton {...button}>{button.children}</ImgButton>
      ) : (
        <Button {...button}>{button.children}</Button>
      )}
    </a>
  );
}
