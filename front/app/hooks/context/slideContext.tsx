"use client";

import { ReactNode, createContext, useCallback, useState } from "react";
import type { TouchEvent } from "react";
import { useSlide } from "../slide";
import { ILocation } from "@/app/lib/definitions";

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
  const { location, touchMove, touchStart } = useSlide();
  return (
    <SlideContext.Provider value={{ location, touchMove, touchStart }}>
      {children}
    </SlideContext.Provider>
  );
};
