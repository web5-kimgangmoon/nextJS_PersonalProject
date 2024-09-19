"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpin } from "@/app/ui/loadingSpin";
import { ranHash } from "@/app/lib/utils";
import axios from "axios";
import serverAxios from "@/app/lib/serverActionAxios";

export const AutoClose = ({}: {}) => {
  const router = useRouter();

  useEffect(() => {
    window.opener === null && router.replace("/category");
    const params = new URLSearchParams(window.location.search.split("?")[1]);
    if (!params.get("code")) {
      const state = ranHash("sha256");
      router.replace(
        `https://www.facebook.com/v20.0/dialog/oauth?client_id=${
          process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID
        }&redirect_uri=${
          process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_OAUTH
        }&scope=${"email"}&state={"{st=${state}}"}`
      );
    }
    if (params.get("code")) {
      serverAxios
        .post(
          `/user/login/oauth`,
          {},
          {
            params: {
              code: params.get("code"),
              oauth: "FACEBOOK",
              isAdminLogin: false,
            },
          }
        )
        .then((value) => {
          window.opener &&
            window.opener.postMessage(
              { data: value.data, isSuccess: true },
              window.opener.location.href
            );
        })
        .catch((err) => {
          window.opener &&
            window.opener.postMessage(
              { data: err.response.data, isSuccess: false },
              window.opener.location.href
            );
        });
    }
  }, [router]);
  return <LoadingSpin bgColorClass="bg-white" text="잠시후 이동합니다" />;
};
