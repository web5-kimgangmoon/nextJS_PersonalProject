"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpin } from "../loadingSpin";

export const AutoClose = ({}: {}) => {
  const router = useRouter();
  useEffect(() => {
    if (window.opener == null) {
      router.replace("/category");
    }
    setTimeout(() => {
      window.opener && window.opener.postMessage("dsadsad", "*");
    }, 2000);
  }, []);
  return <LoadingSpin bgColorClass="bg-white" text="잠시후 이동합니다" />;
};
