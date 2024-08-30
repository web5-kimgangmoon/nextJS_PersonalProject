import { ReactNode, createContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
interface ILocation {
  current: number;
  dif: number;
  translate: number;
}

export const SlideContext = createContext<{
  location: ILocation;
  setLocation: Dispatch<
    SetStateAction<{
      current: number;
      dif: number;
      translate: number;
    }>
  >;
}>({
  location: { current: 0, dif: 0, translate: 0 },
  setLocation: (value) => value,
});

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
  return (
    <SlideContext.Provider value={{ location, setLocation }}>
      {children}
    </SlideContext.Provider>
  );
};
