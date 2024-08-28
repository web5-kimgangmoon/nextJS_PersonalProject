"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

export function Button({
  color,
  children,
  radius = undefined,
  onClick,
}: {
  color: string;
  children: string | ReactNode;
  radius?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={clsx(
        "w-full text-2xl font-bold py-4 ",
        {
          "bg-gradient-to-br from-[#D81159] to-[#FF4966] text-white":
            color === "pink",
          "border-2 border-mainBlue text-mainBlue": color === "blankBlue",
          "bg-alert text-white": color === "whitered",
        },
        {
          "rounded-[1.6rem]": !radius,
          "rounded-[1rem]": radius === "little",
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function LinkButton(button: {
  href: string;
  color: string;
  children: string | ReactNode;
  radius?: string;
  onClick?: () => void;
}) {
  return (
    <Link href={button.href}>
      <Button {...button}>{button.children}</Button>
    </Link>
  );
}
