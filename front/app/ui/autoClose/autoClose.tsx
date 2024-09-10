"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpin } from "../loadingSpin";

export const AutoClose = ({}: {}) => {
  const router = useRouter();
  useEffect(() => {
    const fragment = window.location.hash.substring(1); // '#' 제거
    const params = new URLSearchParams(fragment);
    console.log(params.get("code"));
    // if (window.opener == null) {
    //   router.replace("/category");
    // }
    //https://www.googleapis.com/oauth2/v3/userinfo?access_token=ya29.a0AcM612ysemG1TrrfMapP9Q3nyLFtNtL9-st1xIZybVOJXSBpDKMgY6b4U-R_ZizVRAu1W1V5amtLfIgtY8hdOirRxPh0MqLPoG8r82CtSOz4jiU0Fr3xplsLmGERgFqjYNGEhDwSefrNtCMglZmRApSe5t725XpoMwaCgYKAdISARASFQHGX2Mi9sK5v-QFLcXO62YwT5e0TA0169&nonce=rklqjlejqwlkejlqwejklqwjekl
    //https://oauth2.googleapis.com/token?client_id=&client_secret=&code=&redirect_uri=http://localhost:3000/autoClose&grant_type=authorization_code&nonce=rklqjlejqwlkejlqwejklqwjekl
    //https://accounts.google.com/o/oauth2/v2/auth?client_id=&redirect_uri=http://localhost:3000/autoClose&response_type=code id_token&scope=https://www.googleapis.com/auth/userinfo.email&nonce=rklqjlejqwlkejlqwejklqwjekl
    setTimeout(() => {
      window.opener && window.opener.postMessage("dsadsad", "*");
    }, 2000);
  }, [router]);
  return <LoadingSpin bgColorClass="bg-white" text="잠시후 이동합니다" />;
};
