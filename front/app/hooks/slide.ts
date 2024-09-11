import { TouchEvent, useCallback, useState } from "react";
import { ILocation } from "../lib/definitions";

export const useSlide = () => {
  const [location, setLocation] = useState<ILocation>({
    current: 0,
    dif: 0,
    translate: 0,
  });
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
  return { location, touchStart, touchMove };
};
