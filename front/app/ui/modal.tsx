"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";

import clsx from "clsx";
import { ReactNode, useCallback } from "react";
import { AButton, Button, ImgButton, LinkButton } from "./buttons";
import { useRouter } from "next/navigation";

export function Modal({
  modalCtl,
  closeModalCtl,
  isTranslucent,
  curtainColor = "black",
  isSmallX = false,
  children,
}: {
  curtainColor?: string;
  modalCtl: boolean;
  closeModalCtl: () => void;
  isTranslucent?: boolean;
  isSmallX?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <Curtain modalCtl={modalCtl} curtainColor={curtainColor} />
      <div
        className={clsx(
          "fixed transition-transform w-full top-0 left-0 z-50",
          {
            "bg-white": !isTranslucent,
          },
          {
            "translate-y-[-100%]": !modalCtl,
            "": modalCtl,
          }
        )}
      >
        <div className="max-h-screen overflow-scroll">
          <div className="flex justify-end">
            {isSmallX ? (
              <XMarkIcon
                className="w-8 h-8 text-XMarkGray"
                onClick={closeModalCtl}
                strokeWidth="5"
              />
            ) : (
              <XMarkIcon
                className="w-12 h-12"
                onClick={closeModalCtl}
                strokeWidth="2"
              />
            )}
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export function Curtain({
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
          "z-40": modalCtl,
        },
        {
          "bg-black/70": curtainColor === "black",
          "bg-white/70": curtainColor === "white",
        }
      )}
    ></div>
  );
}

export const ModalRequest = ({
  children,
  request,
  isBorder,
  closeModal,
}: {
  children: string;
  request: () => void;
  isBorder?: boolean;
  closeModal: () => void;
}) => {
  return (
    <div className="flex justify-center">
      <div className={clsx("w-max", isBorder && "border-t border-borderGray")}>
        <Button
          onClick={() => {
            request();
            closeModal();
          }}
          color="none"
          isNobold={true}
          size="bigFont"
        >
          {children}
        </Button>
      </div>
    </div>
  );
};

export const ModalLink = ({
  children,
  href,
  isBorder,
}: {
  children: string;
  href: string;
  isBorder?: boolean;
}) => {
  return (
    <div className="flex justify-center">
      <div className={clsx("w-max", isBorder && "border-t border-borderGray")}>
        <LinkButton href={href} color="none" isNobold={true} size="bigFont">
          {children}
        </LinkButton>
      </div>
    </div>
  );
};

export const ModalA = ({
  children,
  href,
}: {
  children: string;
  href: string;
}) => {
  return (
    <div className="flex justify-center">
      <div className="w-max">
        <AButton href={href} color="none" isNobold={true} size="bigFont">
          {children}
        </AButton>
      </div>
    </div>
  );
};

export const ModalRouter = ({
  children,
  onClick,
  isBorder,
}: {
  children: string;
  onClick: () => void;
  isBorder?: boolean;
}) => {
  return (
    <div className="flex justify-center">
      <div className={clsx("w-max", isBorder && "border-t border-borderGray")}>
        <Button onClick={onClick} color="none" isNobold={true} size="bigFont">
          {children}
        </Button>
      </div>
    </div>
  );
};

export const ModalArrowBtn = ({
  children,
  setIsOpen,
  isOpen,
}: {
  children: string;
  setIsOpen: () => void;
  isOpen: boolean;
}) => {
  return (
    <div className="flex justify-center">
      <div className="w-max">
        <ImgButton
          color="none"
          isNobold={true}
          size="bigFont"
          isRight={true}
          className={clsx(isOpen && "font-bold")}
          img={isOpen ? "/noLineArrowReverse.svg" : "/noLineArrow.svg"}
          onClick={setIsOpen}
        >
          {children}
        </ImgButton>
      </div>
    </div>
  );
};

export const ModalBox = ({
  isOpen,
  setIsOpen,
  title,
  linkList,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  linkList: { title: string; href: string; isA?: boolean }[];
}) => {
  return (
    <div className={clsx(isOpen && "pb-5")}>
      <ModalArrowBtn isOpen={isOpen} setIsOpen={setIsOpen}>
        {title}
      </ModalArrowBtn>
      <div className={clsx(!isOpen && "hidden")}>
        {linkList.map((item, idx) =>
          item.isA ? (
            <ModalA key={idx} href={item.href}>
              {item.title}
            </ModalA>
          ) : (
            <ModalLink key={idx} href={item.href}>
              {item.title}
            </ModalLink>
          )
        )}
      </div>
    </div>
  );
};
export const ModalRouterBox = ({
  isOpen,
  setIsOpen,
  closeModal,
  title,
  linkList,
}: {
  isOpen: boolean;
  setIsOpen: () => void;
  title: string;
  closeModal: () => void;
  linkList: { title: string; href: string }[];
}) => {
  const router = useRouter();
  return (
    <div className={clsx(isOpen && "pb-5")}>
      <ModalArrowBtn isOpen={isOpen} setIsOpen={setIsOpen}>
        {title}
      </ModalArrowBtn>
      <div className={clsx(!isOpen && "hidden")}>
        {linkList.map((item, idx) => (
          <ModalRouter
            onClick={() => {
              closeModal();
              setIsOpen();
              router.replace(`${item.href}`);
            }}
            key={idx}
          >
            {item.title}
          </ModalRouter>
        ))}
      </div>
    </div>
  );
};
