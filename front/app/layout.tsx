import type { Metadata } from "next";
import { inter } from "@/app/ui/font";
import "@/app/ui/globals.css";
import clsx from "clsx";
import ReactQueryProvider from "@/app/lib/reactQueryProvider";

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
      <ReactQueryProvider>
        <body className={clsx(inter.className, "sm:text-base")}>
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
