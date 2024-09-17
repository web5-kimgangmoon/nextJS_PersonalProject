"use client";

import { useSimpleText } from "@/app/hooks/simpleText";
import { useToggle } from "@/app/hooks/toggle";
import { InputBox } from "@/app/ui/inputBox";
import { Button } from "@/app/ui/buttons";
import { useTypeCheck_zod } from "@/app/lib/utils";
import { useRegist } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { Modal_little } from "@/app/ui/modal";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { userInfoData } from "@/app/lib/placeholder-data";
import { useQuery_getOwnInfo } from "@/app/lib/data";
import { LoadingSpin } from "../../loadingSpin";

export function Regist() {
  const router = useRouter();
  const { nick, email, password } = {
    nick: useSimpleText(""),
    email: useSimpleText(""),
    password: useSimpleText(""),
  };
  const [modalMessage, modalMessageSet] =
    useState<string>("회원가입에 실패했습니다");
  const { nickIsOK, passwordIsOK, emailIsOK, registIsFail } = {
    nickIsOK: useToggle(false),
    passwordIsOK: useToggle(false),
    emailIsOK: useToggle(false),
    registIsFail: useToggle(false),
  };
  const { nickCheck, passwordCheck, emailCheck } = useTypeCheck_zod();
  const userData = useQuery_getOwnInfo();
  const regist = useRegist(
    registIsFail.open,
    () => router.replace("/login"),
    modalMessageSet
  );

  const submit = useCallback(() => {
    nickIsOK.is && passwordIsOK.is && emailIsOK.is
      ? async (nick: string, email: string, password: string) => {
          regist.mutate({
            nick: nick,
            email: email,
            pwd: password,
          });
        }
      : undefined;
  }, [nickIsOK.is, passwordIsOK.is, emailIsOK.is]);
  const pressEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter" || e.key === "Enter")
        regist.mutate({
          nick: nick.text,
          email: email.text,
          pwd: password.text,
        });
    },
    [regist, nick.text, email.text, password.text]
  );
  if (userData.isLoading)
    return <LoadingSpin bgColorClass="bg-[url('/gradient-bg.png')]" />;
  if (userData.data?.data.userInfo) router.replace("/category");

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
        onSubmit={
          nickIsOK.is && passwordIsOK.is && emailIsOK.is
            ? pressEnter
            : undefined
        }
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
                  regist.mutate({
                    nick: nick.text,
                    email: email.text,
                    pwd: password.text,
                  });
                }
              : undefined
          }
          className="py-4"
        >
          회원가입
        </Button>
      </div>
      <Modal_little
        closeModalCtl={registIsFail.close}
        modalCtl={registIsFail.is}
      >
        <div>{modalMessage}</div>
      </Modal_little>
    </div>
  );
}
