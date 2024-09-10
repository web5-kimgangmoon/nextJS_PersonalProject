"use client";

import { useSimpleText } from "@/app/hooks/simpleText";
import { useToggle } from "@/app/hooks/toggle";
import { InputBox } from "@/app/ui/inputBox";
import { Button } from "@/app/ui/buttons";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { login } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { Modal_little } from "@/app/ui/modal";
import { useEffect } from "react";
import { userInfoData } from "@/app/lib/placeholder-data";

export function Login() {
  const router = useRouter();
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
  const userData = userInfoData;
  useEffect(() => {
    if (userData.userInfo) router.replace("/category");
  }, []);
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
                  login(nick.text, password.text, false, loginIsFail.close);
                  if (false) router.replace("/category");
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
