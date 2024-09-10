import { useCallback } from "react";

export const usePopup = (address: string) =>
  useCallback(() => {
    const s = window.open(address, "popupWindow", "width=600px,height=400px");
    window.onmessage = function (e: MessageEvent) {
      console.log("부모 창에서 받은 메시지", e.data);
      s?.close();
    };
    window.onmessageerror = (e) => {
      console.log(e);
    };
    // addEventListener("message", (event) => {
    //   console.log("부모 창에서 받은 메시지:", event.data);
    //   s && s.close();
    // });
  }, [address]);
