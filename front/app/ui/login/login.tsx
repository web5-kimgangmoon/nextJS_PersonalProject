"use client";

import { useSimpleText } from "@/app/hooks/simpleText";
import { useToggle } from "@/app/hooks/toggle";
import { InputBox } from "@/app/ui/inputBox";
import { Button } from "@/app/ui/buttons";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { useLogin } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { Modal_little } from "@/app/ui/modal";
import { useEffect } from "react";
import { useQuery_getUserInfo } from "@/app/lib/data";
import { LoadingSpin } from "../loadingSpin";
import serverAxios from "@/app/lib/serverActionAxios";

export function Login() {
  const router = useRouter();
  const userInfoData = useQuery_getUserInfo();
  const { nick, password } = {
    nick: useSimpleText(""),
    password: useSimpleText(""),
  };
  const { nickIsOK, passwordIsOK, loginIsFail } = {
    nickIsOK: useToggle(false),
    passwordIsOK: useToggle(false),
    loginIsFail: useToggle(true),
  };
  const { stringCheck, passwordCheck } = useTypeCheck_zod();
  const login = useLogin(loginIsFail.close, () => router.replace("/category"));
  if (userInfoData.isLoading)
    return <LoadingSpin bgColorClass="bg-[url('/gradient-bg.png')]" />;
  return (
    <div>
      <InputBox
        title="이메일 or 유저이름*"
        placeholder="userId@example.com"
        setIsNO={nickIsOK.close}
        setIsOK={nickIsOK.open}
        onChange={nick.setText}
        value={nick.text}
        type={"text"}
        checkType={stringCheck(50)}
      />
      <InputBox
        title="비밀번호*"
        placeholder="enter password"
        setIsNO={passwordIsOK.close}
        setIsOK={passwordIsOK.open}
        onChange={password.setText}
        value={password.text}
        type={"password"}
        checkType={passwordCheck}
      />
      <div className="px-10">
        <Button
          color={nickIsOK.is && passwordIsOK.is ? "blue" : "inactiveGray"}
          radius="medium"
          onClick={
            nickIsOK.is && passwordIsOK.is
              ? async () => {
                  if (userInfoData.data?.data.userInfo) {
                    router.replace("/category/all");
                    return;
                  }
                  await login.mutate({
                    id: nick.text,
                    pwd: password.text,
                    isAdminLogin: "false",
                  });
                  userInfoData.refetch();
                }
              : undefined
          }
          className="py-4"
        >
          로그인
        </Button>
      </div>
      <Modal_little closeModalCtl={loginIsFail.open} modalCtl={!loginIsFail.is}>
        <div>로그인에 실패했습니다</div>
      </Modal_little>
    </div>
  );
}
