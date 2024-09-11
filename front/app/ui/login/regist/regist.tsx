"use client";

import { useSimpleText } from "@/app/hooks/simpleText";
import { useToggle } from "@/app/hooks/toggle";
import { InputBox } from "@/app/ui/inputBox";
import { Button } from "@/app/ui/buttons";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { regist } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { Modal_little } from "@/app/ui/modal";
import { useEffect } from "react";
import { userInfoData } from "@/app/lib/placeholder-data";

export function Regist() {
  const router = useRouter();
  const { nick, email, password } = {
    nick: useSimpleText(""),
    email: useSimpleText(""),
    password: useSimpleText(""),
  };
  const { nickIsOK, passwordIsOK, emailIsOK, registIsFail } = {
    nickIsOK: useToggle(false),
    passwordIsOK: useToggle(false),
    emailIsOK: useToggle(false),
    registIsFail: useToggle(true),
  };
  const { nickCheck, passwordCheck, emailCheck } = useTypeCheck_zod();
  const userData = userInfoData;
  useEffect(() => {
    if (userData.userInfo) router.replace("/category");
  }, []);
  return (
    <div>
      <InputBox
        title="닉네임*"
        placeholder="userNick"
        setIsNO={nickIsOK.close}
        setIsOK={nickIsOK.open}
        onChange={nick.setText}
        value={nick.text}
        type={"text"}
        checkType={nickCheck}
      />
      <InputBox
        title="이메일*"
        placeholder="Email"
        setIsNO={emailIsOK.close}
        setIsOK={emailIsOK.open}
        onChange={email.setText}
        value={email.text}
        type={"email"}
        checkType={emailCheck}
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
          color={
            nickIsOK.is && passwordIsOK.is && emailIsOK.is
              ? "blue"
              : "inactiveGray"
          }
          radius="medium"
          onClick={
            nickIsOK.is && passwordIsOK.is && emailIsOK.is
              ? async () => {
                  regist(
                    nick.text,
                    email.text,
                    password.text,
                    registIsFail.close
                  );
                  if (false) router.replace("/login");
                }
              : undefined
          }
          className="py-4"
        >
          회원가입
        </Button>
      </div>
      <Modal_little
        closeModalCtl={registIsFail.open}
        modalCtl={!registIsFail.is}
      >
        <div>회원가입에 실패했습니다</div>
      </Modal_little>
    </div>
  );
}
