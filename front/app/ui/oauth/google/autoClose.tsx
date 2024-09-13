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
    const params = new URLSearchParams(window.location.hash.substring(1));

    if (!params.get("code")) {
      const nonce = ranHash("sha256");
      router.replace(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_OAUTH}&response_type=code id_token&scope=https://www.googleapis.com/auth/userinfo.email&nonce=${nonce}`
      );
    } else {
      const nonce = ranHash("sha256");
      axios
        .post(
          `https://oauth2.googleapis.com/token?client_id=${
            process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
          }&client_secret=${
            process.env.NEXT_PUBLIC_GOOGLE_SECRET
          }&code=${params.get("code")}&redirect_uri=${
            process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_OAUTH
          }&grant_type=authorization_code&nonce=${nonce}`
        )
        .then((value) => {
          window.opener &&
            window.opener.postMessage(
              value.data.access_token,
              window.opener.location.href
            );
          // axios
          //   .get(
          //     `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${value.data.access_token}&nonce=${nonce}`
          //   )
          //   .then((value) => {
          // window.opener &&
          //   window.opener.postMessage(
          //     { email: value.data.email, sub: value.data.sub },
          //     window.opener.location.href
          //   );
          // });
        });
    }
  }, [router]);
  return <LoadingSpin bgColorClass="bg-white" text="잠시후 이동합니다" />;
};
