import { useCallback } from "react";
import { oauthLogin } from "@/app/lib/actions";
export const usePopup = (address: string, oauth: "google" | "facebook") =>
  useCallback(() => {
    const s = window.open(address, "popupWindow", "width=600px,height=400px");
    window.onmessage = function (e: MessageEvent) {
      oauthLogin(e.data, oauth);
      s?.close();
    };
    window.onmessageerror = (e) => {
      console.log(e);
    };
  }, [address, oauth]);
