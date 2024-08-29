"use client";

import { XMarkIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
export function Modal({
  modalCtl,
  closeModalCtl,
  isTranslucent,
  curtainColor = "black",
}: {
  curtainColor?: string;
  modalCtl: boolean;
  closeModalCtl: () => void;
  isTranslucent?: boolean;
}) {
  return (
    <>
      <ModalBox modalCtl={modalCtl} />
      <div
        className={clsx({
          "bg-white": !isTranslucent,
        })}
      >
        <div className="flex justify-end">
          <XMarkIcon className="w-5 h-5" onClick={closeModalCtl} />
        </div>
        <div className="bg-white ">ㅇㅇㅇ</div>
      </div>
    </>
  );
}

export function ModalBox({
  curtainColor = "black",

  modalCtl,
}: {
  curtainColor?: string;

  modalCtl: boolean;
}) {
  return (
    <div
      className={clsx(
        `fixed top-0 left-0 w-screen h-screen flex flex-col backdrop-blur transition`,
        {
          "opacity-0 z-[-1]": !modalCtl,
        },
        {
          "bg-black/70": curtainColor === "black",
          "bg-white/70": curtainColor === "white",
        }
      )}
    ></div>
  );
}
