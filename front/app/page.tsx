"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpin } from "./ui/loadingSpin";

export default function Home() {
  const { replace } = useRouter();
  useEffect(() => {
    replace("/category");
  }, [replace]);

  return (
    <main className="">
      <LoadingSpin
        text="이곳은 홈페이지입니다. 자동으로 게시글로 이동합니다."
        bgColorClass="bg-white"
      />
    </main>
  );
}
