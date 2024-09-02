"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { replace } = useRouter();
  useEffect(() => {
    replace("/category");
  }, []);

  return (
    <main className="">
      <div>이곳은 루트 페이지입니다. 자동으로 게시글로 이동합니다.</div>
    </main>
  );
}
