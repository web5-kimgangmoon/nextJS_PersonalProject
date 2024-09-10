"use client";

import { ReactNode, createContext, useCallback, useState } from "react";
import type { TouchEvent } from "react";
interface ILocation {
  current: number;
  dif: number;
  translate: number;
}

export const SlideContext = createContext<{
  location: ILocation;
  touchStart?: (e: TouchEvent<HTMLDivElement>) => void;
  touchMove?: (e: TouchEvent<HTMLDivElement>) => void;
}>({ location: { current: 0, dif: 0, translate: 0 } });

export const SlideContextProvider = ({
  children,
}: {
  children: ReactNode | string;
}) => {
  const [location, setLocation] = useState<{
    current: number;
    dif: number;
    translate: number;
  }>({ current: 0, dif: 0, translate: 0 });
  const touchStart = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      const parentWidth = e.currentTarget.parentElement?.clientWidth;
      const child = e.currentTarget.clientWidth;
      if (parentWidth) {
        setLocation((value) => ({
          ...value,
          current: e.targetTouches[0].clientX,
          dif: child - parentWidth,
        }));
      }
      e.currentTarget.style.translate = `${location.translate}px`;
    },
    [location.translate]
  );
  const touchMove = useCallback(
    (e: TouchEvent<HTMLDivElement>) => {
      const move =
        e.targetTouches[0].clientX - location.current + location.translate;
      const distance = e.targetTouches[0].clientX - location.current;
      if (
        !(-move > location.dif && distance < 0) &&
        !(-move < 1 && distance > 0)
      )
        setLocation((value) => ({
          ...value,
          current: e.targetTouches[0].clientX,
          translate: move,
        }));
      e.currentTarget.style.translate = `${location.translate}px`;
    },
    [location]
  );
  return (
    <SlideContext.Provider value={{ location, touchMove, touchStart }}>
      {children}
    </SlideContext.Provider>
  );
};
