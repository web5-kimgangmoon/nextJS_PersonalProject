"use client";

import clsx from "clsx";
import Link from "next/link";
import type { Button as ButtonTy } from "@/app/lib/definitions";

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
        { "font-bold": !nobold },
        {
          "w-full text-xl py-2": !size,
          "text-xl py-2 px-4": size === "short",
          "text-base py-1 px-4": size === "medium",
          "text-base py-1 px-2": size === "small",
          "text-base py-1 px-1": size === "smallest",
        },
        {
          "bg-gradient-to-br from-[#D81159] to-[#FF4966] text-white":
            color === "pink",
          "bg-mainBlue text-white": color === "blue",
          "border-2 border-mainBlue text-mainBlue": color === "blankBlue",
          "bg-alert text-white": color === "whiteRed",
          "bg-bgGray text-white": color === "gray",
          "bg-mainBlue text-textGray": color === "blueGray",
          "border-2 border-borderGray bg-white text-black":
            color === "whiteGray",
        },
        {
          "rounded-[1.6rem]": !radius,
          "rounded-[1rem]": radius === "medium",
          "rounded-[0.5rem]": radius === "little",
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function ImgButton(button: ButtonTy & { img: string }) {
  return (
    <Button {...button}>
      <div className="flex gap-2 justify-center items-center">
        <div className="min-h-4 min-w-4">
          <img src={button.img} alt="no image" className="w-full h-full"></img>
        </div>
        <div className="flex items-center">{button.children}</div>
      </div>
    </Button>
  );
}

export function LinkButton(button: ButtonTy & { href: string; img?: string }) {
  return (
    <Link href={button.href}>
      {button.img !== undefined ? (
        <ImgButton {...button} img={button.img}>
          {button.children}
        </ImgButton>
      ) : (
        <Button {...button}>{button.children}</Button>
      )}
    </Link>
  );
}
