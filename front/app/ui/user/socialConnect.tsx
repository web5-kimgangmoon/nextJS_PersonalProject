import { usePopup } from "@/app/hooks/callback/popUp";
import { ImgButton } from "../buttons";

export const SocialConnect = () => {
  const google_popup = usePopup(
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_OAUTH as string,
    "google"
  );
  const facebook_popup = usePopup(
    process.env.NEXT_PUBLIC_FACEBOOK_REDIRECT_OAUTH as string,
    "facebook"
  );
  const isConnectGoogle = true;
  const isConnectFaceBook = true;
  return (
    <div>
      <div className="flex gap-4 justify-center pt-10">
        <ImgButton
          color={isConnectGoogle ? "blue" : "logoBtn"}
          size="none"
          radius="a little"
          isNobold={true}
          img="/googleLogo.svg"
          className="p-2 text-sm"
          onClick={isConnectGoogle ? undefined : google_popup}
        >
          {/* google */}
          {isConnectGoogle ? "connected" : "google"}
        </ImgButton>
        <ImgButton
          color={isConnectGoogle ? "blue" : "logoBtn"}
          size="none"
          radius="a little"
          isNobold={true}
          img="/facebookLogo.svg"
          className="p-2 text-sm"
          onClick={isConnectGoogle ? undefined : facebook_popup}
        >
          {/* google */}
          {isConnectFaceBook ? "connected" : "facebook"}
        </ImgButton>
      </div>
      <div className="p-4">
        <div className="text-alert font-bold">경고</div>
        <div className="text-sm text-fakeBlack">
          기존 소셜아이디는 연동시에 기존 계정이 해제됩니다.
        </div>
      </div>
    </div>
  );
};
