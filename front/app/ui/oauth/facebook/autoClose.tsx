"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpin } from "@/app/ui/loadingSpin";
import { ranHash } from "@/app/lib/utils";
import axios from "axios";

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
      axios
        .get(
          `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${
            process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID
          }&redirect_uri=${
            process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_OAUTH
          }&client_secret=${
            process.env.NEXT_PUBLIC_FACEBOOK_SECRET
          }&code=${params.get("code")}`
        )
        .then((value) => {
          window.opener &&
            window.opener.postMessage(
              value.data.access_token,
              window.opener.location.href
            );
          // axios
          //   .get(
          //     `https://graph.facebook.com/me?fields=${"id,name,email"}&access_token=${
          //       value.data.access_token
          //     }`
          //   )
          //   .then((value) => {
          // console.log(value);
          // window.opener &&
          //   window.opener.postMessage(
          //     { email: value.data.email, sub: value.data.id },
          //     window.opener.location.href
          //   );
          // });
        });
    }
  }, [router]);
  return <LoadingSpin bgColorClass="bg-white" text="잠시후 이동합니다" />;
};
