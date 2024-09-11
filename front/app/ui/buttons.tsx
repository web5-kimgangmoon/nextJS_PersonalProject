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
        {
          "transition-colors": size !== "bigFont",
          "transition-[font]": size === "bigFont",
        },
        { "font-bold": !isNobold },
        {
          "w-full text-xl py-2 px-4": !size,
          "w-full text-3xl py-4 px-8": size === "bigFont",
          "text-xl py-2 px-4": size === "short",
          "py-1 px-4": size === "medium",
          "py-1 px-2": size === "small",
          "py-1 px-1": size === "smallest",
          "w-8 h-8": size == "pageBtn",
          "": size == "none",
        },
        {
          "bg-gradient-to-br from-[#D81159] to-[#FF4966] text-white hover:from-[#D81159] hover:to-[#D81159]":
            color === "pink",
          "bg-mainBlue text-white hover:bg-darkBlue": color === "blue",
          "border-2 border-mainBlue text-mainBlue hover:text-darkBlue hover:border-darkBlue":
            color === "blankBlue",
          "border-2 border-alert text-alert hover:text-red-800 hover:border-red-800":
            color === "blankRed",
          "text-textBlue hover:text-mainBlue": color === "noneBlue",
          "bg-alert text-white hover:bg-red-800": color === "red",
          "bg-bgGray text-white": color === "gray",
          "border-2 border-mainBlue bg-white text-mainBlue":
            color === "whiteBlue",
          "bg-bgGray/40 text-white": color === "inactiveGray",
          "border-2 border-bgGray text-bgGray": color === "blankInactive",
          "text-mainBlue hover:text-textBlue": color === "onlyTextBlue",
          "text-alert hover:text-red-800": color === "onlyTextRed",
          "text-textGray": color === "onlyTextInactive",
          "text-black border border-borderGray bg-white": color === "logoBtn",
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
    <Link
      href={button.href}
      className={clsx(
        "inline-block",
        (!button.size || button.size === "bigFont") && "w-full"
      )}
    >
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
    <a
      href={button.href}
      className={clsx(
        "inline-block",
        (!button.size || button.size === "bigFont") && "w-full"
      )}
    >
      {button.img !== undefined || button.icon !== undefined ? (
        <ImgButton {...button}>{button.children}</ImgButton>
      ) : (
        <Button {...button}>{button.children}</Button>
      )}
    </a>
  );
}
