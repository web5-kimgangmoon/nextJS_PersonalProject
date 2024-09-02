import type { Metadata } from "next";
import { inter } from "@/app/ui/font";
import "@/app/ui/globals.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "The board",
  description: "for personal project kimgangmoon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={clsx(inter.className, "sm:text-base")}>{children}</body>
    </html>
  );
}
