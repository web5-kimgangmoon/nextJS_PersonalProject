"use client";

import { useSimpleText } from "@/app/hooks/simpleText";
import { useToggle } from "@/app/hooks/toggle";
import { InputBox } from "@/app/ui/inputBox";
import { Button } from "@/app/ui/buttons";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { useLogin } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { Modal_little } from "@/app/ui/modal";
import { KeyboardEvent, useCallback, useState } from "react";
import { useQuery_getOwnInfo } from "@/app/lib/data";
import { LoadingSpin } from "../loadingSpin";

export function Login() {
  const router = useRouter();
  const userInfoData = useQuery_getOwnInfo();
  const { nick, password } = {
    nick: useSimpleText(""),
    password: useSimpleText(""),
  };
  const [modalMessage, modalMessageSet] =
    useState<string>("회원가입에 실패했습니다");
  const { nickIsOK, passwordIsOK, loginIsFail } = {
    nickIsOK: useToggle(false),
    passwordIsOK: useToggle(false),
    loginIsFail: useToggle(false),
  };
  const { stringCheck, passwordCheck } = useTypeCheck_zod();
  const login = useLogin(
    loginIsFail.open,
    () => {
      userInfoData.refetch();
      router.replace("/category");
    },
    modalMessageSet
  );
  const pressEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter" || e.key === "Enter")
        login.mutate({
          id: nick.text,
          pwd: password.text,
          isAdminLogin: "false",
        });
    },
    [login, nick.text, password.text]
  );
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
        onSubmit={nickIsOK.is && passwordIsOK.is ? pressEnter : undefined}
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
                }
              : undefined
          }
          className="py-4"
        >
          로그인
        </Button>
      </div>
      <Modal_little closeModalCtl={loginIsFail.close} modalCtl={loginIsFail.is}>
        <div>{modalMessage}</div>
      </Modal_little>
    </div>
  );
}
